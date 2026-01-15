import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { create } from "https://deno.land/x/djwt@v2.8/mod.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const FUNCTION_SECRET = Deno.env.get("FUNCTION_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-function-secret",
};

// Input validation schema
const registrationSchema = z.object({
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  phoneNumber: z.string().min(1).max(20).trim(),
  email: z.string().email().max(255).trim(),
  church: z.string().min(1).max(200).trim(),
  parentName: z.string().max(100).optional(),
  parentPhone: z.string().max(20).optional(),
  parentEmail: z.string().email().max(255).optional().or(z.literal("")),
});

type RegistrationData = z.infer<typeof registrationSchema>;

// Helper function to parse the service account key
function parseServiceAccountKey() {
  const keyJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
  if (!keyJson) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not set");
  }
  return JSON.parse(keyJson);
}

// Create a JWT for Google Sheets API authentication
async function getAccessToken() {
  const serviceAccount = parseServiceAccountKey();
  
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  // Import the private key
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  let pemContents = serviceAccount.private_key;
  pemContents = pemContents.replace(pemHeader, "").replace(pemFooter, "").replace(/\n/g, "");
  
  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));
  
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const jwt = await create(
    { alg: "RS256", typ: "JWT" },
    payload,
    cryptoKey
  );

  // Exchange JWT for access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    console.error("Token exchange error: Failed to get access token");
    throw new Error(`Failed to get access token: ${tokenResponse.status}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

// Append a row to Google Sheets
async function appendToSheet(data: RegistrationData) {
  const sheetId = Deno.env.get("GOOGLE_SHEET_ID");
  if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID is not set");
  }

  const accessToken = await getAccessToken();
  
  // Format the row data - all values are already validated and trimmed
  const rowData = [
    new Date().toISOString(), // Timestamp
    data.firstName,
    data.lastName,
    data.dateOfBirth,
    data.phoneNumber,
    data.email,
    data.church,
    data.parentName || "",
    data.parentPhone || "",
    data.parentEmail || "",
  ];

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:J:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [rowData],
    }),
  });

  if (!response.ok) {
    console.error("Google Sheets API error: Failed to append to sheet");
    throw new Error(`Failed to append to sheet: ${response.status}`);
  }

  return await response.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify function secret for authentication
    const functionSecret = req.headers.get("x-function-secret");
    if (!FUNCTION_SECRET || functionSecret !== FUNCTION_SECRET) {
      console.error("Unauthorized: Invalid or missing function secret");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Parse and validate input
    const rawBody = await req.json();
    const parseResult = registrationSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      console.error("Validation error:", parseResult.error.errors);
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parseResult.error.errors }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const registrationData = parseResult.data;
    
    console.log("Syncing registration to Google Sheets:", registrationData.email);

    const result = await appendToSheet(registrationData);
    
    console.log("Successfully synced to Google Sheets");

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error syncing to Google Sheets:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

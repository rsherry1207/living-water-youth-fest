import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const registrationEmailSchema = z.object({
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  email: z.string().email().max(255).trim(),
  church: z.string().min(1).max(200).trim(),
});

// HTML entity encoding to prevent XSS in email
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    const rawBody = await req.json();
    const parseResult = registrationEmailSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      console.error("Validation error:", parseResult.error.errors);
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parseResult.error.errors }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { firstName, lastName, email, church } = parseResult.data;
    
    // Escape HTML entities for safe email rendering
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safeChurch = escapeHtml(church);

    console.log(`Sending registration email to ${email}`);

    // Use fetch to call Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SRYFC <onboarding@resend.dev>",
        to: [email],
        subject: "SRYFC 2026 Registration Confirmation",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: 'Georgia', serif; line-height: 1.6; color: #1a365d; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #1a365d, #2563eb); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
                .header h1 { color: white; margin: 0; font-size: 28px; }
                .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
                .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316; }
                .footer { background: #1a365d; color: white; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🌊 SRYFC 2026</h1>
                  <p style="color: #fed7aa; margin: 10px 0 0 0;">Southern Region Youth Fellowship Conference</p>
                </div>
                <div class="content">
                  <h2>Welcome, ${safeFirstName}! 🎉</h2>
                  <p>Thank you for registering for SRYFC 2026! We're thrilled to have you join us for this incredible weekend of faith, fellowship, and fun.</p>
                  
                  <div class="highlight">
                    <h3 style="margin-top: 0;">Registration Details:</h3>
                    <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
                    <p><strong>Email:</strong> ${safeEmail}</p>
                    <p><strong>Church:</strong> ${safeChurch}</p>
                  </div>

                  <h3>What's Next?</h3>
                  <ul>
                    <li>Keep an eye on your inbox for updates about the conference schedule</li>
                    <li>Connect with other attendees from your church</li>
                    <li>Start preparing for an amazing spiritual experience!</li>
                  </ul>

                  <p>If you have any questions, please don't hesitate to reach out to us.</p>
                  <p>See you at SRYFC 2026!</p>
                </div>
                <div class="footer">
                  <p>© 2026 SRYFC - Southern Region Youth Fellowship Conference</p>
                  <p>Mar Thoma Church</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      status: emailResponse.ok ? 200 : 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-registration-email function:", error);
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

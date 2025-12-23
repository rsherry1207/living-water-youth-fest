import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RegistrationEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  church: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, church }: RegistrationEmailRequest = await req.json();

    console.log(`Sending registration email to ${email}`);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
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
                  <h2>Welcome, ${firstName}! 🎉</h2>
                  <p>Thank you for registering for SRYFC 2026! We're thrilled to have you join us for this incredible weekend of faith, fellowship, and fun.</p>
                  
                  <div class="highlight">
                    <h3 style="margin-top: 0;">Registration Details:</h3>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Church:</strong> ${church}</p>
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

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Resend API error: ${res.status}`);
    }

    const emailResponse = await res.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-registration-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

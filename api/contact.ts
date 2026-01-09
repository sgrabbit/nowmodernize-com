import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  website?: string; // honeypot field
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, company, message, website }: ContactFormData =
      req.body;

    // Honeypot spam protection - if website field is filled, it's likely a bot
    if (website && website.trim() !== "") {
      console.log("Spam detected via honeypot");
      // Return success to the bot but don't send email
      return res.status(200).json({ success: true });
    }

    // Validate required fields
    if (!name || !email || !company) {
      return res.status(400).json({
        error: "Missing required fields: name, email, and company are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Get recipient email from environment variable
    const toEmail = process.env.CONTACT_FORM_TO_EMAIL;
    if (!toEmail) {
      console.error("CONTACT_FORM_TO_EMAIL environment variable not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Create HTML email template
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 32px 32px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                        New Contact Form Submission
                      </h1>
                      <p style="margin: 8px 0 0; color: #e0e7ff; font-size: 14px;">
                        Health Check Request
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 32px;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <!-- Name -->
                        <tr>
                          <td style="padding: 0 0 24px 0;">
                            <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 8px;">
                              Name
                            </div>
                            <div style="font-size: 16px; color: #111827; font-weight: 500;">
                              ${escapeHtml(name)}
                            </div>
                          </td>
                        </tr>
                        
                        <!-- Email -->
                        <tr>
                          <td style="padding: 0 0 24px 0;">
                            <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 8px;">
                              Email
                            </div>
                            <div style="font-size: 16px; color: #111827;">
                              <a href="mailto:${escapeHtml(
                                email
                              )}" style="color: #667eea; text-decoration: none;">
                                ${escapeHtml(email)}
                              </a>
                            </div>
                          </td>
                        </tr>
                        
                        <!-- Company -->
                        <tr>
                          <td style="padding: 0 0 24px 0;">
                            <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 8px;">
                              Company
                            </div>
                            <div style="font-size: 16px; color: #111827; font-weight: 500;">
                              ${escapeHtml(company)}
                            </div>
                          </td>
                        </tr>
                        
                        <!-- Message -->
                        ${
                          message
                            ? `
                        <tr>
                          <td style="padding: 0 0 0 0;">
                            <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 8px;">
                              Message
                            </div>
                            <div style="font-size: 15px; color: #374151; line-height: 1.6; padding: 16px; background-color: #f9fafb; border-radius: 6px; border-left: 3px solid #667eea;">
                              ${escapeHtml(message).replace(/\n/g, "<br>")}
                            </div>
                          </td>
                        </tr>
                        `
                            : ""
                        }
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 32px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0; font-size: 13px; color: #6b7280; text-align: center;">
                        Submitted on ${new Date().toLocaleString("en-US", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Replace with your verified domain
      to: [toEmail],
      subject: `New Health Check Request from ${name} at ${company}`,
      html: htmlEmail,
      replyTo: email, // Allow direct reply to the submitter
    });

    console.log("Email sent successfully:", data);

    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);

    // Handle specific error types
    if (error instanceof Error) {
      return res.status(500).json({
        error: "Failed to send email",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

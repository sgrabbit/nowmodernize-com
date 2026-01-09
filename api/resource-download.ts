import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

interface ResourceDownloadData {
  email: string;
  resourceTitle: string;
  resourceUrl: string;
  website?: string; // honeypot field
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, resourceTitle, resourceUrl, website }: ResourceDownloadData =
      req.body;

    // Honeypot spam protection - if website field is filled, it's likely a bot
    if (website && website.trim() !== "") {
      console.log("Spam detected via honeypot");
      // Return success to the bot but don't send email
      return res.status(200).json({ success: true });
    }

    // Validate required fields
    if (!email || !resourceTitle || !resourceUrl) {
      return res.status(400).json({
        error: "Missing required fields: email, resourceTitle, and resourceUrl are required",
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

    // Create HTML email template for internal notification
    const internalHtmlEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Resource Download</title>
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
                        New Resource Download
                      </h1>
                      <p style="margin: 8px 0 0; color: #e0e7ff; font-size: 14px;">
                        A user has requested a resource
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 32px;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
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
                        
                        <!-- Resource -->
                        <tr>
                          <td style="padding: 0 0 24px 0;">
                            <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 8px;">
                              Resource Requested
                            </div>
                            <div style="font-size: 16px; color: #111827; font-weight: 500;">
                              ${escapeHtml(resourceTitle)}
                            </div>
                          </td>
                        </tr>
                        
                        <!-- Resource URL -->
                        <tr>
                          <td style="padding: 0 0 0 0;">
                            <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 8px;">
                              Resource URL
                            </div>
                            <div style="font-size: 14px; color: #374151; word-break: break-all;">
                              <a href="${escapeHtml(
                                resourceUrl
                              )}" style="color: #667eea; text-decoration: none;">
                                ${escapeHtml(resourceUrl)}
                              </a>
                            </div>
                          </td>
                        </tr>
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

    // Create HTML email template for user confirmation
    const userHtmlEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Resource Download</title>
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
                        Your Resource is Ready
                      </h1>
                      <p style="margin: 8px 0 0; color: #e0e7ff; font-size: 14px;">
                        Thank you for downloading from NowModernize
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 32px;">
                      <p style="margin: 0 0 16px; font-size: 16px; color: #111827; line-height: 1.6;">
                        Hi there,
                      </p>
                      <p style="margin: 0 0 24px; font-size: 16px; color: #374151; line-height: 1.6;">
                        Thank you for your interest in our resource: <strong>${escapeHtml(
                          resourceTitle
                        )}</strong>
                      </p>
                      
                      <table role="presentation" style="width: 100%; margin: 24px 0;">
                        <tr>
                          <td style="padding: 20px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">
                              Download Link
                            </p>
                            <a href="${escapeHtml(
                              resourceUrl
                            )}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                              Download Resource
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 24px 0 0; font-size: 15px; color: #374151; line-height: 1.6;">
                        If your download didn't start automatically, you can use the link above to access your resource.
                      </p>
                      
                      <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">
                      
                      <p style="margin: 0 0 16px; font-size: 15px; color: #374151; line-height: 1.6;">
                        <strong>Need help making your ServiceNow instance AI-ready?</strong>
                      </p>
                      <p style="margin: 0 0 16px; font-size: 15px; color: #374151; line-height: 1.6;">
                        Get a free health check and receive a detailed scorecard of your instance in 7–10 business days.
                      </p>
                      <a href="https://nowmodernize.com/contact" style="color: #667eea; text-decoration: none; font-weight: 500;">
                        Request Free Health Check →
                      </a>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 32px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0; font-size: 13px; color: #6b7280; text-align: center;">
                        © ${new Date().getFullYear()} NowModernize. All rights reserved.
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

    // Send internal notification email
    await resend.emails.send({
      from: "Resources <onboarding@resend.dev>", // Replace with your verified domain
      to: [toEmail],
      subject: `New Resource Download: ${resourceTitle}`,
      html: internalHtmlEmail,
      replyTo: email, // Allow direct reply to the submitter
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: "NowModernize <onboarding@resend.dev>", // Replace with your verified domain
      to: [email],
      subject: `Your Resource: ${resourceTitle}`,
      html: userHtmlEmail,
    });

    console.log("Emails sent successfully for resource download");

    return res.status(200).json({
      success: true,
      message: "Resource download notification sent successfully",
    });
  } catch (error) {
    console.error("Error processing resource download:", error);

    // Handle specific error types
    if (error instanceof Error) {
      return res.status(500).json({
        error: "Failed to process request",
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

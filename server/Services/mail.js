import nodemailer from "nodemailer";

let transporter;

const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            }
        });
    }
    return transporter;
};

const mailer = async (to , subject , name) => {
    try {
        const activeTransporter = getTransporter();
        await activeTransporter.sendMail({
            from : process.env.EMAIL_USER,
            to,
            subject,
            html : welcomeTemplate(name)
        });
    }
    catch (error) {
        console.log(error);
    }
}



// Login or register success email
const welcomeTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Platform</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td align="center" style="padding: 40px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
              <!-- Header banner -->
              <tr>
                <td align="center" style="background-color: #4f46e5; padding: 40px 20px;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: bold; letter-spacing: -0.5px;">Welcome to Our Platform!</h1>
                </td>
              </tr>
              <!-- Body Content -->
              <tr>
                <td style="padding: 40px 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                  <p style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold; color: #111111;">Hello ${name},</p>
                  <p style="margin: 0 0 24px 0;">Thank you for registering with us. We are absolutely thrilled to have you on board! Your account is now fully active and ready to use.</p>
                  
                  <!-- CTA Button -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" style="padding: 10px 0 30px 0;">
                        <a href="https://yourwebsite.com" target="_blank" style="background-color: #4f46e5; color: #ffffff; padding: 14px 28px; font-weight: bold; text-decoration: none; border-radius: 6px; display: inline-block; font-size: 16px;">Go to Dashboard</a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0 0 8px 0;">If you have any questions or need help setting things up, reply directly to this email. Our support team is always here for you.</p>
                  <p style="margin: 24px 0 0 0; color: #666666;">Cheers,<br>The Team</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="background-color: #fafafa; padding: 24px 30px; border-top: 1px solid #eeeeee; color: #888888; font-size: 12px;">
                  <p style="margin: 0 0 8px 0;">You received this email because you signed up on our website.</p>
                  <p style="margin: 0;">&copy; 2026 YourCompany. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};


export default mailer;
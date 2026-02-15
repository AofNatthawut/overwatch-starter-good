const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

/**
 * Sends an email alert for an incident.
 * Uses Ethereal for testing purposes.
 * @param {Object} incident The incident data.
 */
async function sendEmail(incident) {
    try {
        // Create test account
        const testAccount = await nodemailer.createTestAccount();

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        // Send mail
        const info = await transporter.sendMail({
            from: '"Overwatch AI" <system@overwatch.ai>',
            to: "commander@overwatch.ai",
            subject: `🚨 Incident Report: ${incident.type || 'EMERGENCY'}`,
            text: `Incident reported at ${new Date().toLocaleString()}\n\nDetails: ${incident.text}\nPriority: ${incident.priority}\n\nOverwatch Tactical Command`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc;">
                    <h2 style="color: #ff4d4d;">🚨 Incident Report: ${incident.type || 'EMERGENCY'}</h2>
                    <p><strong>Reported at:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Details:</strong> ${incident.text}</p>
                    <p><strong>Priority:</strong> ${incident.priority}</p>
                    <hr>
                    <p style="font-size: 10px; color: #888;">Overwatch Tactical Command - Digital Archive System</p>
                </div>
            `,
        });

        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log(`[email-agent] Email sent: ${info.messageId}`);
        console.log(`[email-agent] Preview URL: ${previewUrl}`);

        // Save to file for easy access
        const logPath = path.join(__dirname, '../latest_email_preview.txt');
        fs.writeFileSync(logPath, previewUrl);

    } catch (error) {
        console.error('[email-agent] Error sending email:', error.message);
    }
}

module.exports = { sendEmail };

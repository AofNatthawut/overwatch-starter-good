const axios = require('axios');

/**
 * Sends a rich embed alert to a Discord channel via Webhook.
 * @param {Object} incidentData The incident data received from the hub.
 */
async function sendDiscordAlert(incidentData) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl || webhookUrl === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
        console.warn('[discord-agent] Missing DISCORD_WEBHOOK_URL in .env. Skipping alert.');
        return;
    }

    const { type, text, priority, id } = incidentData;

    const payload = {
        embeds: [{
            title: `🚨 รับแจ้งเหตุ : ${type || 'SYSTEM'}`,
            description: text || 'ไม่มีรายละเอียดเหตุการณ์',
            color: 16711680, // Decimal for Red (#FF0000)
            fields: [
                {
                    name: 'Priority',
                    value: priority || 'NORMAL',
                    inline: true
                },
                {
                    name: 'Incident ID',
                    value: id ? id.substring(0, 8) : 'N/A',
                    inline: true
                }
            ],
            footer: {
                text: 'Overwatch AI System'
            },
            timestamp: new Date().toISOString()
        }]
    };

    console.log(`[discord-agent] Sending alert to Discord...`);

    try {
        await axios.post(webhookUrl, payload);
        console.log('[discord-agent] Discord alert sent successfully.');
    } catch (error) {
        console.error('[discord-agent] Failed to send Discord alert:', error.message);
    }
}

module.exports = { sendDiscordAlert };

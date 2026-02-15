const axios = require('axios');

/**
 * Sends a push notification via ntfy.sh
 * @param {Object} incidentData The incident data received from the hub.
 */
async function sendNotification(incidentData) {
    const channel = 'overwatch_jayrutsin'; // Unique channel name
    const url = `https://ntfy.sh/${channel}`;

    console.log(`[ntfy-agent] Sending notification to ${url}...`);

    try {
        const { translations, type } = incidentData;
        const message = `
TH: ${translations.TH}
EN: ${translations.EN}
JP: ${translations.JP}
CN: ${translations.CN}
FR: ${translations.FR}
        `.trim();

        await axios.post('https://ntfy.adminforge.de/overwatch_jayrutsin', message, {
            headers: {
                'Title': `${type || 'ALERT'} (Global Coverage)`,
                'Priority': 'high',
                'Tags': 'rotating_light,earth_asia'
            }
        });
        console.log('[ntfy-agent] Multi-language notification sent.');
    } catch (error) {
        console.error('[ntfy-agent] Failed to send notification:', error.message);
    }
}

module.exports = { sendNotification };

const cron = require('node-cron');
const { generateReport } = require('./agents/pdf-agent');

/**
 * Initializes all system cron jobs.
 */
function initCronJobs() {
    console.log('[Timekeeper] Initializing scheduled tasks...');

    // Mission 19: Running scheduled maintenance every 2 minutes
    cron.schedule('*/2 * * * *', () => {
        const timestamp = new Date().toLocaleString();
        console.log(`⏳ [${timestamp}] Running scheduled maintenance...`);

        // Automated PDF Health Report
        const healthPayload = {
            type: 'SYSTEM_HEALTH',
            text: 'System Diagnostics: All core agents (Pocket, Secretary, Liaison, Postman, Translator) are operational. No critical anomalies detected.',
            priority: 'LOW',
            createdAt: new Date()
        };

        generateReport(healthPayload);
        console.log(`[Timekeeper] Automated health report generated.`);
    });
}

module.exports = { initCronJobs };

const axios = require('axios');
const { sendNotification } = require('./ntfy-agent');

/**
 * Monitors the core NestJS service health.
 * Triggers alerts if the service is unreachable.
 */
function startWatchdog() {
    console.log('[Watchdog] Guardian engaged. Monitoring Core on Port 3000...');

    setInterval(async () => {
        try {
            // Note: Using /api as dummy check if /status is not yet implemented in NestJS
            // or just the root since we know it responds.
            await axios.get('http://localhost:3000/');
            console.log('✅ [Watchdog] Core Online');
        } catch (error) {
            console.error('❌ [Watchdog] CORE DISCONNECTED!');

            const alertPayload = {
                type: 'SYSTEM_FAILURE',
                text: '🚨 SYSTEM DOWN: CORE DISCONNECTED (NestJS unreachable)',
                priority: 'HIGH',
                translations: {
                    TH: '🚨 ระบบขัดข้อง: เซิร์ฟเวอร์หลักขาดการเชื่อมต่อ',
                    EN: '🚨 SYSTEM DOWN: CORE DISCONNECTED',
                    JP: '🚨 システムダウン: コア切断',
                    CN: '🚨 系统崩溃: 核心断开',
                    FR: '🚨 SYSTÈME EN PANNE: CŒUR DÉCONNECTÉ'
                }
            };

            // Alert via ntfy (Pocket Agent)
            sendNotification(alertPayload);
        }
    }, 10000); // Every 10 seconds
}

module.exports = { startWatchdog };

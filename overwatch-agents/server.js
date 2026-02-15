const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sendNotification } = require('./agents/ntfy-agent');
const { generateReport } = require('./agents/pdf-agent');
const { sendDiscordAlert } = require('./agents/discord-agent');
const { sendEmail } = require('./agents/email-agent');
const { translateAll } = require('./agents/translator-agent');
const { initCronJobs } = require('./cron-jobs');
const { startWatchdog } = require('./agents/watchdog-agent');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log(`[Aegis Hub] GET / request from ${req.ip}`);
    res.send('🚨 Aegis Hub is Online and Ready (Port 4000)');
});

app.post('/dispatch', (req, res) => {
    console.log('🚨 ALERT RECEIVED:', req.body);

    const translations = translateAll(req.body.text);
    // Use translations.EN as the primary text for other agents, 
    // but pass all translations to ntfy-agent for the 5-language requirement.
    const incidentWithTranslation = { ...req.body, text: translations.EN, translations };

    // Mission 11: Call Pocket Agent (Modified for 5 languages)
    sendNotification(incidentWithTranslation);

    // Mission 12: Call Secretary Agent
    generateReport(incidentWithTranslation);

    // Mission 13: Call Liaison Agent
    sendDiscordAlert(incidentWithTranslation);

    // Mission 17: Call Postman Agent
    sendEmail(incidentWithTranslation);

    res.json({ status: 'received' });
});

app.listen(PORT, () => {
    console.log(`[Aegis Hub] Running on port ${PORT}`);
    initCronJobs();
    startWatchdog();
});

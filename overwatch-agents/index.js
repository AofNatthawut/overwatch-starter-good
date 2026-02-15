require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const webhookRoutes = require('./routes/webhooks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Agent Hub is online', timestamp: new Date().toISOString() });
});

// Routes
app.use('/dispatch', webhookRoutes);

app.listen(PORT, () => {
    console.log(`[Agent Hub] Running on port ${PORT}`);
});

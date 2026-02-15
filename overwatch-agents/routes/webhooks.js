const express = require('express');
const router = express.Router();
const agentDispatcher = require('../services/agentDispatcher');

/**
 * POST /webhook
 * Receives external webhooks and distributes them to sub-agents.
 */
router.post('/', async (req, res) => {
    console.log('[Webhook] Received payload:', JSON.stringify(req.body, null, 2));

    try {
        const result = await agentDispatcher.dispatch(req.body);
        res.status(200).json({
            success: true,
            message: 'Task successfully dispatched',
            dispatch_details: result
        });
    } catch (error) {
        console.error('[Webhook] Error:', error.message);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;

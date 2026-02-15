const axios = require('axios');
const agentRegistry = require('../config/agents.json');

class AgentDispatcher {
    /**
     * Finds the best agent for a given task type and forwards the payload.
     * @param {Object} payload The webhook payload.
     * @returns {Promise<Object>} The response from the sub-agent.
     */
    async dispatch(payload) {
        const { task_type, data, priority } = payload;

        let targetTaskType = task_type;

        // If no task_type but it's an incident, default to text_analysis for high priority
        if (!targetTaskType && priority === 'HIGH') {
            targetTaskType = 'text_analysis';
        }

        if (!targetTaskType) {
            throw new Error('Missing "task_type" in payload');
        }

        // Find agent with matching capability
        const agent = agentRegistry.agents.find(a => a.capabilities.includes(targetTaskType));

        if (!agent) {
            console.error(`[Dispatcher] No agent found for task: ${task_type}`);
            throw new Error(`No sub-agent registered for task type: ${task_type}`);
        }

        console.log(`[Dispatcher] Routing task "${task_type}" to agent: ${agent.name} (${agent.endpoint})`);

        try {
            const finalPayload = {
                hub_id: 'agent-hub-01',
                timestamp: new Date().toISOString(),
                task_type: targetTaskType,
                data: payload.data || payload
            };

            const response = await axios.post(agent.endpoint, finalPayload);

            return {
                agent_id: agent.id,
                status: 'dispatched',
                agent_response: response.data
            };
        } catch (error) {
            console.error(`[Dispatcher] Failed to reach agent ${agent.id}:`, error.message);
            throw new Error(`Agent ${agent.name} is unreachable or returned an error.`);
        }
    }
}

module.exports = new AgentDispatcher();

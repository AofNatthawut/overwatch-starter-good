# Agent Hub API Gateway

The Agent Hub is a central Microservices API Gateway that receives external webhooks and dispatches tasks to specialized sub-agents based on their capabilities.

## Features
- **Webhook Integration**: Central point for receiving external POST requests.
- **Dynamic Routing**: Dispatches tasks based on payload attributes.
- **Agent Registry**: Easy to add or remove sub-agents via JSON configuration.

## Getting Started

### Prerequisites
- Node.js installed

### Installation
```bash
npm install
```

### Running the Hub
```bash
npm start
# or for development
npm run dev
```

### Testing the Hub
1. Start the mock agent in a separate terminal:
   ```bash
   npm run mock-agent
   ```
2. Send a test webhook:
   ```bash
   curl -X POST http://localhost:4000/dispatch -H "Content-Type: application/json" -d '{"task_type":"text_analysis","data":{"text":"Hello World"}}'
   ```

## Configuration
Modify `config/agents.json` to register new sub-agents:
```json
{
    "id": "agent-id",
    "name": "Agent Name",
    "endpoint": "http://localhost:port/task",
    "capabilities": ["capability1", "capability2"]
}
```

## API Endpoint
`POST /dispatch`
Payload format:
```json
{
    "task_type": "string",
    "data": { ... }
}
```
OR for NestJS cross-dimension signals:
```json
{
    "priority": "HIGH",
    "text": "...",
    "timestamp": "..."
}
```

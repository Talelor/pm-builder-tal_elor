# Support Ticket Routing Agent - n8n Workflow

## Overview

This n8n workflow implements an intelligent AI-powered support ticket routing system that automatically classifies incoming customer support tickets and routes them to the appropriate team. It uses OpenAI's GPT-4 to analyze ticket content, determine the best team assignment, provide confidence scoring, and escalate to manual review when uncertain.

## Features

- **Intelligent Classification**: Uses AI to analyze ticket subject, body, and metadata
- **Multi-Team Routing**: Supports Engineering, Sales, Customer Success, Billing, General, and Manual Review
- **Confidence Scoring**: Provides 0.0-1.0 confidence scores with conservative bias
- **VIP Handling**: Special logic for VIP customers with lower confidence thresholds
- **Priority Detection**: Automatically flags critical, high, and normal priority tickets
- **Multi-Topic Support**: Identifies primary and secondary topics in complex tickets
- **Conservative Escalation**: Routes ambiguous tickets to manual review rather than misrouting

## Workflow Architecture

The workflow consists of 4 main components:

1. **Webhook Trigger** - Receives POST requests with ticket data
2. **Ticket Classifier** (Information Extractor) - Analyzes and classifies tickets using AI
3. **OpenAI Chat Model** - Powers the classification with GPT-4
4. **Respond to Webhook** - Returns the routing decision as JSON

## Prerequisites

Before using this workflow, you need:

1. **n8n Instance** (self-hosted or cloud)
2. **OpenAI API Key** with access to GPT-4
3. **Basic understanding** of n8n workflows

## Setup Instructions

### Step 1: Import the Workflow

1. Open your n8n instance
2. Click on "Workflows" in the sidebar
3. Click "Add Workflow" → "Import from File"
4. Select the `Support-Ticket-Routing-Agent-Workflow-v2.json` file
5. Click "Import"

### Step 2: Configure OpenAI Credentials

1. In the workflow, click on the "OpenAI Chat Model" node
2. Click "Credentials" → "Create New"
3. Enter your OpenAI API key
4. Save the credentials

### Step 3: Activate the Workflow

1. Click the "Active" toggle in the top-right corner
2. The webhook URL will be generated automatically
3. Copy the webhook URL (you'll need it to send requests)

The webhook URL will look like:
```
https://your-n8n-instance.com/webhook/support-ticket-routing
```

## API Usage

### Request Format

Send a POST request to the webhook URL with the following JSON body:

```json
{
  "ticketId": "ticket-12345",
  "ticketSubject": "API endpoint returning 500 errors",
  "ticketBody": "Our integration has been failing since yesterday morning. We're getting 500 Internal Server Error responses from the /api/v2/users endpoint. This is blocking our production deployment.",
  "customerTier": "enterprise",
  "vipFlag": false
}
```

### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ticketId` | string | Yes | Unique identifier for the ticket |
| `ticketSubject` | string | Yes | Ticket subject line (max 200 chars) |
| `ticketBody` | string | Yes | Full ticket description (max 5000 chars) |
| `customerTier` | string | Yes | Customer level: "free", "pro", or "enterprise" |
| `vipFlag` | boolean | Yes | VIP customer status: true or false |

### Response Format

The workflow returns a JSON response with the routing decision:

```json
{
  "ticket_id": "ticket-12345",
  "assigned_team": "Engineering",
  "confidence": 0.95,
  "reasoning": "Clear technical issue with specific API endpoint. 500 error indicates server-side problem requiring engineering investigation.",
  "priority": "high",
  "vip_override": false,
  "secondary_topics": []
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `ticket_id` | string | Matches the input ticketId |
| `assigned_team` | string | Team assignment: "Engineering", "Sales", "CustomerSuccess", "Billing", "General", or "ManualReview" |
| `confidence` | number | Confidence score from 0.0 to 1.0 |
| `reasoning` | string | 1-2 sentence explanation for the decision |
| `priority` | string | Priority level: "normal", "high", or "critical" |
| `vip_override` | boolean | True if VIP status influenced the routing |
| `secondary_topics` | array | Other topics identified (not primary) |

## Team Routing Criteria

### Engineering
Technical issues, bugs, API errors, performance problems, integration failures

**Example Keywords**: "500 error", "API", "broken", "not working", "bug", "crash"

### Sales
Pricing inquiries, plan comparisons, upgrade questions, demo requests, pre-purchase questions

**Example Keywords**: "pricing", "upgrade", "demo", "purchase", "plan comparison"

### Customer Success
Onboarding help, feature questions, best practices, training, account strategy

**Example Keywords**: "how to", "training", "best practice", "onboarding", "feature question"

### Billing
Payment issues, invoice questions, refunds, plan changes, subscription management

**Example Keywords**: "invoice", "payment", "refund", "charge", "subscription"

### General
Unclear requests, feedback, generic inquiries, non-specific "help" requests

### ManualReview
Ambiguous tickets with confidence < 0.7, or VIP tickets with confidence < 0.6

## Classification Logic

### Decision Rules

1. **High Confidence (≥0.7)**: Route to the determined team
2. **Low Confidence (<0.7)**: Route to ManualReview
3. **VIP + Low Confidence (<0.6)**: Route to ManualReview with high priority
4. **Multi-Topic Tickets**: Route to primary team, list others in secondary_topics

### Priority Assignment

- **Critical**: "production down", "all users affected", "revenue impact", "security issue"
- **High**: "blocking deployment", "multiple users reporting", "SLA breach", VIP customer
- **Normal**: Everything else

## Testing Examples

### Example 1: Clear Engineering Issue

**Request:**
```json
{
  "ticketId": "ticket-001",
  "ticketSubject": "500 error when calling /api/v2/users endpoint",
  "ticketBody": "Our integration has been failing since yesterday morning. We're getting 500 Internal Server Error responses from the /api/v2/users endpoint. This is blocking our production deployment.",
  "customerTier": "enterprise",
  "vipFlag": false
}
```

**Expected Response:**
```json
{
  "ticket_id": "ticket-001",
  "assigned_team": "Engineering",
  "confidence": 0.95,
  "reasoning": "Clear technical issue with specific API endpoint. 500 error indicates server-side problem requiring engineering investigation.",
  "priority": "high",
  "vip_override": false,
  "secondary_topics": []
}
```

### Example 2: Clear Billing Issue

**Request:**
```json
{
  "ticketId": "ticket-002",
  "ticketSubject": "Invoice shows wrong amount",
  "ticketBody": "I was charged $299 but my plan should be $199. Can you please refund the difference?",
  "customerTier": "pro",
  "vipFlag": false
}
```

**Expected Response:**
```json
{
  "ticket_id": "ticket-002",
  "assigned_team": "Billing",
  "confidence": 0.93,
  "reasoning": "Billing inquiry regarding incorrect charge and refund request. Clear pricing discrepancy requiring billing team review.",
  "priority": "normal",
  "vip_override": false,
  "secondary_topics": []
}
```

### Example 3: Ambiguous - Needs Escalation

**Request:**
```json
{
  "ticketId": "ticket-003",
  "ticketSubject": "API key not working",
  "ticketBody": "My API key doesn't work. Please fix.",
  "customerTier": "free",
  "vipFlag": false
}
```

**Expected Response:**
```json
{
  "ticket_id": "ticket-003",
  "assigned_team": "ManualReview",
  "confidence": 0.45,
  "reasoning": "Ambiguous: could be billing issue (invalid/expired key) or technical issue (authentication problem). Insufficient context to route confidently.",
  "priority": "normal",
  "vip_override": false,
  "secondary_topics": []
}
```

### Example 4: VIP Customer

**Request:**
```json
{
  "ticketId": "ticket-004",
  "ticketSubject": "Need help with our account",
  "ticketBody": "Can someone call me to discuss our account setup? We're having some issues.",
  "customerTier": "enterprise",
  "vipFlag": true
}
```

**Expected Response:**
```json
{
  "ticket_id": "ticket-004",
  "assigned_team": "CustomerSuccess",
  "confidence": 0.82,
  "reasoning": "VIP enterprise customer requesting account support and onboarding assistance. Customer Success appropriate for strategic account management.",
  "priority": "high",
  "vip_override": true,
  "secondary_topics": []
}
```

### Example 5: Multi-Topic Ticket

**Request:**
```json
{
  "ticketId": "ticket-005",
  "ticketSubject": "Refund request and API still broken",
  "ticketBody": "I want a refund for this month because the API has been broken for 3 days. When will the /webhooks endpoint be fixed?",
  "customerTier": "pro",
  "vipFlag": false
}
```

**Expected Response:**
```json
{
  "ticket_id": "ticket-005",
  "assigned_team": "Billing",
  "confidence": 0.78,
  "reasoning": "Primary issue is refund request due to service outage. Route to Billing for refund processing; they will coordinate with Engineering on API fix status.",
  "priority": "high",
  "vip_override": false,
  "secondary_topics": ["Engineering: API/webhooks endpoint issue"]
}
```

## Testing with cURL

```bash
curl -X POST https://your-n8n-instance.com/webhook/support-ticket-routing \
  -H "Content-Type: application/json" \
  -d '{
    "ticketId": "test-001",
    "ticketSubject": "500 error on API",
    "ticketBody": "Getting 500 errors from your API endpoint",
    "customerTier": "enterprise",
    "vipFlag": false
  }'
```

## Testing with JavaScript

```javascript
const response = await fetch('https://your-n8n-instance.com/webhook/support-ticket-routing', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ticketId: 'test-001',
    ticketSubject: '500 error on API',
    ticketBody: 'Getting 500 errors from your API endpoint',
    customerTier: 'enterprise',
    vipFlag: false
  })
});

const result = await response.json();
console.log(result);
```

## Customization

### Adjusting Team Criteria

Edit the "Ticket Classifier" node's system message to modify team routing criteria:

1. Click on the "Ticket Classifier" node
2. Scroll to "Options" → "System Message"
3. Modify the team criteria descriptions
4. Save and re-activate the workflow

### Changing Confidence Thresholds

To adjust the confidence thresholds (default: 0.7 for normal, 0.6 for VIP):

1. Edit the system message in the "Ticket Classifier" node
2. Update the decision rules section
3. Save and test with various tickets

### Using Different AI Models

To use a different OpenAI model (e.g., gpt-3.5-turbo for cost savings):

1. Click on the "OpenAI Chat Model" node
2. Change the "Model" field to your desired model
3. Save and test

## Troubleshooting

### Issue: Workflow not receiving requests

**Solution**: Verify the webhook is active and the URL is correct

### Issue: OpenAI API errors

**Solution**: Check your API key, ensure you have credits, and verify model access

### Issue: Incorrect classifications

**Solution**: Review the system message and adjust team criteria or add more context to tickets

### Issue: All tickets routing to ManualReview

**Solution**: The AI might be too conservative. Consider adjusting confidence thresholds or providing more detailed ticket bodies

## Performance Considerations

- **Response Time**: Typically 2-5 seconds depending on OpenAI API latency
- **Rate Limits**: Respect OpenAI API rate limits (varies by plan)
- **Cost**: Each classification costs approximately $0.01-0.03 (GPT-4) or $0.001-0.003 (GPT-3.5)

## Security Best Practices

1. **API Key Protection**: Never expose your OpenAI API key in client-side code
2. **Webhook Authentication**: Consider adding authentication to your webhook
3. **Input Validation**: Validate ticket data before processing
4. **Rate Limiting**: Implement rate limiting to prevent abuse

## Integration Examples

### Integrate with Zendesk

```javascript
// Zendesk trigger → Send to n8n workflow
const ticket = {
  ticketId: zendeskTicket.id,
  ticketSubject: zendeskTicket.subject,
  ticketBody: zendeskTicket.description,
  customerTier: zendeskTicket.custom_fields.tier,
  vipFlag: zendeskTicket.custom_fields.vip
};

const routing = await fetch('https://n8n.com/webhook/support-ticket-routing', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(ticket)
});

// Apply routing decision
await assignTicketToTeam(routing.assigned_team);
```

### Integrate with Intercom

```javascript
// Intercom webhook → n8n workflow
app.post('/intercom-webhook', async (req, res) => {
  const conversation = req.body.data.item;

  const ticket = {
    ticketId: conversation.id,
    ticketSubject: conversation.title || 'No subject',
    ticketBody: conversation.conversation_message.body,
    customerTier: conversation.user.custom_attributes.tier,
    vipFlag: conversation.user.custom_attributes.vip
  };

  const routing = await callN8nWorkflow(ticket);

  // Route in Intercom
  await assignConversation(routing.assigned_team);
});
```

## Monitoring and Analytics

Track these metrics for workflow performance:

1. **Classification Accuracy**: Review manual overrides vs. AI decisions
2. **Confidence Distribution**: Monitor average confidence scores
3. **Team Distribution**: Ensure balanced routing across teams
4. **Escalation Rate**: Track ManualReview percentage
5. **Response Time**: Monitor workflow execution time

## Support and Contribution

For issues, questions, or contributions:

- Review the original prompt document for detailed classification logic
- Test with the provided examples before deploying to production
- Monitor initial classifications and adjust as needed

## License

This workflow is based on the Support Ticket Routing Agent prompt and can be freely used and modified for your organization's needs.

## Version History

- **v2.0** (2026-01-04): Complete rebuild using Information Extractor node with proper n8n architecture
- **v1.0** (2026-01-04): Initial version with basic OpenAI integration

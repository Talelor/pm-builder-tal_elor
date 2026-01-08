# Support Ticket Routing Agent - Complete Usage Guide

## 🎯 What You'll See in n8n

When you import this workflow, you'll see a complete visual flow with **10 processing steps** and **11 sticky notes** explaining each part.

---

## 📊 Visual Workflow Structure

```
[Manual Trigger] → [Extract Data] → [AI Analysis] → [Team Classifier]
→ [Confidence Score] → [VIP Check] → [Multi-Topic] → [Priority]
→ [Route Decision] → [Format Response (2 branches)]
                ↓
        [OpenAI GPT-4] (shared AI model)
```

---

## 🚀 Quick Start Guide

### Step 1: Import the Workflow

1. Open your n8n instance
2. Click **"Add Workflow"** → **"Import from File"**
3. Select `Support-Ticket-Routing-Agent-Complete.json`
4. Click **"Import"**

### Step 2: Configure OpenAI Credentials

1. Click on the **"OpenAI GPT-4"** node (bottom center of workflow)
2. Click **"Credentials"** → **"Create New"**
3. Enter your OpenAI API key
4. Click **"Save"**

### Step 3: Test the Workflow

1. Click on the **"Manual Trigger"** node (top left)
2. In the **"Execute Node"** panel, click **"Add Input Data"**
3. Paste the test ticket JSON (see example below)
4. Click **"Execute Workflow"** button (play icon at bottom)

---

## 📝 Input Format

Use this exact JSON format when testing:

```json
{
  "ticket_id": "c3d4e5f6-g7h8-9012-cdef-gh3456789012",
  "subject": "Enterprise plan pricing for 100+ users",
  "body": "Hi, I'm evaluating your platform for our company (250 employees). We're currently using a competitor but looking to switch. Can you provide pricing information for the Enterprise plan with 100+ user seats? We'd also like to know about volume discounts, SSO integration, and dedicated support options. Is it possible to schedule a demo call this week?",
  "customer_id": "cust-003-free-globalbiz",
  "account_tier": "free",
  "vip_flag": false,
  "created_at": "2026-01-04T09:45:10Z",
  "source": "chat"
}
```

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `ticket_id` | string | Unique ticket identifier | "c3d4e5f6-g7h8-9012..." |
| `subject` | string | Ticket subject line | "Enterprise plan pricing..." |
| `body` | string | Full ticket description | "Hi, I'm evaluating..." |
| `customer_id` | string | Customer identifier | "cust-003-free-globalbiz" |
| `account_tier` | string | Customer tier: "free", "pro", "enterprise" | "free" |
| `vip_flag` | boolean | VIP customer status | false |
| `created_at` | string | Timestamp (ISO 8601) | "2026-01-04T09:45:10Z" |
| `source` | string | Ticket source: "chat", "email", "phone" | "chat" |

---

## 🔍 Step-by-Step Workflow Explanation

### **STEP 1: Manual Trigger** 📋
- **What it does:** Starting point for manual ticket input
- **What you do:** Click and add your ticket JSON data
- **Sticky note:** Blue note explaining expected input format

### **STEP 2: Extract Ticket Data** 🔍
- **What it does:** Validates and extracts all ticket fields
- **Node type:** Set node (data transformation)
- **Output:** Clean ticket object with all 8 fields
- **Sticky note:** Explains extraction and validation

### **STEP 3: Ticket Analysis** 🧠
- **What it does:** AI analyzes customer intent and core problem
- **Node type:** Basic LLM Chain (GPT-4)
- **Prompt:** "What is the customer's primary need?"
- **Output:** Natural language analysis of the ticket
- **Sticky note:** Explains analysis purpose

### **STEP 4: Team Classification** 🎯
- **What it does:** Classifies ticket into one of 5 teams
- **Node type:** Text Classifier
- **Categories:**
  - **Engineering** - Technical issues, bugs, API errors
  - **Sales** - Pricing, demos, pre-purchase questions
  - **CustomerSuccess** - Onboarding, training, best practices
  - **Billing** - Payments, invoices, refunds
  - **General** - Unclear or general inquiries
- **Output:** Suggested team name
- **Sticky note:** Shows all 5 categories

### **STEP 5: Confidence Assessment** 📊
- **What it does:** Evaluates classification confidence (0.0-1.0)
- **Node type:** Basic LLM Chain (GPT-4)
- **Logic:**
  - Clear ticket + strong keywords = high confidence (>0.7)
  - Ambiguous or vague = low confidence (<0.7)
- **Output:** Decimal number (e.g., 0.85)
- **Sticky note:** Explains confidence scoring

### **STEP 6: VIP Detection** 👑
- **What it does:** Checks if customer is VIP
- **Node type:** IF node (conditional logic)
- **Logic:**
  - If VIP = true → Flag for special handling
  - If VIP + confidence < 0.6 → Force ManualReview
- **Two outputs:** True branch / False branch
- **Sticky note:** Explains VIP special handling

### **STEP 7: Multi-Topic Handling** 📝
- **What it does:** Identifies secondary issues in the ticket
- **Node type:** Basic LLM Chain (GPT-4)
- **Examples:**
  - "refund, API issue" - Ticket has billing AND technical issues
  - "none" - Only one clear topic
- **Output:** Comma-separated topics or "none"
- **Sticky note:** Explains multi-topic detection

### **STEP 8: Priority Assignment** ⚡
- **What it does:** Assigns priority based on keywords
- **Node type:** Switch node (3 routes)
- **Logic:**
  - **Critical:** Contains "production down", "all users affected", "security"
  - **High:** Contains "urgent", "blocking", "SLA breach", OR is VIP
  - **Normal:** Everything else
- **Three outputs:** critical / high / normal
- **Sticky note:** Shows priority criteria

### **STEP 9: Route Decision** 🎯
- **What it does:** Final decision on team assignment
- **Node type:** IF node
- **Logic:**
  - If confidence ≥ 0.7 → Go to High Confidence branch
  - If confidence < 0.7 → Go to Manual Review branch
- **Two outputs:** High confidence / Low confidence
- **Sticky note:** Explains routing logic

### **STEP 10: Format Response** 📤
- **What it does:** Creates final JSON output
- **Node type:** Set node (2 separate nodes)
- **Branch A - High Confidence:**
  - assigned_team = Classified team
  - reasoning = Based on analysis
- **Branch B - Manual Review:**
  - assigned_team = "ManualReview"
  - reasoning = "Low confidence, needs human review"
- **Output:** Complete response JSON
- **Sticky note:** Explains output format

### **OpenAI GPT-4 Model** 🤖
- **What it does:** Shared AI model for all AI nodes
- **Connected to:**
  - Ticket Analysis
  - Confidence Assessment
  - Multi-Topic Handling
- **Sticky note:** Shows it's shared across nodes (orange color)

---

## 📤 Output Format

After execution, you'll get this JSON response:

```json
{
  "ticket_id": "c3d4e5f6-g7h8-9012-cdef-gh3456789012",
  "assigned_team": "Sales",
  "confidence": 0.92,
  "reasoning": "Ticket classified as Sales based on: Customer is evaluating the platform for enterprise use, asking about pricing for 100+ users, volume discounts, and requesting a demo call. Clear pre-purchase inquiry.",
  "priority": "normal",
  "vip_override": false,
  "secondary_topics": []
}
```

### Output Fields Explained

| Field | Description |
|-------|-------------|
| `ticket_id` | Same as input |
| `assigned_team` | Final team: Engineering, Sales, CustomerSuccess, Billing, General, or ManualReview |
| `confidence` | 0.0-1.0 confidence score |
| `reasoning` | 1-2 sentences explaining the decision |
| `priority` | "normal", "high", or "critical" |
| `vip_override` | true if VIP status influenced routing |
| `secondary_topics` | Array of additional issues found, or empty [] |

---

## 🧪 Test Examples

### Example 1: Clear Sales Inquiry (Your Example)

**Input:**
```json
{
  "ticket_id": "c3d4e5f6-g7h8-9012-cdef-gh3456789012",
  "subject": "Enterprise plan pricing for 100+ users",
  "body": "Hi, I'm evaluating your platform for our company (250 employees). We're currently using a competitor but looking to switch. Can you provide pricing information for the Enterprise plan with 100+ user seats? We'd also like to know about volume discounts, SSO integration, and dedicated support options. Is it possible to schedule a demo call this week?",
  "customer_id": "cust-003-free-globalbiz",
  "account_tier": "free",
  "vip_flag": false,
  "created_at": "2026-01-04T09:45:10Z",
  "source": "chat"
}
```

**Expected Output:**
```json
{
  "ticket_id": "c3d4e5f6-g7h8-9012-cdef-gh3456789012",
  "assigned_team": "Sales",
  "confidence": 0.92,
  "reasoning": "Clear pre-purchase inquiry about enterprise pricing, volume discounts, and demo request. Strong sales keywords throughout.",
  "priority": "normal",
  "vip_override": false,
  "secondary_topics": []
}
```

---

### Example 2: Clear Engineering Issue

**Input:**
```json
{
  "ticket_id": "eng-001",
  "subject": "500 error on API endpoint",
  "body": "We're getting 500 Internal Server Error from /api/v2/users endpoint since yesterday. Production is affected. Error logs attached.",
  "customer_id": "cust-ent-001",
  "account_tier": "enterprise",
  "vip_flag": false,
  "created_at": "2026-01-05T10:30:00Z",
  "source": "email"
}
```

**Expected Output:**
```json
{
  "ticket_id": "eng-001",
  "assigned_team": "Engineering",
  "confidence": 0.95,
  "reasoning": "Clear technical issue with specific API endpoint. 500 error indicates server-side problem requiring immediate engineering investigation.",
  "priority": "critical",
  "vip_override": false,
  "secondary_topics": []
}
```

---

### Example 3: Ambiguous Ticket (Low Confidence)

**Input:**
```json
{
  "ticket_id": "amb-001",
  "subject": "Need help",
  "body": "Something is not working. Please fix.",
  "customer_id": "cust-free-001",
  "account_tier": "free",
  "vip_flag": false,
  "created_at": "2026-01-05T11:00:00Z",
  "source": "chat"
}
```

**Expected Output:**
```json
{
  "ticket_id": "amb-001",
  "assigned_team": "ManualReview",
  "confidence": 0.35,
  "reasoning": "Low confidence (0.35). Extremely vague ticket with no specific details. Escalating to manual review for human assessment. Original suggestion: General",
  "priority": "normal",
  "vip_override": false,
  "secondary_topics": []
}
```

---

### Example 4: VIP Customer

**Input:**
```json
{
  "ticket_id": "vip-001",
  "subject": "Account setup assistance needed",
  "body": "We need help setting up our enterprise account and onboarding our team.",
  "customer_id": "cust-vip-enterprise",
  "account_tier": "enterprise",
  "vip_flag": true,
  "created_at": "2026-01-05T12:00:00Z",
  "source": "phone"
}
```

**Expected Output:**
```json
{
  "ticket_id": "vip-001",
  "assigned_team": "CustomerSuccess",
  "confidence": 0.88,
  "reasoning": "VIP enterprise customer requesting account setup and team onboarding. Customer Success appropriate for strategic account management.",
  "priority": "high",
  "vip_override": true,
  "secondary_topics": []
}
```

---

### Example 5: Multi-Topic Ticket

**Input:**
```json
{
  "ticket_id": "multi-001",
  "subject": "Refund request and API broken",
  "body": "I want a refund for this month because the API has been broken for 3 days. When will the /webhooks endpoint be fixed?",
  "customer_id": "cust-pro-002",
  "account_tier": "pro",
  "vip_flag": false,
  "created_at": "2026-01-05T13:00:00Z",
  "source": "email"
}
```

**Expected Output:**
```json
{
  "ticket_id": "multi-001",
  "assigned_team": "Billing",
  "confidence": 0.78,
  "reasoning": "Primary issue is refund request due to service outage. Route to Billing for refund processing; they will coordinate with Engineering on API fix.",
  "priority": "high",
  "vip_override": false,
  "secondary_topics": ["Engineering: API/webhooks endpoint issue"]
}
```

---

## 🎨 Visual Elements You'll See

### Sticky Notes (11 total)

1. **Blue** - Step 1: Ticket Input (top left)
2. **Blue** - Step 2: Extract & Validate
3. **Blue** - Step 3: Ticket Analysis
4. **Blue** - Step 4: Team Classification
5. **Blue** - Step 5: Confidence Score
6. **Blue** - Step 6: VIP Detection
7. **Blue** - Step 7: Multi-Topic Detection
8. **Blue** - Step 8: Priority Detection
9. **Blue** - Step 9: Final Routing Decision
10. **Blue** - Step 10: Format Response
11. **Orange** - AI Model (shared GPT-4)

### Node Colors & Icons

- **Manual Trigger** - Play button icon
- **Extract Data** - Gear icon (Set node)
- **AI Nodes** - Brain icon (LLM Chain)
- **Classifier** - Tag icon
- **IF Nodes** - Diamond shape (decision points)
- **Switch Node** - Multi-path icon
- **OpenAI Model** - AI swirl icon

---

## 🔧 Customization Options

### Change Confidence Threshold

**Current:** 0.7 for normal, 0.6 for VIP

**How to change:**
1. Click on **"Route Decision"** node
2. Find the condition with value `0.7`
3. Change to your desired threshold (e.g., `0.8` for stricter, `0.6` for looser)

### Add More Priority Keywords

1. Click on **"Priority Assignment"** node
2. Click **"Add Condition"** under critical or high rules
3. Add your keyword (e.g., "emergency", "down", "outage")

### Modify Team Categories

1. Click on **"Team Classifier"** node
2. Edit the category descriptions
3. Add more categories if needed

### Change AI Model

1. Click on **"OpenAI GPT-4"** node
2. Change model from `gpt-4o` to:
   - `gpt-3.5-turbo` (faster, cheaper)
   - `gpt-4-turbo` (more capable)

---

## 📊 Monitoring Execution

### View Node Outputs

1. After executing, each node shows a green checkmark ✓
2. Click any node to see its output data
3. Green = Success, Red = Error, Orange = Warning

### Track the Flow

Watch data flow through connections (lines turn green as execution progresses)

### Debug Issues

- If a node fails (red), click it to see the error message
- Check the "Executions" tab for full execution history
- Use "Test Step" to run individual nodes

---

## 💡 Tips for Best Results

1. **Be Specific in Ticket Body** - More details = higher confidence
2. **Use Clear Subject Lines** - Helps with quick classification
3. **Include Error Messages** - For technical issues
4. **Mention Urgency** - Use keywords like "urgent", "critical"
5. **VIP Customers** - Mark vip_flag = true for priority handling

---

## 🚨 Common Issues

### Issue: All tickets go to ManualReview

**Cause:** Tickets are too vague or confidence is low

**Solution:** Provide more detailed ticket bodies with specific information

### Issue: Wrong team assignment

**Cause:** Keywords are ambiguous or conflicting

**Solution:** Add more context in the ticket body, or adjust team category descriptions

### Issue: OpenAI error

**Cause:** Invalid API key or rate limit reached

**Solution:** Check credentials, ensure API key is valid and has credits

---

## 📈 Performance Metrics

- **Average Execution Time:** 5-10 seconds per ticket
- **Cost per Ticket:** ~$0.02-0.05 (GPT-4)
- **Accuracy Target:** >90% correct classifications (when confidence ≥ 0.7)

---

## 🎓 Understanding the Logic

### Conservative Bias Philosophy

This workflow is designed to **escalate when uncertain** rather than risk misrouting:

- Confidence < 0.7 → ManualReview
- VIP + Confidence < 0.6 → ManualReview with high priority
- Ambiguous keywords → Lower confidence
- Multi-topic → Route to primary, note secondary

**Why?** Misrouting wastes customer time and agent resources. Better to have humans review uncertain cases.

### Team Routing Hierarchy

1. **Technical issues** → Engineering (highest priority for bugs/outages)
2. **Revenue-related** → Sales or Billing (important for business)
3. **Support/Training** → Customer Success (strategic relationships)
4. **Unclear** → General or ManualReview (safety net)

---

## 📞 Next Steps

1. **Import the workflow** into your n8n instance
2. **Configure OpenAI credentials**
3. **Test with the provided examples**
4. **Customize thresholds and categories** to match your needs
5. **Integrate with your ticketing system** (Zendesk, Intercom, etc.)

---

## 🎯 Success Criteria

Your workflow is working correctly when:

✅ Clear tickets get routed with confidence ≥ 0.7
✅ Ambiguous tickets go to ManualReview
✅ VIP tickets get priority handling
✅ Multi-topic tickets identify secondary issues
✅ Priority is assigned based on urgency keywords
✅ Output JSON matches the expected format

---

**You're all set! Import the workflow and start classifying tickets! 🚀**

# Agent PRD Template

---

## 1. Agent Overview

### 1.1 Purpose Statement

**Primary Goal:** [One sentence - what this agent accomplishes]

**Problem It Solves:** [2-3 sentences from Pre-PRD problem statement]

**Success Criteria:**
- Metric 1: [e.g., 90% accuracy]
- Metric 2: [e.g., <2s response time]
- Metric 3: [e.g., User satisfaction >4.5/5]

---

## 2. Functional Requirements

### 2.1 Core Capabilities

**Capability 1: [Name]**
- **Description:** [What it does]
- **Input:** [Data/parameters]
- **Output:** [What it produces]
- **Priority:** [Critical/High/Medium/Low]

*(Add more capabilities as needed)*

### 2.2 Use Cases

**Use Case 1: [Scenario Name]**
- **Actor:** [Who]
- **Trigger:** [What causes this]
- **Flow:** [3-5 steps]
- **Outcome:** [Result]

### 2.3 Decision-Making Framework

**Decision Type:** [e.g., Classification]
- **Criteria:** [How it decides]
- **Confidence Threshold:** [Minimum score]
- **Fallback:** [Action on low confidence]

### 2.4 Out of Scope

- [Excluded functionality 1]
- [Excluded functionality 2]

---

## 3. Technical Architecture

### 3.1 System Components

| Component | Purpose |
|-----------|---------|
| [Component 1] | [Purpose] |
| [Component 2] | [Purpose] |

### 3.2 Data Flow

```
[Input] → [Component 1] → [Component 2] → [Output]
```

### 3.3 State Management

- **Stateful?** [Yes/No]
- **State Data:** [What is tracked]
- **Persistence:** [In-memory/Redis/Database]
- **Lifecycle:** [Duration]

---

## 4. Input/Output Specifications

### 4.1 Input Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| field1 | string | Yes | [Purpose] |
| field2 | number | No | [Purpose] |

**Validation Rules:**
- [Rule 1]
- [Rule 2]

### 4.2 Output Schema

| Field | Type | Description |
|-------|------|-------------|
| result | string | [Purpose] |
| confidence | number | [0-1 score] |

---

## 5. Quality & Success Criteria

### 5.1 Quality Requirements

**Accuracy:**
- Target: [e.g., 90% on test set]
- Measurement: [How tested]
- Error Cost: [Impact of mistakes]

**Performance:**
- Response Time: [Target latency]
- Throughput: [Requests/second]

### 5.2 Success Metrics

**Primary Metric:**
- **Name:** [Metric name]
- **Definition:** [How calculated]
- **Target:** [Goal value]
- **Frequency:** [How often measured]

**Secondary Metrics:**

| Metric | Target | Measurement |
|--------|--------|-------------|
| [Metric 1] | [Target] | [How] |
| [Metric 2] | [Target] | [How] |

---

## 6. Edge Cases & Confidence

### 6.1 Edge Case Handling

| Edge Case | Behavior |
|-----------|----------|
| Empty input | [Action] |
| Ambiguous data | [Action] |
| Service timeout | [Action] |

### 6.2 Confidence Thresholds

- **High (>X%):** [Auto-proceed]
- **Medium (Y%-X%):** [Flag for review]
- **Low (<Y%):** [Escalate to human]

---

## 7. Testing & Validation

### 7.1 Test Strategy

- **End-to-End:** [Full workflow tests]
- **Accuracy:** [Model validation on test set]
- **Edge Cases:** [Boundary condition tests]

### 7.2 Test Data

- **Size:** [Number of examples]
- **Sources:** [Where data comes from]
- **Ground Truth:** [How verified]

---

## Appendix

### Glossary
- **Term 1:** [Definition]
- **Term 2:** [Definition]

### References
- [Document/Link 1]
- [Document/Link 2]

# Prompt Engineering Template

## Purpose
Structured framework for designing effective prompts for LLM-based agents.

---

## Section 1: Task Definition

# TASK: [Concise, Action-Oriented Title]

[1-2 sentence summary of what this prompt accomplishes]

---

## Section 2: Context Variables

## Input Context

**[Variable Name 1]:** ${variableName1}
[Brief description]

**[Variable Name 2]:** ${variableName2}
[Brief description]

---

## Section 3: Role & Perspective

## Your Role

You are a [professional role/persona] with expertise in [domain]. Your goal is to [specific objective].

[Optional: 1-2 sentences about expertise or approach]

---

## Section 4: Instructions

## Analysis Framework

[Structured approach to completing the task]

## Instructions

1. **[Step Name]:** [Clear action]
   - [Sub-point]
   - [Sub-point]

2. **[Step Name]:** [Clear action]

3. **[Step Name]:** [Clear action]

---

## Section 5: Requirements & Constraints

## Requirements

### Content Requirements
- Requirement 1
- Requirement 2

### Format Requirements
- Requirement 1
- Requirement 2

### Quality Requirements
- Requirement 1
- Requirement 2

---

## Section 6: Output Format

## Output Format

### Option A: Structured Text
```
SECTION 1: [Name]
[Content]

SECTION 2: [Name]
[Content]
```

### Option B: JSON Schema
```typescript
interface OutputSchema {
  field1: string;    // [Description]
  field2: number;    // [Description]
  field3?: string;   // [Optional field]
}
```

### Option C: Markdown
```markdown
# [Title]
## [Section 1]
[Content]
```

---

## Section 7: Quality Guidelines

## Quality Guidelines

### ✅ DO:
- **[Guideline 1]:** [Explanation]
- **[Guideline 2]:** [Explanation]

### ❌ DON'T:
- **[Anti-pattern 1]:** [Why avoid]
- **[Anti-pattern 2]:** [Why avoid]

### Critical Success Factors:
1. **[Factor 1]:** [What makes quality output]
2. **[Factor 2]:** [What makes quality output]

---

## Section 8: Examples

## Examples

### Example 1: [Scenario Name]

**Input:**
```
[Sample input]
```

**Expected Output:**
```
[Sample output]
```

**Reasoning:** [Why this is correct]

---

### Example 2: [Edge Case]

**Input:**
```
[Edge case input]
```

**Expected Output:**
```
[Edge case handling]
```

**Reasoning:** [How to handle]

---

### Counter-Example: [What NOT to Do]

**Input:**
```
[Sample input]
```

**❌ INCORRECT:**
```
[Poor output]
```

**Why Wrong:** [Issues]

**✅ CORRECT:**
```
[Proper output]
```

---

## Section 9: Special Considerations

## Special Considerations

### Handling Ambiguity
- Strategy 1
- Strategy 2

### Handling Missing Data
- Strategy 1
- Strategy 2

### Domain-Specific Rules
- Rule 1
- Rule 2

---

## Section 10: Validation & Confidence

## Validation & Confidence

### Self-Check Before Responding:
- [ ] All required fields populated
- [ ] Output follows format
- [ ] No contradictions
- [ ] Citations included (if required)

### Confidence Reporting:
```json
{
  "confidence": 0.85,
  "uncertainties": [
    "[Uncertainty 1]",
    "[Uncertainty 2]"
  ],
  "assumptions": [
    "[Assumption 1]",
    "[Assumption 2]"
  ]
}
```

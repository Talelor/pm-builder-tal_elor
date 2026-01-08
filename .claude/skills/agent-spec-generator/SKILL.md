---
name: agent-spec-generator
description: Generates Agent PRD and Prompt Engineering Template from Pre-PRD file
---

# Agent Spec Generator

## Instructions

**CRITICAL: Use Write tool to save documents as .md files. DO NOT output to chat.**

This skill generates two specification documents from a Pre-PRD file:
1. Agent PRD
2. Prompt Engineering Template

## How it Works

**INCREMENTAL GENERATION APPROACH** - Generate section-by-section to avoid token limits:

### Phase 1: Agent PRD Generation
1. Read Pre-PRD file and Agent PRD template
2. Create initial document with headers using Write tool
3. Generate and append sections ONE AT A TIME using Edit tool:
   - Section 1: Agent Overview & Purpose
   - Section 2: Functional Requirements
   - Section 3: Technical Architecture
   - Section 4: Input/Output Specifications
   - Section 5: Quality & Success Criteria
   - Section 6: Edge Cases & Confidence Thresholds
   - Section 7: Testing Strategy & Appendices
4. Document complete: `{AgentName}.md`

### Phase 2: Prompt Engineering Template Generation
5. Read Pre-PRD file and Prompt template
6. Create initial document with headers using Write tool
7. Generate and append sections ONE AT A TIME using Edit tool:
   - Section 1-3: Task Definition, Context, Role
   - Section 4-5: Instructions & Requirements
   - Section 6-7: Output Format & Quality Guidelines
   - Section 8-10: Examples, Special Considerations, Validation
8. Document complete: `{AgentName}-Prompt.md`

### Phase 3: Report Completion
9. Report completion with file paths

## Parameters

- `pre_prd_path` (string, required): Path to Pre-PRD file
- `output_directory` (string, optional): Output directory (defaults to Pre-PRD directory)

## Output

Creates 2 files:
- `{AgentName}.md` - Agent PRD
- `{AgentName}-Prompt.md` - Prompt Engineering Template

## Requirements

- Pre-PRD file exists
- Templates exist in Templates/ directory:
  - `Agent-PRD-Template.md`
  - `Prompt-Engineering-Template.md`

## Detailed Generation Instructions

### Key Principles:
1. **NEVER generate entire document at once** - Always work section-by-section
2. **Keep each generation under 1500 tokens** - Break into smaller chunks if needed
3. **Extract information from Pre-PRD** - Don't leave placeholders
4. **Write skeleton first, then fill** - Create document structure, then populate

### For Each Section:
1. **Extract** relevant content from Pre-PRD
2. **Generate** only that section's content (concise, no fluff)
3. **Edit** the document to add/update the section
4. **Move to next** section

### Content Guidelines:
- Be concise - remove unnecessary words
- Use bullet points over paragraphs where possible
- Extract specific values from Pre-PRD (don't use "\[placeholder\]")
- If Pre-PRD doesn't have info, write "TBD - requires stakeholder input"
- Focus on actionable content, not templates

### Pre-PRD to Agent PRD Mapping:
- **Section 1 (Overview):** Use Part 1 (Problem Definition)
- **Section 2 (Requirements):** Use Part 3 (Solution Discovery) + Part 2 (User Discovery)
- **Section 3 (Architecture):** Use Part 3.5 (Architecture Brainstorming)
- **Section 4 (I/O Specs):** Derive from Part 3 (Capabilities)
- **Section 5 (Quality):** Use Part 5 (Quality & Success Criteria)
- **Section 6 (Edge Cases):** Use Part 3 (LLM Considerations)
- **Section 7 (Testing):** Use Part 4 (Scope Management)

### Pre-PRD to Prompt Template Mapping:
- **Sections 1-3 (Task/Context/Role):** Use Part 1 + Part 3.1
- **Sections 4-5 (Instructions/Requirements):** Use Part 3.2 (Capabilities)
- **Section 6 (Output Format):** Derive from Part 3 (Solution Approach)
- **Section 7 (Quality):** Use Part 5 (Quality Requirements)
- **Sections 8-10 (Examples/Considerations/Validation):** Use Part 3.4 (LLM Considerations)
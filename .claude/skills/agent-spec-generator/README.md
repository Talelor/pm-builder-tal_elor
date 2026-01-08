# Agent Spec Generator

## Description

Generates Agent PRD and Prompt Engineering Template from a Pre-PRD file.

## Usage

```
/agent-spec-generator path/to/Pre-PRD-File.md
```

Example:
```
/agent-spec-generator Support-Ticket-Routing-Agent/ready-to-use/Pre-PRD-Support-Ticket-Routing-Agent.md
```

## What Claude Does

1. Reads Pre-PRD file
2. Reads template files (Agent-PRD-Template.md, Prompt-Engineering-Template.md)
3. Generates two complete documents
4. **Saves as .md files using Write tool** (NOT chat output)

## Output Files

- `{AgentName}.md` - Agent PRD
- `{AgentName}-Prompt.md` - Prompt Engineering Template

Saved in same directory as Pre-PRD file (or optional output directory).

## Requirements

- Pre-PRD file exists
- Templates exist in Templates/ directory:
  - `Agent-PRD-Template.md`
  - `Prompt-Engineering-Template.md`
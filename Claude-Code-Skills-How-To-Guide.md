# Claude Code Skills: Quick Start Guide

## What are Claude Code Skills?

Claude Code Skills are custom tools that extend Claude's capabilities. They allow Claude to perform specialized tasks by calling your scripts.

**Note:** While Claude.ai (web) has a `skill-creator` feature, it requires a premium subscription. This guide shows you how to create skills manually for free in VS Code.

---

## Skill Basics

A skill consists of:

- **skill.json** \- Defines the skill (name, description, parameters)  
- **Implementation script** \- TypeScript/JavaScript/python that does the work  
- **Location** \- `.claude/skills/<skill-name>/` directory  
- [agent-skills/quickstart](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart) 

---

## Quick Setup

### Step 1: Enable Skills in VS Code

1. Open VS Code **Settings**  
2. Go to: **Chat: Use Claude Skills** → Enable it  
3. Claude will now discover skills in `.claude/skills/`

### Step 2: Create Skill Directory

\# In your workspace root

mkdir \-p .claude/skills/my-skill

cd .claude/skills/my-skill

Step 3: Setup  
npm install \--save-dev @types/node  
npm install \--save-dev ts-node typescript

---

## Creating Your First Skill

### Example: Hello World Skill

**0.Create new folder `my-skill`**

**1\. Create new file \- name `SKILL.md`:**

\---  
name: hello-world  
description: Simple test skill that echoes back a message  
\---

\# Hello World Skill

\#\# Instructions  
This skill takes a message as input and echoes it back with "Echo: " prefix.

To use this skill:  
1\. Call it with a message parameter  
2\. The skill will return the message with "Echo: " prefix

\#\# Examples  
\- Input: "Testing my skill"  
\- Output: "Echo: Testing my skill"

\#\# Parameters  
\- \`message\` (string, required): The message to echo back

**2\. Create `run.ts`:**

\#\!/usr/bin/env ts-node

import \* as fs from 'fs';

interface InputData {  
  message: string;  
}

interface SkillOutput {  
  status: 'success' | 'error';  
  result?: string;  
  error?: string;  
}

async function main(): Promise\<void\> {  
  try {  
    // Read input from stdin  
    const inputData: InputData \= JSON.parse(fs.readFileSync(0, 'utf-8'));

    // Process  
    const result \= \`Echo: ${inputData.message}\`;

    // Output JSON to stdout  
    const output: SkillOutput \= {  
      status: 'success',  
      result: result  
    };

    console.log(JSON.stringify(output));

  } catch (error) {  
    const output: SkillOutput \= {  
      status: 'error',  
      error: (error as Error).message  
    };

    console.log(JSON.stringify(output));  
    process.exit(1);  
  }  
}

main();

**1\. Create new file \- name `test-input.json`**

{"message": "Testing my skill"}

**3\. Test it:**

\# Manual test

$ cd ./.claude/skills/my-skill/  
npx ts-node run.ts \< test-input.json

\# Expected output:

\# {"status":"success","result":"Echo: Hello\!"}

**4\. Use in VS Code:**

Open Claude chat and say:

Use hello-world skill with message "Testing my skill"

Claude will invoke your skill and use the result.

**Key fields:**

- `name`: Unique identifier (kebab-case)  
- `description`: Be specific \- Claude reads this to decide when to use the skill  
- `parameters`: JSON Schema defining inputs  
- `entrypoint`: Your TypeScript/JavaScript file

---

## Writing Good Descriptions

The `description` field is critical \- Claude reads it to decide when to use your skill.

**❌ Bad:**

"description": "Processes data"

**✅ Good:**

"description": "Analyzes support ticket text and extracts key entities: customer intent, urgency level, mentioned products, and error codes. Returns structured JSON with confidence scores."

**Tips:**

- Be specific about inputs and outputs  
- Mention key capabilities  
- Use keywords Claude will recognize  
- Keep it under 200 characters if possible

---

## Real-World Example

See the `agent-spec-generator` skill in this project:

- `.claude/skills/agent-spec-generator/`  
- Reads Pre-PRD files  
- Generates specification documents  
- Demonstrates file I/O, templates, and error handling

---

## Quick Reference

**Skill Directory Structure:**

.claude/skills/my-skill/

├── SKILL.md          \# Skill definition

├── run.ts              \# Implementation

├── package.json        \# (Optional) Dependencies

└── README.md           \# (Optional) Documentation

**Requirements:**

- Node.js 12+  
- TypeScript \+ ts-node (`npm install -g typescript ts-node`)  
- "Use Claude Skills" enabled in VS Code

---

**That's it\!** You now know how to create Claude Code skills without needing Claude.ai premium.  
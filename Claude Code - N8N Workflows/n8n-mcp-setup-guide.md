# n8n-MCP Setup Guide

Quick guide to set up n8n-mcp with Claude Code from scratch.

## Prerequisites

- Node.js installed
- Claude Code installed (CLI and VS Code extension)
- Git Bash or similar terminal
- npx n8n-mcp

## Step 1: Verify n8n-mcp Installation

Test that n8n-mcp is available:

```bash
npx n8n-mcp --help
```

You should see output showing the server starting successfully with 7 tools and 802 nodes loaded.

## Step 2: Add n8n-mcp to VS Code Settings

1. Open VS Code settings file:
   - Press `Ctrl+Shift+P`
   - Type "Preferences: Open User Settings (JSON)" - via extension "claude code" setting 
   - Or directly open: `C:\Users\<YourUsername>\AppData\Roaming\Code\User\settings.json`

2. Add the n8n-mcp configuration (add this at the end, before the closing `}`):

```json
"claudeCode.mcpServers": {
    "n8n-mcp": {
        "command": "npx",
        "args": ["n8n-mcp"],
        "env": {
            "MCP_MODE": "stdio",
            "LOG_LEVEL": "error",
            "DISABLE_CONSOLE_OUTPUT": "true"
        }
    }
}
```

3. Save the file

## Step 3: Add n8n-mcp to Claude CLI Config

1. Open Claude CLI config file:
   - Location: `C:\Users\<YourUsername>\.claude.json`
   - Or use: `claude config edit`

2. Add the same n8n-mcp configuration (add this at the end, before the closing `}`):

```json
"mcpServers": {
    "n8n-mcp": {
        "command": "npx",
        "args": ["n8n-mcp"],
        "env": {
            "MCP_MODE": "stdio",
            "LOG_LEVEL": "error",
            "DISABLE_CONSOLE_OUTPUT": "true"
        }
    }
}
```

3. Save the file

## Step 4: Verify Connection

Run this command to check MCP server status:

```bash
claude mcp list
```

Expected output:
```
Checking MCP server health...

n8n-mcp: npx n8n-mcp - ✓ Connected
```

## Step 5: Start a New Claude Code Session

To access the n8n-mcp tools:
1. Close any existing Claude Code sessions
2. Open a new terminal or VS Code chat
3. Start Claude Code

In the new session, you can now use n8n-mcp tools:
- Search for n8n nodes
- Get node documentation
- Find workflow templates
- And more!

## Testing

Try asking Claude:
- "What n8n nodes are available for HTTP requests?"
- "Search for Slack nodes in n8n"
- "Show me n8n webhook node documentation"

## Troubleshooting

If `claude mcp list` shows no servers:
1. Double-check both config files have the correct JSON syntax
2. Make sure there are no trailing commas or syntax errors
3. Restart VS Code completely

If n8n-mcp shows as disconnected:
1. Verify npx can run n8n-mcp: `npx n8n-mcp --help`
2. Check for any error messages in the terminal
3. Try running `claude mcp list` again

## Reference

- n8n-mcp GitHub: https://github.com/czlonkowski/n8n-mcp
- Claude Code MCP docs: https://docs.anthropic.com/s/claude-code-mcp

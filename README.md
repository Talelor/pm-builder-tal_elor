# PM Builder - Workshop

A collection of tools and workflows for project management and automation, including Claude Code skills 

## 🚀 Features

- **Agent Spec Generator Skill**: A Claude Code skill that generates Agent PRD and Prompt Engineering templates from Pre-PRD files
- **Templates**: Reusable templates for project management and agent development

## 📋 Contents

- `.claude/skills/agent-spec-generator/` - Claude Code skill for generating agent specifications
- `Support-Ticket-Routing-Agent/` - Complete support ticket routing solution

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Claude Code CLI (for using skills)

### Setup

1. Clone this repository:
```bash
git clone https://github.com/Talelor/pm-builder.git
cd pm-builder
```

2. Install dependencies:
```bash
npm install
```

3. For Claude Code skills:
   - Copy the `.claude` directory to your project
   - Follow the guides in `Claude-Code-Skills-How-To-Guide.md`


## 📖 Usage

### Agent Spec Generator Skill

This skill generates Agent PRD and Prompt Engineering templates from Pre-PRD files.

```bash
# Use the skill in Claude Code
/agent-spec-generator Pre-PRD-YourAgent.md
```

See [.claude/skills/agent-spec-generator/README.md](.claude/skills/agent-spec-generator/README.md) for detailed usage.



## 🔒 Security

**IMPORTANT:** Before using this project:

1. **Never commit secrets**: This repository does not contain API keys, passwords, or credentials
2. **Configure your own credentials**: You must set up your own API keys for:
   - OpenAI (if using AI features)
   - Any third-party services

3. **Use environment variables**: Store sensitive data in `.env` files (already in `.gitignore`)

## 📥 Usage Only

This repository is available for cloning and personal use only. Contributions, pull requests, and modifications are not accepted at this time.

Feel free to:
- Clone and use the code for your own projects
- Learn from the examples and templates
- Adapt it to your needs

Please do not submit pull requests or issues.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is provided "as is" without warranty of any kind. Users are responsible for:
- Configuring their own credentials and API keys
- Ensuring compliance with third-party service terms
- Security of their deployments
- Proper testing before production use


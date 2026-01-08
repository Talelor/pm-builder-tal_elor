# PM Builder - Workshop

A collection of tools and workflows for project management and automation, including Claude Code skills and n8n workflows.

## 🚀 Features

- **Agent Spec Generator Skill**: A Claude Code skill that generates Agent PRD and Prompt Engineering templates from Pre-PRD files
- **n8n Workflows**: Pre-built workflows including a Support Ticket Routing Agent
- **Templates**: Reusable templates for project management and agent development

## 📋 Contents

- `.claude/skills/agent-spec-generator/` - Claude Code skill for generating agent specifications
- `Claude Code - N8N Workflows/` - n8n workflow examples and guides
- `Support-Ticket-Routing-Agent/` - Complete support ticket routing solution

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Claude Code CLI (for using skills)
- n8n (for running workflows)

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

4. For n8n workflows:
   - Import JSON workflow files into your n8n instance
   - Configure credentials as described in the workflow documentation

## 📖 Usage

### Agent Spec Generator Skill

This skill generates Agent PRD and Prompt Engineering templates from Pre-PRD files.

```bash
# Use the skill in Claude Code
/agent-spec-generator Pre-PRD-YourAgent.md
```

See [.claude/skills/agent-spec-generator/README.md](.claude/skills/agent-spec-generator/README.md) for detailed usage.

### n8n Workflows

See the [Claude Code - N8N Workflows](Claude%20Code%20-%20N8N%20Workflows/) directory for:
- Support Ticket Routing Agent
- Quick start guides
- Usage documentation

## 🔒 Security

**IMPORTANT:** Before using this project:

1. **Never commit secrets**: This repository does not contain API keys, passwords, or credentials
2. **Configure your own credentials**: You must set up your own API keys for:
   - OpenAI (if using AI features)
   - n8n credentials
   - Any third-party services

3. **Use environment variables**: Store sensitive data in `.env` files (already in `.gitignore`)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is provided "as is" without warranty of any kind. Users are responsible for:
- Configuring their own credentials and API keys
- Ensuring compliance with third-party service terms
- Security of their deployments
- Proper testing before production use

## 📧 Support

For issues, questions, or contributions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Built with Claude Code
- Powered by n8n workflows
- Inspired by the need for better PM automation tools

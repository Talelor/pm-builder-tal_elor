#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

interface InputData {
  pre_prd_path: string;
  output_directory?: string;
}

interface SkillOutput {
  status: 'success' | 'error';
  pre_prd_content?: string;
  agent_template?: string;
  prompt_template?: string;
  agent_prd_output_path?: string;
  prompt_output_path?: string;
  instructions?: string;
  error?: string;
}

function readFile(filepath: string): string {
  try {
    return fs.readFileSync(filepath, 'utf-8');
  } catch (error) {
    throw new Error(`Error reading file ${filepath}: ${(error as Error).message}`);
  }
}

function findTemplateInProject(templateName: string, startDir: string): string | null {
  const searchLocations = [
    path.join(startDir, 'Templates', `${templateName}.md`),
    path.join(startDir, 'Support-Ticket-Routing-Agent', 'Templates', `${templateName}.md`),
    path.join(startDir, '.claude', `${templateName}.md`),
  ];

  const caseVariations = [
    templateName,
    templateName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-'),
  ];

  for (const location of searchLocations) {
    for (const variation of caseVariations) {
      const testPath = location.replace(templateName, variation);
      if (fs.existsSync(testPath)) {
        return testPath;
      }
    }
  }

  return null;
}

function readTemplate(templateName: string, projectRoot: string): string {
  const templatePath = findTemplateInProject(templateName, projectRoot);

  if (!templatePath) {
    throw new Error(`Template not found: ${templateName}.md. Searched in Templates/, Support-Ticket-Routing-Agent/Templates/, and .claude/ directories.`);
  }

  return readFile(templatePath);
}

async function main(): Promise<void> {
  try {
    // Read input from command-line args or stdin
    let inputData: InputData;

    if (process.argv.length > 2) {
      // Command-line argument provided
      inputData = {
        pre_prd_path: process.argv[2],
        output_directory: process.argv[3]
      };
    } else {
      // Read from stdin (for piped input)
      inputData = JSON.parse(fs.readFileSync(0, 'utf-8'));
    }

    const prePrdPath = inputData.pre_prd_path;
    let outputDirectory = inputData.output_directory;

    if (!prePrdPath) {
      throw new Error('pre_prd_path is required');
    }

    // Resolve paths
    const resolvedPrePrdPath = path.resolve(prePrdPath);

    if (!fs.existsSync(resolvedPrePrdPath)) {
      throw new Error(`Pre-PRD file not found: ${resolvedPrePrdPath}`);
    }

    // Determine output directory
    if (!outputDirectory) {
      outputDirectory = path.dirname(resolvedPrePrdPath);
    } else {
      outputDirectory = path.resolve(outputDirectory);
    }

    fs.mkdirSync(outputDirectory, { recursive: true });

    // Read Pre-PRD content
    const prePrdContent = readFile(resolvedPrePrdPath);

    // Determine project root
    let projectRoot = path.dirname(resolvedPrePrdPath);
    for (let i = 0; i < 5; i++) {
      const parent = path.dirname(projectRoot);
      if (parent === projectRoot) break;
      projectRoot = parent;
      if (fs.existsSync(path.join(projectRoot, '.claude'))) break;
    }

    // Read template structures
    const agentTemplate = readTemplate('Agent-PRD-Template', projectRoot);
    const promptTemplate = readTemplate('Prompt-Engineering-Template', projectRoot);

    // Extract agent name from Pre-PRD filename
    const baseName = path.basename(resolvedPrePrdPath, '.md');
    const agentName = baseName.replace('Pre-PRD-', '');

    // Output paths
    const agentPrdPath = path.join(outputDirectory, `${agentName}.md`);
    const promptPath = path.join(outputDirectory, `${agentName}-Prompt.md`);

    // Return simple output
    const output: SkillOutput = {
      status: 'success',
      pre_prd_content: prePrdContent,
      agent_template: agentTemplate,
      prompt_template: promptTemplate,
      agent_prd_output_path: agentPrdPath,
      prompt_output_path: promptPath,
      instructions: `Generate Agent PRD from Pre-PRD and save to ${agentPrdPath}. Generate Prompt Engineering Template and save to ${promptPath}. Use Write tool for both files.`
    };

    console.log(JSON.stringify(output));

  } catch (error) {
    const output: SkillOutput = {
      error: (error as Error).message,
      status: 'error'
    };
    console.log(JSON.stringify(output));
    process.exit(1);
  }
}

main();
# PRD Generator Agent - Capabilities

This document lists the individual capabilities of the PRD Generator Agent, extracted from the prompt instructions for isolated review and testing.

---

# 1
## Parse and Validate Input
- Extract feature_idea, domain, and optional parameters
- Validate input completeness (minimum 10 characters for feature_idea)
- Clarify ambiguities through targeted questions if critical information is missing
- Set research depth based on depth_level parameter

# 2
## Configure Domain Context
- Build domain profile from provided domain definition
- Identify key domain characteristics (B2C vs B2B, market maturity, regulatory context)
- Establish relevant market categories and competitive landscape boundaries
- Note domain-specific terminology and conventions

# 3
## Conduct External Market Research
- Search web and available APIs for competitive intelligence
- Identify 5-10 key competitors in the domain
- Analyze competitor features, positioning, and user reviews
- Gather market trends and industry insights (prioritize sources <6 months old)
- Document all sources for transparency

# 4
## Generate User Personas
- Create 3-5 user personas based on domain and target_users input
- For each persona, define: name/archetype, demographics, needs, pain points, behaviors, goals
- Ground personas in market research findings (competitor user reviews, industry reports)
- Explicitly flag assumptions vs. verified characteristics

# 5
## Frame the Problem
- Articulate the core problem this feature addresses
- Define who experiences the problem and when/how often
- Quantify impact of NOT solving the problem (business and user cost)
- State success criteria in measurable terms

# 6
## Synthesize Solution Overview
- Describe high-level solution approach in 2-3 sentences
- Connect solution to user needs and competitive landscape
- Identify key differentiators or innovations
- Note any inspiration from competitive research

# 7
## Define Requirements
- List functional requirements (what the feature must do)
- List non-functional requirements (performance, usability, constraints)
- Prioritize requirements (Critical/High/Medium/Low)
- Map requirements to user personas and needs

# 8
## Specify Success Metrics
- Define 3-5 key performance indicators (KPIs)
- Ensure metrics are measurable and time-bound
- Include both leading indicators (early signals) and lagging indicators (outcomes)
- Specify target values where possible

# 9
## Document Assumptions and Risks
- Clearly separate facts (from research) from assumptions (inferred)
- List key assumptions that need validation
- Identify risks and dependencies
- Recommend validation or mitigation strategies

# 10
## Assemble Complete PRD
- Structure all sections according to PRD template
- Ensure consistency in terminology and formatting
- Add metadata: sources, confidence scores, timestamp
- Perform final quality check against completeness criteria

# 11
## Calculate Confidence Score
- Assess overall PRD confidence (0-1 scale)
- Provide component-level confidence (market, personas, requirements)
- Document risk factors and uncertainties
- Recommend follow-up actions

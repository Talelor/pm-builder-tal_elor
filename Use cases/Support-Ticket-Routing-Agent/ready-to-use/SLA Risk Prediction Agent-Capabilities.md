# 1
## Classify Ticket Category
- Analyze ticket title and description to determine primary category (Engineering, API Issues, Billing, etc.)
- Look for technical terminology, error codes, system names
- Assign confidence score to classification (0-1)
- If ambiguous, flag multiple potential categories

# 2
## Assess Ticket Complexity
- Identify urgency language ("production down", "critical", "blocking")
- Detect technical complexity indicators (API integration, system outages, data corruption)
- Evaluate scope (single user vs. multiple customers, single feature vs. system-wide)
- Score complexity 1-10 where 1=simple FAQ, 10=critical system failure
- Provide reasoning for complexity score

# 3
## Search Historical Patterns
- Query historical ticket database for semantically similar tickets using category and key terms
- Calculate statistical distribution of resolution times from similar tickets (mean, median, range)
- Identify outliers or high variance that reduces prediction confidence
- Note sample size used in analysis (minimum 5 similar tickets preferred)

# 4
## Predict Resolution Time
- Calculate predicted resolution time range based on historical data
- Weight by similarity to current ticket
- Adjust for complexity factors (add 20-30% for high complexity)
- Express as range (min-max hours) not single point estimate
- Calculate confidence based on data quality and sample size

# 5
## Compare Against SLA
- Retrieve customer's SLA tier from context
- Calculate time buffer: SLA_window - predicted_max_resolution_time
- Classify risk level:
  - **HIGH:** Time buffer ≤ 20% of SLA window (predicted time ≥80% of SLA)
  - **MEDIUM:** Time buffer 20-50% of SLA window (predicted time 50-80% of SLA)
  - **LOW:** Time buffer > 50% of SLA window (predicted time <50% of SLA)

# 6
## Generate Escalation Recommendation
- HIGH risk: Recommend immediate escalation to senior engineer with relevant expertise
- MEDIUM risk: Recommend priority assignment and monitoring
- LOW risk: Standard queue processing acceptable
- Specify assignee type based on category (e.g., "Backend Engineer with API experience")

# 7
## Explain Reasoning
- Write clear, concise explanation (2-4 sentences) covering:
  - Number of similar tickets analyzed
  - Average historical resolution time
  - Key complexity factors identified
  - Why this creates HIGH/MEDIUM/LOW risk vs. customer SLA
- Use specific numbers and data points, not vague statements

# Task: Systemize Operations (Franchise Prototype Creation)

**Task ID:** franchise/systemize-operations
**Version:** 1.0.0
**Execution Type:** Interactive (60% Human / 40% Agent)
**Duration:** 90-120 minutes
**Agent:** michael-gerber
**Quality Gate:** QG-FR-002 (Operations Systemized)

---

## Purpose

Transform an owner-dependent business into a systems-dependent enterprise by applying Michael Gerber's E-Myth methodology. The output is a complete Franchise Prototype -- the operational blueprint that makes the business replicable without depending on extraordinary people or the owner's personal presence.

This task applies five interconnected Gerber frameworks in sequence:

1. **Three Personalities Diagnostic** -- Identify the Entrepreneur/Manager/Technician imbalance that traps the owner IN the business
2. **Seven Centers of Management Attention** -- Map all seven dimensions of a mature business
3. **IQO Cycle (Innovation/Quantification/Orchestration)** -- The engine that drives continuous improvement and eliminates discretion
4. **Franchise Prototype Model (Six Rules)** -- The operational standard every systemized process must satisfy
5. **Turn-Key Revolution** -- The philosophical foundation: "The system runs the business. The people run the system."

This is the SECOND task in the franchise development pipeline, activated after @mark-siebert issues a GO or CONDITIONAL assessment via `franchise/evaluate-franchisability`. While Siebert determines WHETHER a business should franchise, Gerber determines HOW to make it franchise-ready by systemizing every aspect of operations.

**Core Principle:** *"If your business depends on you, you don't own a business -- you have a job. And it's the worst job in the world because you're working for a lunatic!"* -- Michael E. Gerber, "The E-Myth Revisited"

---

## Inputs

```yaml
required:
  business_name:
    field: "Name of the business / brand"
    format: "string"
    required: true

  business_description:
    field: "Brief description of products/services and current operations"
    format: "string"
    required: true

  owner_name:
    field: "Name of the business owner / primary operator"
    format: "string"
    required: true

  operating_locations:
    field: "Number of operating locations and time in operation"
    format: "string"
    required: true

  team_size:
    field: "Number of employees (total across all locations)"
    format: "integer"
    required: true

  owner_daily_role:
    field: "Description of what the owner does on a typical day (tasks, hours, responsibilities)"
    format: "string"
    required: true

  documentation_state:
    field: "Current state of written procedures, manuals, and documentation"
    format: "enum: none | informal_notes | partial_manual | comprehensive_manual"
    required: true

optional:
  franchisability_scorecard:
    field: "Path to the franchisability scorecard YAML from @mark-siebert assessment"
    format: "file_path"
    required: false
    note: "If available, provides context on identified gaps and remediation items"

  siebert_verdict:
    field: "Verdict from franchisability assessment (GO / CONDITIONAL / NO-GO)"
    format: "enum: GO | CONDITIONAL | NO-GO"
    required: false

  identified_gaps:
    field: "Specific systemization gaps identified by @mark-siebert"
    format: "string[]"
    required: false

  annual_unit_revenue:
    field: "Average annual revenue per location"
    format: "currency"
    required: false

  key_processes:
    field: "Owner-identified list of critical business processes"
    format: "string[]"
    required: false

  owner_absence_impact:
    field: "What happens when the owner is absent for 1 day / 1 week / 1 month"
    format: "string"
    required: false

  primary_aim:
    field: "Owner's life vision -- what they want their LIFE to look like (not the business)"
    format: "string"
    required: false
    note: "If not provided, will be elicited in Step 2 (Center 1 -- Primary Aim)"

  strategic_objective:
    field: "Business-level goals: revenue target, growth timeline, geographic scope"
    format: "string"
    required: false
    note: "If not provided, will be elicited in Step 2 (Center 2 -- Strategic Objective)"
```

---

## Pre-Conditions

```yaml
pre_conditions:
  - "Owner is present and willing to answer diagnostic questions honestly"
  - "Owner has decision-making authority over business operations"
  - "Business has been operating for at least 6 months (enough operational history to assess)"
  - "If coming from franchise pipeline: @mark-siebert assessment = GO or CONDITIONAL"
```

---

## Steps

### Step 1: Three Personalities Diagnostic (15 min)

**Objective:** Assess the balance of the Three Personalities (Entrepreneur, Manager, Technician) in the business owner and diagnose the root cause of owner-dependency.

**Mode:** Interactive (Agent asks, Human answers)
**Behavioral State:** `state_storyteller` -> `state_diagnostic`
**Heuristics:** mg001, mg002, mg007, mg008

#### 1.1 Context Setting -- The E-Myth Story

The agent opens with a narrative that mirrors the owner's situation, using Gerber's signature storytelling approach to create a felt problem before introducing frameworks.

```
[owner_name], before we build a single system, before we document
a single process, I need to understand something fundamental about
you and your business.

Let me tell you a story.

Sarah owned a pie shop. She made the best pies in town. Everyone
said so. And because she made the best pies, she did what seemed
perfectly logical -- she opened a business making pies. This is
what I call the Entrepreneurial Seizure -- the moment when a
Technician, someone brilliant at the technical work, assumes that
because they know HOW to do the work, they know how to RUN a
business that does that work.

It is a Fatal Assumption. And it is why 80% of small businesses
fail within the first five years.

Now let's see if the same thing is happening with [business_name].
```

#### 1.2 Personality Balance Assessment

Ask the following diagnostic questions sequentially. Probe deeper on any red flags. Do not skip any question.

```yaml
diagnostic_sequence:
  q1_owner_dependency:
    question: "What would happen to [business_name] if you took a 30-day vacation starting tomorrow?"
    purpose: "Tests owner-dependency (Heuristic mg002)"
    scoring:
      critical: "Business would stop or lose key customers"
      concerning: "Significant decline, daily crisis calls"
      healthy: "Business continues with minor issues"
    probe: "Which specific processes would break first?"

  q2_technician_trap:
    question: "How much of your day do you spend DOING the technical work of the business versus working ON the business as a whole?"
    purpose: "Identifies Technician dominance"
    scoring:
      critical: "70%+ on technical work (Technician dominant)"
      concerning: "50-70% on technical work"
      healthy: "Less than 30% on technical work"
    probe: "Walk me through a typical day, hour by hour."

  q3_decision_bottleneck:
    question: "When an employee faces a decision -- even a routine one -- do they follow a documented procedure, or do they come to you?"
    purpose: "Tests discretion elimination and orchestration maturity (Heuristic mg005)"
    scoring:
      critical: "All decisions require the owner"
      concerning: "Major decisions require the owner"
      healthy: "Written procedures guide most decisions"
    probe: "Can you give me an example of a recent situation where this happened?"

  q4_hiring_philosophy:
    question: "When you need to hire, do you look for extraordinary people -- 'rock stars' -- or do you have systems good enough that competent people can produce excellent results?"
    purpose: "Tests Franchise Prototype Rule 2 alignment (Heuristic mg006)"
    scoring:
      critical: "Must find rock stars for basic operations"
      concerning: "Need experienced people, training takes months"
      healthy: "Systems enable competence quickly"
    probe: "What is the minimum experience level you require for your core positions?"

  q5_fatal_assumption:
    question: "What made you start this business? Was it because you were great at the technical work?"
    purpose: "Detects the Fatal Assumption (Heuristic mg001)"
    scoring:
      critical: "'I'm the best at X, so I started a business doing X'"
      concerning: "Mixed technical skill and business vision"
      healthy: "Clear distinction between craft and business"
    probe: "Do you feel that understanding the technical work IS understanding the business?"

  q6_consistency_test:
    question: "Does every customer get exactly the same experience regardless of who serves them, which location they visit, or what day of the week it is?"
    purpose: "Tests Franchise Prototype Rules 1 and 5"
    scoring:
      critical: "Quality depends entirely on who is working"
      concerning: "Mostly consistent but notable variation"
      healthy: "Uniformly predictable experience"
    probe: "What varies most? Service speed? Quality? Greeting? Resolution of issues?"

  q7_documentation_state:
    question: "If you had to hand over your entire business to a competent stranger tomorrow -- could they run it using only your written documentation?"
    purpose: "Tests Franchise Prototype Rule 4 (Heuristic mg010)"
    scoring:
      critical: "'Everything is in my head'"
      concerning: "Some notes and informal procedures exist"
      healthy: "Comprehensive Operations Manual exists"
    probe: "What IS documented today? Anything at all -- checklists, notes, recipes, procedures?"
```

#### 1.3 Personality Scoring

Based on the diagnostic answers, calculate the personality distribution:

```yaml
personality_scoring:
  entrepreneur:
    indicators:
      - "Spends time on strategy, vision, and future possibilities"
      - "Asks 'how can the business work WITHOUT me'"
      - "Invests in systems and structure proactively"
      - "Thinks about scaling and replication"
    healthy_range: "25-40%"

  manager:
    indicators:
      - "Creates and maintains systems and processes"
      - "Builds organizational structure and order"
      - "Plans and organizes resources methodically"
      - "Seeks predictability, consistency, and measurement"
    healthy_range: "25-40%"

  technician:
    indicators:
      - "Does the technical work personally"
      - "Believes 'nobody does it as well as I can'"
      - "Works long hours on production and delivery"
      - "Resists delegation and systemization"
    healthy_range: "20-35%"

  scoring_output:
    entrepreneur_pct: "{calculated}%"
    manager_pct: "{calculated}%"
    technician_pct: "{calculated}%"
    dominant_personality: "Entrepreneur | Manager | Technician"
    imbalance_severity: "CRITICAL | HIGH | MODERATE | HEALTHY"
    fatal_assumption_detected: true/false
    entrepreneurial_seizure_detected: true/false
```

#### 1.4 Business Maturity Stage Assessment

```yaml
maturity_stages:
  infancy:
    description: "Owner IS the business. Owner does everything."
    indicators:
      - "Owner works 60-80+ hours per week on technical work"
      - "No employees or only untrained helpers"
      - "No documented systems whatsoever"
      - "If owner stops, business stops immediately"
    stage_number: 1

  adolescence:
    description: "Owner gets help but cannot let go."
    indicators:
      - "Has employees but micromanages all of them"
      - "Delegation attempts fail repeatedly ('they don't do it right')"
      - "Some growth but owner is the bottleneck for every decision"
      - "Owner clings to the comfort zone of Technician work"
    stage_number: 2

  growing_pains:
    description: "Adolescent business hits the wall. Growth creates chaos."
    indicators:
      - "Growth has outpaced the owner's capacity to manage"
      - "Quality is inconsistent and declining"
      - "Owner is overwhelmed and burning out"
      - "Three choices: get small again, go broke, or grow up"
    stage_number: 3

  maturity:
    description: "Business has structure, systems, and vision."
    indicators:
      - "Systems drive operations, not personalities"
      - "Owner works ON the business primarily"
      - "Consistent quality without owner presence"
      - "Franchise Prototype principles are in practice"
    stage_number: 4
```

**Present the Diagnostic Results:**

```
THREE PERSONALITIES DIAGNOSTIC
================================

| Personality  | Your Balance | Healthy Balance |
|-------------|-------------|-----------------|
| Entrepreneur | {X}%        | 33%             |
| Manager      | {Y}%        | 33%             |
| Technician   | {Z}%        | 33%             |

BUSINESS MATURITY STAGE: {Infancy / Adolescence / Growing Pains / Maturity}
FATAL ASSUMPTION DETECTED: {Yes/No -- explain if yes}
ENTREPRENEURIAL SEIZURE DETECTED: {Yes/No}
OWNER-DEPENDENCY LEVEL: {TOTAL / HIGH / MODERATE / LOW}
```

#### 1.5 Veto Check (Post-Diagnostic)

```yaml
veto_check_post_diagnostic:
  - condition: "Owner works 60-80+ hours doing technical work AND refuses to consider changing"
    veto: MG-01
    severity: CRITICAL
    action: "HALT -- explain the Technician trap. Business is NOT READY for systemization until owner commits to working ON the business."
    gerber_quote: "If your business depends on you, you don't own a business -- you have a job."

  - condition: "'Nobody can do it as well as I can' mentality held as permanent truth"
    veto: MG-02
    severity: CRITICAL
    action: "HALT -- the Fatal Assumption blocks all systemization. Must be addressed through Three Personalities diagnostic."

  - condition: "Owner has no Primary Aim AND sees no need for one"
    veto: MG-07
    severity: HIGH
    action: "PAUSE -- help owner define Primary Aim before proceeding. Business without life vision becomes a prison."

  - condition: "Business stops completely when owner is absent for even 1 day"
    veto: MG-04
    severity: CRITICAL
    action: "FLAG -- proceed with systemization but mark owner-dependency as the #1 priority to resolve."
```

**Step 1 Output:** Three Personalities Assessment with personality distribution, maturity stage, Fatal Assumption check, and root cause diagnosis of owner-dependency.

---

### Step 2: Seven Centers Mapping (15 min)

**Objective:** Map all Seven Centers of Management Attention to establish the complete picture of where the business stands and what needs to be built. Centers 1 and 2 (Primary Aim and Strategic Objective) are elicited conversationally if not provided in inputs.

**Mode:** Interactive (Agent guides, Human reflects)
**Behavioral State:** `state_teacher`
**Framework:** Seven Centers of Management Attention

#### 2.1 Center 1 -- Primary Aim

```
[owner_name], here is the most important question in business --
and it has nothing to do with business.

What do you want your LIFE to look like?

Not your business goals. Your LIFE.

With no clear picture of how you wish your life to be, how on
earth are you going to live it? The business exists to serve
YOUR life -- not the other way around.
```

**Guide the owner through these questions:**

```yaml
primary_aim_questions:
  - "What does your ideal Tuesday look like? (Not Monday -- everyone fantasizes about Mondays. What about a regular Tuesday?)"
  - "Where are you living? What does the environment look like?"
  - "How much time do you spend working? How much with family? With yourself?"
  - "What do you want to be KNOWN for at the end of your life?"
  - "What experiences do you want to have that you are NOT having now?"
  - "What would you do if money were no longer a concern?"
```

**Capture:**

```yaml
center_1_primary_aim:
  owner_life_vision: "{what the owner wants their life to look like}"
  life_priorities: []  # family, health, travel, financial freedom, creative work, etc.
  business_role_in_life: "{how the business should serve the life vision}"
  current_alignment: "ALIGNED | MISALIGNED | UNKNOWN"
  gap_description: "{if misaligned, describe the gap between current reality and vision}"
  primary_aim_statement: "{written 3-5 sentence statement}"
  status: "DEFINED | NEEDS REFINEMENT | NOT DEFINED"
```

#### 2.2 Center 2 -- Strategic Objective

```
Now that we know what your LIFE should look like, what does the
BUSINESS need to become to make that life possible?

The business is a vehicle. If the Primary Aim is the destination,
the Strategic Objective is the map.
```

**Guide the owner through:**

```yaml
strategic_objective_questions:
  - "What annual revenue does the business need to generate to support your Primary Aim?"
  - "What profit margin do you need to sustain?"
  - "How many locations or units do you envision at maturity?"
  - "What geographic scope? Local, regional, national, international?"
  - "In how many years do you want to reach this vision?"
  - "Should this business be a commodity (compete on volume) or differentiated (compete on value)?"
  - "What is the exit plan? Build to sell, franchise, legacy, lifestyle income?"
```

**Capture:**

```yaml
center_2_strategic_objective:
  revenue_target: "${amount} per year"
  profit_target: "${amount} per year / {percentage}%"
  growth_timeline: "{X units in Y years}"
  geographic_scope: "{local / regional / national / international}"
  business_type: "{commodity or differentiated}"
  exit_strategy: "{sale / legacy / income stream / franchise}"
  strategic_objective_statement: "{written statement}"
  status: "DEFINED | NEEDS REFINEMENT | NOT DEFINED"
```

#### 2.3 Center 3 -- Organizational Strategy

**Key Insight:** *Design the org chart for the MATURE business, not as it is today. The owner fills ALL positions initially, then replaces themselves one by one with systems and people.*

```
[owner_name], I need you to do something that will feel strange.

Draw the org chart for your business as it will look at FULL
MATURITY. Not as it is today -- as it WILL be.

If your vision is 50 locations, draw the org chart for 50
locations. Every department. Every role. Every position.

Then write YOUR name in every single box you currently occupy.

That is the map of your prison. And it is also the map of your
freedom -- because every time you systematize a role and remove
your name from a box, you take one step closer to owning a
business instead of having a job.
```

**Capture:**

```yaml
center_3_organizational_strategy:
  current_org_chart:
    positions_filled_by_owner: []  # list of every role the owner currently fills
    total_owner_positions: 0
    positions_with_dedicated_people: []
    positions_that_dont_exist_yet: []  # roles needed but not yet created
  target_org_chart:
    departments: []  # operations, marketing, finance, HR, customer service, etc.
    positions_per_department: {}  # department -> list of positions at maturity
    total_positions_at_maturity: 0
  position_contracts_needed: []  # list of positions needing formal contracts (purpose, accountabilities, standards)
  owner_exit_priority:
    first_to_delegate: "{role}"
    reason: "{why this role first -- highest impact or most owner-dependent}"
    second_to_delegate: "{role}"
    third_to_delegate: "{role}"
  status: "DESIGNED | PARTIAL | NOT STARTED"
```

#### 2.4 Center 4 -- Management Strategy

```yaml
center_4_management_strategy:
  gerber_principle: "You don't manage people. You manage systems that people use."
  current_management_approach: "{personal intervention / ad hoc / partially systematic / fully systematic}"
  management_questions:
    - "How do you currently handle an employee who does not follow a procedure?"
    - "What happens when a problem arises that no existing procedure covers?"
    - "How do you measure whether your managers are managing effectively?"
    - "Is your management approach documented, or does it depend on individual manager personality?"
  management_systems_in_place: []
  management_systems_needed: []
  status: "SYSTEMATIC | PARTIAL | ABSENT"
```

#### 2.5 Center 5 -- People Strategy

```yaml
center_5_people_strategy:
  gerber_insight: "People don't just work FOR the business -- they play the GAME of the business."
  game_worth_playing:
    purpose_defined: true/false  # do employees know WHY beyond making money?
    rules_clear: true/false  # do they know how the game is played?
    ways_to_win: true/false  # are there defined milestones and achievements?
    feedback_regular: true/false  # do they get regular performance feedback?
    growth_path: true/false  # is there a path for advancement?
  people_questions:
    - "Do your employees understand WHY they do what they do, or just WHAT to do?"
    - "Are the rules of the 'game' clear -- do they know how to win?"
    - "Do they get regular feedback on how they are performing?"
    - "Would your best employee recommend working here to a friend? Why or why not?"
  employee_engagement_level: "HIGH | MEDIUM | LOW | UNKNOWN"
  training_system_exists: true/false
  onboarding_process_documented: true/false
  status: "STRONG | DEVELOPING | ABSENT"
```

#### 2.6 Center 6 -- Marketing Strategy

```yaml
center_6_marketing_strategy:
  gerber_quote: "Nobody is interested in the commodity. People buy feelings."
  marketing_questions:
    - "Who is your ideal customer? (demographics: age, income, location, profession)"
    - "WHY does your ideal customer buy from you instead of competitors? (psychographics: what feeling, status, or need does it fulfill?)"
    - "What is your brand PROMISE -- what does the customer expect every single time?"
    - "Is this promise currently delivered consistently? (connects to Rules 1 and 5)"
  customer_demographics_defined: true/false
  customer_psychographics_defined: true/false
  brand_promise_articulated: true/false
  customer_experience_standardized: true/false
  marketing_systems_documented: true/false
  status: "DEFINED | PARTIAL | NOT DEFINED"
```

#### 2.7 Center 7 -- Systems Strategy

```yaml
center_7_systems_strategy:
  hard_systems:
    description: "Physical things -- equipment, facilities, technology, tools"
    inventory: []  # list of existing hard systems
    documented: []  # which ones are documented
    gaps: []  # what's missing or undocumented

  soft_systems:
    description: "Living things -- scripts, processes, procedures, training programs, checklists"
    inventory: []
    documented: []
    gaps: []
    key_insight: "Soft systems are the most important and most neglected"
    tribal_knowledge_items: []  # processes that exist only in someone's head

  information_systems:
    description: "Data things -- tracking, reporting, metrics, dashboards, feedback loops"
    inventory: []
    documented: []
    gaps: []

  systems_gap_summary:
    total_systems: 0
    total_documented: 0
    total_gap: 0
    tribal_knowledge_risk: "CRITICAL | HIGH | MODERATE | LOW"

  status: "COMPREHENSIVE | PARTIAL | MINIMAL"
```

#### 2.8 Seven Centers Summary Matrix

Present the complete picture:

```
SEVEN CENTERS STATUS SUMMARY
==============================

| # | Center                   | Current State      | Target State  | Gap Severity | Priority |
|---|--------------------------|--------------------|--------------:|--------------|----------|
| 1 | Primary Aim              | _________________ | DEFINED       | ___________  | ________ |
| 2 | Strategic Objective      | _________________ | DEFINED       | ___________  | ________ |
| 3 | Organizational Strategy  | _________________ | DESIGNED      | ___________  | ________ |
| 4 | Management Strategy      | _________________ | SYSTEMATIC    | ___________  | ________ |
| 5 | People Strategy          | _________________ | STRONG        | ___________  | ________ |
| 6 | Marketing Strategy       | _________________ | DEFINED       | ___________  | ________ |
| 7 | Systems Strategy         | _________________ | COMPREHENSIVE | ___________  | ________ |

Centers Defined:  __/7
Centers Partial:  __/7
Centers Absent:   __/7
Most Critical Gap: ________________________________
```

**Step 2 Output:** Complete Seven Centers Map showing current state, target state, and gaps for each Center.

---

### Step 3: Process Identification and Prioritization (10 min)

**Objective:** Identify the top 10-15 critical processes that must be documented and systemized for the Franchise Prototype to work. Prioritize by impact and owner-dependency.

**Mode:** Interactive (Agent guides, Human inventories)
**Behavioral State:** `state_architect`

#### 3.1 Process Discovery

```
Now we need to identify every critical process in your business.
A process is anything that happens repeatedly -- from how you
greet a customer to how you close the books at month end.

Think about your business as a machine with many moving parts.
We need to name every part.
```

**Guide the owner through process categories:**

```yaml
process_categories:
  customer_facing:
    name: "Customer-Facing Processes"
    examples:
      - "Customer greeting and first impression"
      - "Sales presentation / order taking"
      - "Service delivery / product delivery"
      - "Payment and checkout"
      - "Follow-up and retention"
      - "Complaint handling and resolution"
    processes_identified: []

  production_operations:
    name: "Production / Core Operations"
    examples:
      - "Production / manufacturing / preparation"
      - "Quality control and inspection"
      - "Inventory management and counting"
      - "Supply chain / vendor ordering"
      - "Equipment operation and maintenance"
    processes_identified: []

  people_management:
    name: "People Management Processes"
    examples:
      - "Hiring and recruitment"
      - "Onboarding and initial training"
      - "Ongoing training and skill development"
      - "Scheduling and shift management"
      - "Performance evaluation"
      - "Disciplinary procedures"
      - "Termination procedures"
    processes_identified: []

  financial_administrative:
    name: "Financial and Administrative"
    examples:
      - "Daily cash handling / register reconciliation"
      - "Accounts payable / receivable"
      - "Payroll processing"
      - "Tax compliance and filing"
      - "Financial reporting and analysis"
    processes_identified: []

  marketing_sales:
    name: "Marketing and Sales"
    examples:
      - "Lead generation and prospecting"
      - "Social media / digital presence management"
      - "Promotions and campaigns"
      - "Referral programs"
      - "Brand standards enforcement"
    processes_identified: []

  facility_operations:
    name: "Facility Operations"
    examples:
      - "Opening procedures"
      - "Closing procedures"
      - "Cleaning and sanitation"
      - "Safety and security protocols"
      - "Maintenance scheduling and execution"
    processes_identified: []
```

#### 3.2 Process Prioritization Matrix

Score each identified process on two axes to determine systemization priority:

```yaml
prioritization_criteria:
  axis_1_owner_dependency:
    description: "How much does this process depend on the owner personally?"
    scale:
      5: "Only the owner can do this -- complete dependency"
      4: "Owner does it 80%+ of the time"
      3: "Owner and 1-2 others can do it"
      2: "Several people can do it, owner occasionally involved"
      1: "Team handles independently without owner"

  axis_2_business_impact:
    description: "How critical is this process to business success and customer experience?"
    scale:
      5: "Business stops or customers leave if this fails"
      4: "Major revenue, quality, or customer impact"
      3: "Significant operational impact"
      2: "Moderate quality or efficiency impact"
      1: "Minor convenience or polish"

  priority_calculation:
    formula: "owner_dependency x business_impact"
    max_score: 25
    tiers:
      critical: "Score 20-25 -- Systemize FIRST (top priority)"
      high: "Score 12-19 -- Systemize in Phase 1"
      medium: "Score 6-11 -- Systemize in Phase 2"
      low: "Score 1-5 -- Systemize in Phase 3"
```

#### 3.3 Prioritization Table

Present the sorted prioritization:

```
PROCESS PRIORITIZATION MATRIX
===============================

| Rank | Process Name            | Category       | Owner Dep. | Biz Impact | Score | Tier     |
|------|-------------------------|----------------|------------|------------|-------|----------|
| 1    | ______________________ | ______________ | __/5       | __/5       | __/25 | CRITICAL |
| 2    | ______________________ | ______________ | __/5       | __/5       | __/25 | CRITICAL |
| ...  | ...                     | ...            | ...        | ...        | ...   | ...      |

Total Processes Identified: __
Critical Tier: __    High Tier: __    Medium Tier: __    Low Tier: __

TOP 10 SELECTED FOR IQO CYCLE (Step 4):
1. _______________
2. _______________
...
10. ______________
```

**Step 3 Output:** Prioritized process inventory with top 10 processes selected for IQO Cycle application.

---

### Step 4: IQO Cycle Application (25 min)

**Objective:** Apply the Innovation-Quantification-Orchestration cycle to each of the top critical processes identified in Step 3. This is the engine that transforms ad hoc work into documented, measured, locked-in systems.

**Mode:** Interactive (Agent guides, Human provides process detail)
**Behavioral State:** `state_architect`
**Heuristics:** mg003, mg004, mg005

**Core Principle:** *"Creativity thinks up new things. Innovation DOES new things."* -- Michael E. Gerber

```
Now we apply the engine that drives the Franchise Prototype
forward: the IQO Cycle.

For each of your top critical processes, we will:

  INNOVATE    -- Find the best way to do it
  QUANTIFY    -- Measure it so we KNOW it works
  ORCHESTRATE -- Lock it in so there is NO OTHER WAY to do it

This is not about being creative. This is about DOING new things,
measuring the results, and then eliminating the option of doing
it the old way. Ever again.
```

#### 4.1 IQO Process Template

For EACH of the top critical processes (minimum 5, target 10), apply this cycle:

```yaml
iqo_cycle_per_process:
  process_name: "{name from Step 3}"
  process_category: "{category}"
  priority_rank: "{1-10}"
  current_owner: "{who does this process today}"

  stage_1_innovation:
    description: "Find a better way to do this process"
    current_method:
      how_done_today: "{detailed description of current approach}"
      who_does_it: "{owner / specific employee / varies by shift}"
      time_required: "{average time to complete}"
      failure_points: []  # where things commonly go wrong
      variation_points: []  # where different people do it differently
      discretion_points: []  # where employees must use judgment (these must be eliminated)
    proposed_innovation:
      what_if: "{the innovation question: 'What if we did it THIS way instead?'}"
      key_change: "{what is fundamentally different}"
      expected_improvement: "{what should get better -- speed, quality, consistency, cost}"
      implementation_steps: []
    gerber_note: "Innovation is not creativity. It's not thinking new things -- it's DOING new things."

  stage_2_quantification:
    description: "Measure the impact of the innovation with specific numbers"
    baseline_metrics:
      metric_1:
        name: "{e.g., time to complete, error rate, customer wait time, cost per unit}"
        current_value: "{measured BEFORE innovation}"
        measurement_method: "{how you measure this -- timer, count, survey, report}"
      metric_2:
        name: ""
        current_value: ""
        measurement_method: ""
    post_innovation_targets:
      metric_1:
        target_value: "{what we expect AFTER innovation is implemented}"
        measurement_period: "{how long to test before deciding}"
      metric_2:
        target_value: ""
        measurement_period: ""
    validation_criteria:
      minimum_improvement: "{X% improvement required to proceed to Orchestration}"
      minimum_test_period: "{minimum days/weeks to validate results}"
    gerber_warning: "If you cannot quantify it, you do not yet have an innovation -- you have an experiment."

  stage_3_orchestration:
    description: "Eliminate discretion -- lock the innovation into the system permanently"
    documentation:
      process_title: "{formal process name for the Operations Manual}"
      process_id: "{unique identifier, e.g., OPS-001}"
      steps: []  # numbered, sequential, unambiguous steps -- every decision scripted
      decision_scripts: []  # if X then Y -- no personal judgment allowed
      quality_checkpoints: []  # verification moments within the process
      visual_aids_needed: []  # photos of 'right' vs 'wrong', diagrams, flowcharts
      common_mistakes: []  # what can go wrong and how to prevent it
      time_standard: "{how long this process should take}"
    training:
      who_needs_training: []  # roles that execute this process
      training_method: "{demonstration, manual study, shadowing, certification}"
      training_duration: "{estimated time to competency}"
      competency_test: "{how to verify the person can execute correctly}"
    enforcement:
      previous_method_removed: true/false  # the old way is no longer an option
      compliance_monitoring: "{how to verify the new process is being followed}"
      audit_frequency: "{daily / weekly / monthly check}"
      exception_handling: "{what to do when someone deviates from the process}"
    gerber_principle: "Orchestration is the elimination of discretion at the operating level. Without it, innovation is lost the moment you turn your back."
```

#### 4.2 IQO Application Protocol

For each process, follow this presentation:

```
PROCESS: [Name] (Rank #X of 10)
============================================

STAGE 1 -- INNOVATE
  Current State: [how it's done today]
  Innovation: [what if we did it THIS way instead?]
  Key Change: [what is fundamentally different]

STAGE 2 -- QUANTIFY
  Baseline: [current metric value]
  Target: [expected metric after innovation]
  Measurement: [how we track it]
  Test Period: [how long before we decide]

STAGE 3 -- ORCHESTRATE
  Procedure: [step-by-step, numbered, no ambiguity]
  Decision Scripts: [if X then Y -- no discretion]
  Training: [what someone needs to learn]
  Compliance: [how we verify it's being followed]
  Old Method: [REMOVED / still available]

============================================
```

#### 4.3 IQO Cycle Summary

After applying IQO to all priority processes, compile the summary:

```yaml
iqo_summary:
  total_processes_treated: 0
  fully_orchestrated: 0  # all three stages complete
  stage_2_complete: 0  # innovation designed + metrics defined, orchestration pending
  stage_1_only: 0  # innovation designed, quantification pending
  total_steps_documented: 0  # sum of all documented procedure steps
  total_decision_points_eliminated: 0  # discretion points converted to scripts
  total_metrics_established: 0  # baseline + target metrics defined
  processes_remaining: []  # lower priority processes for future IQO cycles
  tribal_knowledge_converted: 0  # processes moved from "in someone's head" to "in the manual"
```

**Step 4 Output:** IQO Cycle applied to top critical processes with documented procedures, baseline/target metrics, and orchestration enforcement plans.

---

### Step 5: Franchise Prototype Creation (15 min)

**Objective:** Validate the systemized operations against the Six Rules of the Franchise Prototype. Every rule must be satisfied for the business to be replication-ready.

**Mode:** Agent-led evaluation with owner input
**Behavioral State:** `state_validator`
**Framework:** Franchise Prototype Model (Six Rules) + Turn-Key Revolution

**Core Principle:** *"Build your business as if you were going to franchise 5,000 of them -- whether or not you ever will."* -- Michael E. Gerber

#### 5.1 Six Rules Validation

Test each systemized process and the business as a whole against every rule:

```yaml
franchise_prototype_validation:

  rule_1_consistent_value:
    name: "Consistent Value"
    standard: "The model will provide consistent value to customers, employees, suppliers, and lenders, beyond what they expect"
    test_question: "Does every customer get the same extraordinary experience every time?"
    evidence_to_gather:
      - "Customer experience consistency across shifts/locations"
      - "Employee experience and satisfaction consistency"
      - "Supplier relationship predictability"
    current_state:
      customer_experience_consistent: true/false
      employee_experience_consistent: true/false
      supplier_relationship_consistent: true/false
      evidence: "{specific examples or data}"
    failure_signs:
      - "Quality varies depending on who is working that day"
      - "Good days and bad days for customer experience"
      - "Some employees deliver excellence, others deliver mediocrity"
    gaps_identified: []
    remediation_actions: []
    status: "PASS | PARTIAL | FAIL"

  rule_2_lowest_possible_skill:
    name: "Lowest Possible Skill Level"
    standard: "The model will be operated by people with the lowest possible level of skill"
    test_question: "Can someone with minimal experience run this system after structured training?"
    evidence_to_gather:
      - "Minimum skill/experience required for core positions"
      - "Training time to basic competency"
      - "Dependency on extraordinary talent for ordinary operations"
    current_state:
      minimum_skill_required: "{description of current hiring requirements}"
      training_time_to_competency: "{current duration}"
      dependency_on_extraordinary_talent: true/false
      evidence: "{specific examples}"
    failure_signs:
      - "Need 'rock stars' or industry veterans for basic operations"
      - "Hiring takes months because requirements are extremely specific"
      - "Business quality drops dramatically when best employees leave"
    gaps_identified: []
    remediation_actions: []
    gerber_note: "This is NOT about paying low wages. It's about building systems so good that ordinary people can produce extraordinary results."
    status: "PASS | PARTIAL | FAIL"

  rule_3_impeccable_order:
    name: "Impeccable Order"
    standard: "The model will stand out as a place of impeccable order"
    test_question: "Is every aspect of the business organized, clean, and predictable?"
    evidence_to_gather:
      - "Physical workspace organization"
      - "Process and workflow organization"
      - "Information and documentation organization"
    current_state:
      physical_organization: "EXCELLENT | GOOD | AVERAGE | POOR"
      process_organization: "EXCELLENT | GOOD | AVERAGE | POOR"
      information_organization: "EXCELLENT | GOOD | AVERAGE | POOR"
      evidence: "{specific examples}"
    failure_signs:
      - "Workspace is disorganized or inconsistent between shifts"
      - "'Creative mess' used as an excuse for chaos"
      - "Cannot find information, tools, or supplies quickly"
    gaps_identified: []
    remediation_actions: []
    status: "PASS | PARTIAL | FAIL"

  rule_4_documented_in_manuals:
    name: "Documented in Operations Manuals"
    standard: "All work in the model will be documented in Operations Manuals"
    test_question: "Could someone run this business using ONLY the written documentation?"
    evidence_to_gather:
      - "Operations Manual existence and completeness"
      - "Percentage of critical processes documented"
      - "Documentation quality and usability"
    current_state:
      manual_exists: true/false
      percentage_of_processes_documented: "{X}%"
      documentation_quality: "EXCELLENT | GOOD | BASIC | NONE"
      documentation_format: "{description -- binder, digital, scattered notes}"
      last_updated: "{date or 'never'}"
      evidence: "{specific examples}"
    failure_signs:
      - "Everything lives in the owner's head"
      - "Tribal knowledge passed verbally from person to person"
      - "Some checklists exist but no comprehensive manual"
    gaps_identified: []
    remediation_actions: []
    gerber_quote: "Documentation says, 'This is how we do it here.' Without it, nothing can be replicated."
    status: "PASS | PARTIAL | FAIL"

  rule_5_predictable_service:
    name: "Uniformly Predictable Service"
    standard: "The model will provide uniformly predictable service to the customer"
    test_question: "Does the customer know exactly what to expect before they interact with the business?"
    evidence_to_gather:
      - "Service standards defined and communicated"
      - "Service scripts for customer interactions"
      - "Consistency across time, location, and personnel"
    current_state:
      service_standards_defined: true/false
      service_scripts_exist: true/false
      customer_experience_uniform: true/false
      mystery_shopper_ready: true/false
      evidence: "{specific examples}"
    failure_signs:
      - "Customer experience depends entirely on who serves them"
      - "Monday morning quality differs from Friday afternoon quality"
      - "No scripts or standards for customer interactions"
    gaps_identified: []
    remediation_actions: []
    status: "PASS | PARTIAL | FAIL"

  rule_6_uniform_code:
    name: "Uniform Color, Dress, and Facilities Code"
    standard: "The model will utilize a uniform color, dress, and facilities code"
    test_question: "Is every visual and physical element standardized and consistent?"
    evidence_to_gather:
      - "Brand colors and visual identity standards"
      - "Employee dress code or uniform"
      - "Facility layout, signage, and presentation standards"
    current_state:
      brand_colors_defined: true/false
      dress_code_exists: true/false
      facility_standards_exist: true/false
      signage_consistent: true/false
      evidence: "{specific examples}"
    failure_signs:
      - "Each location looks and feels different"
      - "No dress code or inconsistent enforcement"
      - "Visual brand identity is ad hoc and variable"
    gaps_identified: []
    remediation_actions: []
    status: "PASS | PARTIAL | FAIL"
```

#### 5.2 Prototype Scorecard

```
FRANCHISE PROTOTYPE SCORECARD
===============================

| # | Rule                        | Status          | Gaps Found | Priority   |
|---|-----------------------------|-----------------|------------|------------|
| 1 | Consistent Value            | PASS/PARTIAL/FAIL | __       | __________ |
| 2 | Lowest Possible Skill Level | PASS/PARTIAL/FAIL | __       | __________ |
| 3 | Impeccable Order            | PASS/PARTIAL/FAIL | __       | __________ |
| 4 | Documented in Manuals       | PASS/PARTIAL/FAIL | __       | __________ |
| 5 | Predictable Service         | PASS/PARTIAL/FAIL | __       | __________ |
| 6 | Uniform Code                | PASS/PARTIAL/FAIL | __       | __________ |

Rules Passed:  __/6
Rules Partial: __/6
Rules Failed:  __/6

PROTOTYPE STATUS: VALIDATED | NEEDS REMEDIATION | NOT READY
```

#### 5.3 Turn-Key Validation

The ultimate test: can someone "turn the key" and run this business?

```yaml
turnkey_validation:
  the_three_keys:
    key_1_business_is_the_product:
      principle: "Your product is NOT what you sell to customers. Your product is the BUSINESS ITSELF."
      question: "Does the owner treat the BUSINESS as the product -- working ON it, not IN it?"
      status: "YES | PARTIAL | NO"
      evidence: ""

    key_2_customer_is_the_franchisee:
      principle: "The business model must be so compelling that someone would BUY the right to operate it."
      question: "Is the business model compelling enough that a competent person would invest their own money to replicate it?"
      status: "YES | PARTIAL | NO"
      evidence: ""

    key_3_systems_produce_results:
      principle: "Results come from systems, not from extraordinary people doing extraordinary things."
      question: "Do results come from SYSTEMS rather than from talented individuals making heroic efforts?"
      status: "YES | PARTIAL | NO"
      evidence: ""

  thirty_day_test:
    question: "Can the business operate without the owner for 30 consecutive days with less than 10% performance decline?"
    current_answer: "YES | NO | UNTESTED"
    estimated_performance_decline: "{X}%"
    critical_dependencies_remaining: []  # what would still need the owner

  turnkey_status: "READY | APPROACHING | NOT READY"
  gerber_quote: "The system isn't something you bring to the business. It's something you derive from the process of building the business."
```

**Veto Check (Post-Prototype):**

```yaml
veto_check_post_prototype:
  - condition: "Any Rule scores FAIL and prototype declared VALIDATED"
    veto: VO-003
    severity: CRITICAL
    action: "BLOCK -- all Six Rules must be PASS or PARTIAL for VALIDATED. Any FAIL = NEEDS REMEDIATION at best."

  - condition: "4 or more Rules score FAIL"
    severity: HIGH
    action: "Business is in EARLY STAGE systemization. Set expectations: 12-24 weeks of focused work before franchise readiness."

  - condition: "Rule 2 FAIL with 'rock star' dependency"
    veto: MG-10
    severity: HIGH
    action: "Systems must be redesigned for ordinary skill levels before franchise replication is viable."
```

**Step 5 Output:** Complete Franchise Prototype validation with Six Rules scorecard and Turn-Key readiness assessment.

---

### Step 6: Operations Manual Blueprint (15 min)

**Objective:** Structure the comprehensive Operations Manual that documents "This is how we do it here." This is the tangible deliverable that makes replication possible.

**Mode:** Agent-led (synthesis of all previous steps)
**Behavioral State:** `state_architect`

**Core Principle:** *"Documentation says, 'This is how we do it here.' Without it, your business is a mystery to everyone but you."* -- Michael E. Gerber

#### 6.1 Manual Structure

Design the Operations Manual structure based on all previous steps:

```yaml
operations_manual_blueprint:
  manual_title: "[Business Name] Operations Manual"
  version: "1.0.0"
  classification: "CONFIDENTIAL -- Franchise Operations"

  volume_1_foundation:
    title: "Foundation and Culture"
    chapters:
      ch_1_welcome:
        title: "Welcome to [Business Name]"
        sections:
          - "Our Story and Mission"
          - "Primary Aim and Strategic Objective"
          - "Our Values and Culture"
          - "The Game Worth Playing (purpose beyond profit)"
          - "What We Stand For (brand promise)"
        source: "Step 2 -- Centers 1 and 5"

      ch_2_organization:
        title: "Our Organization"
        sections:
          - "Organizational Chart (mature business structure)"
          - "Position Contracts for every role (purpose, accountabilities, standards)"
          - "Reporting Structure and Communication Protocols"
          - "Decision-Making Authority Matrix (who decides what)"
        source: "Step 2 -- Center 3"

      ch_3_brand_standards:
        title: "Brand Standards"
        sections:
          - "Visual Identity (logo, colors, fonts, usage rules)"
          - "Dress Code and Personal Presentation Standards"
          - "Facility Standards (layout, cleanliness, signage, ambiance)"
          - "Brand Voice and Communication Standards"
        source: "Step 5 -- Rule 6"

  volume_2_operations:
    title: "Operations Procedures"
    chapters:
      ch_4_daily_operations:
        title: "Daily Operations"
        sections:
          - "Opening Procedures (step-by-step with timed checklist)"
          - "Shift Operations and Handoff Procedures"
          - "Closing Procedures (step-by-step with timed checklist)"
          - "Emergency Procedures and Crisis Response"
        source: "Step 4 -- IQO-treated facility operations"

      ch_5_core_production:
        title: "Core Production / Service Delivery"
        sections:
          - "[IQO Process 1 -- full documented procedure with visual aids]"
          - "[IQO Process 2 -- full documented procedure]"
          - "[IQO Process N -- full documented procedure]"
          - "Quality Control Checkpoints and Standards"
          - "Quality Standards Guide (photos of 'right' vs 'wrong')"
        source: "Step 4 -- IQO Stage 3 orchestrated procedures"
        note: "This is the heart of the manual -- every critical process documented to eliminate discretion"

      ch_6_customer_experience:
        title: "Customer Experience Standards"
        sections:
          - "Customer Journey Map (end to end, every touchpoint)"
          - "Service Scripts (greeting, selling, closing, follow-up, phone, email)"
          - "Complaint Handling Procedure (escalation matrix)"
          - "Customer Feedback Collection and Response"
          - "Customer Retention and Loyalty Protocols"
        source: "Step 5 -- Rules 1 and 5"

      ch_7_inventory_supply:
        title: "Inventory and Supply Chain"
        sections:
          - "Approved Suppliers List and Contact Information"
          - "Ordering Procedures, Schedules, and Reorder Points"
          - "Receiving and Quality Inspection Standards"
          - "Storage Standards and FIFO/FEFO Protocols"
          - "Inventory Counting, Reconciliation, and Variance Handling"

  volume_3_management:
    title: "Management Systems"
    chapters:
      ch_8_people_management:
        title: "People Management"
        sections:
          - "Hiring Procedure (ideal profile, interview guide, selection criteria)"
          - "Onboarding Program (First Day / First Week / First Month milestones)"
          - "Training Program by Position (curriculum, schedule, assessments)"
          - "Performance Evaluation System (metrics, frequency, format)"
          - "Scheduling System and Coverage Rules"
          - "Disciplinary Procedure (progressive, documented)"
          - "Termination Procedure (legal, documented)"
        source: "Step 2 -- Centers 4 and 5"

      ch_9_financial_management:
        title: "Financial Management"
        sections:
          - "Daily Cash Handling and Register Reconciliation"
          - "Banking Procedures and Deposit Protocols"
          - "Accounts Payable / Receivable Processing"
          - "Payroll Processing and Compliance"
          - "Financial Reporting Schedule (daily, weekly, monthly)"
          - "Key Financial Metrics, Targets, and Variance Thresholds"

      ch_10_marketing:
        title: "Marketing and Sales"
        sections:
          - "Marketing Strategy Overview and Brand Positioning"
          - "Customer Demographics and Psychographics Profiles"
          - "Approved Marketing Activities and Budget Allocation"
          - "Social Media Guidelines and Content Standards"
          - "Local Marketing Playbook (templates and approved tactics)"
          - "Promotions Calendar and Approval Process"
        source: "Step 2 -- Center 6"

  volume_4_systems:
    title: "Systems and Technology"
    chapters:
      ch_11_hard_systems:
        title: "Equipment and Technology"
        sections:
          - "Equipment List and Specifications"
          - "Equipment Operating Procedures"
          - "Preventive Maintenance Schedule"
          - "Troubleshooting Guide (common issues and solutions)"
          - "Technology Systems (POS, software, apps, integrations)"
        source: "Step 2 -- Center 7 (Hard Systems)"

      ch_12_information_systems:
        title: "Reporting and Metrics"
        sections:
          - "Daily Reports (what to track, when to submit, who reviews)"
          - "Weekly Reports and Trend Analysis"
          - "Monthly Reports and Performance Review"
          - "Key Performance Indicators (KPIs) and Targets"
          - "Dashboard Setup and Monitoring Protocols"
          - "Variance Alerts and Action Triggers"
        source: "Step 2 -- Center 7 (Information Systems) + Step 4 (IQO Quantification metrics)"

  appendices:
    title: "Appendices"
    items:
      - "A: Forms and Templates Library"
      - "B: Checklists Collection (opening, closing, cleaning, audit)"
      - "C: Scripts Collection (customer service, sales, phone, complaint)"
      - "D: Visual Standards Guide (photos -- 'this is right' vs 'this is wrong')"
      - "E: Training Verification Records and Competency Sign-Off Sheets"
      - "F: Emergency Contact List and Escalation Directory"
      - "G: Glossary of Terms and Abbreviations"
```

#### 6.2 Documentation Priority Plan

```yaml
documentation_priority:
  phase_1_critical:
    timeline: "Weeks 1-4"
    chapters:
      - "Ch 4: Daily Operations (opening, shift, closing)"
      - "Ch 5: Core Production (all IQO-treated processes)"
      - "Ch 6: Customer Experience (service scripts and standards)"
    reason: "These are the processes with highest owner-dependency and direct business impact. Document these first to unlock delegation."

  phase_2_high:
    timeline: "Weeks 5-8"
    chapters:
      - "Ch 8: People Management (hiring, onboarding, training)"
      - "Ch 7: Inventory and Supply Chain"
      - "Ch 3: Brand Standards"
    reason: "People management and supply chain processes enable consistent operations when new people join. Brand standards ensure visual consistency."

  phase_3_medium:
    timeline: "Weeks 9-12"
    chapters:
      - "Ch 1: Welcome and Culture"
      - "Ch 2: Organization"
      - "Ch 9: Financial Management"
      - "Ch 10: Marketing and Sales"
    reason: "Foundation, financial, and marketing systems complete the operational picture. These are important but less urgent than customer-facing and production processes."

  phase_4_systems:
    timeline: "Weeks 13-16"
    chapters:
      - "Ch 11: Equipment and Technology"
      - "Ch 12: Reporting and Metrics"
      - "All Appendices"
    reason: "Systems documentation and reference materials complete the manual and provide the support infrastructure."

  estimated_total_pages: "200-400 pages (depending on business complexity)"
  estimated_total_effort: "120-240 hours of focused documentation work"
```

#### 6.3 Manual Quality Standards

```yaml
manual_quality_standards:
  every_procedure_must_have:
    - "Unique process ID (e.g., OPS-001, SVC-012)"
    - "Clear, numbered steps with no ambiguity"
    - "Decision points with explicit if/then rules (no discretion)"
    - "Time estimates for each step and total process"
    - "Quality checkpoints within the process"
    - "Visual aids where applicable (photos, diagrams, flowcharts)"
    - "Common mistakes section (what can go wrong and how to prevent it)"
    - "Escalation path (who to contact if something goes wrong)"

  the_stranger_test:
    description: "The ultimate validation: hand the manual to a competent person who has NEVER seen the business."
    method:
      step_1: "Select a person with no knowledge of this business or industry"
      step_2: "Give them the manual and the prescribed training period"
      step_3: "Have them operate the business for one full week"
      step_4: "Document every point where they need to ask a question"
      step_5: "Each question = a documentation gap"
      step_6: "Fill every gap in the manual"
      step_7: "Repeat with a new person until gaps reach zero"
    success_criteria: "New person reaches 90% of standard performance within the training period using only the manual"

  continuous_improvement:
    principle: "The manual itself is subject to the IQO cycle -- innovate the documentation, quantify its effectiveness, orchestrate the updates"
    review_frequency: "Quarterly review of all procedures"
    version_control: "Every change logged, dated, and communicated to all affected personnel"
    feedback_loop: "Employees can submit improvement suggestions -- each one goes through IQO before adoption"
```

**Step 6 Output:** Complete Operations Manual blueprint with 4 volumes, 12 chapters, documentation priority plan, and quality standards.

---

### Step 7: Synthesis and Handoff (10 min)

**Objective:** Compile all previous steps into a comprehensive Operations Systemization Report, deliver the verdict, and define the handoff to the next agent in the franchise development pipeline.

**Mode:** Agent-led (synthesis and assessment)
**Behavioral State:** `state_validator`

#### 7.1 Systemization Report Header

```
OPERATIONS SYSTEMIZATION REPORT
=================================
Business:     [business_name]
Owner:        [owner_name]
Agent:        @michael-gerber
Date:         [date]
Task:         franchise/systemize-operations v1.0.0
Quality Gate: QG-FR-002 (Operations Systemized)

EXECUTIVE SUMMARY:
[1-3 paragraph narrative summary of the business's systemization
status, key findings, major strengths, critical gaps, and overall
readiness for franchise replication]
```

#### 7.2 Key Findings Summary

```yaml
key_findings:
  three_personalities:
    entrepreneur_pct: "{X}%"
    manager_pct: "{Y}%"
    technician_pct: "{Z}%"
    dominant: "Entrepreneur | Manager | Technician"
    imbalance_severity: "CRITICAL | HIGH | MODERATE | HEALTHY"
    fatal_assumption: true/false
    entrepreneurial_seizure: true/false

  business_maturity:
    stage: "Infancy | Adolescence | Growing Pains | Maturity"
    owner_dependency: "TOTAL | HIGH | MODERATE | LOW"
    thirty_day_test: "PASS | FAIL | UNTESTED"
    positions_filled_by_owner: "{count}"

  seven_centers_status:
    centers_defined: "{X}/7"
    centers_partial: "{Y}/7"
    centers_absent: "{Z}/7"
    most_critical_gap: "{center name and description}"

  processes_systemized:
    total_identified: 0
    iqo_cycle_applied: 0
    fully_orchestrated: 0
    decision_points_eliminated: 0
    remaining_to_document: 0

  franchise_prototype:
    rules_passed: "{X}/6"
    rules_partial: "{Y}/6"
    rules_failed: "{Z}/6"
    prototype_status: "VALIDATED | NEEDS REMEDIATION | NOT READY"
    turnkey_status: "READY | APPROACHING | NOT READY"

  operations_manual:
    blueprint_complete: true/false
    chapters_documented: "{X}/{total}"
    estimated_completion_effort: "{hours} hours / {weeks} weeks"
    priority_plan_defined: true/false
```

#### 7.3 Remediation Roadmap

```yaml
remediation_roadmap:
  immediate_actions:
    timeline: "Weeks 1-2"
    items:
      - action: "{specific action}"
        owner: "{who is responsible}"
        priority: "CRITICAL"
        estimated_effort: "{hours/days}"
        addresses: "{which gap or failed rule this fixes}"

  short_term_actions:
    timeline: "Weeks 3-8"
    items:
      - action: ""
        owner: ""
        priority: "HIGH"
        estimated_effort: ""
        addresses: ""

  medium_term_actions:
    timeline: "Weeks 9-16"
    items:
      - action: ""
        owner: ""
        priority: "MEDIUM"
        estimated_effort: ""
        addresses: ""

  ongoing_actions:
    timeline: "Continuous (never stops)"
    items:
      - action: "IQO cycle on remaining undocumented processes"
        owner: "Operations Manager"
        priority: "STANDARD"
        frequency: "Weekly"
      - action: "Quarterly Operations Manual review and update"
        owner: "Operations Manager"
        priority: "STANDARD"
        frequency: "Quarterly"
      - action: "Stranger Test with every new employee"
        owner: "Training Manager"
        priority: "STANDARD"
        frequency: "Per new hire"
      - action: "Franchise Prototype Six Rules audit"
        owner: "Owner / Quality Manager"
        priority: "STANDARD"
        frequency: "Semi-annual"
```

#### 7.4 Systemization Verdict

```yaml
systemization_verdict:
  status: "SYSTEMIZED | IN PROGRESS | NOT READY"
  franchise_prototype: "VALIDATED | NEEDS REMEDIATION | NOT READY"
  operations_manual: "COMPLETE | IN PROGRESS | BLUEPRINT ONLY"
  owner_dependency: "ELIMINATED | REDUCED | UNCHANGED"
  confidence: "HIGH | MEDIUM | LOW"
  summary: "{1-2 sentence definitive assessment of the business's readiness}"
```

**Verdict Decision Matrix:**

| Prototype Status | Manual Status | Owner Dependency | Verdict |
|-----------------|---------------|------------------|---------|
| VALIDATED | COMPLETE | ELIMINATED or REDUCED | **SYSTEMIZED** -- Ready for franchise replication |
| VALIDATED | IN PROGRESS | REDUCED | **IN PROGRESS** -- Continue documentation, prototype is solid |
| NEEDS REMEDIATION | BLUEPRINT ONLY | REDUCED | **IN PROGRESS** -- Address failed rules, continue IQO cycles |
| NEEDS REMEDIATION | BLUEPRINT ONLY | UNCHANGED | **NOT READY** -- Major systemization work required |
| NOT READY | NOT STARTED | TOTAL | **NOT READY** -- Fundamental transformation needed |

#### 7.5 Closing Narrative

```
[owner_name], here is what we have built today.

{If SYSTEMIZED:}
Your business now has what McDonald's has -- a system. Not a
perfect system, because perfection is a journey, not a destination.
But a WORKING system. A system that can be replicated. A system
that ordinary people can run to produce extraordinary results.

The system runs the business. The people run the system. You are
no longer the system.

{If IN PROGRESS:}
We have laid the foundation. You now know WHAT needs to be built
and HOW to build it. The IQO cycle is your engine -- keep applying
it to every process, measuring the results, and locking in the
improvements.

The roadmap is clear. The work is ahead of you. But remember:
work ON your business, not IN it. Every hour you spend documenting
a process is an hour that frees you forever.

{If NOT READY:}
I need to be honest with you. Your business today is not a
business -- it is a job. It is your job. And as long as that is
true, it cannot be replicated, because you cannot be replicated.

But here is the good news: every business -- EVERY business --
can be transformed. The roadmap is in your hands. The question is
not whether it is possible. The question is whether you are
willing to do the work.

Work ON your business, not IN it. That is where we must start.
```

#### 7.6 Handoff

```yaml
handoff:
  primary_handoff:
    next_agent: "@marcelo-cherto"
    trigger: "Operations systemized or in progress, Brazilian franchise market target"
    context_passed:
      - "Operations Systemization Report (full YAML)"
      - "Franchise Prototype Validation (Six Rules scorecard)"
      - "Operations Manual Blueprint (or completed manual)"
      - "IQO-treated process documentation"
      - "Seven Centers Map (current state and gaps)"
      - "Remediation Roadmap (remaining items)"

  alternative_handoff_sales:
    next_agent: "@joe-mathews"
    trigger: "Prototype validated, ready for franchise sales preparation"
    context_passed:
      - "Franchise Prototype description and validation status"
      - "Operations Manual summary and completion status"
      - "Training program outline"
      - "Key systemization achievements and selling points"

  alternative_handoff_reassessment:
    next_agent: "@mark-siebert"
    trigger: "Significant changes to business model discovered during systemization"
    context_passed:
      - "Updated operations data and business model changes"
      - "Changes made during systemization process"
      - "New financial projections (if applicable)"
      - "Recommendation for full or partial reassessment"

  alternative_handoff_relationship:
    next_agent: "@greg-nathan"
    trigger: "Franchise already operating, franchisee relationship issues surfacing during systemization"
    context_passed:
      - "Systems compliance data by franchisee"
      - "Performance metrics and variance analysis"
      - "Engagement concerns identified during assessment"

  alternative_handoff_performance:
    next_agent: "@scott-greenberg"
    trigger: "Individual franchisee underperformance despite good systems being in place"
    context_passed:
      - "Systems in place and compliance data"
      - "Performance metrics vs. system benchmarks"
      - "Identified gaps between system capability and franchisee execution"

  self_handoff:
    next_agent: "@michael-gerber (self)"
    trigger: "Prototype NOT READY, major systemization work still required"
    context_passed:
      - "Current progress checkpoint"
      - "Remaining IQO processes to treat"
      - "Remediation roadmap for next session"

  handoff_template: |
    ## HANDOFF: @michael-gerber -> @{next_agent}

    **Business:** {business_name}
    **Systemization Status:** {SYSTEMIZED / IN PROGRESS / NOT READY}
    **Three Personalities Assessment:** Entrepreneur {X}% / Manager {Y}% / Technician {Z}%
    **Franchise Prototype Status:** Rules passed: {X}/6 | Status: {VALIDATED / NEEDS REMEDIATION / NOT READY}
    **Operations Manual Status:** {COMPLETE / IN PROGRESS / BLUEPRINT ONLY}
    **Owner-Dependency Level:** {ELIMINATED / REDUCED / UNCHANGED}
    **Key Findings:** {summary of top 3 systemization results}
    **Priority Issues for Next Agent:** {top 3 issues the receiving agent must address}
    **Expected Deliverable:** {what the next agent should produce}
```

**Step 7 Output:** Complete Operations Systemization Report with verdict, remediation roadmap, closing narrative, and handoff package for next agent.

---

## Output

```yaml
file: "squads/franchise/data/{slug}-operations-systemization.yaml"
format: "yaml"
content:
  operations_systemization_report:
    metadata:
      business_name: "{business_name}"
      owner_name: "{owner_name}"
      assessment_date: "{date}"
      agent: "michael-gerber"
      task: "franchise/systemize-operations"
      version: "1.0.0"
      quality_gate: "QG-FR-002"
      siebert_verdict: "{GO / CONDITIONAL / NO-GO / N/A}"
      duration_minutes: "{actual duration}"

    three_personalities_assessment:
      entrepreneur_pct: "{X}%"
      manager_pct: "{Y}%"
      technician_pct: "{Z}%"
      dominant_personality: "{Entrepreneur | Manager | Technician}"
      imbalance_severity: "{CRITICAL | HIGH | MODERATE | HEALTHY}"
      fatal_assumption_detected: false
      entrepreneurial_seizure_detected: false
      business_maturity_stage: "{Infancy | Adolescence | Growing Pains | Maturity}"
      owner_dependency_level: "{TOTAL | HIGH | MODERATE | LOW}"
      diagnostic_notes: "{narrative assessment based on diagnostic questions}"

    seven_centers_map:
      center_1_primary_aim:
        status: "{DEFINED | NEEDS REFINEMENT | NOT DEFINED}"
        primary_aim_statement: ""
        gap_severity: "{CRITICAL | HIGH | MEDIUM | LOW | NONE}"
      center_2_strategic_objective:
        status: "{DEFINED | NEEDS REFINEMENT | NOT DEFINED}"
        strategic_objective_statement: ""
        revenue_target: ""
        growth_timeline: ""
        gap_severity: "{CRITICAL | HIGH | MEDIUM | LOW | NONE}"
      center_3_organizational_strategy:
        status: "{DESIGNED | PARTIAL | NOT STARTED}"
        positions_filled_by_owner: 0
        total_positions_at_maturity: 0
        owner_exit_priority: []
        gap_severity: "{CRITICAL | HIGH | MEDIUM | LOW | NONE}"
      center_4_management_strategy:
        status: "{SYSTEMATIC | PARTIAL | ABSENT}"
        management_systems_count: 0
        gap_severity: "{CRITICAL | HIGH | MEDIUM | LOW | NONE}"
      center_5_people_strategy:
        status: "{STRONG | DEVELOPING | ABSENT}"
        game_worth_playing_defined: false
        training_system_exists: false
        gap_severity: "{CRITICAL | HIGH | MEDIUM | LOW | NONE}"
      center_6_marketing_strategy:
        status: "{DEFINED | PARTIAL | NOT DEFINED}"
        customer_profiles_defined: false
        brand_promise_articulated: false
        gap_severity: "{CRITICAL | HIGH | MEDIUM | LOW | NONE}"
      center_7_systems_strategy:
        status: "{COMPREHENSIVE | PARTIAL | MINIMAL}"
        hard_systems_count: 0
        soft_systems_count: 0
        information_systems_count: 0
        documented_count: 0
        tribal_knowledge_risk: "{CRITICAL | HIGH | MODERATE | LOW}"
        gap_severity: "{CRITICAL | HIGH | MEDIUM | LOW | NONE}"
      centers_summary:
        defined: 0
        partial: 0
        absent: 0
        most_critical_gap: ""

    process_inventory:
      total_processes_identified: 0
      processes_by_category:
        customer_facing: 0
        production_operations: 0
        people_management: 0
        financial_administrative: 0
        marketing_sales: 0
        facility_operations: 0
      prioritization:
        critical_tier: 0
        high_tier: 0
        medium_tier: 0
        low_tier: 0
      top_10_processes:
        - rank: 1
          name: ""
          category: ""
          owner_dependency: 0
          business_impact: 0
          priority_score: 0
          iqo_status: "{COMPLETE | IN PROGRESS | NOT STARTED}"

    iqo_cycle_results:
      processes_treated: 0
      fully_orchestrated: 0
      stage_2_complete: 0
      stage_1_only: 0
      total_steps_documented: 0
      total_decision_points_eliminated: 0
      total_metrics_established: 0
      processes_details:
        - process_name: ""
          process_id: ""
          iqo_status: "{COMPLETE | STAGE_1 | STAGE_2 | STAGE_3 | NOT STARTED}"
          steps_documented: 0
          metrics_defined: 0
          decision_scripts_created: 0
          key_innovation: ""
          baseline_metric: ""
          target_metric: ""
      processes_remaining: []

    franchise_prototype_validation:
      rule_1_consistent_value: "{PASS | PARTIAL | FAIL}"
      rule_2_lowest_skill: "{PASS | PARTIAL | FAIL}"
      rule_3_impeccable_order: "{PASS | PARTIAL | FAIL}"
      rule_4_documented_manuals: "{PASS | PARTIAL | FAIL}"
      rule_5_predictable_service: "{PASS | PARTIAL | FAIL}"
      rule_6_uniform_code: "{PASS | PARTIAL | FAIL}"
      rules_passed: 0
      rules_partial: 0
      rules_failed: 0
      prototype_status: "{VALIDATED | NEEDS REMEDIATION | NOT READY}"
      turnkey_validation:
        business_is_the_product: "{YES | PARTIAL | NO}"
        customer_is_the_franchisee: "{YES | PARTIAL | NO}"
        systems_produce_results: "{YES | PARTIAL | NO}"
        thirty_day_test: "{PASS | FAIL | UNTESTED}"
        estimated_performance_decline: "{X}%"
        turnkey_status: "{READY | APPROACHING | NOT READY}"

    operations_manual_blueprint:
      total_volumes: 4
      total_chapters: 12
      chapters_documented: 0
      chapters_in_progress: 0
      chapters_not_started: 0
      estimated_total_pages: "200-400"
      estimated_total_effort_hours: "120-240"
      documentation_priority_plan:
        phase_1_critical: "Weeks 1-4: Daily Ops, Core Production, Customer Experience"
        phase_2_high: "Weeks 5-8: People Management, Inventory, Brand Standards"
        phase_3_medium: "Weeks 9-12: Foundation, Organization, Finance, Marketing"
        phase_4_systems: "Weeks 13-16: Equipment, Reporting, Appendices"
      manual_status: "{COMPLETE | IN PROGRESS | BLUEPRINT ONLY}"

    remediation_roadmap:
      immediate_actions: []
      short_term_actions: []
      medium_term_actions: []
      ongoing_actions: []
      total_remediation_items: 0
      estimated_total_timeline_weeks: 0

    systemization_verdict:
      status: "{SYSTEMIZED | IN PROGRESS | NOT READY}"
      franchise_prototype: "{VALIDATED | NEEDS REMEDIATION | NOT READY}"
      operations_manual: "{COMPLETE | IN PROGRESS | BLUEPRINT ONLY}"
      owner_dependency: "{ELIMINATED | REDUCED | UNCHANGED}"
      confidence: "{HIGH | MEDIUM | LOW}"
      summary: "{1-2 sentence definitive assessment}"

    handoff:
      next_agent: "@marcelo-cherto | @joe-mathews | @mark-siebert | @michael-gerber | none"
      trigger: "{condition that activates the handoff}"
      context_passed: "{key findings, gaps, deliverables for next agent}"
      priority_for_next_agent: []
```

---

## Quality Gate: QG-FR-002 (Operations Systemized)

- [ ] Three Personalities diagnostic completed with percentage distribution (E/M/T)
- [ ] Business maturity stage assessed (Infancy / Adolescence / Growing Pains / Maturity)
- [ ] Owner-dependency level quantified (TOTAL / HIGH / MODERATE / LOW)
- [ ] Fatal Assumption and Entrepreneurial Seizure explicitly checked and documented
- [ ] All Seven Centers of Management Attention mapped with current state and gap severity
- [ ] Primary Aim defined or documented as gap with remediation plan
- [ ] Strategic Objective defined or documented as gap with remediation plan
- [ ] Organizational Strategy designed (mature org chart with owner exit priority, not just current state)
- [ ] Minimum 10 critical processes identified, scored, and prioritized
- [ ] IQO Cycle applied to minimum 5 critical processes (all three stages: Innovate, Quantify, Orchestrate)
- [ ] All IQO-treated processes have documented step-by-step procedures with decision scripts
- [ ] Baseline and target metrics established for all IQO-treated processes
- [ ] Franchise Prototype validated against all Six Rules (each scored PASS / PARTIAL / FAIL)
- [ ] Turn-Key validation completed (Three Keys assessment + 30-Day Test evaluation)
- [ ] Operations Manual blueprint structured with 4 volumes, 12 chapters, and appendices
- [ ] Documentation priority plan defined with phased timeline and effort estimates
- [ ] Remediation roadmap created with immediate, short-term, medium-term, and ongoing actions
- [ ] Systemization verdict issued (SYSTEMIZED / IN PROGRESS / NOT READY) with confidence level
- [ ] All veto conditions explicitly checked and documented
- [ ] YAML output file generated with all fields populated
- [ ] Handoff defined with context package for next agent

---

## Veto Conditions

```yaml
veto_conditions:
  hard_veto:  # Task output MUST flag these as blocking issues

    - id: VO-001
      condition: "Franchise Prototype created without completing Three Personalities diagnostic"
      severity: CRITICAL
      action: "HALT -- diagnostic MUST come first. Cannot design systems without understanding the personality imbalance that created the problem."
      gerber_principle: "The Fatal Assumption must be identified before it can be corrected."

    - id: VO-002
      condition: "Operations Manual blueprint created without IQO Cycle applied to critical processes"
      severity: CRITICAL
      action: "HALT -- the manual documents the ORCHESTRATED processes, not the old ad hoc methods. IQO must come first."
      gerber_principle: "Orchestration is the elimination of discretion at the operating level. Without it, the manual documents chaos."

    - id: VO-003
      condition: "Prototype declared VALIDATED with any Rule scoring FAIL"
      severity: CRITICAL
      action: "BLOCK -- all Six Rules must be PASS or PARTIAL for VALIDATED status. Any FAIL means NEEDS REMEDIATION at best."

    - id: VO-004
      condition: "No Primary Aim defined and systemization proceeds past Step 2"
      severity: HIGH
      action: "WARN -- Center 1 (Primary Aim) should be addressed first. The business must serve the life, not the other way around."
      gerber_quote: "With no clear picture of how you wish your life to be, how on earth are you going to live it?"

    - id: VO-005
      condition: "Owner scores 80%+ Technician and no remediation plan is created"
      severity: HIGH
      action: "WARN -- extreme Technician dominance will sabotage all systemization efforts. Address the personality imbalance in the remediation roadmap."

  soft_veto:  # Task continues but flags these as concerns

    - id: VO-006
      condition: "Fewer than 5 processes treated with full IQO Cycle (all three stages)"
      severity: MEDIUM
      action: "FLAG -- minimum 5 processes must go through all three IQO stages for meaningful systemization. Document remaining as phase 2 work."

    - id: VO-007
      condition: "Organizational Strategy not designed (Center 3 absent)"
      severity: MEDIUM
      action: "FLAG -- without a mature org chart, the owner cannot systematically extract themselves from operational roles. Add to remediation roadmap."

    - id: VO-008
      condition: "No baseline metrics established for any process (Quantification stage skipped)"
      severity: MEDIUM
      action: "FLAG -- without quantification, there is no way to validate that innovations are working. Require baseline metrics before declaring orchestration complete."

  process_veto:  # Task execution halts -- cannot continue

    - id: VO-009
      condition: "Owner refuses to discuss Primary Aim or life vision after multiple attempts"
      severity: HIGH
      action: "PAUSE -- explain the connection between life vision and business design. If owner persists in refusing, document as a risk and proceed with disclaimer that the systemization may produce a more efficient prison rather than freedom."

    - id: VO-010
      condition: "Owner cannot describe ANY process in their business in detail"
      severity: CRITICAL
      action: "HALT -- if the owner cannot articulate what happens in the business step by step, systemization is premature. Recommend a 2-week process shadowing and documentation sprint before attempting this task again."

    - id: VO-011
      condition: "Owner insists 'my business is different, systems won't work here'"
      severity: HIGH
      action: "ADDRESS -- this is resistance to the universal principle. Apply Gerber's storytelling approach: tell the McDonald's story, the Sarah story, demonstrate that every great business follows the same principles. If resistance persists after genuine effort, document as a risk factor."
```

---

## Completion Criteria

The task is considered complete when ALL of the following are satisfied:

1. **Three Personalities Diagnostic delivered** -- Percentage distribution (E/M/T), dominant personality identified, Fatal Assumption and Entrepreneurial Seizure explicitly checked, maturity stage assessed, owner-dependency level quantified
2. **Seven Centers Map complete** -- All 7 Centers mapped with current state, target state, and gap severity. Primary Aim and Strategic Objective either defined or documented as gaps with remediation plans
3. **Process Inventory delivered** -- Minimum 10 critical processes identified, scored on owner-dependency (1-5) and business impact (1-5), prioritized into tiers (Critical/High/Medium/Low)
4. **IQO Cycle applied** -- Minimum 5 critical processes fully treated through all three stages (Innovation, Quantification, Orchestration) with documented step-by-step procedures, baseline/target metrics, decision scripts, and enforcement plans
5. **Franchise Prototype validated** -- All Six Rules tested with PASS/PARTIAL/FAIL status. Turn-Key validation completed (Three Keys + 30-Day Test assessment)
6. **Operations Manual Blueprint structured** -- 4 volumes, 12 chapters, appendices defined. Documentation priority plan with phased timeline (Weeks 1-4, 5-8, 9-12, 13-16)
7. **Remediation Roadmap created** -- Immediate, short-term, medium-term, and ongoing actions defined with owners, priorities, and effort estimates
8. **Systemization Verdict issued** -- Clear status (SYSTEMIZED / IN PROGRESS / NOT READY) with confidence level and 1-2 sentence summary
9. **YAML output saved** -- Complete structured report in `squads/franchise/data/{slug}-operations-systemization.yaml`
10. **Handoff defined** -- Next agent identified with trigger condition and context package

**The owner walks away with:**
- A clear diagnosis of WHY their business depends on them (Three Personalities)
- A complete map of what needs to be built across all seven business dimensions (Seven Centers)
- Documented, measured, orchestrated procedures for their most critical processes (IQO Cycle)
- A validated (or gap-identified) Franchise Prototype with a scorecard (Six Rules)
- A structured plan for their complete Operations Manual (Blueprint)
- A clear, prioritized roadmap for what to do next (Remediation Roadmap)
- A definitive answer: is the business ready for franchise replication?

---

## Session Management

This task can be split across multiple sessions. Track progress with checkpoints:

```yaml
session_checkpoints:
  checkpoint_1: "Three Personalities Diagnostic complete (Step 1)"
  checkpoint_2: "Seven Centers Mapping complete -- Primary Aim and Strategic Objective defined (Step 2)"
  checkpoint_3: "Process Identification and Prioritization complete (Step 3)"
  checkpoint_4: "IQO Cycle applied to top processes (Step 4)"
  checkpoint_5: "Franchise Prototype validated against Six Rules (Step 5)"
  checkpoint_6: "Operations Manual Blueprint structured (Step 6)"
  checkpoint_7: "Synthesis, Verdict, and Handoff delivered (Step 7)"

resume_protocol:
  instruction: "When resuming a session, ask: 'Where did we leave off?' and review the last completed checkpoint. Summarize what was captured so far before proceeding to the next step."
  state_preservation: "Save all captured data in YAML format at each checkpoint for session continuity."
```

---

## Handoff

### After Operations Systemization

| Condition | Next Agent | Purpose |
|-----------|-----------|---------|
| Prototype VALIDATED, Brazilian market target | @marcelo-cherto | Format for Brazilian franchise law (COF, Lei de Franquias 13.966/2019) |
| Prototype VALIDATED, ready for franchise sales | @joe-mathews | Franchise sales strategy (KASH Model, Tipping Point) |
| Significant model changes during systemization | @mark-siebert | Re-evaluate franchisability with updated operational data |
| Franchisee relationship issues identified | @greg-nathan | Diagnose franchisor-franchisee dynamics (E-Factor, 6-Stage Model) |
| Franchisee performance issues despite good systems | @scott-greenberg | Franchisee mindset and leadership coaching (Wealthy Franchisee) |
| Prototype NOT READY, major work remaining | @michael-gerber (self) | Continue systemization in next session (resume from checkpoint) |

### Handoff Context Package

```yaml
handoff_package:
  report_file: "squads/franchise/data/{slug}-operations-systemization.yaml"
  key_deliverables:
    - "Three Personalities Assessment"
    - "Seven Centers Map (all 7 centers)"
    - "Prioritized Process Inventory"
    - "IQO-Treated Process Documentation (procedures, metrics, enforcement)"
    - "Franchise Prototype Validation (Six Rules scorecard)"
    - "Turn-Key Validation (Three Keys + 30-Day Test)"
    - "Operations Manual Blueprint (4 volumes, 12 chapters)"
    - "Remediation Roadmap (phased, prioritized)"
  critical_context_for_next_agent:
    - "Systemization verdict and confidence level"
    - "Owner-dependency status and remaining dependencies"
    - "Franchise Prototype Rules that are still PARTIAL or FAIL"
    - "Processes not yet treated with IQO Cycle"
    - "Operations Manual completion status and priority plan"
    - "Key veto conditions triggered or flagged"
  gerber_closing: |
    Remember: the system runs the business, the people run the system.
    What we have built here is the beginning of that system.

    Work ON your business, not IN it. That is the path forward.
```

---

**Task Status:** Ready for Production

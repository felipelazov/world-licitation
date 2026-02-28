# Task: Diagnose Franchise Relationship Health

**Task ID:** franchise/diagnose-relationship
**Version:** 1.0.0
**Execution Type:** Interactive (60% Human / 40% Agent)
**Duration:** 45-60 minutes
**Agent:** greg-nathan

---

## Purpose

Conduct a comprehensive diagnosis of the health of franchisor-franchisee relationships in a franchise network. Applies the E-Factor 6-Stage Model, ACE Franchisee Satisfaction Survey, Mood Monitor, and Three-Legged Stool framework to produce a Relationship Health Report with stage identification, quantified scores, and a prioritized action plan with specific interventions drawn from Nathan's 130+ strategies.

---

## Inputs

```yaml
required:
  network_name:
    field: "Franchise network name"
    format: "string"
    required: true

  network_size:
    field: "Number of active franchisees"
    format: "number"
    required: true

  network_age:
    field: "Average tenure of franchisees in the network (years)"
    format: "number"
    required: true

optional:
  recent_conflicts:
    field: "Description of recent franchisor-franchisee conflicts or complaints"
    format: "string"
    required: false

  satisfaction_data:
    field: "Any existing satisfaction survey results or NPS scores"
    format: "string"
    required: false

  advisory_council:
    field: "Whether a Franchise Advisory Council exists (yes/no/inactive)"
    format: "string"
    required: false

  recent_changes:
    field: "Any recent system-wide changes (fees, territory, branding, operations)"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Opening and Context Setting (3 min)

```
Greg Nathan here. Franchise Relationships Institute.

Over the next 45-60 minutes I'm going to help you
understand the true health of your franchise relationships
-- not just the surface, but the psychology underneath.

If we ignore the human dimension of franchising -- people's
feelings, motivations and behavior -- we ignore the heart
of the franchise relationship.

I'll ask you a series of questions across four areas:
the emotional stage of your franchisees, their satisfaction
levels, their current mood, and the structural balance of
your relationship. Then I'll give you a clear diagnosis
with specific actions.

Let's start. Tell me about [network_name].
```

### Step 2: E-Factor 6-Stage Diagnosis (12-15 min)

**Purpose:** Identify the dominant E-Factor stage(s) across the network using Nathan's 6-Stage Model (GLEE / FEE / ME / FREE / SEE / WE).

**Heuristic Applied:** GN001 -- BEFORE any intervention, determine the E-Factor stage.

Questions:

1. How long have the majority of your franchisees been in the system? What is the tenure distribution? (e.g., 0-1yr, 1-3yr, 3-5yr, 5+yr)
2. When you think about your franchisees as a group, what are their most common complaints right now?
3. Are franchisees questioning the value of royalty fees or the marketing fund? How frequently?
4. Do you see franchisees attributing their success primarily to their own effort and minimizing the system's contribution?
5. Are any franchisees actively testing the boundaries of the franchise agreement -- doing things their own way, ignoring standards?
6. Have any franchisees consulted outside lawyers or threatened legal action recently?
7. Do you have franchisees who mentor others, contribute to system improvement, and advocate for the brand externally?
8. If you announced a major system change tomorrow, how would the majority react?

**Agent Analysis (after answers):**

Map each answer to E-Factor stage indicators:

| Signal | Stage |
|--------|-------|
| High optimism, eagerness to learn, few complaints | GLEE |
| Questioning fees, comparing value vs cost | FEE |
| "I built this myself," minimizing system value | ME |
| Boundary testing, legal threats, declining attendance | FREE |
| Willingness to re-engage, seeing bigger picture | SEE |
| Mentoring, advocating, constructive partnership | WE |

Produce a **stage distribution estimate** for the network:

```
E-FACTOR STAGE DISTRIBUTION:
GLEE: __% | FEE: __% | ME: __% | FREE: __% | SEE: __% | WE: __%
Dominant Stage: ______
Risk Level: Low / Moderate / High / Critical
```

### Step 3: ACE Franchisee Satisfaction Assessment (10-12 min)

**Purpose:** Evaluate Advocacy, Commitment, and Engagement across the network, including the six sub-dimensions.

Questions -- Advocacy:

1. If a qualified person asked your franchisees whether they should buy your franchise, what percentage would say yes?
2. Do franchisees speak positively about the brand in public -- on social media, to customers, to other business owners?
3. Have any franchisees actively referred potential new franchisees in the past 12 months?

Questions -- Commitment:

4. What percentage of franchisees do you expect to renew their agreement when it expires?
5. Are franchisees willing to invest further in their units -- renovations, new equipment, expansion?
6. When the network goes through a difficult period, do franchisees stay engaged or withdraw?

Questions -- Engagement:

7. What is the attendance rate at your last national conference or training event?
8. When you launch a new marketing campaign or initiative, what percentage adopt it within the first 30 days?
9. Do franchisees proactively suggest improvements or share best practices with each other?

**Six Sub-Dimensions Deep Dive:**

10. How would you rate franchisee financial satisfaction -- are most profitable and comfortable? (1-10)
11. What about lifestyle and stress levels -- is the business enhancing or degrading their quality of life? (1-10)
12. How confident are franchisees in the franchisor leadership team and strategic direction? (1-10)
13. How much brand passion and pride do franchisees feel? (1-10)
14. How do franchisees rate the quality of the partnership -- fairness, transparency, mutual respect? (1-10)
15. How effective and responsive is the franchisor support team in franchisees' eyes? (1-10)

**Agent Scoring (after answers):**

```
ACE SATISFACTION SCORES:
Advocacy:   __/100
Commitment: __/100
Engagement: __/100
Overall ACE: __/100

SIX SUB-DIMENSIONS:
Financial outcomes:        __/10
Lifestyle & stress:        __/10
Confidence in leadership:  __/10
Brand passion:             __/10
Partnership quality:       __/10
Support effectiveness:     __/10

BENCHMARK:
Strong (>80%) | Healthy (65-80%) | At-Risk (50-65%) | Critical (<50%)
Network Status: ______
```

### Step 4: Mood Monitor Pulse (8-10 min)

**Purpose:** Quick assessment of the five Mood Monitor areas to identify emotional hot spots.

Questions per area:

**Area 1 -- Confidence in Leadership:**

1. Do franchisees trust the strategic direction you are taking the brand? What evidence do you have?
2. When leadership makes decisions, do franchisees generally feel those decisions are well-thought-out?

**Area 2 -- Moral and Practical Support:**

3. When a franchisee calls with a problem, how quickly do they get help? What quality of help?
4. Do franchisees feel the head office genuinely cares about their success, or do they feel like a revenue source?

**Area 3 -- Belonging and Involvement:**

5. Are franchisees involved in decisions that affect them -- new products, marketing direction, policy changes?
6. Do franchisees feel they are part of a community, or isolated operators?

**Area 4 -- Conflict Resolution:**

7. When disputes arise, what is the typical resolution path? How long does it take?
8. Are there unresolved conflicts festering in the network right now?

**Area 5 -- Achievement and Progress:**

9. Do franchisees feel they are growing -- personally, professionally, financially?
10. Is there a sense of forward momentum in the network, or stagnation?

**Agent Scoring (after answers):**

```
MOOD MONITOR RESULTS:
1. Confidence in Leadership:    __/10  [Green/Yellow/Red]
2. Moral & Practical Support:   __/10  [Green/Yellow/Red]
3. Belonging & Involvement:     __/10  [Green/Yellow/Red]
4. Conflict Resolution:         __/10  [Green/Yellow/Red]
5. Achievement & Progress:      __/10  [Green/Yellow/Red]
Overall Mood:                   __/10
```

Traffic Light:
- Green (7-10): Healthy -- maintain and monitor
- Yellow (4-6): At risk -- proactive intervention needed
- Red (1-3): Critical -- urgent intervention required

### Step 5: Three-Legged Stool Assessment (5-7 min)

**Purpose:** Evaluate the balance of Legal, Commercial, and Psychological dimensions of the franchise relationship.

**Heuristic Applied:** GN002 -- Check legal + commercial + psychological balance before recommending any action.

Questions:

**Legal Leg:**

1. How often does the franchisor team reference the franchise agreement when resolving issues with franchisees?
2. Is the franchise agreement perceived as a partnership document or a compliance weapon?

**Commercial Leg:**

3. Are the majority of franchisees profitable? Do they understand the ROI of franchise membership?
4. Have you conducted a Benefits Audit -- do franchisees know the quantified value of what the system provides?

**Psychological Leg:**

5. If you had to describe the trust level between franchisor and franchisees in one word, what would it be?
6. Do franchisees believe they are treated fairly? How do you know -- have you asked them formally?
7. Is there genuine mutual respect, or does one side feel superior to the other?

**Agent Assessment (after answers):**

```
THREE-LEGGED STOOL ASSESSMENT:
Legal:         __/10  [Strong/Adequate/Weak/Over-relied]
Commercial:    __/10  [Strong/Adequate/Weak/Neglected]
Psychological: __/10  [Strong/Adequate/Weak/Broken]

Balance: Balanced / Tilted toward Legal / Tilted toward Commercial / Psychological Deficit
Critical Finding: "______"
```

Nathan's insight: "The psychological contract is unwritten, unspoken, and often unconscious -- but it drives more behavior than the franchise agreement ever will."

### Step 6: Red Flag Scan (3-5 min)

**Purpose:** Cross-reference all gathered data against Nathan's 13 warning conditions (RF-01 through RF-13).

**Agent performs automatically based on Steps 2-5. No additional questions unless clarification needed.**

Scan checklist:

```yaml
red_flag_scan:
  franchisee_side:
    - RF-01: "All success attributed to self, zero system recognition"
    - RF-02: "Consulting outside lawyers without prior dialogue"
    - RF-03: "Declining attendance at network events"
    - RF-04: "Agreement violations increasing across network"
    - RF-05: "Actively discouraging others from joining"

  franchisor_side:
    - RF-06: "'The agreement says...' as default response"
    - RF-07: "Failure to demonstrate ROI of membership"
    - RF-08: "Top-down only communication, no listening channels"
    - RF-09: "Field visits perceived as policing, not supporting"
    - RF-10: "No formal satisfaction measurement in place"

  system_level:
    - RF-11: "Declining ACE scores across consecutive measurements"
    - RF-12: "Multiple franchisees stuck in FREE stage simultaneously"
    - RF-13: "Legal action as primary conflict resolution mechanism"
```

Output:

```
RED FLAGS DETECTED:
[RF-XX] ______ — Severity: CRITICAL/HIGH/MEDIUM
[RF-XX] ______ — Severity: CRITICAL/HIGH/MEDIUM
...
Total Red Flags: __ (Critical: __ | High: __ | Medium: __)
```

### Step 7: Diagnosis Synthesis and Action Plan (5-8 min)

**Purpose:** Synthesize all findings into a Relationship Health Report with specific interventions from Nathan's 130+ strategies.

**Agent generates the complete report. Presents to the user for validation.**

```
FRANCHISE RELATIONSHIP HEALTH REPORT
=====================================
Network: [network_name]
Date: [date]
Franchisees: [network_size]
Avg Tenure: [network_age] years
Diagnosed by: Greg Nathan Framework (E-Factor / ACE / Mood Monitor / Three-Legged Stool)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. E-FACTOR STAGE DISTRIBUTION
GLEE: __% | FEE: __% | ME: __% | FREE: __% | SEE: __% | WE: __%
Dominant Stage: ______
Relationship Risk Level: ______

2. ACE SATISFACTION SCORES
Advocacy: __/100 | Commitment: __/100 | Engagement: __/100
Overall: __/100 — Benchmark: ______

3. MOOD MONITOR
Leadership: __/10 | Support: __/10 | Belonging: __/10
Conflict: __/10 | Achievement: __/10
Overall Mood: __/10

4. THREE-LEGGED STOOL
Legal: __/10 | Commercial: __/10 | Psychological: __/10
Balance: ______

5. RED FLAGS: __ detected (__ Critical, __ High, __ Medium)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERALL RELATIONSHIP HEALTH: [Healthy / At-Risk / Critical / Emergency]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACTION PLAN

IMMEDIATE (First 30 Days):
1. [Strategy from Nathan's toolkit] — Addresses [finding]
   Category: [A-H] | Priority: Critical
   Expected Impact: ______

2. [Strategy from Nathan's toolkit] — Addresses [finding]
   Category: [A-H] | Priority: High
   Expected Impact: ______

3. [Strategy from Nathan's toolkit] — Addresses [finding]
   Category: [A-H] | Priority: High
   Expected Impact: ______

MEDIUM-TERM (60-90 Days):
4. [Strategy from Nathan's toolkit] — Addresses [finding]
   Category: [A-H] | Priority: Medium
   Expected Impact: ______

5. [Strategy from Nathan's toolkit] — Addresses [finding]
   Category: [A-H] | Priority: Medium
   Expected Impact: ______

LONG-TERM (6-12 Months):
6. [Strategy from Nathan's toolkit] — Addresses [finding]
   Category: [A-H] | Priority: Standard
   Expected Impact: ______

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONFLICT RESOLUTION RECOMMENDATIONS:
- [Specific resolution strategy for each active conflict]
- [De-escalation protocol where applicable]
- [Commercial vs legal pathway recommendation]
Heuristic: GN008 — Seek commercial resolution before legal escalation

STAGE TRANSITION STRATEGIES:
- [For each dominant stage, specific strategies to move franchisees toward WE]
- [Timeline and milestones for stage progression]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS:
1. [Immediate next action with owner and deadline]
2. [Follow-up measurement recommendation — ACE Survey or Mood Monitor]
3. [Handoff to other agents if applicable]

Remember: The best strategy in the world won't work if
people don't want it to. Fix the relationship first.
Everything else follows.
```

---

## Output

```yaml
file: "squads/franchise/data/{slug}-relationship-health.yaml"
format: "yaml"
content:
  relationship_health_report:
    network: "{network_name}"
    date: "{date}"
    network_size: {number}
    avg_tenure_years: {number}
    diagnosed_by: "greg-nathan (E-Factor / ACE / Mood Monitor / Three-Legged Stool)"

    e_factor:
      distribution:
        glee_pct: {number}
        fee_pct: {number}
        me_pct: {number}
        free_pct: {number}
        see_pct: {number}
        we_pct: {number}
      dominant_stage: "{stage}"
      risk_level: "{Low/Moderate/High/Critical}"

    ace_scores:
      advocacy: {number}
      commitment: {number}
      engagement: {number}
      overall: {number}
      benchmark: "{Strong/Healthy/At-Risk/Critical}"
      sub_dimensions:
        financial_outcomes: {1-10}
        lifestyle_stress: {1-10}
        confidence_leadership: {1-10}
        brand_passion: {1-10}
        partnership_quality: {1-10}
        support_effectiveness: {1-10}

    mood_monitor:
      confidence_in_leadership: {1-10}
      moral_practical_support: {1-10}
      belonging_involvement: {1-10}
      conflict_resolution: {1-10}
      achievement_progress: {1-10}
      overall_mood: {1-10}

    three_legged_stool:
      legal: {1-10}
      commercial: {1-10}
      psychological: {1-10}
      balance: "{Balanced/Tilted Legal/Tilted Commercial/Psychological Deficit}"

    red_flags:
      total: {number}
      critical: {number}
      high: {number}
      medium: {number}
      details:
        - id: "RF-XX"
          description: "{description}"
          severity: "{CRITICAL/HIGH/MEDIUM}"
        # ...

    overall_health: "{Healthy/At-Risk/Critical/Emergency}"

    action_plan:
      immediate_30_days:
        - action: "{description}"
          strategy_category: "{A-H}"
          priority: "{Critical/High}"
          addresses: "{finding}"
          expected_impact: "{description}"
        # ...
      medium_term_60_90_days:
        - action: "{description}"
          strategy_category: "{A-H}"
          priority: "{Medium}"
          addresses: "{finding}"
          expected_impact: "{description}"
        # ...
      long_term_6_12_months:
        - action: "{description}"
          strategy_category: "{A-H}"
          priority: "{Standard}"
          addresses: "{finding}"
          expected_impact: "{description}"
        # ...

    conflict_resolution:
      active_conflicts:
        - conflict: "{description}"
          recommended_approach: "{description}"
          pathway: "{Commercial/Mediation/Legal (last resort)}"
          heuristic: "GN008"
        # ...

    stage_transition_plan:
      - from_stage: "{current stage}"
        to_stage: "{target stage}"
        strategies: ["{strategy 1}", "{strategy 2}"]
        timeline: "{estimated timeline}"
        milestones: ["{milestone 1}", "{milestone 2}"]

    handoffs:
      - agent: "{agent-id}"
        reason: "{description}"
        context: "{what to pass}"
      # ... (if applicable)

    next_measurement:
      type: "{ACE Survey/Mood Monitor}"
      recommended_date: "{date}"
      frequency: "{quarterly/semi-annual/annual}"
```

---

## Quality Gate: QG-FRN-001

- [ ] E-Factor stage distribution identified for the network with dominant stage determined
- [ ] ACE scores calculated across all three dimensions (Advocacy, Commitment, Engagement)
- [ ] All six ACE sub-dimensions rated (1-10)
- [ ] Mood Monitor assessed across all 5 areas with traffic light status
- [ ] Three-Legged Stool balance evaluated (Legal, Commercial, Psychological)
- [ ] Red flag scan completed against all 13 warning conditions (RF-01 through RF-13)
- [ ] Minimum 3 immediate actions prescribed with strategy category and priority
- [ ] Conflict resolution recommendations included for any active conflicts
- [ ] Stage transition strategies defined for dominant stage(s)
- [ ] Next measurement date and frequency recommended
- [ ] Overall relationship health verdict issued (Healthy / At-Risk / Critical / Emergency)

---

## Veto Conditions

- If the user cannot describe ANY franchisee complaints or behaviors -> Insufficient data for stage diagnosis. Request direct franchisee input or field observation before proceeding. Do not guess stages.
- If the network has fewer than 3 franchisees -> E-Factor distribution is not statistically meaningful. Conduct individual diagnosis instead of network diagnosis. Adjust output accordingly.
- If ALL red flags detected are CRITICAL (3+ critical flags) -> HALT action plan generation. Issue EMERGENCY status. Recommend immediate professional mediation and/or in-person intervention before any strategic planning.
- If the user responds to conflict questions with "legal will handle it" or "the agreement says" as the primary approach -> Apply GN008 immediately. Warn that legal-first approach is destroying relationships. Do not proceed to action plan until the user acknowledges the need for commercial-first resolution.
- If the user dismisses franchisee emotions ("they're just being difficult," "they should be grateful") -> Apply GN009 (fight-flight awareness). Educate on psychological contract before proceeding. Diagnosis without franchisor empathy produces action plans that will not be executed.
- If no formal satisfaction measurement exists in the network (RF-10 confirmed) -> Flag as a prerequisite. The first action in the plan MUST be implementing ACE Survey or Mood Monitor. No other interventions can be accurately prioritized without baseline data.
- If user indicates legal action is already underway between franchisor and franchisee(s) -> Do not attempt to override legal process. Note limitation. Focus diagnosis on the rest of the network. Recommend handoff to @marcelo-cherto for legal matters.

---

## Heuristics Applied

This task applies the following Greg Nathan decision heuristics throughout execution:

| Heuristic | Applied In | Purpose |
|-----------|-----------|---------|
| GN001 | Step 2 | Stage diagnosis FIRST, before any intervention |
| GN002 | Step 5 | Three-Legged Stool balance check |
| GN003 | Step 5 (Q6) | Process fairness -- "be seen to be fair" |
| GN004 | Step 3 (Commitment) | Trust before commitment assessment |
| GN005 | Step 7 (Action Plan) | 19% rule -- focus on the movable middle |
| GN006 | Step 3 (Sub-dimensions) | Optimism as ACE driver |
| GN007 | Step 7 (Action Plan) | Strategy without people buy-in will fail |
| GN008 | Step 6, Step 7 | Commercial before legal resolution |
| GN009 | Veto Conditions | Fight-flight awareness in distressed networks |
| GN010 | Step 7 (ME/FREE stages) | Benefits Audit trigger for value questioning |

---

## Handoff Triggers

During diagnosis, the following conditions trigger handoff recommendations in the report:

| Condition | Handoff To | Context Passed |
|-----------|-----------|----------------|
| Individual franchisee underperformance (not relationship) | @scott-greenberg | E-Factor stage, relationship context, performance gaps |
| Legal/regulatory dispute requires specialist | @marcelo-cherto | Conflict history, attempted resolutions, relationship context |
| Marketing fund governance is the conflict source | @denis-santini | Franchisee concerns, fund structure, transparency gaps |
| Structural system design flaws driving relationship problems | @mark-siebert | ACE scores, structural complaints, relationship health data |
| Operations systems are root cause of franchisee frustration | @michael-gerber | Specific operational gaps, franchisee feedback |

---

## Strategy Categories Reference

The action plan draws interventions from Nathan's 130+ strategies organized in these categories:

| Category | Name | When Applied |
|----------|------|-------------|
| A | Transition Strategies | Stage-specific movement through E-Factor cycle |
| B | Communication Strategies | 10 Ways framework for network dialogue |
| C | Field Visit Strategies | 101 Tips / Six-Step Process / Eight Functions |
| D | Benefits Audit Strategies | Restoring value perception (ME/FREE stages) |
| E | Change Management | FRANCHISE Change Model (9 Principles) |
| F | Conflict Resolution | Psychological de-escalation, commercial-first |
| G | Satisfaction & Engagement | ACE Survey, Mood Monitor, Advisory Councils |
| H | Recruitment & Selection | Nathan Profiler / FranchiseLab |

---

**Task Status:** Ready for Production

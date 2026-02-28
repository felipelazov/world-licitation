# Task: Evaluate Franchisability (12 Criteria Assessment)

**Task ID:** franchise/evaluate-franchisability
**Version:** 1.0.0
**Execution Type:** Interactive (70% Human / 30% Agent)
**Duration:** 45-60 minutes
**Agent:** mark-siebert

---

## Purpose

Conduct a comprehensive franchisability evaluation of a business using Mark Siebert's 12 Criteria of Franchisability and the Multiplier Model. The output is a YAML-structured Franchisability Scorecard with a definitive verdict: GO, NO-GO, or CONDITIONAL -- backed by scored criteria, identified veto conditions, anti-pattern audit, and quality control readiness assessment.

This is the FIRST task in any franchise development pipeline. Nothing proceeds until this assessment delivers a verdict.

---

## Inputs

```yaml
required:
  business_name:
    field: "Name of the business / brand"
    format: "string"
    required: true

  business_description:
    field: "Brief description of products/services"
    format: "string"
    required: true

  operating_locations:
    field: "Number of operating locations and time in operation"
    format: "string"
    required: true

  annual_unit_revenue:
    field: "Average annual revenue per unit/location"
    format: "currency"
    required: true

  net_margin:
    field: "Net profit margin percentage"
    format: "percentage"
    required: true

optional:
  total_investment_estimate:
    field: "Estimated total investment to open one unit"
    format: "currency"
    required: false

  available_capital:
    field: "Capital available for franchise program development"
    format: "currency"
    required: false

  target_market:
    field: "Primary geographic target for expansion"
    format: "string"
    required: false

  end_goal:
    field: "Owner's exit strategy (sale, legacy, income stream, scale)"
    format: "string"
    required: false

  team_size:
    field: "Number of people on the management team"
    format: "integer"
    required: false
```

---

## Steps

### Step 1: Context Setting (3 min)

```
Mark Siebert here. iFranchise Group. 40 years, 500+ franchise
clients across virtually every industry.

Before we get into the assessment, let me be direct: just because
a business CAN be franchised does not mean it SHOULD be franchised.
My job in the next 45-60 minutes is to figure out which one applies
to [business_name].

I'm going to walk you through 12 specific criteria -- each scored
1 to 5. The math will tell us whether this business has franchise
potential, needs remediation, or should explore alternative growth
models.

Start with the end in mind: what's your goal with this business?
Scale? Sale? Legacy? Income stream? That answer drives everything.

Let's begin.
```

---

### Step 2: Criterion 1 -- Credibility (3 min)

**Question:** How long has the business been operating? How many locations are profitable? What is the brand's track record and reputation?

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | No operating history, concept only |
| 2 | Less than 12 months, single unproven location |
| 3 | 1 location, 12+ months, profitable but limited track record |
| 4 | 2-3 locations, 2+ years, consistent profitability |
| 5 | Multiple locations, 3+ years, strong brand recognition |

**Veto Check:** Score of 1 triggers VT-06 (no prototype). HALT assessment if no profitable unit exists.

**Red Flag:** "No proven location, startup concept only."

---

### Step 3: Criterion 2 -- Differentiation (4 min)

**Question:** What makes this business unique? Why would a franchisee choose THIS concept over competitors? What is the defensible competitive advantage?

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | No meaningful differentiation -- pure "me too" concept |
| 2 | Minor cosmetic differences only |
| 3 | Some differentiation but not strongly defensible |
| 4 | Clear competitive advantage with some defensibility |
| 5 | Proprietary systems, strong brand, highly defensible moat |

**Veto Check:** Score of 1 triggers VT-01 (no differentiation). HALT -- a "me too" approach to franchising is rarely successful.

**Anti-Pattern Alert:** Mistake #2 (Me Too) -- If the owner cannot articulate the unique value proposition in 30 seconds, this is a red flag.

---

### Step 4: Criterion 3 -- Transferability of Knowledge (4 min)

**Question:** Can you teach the entire business operation to someone with no industry experience? How long would training take? Does the business depend on the founder's personal skill or relationships?

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | Requires years of specialized expertise, founder-dependent |
| 2 | 6+ months training required, significant skill dependency |
| 3 | 3-6 months training, some specialized knowledge needed |
| 4 | 1-3 months training, well-structured curriculum possible |
| 5 | Under 1 month, fully systematized and teachable |

**Veto Check:** Score of 1-2 triggers VT-04 (cannot be taught in reasonable timeframe).

**Heuristic h2:** IF business cannot be taught in < 3 months, target experienced operators OR simplify operations.

---

### Step 5: Criterion 4 -- Adaptability (3 min)

**Question:** Can this concept work in different geographic markets? Does it depend on a specific demographic, climate, or local condition?

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | Only works in one specific city or demographic |
| 2 | Limited to a specific region or climate |
| 3 | Works in similar markets with some adaptation |
| 4 | Broad geographic appeal with minor adjustments |
| 5 | Universal appeal, works in virtually any market |

**Red Flag:** "Only works in one city or demographic."

---

### Step 6: Criterion 5 -- Refined Prototype (4 min)

**Question:** Has the operating model been tested, refined, and optimized? Are you still experimenting with the product/service mix, pricing, or operations? How many iterations has the model gone through?

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | Concept stage, no operating model tested |
| 2 | Operating but still experimenting significantly |
| 3 | Stable model in 1 location, minor refinements ongoing |
| 4 | Proven model in 2+ locations, well-optimized |
| 5 | Battle-tested model across multiple locations and conditions |

**Veto Check:** Score of 1 triggers VT-06 (no prototype). You cannot replicate what has not been proven to work.

**Heuristic h8:** IF no profitable prototype exists, DO NOT franchise.

---

### Step 7: Criterion 6 -- Documented Systems (3 min)

**Question:** Are your operations documented in a comprehensive manual? Are there written procedures for every critical process? Or does everything live in the owner's head?

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | Nothing documented, everything in owner's head |
| 2 | Some informal notes or checklists exist |
| 3 | Partial documentation, key processes covered |
| 4 | Comprehensive manual, most processes documented |
| 5 | Complete operations manual with training materials, SOPs, checklists |

**Note:** A score of 1-2 is not an automatic veto but requires significant remediation before franchising. This is where @michael-gerber takes over post-assessment.

---

### Step 8: Criterion 7 -- Affordability (3 min)

**Question:** What is the total estimated investment to open a new unit? Can your target franchisee profile realistically afford this? Is financing available for this type of business?

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | Investment eliminates virtually all qualified candidates |
| 2 | Very limited pool of candidates can afford it |
| 3 | Moderate investment, typical for the industry |
| 4 | Accessible to a broad pool of qualified candidates |
| 5 | Low barrier to entry, large pool of potential franchisees |

**Red Flag:** "Investment so high it eliminates most qualified candidates."

---

### Step 9: Criterion 8 -- Return on Investment (5 min)

**This is the acid test.**

**Question:** What is the projected franchisee ROI after royalties and all fees? Walk me through the unit economics: revenue, costs, profit, then subtract estimated royalty.

**Calculation:**
```
Unit Revenue:          $________
Net Margin:            ________%
Net Profit:            $________
Estimated Royalty (5-7%): $________
Post-Royalty Profit:   $________
Total Investment:      $________
Franchisee ROI:        ________%
```

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | ROI below 10% after royalties -- not viable |
| 2 | ROI 10-14% -- marginal, risky for franchisees |
| 3 | ROI 15-19% -- minimum viable, owner-operator only |
| 4 | ROI 20-29% -- solid, attractive to quality candidates |
| 5 | ROI 30%+ -- excellent, highly compelling investment |

**Veto Check:** Score of 1-2 triggers VT-02 (insufficient franchisee ROI). The real acid test is really return on investment. Below 15%, franchisees cannot sustain the business.

**Heuristic h1:** IF franchisee ROI < 15% after royalties, DO NOT franchise. Improve unit economics, reduce costs, or lower royalty rate before proceeding.

---

### Step 10: Criterion 9 -- Market Trends (3 min)

**Question:** Is the market for this business growing, stable, or declining? Is this a trend or a fad? What do the next 5-10 years look like for this industry?

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | Declining market or fad-dependent business |
| 2 | Stagnant market with negative outlook |
| 3 | Stable market, flat growth expected |
| 4 | Growing market, positive 5-year outlook |
| 5 | High-growth market, strong long-term secular trends |

**Veto Check:** Score of 1 triggers VT-10 (declining market). Franchising amplifies market exposure -- declining markets destroy franchise systems faster than independent operators.

**Heuristic h10:** IF market is in secular decline, DO NOT franchise.

---

### Step 11: Criterion 10 -- Capital (3 min)

**Question:** How much capital do you have available to invest in franchise program development? This is NOT the franchisee investment -- this is what YOU as the franchisor need to spend on FDD, operations manual, training program, initial marketing, and support infrastructure.

**Benchmarks:**
- FDD preparation: $15K-$40K (franchise attorney)
- Operations manual: $10K-$30K
- Training program: $10K-$20K
- Initial franchise marketing: $20K-$50K
- Minimum viable total: $50K
- Recommended: $100K-$250K+

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | Less than $25K available |
| 2 | $25K-$49K available |
| 3 | $50K-$99K available (minimum viable) |
| 4 | $100K-$199K available (solid foundation) |
| 5 | $200K+ available (well-capitalized) |

**Veto Check:** Score of 1-2 triggers VT-05 (inadequate capital).

**Heuristic h3:** IF franchisor lacks $50K minimum capital, delay franchising.

**Anti-Pattern Alert:** Mistake #4 (Failure to Budget) -- Underestimating the cost of launching a franchise program is the fourth most costly mistake.

---

### Step 12: Criterion 11 -- Commitment to Relationships (3 min)

**Question:** How do you view the franchisor-franchisee relationship? Are you committed to franchisee success as a long-term partnership? Are you willing to invest in ongoing support, training, and communication?

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | Views franchisees purely as revenue sources |
| 2 | Limited commitment, transactional mindset |
| 3 | Willing to support but unclear on what that means |
| 4 | Strong commitment to franchisee success with concrete plans |
| 5 | Franchisee success is the stated #1 priority, with infrastructure to back it |

**Anti-Pattern Alert:** Mistake #6 (Wrong Focus) -- Focusing on franchise sales instead of franchisee success.

**Key Principle:** Make your franchisees successful and you will succeed as a franchisor.

---

### Step 13: Criterion 12 -- Strength of Management (3 min)

**Question:** Who besides you can run the business today? Do you have a management team, or is the business entirely dependent on you? What happens if you're unavailable for 30 days?

**Scoring Guide:**

| Score | Description |
|-------|-------------|
| 1 | Solo founder, business stops without them |
| 2 | 1-2 helpers, but all decisions require the founder |
| 3 | Small team with some autonomy, founder still critical |
| 4 | Capable management team, founder can step back partially |
| 5 | Strong management infrastructure, business runs independently |

**Veto Check:** Score of 1 triggers VT-03 (business depends entirely on one person).

**Heuristic h9:** IF business depends entirely on one person, RESTRUCTURE before franchising. A franchise system cannot scale on the back of a single individual.

---

### Step 14: Six Costly Mistakes Audit (5 min)

Review the business against Siebert's Six Costly Franchisor Mistakes as anti-patterns:

```yaml
mistakes_audit:
  1_ready_fire_aim:
    question: "Is the owner trying to rush to franchise without adequate preparation?"
    red_flags:
      - "I want to franchise fast"
      - "We'll figure it out as we go"
      - "Let's start selling franchises next month"
    detected: true/false
    notes: ""

  2_me_too:
    question: "Is this a copycat concept with no meaningful differentiation?"
    red_flags:
      - "Everyone is doing it, we should too"
      - Cannot articulate unique value in 30 seconds
    detected: true/false
    notes: ""

  3_do_it_wrong_yourself:
    question: "Is the owner planning to DIY the franchise infrastructure?"
    red_flags:
      - "My friend/cousin can do the FDD"
      - "We don't need consultants"
      - "I'll write the manual myself"
    detected: true/false
    notes: ""

  4_failure_to_budget:
    question: "Has the owner underestimated the cost of franchise development?"
    red_flags:
      - "We don't need to spend much"
      - Total budget under $50K
      - No budget for franchise attorney
    detected: true/false
    notes: ""

  5_cant_say_no:
    question: "Would the owner sell to anyone willing to pay?"
    red_flags:
      - "We'll sell to anyone who wants in"
      - No franchisee qualification criteria in mind
    detected: true/false
    notes: ""

  6_wrong_focus:
    question: "Is the owner focused on selling units rather than supporting franchisees?"
    red_flags:
      - "Just sell units, the rest will work out"
      - Sales targets but no support plan
    detected: true/false
    notes: ""
```

**If 2+ mistakes detected:** Issue formal warning. These are the most expensive mistakes in franchising and they happen BEFORE the first unit is sold.

---

### Step 15: Multiplier Model Viability Check (3 min)

Assess the business against the 6-Step Multiplier Model cycle:

| Step | Question | Status |
|------|----------|--------|
| 1. BUILD | Is there a profitable Money Machine (unit)? | YES / NO / PARTIAL |
| 2. SYSTEMIZE | Are operations documented and teachable? | YES / NO / PARTIAL |
| 3. MEASURE | Are KPIs and unit economics tracked? | YES / NO / PARTIAL |
| 4. HARVEST | Can royalties be sustained without killing franchisee ROI? | YES / NO / PARTIAL |
| 5. REINVEST | Is there a plan to reinvest in system growth and support? | YES / NO / PARTIAL |
| 6. REPEAT | Is the model duplicable across multiple units/markets? | YES / NO / PARTIAL |

**Minimum for GO:** Steps 1, 4, and 6 must be YES. Steps 2, 3, and 5 can be PARTIAL with remediation plan.

---

### Step 16: Four Pillars of Quality Control Validation (3 min)

Assess readiness against the Four Pillars:

```yaml
quality_control_readiness:
  pillar_1_franchisee_selection:
    status: "Ready / Needs Work / Not Started"
    checklist:
      - defined_ideal_franchisee_profile: true/false
      - multi_step_qualification_process: true/false
      - financial_operational_cultural_fit_assessment: true/false
      - willingness_to_reject_unqualified: true/false

  pillar_2_documented_systems_and_training:
    status: "Ready / Needs Work / Not Started"
    checklist:
      - operations_manual_exists: true/false
      - initial_training_program_designed: true/false
      - ongoing_training_curriculum: true/false
      - performance_benchmarks_defined: true/false

  pillar_3_ongoing_support:
    status: "Ready / Needs Work / Not Started"
    checklist:
      - field_support_plan: true/false
      - help_desk_or_support_line: true/false
      - marketing_support_and_coop: true/false
      - technology_and_systems_updates: true/false
      - peer_networking_plan: true/false

  pillar_4_legal_compliance_and_enforcement:
    status: "Ready / Needs Work / Not Started"
    checklist:
      - fdd_prepared_or_planned: true/false
      - trademark_registered: true/false
      - brand_standards_defined: true/false
      - audit_and_compliance_plan: true/false
```

**Note:** Most businesses will NOT have all pillars ready at assessment time. This section identifies the gaps that need to be built during Phase 3 (Program Development). What matters is the owner's awareness and willingness to invest in building them.

---

### Step 17: Scoring and Verdict (5 min)

**Compile the Franchisability Scorecard:**

```
12 CRITERIA SCORECARD
=====================

| #  | Criterion                  | Score (1-5) | Weight   | Veto? | Notes |
|----|----------------------------|-------------|----------|-------|-------|
| 1  | Credibility                | __          | HIGH     | *     |       |
| 2  | Differentiation            | __          | CRITICAL | *     |       |
| 3  | Transferability            | __          | CRITICAL | *     |       |
| 4  | Adaptability               | __          | MEDIUM   |       |       |
| 5  | Refined Prototype          | __          | HIGH     | *     |       |
| 6  | Documented Systems         | __          | HIGH     |       |       |
| 7  | Affordability              | __          | MEDIUM   |       |       |
| 8  | ROI                        | __          | CRITICAL | *     |       |
| 9  | Market Trends              | __          | MEDIUM   |       |       |
| 10 | Capital                    | __          | HIGH     | *     |       |
| 11 | Commitment to Relationships| __          | HIGH     |       |       |
| 12 | Strength of Management     | __          | HIGH     | *     |       |
|    |                            |             |          |       |       |
|    | TOTAL                      | __/60       |          |       |       |
```

**Verdict Decision Matrix:**

| Total Score | Veto Conditions | Verdict |
|-------------|-----------------|---------|
| 45-60       | None            | **GO** -- Strong candidate for franchising |
| 36-44       | None            | **CONDITIONAL** -- Proceed with remediation plan |
| 30-44       | 1+ triggered    | **CONDITIONAL** -- Address veto conditions first, then reassess |
| 30-35       | None            | **CONDITIONAL** -- Significant remediation needed |
| Below 30    | Any             | **NO-GO** -- Do NOT franchise at this time |
| Any score   | 2+ CRITICAL vetos | **NO-GO** -- Fundamental viability issues |

**Present the verdict with:**
1. Total score and breakdown
2. Veto conditions triggered (if any)
3. Six Costly Mistakes detected (if any)
4. Multiplier Model viability status
5. Four Pillars readiness summary
6. Specific remediation items (for CONDITIONAL)
7. Alternative growth models to consider (for NO-GO)
8. Recommended next agent handoff (for GO/CONDITIONAL)

---

## Output

```yaml
file: "squads/franchise/data/{slug}-franchisability-scorecard.yaml"
format: "yaml"
content:
  franchisability_scorecard:
    metadata:
      business_name: "{business_name}"
      assessment_date: "{date}"
      agent: "mark-siebert"
      task: "franchise/evaluate-franchisability"
      version: "1.0.0"

    business_profile:
      description: "{business_description}"
      operating_locations: "{count}"
      years_in_operation: "{years}"
      annual_unit_revenue: "${amount}"
      net_margin: "{percentage}%"
      estimated_total_investment: "${amount}"
      available_capital: "${amount}"
      end_goal: "{goal}"
      team_size: "{count}"

    criteria_scores:
      - id: 1
        criterion: "Credibility"
        score: {1-5}
        weight: "HIGH"
        veto_capable: true
        veto_triggered: false
        notes: "{assessment notes}"
      - id: 2
        criterion: "Differentiation"
        score: {1-5}
        weight: "CRITICAL"
        veto_capable: true
        veto_triggered: false
        notes: "{assessment notes}"
      - id: 3
        criterion: "Transferability of Knowledge"
        score: {1-5}
        weight: "CRITICAL"
        veto_capable: true
        veto_triggered: false
        notes: "{assessment notes}"
      - id: 4
        criterion: "Adaptability"
        score: {1-5}
        weight: "MEDIUM"
        veto_capable: false
        veto_triggered: false
        notes: "{assessment notes}"
      - id: 5
        criterion: "Refined Prototype"
        score: {1-5}
        weight: "HIGH"
        veto_capable: true
        veto_triggered: false
        notes: "{assessment notes}"
      - id: 6
        criterion: "Documented Systems"
        score: {1-5}
        weight: "HIGH"
        veto_capable: false
        veto_triggered: false
        notes: "{assessment notes}"
      - id: 7
        criterion: "Affordability"
        score: {1-5}
        weight: "MEDIUM"
        veto_capable: false
        veto_triggered: false
        notes: "{assessment notes}"
      - id: 8
        criterion: "ROI"
        score: {1-5}
        weight: "CRITICAL"
        veto_capable: true
        veto_triggered: false
        notes: "{assessment notes}"
        roi_calculation:
          unit_revenue: "${amount}"
          net_margin: "{percentage}%"
          net_profit: "${amount}"
          estimated_royalty_rate: "{percentage}%"
          royalty_amount: "${amount}"
          post_royalty_profit: "${amount}"
          total_investment: "${amount}"
          franchisee_roi: "{percentage}%"
      - id: 9
        criterion: "Market Trends"
        score: {1-5}
        weight: "MEDIUM"
        veto_capable: false
        veto_triggered: false
        notes: "{assessment notes}"
      - id: 10
        criterion: "Capital"
        score: {1-5}
        weight: "HIGH"
        veto_capable: true
        veto_triggered: false
        notes: "{assessment notes}"
      - id: 11
        criterion: "Commitment to Relationships"
        score: {1-5}
        weight: "HIGH"
        veto_capable: false
        veto_triggered: false
        notes: "{assessment notes}"
      - id: 12
        criterion: "Strength of Management"
        score: {1-5}
        weight: "HIGH"
        veto_capable: true
        veto_triggered: false
        notes: "{assessment notes}"

    scoring_summary:
      total_score: "{sum}/60"
      veto_conditions_triggered: []  # list of VT-XX codes
      critical_vetos_count: 0
      criteria_passed: 0  # score >= 3
      criteria_failed: 0  # score <= 2

    six_costly_mistakes_audit:
      mistakes_detected: 0
      details:
        - id: 1
          name: "Ready-Fire-Aim"
          detected: false
          notes: ""
        - id: 2
          name: "Me Too"
          detected: false
          notes: ""
        - id: 3
          name: "Do-It-Wrong-Yourself"
          detected: false
          notes: ""
        - id: 4
          name: "Failure to Budget"
          detected: false
          notes: ""
        - id: 5
          name: "Can't Say No"
          detected: false
          notes: ""
        - id: 6
          name: "Wrong Focus"
          detected: false
          notes: ""

    multiplier_model_viability:
      step_1_build: "YES / NO / PARTIAL"
      step_2_systemize: "YES / NO / PARTIAL"
      step_3_measure: "YES / NO / PARTIAL"
      step_4_harvest: "YES / NO / PARTIAL"
      step_5_reinvest: "YES / NO / PARTIAL"
      step_6_repeat: "YES / NO / PARTIAL"
      viable: true/false

    quality_control_readiness:
      pillar_1_franchisee_selection: "Ready / Needs Work / Not Started"
      pillar_2_documented_systems_and_training: "Ready / Needs Work / Not Started"
      pillar_3_ongoing_support: "Ready / Needs Work / Not Started"
      pillar_4_legal_compliance_and_enforcement: "Ready / Needs Work / Not Started"
      overall_readiness: "Ready / Needs Work / Not Started"

    verdict:
      decision: "GO / NO-GO / CONDITIONAL"
      total_score: "{sum}/60"
      confidence: "HIGH / MEDIUM / LOW"
      summary: "{1-2 sentence verdict rationale}"
      veto_conditions: []
      remediation_items: []
      alternatives_considered: []  # for NO-GO: licensing, company-owned, etc.

    recommended_next_steps:
      - step: 1
        action: "{description}"
        agent: "{agent or external professional}"
        priority: "IMMEDIATE / SHORT-TERM / MEDIUM-TERM"
      # ...

    handoff:
      next_agent: "@michael-gerber / @marcelo-cherto / none"
      trigger: "GO or CONDITIONAL assessment"
      context_passed: "{key findings, gaps, priority areas}"
```

---

## Quality Gate: QG-FRAN-001

- [ ] All 12 criteria scored individually (1-5) with notes
- [ ] ROI calculation completed with specific numbers
- [ ] All veto conditions explicitly checked and documented
- [ ] Six Costly Mistakes audit completed (all 6 checked)
- [ ] Multiplier Model viability assessed (all 6 steps)
- [ ] Four Pillars of Quality Control readiness evaluated
- [ ] Total score calculated correctly (sum of 12 criteria)
- [ ] Verdict matches the Decision Matrix rules
- [ ] Remediation items listed for CONDITIONAL verdicts
- [ ] Alternative growth models presented for NO-GO verdicts
- [ ] Next agent handoff identified for GO/CONDITIONAL verdicts
- [ ] YAML scorecard file generated with all fields populated

---

## Veto Conditions

```yaml
veto_conditions:
  hard_veto:  # Assessment MUST stop or result in NO-GO
    - condition: "Total score below 30/60"
      action: "Verdict = NO-GO. Do NOT franchise at this time."

    - condition: "2 or more CRITICAL veto criteria triggered (Criteria 2, 3, 8)"
      action: "Verdict = NO-GO. Fundamental viability issues."

    - condition: "No profitable prototype exists (Criterion 5 = 1)"
      action: "Verdict = NO-GO. Cannot replicate unproven model."

    - condition: "Franchisee ROI below 10% after royalties (Criterion 8 = 1)"
      action: "Verdict = NO-GO. Unit economics do not support franchising."

  soft_veto:  # Assessment continues but with mandatory remediation
    - condition: "1 CRITICAL veto criterion triggered"
      action: "Verdict = CONDITIONAL. Must address before proceeding."

    - condition: "Franchisor capital below $50K (Criterion 10 = 1-2)"
      action: "Verdict = CONDITIONAL. Delay until adequately capitalized."

    - condition: "Solo founder with no management depth (Criterion 12 = 1)"
      action: "Verdict = CONDITIONAL. Build team before franchising."

    - condition: "2+ Six Costly Mistakes patterns detected"
      action: "Issue formal warning. Require acknowledgment before proceeding."

  process_veto:  # Task execution halts
    - condition: "Owner cannot provide unit-level financial data"
      action: "Cannot complete ROI calculation. Pause assessment, request financials."

    - condition: "Owner refuses to answer diagnostic questions"
      action: "Insufficient data for assessment. Task cannot produce a valid verdict."
```

---

## Completion Criteria

- All 12 criteria scored with evidence-based notes
- ROI acid test calculated with real numbers (not estimates without basis)
- Verdict delivered: GO, NO-GO, or CONDITIONAL
- For GO: Next steps and agent handoff defined
- For CONDITIONAL: Specific remediation items with priority and responsible agent
- For NO-GO: Alternative growth models presented (licensing, company-owned, dealership, etc.)
- YAML scorecard saved to `squads/franchise/data/`
- Owner has a clear, actionable answer: should they franchise or not

---

**Task Status:** Ready for Production

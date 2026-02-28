# Task: Franchise Buyer Assessment

**Task ID:** franchise/franchise-buyer-assessment
**Version:** 1.0.0
**Execution Type:** Interactive (60% Human / 40% Agent)
**Duration:** 60-90 minutes
**Agent:** rick-bisio

---

## Purpose

Guide a prospective franchisee through a complete evaluation of whether to buy a specific franchise using Rick Bisio's Educated Franchisee Method. The process moves through six sequential phases -- from personal self-assessment through deep investigation to a final GO/NO-GO decision. The output is a Franchise Buying Decision Report with a scored verdict, veto condition analysis, and clear next steps.

This task treats franchise buying as a life decision, not just a business transaction. Every phase must be completed before proceeding to the next. Skipping phases leads to bad decisions.

---

## Inputs

```yaml
required:
  candidate_name:
    field: "Name of the prospective franchisee"
    format: "string"
    required: true

  franchise_name:
    field: "Name of the franchise being evaluated"
    format: "string"
    required: true

optional:
  franchise_category:
    field: "Industry/category (food, education, services, health, etc.)"
    format: "string"
    required: false

  estimated_investment:
    field: "Estimated total investment (from FDD Item 7 or franchisor materials)"
    format: "string"
    required: false

  candidate_net_worth:
    field: "Candidate's approximate total net worth"
    format: "string"
    required: false

  candidate_liquid_capital:
    field: "Candidate's available liquid capital"
    format: "string"
    required: false

  fdd_available:
    field: "Has the candidate received the FDD/COF?"
    format: "boolean"
    required: false

  country:
    field: "Country where the franchise will operate (affects legal handoff)"
    format: "string"
    required: false
```

---

## Steps

### Phase 1: Self-Assessment and Readiness (15-20 min)

**Behavioral State:** `state_personal_discovery`
**Principle:** Personal fit BEFORE financial fit -- who you are determines which franchise works.

```
Before we talk about {franchise_name}, let's talk about you.
An educated franchisee is a successful franchisee, and that
education starts with understanding yourself -- your goals,
your lifestyle, your finances, and your readiness for
franchise ownership.

I'm going to walk you through a series of exercises. Answer
honestly -- there are no wrong answers, only honest ones
and dishonest ones. The honest ones protect your savings
and your future.
```

#### Step 1.1: Personal Vision Exercise (5 min)

Ask the candidate to answer in 1-2 paragraphs each:

1. What does your ideal life look like in 5 years -- not just income, but lifestyle, schedule, family time, stress level?
2. How many hours per week are you willing to work in Year 1? Year 3?
3. What is your income goal for Year 1? Year 3? Year 5?
4. What activities do you want MORE of in your life?
5. What do you want to ELIMINATE from your life?
6. How long do you plan to own this franchise? What is your exit strategy?

**Red Flag Detection:**
- Cannot articulate any vision beyond "make money" --> Flag as Trait 1 weakness
- No exit strategy or expects to flip quickly --> Flag for discussion

#### Step 1.2: Financial Capacity Assessment (5 min)

Ask the candidate:

1. What is your total net worth (assets minus liabilities)?
2. How much liquid capital do you have available for investment?
3. What is the maximum you are willing to invest in a franchise?
4. Do you have 12-18 months of personal living expenses saved SEPARATELY from the franchise investment?
5. What is your minimum acceptable household income during Year 1 of franchise ownership?
6. Do you have other sources of income during the startup period?

**Heuristic rb004 Check:**
- Calculate: `total_investment / net_worth`
- IF > 50% --> HIGH RISK flag, warn candidate
- IF > 70% --> VETO CONDITION RB-VT-02 triggered, HALT evaluation

#### Step 1.3: Seven Essential Entrepreneurial Traits Assessment (5-8 min)

For each trait, ask the candidate to self-rate 1-5 AND provide a specific example from their life:

```yaml
trait_assessment:
  1_definitive_vision:
    question: "Can you articulate a clear, specific vision for your future? Give me a concrete example of a long-term goal you set and achieved."
    scoring: "1=No vision | 2=Vague ideas | 3=General direction | 4=Clear goals | 5=Detailed written plan"

  2_confident_articulation:
    question: "Can you confidently explain to anyone why franchise ownership fits your life plan? Try it now -- give me your 2-minute pitch."
    scoring: "1=Cannot explain | 2=Stumbles | 3=Basic explanation | 4=Clear and confident | 5=Compelling and specific"

  3_deadline_driven:
    question: "Do you set and hit deadlines? Give me an example of a major deadline you committed to and met."
    scoring: "1=Avoids deadlines | 2=Misses often | 3=Hits most | 4=Consistently meets | 5=Self-imposes aggressive timelines"

  4_challenge_as_growth:
    question: "Tell me about the biggest professional or financial setback you faced. What happened and what did you learn?"
    scoring: "1=Paralyzed by setbacks | 2=Recovers slowly | 3=Copes adequately | 4=Learns actively | 5=Transforms obstacles into advantages"

  5_differentiation_vs_system:
    question: "Are you comfortable following someone else's proven system even when you think you have a better idea? Be honest."
    scoring: "1=Strong resistance | 2=Uncomfortable | 3=Willing but reluctant | 4=Comfortable | 5=Embraces proven systems"
    critical: true
    veto_threshold: "Score of 1-2 triggers VETO RB-VT-06"

  6_readiness_recognition:
    question: "When you have enough information, can you commit and act? Or do you tend to research endlessly?"
    scoring: "1=Paralysis by analysis | 2=Very slow | 3=Moderate deliberation | 4=Timely decisions | 5=Decisive with data"

  7_continuous_learning:
    question: "What have you learned about franchising so far? What books, podcasts, or courses have you consumed?"
    scoring: "1=Nothing | 2=Minimal browsing | 3=Some research | 4=Structured learning | 5=Deep, ongoing education"
```

**Trait Assessment Scoring:**
- 6-7 traits rated 4+: STRONG entrepreneurial candidate --> Proceed with confidence
- 4-5 traits rated 4+: POSSIBLE with development plan --> Document weak areas, proceed with caution
- Below 4 traits rated 4+: FRANCHISE OWNERSHIP MAY NOT BE THE RIGHT PATH --> Pause, discuss honestly
- Trait 5 (System Following) rated 1-2: CRITICAL VETO --> Franchise model is wrong fit, discuss independent business

#### Step 1.4: Family and Support System Check (2 min)

1. Does your spouse/partner support this decision?
2. Have you discussed the financial commitment openly with them?
3. How will franchise ownership affect your family's daily life?
4. Who else will be affected by this change?

**Veto Check:** Spouse/partner actively opposes --> VETO RB-VT-09, HALT until family alignment resolved

#### Phase 1 Output: Personal Franchise Profile

```yaml
personal_profile:
  candidate: "{name}"
  date: "{date}"
  vision_clarity: "{1-5}"
  financial_capacity:
    net_worth: "{value}"
    liquid_capital: "{value}"
    max_investment: "{value}"
    investment_as_pct_net_worth: "{%}"
    reserves_12_months: "{yes/no}"
    risk_level: "{LOW/MODERATE/HIGH/CRITICAL}"
  entrepreneurial_traits:
    trait_1_vision: "{1-5}"
    trait_2_articulation: "{1-5}"
    trait_3_deadlines: "{1-5}"
    trait_4_resilience: "{1-5}"
    trait_5_system_following: "{1-5}"
    trait_6_decisiveness: "{1-5}"
    trait_7_learning: "{1-5}"
    average_score: "{X.X}"
    traits_at_4_plus: "{count}/7"
    assessment: "{STRONG/POSSIBLE/NOT READY}"
  family_alignment: "{ALIGNED/PARTIAL/OPPOSED}"
  lifestyle_goals:
    hours_per_week_year1: "{X}"
    hours_per_week_year3: "{X}"
    income_goal_year1: "{value}"
    exit_timeline: "{X years}"
  work_style: "{owner-operator/semi-absentee/executive}"
  veto_conditions_triggered: []
  proceed_to_phase_2: "{yes/no}"
```

---

### Phase 2: Franchise Model Education (5-8 min)

**Behavioral State:** `state_educational`
**Principle:** You are buying the right to use the franchisor's operating system -- understand what that means.

#### Step 2.1: Franchise Understanding Test (3 min)

Ask the candidate:

1. In your own words, what IS a franchise? What are you actually buying?
2. What is the franchisor-franchisee relationship? Who controls what?
3. What are royalties, ad fund fees, and how do they work?
4. What is the difference between franchise ownership and independent business ownership?
5. What is an FDD/COF and why is it important?

**Red Flag Detection:**
- Believes franchise = guaranteed success --> Educate on reality
- Does not understand franchisor-franchisee relationship --> Educate before proceeding
- Expects passive income --> Recalibrate expectations (Heuristic rb007)

#### Step 2.2: Franchise Economics Education (3 min)

Explain the specific economics of {franchise_name}:

- Initial franchise fee (what it covers)
- Ongoing royalties (percentage of gross revenue)
- Advertising/marketing fund contributions
- Other ongoing fees
- What the franchisor provides in exchange for these fees
- How the franchisor makes money (fees vs. royalties -- Heuristic rb010)

```
Key insight: A franchisor who makes money primarily from
ROYALTIES is incentivized to make you successful -- their
income grows when yours grows. A franchisor who makes money
primarily from FRANCHISE FEES is incentivized to SELL
franchises, not support them.
```

#### Step 2.3: Expectations Calibration (2 min)

1. How long do you expect it will take to reach profitability?
2. What is a realistic breakeven timeline for {franchise_name}'s industry?

**Heuristic rb007 Check:**
- IF candidate expects profitability in < 6 months --> Recalibrate with data
- Most franchises: 12-24 months to stable profitability

---

### Phase 3: Research and Targeting Validation (5-8 min)

**Behavioral State:** `state_analytical`
**Principle:** The best franchise for YOU is not the best franchise for everyone.

#### Step 3.1: Why This Franchise? (3 min)

1. How did you discover {franchise_name}?
2. Why this franchise specifically? What attracted you?
3. What other franchises did you consider? Why did you eliminate them?
4. Is your interest based on data or emotion?

**Heuristic rb009 Check:**
- IF candidate is deciding based on Discovery Day excitement --> SLOW DOWN
- IF choosing based on brand size alone --> Educate on personal fit
- IF "my friend makes money with it" --> Anecdotal evidence is not validation

#### Step 3.2: Market Fit Analysis (3 min)

1. What does the local market look like for {franchise_name}'s products/services?
2. How many competing locations exist in your target territory?
3. Is there validated demand for this in your area?
4. What is the territory protection arrangement?

#### Step 3.3: Lifestyle Alignment Check (2 min)

Compare franchise operations against the personal profile from Phase 1:

- Operating hours vs. desired schedule
- Level of involvement required vs. desired work style
- Industry/activity type vs. personal interests and skills
- Physical demands vs. candidate's situation

**Heuristic rb005 Check:**
- IF franchise operations conflict with desired lifestyle --> NO-GO on THIS franchise
- "A financially successful franchise that makes you miserable is a failed investment in your life."

---

### Phase 4: FDD Deep-Dive Investigation (15-20 min)

**Behavioral State:** `state_analytical`
**Principle:** The FDD is not a success indicator -- it reveals the nature of the relationship and potential red flags.

**Prerequisite:** Candidate must have received the FDD/COF.

**Veto Check:** IF franchisor refuses to provide FDD or rushes the 14-day review period --> VETO RB-VT-07, walk away immediately.

#### Step 4.1: Critical Items Analysis (10 min)

Walk through the 7 critical FDD Items with the candidate. For each item, identify red flags and green flags:

```yaml
fdd_critical_review:
  item_1_franchisor_background:
    name: "The Franchisor and Any Parents, Predecessors, and Affiliates"
    questions:
      - "How long has the franchisor been operating?"
      - "Has there been any change of ownership or corporate restructuring?"
      - "What is the parent company structure?"
    red_flags:
      - "Recent change of ownership or corporate restructuring"
      - "Short operating history (under 3 years)"
      - "History of name changes or corporate shuffling"
    green_flags:
      - "Long stable history with consistent leadership"
      - "Clear corporate structure"
    score: "{1-5}"

  item_3_litigation:
    name: "Litigation"
    questions:
      - "Are there lawsuits by franchisees against the franchisor?"
      - "Do you see a pattern in the complaints?"
      - "Any government enforcement actions?"
    red_flags:
      - "Extensive litigation by franchisees against the franchisor"
      - "Pattern of similar complaints across multiple lawsuits"
      - "Government enforcement actions"
    green_flags:
      - "Minimal or no franchisee-initiated litigation"
      - "Litigation resolved in franchisor's favor"
    score: "{1-5}"
    veto_check: "Extensive franchisee litigation --> VETO RB-VT-08"

  item_5_initial_fees:
    name: "Initial Fees"
    questions:
      - "What is the total initial franchise fee?"
      - "What does the fee specifically cover?"
      - "Are there any hidden or additional fees?"
    red_flags:
      - "Non-refundable fees with minimal training/support"
      - "Hidden fees not clearly disclosed"
      - "Fees significantly above industry average"
    green_flags:
      - "Clear breakdown of what fees cover"
      - "Fees in line with industry benchmarks"
    score: "{1-5}"

  item_7_initial_investment:
    name: "Estimated Initial Investment"
    questions:
      - "What is the total estimated cost to open?"
      - "Is working capital included (3-6 months minimum)?"
      - "How does this compare to what franchisees actually spent?"
    red_flags:
      - "Unrealistically low estimates (bait pricing)"
      - "Wide ranges suggesting uncertainty"
      - "Missing categories of expense"
      - "No working capital provision"
    green_flags:
      - "Detailed, realistic estimates with clear assumptions"
      - "Adequate working capital included (3-6 months minimum)"
      - "Ranges validated by actual franchisee experience"
    score: "{1-5}"

  item_19_financial_performance:
    name: "Financial Performance Representations"
    questions:
      - "Does the franchisor provide Item 19?"
      - "Is data from franchise-owned units or only corporate?"
      - "Are medians provided alongside averages?"
      - "How many years of data are shown?"
    red_flags:
      - "No Item 19 disclosure"
      - "Data based only on company-owned or top-performing units"
      - "Averages without medians or distribution data"
      - "Outdated financial data"
    green_flags:
      - "Comprehensive financial data with clear methodology"
      - "Median AND average presented"
      - "Data from franchise-owned units"
      - "Multiple years of trending data"
    score: "{1-5}"
    heuristic: "rb006 -- No Item 19 requires extra caution and more validation interviews"

  item_20_outlets:
    name: "Outlets and Franchisee Information"
    questions:
      - "How many units opened vs. closed in the last 3 years?"
      - "What is the annual closure rate?"
      - "Is the system growing or shrinking?"
      - "Is there a complete franchisee contact list?"
    red_flags:
      - "High closure rate (more than 5% per year)"
      - "High transfer rate (franchisees selling quickly)"
      - "Net system shrinkage (more closures than openings)"
      - "Franchisees concentrated in one region only"
    green_flags:
      - "Steady net growth year over year"
      - "Low closure rate"
      - "Geographic diversity"
      - "Complete franchisee contact list for validation"
    score: "{1-5}"
    veto_check: "Net system shrinkage --> VETO RB-VT-03"
    heuristic: "rb002 -- Closure rate > 5% requires deep investigation"

  item_21_financial_statements:
    name: "Financial Statements"
    questions:
      - "Does the auditor express any going concern qualification?"
      - "Is the franchisor's net worth positive?"
      - "Where does franchisor revenue come from -- fees or royalties?"
      - "Is revenue growing or declining?"
    red_flags:
      - "Going concern qualification from auditor"
      - "Negative net worth"
      - "Heavy reliance on franchise fee income (not royalties)"
      - "Declining revenue trends"
    green_flags:
      - "Clean audit opinion"
      - "Strong royalty-based revenue (recurring)"
      - "Growing revenue and healthy balance sheet"
    score: "{1-5}"
    heuristic: "rb010 -- Fee-dependent revenue model is a red flag"
```

#### Step 4.2: Remaining Items Quick Scan (5 min)

Walk through Items 2, 4, 6, 8-18, 22-23 at a summary level, flagging anything unusual:

| Item | Name | Key Focus | Flag? |
|------|------|-----------|-------|
| 2 | Business Experience | Management team experience | |
| 4 | Bankruptcy | Any bankruptcy history | |
| 6 | Other Fees | Ongoing fees beyond royalty/ad fund | |
| 8 | Restrictions on Products/Services | Sourcing restrictions, approved suppliers | |
| 9 | Franchisee Obligations | What YOU must do | |
| 10 | Financing | Franchisor-arranged financing terms | |
| 11 | Franchisor's Obligations | What THEY must do (training, support) | |
| 12 | Territory | Exclusive territory protection details | |
| 13 | Trademarks | Trademark ownership and protection | |
| 14 | Patents/Copyrights | Proprietary systems and IP | |
| 15 | Obligation to Participate | Owner-operator requirement? | |
| 16 | Restrictions on Goods/Services | What you CAN'T sell | |
| 17 | Renewal, Termination, Transfer | How you exit and at what cost | |
| 18 | Public Figures | Celebrity endorsements or associations | |
| 22 | Contracts | Franchise agreement details | |
| 23 | Receipts | Acknowledgment documentation | |

#### Step 4.3: Financial Modeling (5 min)

Build a basic financial projection using FDD data and candidate financials:

```yaml
financial_model:
  total_initial_investment:
    fdd_low_estimate: "{value}"
    fdd_high_estimate: "{value}"
    realistic_estimate: "{value}"
  ongoing_monthly_costs:
    royalty_pct: "{X%}"
    ad_fund_pct: "{X%}"
    other_fees: "{value}"
    estimated_operating_costs: "{value}"
    total_monthly_obligation: "{value}"
  revenue_projection:
    source: "{Item 19 / franchisee interviews / industry data}"
    monthly_revenue_conservative: "{value}"
    monthly_revenue_moderate: "{value}"
    monthly_revenue_optimistic: "{value}"
  breakeven_analysis:
    monthly_breakeven_revenue: "{value}"
    estimated_months_to_breakeven: "{X months}"
    working_capital_needed: "{value}"
  roi_projection:
    year_1_net: "{value}"
    year_3_net: "{value}"
    year_5_net: "{value}"
    cash_on_cash_return_year3: "{X%}"
  risk_assessment:
    investment_as_pct_net_worth: "{X%}"
    risk_level: "{LOW/MODERATE/HIGH/CRITICAL}"
```

#### Phase 4 Output: FDD Analysis Report

```yaml
fdd_analysis:
  franchise: "{franchise_name}"
  fdd_date: "{date}"
  critical_items_scores:
    item_1: "{1-5}"
    item_3: "{1-5}"
    item_5: "{1-5}"
    item_7: "{1-5}"
    item_19: "{1-5}"
    item_20: "{1-5}"
    item_21: "{1-5}"
    average_critical_score: "{X.X}"
  red_flags_identified: []
  green_flags_identified: []
  veto_conditions_triggered: []
  financial_model_summary:
    total_investment: "{value}"
    breakeven_months: "{X}"
    year_3_roi: "{X%}"
    risk_level: "{LOW/MODERATE/HIGH/CRITICAL}"
  fdd_verdict: "{CLEAN/CONCERNS/RED FLAGS/CRITICAL ISSUES}"
  proceed_to_phase_5: "{yes/no}"
```

---

### Phase 5: Validation Interviews (10-15 min)

**Behavioral State:** `state_coaching`
**Principle:** If you haven't talked to the people who left the system, you don't have the full picture.

**Veto Check:** IF candidate has not interviewed ANY existing franchisees --> VETO RB-VT-04, return to validation.

#### Step 5.1: Interview Preparation and Assignment

For each of the 6 types, prepare the candidate with specific questions and minimum contact targets:

```yaml
validation_checklist:
  type_1_successful_franchisees:
    minimum_contacts: 3-5
    contacts_completed: "{X}"
    status: "{NOT STARTED/IN PROGRESS/COMPLETE}"
    key_questions:
      - "What does a typical day/week look like?"
      - "How long did it take to reach profitability?"
      - "What was your actual initial investment vs. the FDD estimate?"
      - "Would you do it again knowing what you know now?"
      - "What support does the franchisor provide that is most valuable?"
      - "What are the top 3 skills needed to succeed in this franchise?"
    key_findings: "{summary}"

  type_2_struggling_franchisees:
    minimum_contacts: 2-3
    contacts_completed: "{X}"
    status: "{NOT STARTED/IN PROGRESS/COMPLETE}"
    key_questions:
      - "What challenges did you not expect?"
      - "Is the franchisor responsive when you need help?"
      - "What would you do differently if starting over?"
      - "Are the challenges systemic or personal?"
      - "Do you feel the FDD accurately represented the opportunity?"
    key_findings: "{summary}"

  type_3_former_franchisees:
    minimum_contacts: 2-3
    contacts_completed: "{X}"
    status: "{NOT STARTED/IN PROGRESS/COMPLETE}"
    note: "These are often the most honest interviews -- they have nothing to lose"
    key_questions:
      - "Why did you leave the franchise?"
      - "Was it a business decision or a personal decision?"
      - "Did the franchise meet your initial expectations?"
      - "What would you tell someone considering this franchise?"
      - "Were there red flags you missed during due diligence?"
    key_findings: "{summary}"

  type_4_franchisor_leadership:
    minimum_contacts: 2-3
    contacts_completed: "{X}"
    status: "{NOT STARTED/IN PROGRESS/COMPLETE}"
    key_questions:
      - "What is the franchisor's vision for the next 5 years?"
      - "How does the franchisor measure franchisee success?"
      - "What is the franchisor's biggest challenge right now?"
      - "What support infrastructure exists for struggling franchisees?"
      - "What is the franchisor's philosophy on territory protection?"
      - "How are franchisee concerns addressed at the corporate level?"
    key_findings: "{summary}"

  type_5_suppliers_and_vendors:
    minimum_contacts: 1-2
    contacts_completed: "{X}"
    status: "{NOT STARTED/IN PROGRESS/COMPLETE}"
    key_questions:
      - "How long have you worked with this franchise system?"
      - "Are franchisees satisfied with your products/services?"
      - "Does the franchisor negotiate fair pricing for franchisees?"
      - "Are there supply chain issues I should be aware of?"
      - "How does this franchisor compare to others you serve?"
    key_findings: "{summary}"

  type_6_customers_and_end_users:
    minimum_contacts: 5-10
    contacts_completed: "{X}"
    status: "{NOT STARTED/IN PROGRESS/COMPLETE}"
    note: "Visit actual franchise locations, observe operations, talk to real customers"
    key_questions:
      - "How often do you use this franchise's products/services?"
      - "What keeps you coming back?"
      - "How does this compare to competitors?"
      - "Would you recommend this franchise to others?"
      - "What could they improve?"
    key_findings: "{summary}"
```

#### Step 5.2: Validation Completeness Assessment

```yaml
validation_completeness:
  types_completed: "{X}/6"
  total_contacts: "{X}"
  assessment:
    all_6_complete: "Ready for decision phase"
    4_to_5_complete: "Significant gaps -- identify missing types and why"
    below_4: "NOT ready to decide -- return to validation phase"
  missing_types: []
  reason_for_gaps: "{explanation}"
  validation_verdict: "{COMPLETE/GAPS/INSUFFICIENT}"
```

#### Step 5.3: Validation Synthesis

Synthesize findings across all interview types:

1. What consistent themes emerge across ALL interview types?
2. Do successful franchisees and struggling franchisees describe the SAME system?
3. What did former franchisees reveal that current franchisees did not?
4. Does the franchisor leadership's vision align with franchisee reality?
5. Are suppliers/vendors confident in the system's stability?
6. Do customers validate genuine market demand?

#### Phase 5 Output: Validation Report

```yaml
validation_report:
  franchise: "{franchise_name}"
  date: "{date}"
  types_interviewed: "{X}/6"
  total_contacts: "{X}"
  consistent_themes:
    strengths: []
    concerns: []
    contradictions: []
  former_franchisee_insights: "{summary}"
  franchisor_alignment: "{ALIGNED/PARTIAL/MISALIGNED}"
  customer_demand_validated: "{YES/PARTIAL/NO}"
  overall_validation_sentiment: "{POSITIVE/MIXED/NEGATIVE}"
  veto_conditions_triggered: []
  proceed_to_phase_6: "{yes/no}"
```

---

### Phase 6: Final Decision Framework (10-15 min)

**Behavioral State:** `state_decisive`
**Principle:** Good outcomes come from clear thinking, realistic expectations, and an understanding of how businesses operate in the real world.

#### Step 6.1: Veto Condition Sweep

Run through ALL 10 veto conditions. Any single CRITICAL veto that is unresolved means the evaluation MUST pause or result in NO-GO.

```yaml
veto_sweep:
  RB-VT-01:
    condition: "Candidate has no personal vision or self-assessment completed"
    severity: CRITICAL
    status: "{CLEAR/TRIGGERED}"
    notes: ""

  RB-VT-02:
    condition: "Total investment exceeds 70% of candidate's net worth"
    severity: CRITICAL
    status: "{CLEAR/TRIGGERED}"
    notes: ""

  RB-VT-03:
    condition: "FDD Item 20 shows net system shrinkage"
    severity: CRITICAL
    status: "{CLEAR/TRIGGERED}"
    notes: ""

  RB-VT-04:
    condition: "Candidate has not interviewed any existing franchisees"
    severity: CRITICAL
    status: "{CLEAR/TRIGGERED}"
    notes: ""

  RB-VT-05:
    condition: "Franchise operations fundamentally conflict with desired lifestyle"
    severity: HIGH
    status: "{CLEAR/TRIGGERED}"
    notes: ""

  RB-VT-06:
    condition: "Candidate strongly resists following established systems"
    severity: HIGH
    status: "{CLEAR/TRIGGERED}"
    notes: ""

  RB-VT-07:
    condition: "Franchisor refuses to provide FDD or rushes 14-day review"
    severity: CRITICAL
    status: "{CLEAR/TRIGGERED}"
    notes: ""

  RB-VT-08:
    condition: "Extensive litigation by franchisees against franchisor"
    severity: HIGH
    status: "{CLEAR/TRIGGERED}"
    notes: ""

  RB-VT-09:
    condition: "Spouse/partner actively opposes the franchise purchase"
    severity: HIGH
    status: "{CLEAR/TRIGGERED}"
    notes: ""

  RB-VT-10:
    condition: "Candidate making emotional decision based on Discovery Day or sales pressure"
    severity: HIGH
    status: "{CLEAR/TRIGGERED}"
    notes: ""

  critical_vetoes_triggered: "{count}"
  high_vetoes_triggered: "{count}"
  veto_verdict: "{ALL CLEAR/HIGH CONCERNS/CRITICAL BLOCK}"
```

**Veto Decision Logic:**
- Any CRITICAL veto TRIGGERED and unresolved --> NO-GO (or HALT until resolved)
- 3+ HIGH vetoes TRIGGERED --> NO-GO
- 1-2 HIGH vetoes TRIGGERED --> CONDITIONAL (with specific resolution requirements)
- ALL CLEAR --> Proceed to scoring

#### Step 6.2: Five Keys to Success Validation

Assess whether the candidate and franchise align with the 5 Keys to long-term success:

```yaml
five_keys_validation:
  1_follow_the_system:
    question: "Is the candidate willing AND able to follow the franchisor's system?"
    candidate_readiness: "{1-5}"
    system_quality: "{1-5 based on validation findings}"
    alignment: "{ALIGNED/CONCERN/MISALIGNED}"

  2_build_relationships:
    question: "Does the franchise culture support peer networks, conventions, and collaboration?"
    franchise_community: "{1-5}"
    candidate_sociability: "{1-5}"
    alignment: "{ALIGNED/CONCERN/MISALIGNED}"

  3_manage_finances:
    question: "Does the candidate have the financial discipline AND adequate capital?"
    financial_discipline: "{1-5}"
    capital_adequacy: "{1-5}"
    alignment: "{ALIGNED/CONCERN/MISALIGNED}"

  4_lead_your_team:
    question: "Does the candidate have leadership ability for the staff requirements of this franchise?"
    leadership_ability: "{1-5}"
    team_size_required: "{X}"
    alignment: "{ALIGNED/CONCERN/MISALIGNED}"

  5_continuous_improvement:
    question: "Is the candidate committed to ongoing learning and the franchisor invested in innovation?"
    candidate_learning: "{1-5}"
    franchisor_innovation: "{1-5}"
    alignment: "{ALIGNED/CONCERN/MISALIGNED}"

  keys_aligned: "{X}/5"
  keys_at_concern: "{X}/5"
  keys_misaligned: "{X}/5"
```

#### Step 6.3: Composite Scoring and Verdict

Aggregate all data from Phases 1-5 into the final scoring matrix:

```yaml
composite_scoring:
  dimension_1_personal_fit:
    weight: 30%
    components:
      - "Entrepreneurial traits average: {X.X}/5"
      - "Lifestyle alignment: {ALIGNED/PARTIAL/MISALIGNED}"
      - "Family support: {ALIGNED/PARTIAL/OPPOSED}"
      - "Work style match: {ALIGNED/PARTIAL/MISALIGNED}"
    score: "{1-10}"

  dimension_2_financial_viability:
    weight: 30%
    components:
      - "Investment risk level: {LOW/MODERATE/HIGH/CRITICAL}"
      - "Financial model ROI Year 3: {X%}"
      - "Breakeven timeline: {X months}"
      - "Capital adequacy: {ADEQUATE/TIGHT/INSUFFICIENT}"
    score: "{1-10}"

  dimension_3_franchise_quality:
    weight: 25%
    components:
      - "FDD critical items average: {X.X}/5"
      - "System growth trend: {GROWING/STABLE/DECLINING}"
      - "Franchisor revenue model: {ROYALTY-BASED/FEE-BASED/MIXED}"
      - "Litigation profile: {CLEAN/MODERATE/CONCERNING}"
    score: "{1-10}"

  dimension_4_validation_results:
    weight: 15%
    components:
      - "Validation completeness: {X}/6 types"
      - "Franchisee sentiment: {POSITIVE/MIXED/NEGATIVE}"
      - "Customer demand: {VALIDATED/PARTIAL/UNVALIDATED}"
      - "Franchisor-franchisee alignment: {ALIGNED/PARTIAL/MISALIGNED}"
    score: "{1-10}"

  weighted_total: "{X.X}/10"
```

**Final Verdict Thresholds:**

| Weighted Score | Verdict | Action |
|---------------|---------|--------|
| 8.0 - 10.0 | **GO** | Strong candidate, proceed with franchise agreement |
| 6.0 - 7.9 | **CONDITIONAL** | Proceed ONLY if specific conditions are met |
| 4.0 - 5.9 | **NO-GO (SOFT)** | Not recommended, but candidate may re-evaluate after addressing gaps |
| Below 4.0 | **NO-GO (HARD)** | Do not proceed, fundamental misfit |

**Override Rules:**
- ANY unresolved CRITICAL veto --> NO-GO regardless of score
- 3+ HIGH vetoes --> NO-GO regardless of score
- Dimension 1 (Personal Fit) below 4 --> NO-GO regardless of total
- Dimension 2 (Financial Viability) below 4 --> NO-GO regardless of total

---

## Output

```yaml
file: "squads/franchise/data/assessments/{candidate-slug}-{franchise-slug}-assessment.yaml"
format: "yaml"
content:
  franchise_buying_decision_report:
    metadata:
      report_id: "{auto-generated}"
      date: "{date}"
      agent: "rick-bisio"
      methodology: "The Educated Franchisee Method (6-Phase Evaluation)"
      duration: "{actual minutes}"

    candidate:
      name: "{candidate_name}"
      personal_profile_summary: "{2-3 sentence summary}"
      entrepreneurial_traits_score: "{X.X}/5 ({STRONG/POSSIBLE/NOT READY})"
      financial_risk_level: "{LOW/MODERATE/HIGH/CRITICAL}"
      family_alignment: "{ALIGNED/PARTIAL/OPPOSED}"

    franchise:
      name: "{franchise_name}"
      category: "{category}"
      total_investment: "{value}"
      fdd_analysis_verdict: "{CLEAN/CONCERNS/RED FLAGS/CRITICAL ISSUES}"
      fdd_critical_items_average: "{X.X}/5"
      system_trend: "{GROWING/STABLE/DECLINING}"

    validation:
      types_interviewed: "{X}/6"
      total_contacts: "{X}"
      overall_sentiment: "{POSITIVE/MIXED/NEGATIVE}"
      customer_demand: "{VALIDATED/PARTIAL/UNVALIDATED}"

    financial_projection:
      total_investment: "{value}"
      investment_pct_net_worth: "{X%}"
      breakeven_months: "{X}"
      year_3_roi: "{X%}"
      year_5_roi: "{X%}"

    five_keys_alignment:
      keys_aligned: "{X}/5"
      keys_at_concern: "{X}/5"
      keys_misaligned: "{X}/5"

    veto_conditions:
      critical_triggered: "{count}"
      high_triggered: "{count}"
      details: []

    scoring:
      personal_fit: "{X}/10 (weight 30%)"
      financial_viability: "{X}/10 (weight 30%)"
      franchise_quality: "{X}/10 (weight 25%)"
      validation_results: "{X}/10 (weight 15%)"
      weighted_total: "{X.X}/10"

    verdict: "{GO / NO-GO / CONDITIONAL}"
    verdict_reasoning: "{3-5 sentence explanation}"

    conditions:
      # Only if CONDITIONAL
      - condition: "{what must be resolved}"
        owner: "{candidate/franchisor}"
        deadline: "{timeframe}"

    next_steps:
      if_go:
        - "Engage franchise attorney for agreement review"
        - "Negotiate franchise agreement terms"
        - "Secure financing if needed"
        - "Handoff to @marcelo-cherto if operating in Brazil (legal compliance)"
        - "Handoff to @michael-gerber if evaluating franchisor system quality"
        - "Post-purchase: handoff to @scott-greenberg for operational readiness"
      if_no_go:
        - "Document reasons for NO-GO"
        - "Identify alternative franchise options better aligned with profile"
        - "If personal readiness is the issue, define development plan"
        - "Re-evaluate in {X} months if gaps are addressable"
      if_conditional:
        - "Resolve listed conditions within {timeframe}"
        - "Re-run Phase 6 scoring after conditions are addressed"
        - "Do NOT sign franchise agreement until conditions are cleared"

    handoffs:
      - to: "{agent}"
        trigger: "{condition}"
        context: "{what to pass}"
```

---

## Quality Gate: QG-FBA-001

- [ ] Phase 1 complete: Personal Franchise Profile generated with all fields
- [ ] Seven Entrepreneurial Traits scored individually with examples
- [ ] Financial capacity assessed with investment-to-net-worth ratio calculated
- [ ] Family alignment explicitly confirmed or flagged
- [ ] Phase 2 complete: Candidate demonstrates understanding of franchise model
- [ ] Phase 3 complete: Franchise selection rationale documented (data, not emotion)
- [ ] Lifestyle alignment check completed against personal profile
- [ ] Phase 4 complete: All 7 critical FDD items scored with red/green flags
- [ ] Financial model built with breakeven analysis
- [ ] Phase 5 complete: Minimum 4 of 6 interview types conducted
- [ ] Former franchisees interviewed (Type 3 -- non-negotiable)
- [ ] Validation synthesis completed with consistent themes identified
- [ ] Phase 6 complete: All 10 veto conditions checked
- [ ] Five Keys to Success validated against candidate and franchise
- [ ] Composite score calculated with 4-dimension weighted total
- [ ] Final verdict delivered: GO / NO-GO / CONDITIONAL with reasoning
- [ ] Next steps defined based on verdict
- [ ] Handoffs identified if applicable

---

## Veto Conditions

```yaml
veto_conditions:
  critical_vetoes:
    - id: RB-VT-01
      condition: "No personal vision or self-assessment completed"
      action: "HALT -- complete Phase 1 exercises before proceeding"
      phase: 1

    - id: RB-VT-02
      condition: "Total investment exceeds 70% of candidate's net worth"
      action: "HALT -- financial risk is catastrophic, find lower-investment options"
      phase: 1

    - id: RB-VT-03
      condition: "FDD Item 20 shows net system shrinkage"
      action: "HALT -- system is declining, investigate root cause or move to different franchise"
      phase: 4

    - id: RB-VT-04
      condition: "Candidate has not interviewed any existing franchisees"
      action: "HALT -- return to Phase 5, no decision without validation"
      phase: 5

    - id: RB-VT-07
      condition: "Franchisor refuses to provide FDD or rushes 14-day review"
      action: "HALT -- legal requirement violation, walk away immediately"
      phase: 4

  high_vetoes:
    - id: RB-VT-05
      condition: "Franchise operations conflict with desired lifestyle"
      action: "NO-GO on this franchise -- redirect to better-aligned options"
      phase: 3

    - id: RB-VT-06
      condition: "Candidate strongly resists following established systems"
      action: "Franchise model is wrong fit -- discuss independent business"
      phase: 1

    - id: RB-VT-08
      condition: "Extensive litigation by franchisees against franchisor"
      action: "Deep investigation required -- identify patterns"
      phase: 4

    - id: RB-VT-09
      condition: "Spouse/partner actively opposes the franchise purchase"
      action: "HALT -- resolve family alignment before proceeding"
      phase: 1

    - id: RB-VT-10
      condition: "Candidate making emotional decision (Discovery Day, sales pressure)"
      action: "SLOW DOWN -- complete all exercises with cool head"
      phase: 3

  veto_logic:
    any_critical_unresolved: "NO-GO regardless of score"
    three_plus_high: "NO-GO regardless of score"
    one_to_two_high: "CONDITIONAL with specific resolution requirements"
    all_clear: "Proceed to composite scoring"
```

---

## Heuristic Quick Reference

| ID | Rule | Phase | Threshold |
|----|------|-------|-----------|
| rb001 | Personal fit first | 1 | Self-assessment required before ANY franchise discussion |
| rb002 | FDD turnover flag | 4 | Closure rate > 5%/year --> deep investigation |
| rb003 | Validation required | 5 | All 6 types must be interviewed before deciding |
| rb004 | Financial risk | 1, 4 | Investment > 50% net worth --> HIGH RISK |
| rb005 | Lifestyle alignment | 3 | Operations conflict with lifestyle --> NO-GO |
| rb006 | No Item 19 caution | 4 | Absent Item 19 --> extra validation required |
| rb007 | First year reality | 2 | Expects profit < 6 months --> recalibrate |
| rb008 | System following | 1 | Resists systems --> franchise wrong fit |
| rb009 | Emotional guard | 3 | Discovery Day decision --> SLOW DOWN |
| rb010 | Revenue model | 4 | Fee-dependent franchisor --> RED FLAG |

---

## Handoff Rules

```yaml
handoff_triggers:
  go_verdict_brazil:
    condition: "Verdict = GO AND country = Brazil"
    to: "@marcelo-cherto"
    purpose: "Brazilian legal compliance, COF review, Lei de Franquias"
    context: "Assessment results, FDD analysis, candidate profile"

  go_verdict_systems_eval:
    condition: "Verdict = GO AND candidate wants to evaluate franchisor system quality"
    to: "@michael-gerber"
    purpose: "Evaluate franchisor operating systems and documentation quality"
    context: "FDD findings, system quality observations from validation"

  go_verdict_operations:
    condition: "Franchise purchased, transitioning to owner"
    to: "@scott-greenberg"
    purpose: "Operational excellence and franchise leadership preparation"
    context: "Personal profile, franchise type, strengths and growth areas"

  franchise_structure_concerns:
    condition: "During investigation, need to assess franchisor structure quality"
    to: "@mark-siebert"
    purpose: "Evaluate fee design, systems, growth model"
    context: "FDD data, financial observations, specific structural concerns"

  relationship_concerns:
    condition: "Validation reveals franchisor-franchisee relationship issues"
    to: "@greg-nathan"
    purpose: "Diagnose relationship dynamics using E-Factor model"
    context: "Interview findings, specific relationship concerns"
```

---

## Session Flow Summary

```
PHASE 1: SELF-ASSESSMENT (15-20 min)
  |-- Step 1.1: Personal Vision Exercise
  |-- Step 1.2: Financial Capacity Assessment
  |-- Step 1.3: Seven Entrepreneurial Traits Assessment
  |-- Step 1.4: Family and Support System Check
  |-- OUTPUT: Personal Franchise Profile
  |-- VETO CHECK: RB-VT-01, RB-VT-02, RB-VT-06, RB-VT-09
  |
PHASE 2: FRANCHISE EDUCATION (5-8 min)
  |-- Step 2.1: Franchise Understanding Test
  |-- Step 2.2: Franchise Economics Education
  |-- Step 2.3: Expectations Calibration
  |
PHASE 3: RESEARCH AND TARGETING (5-8 min)
  |-- Step 3.1: Why This Franchise?
  |-- Step 3.2: Market Fit Analysis
  |-- Step 3.3: Lifestyle Alignment Check
  |-- VETO CHECK: RB-VT-05, RB-VT-10
  |
PHASE 4: FDD DEEP-DIVE (15-20 min)
  |-- Step 4.1: Critical Items Analysis (7 Items scored)
  |-- Step 4.2: Remaining Items Quick Scan (16 Items flagged)
  |-- Step 4.3: Financial Modeling
  |-- OUTPUT: FDD Analysis Report
  |-- VETO CHECK: RB-VT-03, RB-VT-07, RB-VT-08
  |
PHASE 5: VALIDATION (10-15 min)
  |-- Step 5.1: Interview Preparation and Assignment
  |-- Step 5.2: Validation Completeness Assessment
  |-- Step 5.3: Validation Synthesis
  |-- OUTPUT: Validation Report
  |-- VETO CHECK: RB-VT-04
  |
PHASE 6: FINAL DECISION (10-15 min)
  |-- Step 6.1: Veto Condition Sweep (all 10)
  |-- Step 6.2: Five Keys to Success Validation
  |-- Step 6.3: Composite Scoring and Verdict
  |-- OUTPUT: Franchise Buying Decision Report (GO/NO-GO/CONDITIONAL)
  |-- HANDOFFS: Based on verdict and context
```

---

**Task Status:** Ready for Production

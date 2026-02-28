# Squad ADM — Coding Standards & Documentation

## Document Standards

All documentation in Squad ADM should follow these standards:

### 1. Agent Documentation
- **File naming:** `{agent-name}.md` (lowercase, hyphens)
- **Structure:** Role → Responsibilities → Workflows → O que faz/NÃO faz → Tools → Connections
- **Examples:** `dave-ramsey-financeiro.md`, `patrick-lencioni-rh.md`

### 2. Task Documentation
- **File naming:** `{task-id}.md`
- **Required sections:**
  - Input (what the task receives)
  - Process (steps involved)
  - Output (deliverable)
  - Tools (systems used)
  - Responsible Agent

### 3. Template Files
- **Location:** `templates/` folder
- **Format:** Markdown or YAML
- **Examples:** Financial report template, contract template, policy template

### 4. Checklists
- **Location:** `checklists/` folder
- **Format:** Markdown with checkbox items
- **Examples:** Onboarding checklist, financial closing, compliance audit

## Data Standards

### Financial Data
- Currency: BRL
- Format: Sheets, CSV, or JSON
- Retention: 7 years minimum (legal requirement)

### HR Data
- Format: Confidential
- Access: Patrick Lencioni + Ray Dalio ADM Chief only
- Retention: 5 years minimum

### Legal Data
- Format: PDF + metadata
- Retention: Indefinite (statute of limitations)
- Backup: Google Drive + external drive

## Communication Standards

### Sinapses
Squad ADM communicates with other squads via:
- **Financial decisions** → Sync with product/sales teams
- **Compliance changes** → Notify all squads
- **Access updates** → Facilities to all squad chiefs
- **HR changes** → Notify affected squad chiefs

### Meeting Frequency
- **Internal:** Weekly (Ray Dalio + department leads)
- **Cross-squad:** As needed, via sinapses
- **CEO sync:** Monthly (strategic decisions)

## Tool Integration

### Approved Tools
- Google Workspace (Docs, Sheets, Drive)
- Slack (communication)
- Notion (documentation)
- ClickUp (task management)
- Conta Azul (accounting)
- 1Password (secrets management)

### Tool Evaluation Criteria
- Security (data protection)
- Compliance (LGPD, SOC2)
- Cost (budget approved)
- User experience (team adoption)

---

*Last updated: 2026-02-25*

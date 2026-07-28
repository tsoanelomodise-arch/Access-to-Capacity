/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  IconFileText as FileText, 
  IconCpu as Cpu, 
  IconShieldAlert as ShieldAlert, 
  IconUserCheck as UserCheck, 
  IconCalendar as Calendar, 
  IconActivity as Activity, 
  IconCheckCircle as CheckCircle, 
  IconPlay as Play, 
  IconRotateCcw as RotateCcw, 
  IconDatabase as Database, 
  IconArrowRight as ArrowRight, 
  IconEye as Eye, 
  IconLayers as Layers,
  IconTerminal as Terminal,
  IconClock as Clock,
  IconHelpCircle as HelpCircle,
  IconDownload as Download,
  IconCopy as Copy,
  IconFileJson as FileJson,
  IconCheck as Check
} from "./icons/CustomIcons";
import ReactMarkdown from "react-markdown";

const LIFECYCLE_MARKDOWN_DOC = `# Service Provider Authentication Multi-Role User Journey & Portal Navigation Flow

This official specification defines the operational tasks, multi-user access boundaries, and end-to-end customer journey map for the **Service Provider Authentication** digital ecosystem. 

This protocol acts as the behavioral blueprint for three primary user personas:
1.  **SME (SMME) Users**: Growing enterprises seeking capability development and funding.
2.  **Portal Providers**: Accredited service providers offering advisory, planning, and technical training.
3.  **Admins (System Managers)**: Administrators supervising verification, needs diagnostics, and provider matching.

*Note: Default Application Route is configured to land on the **Service Provider Allocation Portal** (\`activeView: "provider"\`). The authenticated (logged-in) INSIGHTS and service provider dashboard states feature a soft pastel mesh gradient background with floating rounded glass-like cards (\`rounded-[2.25rem]\`), pill-shaped action buttons, soft pastel status pills, high-contrast metric typography, refined dark-glass header banner cards with ambient glow effects, and responsive diagnostics inspector panels while preserving 100% of portal data, state management, and business logic. The header navigation displays the streamlined **PROGRAMS PARTNERS & PORTALS** dropdown menu with integrated **LOGOUT SESSION** control. System typography adopts the geometric, high-contrast **Stadium** specimen typography system, paired with a bespoke agency-grade vector icon system (\`CustomIcons.tsx\`) with custom-designed pillar, dossier, optical barcode, fingerprint, pen tool, and verification icons applied throughout the Application Intake Dossier and portal views. The portal container (\`admin-dashboard-container\`) expands full-bleed across the entire background between the header and footer.*

---

## 🗺️ Flow Portal Navigation & Service Provider Allocation Tree (with Unified Collaborative User Journey)

### 🌿 Portal Navigation & Service Provider Allocation Tree
\`\`\`text
Home / Main Navigation Menu
│
├── Partners & Portals (Menu Category)
│   ├── Approved Provider Portal (Multi-User Dashboard & Workload Hub)
│   └── Application Intake Dossier (Standalone Registration & Verification Page)
│
└── Operational Insights (Menu Category)
    ├── Performance Dashboard (Admin Control Room)
    ├── Provider Allocation Tree (Interactive Matchmaking Matrix)
    └── Application Intake Dossier (Direct Intake Navigation Link)
└── Service Provider Allocation Portal (Multi-User Dashboard Views)
    ├── [SME VIEW]
    │   ├── Profile & Compliance Uploads
    │   ├── Self-Diagnostic Assessment
    │   ├── Pillar Recommendation Tracker
    │   └── Matched Provider Milestone Board
    │
    ├── [PORTAL PROVIDER VIEW]
    │   ├── Capacity & Accreditation Manager
    │   ├── Assigned SME Pipeline
    │   └── Milestone Logging & Progress Verification
    │
    └── [ADMIN VIEW]
        ├── SMME Audit & Verification Desk
        ├── Diagnostic Needs Analytics
        ├── Dynamic Matchmaking & Provider Allocation Matrix
        ├── End-to-End Performance Dashboard
        └── End-to-End System Process Flow Sub-Page (Interactive Blueprint & Spec)
\`\`\`

### 🔄 End-to-End Collaborative User Journey Flow
\`\`\`mermaid
sequenceDiagram
    autonumber
    actor SME as SME (SMME) User
    actor Admin as System Admin
    actor Provider as Portal Provider

    Note over SME, Admin: Stage 1 & 2: Onboarding, Compliance & Diagnostic
    SME->>Admin: Submit Profile, Upload SARS/CIPC Docs
    Admin->>Admin: Trigger Verification Audits & Approve Profile
    SME->>SME: Complete 10-Point Self-Diagnostic
    SME->>Admin: Request Allocation (Pillar Recommended)

    Note over Admin, Provider: Stage 3 & 4: Resource Allocation & Intake
    Admin->>Admin: Open Allocation Matchmaking Matrix
    Admin->>Provider: Match & Assign Provider to SME's Pillar
    Provider->>Provider: Inspect Diagnostic & Workload Cap
    Provider->>Admin: Accept SME Docket Allocation

    Note over SME, Provider: Stage 5 & 6: Program Execution, Sign-Off & Logs
    Provider->>SME: Establish Direct Communication & Upload Workplan
    SME->>Provider: Review & Mutually Approve Schedule
    Provider->>Provider: Execute Training & Log Active Hours
    Provider->>SME: Log Milestone Completion & Request Sign-Off
    SME->>Provider: Verify & Digitally Sign Off Milestone
    Provider->>Admin: Submit Completed Verification Dossier
    Admin->>Admin: Review Audits, Issue Certificate & Log Metrics
\`\`\`

---

## ⚙️ End-to-End System Process Flow (6-Stage Protocol)

This section details the critical mechanical stages governing the Service Provider Allocation lifecycle:

### 📥 1. Application Intake
*   **System Action**: Captures initial SMME profile registrations. Initializes secure, isolated tenant sandbox environments in the local database. Generates the baseline profile state.
*   **Data Fields Captured**: Registered Name, Trading Name, CIPC Registration Number, SARS Income Tax Number, Primary Contact Details, Industry Sector, Annual Turnover Bracket, and Employee Headcount.
*   **SME Tasks**: 
    *   Registers user account with secure credentials (email validation required).
    *   Fills out primary business coordinates (sector, size, region, operational years).
    *   Declares primary growth objectives and chooses perceived capability bottlenecks.
*   **Compliance Boundaries**: Data integrity check routines prevent submission without a complete profile.
*   **State Machine Transition**: \`NONE\` ➔ \`DRAFT\` (State Key: \`SYS_INT_01\`)

### 🔍 2. Compliance Checking
*   **System Action**: Executes verification checks on document uploads against core South African regulatory standards. Calculates the 10-point self-diagnostic capability maturity score.
*   **Integration Handshakes**: Synchronous digital checklists simulating verification with SARS and CIPC registers.
*   **SME Tasks**:
    *   Uploads active compliance files: **CIPC Registration Document (CoR14.3)**, **SARS Tax Clearance Certificate**, and **BBBEE Affidavit or Certificate**.
    *   Completes the 10-point interactive Diagnostic Questionnaire assessing operational maturity (Financial Systems, HR Policies, Technology Adoption, Market Reach, Compliance, Procurement).
*   **Admin Tasks**:
    *   Inspects submitted documentation for visual consistency and validity via the **SME Audit Desk**.
    *   Triggers the automated validation check for SARS and CIPC registration accuracy.
    *   Sets compliance status to \`VERIFIED\` or flags back to SME as \`ACTION_REQUIRED\` with text-based feedback.
*   **State Machine Transition**: \`DRAFT\` ➔ \`PRE_ASSIGNED\` (State Key: \`SYS_INT_02\`)

### 🤝 3. Admin Matching (Resource Allocation)
*   **System Action**: Isolates the capability gaps identified in the Needs Assessment, maps them to the 6 strategic pillars, and executes matchmaking analytics against registered Provider profiles.
*   **Matching Metrics**: Match score computed using Provider expertise, geographic proximity (province), active caseload, and available capacity.
*   **Admin Tasks**:
    *   Opens the interactive **Provider Allocation Matrix**.
    *   Filters registered service providers based on required pillar alignment, current load, and regional proximity.
    *   Selects and assigns the best-fit Portal Provider to the SME's custom capability program.
    *   Publishes the matched allocation to both SME and Provider dashboards.
*   **State Machine Transition**: \`PRE_ASSIGNED\` ➔ \`PRE_ASSIGNED_VERIFIED\` ➔ \`INTAKE_SCHEDULED\` (State Key: \`SYS_INT_03\`)

### 🎓 4. Provider Intake
*   **System Action**: Dispatches immediate notification events. Locks the assigned SME profile details into the matching Provider’s workspace, keeping all other SMEs strictly isolated.
*   **Portal Provider Tasks**:
    *   Logs in to inspect the newly allocated SME’s diagnostic maturity scorecard.
    *   Accepts the docket allocation to acknowledge active ownership.
    *   Initiates direct communication with the SME.
    *   Formulates a custom implementation roadmap and uploads the milestone schedule.
*   **SME Tasks**:
    *   Receives system notification introducing their matched Provider.
    *   Accesses the shared portal workspace to view the Provider's profile and contact card.
*   **State Machine Transition**: \`INTAKE_SCHEDULED\` ➔ \`ACTIVE\` (State Key: \`SYS_INT_04\`)

### 📈 5. Program Execution
*   **System Action**: Tracks live milestones, logs coaching sessions, and monitors completion speed. Runs automated status updates as tasks progress.
*   **SME Tasks**:
    *   Attends designated coaching and workshop sessions.
    *   Completes operational deliverables (e.g., drafting a business plan or installing a digital management tool).
    *   Collaborates on milestones inside the mutual milestone board.
*   **Portal Provider Tasks**:
    *   Delivers high-impact mentoring and technical support aligned with the matching pillar.
    *   Logs active advisory hours (e.g., session date, duration, description, and outcomes).
    *   Checks off completed tasks.
    *   Requests formal milestone sign-offs from the SME.
*   **State Machine Transition**: \`ACTIVE\` ➔ \`ACTIVE_TO_COMPLETED\` (State Key: \`SYS_INT_05\`)

### 💾 6. Completion & Logs
*   **System Action**: Compiles the historical audit trail, signs off the training docket with a secure digital handshake, permanently archives session records, and updates the aggregated Fund performance metrics.
*   **SME Tasks**:
    *   Reviews final deliverables.
    *   Digitally signs off to acknowledge successful training completion.
*   **Portal Provider Tasks**:
    *   Constructs and submits the final SMME Verification Dossier summarizing the intervention.
*   **Admin Tasks**:
    *   Reviews the intervention history and final signed-off dossier.
    *   Issues the digital Capability Verification Certificate.
    *   Inspects the programmatic **Performance Dashboard** for service provider delivery times and impact outcomes.
*   **State Machine Transition**: \`ACTIVE_TO_COMPLETED\` ➔ \`ARCHIVED\` (State Key: \`SYS_INT_06\`)

---

## 🎨 Bespoke Custom Iconography & Design System Spec

### 💎 Agency-Grade Custom Iconography Standards
*   **Viewport & Vector Grid**: Built on an optical 24x24 pixel vector canvas with 1.75px uniform stroke weights, rounded caps (\`strokeLinecap="round"\`), and smooth line joins (\`strokeLinejoin="round"\`).
*   **Brand Alignment**: Precision monochrome black styling with clean, unified 1-color rendering (\`stroke="black"\` / \`color="#000000"\` / \`text-black\`) enforced across 100% of system icons to eliminate multi-color clutter, combined with bespoke light mint-to-cream linear gradients (\`bg-gradient-to-r from-[#dcece1]/70 via-[#ebf4dc]/70 to-[#f8f5d7]/70\`) at 70% opacity for executive admin dashboards, designed for Stripe/Intuit/Apple-level aesthetic quality.
*   **Operational Insights Banner Spec**: Executive header card featuring sleek deep dark navy styling (\`bg-[#1B2337] border border-slate-800 text-white p-2.5 sm:p-3 rounded-2xl\`), high-contrast display typography, unified design language matching SMME & Service Provider authenticated user session cards with left 36x36 (\`w-9 h-9\`) white icon badge (\`IconInsightsAnalytics\` in high-contrast black), upper status session tag (\`EXECUTIVE SESSION OK\`), headline & subtitle, and right-hand metadata badge (\`ACTIVE AUDIT\`), relocated directly to the top-left of the application header (\`Header.tsx\`) with real-time state synchronization (\`satf-session-changed\` & \`satf-provider-changed\`), strictly right-aligned navigation menu controls with flush right-side dropdown popover menus (\`right-0\` / \`justify-end\` / \`ml-auto\`), hidden breadcrumb navigation (\`hidden\`) on Application Dossier page with optimized container spacing, standalone System Process Flow page view (\`activeView === "flow"\`) accessible directly via the footer navigation link with duplicate tab navigation buttons removed from Admin Dashboard, metric spec badges (\`[01_DRAFTS]\`, \`[02_REFERRALS]\`, \`[03_SCHEDULED]\`, \`[04_ACTIVE_JOBS]\`, \`[05_COMPLETED]\`, \`[ONLINE_ACTIVE]\`, \`[ACTIVE]\`, \`[PROBATION]\`, \`[METRIC_01]\`, \`[METRIC_02]\`, \`[METRIC_03]\`, \`[ACTIVE_CONVERSION]\`, \`[INTEL_FEED]\`, \`[COUNT_METRIC]\`, \`[DEMOGRAPHIC]\`, \`[FILTER_BY_GAP]\`, \`[VERIFIED_SURVEYS]\`, \`[ADMIN_OVERRIDE_LOG]\`, \`[CIPC_REG]\`, \`[TOTAL_SURVEYS]\`, \`[ACTIVE_ALLOCATIONS]\`, \`[SUPPORTED_SMMES]\`, \`[ACTIVE_AGENCIES]\`, \`[ALLOCATION_STABILITY]\`, \`[NATIONAL_HUB]\`) relocated to the Client Spec Centre (\`showAnnotations\` conditional overlay), streamlined Provider Portal & Admin Dashboard views with duplicate body headers hidden, updated system footer logo to "Service Provider Authentication" (\`SPA\`), complete removal of legacy Transformation Fund terminology in favor of Service Provider Authentication and Capability Framework nomenclature, updated footer copyright wording from "Wireframe Prototype" to "Wonderland Studio V1.0", refactored "Application Intake Dossier" header typography adopting the geometric high-contrast "Stadium" specimen sans-serif font family (\`font-sans font-black text-3xl sm:text-4xl uppercase leading-none\`), 100% opacity headline contrast, 70% opacity muted description rhythm, updated footer tagline and navigation links text color to \`text-transparent\` to make selected elements temporarily invisible while maintaining DOM structure and click handling, and streamlined routing where Insights login automatically transitions to the top-level Admin Dashboard view while hiding nested redundant container instances inside the Provider Portal.
*   **Operational Insights Bespoke Icon Suite**:
    *   **Overview Panel**: \`IconInsightsAnalytics\` (Bespoke analytical compass radar node)
    *   **Application Dossiers**: \`IconVerificationDossier\` (Verified capability certificate docket)
    *   **Providers Performance**: \`IconQualityShield\` (Advisory quality index & audit shield)
    *   **Allocations Tree**: \`IconAllocationMatrix\` (Allocation matrix grid node)
    *   **Gap Intelligence**: \`IconDiagnosticRadar\` (Diagnostic gap scanner radar)
    *   **System Process Flow**: \`IconRefreshSync\` (Real-time data synchronization loop)
    *   **Pipeline & Funnels**: \`IconPipelineFunnel\` & \`IconDeveloperMatch\`
    *   **Audit & Governance**: \`IconAuditTrail\` & \`IconCheckDouble\`
*   **Context-Aware Domain Mapping**:
    *   **Business Advisory**: Shield vector with strategic compass & financial ledger node.
    *   **Business Planning**: Structured document blueprint with target growth node.
    *   **Technical Assistance**: Concentric gear matrix with quality verification mark.
    *   **Skills Development**: Academic cap with capability spark badge.
    *   **Mentorship & Incubation**: Interlocking mentor-protégé connection nodes.
    *   **Digital Enablement**: Digital terminal frame with code matrix & data nodes.
    *   **Markets & Tenders**: Corporate enterprise building, public landmark pillars, export trade globe, retail store.
    *   **Portal Security**: Verified shield seal, audit checkmarks, and terminal command prompts.

---

## 👥 Multi-Role User Persona Task Matrix

### 🏢 1. SME (SMME) User
*The primary beneficiary aiming to resolve operational gaps and secure verified capability credentials.*

*   **Task 1.1: Register Profile & Upload Documents**
    *   *System Navigation*: \`Portal -> SME Dashboard -> Profile Setup\`
    *   *Action*: Key in CIPC Company Registration, SARS Tax PIN, and upload compliance papers (CIPC certificate, Tax Clearance, BBBEE affidavit).
*   **Task 1.2: Submit Needs Diagnostic**
    *   *System Navigation*: \`Portal -> SME Dashboard -> Diagnostic Needs Questionnaire\`
    *   *Action*: Complete the 10-point maturity scorecard evaluating internal processes, digital tool usage, and employee skills.
*   **Task 1.3: Track Pillar Recommendation**
    *   *System Navigation*: \`Portal -> SME Dashboard -> Recommended Pillars\`
    *   *Action*: Review automatically suggested capability pillars (e.g., *Digital Enablement*, *Technical Assistance*) based on maturity index.
*   **Task 1.4: Collaborative Milestone Tracking & Sign-off**
    *   *System Navigation*: \`Portal -> SME Dashboard -> Service Provider Board\`
    *   *Action*: Monitor advisor's deliverables, attend advisory sessions, and sign off completed training modules digitally.

---

### 🎓 2. Portal Provider (Accredited Specialist Service Provider)
*The specialized agency or coach responsible for executing customized training and capacity-building deliverables.*

*   **Task 2.1: Maintain Capacity & Profile**
    *   *System Navigation*: \`Portal -> Provider Dashboard -> Accreditation\`
    *   *Action*: Declare expert specializations across the 6 pillars, log consultant headcounts, and verify accreditation status.
*   **Task 2.2: Accept/Review Assigned SMMEs**
    *   *System Navigation*: \`Portal -> Provider Dashboard -> Assigned Pipeline\`
    *   *Action*: Review incoming allocations from the System Admin, inspect SME diagnostic scorecard summaries, and accept the docket.
*   **Task 2.3: Formulate & Upload Implementation Workplan**
    *   *System Navigation*: \`Portal -> Provider Dashboard -> Active Projects -> Milestones\`
    *   *Action*: Detail training schedules, target deliverables, and upload key milestone templates.
*   **Task 2.4: Log Progress & Request Sign-off**
    *   *System Navigation*: \`Portal -> Provider Dashboard -> Active Projects -> Verify\`
    *   *Action*: Log active coaching hours, check off completed deliverables, and trigger digital signature requests for the SMME.

---

### 👑 3. Admin (System Administrator)
*The system supervisor responsible for maintaining system integrity, matching resources, and tracking overall impact.*

*   **Task 3.1: Audit SMME Compliance & CIPC Check**
    *   *System Navigation*: \`Portal -> Admin Dashboard -> SME Audit Desk\`
    *   *Action*: Review submitted documentation, trigger automated SARS/CIPC check status, and approve profile verification status.
*   **Task 3.2: Analyze Diagnostic Needs Assessments**
    *   *System Navigation*: \`Portal -> Admin Dashboard -> Diagnostics Analytics\`
    *   *Action*: Inspect aggregated maturity scores to identify systemic capability gaps across geographic or industry segments.
*   **Task 3.3: Dynamic Allocation & Provider Matchmaking**
    *   *System Navigation*: \`Portal -> Admin Dashboard -> Allocation Matrix\`
    *   *Action*: Match verified SMMEs with the best-fit Portal Providers based on matching specialties, available capacity, and geographic location.
*   **Task 3.4: Supervise System-wide Performance**
    *   *System Navigation*: \`Portal -> Admin Dashboard -> Performance Dashboard\`
    *   *Action*: Monitor program metrics including average completion days, active allocations, fund distribution, and successful SMME development scores.

---

## 🏗️ Technical Architecture & Data Models

To ensure high-performance execution, the portal integrates with a unified database schema capturing core model relations:

### 📊 1. SMME Schema (\`smes\`)
| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| \`id\` | \`uuid\` (PK) | Unique identifier for the SMME. |
| \`registered_name\` | \`varchar\` | Registered legal entity name. |
| \`cipc_number\` | \`varchar\` (Unique) | CIPC registration number. |
| \`tax_pin\` | \`varchar\` | SARS Tax clearance pin. |
| \`province\` | \`varchar\` | South African province of operations. |
| \`compliance_status\`| \`enum\` | Status: \`DRAFT\`, \`PENDING_VERIFICATION\`, \`VERIFIED\`, \`REJECTED\`. |
| \`maturity_scores\` | \`jsonb\` | Detail scores across the 10 diagnostic indicators. |

### 🎓 2. Service Provider Schema (\`providers\`)
| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| \`id\` | \`uuid\` (PK) | Unique identifier for the provider. |
| \`provider_name\` | \`varchar\` | Accredited service provider firm name. |
| \`accredited_pillars\`| \`varchar[]\` | Array of accredited capability pillars. |
| \`max_capacity\` | \`integer\` | Maximum concurrent SME workload. |
| \`active_caseload\` | \`integer\` | Current active SME allocations. |
| \`location_province\`| \`varchar\` | Regional operations base. |

### 🔗 3. Allocation & Milestones Schema (\`allocations\` & \`milestones\`)
| Field Name | Data Type | Description |
| :--- | :--- | :--- |
| \`id\` | \`uuid\` (PK) | Unique identifier for the allocation. |
| \`sme_id\` | \`uuid\` (FK) | Maps back to the allocated SMME. |
| \`provider_id\` | \`uuid\` (FK) | Maps to the allocated Service Provider. |
| \`assigned_pillar\` | \`varchar\` | Strategic pillar allocated for training. |
| \`milestones_list\` | \`jsonb\` | Array of milestones with status and sign-offs. |
| \`start_date\` | \`timestamp\` | Allocation commencement date. |
| \`completion_status\`| \`enum\` | Status: \`PLANNING\`, \`ACTIVE_EXECUTION\`, \`COMPLETED\`. |

---

## 📊 Capability Performance & Reporting Hub

This operational framework consolidates multi-tenant diagnostic outcomes, milestone delivery times, and qualitative user feedback to drive real-time accountability and strategic resource planning.

### ⚙️ 1. Analytical Recalculation Engine
*   **System Action**: Whenever an SME or Admin registers a performance survey, the system executes an asynchronous transactional trigger that recalculates rolling averages for the associated Service Provider.
*   **Metrics Formulae**:
    *   **Provider Quality Index ($PQI$)**: Calculated as a weighted rolling average:
        $$PQI = \frac{\sum_{i=1}^{n} (Rating_i \times Weight_i)}{\sum_{i=1}^{n} Weight_i}$$
        *Where $Weight$ is adjusted based on completion status (e.g., active vs. finalized interventions).*
    *   **Systemic Gap Frequency ($SGF_{gap}$)**: Traces relative national scarcity for specific business capabilities:
        $$SGF_{gap} = \left( \frac{\text{Count of SMMEs Reporting "NO" or "NOT\_SURE" on Checkpoint}}{\text{Total Registered SMMEs Checked}} \right) \times 100$$

### 📂 2. Admin & Provider Operations
*   **System Admin Tasks**:
    *   **National Gaps Audit**: Reviews the live ranking table to identify critical structural failures across the SME ecosystem.
    *   **Off-line Survey Entry**: Manually keys in hardcopy feedback questionnaires received during regional field visits, ensuring complete digitisation.
    *   **Probation Triaging**: Toggles underperforming agencies ($PQI < 3.5$) into \`PROBATION\` status, temporarily halting new SME pipeline routing.
*   **Specialist Provider Tasks**:
    *   **Anonymised Review Analytics**: Reviews qualitative feedback logs to improve advisory methodology and training syllabi.
    *   **Performance Benchmarking**: Compares agency milestone execution velocities against the national average.

### 🗄️ 3. Reporting Schema Definitions
The reporting engine operates over two primary logical views compiled on the relational data store:

#### View 1: Provider Performance Dashboard (\`v_provider_performance\`)
\`\`\`sql
CREATE VIEW v_provider_performance AS
SELECT 
    p.id AS provider_id,
    p.provider_name,
    p.specialty,
    COUNT(a.id) AS total_allocations,
    COUNT(CASE WHEN a.completion_status = 'COMPLETED' THEN 1 END) AS completed_allocations,
    COALESCE(AVG(r.rating), 5.0) AS avg_rating,
    p.status AS accreditation_status
FROM providers p
LEFT JOIN allocations a ON p.id = a.provider_id
LEFT JOIN reviews r ON p.id = r.provider_id
GROUP BY p.id, p.provider_name, p.specialty, p.status;
\`\`\`

#### View 2: National Gap Analytics (\`v_systemic_gaps_ranking\`)
\`\`\`sql
CREATE VIEW v_systemic_gaps_ranking AS
SELECT 
    gap_key,
    gap_text,
    pillar_category,
    COUNT(sme_id) AS total_reported_need,
    ROUND((COUNT(sme_id)::numeric / NULLIF((SELECT COUNT(*) FROM smes), 0)::numeric) * 100, 2) AS systemic_frequency_pct
FROM smme_diagnostic_responses
WHERE response_value IN ('NO', 'NOT_SURE')
GROUP BY gap_key, gap_text, pillar_category;
\`\`\`

---

## 🔒 Security, Compliance & System Audits

1.  **Multi-Tenant Isolation**: Cryptographic boundaries ensure Portal Providers only access data of SMMEs actively assigned to them.
2.  **Immutability**: Completed milestone sign-offs and compliance verdicts trigger permanent system logs that cannot be edited or deleted.
3.  **Manual Override Protocol**: All manual overrides of recommended pillars or provider matching by the Admin must be logged under the \`manualOverride\` flag accompanied by mandatory textual justification.

---

## 🎨 Visual UI & Design Reference Specification

The system UI enforces a modern, high-contrast visual design system inspired by premium UI design references (including Fishbowl & Crextio soft pastel mesh card aesthetics):

*   **Pastel Mesh Canvas Gradient**: Soft, multi-radial mesh background gradient smoothly transitioning from fresh mint green (\`#d1fae5\` / \`#ecfdf5\`) to warm cream/peach (\`#fef3c7\` / \`#ffedd5\`) with a subtle fixed grid texture (\`blueprint-grid\`), giving a clean, floating dashboard ambiance.
*   **Floating Card Architecture**: Clean, high-contrast light cards with generous rounded corners (\`rounded-3xl\` / \`28px\`), semi-translucent backdrop glass (\`bg-white/92 backdrop-blur-md\`), framed by soft borders (\`border-slate-200/80\` or \`border-emerald-100/60\`) and diffused elevation drop shadows (\`shadow-[0_14px_40px_-10px_rgba(15,23,42,0.05)]\`).
*   **Pills & Contrast Accents**: Soft rounded pill-shaped controls (\`rounded-full\`), vibrant blue action buttons (\`bg-blue-600 hover:bg-blue-700 text-white\`), dark slate contrast tags (\`bg-slate-900 text-white rounded-full\`), and mint green status badges (\`bg-emerald-100 text-emerald-900\`).
*   **Typographic Hierarchy**: Distinctive \`font-mono\` labels for technical metadata tags, spec badges, and pill controls paired with high-legibility sans-serif body copy (\`font-sans\`) and bold heading display typography (\`font-display\`).
*   **Interactive Controls & Annotation Toggle**: Pill-shaped action buttons, rounded step indicator tags, micro-interaction hover scales (\`hover:-translate-y-1\`), and dynamic spec annotation hiding synced with the Client Demo Center slider state.
*   **Content Preservation**: Strict 100% adherence to supplied text, section structures, and legal/programmatic copy verbatim across all track views.
`;

interface StepDetail {
  id: number;
  title: string;
  subtitle: string;
  actor: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  dataMutations: string[];
  mockCode: string;
  statusBadge: string;
}

// Complete operational schema
const SMME_LIFECYCLE_JSON_BLUEPRINT = {
  "$schema": "https://service-provider-auth.gov.za/schemas/smme-lifecycle-v2.json",
  "blueprintName": "End-to-End SMME Capability Lifecycle",
  "version": "2.1.0",
  "lastUpdated": "2026-07-21",
  "environment": "Service Provider Authentication Production Environment",
  "description": "High-level operational JSON blueprint illustrating the end-to-end SMME lifecycle spanning Initial Intake, Automated SARS/CIPC Checks, Diagnostic Needs Assessment, Capability recommendations, and final Service Provider matchmaking.",
  "stages": [
    {
      "stageId": "LIFECYCLE-STG-01",
      "stageNumber": 1,
      "stageName": "Initial Intake",
      "status": "DRAFT",
      "actor": "Applicant (SMME)",
      "trigger": "SMME submits digital profile details and registers credentials on the Service Provider Authentication hub.",
      "inputsRequired": [
        "Company Name & Owner credentials",
        "SARS Tax Clearance PIN",
        "CIPC Registration ID",
        "Contact Information"
      ],
      "actions": [
        "Initialize draft application file",
        "Persist metadata to local state container",
        "Enforce basic eligibility checks"
      ],
      "metadata": {
        "encryption": "AES-256",
        "retentionPeriod": "7 Years",
        "isRevisable": true
      }
    },
    {
      "stageId": "LIFECYCLE-STG-02",
      "stageNumber": 2,
      "stageName": "Automated Compliance & Needs Assessment",
      "status": "PRE_ASSIGNED",
      "actor": "Compliance System Engine",
      "trigger": "SMME triggers the automated verification run and finishes the 10-point Needs Assessment Diagnostic.",
      "inputsRequired": [
        "Diagnostic Questionnaire Responses",
        "Active Business Ingress Parameters"
      ],
      "actions": [
        "Trigger live mock verification with external tax registers",
        "Establish baseline Diagnostic Capability Matrix and identify competency gaps"
      ],
      "metadata": {
        "autoTriage": true,
        "maxScorePossible": 100,
        "alertOnFailure": "Compliance Team Flag"
      }
    },
    {
      "stageId": "LIFECYCLE-STG-03",
      "stageNumber": 3,
      "stageName": "Capability Recommendation & Pillar Alignment",
      "status": "PRE_ASSIGNED_VERIFIED",
      "actor": "System Diagnostic Engine",
      "trigger": "Needs Assessment algorithm processes the SMME score and flags corresponding support pillars.",
      "inputsRequired": [
        "Maturity indices scorecards",
        "Targeted diagnostic gap alerts"
      ],
      "actions": [
        "Generate automated Capability Recommendation PDF",
        "Pre-flag matching Capability Pillars (e.g., Digital Enablement, Business Advisory, Mentorship)"
      ],
      "metadata": {
        "dynamicRulesEngine": "v3.2",
        "autoFlagThreshold": 40
      }
    },
    {
      "stageId": "LIFECYCLE-STG-04",
      "stageNumber": 4,
      "stageName": "Provider Match Intervention",
      "status": "INTAKE_SCHEDULED",
      "actor": "Fund Administrator",
      "trigger": "Fund Administrator reviews the dossier, verifies recommendations, and links accredited specialist providers.",
      "inputsRequired": [
        "Accredited Provider registries",
        "SMME assigned pillars dossier"
      ],
      "actions": [
        "Admin assigns specific Service Providers for each active pillar",
        "Route SMME docket to the selected provider's live portal queue"
      ],
      "metadata": {
        "manualOverride": true,
        "allowMultipleProviders": true
      }
    },
    {
      "stageId": "LIFECYCLE-STG-05",
      "stageNumber": 5,
      "stageName": "Program Execution & Sign-Off",
      "status": "ACTIVE_TO_COMPLETED",
      "actor": "Specialist Provider & SMME",
      "trigger": "Matched Provider initiates the physical session, records intake minutes, and registers milestone execution.",
      "inputsRequired": [
        "Intake scheduled date & agendas",
        "Milestone progress logs",
        "SMME satisfaction signatures"
      ],
      "actions": [
        "Conduct targeted advisory programs",
        "Log operational training milestones",
        "Submit final completion files to close and lock the dossier"
      ],
      "metadata": {
        "isAuditable": true,
        "signatureRequired": true
      }
    }
  ],
  "systemIntegrations": {
    "CIPC_REGISTRY": "Company validation endpoint",
    "SARS_PIN_CHECK": "Tax clearance checker",
    "ANALYTICS_AGGREGATOR": "Real-time metrics and demographic intelligence feed"
  }
};

const SYSTEM_STEPS: StepDetail[] = [
  {
    id: 1,
    title: "Application Intake",
    subtitle: "SMME Business Ingress",
    actor: "Applicant (SMME)",
    icon: FileText,
    description: "The business takes the Diagnostic Eligibility Wizard or directly fills out the Application Intake Dossier. They select requested pillars (e.g., Business Advisory, Digital Enablement) and upload compliance credentials.",
    dataMutations: [
      "INSERT INTO satf_applications VALUES (app_id, status='Draft', requested_services, ...)",
      "SET localStorage.getItem('satf_applications')"
    ],
    statusBadge: "Draft / Form Submission",
    mockCode: `function submitApplication(formData) {
  const newApp = {
    id: 'APP_' + Math.random().toString(36).substr(2, 9),
    status: 'Draft',
    submittedAt: new Date().toISOString(),
    ...formData
  };
  const current = JSON.parse(localStorage.getItem('satf_applications') || '[]');
  localStorage.setItem('satf_applications', JSON.stringify([...current, newApp]));
  triggerEvent('blueprint-submit-success');
}`
  },
  {
    id: 2,
    title: "Compliance Checking",
    subtitle: "Automated API Triaging",
    actor: "System Engine (Auto-Job)",
    icon: Cpu,
    description: "Automated compliance modules run background checks mimicking CIPC (Company registration validity) and SARS (Tax compliance checks). If matching constraints pass, status is promoted.",
    dataMutations: [
      "UPDATE satf_applications SET status='Pre-Assigned', compliance_valid=true WHERE id=app_id"
    ],
    statusBadge: "Pre-Assigned",
    mockCode: `function checkCompliance(app) {
  const isSarsValid = mockSarsVerification(app.taxNumber);
  const isCipcValid = mockCipcVerification(app.registrationNumber);
  
  if (isSarsValid && isCipcValid) {
    app.status = 'Pre-Assigned';
    app.autoVerified = true;
  } else {
    app.status = 'Draft';
    app.autoVerified = false;
  }
  updateApplicationsStorage(app);
}`
  },
  {
    id: 3,
    title: "Admin Matching",
    subtitle: "Pillar Allocation & Assignment",
    actor: "Fund Administrator",
    icon: UserCheck,
    description: "The Administrator reviews the dossier, diagnostic gaps, and active pillars in the Admin Dashboard. Admin can manually reassign specific Service Providers for each of the SMME's chosen pillars.",
    dataMutations: [
      "UPDATE satf_applications SET assignedProviders = { [pillar]: provider_id }, status='Intake Scheduled' WHERE id=app_id"
    ],
    statusBadge: "Intake Scheduled",
    mockCode: `function assignProviderForSpecialty(appId, specialty, providerId) {
  const nextApps = applications.map(app => {
    if (app.id === appId) {
      return {
        ...app,
        assignedProviders: {
          ...(app.assignedProviders || {}),
          [specialty]: providerId
        },
        status: 'Intake Scheduled'
      };
    }
    return app;
  });
  localStorage.setItem('satf_applications', JSON.stringify(nextApps));
}`
  },
  {
    id: 4,
    title: "Provider Intake",
    subtitle: "Engagement & Diagnostics",
    actor: "Approved Service Provider",
    icon: Calendar,
    description: "The assigned Service Provider logs into the Provider Portal. They only see SMMEs allocated to their specialty. The provider schedules a formal intake session, writes initial session minutes, and activates the project.",
    dataMutations: [
      "UPDATE satf_applications SET status='Active', intake_scheduled_date=..., session_minutes=... WHERE id=app_id"
    ],
    statusBadge: "Active (Intake Done)",
    mockCode: `function scheduleIntake(appId, dateTime, notes) {
  const updatedApps = applications.map(app => {
    if (app.id === appId) {
      return {
        ...app,
        status: 'Active',
        intakeDate: dateTime,
        intakeNotes: notes
      };
    }
    return app;
  });
  localStorage.setItem('satf_applications', JSON.stringify(updatedApps));
}`
  },
  {
    id: 5,
    title: "Program Execution",
    subtitle: "Capability Enrolment",
    actor: "SMME & Provider",
    icon: Activity,
    description: "The business undergoes training, advisory sessions, or system setups. Providers submit ongoing milestone logs, upload progress documents, and keep track of actual hour completion records.",
    dataMutations: [
      "UPDATE satf_applications SET completion_percentage=X, milestone_logs=[...] WHERE id=app_id"
    ],
    statusBadge: "Active (In-Progress)",
    mockCode: `function submitMilestoneProgress(appId, milestoneText, hoursWorked) {
  const nextApps = applications.map(app => {
    if (app.id === appId) {
      const logs = app.milestoneLogs || [];
      return {
        ...app,
        milestoneLogs: [...logs, { text: milestoneText, date: new Date(), hours: hoursWorked }]
      };
    }
    return app;
  });
  updateApplicationsStorage(nextApps);
}`
  },
  {
    id: 6,
    title: "Completion & Logs",
    subtitle: "Program Finalization",
    actor: "System & Provider",
    icon: CheckCircle,
    description: "Once all milestones are satisfied, the job is marked 'Completed'. Completion records are locked, and metrics feed directly into the Admin Dashboard's real-time performance and demographic intelligence analytics.",
    dataMutations: [
      "UPDATE satf_applications SET status='Completed', completedAt=... WHERE id=app_id",
      "REFRESH admin_dashboard_intelligence_views()"
    ],
    statusBadge: "Completed",
    mockCode: `function finalizeApplication(appId) {
  const nextApps = applications.map(app => {
    if (app.id === appId) {
      return { ...app, status: 'Completed', completedAt: new Date().toISOString() };
    }
    return app;
  });
  localStorage.setItem('satf_applications', JSON.stringify(nextApps));
  // System dashboard updates instantly from synchronized state
}`
  }
];

interface SystemProcessFlowProps {
  showAnnotations?: boolean;
}

export default function SystemProcessFlow({ showAnnotations = true }: SystemProcessFlowProps) {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [isPlayingSimulation, setIsPlayingSimulation] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0); // 0: Idle, 1..6 correspond to SYSTEM_STEPS
  const [dummySmmeName, setDummySmmeName] = useState("Lindiwe's Logistics");
  const [dummyPillar, setDummyPillar] = useState("Digital Enablement");
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  // States for the custom high-level JSON Process Flow diagram visualizer
  const [selectedJsonStageId, setSelectedJsonStageId] = useState<string>("LIFECYCLE-STG-01");
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // States for Interactive Markdown Process Flow Documenter
  const [markdownDoc, setMarkdownDoc] = useState(LIFECYCLE_MARKDOWN_DOC);
  const [markdownViewMode, setMarkdownViewMode] = useState<"rendered" | "raw">("rendered");
  const [isSpecOpen, setIsSpecOpen] = useState(false);

  useEffect(() => {
    if (!showAnnotations) {
      setIsSpecOpen(false);
    }
  }, [showAnnotations]);

  // Simulation controls
  useEffect(() => {
    let interval: any = null;
    if (isPlayingSimulation) {
      interval = setInterval(() => {
        setSimulationStep((prev) => {
          if (prev >= 6) {
            setIsPlayingSimulation(false);
            addLog("🎉 [SIMULATION_COMPLETE]: Sample Dossier fully processed from Intake to Completion!");
            return 6;
          }
          const next = prev + 1;
          setActiveStepId(next);
          triggerLogForStep(next);
          return next;
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlayingSimulation]);

  const addLog = (msg: string) => {
    setSimulationLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 15)]);
  };

  const startSimulation = () => {
    setSimulationStep(1);
    setActiveStepId(1);
    setIsPlayingSimulation(true);
    setSimulationLogs([]);
    addLog(`🚀 [SIMULATION_STARTED]: Creating file docket for "${dummySmmeName}" requesting pillar "${dummyPillar}"`);
    triggerLogForStep(1);
  };

  const resetSimulation = () => {
    setIsPlayingSimulation(false);
    setSimulationStep(0);
    setActiveStepId(1);
    setSimulationLogs([]);
    addLog("♻️ [SIMULATION_RESET]: Ready for a new execution cycle.");
  };

  const triggerLogForStep = (stepNo: number) => {
    switch (stepNo) {
      case 1:
        addLog(`✍️ [STAGE_1]: "${dummySmmeName}" submitted an intake form. Payload containing status='Draft' and requested_services=['${dummyPillar}'] serialized and saved.`);
        break;
      case 2:
        addLog(`🤖 [STAGE_2]: Automated Compliance Module triggered. Executing CIPC registration match and SARS tax compliance check. Status updated to 'Pre-Assigned'.`);
        break;
      case 3:
        addLog(`⚙️ [STAGE_3]: Fund Administrator opened Admin Dashboard, evaluated diagnostic report, and reassigned custom specialist provider to "${dummySmmeName}". Status updated to 'Intake Scheduled'.`);
        break;
      case 4:
        addLog(`📅 [STAGE_4]: Service Provider logged into Provider Portal, viewed assigned list, and scheduled intake session with "${dummySmmeName}". Session minutes logged. Status set to 'Active'.`);
        break;
      case 5:
        addLog(`⚡ [STAGE_5]: Program under implementation. Milestone logged: "Initial system configuration and website framework completed." Milestone progress saved.`);
        break;
      case 6:
        addLog(`🏁 [STAGE_6]: Provider submitted Completion Sign-off. Status set to 'Completed'. Real-time metrics recalculated in Administration Intelligence Panel.`);
        break;
      default:
        break;
    }
  };

  // Handle high-level JSON process flow download
  const handleDownloadBlueprintJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SMME_LIFECYCLE_JSON_BLUEPRINT, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "satf_smme_lifecycle_blueprint.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Handle copy JSON blueprint to clipboard
  const handleCopyBlueprintJson = () => {
    navigator.clipboard.writeText(JSON.stringify(SMME_LIFECYCLE_JSON_BLUEPRINT, null, 2));
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const selectedStep = SYSTEM_STEPS.find(s => s.id === activeStepId) || SYSTEM_STEPS[0];
  const activeJsonStage = SMME_LIFECYCLE_JSON_BLUEPRINT.stages.find(stg => stg.stageId === selectedJsonStageId) || SMME_LIFECYCLE_JSON_BLUEPRINT.stages[0];

  return (
    <div className="space-y-8" id="system-process-flow-container">
      
      {/* Overview Block */}
      <div className="bg-white border-2 border-slate-900 p-6 sm:p-8 wire-shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="font-mono text-[9px] font-bold text-slate-400 block tracking-widest">[SYS_DIAGRAM_V2]</span>
            <h3 className="font-mono font-extrabold text-2xl text-slate-900 uppercase">
              End-to-End System Process Flow
            </h3>
            <p className="text-xs text-slate-600 font-sans max-w-2xl leading-relaxed">
              Understand the operational state-machine of the Service Provider Authentication system. This blueprint details how SMME applications transit from customer-facing intake forms, through background compliance engines, administrative controllers, and specialized provider workflows.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveStepId(1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-950 font-mono text-[10px] px-3 py-1.5 uppercase font-bold"
            >
              [RESET_DIAGRAM_VIEW]
            </button>
          </div>
        </div>

        {/* Dynamic Timeline Flow Indicator */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 pt-6 relative">
          {SYSTEM_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStepId === step.id;
            const isSimActive = simulationStep === step.id;
            
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  if (!isPlayingSimulation) {
                    setActiveStepId(step.id);
                  }
                }}
                disabled={isPlayingSimulation}
                className={`flex flex-col p-3 border-2 text-left relative transition-all duration-150 rounded-none focus:outline-hidden ${
                  isPlayingSimulation ? "cursor-not-allowed" : "cursor-pointer"
                } ${
                  isSelected 
                    ? "bg-slate-900 border-slate-900 text-white wire-shadow-sm scale-[1.02]" 
                    : isSimActive
                    ? "bg-amber-100 border-amber-400 text-slate-900"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-900/10 text-slate-700"
                }`}
                id={`flow-step-${step.id}`}
              >
                {/* Horizontal line connector for desktop */}
                {idx < SYSTEM_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-[2px] bg-slate-400 -z-10" />
                )}

                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`font-mono text-[9px] font-black p-0.5 px-1.5 ${
                    isSelected ? "bg-amber-400 text-slate-900" : "bg-slate-200 text-slate-700"
                  }`}>
                    0{step.id}
                  </span>
                  {isSimActive && (
                    <span className="animate-ping w-2 h-2 rounded-full bg-amber-500" />
                  )}
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-white" : "text-slate-900"}`} />
                  <span className="font-mono font-bold text-[10px] uppercase truncate leading-none">
                    {step.title}
                  </span>
                </div>

                <p className={`text-[9px] font-sans leading-tight line-clamp-2 ${
                  isSelected ? "text-slate-300" : "text-slate-500"
                }`}>
                  {step.subtitle}
                </p>

                {/* Progress highlight underneath step */}
                {simulationStep >= step.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-column panel: Detailed Step Specifications and Interactive Live Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Step Inspector */}
        <div className="lg:col-span-7 bg-white border-2 border-slate-900 p-6 sm:p-8 wire-shadow-lg space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 font-mono">
              <Layers className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold uppercase text-slate-500">[STEP_SPECIFICATION_DOSSIER]</span>
            </div>
            <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[9px] font-bold py-0.5 px-2 uppercase">
              Active Focus: Step {selectedStep.id}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Step Information */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-amber-600 font-mono font-bold uppercase block tracking-wider">
                  ROLE / ACTOR: {selectedStep.actor}
                </span>
                <h4 className="font-mono font-extrabold text-lg text-slate-900 leading-tight">
                  {selectedStep.id}. {selectedStep.title}
                </h4>
                <p className="text-[10px] font-mono text-slate-400">{selectedStep.subtitle}</p>
              </div>

              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                {selectedStep.description}
              </p>

              <div className="p-3 bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[9px] font-mono font-black text-slate-500 uppercase block">
                  🛡️ State-Machine Badge:
                </span>
                <span className="inline-block bg-slate-900 text-white font-mono text-[9px] font-bold px-2 py-1 uppercase">
                  {selectedStep.statusBadge}
                </span>
              </div>
            </div>

            {/* Simulated Storage Mutations */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-slate-500 uppercase">
                  <Database className="w-3.5 h-3.5" />
                  <span>Persistent Storage Changes (LocalStorage):</span>
                </div>
                
                <div className="space-y-1">
                  {selectedStep.dataMutations.map((mutation, i) => (
                    <div key={i} className="bg-slate-950 text-emerald-400 p-2 font-mono text-[9px] border border-slate-900 leading-snug break-all">
                      {mutation}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[9px] font-bold text-slate-500 uppercase block">
                  ⚙️ System Event Triggers:
                </span>
                <ul className="text-xs space-y-1 text-slate-600 pl-4 list-disc font-sans">
                  <li>Synchronizes local lists across parallel browser storage states</li>
                  <li>Informs Admin pipeline micro-counters dynamically</li>
                  <li>Locks records securely if final state reached</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Code Inspection Panel */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5 font-bold uppercase">
                <Terminal className="w-3.5 h-3.5" />
                [SIMULATED_STATE_MUTATION_ALGORITHM.TS]
              </span>
              <span className="text-[9px] text-slate-400">TypeScript / React Hook Context</span>
            </div>

            <div className="bg-slate-900 text-slate-100 p-3.5 font-mono text-[10px] overflow-x-auto border border-slate-950 leading-relaxed max-h-[180px] overflow-y-auto">
              <pre>{selectedStep.mockCode}</pre>
            </div>
          </div>

        </div>

        {/* Right Column: Live End-to-End Simulator Console */}
        <div className="lg:col-span-5 bg-slate-950 text-slate-100 border-2 border-slate-900 p-6 wire-shadow-lg flex flex-col justify-between self-stretch">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-400">
                <Play className="w-3.5 h-3.5 fill-amber-400" />
                <span>[LIVE_SYSTEM_SIMULATOR_V2]</span>
              </div>
              <span className="bg-slate-800 text-[8px] font-mono px-2 py-0.5 border border-slate-700 uppercase font-bold text-slate-300">
                {isPlayingSimulation ? "● RUNNING_PIPELINE" : "■ STANDBY"}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Define a test SMME below, then launch the simulation to trace their application data flow through each automated micro-service and state-machine block in the diagram.
            </p>

            {/* Test Configuration Inputs */}
            <div className="space-y-3 bg-slate-900/50 p-3.5 border border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[8px] text-slate-400 uppercase font-mono font-bold block">SMME_NAME:</label>
                  <input
                    type="text"
                    value={dummySmmeName}
                    onChange={(e) => setDummySmmeName(e.target.value)}
                    disabled={isPlayingSimulation}
                    className="w-full bg-slate-950 border border-slate-750 p-1.5 font-mono text-[10px] text-white focus:outline-hidden disabled:opacity-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-slate-400 uppercase font-mono font-bold block">TARGET_SUPPORT_PILLAR:</label>
                  <select
                    value={dummyPillar}
                    onChange={(e) => setDummyPillar(e.target.value)}
                    disabled={isPlayingSimulation}
                    className="w-full bg-slate-950 border border-slate-750 p-1.5 font-mono text-[10px] text-white focus:outline-hidden disabled:opacity-50"
                  >
                    <option value="Digital Enablement">Digital Enablement</option>
                    <option value="Business Advisory">Business Advisory</option>
                    <option value="Business Planning">Business Planning</option>
                    <option value="Technical Assistance">Technical Assistance</option>
                    <option value="Mentorship & Incubation">Mentorship & Incubation</option>
                    <option value="Skills Development">Skills Development</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main Interactive Controls */}
            <div className="flex gap-2">
              {!isPlayingSimulation && simulationStep === 0 ? (
                <button
                  type="button"
                  onClick={startSimulation}
                  className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-bold text-xs py-3 px-4 border border-amber-500 uppercase flex items-center justify-center gap-1.5 cursor-pointer active:translate-y-[1px]"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                  [START_EXECUTION_PIPELINE]
                </button>
              ) : isPlayingSimulation ? (
                <div className="flex-1 bg-slate-900 border border-slate-700 text-amber-400 font-mono text-center py-2.5 text-xs animate-pulse font-bold flex items-center justify-center gap-2">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  SIMULATING_STAGE_0{simulationStep}... PLEASE WAIT
                </div>
              ) : (
                <button
                  type="button"
                  onClick={resetSimulation}
                  className="flex-1 bg-slate-800 hover:bg-slate-750 text-white font-mono font-bold text-xs py-3 px-4 border border-slate-700 uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  [RESET_CONSOLE_STATE]
                </button>
              )}
            </div>

            {/* Console Log Screen */}
            <div className="space-y-2">
              <span className="text-[8px] text-slate-400 uppercase font-mono font-bold block">SIMULATOR_OUTPUT_STREAM:</span>
              <div className="bg-slate-950 border border-slate-800 h-[190px] p-3 overflow-y-auto font-mono text-[9px] text-slate-300 space-y-2 select-all relative scrollbar-thin">
                {simulationLogs.length === 0 ? (
                  <div className="text-slate-500 text-center pt-16 uppercase">
                    [NO_SIMULATION_ACTIVE_CLICK_START]
                  </div>
                ) : (
                  simulationLogs.map((log, index) => (
                    <div 
                      key={index} 
                      className={`leading-relaxed border-b border-slate-900 pb-1.5 last:border-b-0 ${
                        index === 0 ? "text-amber-300 font-bold" : ""
                      }`}
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-3 mt-6 text-center text-slate-500 font-mono text-[8px] uppercase tracking-widest flex items-center justify-center gap-1.5">
            <span>DATABASE_ENGINE_SIMULATOR_V2</span>
            <span>|</span>
            <span>SECURE_DATA_ISOLATION</span>
          </div>

        </div>

      </div>

      {/* NEW SECTION: High-Level JSON Visual Process Flow Diagram illustrating end-to-end SMME Lifecycle */}
      <div className="bg-white border-2 border-slate-900 p-6 sm:p-8 wire-shadow-lg space-y-6" id="json-lifecycle-flow-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="font-mono text-[9px] font-bold text-indigo-600 block tracking-widest">[DATA_MODEL_BLUEPRINT]</span>
            <h3 className="font-mono font-extrabold text-xl text-slate-900 uppercase flex items-center gap-2">
              <FileJson className="w-5 h-5 text-indigo-600" />
              SMME Operational Lifecycle Schema (JSON)
            </h3>
            <p className="text-xs text-slate-600 font-sans max-w-2xl leading-relaxed">
              Below is the structured visual state-machine map of the SMME lifecycle, generated natively as an exchangeable JSON Schema. Trace inputs, key triggers, actions, and administrative matching vectors for each node.
            </p>
          </div>

          {/* Download and copy actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyBlueprintJson}
              type="button"
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-900 font-mono text-[10px] px-3 py-2 uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  [COPIED_SCHEMA]
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  [COPY_JSON_TEXT]
                </>
              )}
            </button>
            <button
              onClick={handleDownloadBlueprintJson}
              type="button"
              className="bg-indigo-650 hover:bg-indigo-700 text-white border-2 border-slate-900 font-mono text-[10px] px-3.5 py-2 uppercase font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#0f172a] transition-all cursor-pointer active:translate-y-[1px] active:shadow-none"
            >
              <Download className="w-3.5 h-3.5" />
              DOWNLOAD BLUEPRINT JSON
            </button>
          </div>
        </div>

        {/* Interactive Visual graph and Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Visual Graph Nodes */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase tracking-wider">
                [INTERACTIVE_STAGE_NODES - SELECT TO INSPECT SCHEMA]
              </span>
              <div className="space-y-2.5">
                {SMME_LIFECYCLE_JSON_BLUEPRINT.stages.map((stage) => {
                  const isSelected = selectedJsonStageId === stage.stageId;
                  return (
                    <button
                      key={stage.stageId}
                      type="button"
                      onClick={() => setSelectedJsonStageId(stage.stageId)}
                      className={`w-full p-3.5 text-left border-2 transition-all relative flex items-center justify-between group ${
                        isSelected 
                          ? "bg-indigo-50 border-indigo-600 text-indigo-950 shadow-[3px_3px_0px_#4f46e5]" 
                          : "bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800 hover:border-slate-400"
                      }`}
                    >
                      {/* Left Side: Number and text */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[9px] px-1.5 py-0.5 font-bold ${
                            isSelected ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-700"
                          }`}>
                            NODE 0{stage.stageNumber}
                          </span>
                          <span className="font-mono text-[9px] text-slate-500 uppercase font-bold">
                            {stage.status}
                          </span>
                        </div>
                        <h4 className="font-mono font-black text-xs uppercase leading-tight group-hover:underline">
                          {stage.stageName}
                        </h4>
                      </div>

                      {/* Right Indicator */}
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-[10px] text-slate-500 hidden sm:inline">
                          {stage.actor}
                        </span>
                        <ArrowRight className={`w-4 h-4 transition-transform ${
                          isSelected ? "text-indigo-600 translate-x-1" : "text-slate-400 group-hover:translate-x-0.5"
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-none space-y-1 mt-4">
              <span className="font-mono text-[9px] font-bold uppercase text-slate-500 block">⚡ SYSTEM INTEGRATIONS LINKED IN SCHEMA:</span>
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[8px] text-slate-700">
                <div className="p-1 border border-slate-300 bg-white truncate" title={SMME_LIFECYCLE_JSON_BLUEPRINT.systemIntegrations.CIPC_REGISTRY}>
                  CIPC Pin Clearance
                </div>
                <div className="p-1 border border-slate-300 bg-white truncate" title={SMME_LIFECYCLE_JSON_BLUEPRINT.systemIntegrations.SARS_PIN_CHECK}>
                  SARS Compliancy
                </div>
                <div className="p-1 border border-slate-300 bg-white truncate" title={SMME_LIFECYCLE_JSON_BLUEPRINT.systemIntegrations.ANALYTICS_AGGREGATOR}>
                  Metrics Engine
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Schema Inspector Pane */}
          <div className="lg:col-span-7 bg-slate-50 border-2 border-slate-900 p-5 flex flex-col justify-between space-y-4">
            
            {/* Stage parameters info */}
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] font-bold text-slate-400 block uppercase">[JSON_STAGE_PROPERTIES]</span>
                  <h4 className="font-mono font-extrabold text-base text-slate-900 uppercase">
                    {activeJsonStage.stageName}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-slate-900 text-white font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                    ID: {activeJsonStage.stageId}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Inputs & Triggers */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-bold text-slate-500 uppercase block">🚀 STAGE_TRIGGER_EVENT:</span>
                    <p className="text-xs text-slate-700 font-sans leading-tight">
                      {activeJsonStage.trigger}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-bold text-slate-500 uppercase block">📁 REQUIRED_SCHEMATIC_INPUTS:</span>
                    <ul className="space-y-1">
                      {activeJsonStage.inputsRequired.map((inp, idx) => (
                        <li key={idx} className="font-mono text-[10px] text-slate-800 bg-white px-2 py-0.5 border border-slate-200 rounded-xs flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                          {inp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Operations & Metadata */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-bold text-slate-500 uppercase block">⚙️ EXECUTED_BLUEPRINT_ACTIONS:</span>
                    <ul className="space-y-1">
                      {activeJsonStage.actions.map((act, idx) => (
                        <li key={idx} className="font-mono text-[10px] text-slate-800 bg-white px-2 py-1 border border-slate-250 flex items-start gap-1">
                          <span className="text-slate-400 mt-0.5">↳</span>
                          <span className="leading-tight">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 bg-white border border-slate-200 rounded-none space-y-1">
                    <span className="font-mono text-[8px] font-black text-slate-400 uppercase block">🛡️ ENVELOPE_METADATA:</span>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[9px] font-mono text-slate-700">
                      {Object.entries(activeJsonStage.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-slate-100 pb-0.5">
                          <span className="text-slate-500">{key}:</span>
                          <span className="font-bold text-slate-900">{value.toString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Micro JSON code viewport representing this active node */}
            <div className="space-y-1.5 pt-3 border-t border-slate-200">
              <span className="font-mono text-[9px] font-bold text-slate-500 uppercase block">
                [LATEST_COMPILED_NODE_JSON_FRAGMENT]
              </span>
              <div className="bg-slate-900 text-slate-100 p-3 font-mono text-[9px] overflow-x-auto border border-slate-950 leading-relaxed max-h-[120px] overflow-y-auto">
                <pre>{JSON.stringify(activeJsonStage, null, 2)}</pre>
              </div>
            </div>

          </div>

        </div>

        {/* Global schema specification parameters and download callout */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-none flex-shrink-0">
              <FileJson className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="font-mono text-[9px] font-black text-indigo-700 uppercase block">[GLOBAL_BLUEPRINT_SPECIFICATIONS]</span>
              <p className="text-xs text-indigo-950 font-bold leading-tight">
                Blueprint Schema Name: "{SMME_LIFECYCLE_JSON_BLUEPRINT.blueprintName}" (v{SMME_LIFECYCLE_JSON_BLUEPRINT.version})
              </p>
              <p className="text-[10px] text-indigo-800 font-sans leading-none">
                Exchange Standard compliance: Service Provider Authentication Schema standard (SPAS-v2) | SHA-256 Verified
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono text-[9px] text-indigo-600 bg-white border border-indigo-200 px-2 py-1 font-bold">
              SYSTEM_ENVIRONMENT: PRODUCTION
            </span>
          </div>
        </div>

        {/* SECTION: High-Level Markdown Process Flow Specification */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] space-y-6 animate-fadeIn mt-8" id="markdown-lifecycle-flow-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <span className="font-mono text-[9px] font-bold text-amber-600 block tracking-widest">[MARKDOWN_LIFECYCLE_DOCUMENT]</span>
              <h3 className="font-mono font-extrabold text-xl text-slate-900 uppercase flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                Interactive Markdown Process Flow Spec
              </h3>
              <p className="text-xs text-slate-600 font-sans max-w-2xl leading-relaxed">
                An interactive Markdown-based playbook documenting standard operating protocols across Application Intake, Compliance Checking, Admin Matching, Provider Intake, Program Execution, and Completion. Switch to the editor to update specifications dynamically.
              </p>
            </div>

            {/* Toggle buttons */}
            <div className="flex items-center gap-1 border border-slate-200 p-1 bg-slate-50 shrink-0 rounded-xl">
              <button
                onClick={() => setMarkdownViewMode("rendered")}
                type="button"
                className={`font-mono text-[9px] font-bold px-3 py-1.5 uppercase transition-all rounded-lg cursor-pointer ${
                  markdownViewMode === "rendered"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                [RENDERED_PLAYBOOK]
              </button>
              <button
                onClick={() => setMarkdownViewMode("raw")}
                type="button"
                className={`font-mono text-[9px] font-bold px-3 py-1.5 uppercase transition-all rounded-lg cursor-pointer ${
                  markdownViewMode === "raw"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                [RAW_MARKDOWN_EDITOR]
              </button>
            </div>
          </div>

          {/* View / Edit Container */}
          {markdownViewMode === "raw" ? (
            <div className="space-y-2 animate-fadeIn">
              <label className="font-mono text-[9px] font-black text-slate-500 uppercase block">
                ✏️ EDIT SPECIFICATION MARKDOWN:
              </label>
              <textarea
                value={markdownDoc}
                onChange={(e) => setMarkdownDoc(e.target.value)}
                rows={16}
                className="w-full bg-slate-900 text-slate-100 p-4 font-mono text-xs border border-slate-800 rounded-xl focus:outline-hidden leading-relaxed focus:border-amber-400"
                placeholder="Write your markdown process flow protocol here..."
              />
            </div>
          ) : (
            <div className="bg-slate-50/80 border border-slate-200 p-6 sm:p-8 rounded-xl animate-fadeIn">
              <div className="markdown-body font-sans text-slate-800 text-sm leading-relaxed prose prose-slate max-w-none prose-headings:font-mono prose-headings:uppercase prose-headings:font-black prose-h1:text-xl prose-h2:text-base prose-h3:text-sm prose-ul:list-disc prose-ul:pl-5 prose-li:my-1 prose-hr:border-slate-300 prose-code:bg-slate-900 prose-code:text-amber-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-xs">
                <ReactMarkdown>{markdownDoc}</ReactMarkdown>
              </div>
            </div>
          )}

          <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-center gap-3.5">
            <div className="p-2 bg-amber-400 text-slate-950 font-black font-mono text-[10px] rounded-lg">
              INFO
            </div>
            <span className="text-[11px] text-amber-950 font-sans leading-snug">
              This live markdown spec synchronizes seamlessly inside the current workspace. Updates made to the document dynamically refresh the localized client-side representation in memory.
            </span>
          </div>
        </div>

      </div>

      {/* Small, Unintrusive Floating Toggle Icon at the Bottom of the Page */}
      {showAnnotations && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsSpecOpen(true)}
            type="button"
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-mono font-bold text-[11px] uppercase tracking-wider px-4 py-3 rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer border border-slate-800"
            title="Open System Process Flow Specification"
            id="toggle-spec-drawer-btn"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>[SPEC_PLAYBOOK]</span>
          </button>
        </div>
      )}

      {/* Slide-out Overlay Spec Playbook (Closed by Default) */}
      {isSpecOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-fadeIn" id="spec-playbook-overlay">
          {/* Backdrop */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsSpecOpen(false)} />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-2xl h-full bg-white border-l border-slate-200 shadow-2xl flex flex-col z-10 animate-slideInRight">
            
            {/* Drawer Header */}
            <div className="p-6 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-mono text-[9px] font-bold text-amber-600 block tracking-widest">[PORTAL_SPECIFICATION_CENTER]</span>
                <h3 className="font-mono font-extrabold text-lg text-slate-900 uppercase flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-500" />
                  Interactive Process Flow Spec
                </h3>
              </div>
              
              <button
                onClick={() => setIsSpecOpen(false)}
                type="button"
                className="font-mono text-[10px] font-bold px-3 py-1.5 border border-red-200 bg-red-50 hover:bg-red-100 text-red-900 rounded-lg transition-all cursor-pointer uppercase"
              >
                [Close Spec]
              </button>
            </div>

            {/* Sub-Header Control Bar */}
            <div className="px-6 py-3.5 bg-slate-100/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-slate-600 font-sans leading-tight">
                Modify live markdown spec guidelines to update system documentation.
              </p>

              {/* View/Edit toggle */}
              <div className="flex items-center gap-1 border border-slate-200 p-1 bg-white rounded-lg shrink-0 self-start sm:self-auto">
                <button
                  onClick={() => setMarkdownViewMode("rendered")}
                  type="button"
                  className={`font-mono text-[9px] font-bold px-3 py-1 uppercase transition-all rounded-md cursor-pointer ${
                    markdownViewMode === "rendered"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  [RENDERED]
                </button>
                <button
                  onClick={() => setMarkdownViewMode("raw")}
                  type="button"
                  className={`font-mono text-[9px] font-bold px-3 py-1 uppercase transition-all rounded-md cursor-pointer ${
                    markdownViewMode === "raw"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  [RAW_EDITOR]
                </button>
              </div>
            </div>

            {/* Spec Content Panel */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {markdownViewMode === "raw" ? (
                <div className="space-y-2 h-full flex flex-col">
                  <label className="font-mono text-[9px] font-black text-slate-500 uppercase block">
                    ✏️ EDIT SPECIFICATION MARKDOWN:
                  </label>
                  <textarea
                    value={markdownDoc}
                    onChange={(e) => setMarkdownDoc(e.target.value)}
                    className="flex-1 w-full bg-slate-900 text-slate-100 p-4 font-mono text-xs border border-slate-800 rounded-xl focus:outline-hidden leading-relaxed focus:border-amber-400 min-h-[350px] resize-none"
                    placeholder="Write your markdown process flow protocol here..."
                  />
                </div>
              ) : (
                <div className="bg-slate-50/80 border border-slate-200 p-5 rounded-xl min-h-[350px]">
                  <div className="markdown-body font-sans text-slate-800 text-sm leading-relaxed prose prose-slate max-w-none prose-headings:font-mono prose-headings:uppercase prose-headings:font-black prose-h1:text-lg prose-h2:text-sm prose-h3:text-xs prose-ul:list-disc prose-ul:pl-5 prose-li:my-1 prose-hr:border-slate-300 prose-code:bg-slate-900 prose-code:text-amber-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-xs">
                    <ReactMarkdown>{markdownDoc}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-amber-50/80 border-t border-slate-200 flex items-center gap-3.5">
              <div className="p-2 bg-amber-400 text-slate-950 font-bold font-mono text-[9px] rounded-md shrink-0">
                INFO
              </div>
              <span className="text-[10px] text-amber-950 font-sans leading-tight">
                This specification operates dynamically in local state memory. It can be toggled open or closed at any time using the <strong>[SPEC_PLAYBOOK]</strong> floating icon in the lower-right corner.
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}


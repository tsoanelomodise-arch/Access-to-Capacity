/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  IconPlay as Play, 
  IconTerminal as Terminal, 
  IconDatabase as Database, 
  IconFileText as FileCode, 
  IconFileText as BookOpen, 
  IconChevronRight as ChevronRight, 
  IconChevronLeft as ChevronLeft, 
  IconSparkles as Sparkles, 
  IconCheckCircle as CheckCircle2, 
  IconHelpCircle as Info, 
  IconHelpCircle as HelpCircle,
  IconCopy as Copy,
  IconLayers as Layers,
  IconTerminal as Code,
  IconX as X
} from "./icons/CustomIcons";
import { motion, AnimatePresence } from "motion/react";

interface BlueprintControllerProps {
  onSelectSpec: (spec: any) => void;
  activeSpecId: string | null;
  onToggleAnnotations: (val: boolean) => void;
  showAnnotations: boolean;
}

export default function BlueprintController({ 
  onSelectSpec, 
  activeSpecId, 
  onToggleAnnotations, 
  showAnnotations 
}: BlueprintControllerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHiddenCompletely, setIsHiddenCompletely] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "simulator" | "console" | "schema">("specs");
  const [consoleLogs, setConsoleLogs] = useState<{ id: string; time: string; level: string; msg: string }[]>([]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Sync annotations visibility when Client Demo Center is closed or hidden
  useEffect(() => {
    onToggleAnnotations(isOpen && !isHiddenCompletely);
  }, [isOpen, isHiddenCompletely]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      if (e.key === "H" && e.shiftKey) {
        setIsHiddenCompletely((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Initialize welcome logs
  useEffect(() => {
    const formatTime = () => {
      const d = new Date();
      return d.toTimeString().split(" ")[0];
    };
    
    setConsoleLogs([
      { id: "1", time: formatTime(), level: "SYS_INIT", msg: "Loading Service Provider Authentication Capability Wireframe v1.0.0..." },
      { id: "2", time: formatTime(), level: "SYS_READY", msg: "Visual wireframe system active on PORT 3000." },
      { id: "3", time: formatTime(), level: "ROUTER", msg: "Registered endpoint: POST /api/applications/submit" },
      { id: "4", time: formatTime(), level: "ROUTER", msg: "Registered endpoint: GET /api/eligibility/diagnose" }
    ]);
  }, []);

  // Scroll to bottom of console logs
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  // Handle application submission started
  useEffect(() => {
    const handleStarted = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { formData } = customEvent.detail;
      const time = new Date().toTimeString().split(" ")[0];
      
      setConsoleLogs((prev) => [
        ...prev,
        { id: Math.random().toString(), time, level: "INGRESS_POST", msg: `Received submission payload from "${formData.companyName || "Anonymous SMME"}"` },
        { id: Math.random().toString(), time, level: "DB_VERIFY", msg: `Validating CIPC registration syntax: "${formData.regNumber || "MISSING"}"` },
        { id: Math.random().toString(), time, level: "SARS_PIN", msg: `Retrieving tax compliance status PIN associated with owner "${formData.ownerName || "Unknown"}"` },
        { id: Math.random().toString(), time, level: "AWS_S3", msg: "Preparing file checksum validation and scanning document attachments..." }
      ]);
      setActiveTab("console");
    };

    const handleSuccess = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { formData, trackingCode } = customEvent.detail;
      const time = new Date().toTimeString().split(" ")[0];
      
      setConsoleLogs((prev) => [
        ...prev,
        { id: Math.random().toString(), time, level: "CIPC_OK", msg: `CIPC Active Entity records match verified: ${formData.companyName}` },
        { id: Math.random().toString(), time, level: "SARS_OK", msg: "SARS status returned: COMPLIANT. Tax clearance pin valid." },
        { id: Math.random().toString(), time, level: "S3_UPLOAD", msg: "Attachments securely stored on AWS S3 bucket 'satf-advisory-vault-prod'" },
        { id: Math.random().toString(), time, level: "DISPATCH", msg: `Routing application to Advisory Queue: [${formData.selectedServices?.join(", ") || "No Category selected"}]` },
        { id: Math.random().toString(), time, level: "NOTIFY_SMS", msg: `SMS alerts dispatched to ${formData.phone}` },
        { id: Math.random().toString(), time, level: "TX_SUCCESS", msg: `Transaction committed. Database ID: SATF-2026-X8B. Payload transmission complete!` }
      ]);
    };

    window.addEventListener("blueprint-submit-started", handleStarted);
    window.addEventListener("blueprint-submit-success", handleSuccess);
    return () => {
      window.removeEventListener("blueprint-submit-started", handleStarted);
      window.removeEventListener("blueprint-submit-success", handleSuccess);
    };
  }, []);

  const scenarios = [
    {
      title: "Scenario A: Craft & Retail SMME",
      desc: "Valid South African handmade textile business looking for advisory support.",
      formData: {
        companyName: "Amandla Arts & Crafts Ltd",
        regNumber: "2024/987654/07",
        industry: "Manufacturing & Craft",
        ownerName: "Thabo Mokoena",
        email: "thabo@amandla-arts.co.za",
        phone: "+27 71 555 4321",
        selectedServices: ["Business Advisory", "Skills Development", "Digital Enablement"],
        motivation: "Seeking structured mentorship and digital enablement to build an export-ready e-commerce portal for international audiences."
      },
      files: [
        { name: "CIPC_Amandla_Registration_Cert.pdf", size: "1.45 MB" },
        { name: "SARS_Tax_Compliance_PIN.pdf", size: "0.82 MB" }
      ]
    },
    {
      title: "Scenario B: Agricultural Co-op",
      desc: "Local cooperative needing technical standards assistance.",
      formData: {
        companyName: "Limpopo Organic Oils Co",
        regNumber: "2022/456123/07",
        industry: "Agriculture & Agro-processing",
        ownerName: "Naledi Ndlovu",
        email: "naledi@limpopoorganics.co.za",
        phone: "+27 82 555 9876",
        selectedServices: ["Technical Assistance", "Mentorship & Incubation"],
        motivation: "Our cold-press facility requires technical process audits and hygiene safety certification to unlock retail supply channels."
      },
      files: [
        { name: "Limpopo_Oils_CIPC_Corp.pdf", size: "2.10 MB" },
        { name: "SARS_TaxPIN_2026.pdf", size: "0.55 MB" },
        { name: "Facility_Hygiene_Draft.docx", size: "3.40 MB" }
      ]
    }
  ];

  const specs = [
    {
      id: "W_1.01",
      title: "Hero Title Funnel",
      type: "Landing Layout Module",
      desc: "Immediate corporate identity branding that establishes user focus and context.",
      flow: "Direct entry gate → Directs to Diagnostic Assessment Wizard or Application Form directly.",
      database: "None. Direct UI funnel."
    },
    {
      id: "W_1.02",
      title: "Media Asset Placeholder",
      type: "Media Block Layout",
      desc: "Predefined placeholder element representing future high-resolution video/photography illustrating SMME economic growth.",
      flow: "Static layout spacer framed by standard wire-cross vector diagonals.",
      database: "None. Media bucket file load."
    },
    {
      id: "W_1.04",
      title: "Non-Financial Support Grid",
      type: "Interactive Categories Grid",
      desc: "Presents the six key pillars of capability development support (Advisory, Planning, Technical, Skills, Incubation, Digital).",
      flow: "Users browse categories. Clicking any item triggers highlight. Corresponds directly to options inside the Ingress Application Form.",
      database: "Reflected as boolean category flags inside satf_applications.requested_categories array."
    },
    {
      id: "W_1.05",
      title: "Process Diagram Flow",
      type: "Interactive Process Line",
      desc: "Chronological flowchart mapping the business journey from intake assessment to finalized advisory program.",
      flow: "Aesthetic step indicators with standard progress connector bars.",
      database: "Reflected inside application progress tracking column: AWAITING_REVIEW → UNDER_AUDIT → PROGRAM_LAUNCHED."
    },
    {
      id: "W_ELIGIBILITY_WIZARD",
      title: "Diagnostic Wizard Modal",
      type: "Linear Quiz Flow",
      desc: "Step-by-step pre-screening tool that checks South African SMME status, valid CIPC registration, SARS tax compliance, and suitability of support.",
      flow: "Linear step state tracking. If any screen returns NO, the wizard branches to a stylized 'Ineligible Guidance' terminal layout.",
      database: "Logs transient pre-screening completion rates inside anonymous session state."
    },
    {
      id: "FORM_VIEW_SEC_05",
      title: "Secure Support Application Form",
      type: "Ingress Form Component",
      desc: "Provides real-time submission capability for SMMEs. Handles drag-and-drop file attachments and detailed motivation statements.",
      flow: "Interactive state collection → Submits structured JSON package via POST router → Triggers SARS and CIPC automated API simulator.",
      database: "Inserts record to postgres table 'satf_applications' with default status 'AWAITING_REVIEW'."
    }
  ];

  const schemaColumns = [
    { name: "id", type: "UUID (Primary Key)", desc: "Unique identifier generated automatically by the database." },
    { name: "company_name", type: "VARCHAR(255)", desc: "Verified business entity trade name registered with CIPC." },
    { name: "cipc_reg_number", type: "VARCHAR(100)", desc: "CIPC Enterprise Code, matching standard formats like YYYY/NNNNNN/NN." },
    { name: "industry_sector", type: "VARCHAR(100)", desc: "Broad sector category for resource Allocation routing." },
    { name: "owner_full_name", type: "VARCHAR(255)", desc: "Primary authorized business representative full name." },
    { name: "owner_email", type: "VARCHAR(255)", desc: "Contact email address for communications & notifications." },
    { name: "owner_phone", type: "VARCHAR(100)", desc: "Mobile contact number for real-time SMS status dispatches." },
    { name: "requested_categories", type: "TEXT[] (Array)", desc: "List of the selected support types (e.g., Skills Development, Technical assistance)." },
    { name: "motivation_text", type: "TEXT", desc: "Detailed narrative submitted by applicant explaining need." },
    { name: "uploaded_attachments", type: "JSONB", desc: "List of uploaded file metadata objects containing S3 file URLs and checksum hashes." },
    { name: "tracking_code", type: "VARCHAR(50)", desc: "Unique transaction code used by client to poll submission progress." },
    { name: "status", type: "VARCHAR(50)", desc: "Internal program status tracking: AWAITING_REVIEW, IN_REVIEW, SANCTIONED, EXPIRED." }
  ];

  const triggerFill = (scenario: typeof scenarios[0]) => {
    // Dispatch custom event to ApplicationForm component
    window.dispatchEvent(new CustomEvent("fill-blueprint-form", {
      detail: {
        formData: scenario.formData,
        files: scenario.files
      }
    }));

    // Trigger log entry
    const time = new Date().toTimeString().split(" ")[0];
    setConsoleLogs((prev) => [
      ...prev,
      { 
        id: Math.random().toString(), 
        time, 
        level: "SIMULATOR", 
        msg: `Dispatched pre-fill scenario data: "${scenario.formData.companyName}" successfully loaded.` 
      }
    ]);

    // Scroll to the form section
    const el = document.getElementById("apply-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSpecSelect = (spec: any) => {
    onSelectSpec(spec);
    
    // Auto scroll to corresponding element
    let targetId = "";
    if (spec.id === "W_1.01" || spec.id === "W_1.02") targetId = "hero-section";
    else if (spec.id === "W_1.04") targetId = "support-services-section";
    else if (spec.id === "W_1.05") targetId = "how-it-works-section";
    else if (spec.id === "FORM_VIEW_SEC_05") targetId = "apply-section";
    else if (spec.id === "W_ELIGIBILITY_WIZARD") {
      // Trigger modal click
      const wizardBtn = document.getElementById("hero-eligibility-btn");
      if (wizardBtn) wizardBtn.click();
      return;
    }

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  if (isHiddenCompletely) {
    return (
      <button
        onClick={() => setIsHiddenCompletely(false)}
        className="fixed bottom-2 right-2 z-50 bg-slate-950/40 hover:bg-slate-950 text-slate-400 hover:text-white font-mono text-[9px] py-1 px-2 border border-slate-800 rounded-none transition-all cursor-pointer opacity-40 hover:opacity-100"
        title="Show Demo Controls (Shift + H)"
      >
        [+] SHOW_DEMO_CONTROLS
      </button>
    );
  }

  return (
    <>
      {/* Floating Toggle Button for client to interactively open/close specs deck */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-slate-950 text-white font-mono text-xs font-bold tracking-wider py-3.5 px-5 border-2 border-slate-900 rounded-none wire-shadow hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer focus:outline-hidden"
          id="blueprint-specs-toggler"
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>{isOpen ? "[CLOSE_BLUEPRINT_Specs]" : "[OPEN_CLIENT_SPEC_CENTER]"}</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 right-0 h-screen w-[420px] max-w-full bg-slate-900 text-white border-l-4 border-slate-950 z-40 shadow-2xl flex flex-col justify-between font-mono text-xs overflow-hidden"
            id="client-blueprint-center-panel"
          >
            {/* Panel Header */}
            <div className="bg-slate-950 p-4 border-b-2 border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-400 animate-pulse rounded-full" />
                <span className="font-extrabold tracking-tight text-[11px]">
                  CLIENT DEMO CENTER [WIRE_PRO_V1.0]
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-slate-500 font-bold bg-slate-900 py-1 px-2">
                  PRE-ALPHA
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Close side panel (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* View Mode Tabs */}
            <div className="grid grid-cols-4 border-b border-slate-800 bg-slate-950 text-[10px] text-center font-bold">
              <button
                onClick={() => setActiveTab("specs")}
                className={`py-3 ${activeTab === "specs" ? "bg-slate-900 text-amber-400 border-b-2 border-amber-400" : "text-slate-400 hover:text-white"}`}
              >
                <BookOpen className="w-3.5 h-3.5 mx-auto mb-1" />
                <span>SPECS</span>
              </button>
              <button
                onClick={() => setActiveTab("simulator")}
                className={`py-3 ${activeTab === "simulator" ? "bg-slate-900 text-amber-400 border-b-2 border-amber-400" : "text-slate-400 hover:text-white"}`}
              >
                <Play className="w-3.5 h-3.5 mx-auto mb-1" />
                <span>SIMULATOR</span>
              </button>
              <button
                onClick={() => setActiveTab("console")}
                className={`py-3 ${activeTab === "console" ? "bg-slate-900 text-amber-400 border-b-2 border-amber-400" : "text-slate-400 hover:text-white"}`}
              >
                <Terminal className="w-3.5 h-3.5 mx-auto mb-1" />
                <span>CONSOLE</span>
              </button>
              <button
                onClick={() => setActiveTab("schema")}
                className={`py-3 ${activeTab === "schema" ? "bg-slate-900 text-amber-400 border-b-2 border-amber-400" : "text-slate-400 hover:text-white"}`}
              >
                <Database className="w-3.5 h-3.5 mx-auto mb-1" />
                <span>DATA MAP</span>
              </button>
            </div>

            {/* Scrollable Middle View */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900 text-slate-200">
              {activeTab === "specs" && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-3 border border-slate-800 rounded-none space-y-1.5">
                    <h5 className="font-extrabold text-amber-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      Client Capability Blueprint
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      This wireframe simulates the complete portal layout, allowing your advisory stakeholders and developer teams to evaluate user journeys before production build-out.
                    </p>
                    
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">Interactive Blueprint Annotations:</span>
                      <button
                        onClick={() => onToggleAnnotations(!showAnnotations)}
                        className={`py-1 px-3.5 font-bold uppercase text-[9px] border transition-all ${
                          showAnnotations 
                            ? "bg-amber-400 text-slate-900 border-amber-400" 
                            : "bg-slate-900 text-slate-400 border-slate-700 hover:text-white"
                        }`}
                      >
                        {showAnnotations ? "[ACTIVE: SHOWING]" : "[INACTIVE: HIDDEN]"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">
                      Blueprint Module Specifications (Click to locate)
                    </span>
                    
                    <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                      {specs.map((s) => {
                        const isActive = activeSpecId === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => handleSpecSelect(s)}
                            className={`w-full text-left p-3 border-2 transition-all block cursor-pointer ${
                              isActive 
                                ? "border-amber-400 bg-slate-950 text-white" 
                                : "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300"
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2 border-b border-dashed border-slate-800 pb-1.5 mb-1.5">
                              <span className="text-[10px] font-bold text-amber-400">[{s.id}]</span>
                              <span className="text-[9px] bg-slate-800 px-1 py-0.5 text-slate-400 font-mono">{s.type}</span>
                            </div>
                            <h6 className="font-extrabold text-xs text-white">{s.title}</h6>
                            <p className="text-[11px] text-slate-400 font-sans leading-relaxed mt-1">{s.desc}</p>
                            
                            {isActive && (
                              <div className="mt-2.5 pt-2 border-t border-dashed border-slate-800 space-y-1 bg-slate-900/60 p-2 font-mono text-[10px]">
                                <p className="text-slate-300"><strong className="text-slate-400">Payload Flow:</strong> {s.flow}</p>
                                <p className="text-slate-300"><strong className="text-slate-400">DB Schema Flag:</strong> {s.database}</p>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "simulator" && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-3 border border-slate-800 rounded-none space-y-1.5">
                    <h5 className="font-extrabold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      Automatic Payload Simulator
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Simulate a complete end-to-end SMME support capability application request. Click any scenario preset below to automatically pre-fill the form with test business metadata.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">
                      Select Demo Scenarios
                    </span>

                    {scenarios.map((sc, i) => (
                      <div key={i} className="bg-slate-950 border-2 border-slate-800 p-4 space-y-3">
                        <div>
                          <h6 className="font-extrabold text-xs text-white uppercase">{sc.title}</h6>
                          <p className="text-[11px] text-slate-400 font-sans leading-relaxed mt-0.5">{sc.desc}</p>
                        </div>

                        <div className="bg-slate-900 p-2.5 border border-slate-800 space-y-1 text-[10px] font-mono text-slate-300">
                          <div><strong className="text-slate-500">SMME Name:</strong> {sc.formData.companyName}</div>
                          <div><strong className="text-slate-500">CIPC Code:</strong> {sc.formData.regNumber}</div>
                          <div><strong className="text-slate-500">Rep Email:</strong> {sc.formData.email}</div>
                          <div><strong className="text-slate-500">Supports:</strong> {sc.formData.selectedServices.join(", ")}</div>
                        </div>

                        <button
                          onClick={() => triggerFill(sc)}
                          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>[INJECT_PRESENTS_&_SCROLL_TO_FORM]</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "console" && (
                <div className="space-y-3 h-full flex flex-col justify-between">
                  <div className="bg-slate-950 p-3 border border-slate-800 rounded-none space-y-1 flex justify-between items-center">
                    <div>
                      <h5 className="font-extrabold text-amber-400 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        Interactive Log Console
                      </h5>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        Simulating backend ledger audits, SARS pin compliance and CIPC entity checks.
                      </p>
                    </div>
                    <button
                      onClick={() => setConsoleLogs([])}
                      className="text-[9px] font-mono font-bold text-slate-500 hover:text-white border border-slate-800 px-2 py-1"
                    >
                      [CLEAR]
                    </button>
                  </div>

                  <div className="bg-black text-emerald-400 p-3 font-mono text-[10px] leading-normal border-2 border-slate-950 h-[320px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-slate-800">
                    {consoleLogs.length === 0 ? (
                      <p className="text-slate-500 italic text-center py-10">No system events logged. Submit the application form to stream events.</p>
                    ) : (
                      consoleLogs.map((log) => (
                        <div key={log.id} className="border-b border-slate-950/20 pb-1">
                          <span className="text-slate-600 mr-1.5">[{log.time}]</span>
                          <span className="text-amber-400 font-bold mr-1.5 uppercase">[{log.level}]</span>
                          <span className="text-emerald-300 break-words">{log.msg}</span>
                        </div>
                      ))
                    )}
                    <div ref={consoleBottomRef} />
                  </div>
                </div>
              )}

              {activeTab === "schema" && (
                <div className="space-y-3">
                  <div className="bg-slate-950 p-3 border border-slate-800 rounded-none space-y-1.5">
                    <h5 className="font-extrabold text-amber-400 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" />
                      PostgreSQL Database Schema
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      The relational SQL data blueprint mapping the fully persistent state of the Service Provider Authentication Application registry.
                    </p>
                  </div>

                  <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                    <div className="bg-slate-950 border border-slate-800 p-2 text-[10px] border-b-2 border-b-slate-800">
                      <span className="font-bold text-white block uppercase mb-1">TABLE: satf_applications</span>
                      <span className="text-slate-500 font-sans block text-[9px]">Holds the securely encrypted capability development dossiers.</span>
                    </div>

                    <table className="w-full border-collapse border border-slate-800 text-[10px] bg-slate-950">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-800 text-left">
                          <th className="p-2 font-bold text-amber-400">COLUMN</th>
                          <th className="p-2 font-bold text-slate-300">TYPE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {schemaColumns.map((col) => (
                          <tr key={col.name} className="hover:bg-slate-900/60 transition-colors">
                            <td className="p-2 font-bold text-white align-top">{col.name}</td>
                            <td className="p-2 align-top text-slate-300">
                              <span className="text-emerald-400 font-mono block">{col.type}</span>
                              <span className="text-[9px] text-slate-500 font-sans block mt-0.5">{col.desc}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Panel footer info */}
            <div className="bg-slate-950 p-4 border-t-2 border-slate-800 space-y-2.5 text-center text-[10px] text-slate-500">
              <p>PROTOTYPE V1.0 • ACCESS TO CAPABILITY</p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:text-white transition-colors uppercase text-[9px] cursor-pointer"
                  title="Minimize side panel (Esc)"
                >
                  [Minimize Panel]
                </button>
                <button
                  onClick={() => setIsHiddenCompletely(true)}
                  className="px-2 py-1 bg-slate-900 hover:bg-red-950 border border-slate-800 hover:text-red-300 transition-colors uppercase text-[9px] text-slate-400 cursor-pointer"
                  title="Hide floating controllers entirely. Restore via Shift+H or bottom corner toggle."
                >
                  [Hide Completely]
                </button>
              </div>
              <p className="font-sans text-[9px]">Designed for stakeholder alignment. Shift+H toggles controllers.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

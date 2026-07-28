/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { 
  IconUploadCloud as UploadCloud, 
  IconFileText as File, 
  IconX as Trash2, 
  IconCheckCircle as CheckCircle2, 
  IconBuilding2 as Building, 
  IconUserCheck as User, 
  IconMail as Mail, 
  IconPhone as Phone, 
  IconChevronRight as ChevronRight,
  IconChevronDown as ChevronLeft,
  IconSparkles as Sparkles,
  IconCheck as Check,
  IconHelpCircle as HelpCircle,
  IconShieldAlert as AlertCircle,
  IconRotateCcw as RefreshCw,
  IconShieldCheck as ShieldCheck,
  IconFileText as FileText,
  IconBuilding2 as Building2,
  IconAward as Award,
  IconArrowRight as ArrowRight,
  IconHelpCircle as Info,
  IconTarget as Compass,
  IconIntakeDossier as IntakeDossier,
  IconBarcodeScan as BarcodeScan,
  IconFingerprint as Fingerprint,
  IconPrinter as Printer,
  IconPenTool as PenTool,
  IconPillarStrategy,
  IconPillarPlanning,
  IconPillarTechnical,
  IconPillarSkills,
  IconPillarEcosystem,
  IconPillarLeadership,
  IconPillarTech,
  IconLayers
} from "./icons/CustomIcons";
import { motion, AnimatePresence } from "motion/react";
import { fmtText } from "../utils/format";

// The 7-pillar Needs Assessment Questionnaire structure with bespoke iconography
const pillarsData = [
  {
    id: "strategy",
    title: "1. Strategy, Compliance & Governance",
    recommendation: "Business Advisory",
    description: "Evaluates operational health, cashflow management, tax compliance, and HR structures.",
    icon: IconPillarStrategy,
    questions: [
      { id: "q1_1", text: "Has your business undergone a formal diagnostic to evaluate its current operational health and strategy?", recommendOn: "no" },
      { id: "q1_2", text: "Do you have formalized cashflow management and financial management structures in place?", recommendOn: "no" },
      { id: "q1_3", text: "Is your business fully compliant with current tax, legal, and industry-specific governance requirements?", recommendOn: "no" },
      { id: "q1_4", text: "Do you have formalized Human Resources (HR) policies and advisory support?", recommendOn: "no" }
    ]
  },
  {
    id: "investment",
    title: "2. Investment Readiness & Planning",
    recommendation: "Business Planning",
    description: "Assesses business plan completeness, 3-5 year financial modeling, and investor pitch readiness.",
    icon: IconPillarPlanning,
    questions: [
      { id: "q2_1", text: "Do you have a comprehensive, up-to-date business plan supported by current market research?", recommendOn: "no" },
      { id: "q2_2", text: "Do you have an active financial model that projects your revenue and expenses for the next 3-5 years?", recommendOn: "no" },
      { id: "q2_3", text: "Do you have a professional pitch deck prepared for potential investors or buyers?", recommendOn: "no" },
      { id: "q2_4", text: "Is your business currently considered \"investment ready\" by formal funding institutions?", recommendOn: "no" }
    ]
  },
  {
    id: "product",
    title: "3. Product & Quality Assurance",
    recommendation: "Technical Assistance",
    description: "Determines product development needs, testing requirements, quality certifications, and intellectual property.",
    icon: IconPillarTechnical,
    questions: [
      { id: "q3_1", text: "Does your core product require further development, prototype testing, or formal certification?", recommendOn: "yes" },
      { id: "q3_2", text: "Do you lack formal quality assurance certifications required by your industry (e.g., ISO, HAACP)?", recommendOn: "yes" },
      { id: "q3_3", text: "Do you need assistance with intellectual property (IP) registration or trademarking?", recommendOn: "yes" },
      { id: "q3_4", text: "Does your product require professional branding or packaging design to compete in the market?", recommendOn: "yes" }
    ]
  },
  {
    id: "team",
    title: "4. Team Capacity & Training",
    recommendation: "Skills Development",
    description: "Identifies skill requirements in entrepreneurship, export readiness, AI/digital literacy, and project management.",
    icon: IconPillarSkills,
    questions: [
      { id: "q4_1", text: "Do you or your staff require training in foundational entrepreneurship or financial literacy?", recommendOn: "yes" },
      { id: "q4_2", text: "Are you looking to expand internationally but lack \"Export Readiness\" training?", recommendOn: "yes" },
      { id: "q4_3", text: "Does your team lack modern digital skills or AI training?", recommendOn: "yes" },
      { id: "q4_4", text: "Do you need formal training in marketing, procurement, manufacturing, or project management?", recommendOn: "yes" }
    ]
  },
  {
    id: "ecosystem",
    title: "5. Ecosystem & Workspace Needs",
    recommendation: "Mentorship & Incubation",
    description: "Analyzes requirements for physical/virtual accelerator spaces, hubs, and technical incubator environments.",
    icon: IconPillarEcosystem,
    questions: [
      { id: "q5_1", text: "Would your business benefit from joining an accelerator programme or innovation hub?", recommendOn: "yes" },
      { id: "q5_2", text: "Do you require access to physical incubation spaces (e.g., office space, shared manufacturing facilities)?", recommendOn: "yes" },
      { id: "q5_3", text: "Would your startup benefit from virtual incubation and specialized technology support?", recommendOn: "yes" }
    ]
  },
  {
    id: "leadership",
    title: "6. Leadership & Guidance",
    recommendation: "Mentorship & Incubation",
    description: "Covers industry-specific mentor allocations, business coaching, and peer learning ecosystems.",
    icon: IconPillarLeadership,
    questions: [
      { id: "q6_1", text: "Would you benefit from being allocated an industry-specific mentor to guide your growth?", recommendOn: "yes" },
      { id: "q6_2", text: "Do the founders or directors require executive or business coaching?", recommendOn: "yes" },
      { id: "q6_3", text: "Would you like to participate in structured peer-learning groups with other entrepreneurs?", recommendOn: "yes" }
    ]
  },
  {
    id: "technology",
    title: "7. Technological Infrastructure",
    recommendation: "Digital Enablement",
    description: "Measures functional web/e-commerce onboarding, POS tracking, digital accounting, and ERP setups.",
    icon: IconPillarTech,
    questions: [
      { id: "q7_1", text: "Does your business have a fully functional website and an e-commerce onboarding strategy?", recommendOn: "no" },
      { id: "q7_2", text: "Are you currently utilizing formal digital marketing strategies to reach customers?", recommendOn: "no" },
      { id: "q7_3", text: "Do you have a modern Point of Sale (POS) system integrated into your daily operations?", recommendOn: "no" },
      { id: "q7_4", text: "Have you successfully integrated digital accounting software or an Enterprise Resource Planning (ERP) system?", recommendOn: "no" }
    ]
  }
];

interface ApplicationFormProps {
  track?: "capability" | "markets";
  showAnnotations?: boolean;
}

export default function ApplicationForm({ track = "capability", showAnnotations = true }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    regNumber: "",
    industry: "Retail / E-commerce",
    ownerName: "",
    email: "",
    phone: "",
    selectedServices: [] as string[],
    motivation: ""
  });

  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [draftTrackingCode, setDraftTrackingCode] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Needs Assessment Questionnaire States
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [responses, setResponses] = useState<Record<string, "yes" | "no" | "not_sure">>({});

  // Custom blueprint simulation listener
  useEffect(() => {
    const handleFill = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setFormData(customEvent.detail.formData);
        setFiles(customEvent.detail.files || []);
      }
    };
    window.addEventListener("fill-blueprint-form", handleFill);
    return () => window.removeEventListener("fill-blueprint-form", handleFill);
  }, []);

  // Autofill assessment for demo / testing
  const handleAutoFillAssessment = () => {
    const mockResponses: Record<string, "yes" | "no" | "not_sure"> = {
      q1_1: "no",
      q1_2: "no",
      q1_3: "yes",
      q1_4: "no",
      q2_1: "no",
      q2_2: "no",
      q2_3: "not_sure",
      q2_4: "no",
      q3_1: "yes",
      q3_2: "yes",
      q3_3: "no",
      q3_4: "yes",
      q4_1: "yes",
      q4_2: "no",
      q4_3: "yes",
      q4_4: "yes",
      q5_1: "yes",
      q5_2: "no",
      q5_3: "yes",
      q6_1: "yes",
      q6_2: "yes",
      q6_3: "no",
      q7_1: "no",
      q7_2: "no",
      q7_3: "yes",
      q7_4: "no"
    };
    setResponses(mockResponses);

    setFormData((prev) => ({
      ...prev,
      companyName: prev.companyName || "Modise Craft Boutique",
      regNumber: prev.regNumber || "2023/123456/07",
      ownerName: prev.ownerName || "Tsoanelo Modise",
      email: prev.email || "tsoanelomodise@gmail.com",
      phone: prev.phone || "+27 82 123 4567",
      motivation: "We require professional quality compliance support, 3-5 year financial modelling, and assistance with establishing tax and export compliance to service corporate retail suppliers."
    }));
  };

  // Synchronize questionnaire responses with requested services
  useEffect(() => {
    if (track !== "capability") return;
    
    const triggeredInterventions = new Set<string>();
    
    pillarsData.forEach(p => {
      p.questions.forEach(q => {
        const resp = responses[q.id];
        if (!resp) return;
        if (q.recommendOn === "no") {
          if (resp === "no" || resp === "not_sure") {
            triggeredInterventions.add(p.recommendation);
          }
        } else {
          if (resp === "yes") {
            triggeredInterventions.add(p.recommendation);
          }
        }
      });
    });

    setFormData(prev => ({
      ...prev,
      selectedServices: Array.from(triggeredInterventions)
    }));
  }, [responses, track]);

  // Analyze responses and output identified gaps & recommended interventions
  const getInterventionsReport = () => {
    const report: Array<{
      pillarId: string;
      pillarTitle: string;
      intervention: string;
      gapsCount: number;
      totalQuestions: number;
      gaps: string[];
    }> = [];

    pillarsData.forEach(p => {
      const gaps: string[] = [];
      p.questions.forEach(q => {
        const resp = responses[q.id];
        if (!resp) return;
        if (q.recommendOn === "no") {
          if (resp === "no" || resp === "not_sure") {
            gaps.push(q.text);
          }
        } else {
          if (resp === "yes") {
            gaps.push(q.text);
          }
        }
      });

      if (gaps.length > 0) {
        report.push({
          pillarId: p.id,
          pillarTitle: p.title,
          intervention: p.recommendation,
          gapsCount: gaps.length,
          totalQuestions: p.questions.length,
          gaps
        });
      }
    });

    return report;
  };

  const availableServices = track === "markets"
    ? [
        "Corporate Procurement",
        "Supplier Development",
        "Government Markets",
        "Export Channels",
        "Retail & Distribution",
        "Business Matchmaking"
      ]
    : [
        "Business Advisory",
        "Business Planning",
        "Technical Assistance",
        "Skills Development",
        "Mentorship & Incubation",
        "Digital Enablement"
      ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedServices.includes(service);
      const selectedServices = isSelected
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service];
      return { ...prev, selectedServices };
    });
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((f) => ({
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(2) + " MB"
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.companyName) {
      alert("Please enter at least your Company Name to save a draft assessment.");
      return;
    }
    setSubmitting(true);

    const trackingCode = "SPA-DRAFT-" + Math.floor(100000 + Math.random() * 900000);
    const draftApp = {
      id: trackingCode,
      companyName: formData.companyName || "Anonymous SMME (Draft)",
      regNumber: formData.regNumber || "2026/000000/07 (Draft)",
      industry: formData.industry || "General Trade",
      ownerName: formData.ownerName || "Representative Owner",
      email: formData.email || "draft@example.co.za",
      phone: formData.phone || "+27 82 000 0000",
      selectedServices: formData.selectedServices,
      motivation: formData.motivation || "Seeking diagnostic-led capability acceleration support (Draft).",
      status: "Draft",
      dateSubmitted: new Date().toISOString(),
      advisoryNotes: "",
      responses: responses,
      gaps: getInterventionsReport().map(r => ({
        pillarTitle: r.pillarTitle,
        intervention: r.intervention,
        gaps: r.gaps
      }))
    };

    try {
      const existing = localStorage.getItem("satf_applications");
      let list = [];
      if (existing) {
        try {
          list = JSON.parse(existing);
        } catch (e) {
          list = [];
        }
      }
      if (!Array.isArray(list)) {
        list = [];
      }
      list.unshift(draftApp);
      localStorage.setItem("satf_applications", JSON.stringify(list));
    } catch (err) {
      console.error("Failed to store draft application:", err);
    }

    setTimeout(() => {
      setSubmitting(false);
      setIsDraftSaved(true);
      setDraftTrackingCode(trackingCode);
      setSubmitted(true);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setIsDraftSaved(false);
    setDraftTrackingCode("");
    
    // Dispatch submission started event for simulation
    window.dispatchEvent(new CustomEvent("blueprint-submit-started", {
      detail: { formData, files }
    }));

    // Create a new application log record and save to localStorage for the Provider Portal
    const trackingCode = "SPA-2026-" + Math.floor(100000 + Math.random() * 900000);
    const newApp = {
      id: trackingCode,
      companyName: formData.companyName || "Anonymous SMME",
      regNumber: formData.regNumber || "2026/000000/07",
      industry: formData.industry || "General Trade",
      ownerName: formData.ownerName || "Representative Owner",
      email: formData.email || "contact@example.co.za",
      phone: formData.phone || "+27 82 000 0000",
      selectedServices: formData.selectedServices.length > 0 ? formData.selectedServices : ["Business Advisory"],
      motivation: formData.motivation || "Seeking diagnostic-led capability acceleration support.",
      status: "Pre-Assigned",
      dateSubmitted: new Date().toISOString(),
      advisoryNotes: "",
      responses: responses,
      gaps: getInterventionsReport().map(r => ({
        pillarTitle: r.pillarTitle,
        intervention: r.intervention,
        gaps: r.gaps
      }))
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem("satf_applications");
      let list = [];
      if (existing) {
        try {
          list = JSON.parse(existing);
        } catch (e) {
          list = [];
        }
      }
      if (!Array.isArray(list)) {
        list = [];
      }
      list.unshift(newApp);
      localStorage.setItem("satf_applications", JSON.stringify(list));
    } catch (err) {
      console.error("Failed to store new application:", err);
    }

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      // Dispatch submission success event for simulation
      window.dispatchEvent(new CustomEvent("blueprint-submit-success", {
        detail: { formData, files, trackingCode }
      }));
    }, 1800);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/80 rounded-[2.25rem] p-6 sm:p-10 shadow-xl shadow-slate-200/50" id="application-form-container">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-8"
            id="apply-form"
          >
            {/* Form Header */}
            <div className="space-y-2 border-b border-slate-200/60 pb-5">
              {showAnnotations && <span className="font-sans font-bold text-[10px] text-slate-400 tracking-widest uppercase hidden">[FORM_VIEW_SEC_05]</span>}
              <h3 className="font-sans font-black text-2xl sm:text-3xl text-slate-900 tracking-tight uppercase leading-none">
                {track === "markets" ? "Access to Markets Application" : "Submit Support Application"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans font-medium leading-relaxed">
                {track === "markets" 
                  ? "Fill in the details below to apply for corporate and government procurement matchmaking." 
                  : "Fill in the details below to apply for the fully-subsidized Access to Capability development support."}
              </p>
            </div>

            {/* Section 1: Business Details */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2.5">
                <Building className="w-4 h-4 text-slate-900" />
                <h4 className="font-sans font-black text-xs sm:text-sm tracking-wider text-slate-900 uppercase">
                  1. Business Profile [SEC_A]
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-[11px] font-sans font-extrabold text-slate-900 tracking-wider uppercase block">
                    COMPANY_NAME
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    placeholder="e.g. Modise Craft Boutique"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-full py-3 px-5 font-sans text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 focus:outline-hidden transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-[11px] font-sans font-extrabold text-slate-900 tracking-wider uppercase block">
                    CIPC_REG_NUMBER
                  </label>
                  <input
                    type="text"
                    name="regNumber"
                    required
                    placeholder="e.g. 2023/123456/07"
                    value={formData.regNumber}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-full py-3 px-5 font-sans text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 focus:outline-hidden transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] sm:text-[11px] font-sans font-extrabold text-slate-900 tracking-wider uppercase block">
                    INDUSTRY_SECTOR
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-full py-3 px-5 font-sans text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 focus:outline-hidden cursor-pointer transition-all shadow-xs"
                  >
                    <option>Retail / E-commerce</option>
                    <option>Manufacturing & Craft</option>
                    <option>Digital Services & IT</option>
                    <option>Agriculture & Food Processing</option>
                    <option>Logistics & Supply Chain</option>
                    <option>Other Services</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Contact Details */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2.5">
                <User className="w-4 h-4 text-slate-900" />
                <h4 className="font-sans font-black text-xs sm:text-sm tracking-wider text-slate-900 uppercase">
                  2. Contact Person [SEC_B]
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-[11px] font-sans font-extrabold text-slate-900 tracking-wider uppercase block">
                    REPRESENTATIVE_FULL_NAME
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    required
                    placeholder="e.g. Tsoanelo Modise"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-full py-3 px-5 font-sans text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 focus:outline-hidden transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-[11px] font-sans font-extrabold text-slate-900 tracking-wider uppercase block">
                    EMAIL_ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. owner@example.co.za"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-full py-3 px-5 font-sans text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 focus:outline-hidden transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] sm:text-[11px] font-sans font-extrabold text-slate-900 tracking-wider uppercase block">
                    CONTACT_MOBILE_NUMBER
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +27 82 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/80 border border-slate-200/80 rounded-full py-3 px-5 font-sans text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 focus:outline-hidden transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Select Support Requested / Needs Assessment */}
            {track === "capability" ? (
              <div className="space-y-6 border-b border-slate-200/60 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dashed border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <h4 className="font-sans font-black text-xs sm:text-sm tracking-wider text-slate-900 uppercase">
                      3. Enterprise Needs Assessment Questionnaire [SEC_C]
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoFillAssessment}
                    className="self-start sm:self-auto flex items-center gap-1.5 bg-emerald-100/90 hover:bg-emerald-200/90 text-emerald-900 border border-emerald-300/80 px-4 py-2 rounded-full text-[10px] font-sans font-bold uppercase transition-all shadow-xs active:translate-y-[1px] cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3 animate-spin text-emerald-700" style={{ animationDuration: '3s' }} />
                    <span>[Auto-Fill Diagnostic]</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-sans font-medium leading-relaxed">
                  Answer the following questions across seven key pillars to help the <strong>Capability Recommendation Engine</strong> automatically identify operational bottlenecks and assign fully-subsidized interventions.
                </p>

                {/* 7-Pillar Tabs Navigation with Bespoke Icons */}
                <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-200/60 -mx-4 px-4 sm:mx-0 sm:px-0">
                  {pillarsData.map((pillar, idx) => {
                    const active = activePillarIdx === idx;
                    const PillarIcon = pillar.icon;
                    // Count answered questions in this pillar
                    const answeredCount = pillar.questions.filter(q => responses[q.id] !== undefined).length;
                    const total = pillar.questions.length;
                    return (
                      <button
                        type="button"
                        key={pillar.id}
                        onClick={() => setActivePillarIdx(idx)}
                        className={`py-2 px-4 text-[10px] font-sans font-bold uppercase tracking-wider whitespace-nowrap transition-all focus:outline-hidden cursor-pointer flex items-center gap-1.5 rounded-full ${
                          active
                            ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                            : "bg-white/90 text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-2xs"
                        }`}
                      >
                        <PillarIcon className="w-3.5 h-3.5 shrink-0" />
                        <span>Pillar {idx + 1}</span>
                        {answeredCount > 0 && (
                          <span className="ml-0.5 px-2 py-0.5 bg-amber-200 text-amber-900 text-[8px] rounded-full font-sans font-extrabold">
                            {answeredCount}/{total}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Two-Column split for Questionnaire & Live Recommendation Engine */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left: Active Pillar Questions */}
                  <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200/80 p-5 sm:p-7 space-y-5 rounded-[1.75rem] shadow-xs relative">
                    <div className="space-y-1">
                      <span className="font-sans text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">
                        Active Section: {pillarsData[activePillarIdx].title}
                      </span>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-sans leading-tight">
                        {pillarsData[activePillarIdx].description}
                      </p>
                    </div>

                    <div className="space-y-4 divide-y divide-slate-200/70 divide-dashed">
                      {pillarsData[activePillarIdx].questions.map((q, qidx) => {
                        const currentAnswer = responses[q.id];
                        return (
                          <div key={q.id} className="pt-4 first:pt-0 space-y-2">
                            <p className="text-xs sm:text-sm text-slate-900 font-sans font-medium leading-relaxed">
                              <span className="font-sans font-extrabold mr-1.5 text-slate-500">Q{qidx + 1}.</span>
                              {q.text}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {(["yes", "no", "not_sure"] as const).map((opt) => {
                                const selected = currentAnswer === opt;
                                let btnStyle = "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100";
                                if (selected) {
                                  if (opt === "yes") btnStyle = "bg-emerald-600 text-white font-extrabold shadow-sm shadow-emerald-200 border-emerald-600";
                                  else if (opt === "no") btnStyle = "bg-rose-600 text-white font-extrabold shadow-sm shadow-rose-200 border-rose-600";
                                  else btnStyle = "bg-amber-500 text-slate-950 font-extrabold shadow-sm shadow-amber-200 border-amber-500";
                                }
                                return (
                                  <button
                                    type="button"
                                    key={opt}
                                    onClick={() => {
                                      setResponses(prev => ({ ...prev, [q.id]: opt }));
                                    }}
                                    className={`py-2 px-4 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs ${btnStyle}`}
                                  >
                                    {opt === "not_sure" ? "Not Sure" : opt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Step Navigation Controls */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-200/80">
                      <button
                        type="button"
                        disabled={activePillarIdx === 0}
                        onClick={() => setActivePillarIdx(p => p - 1)}
                        className="flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white text-slate-900 px-4 py-2 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>[PREV_PILLAR]</span>
                      </button>
                      
                      <span className="font-sans text-[9px] font-extrabold tracking-wider text-slate-500">
                        PILLAR {activePillarIdx + 1} OF 7
                      </span>

                      <button
                        type="button"
                        disabled={activePillarIdx === pillarsData.length - 1}
                        onClick={() => setActivePillarIdx(p => p + 1)}
                        className="flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white text-slate-900 px-4 py-2 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                      >
                        <span>[NEXT_PILLAR]</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Live Recommendation Engine Box */}
                  <div className="lg:col-span-5 bg-slate-900/95 backdrop-blur-xl text-white rounded-[1.75rem] p-5 sm:p-6 shadow-xl shadow-slate-900/20 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                        <span className="font-sans text-[10px] font-black text-emerald-400 tracking-wider uppercase hidden">RECOMMENDATION_ENGINE_V1</span>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[8px] font-sans px-2.5 py-1 rounded-full uppercase font-extrabold tracking-widest animate-pulse">
                        [LIVE_ANALYZING]
                      </span>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 shadow-inner">
                        <span className="text-[8px] font-sans font-bold text-slate-400 block uppercase tracking-wider">GAPS_DETECTED</span>
                        <span className="text-sm sm:text-base font-sans font-black text-rose-400 tracking-tight">
                          {getInterventionsReport().reduce((acc, curr) => acc + curr.gapsCount, 0)} Gaps
                        </span>
                      </div>
                      <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 shadow-inner">
                        <span className="text-[8px] font-sans font-bold text-slate-400 block uppercase tracking-wider">SUPPORT_RECOM_QTY</span>
                        <span className="text-sm sm:text-base font-sans font-black text-emerald-400 tracking-tight">
                          {getInterventionsReport().length} Programs
                        </span>
                      </div>
                    </div>

                    {/* Realtime Gaps Analysis List */}
                    <div className="space-y-2.5">
                      <span className="text-[9px] font-sans font-bold text-slate-400 block uppercase tracking-wider">Identified Gaps & Interventions:</span>
                      
                      {getInterventionsReport().length === 0 ? (
                        <div className="text-center py-6 text-slate-400 font-sans text-[10px] font-bold border border-dashed border-slate-800 rounded-2xl">
                          <p>[NO_CAPABILITY_GAPS_DETECTED]</p>
                          <p className="mt-1 text-[8px] text-slate-500 font-normal">Answer No/Not Sure to questions above to trigger interventions</p>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {getInterventionsReport().map((rep) => (
                            <div key={rep.pillarId} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-[9px] font-sans font-black text-amber-300 truncate max-w-[150px]">
                                  {rep.pillarTitle.substring(3)}
                                </span>
                                <span className="text-[8px] font-sans bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase font-black tracking-wider">
                                  {rep.intervention}
                                </span>
                              </div>
                              <p className="text-[9px] text-slate-300/80 font-sans leading-snug">
                                Identified {rep.gapsCount} operational bottleneck{rep.gapsCount > 1 ? "s" : ""}.
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-800/80 p-3 text-[9px] font-sans text-slate-300 leading-relaxed border border-slate-700/80 rounded-2xl">
                      <span className="text-white font-extrabold block uppercase mb-1 tracking-wider">💡 Integration Note</span>
                      Once you submit, this portal automatically matches and pre-approves your registration for these development programs.
                    </div>
                  </div>

                </div>

                {/* Categories pre-selected display */}
                <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5 font-sans text-xs text-slate-800 space-y-2 shadow-xs">
                  <div className="flex items-center gap-1.5 text-slate-900 font-black uppercase text-[10px] tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
                    <span>Auto-Approved Support Categories (Dossier Package):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.selectedServices.length === 0 ? (
                      <span className="text-slate-500 text-[10px] italic font-sans">[Awaiting assessment questionnaire inputs]</span>
                    ) : (
                      formData.selectedServices.map(service => (
                        <span key={service} className="bg-slate-900 text-white text-[9px] px-3 py-1.5 font-bold uppercase tracking-wider flex items-center gap-1.5 rounded-full shadow-xs">
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          {service}
                        </span>
                      ))
                    )}
                  </div>
                </div>

              </div>
            ) : (
              /* Original static selection for Markets track */
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-dashed border-slate-200 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-900" />
                  <h4 className="font-sans font-black text-xs sm:text-sm tracking-wider text-slate-900 uppercase">
                    3. Requested Support Categories [SEC_C]
                  </h4>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 font-sans font-medium">Select one or more categories that align with your business needs:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {availableServices.map((service) => {
                    const isChecked = formData.selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => handleServiceToggle(service)}
                        className={`py-3 px-4 rounded-full border text-left font-sans text-xs font-bold tracking-wider uppercase flex items-center justify-between cursor-pointer transition-all shadow-2xs ${
                          isChecked
                            ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                            : "bg-white border-slate-200 text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <span>{service}</span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isChecked ? "bg-white border-white text-slate-950" : "border-slate-300"
                        }`}>
                          {isChecked && <span className="w-2 h-2 bg-slate-900 rounded-full" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Section 4: File Upload & Motivation */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-dashed border-slate-200 pb-2">
                <UploadCloud className="w-4 h-4 text-slate-900" />
                <h4 className="font-sans font-black text-xs sm:text-sm tracking-wider text-slate-900 uppercase">
                  4. Attachments & Motivation [SEC_D]
                </h4>
              </div>

              {/* Motivation */}
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-[11px] font-sans font-extrabold text-slate-900 tracking-wider uppercase block">
                  SUPPORTING_MOTIVATION_PARAGRAPH
                </label>
                <textarea
                  name="motivation"
                  rows={4}
                  placeholder="Briefly share any specific challenges your business is facing and why you are seeking this development program."
                  value={formData.motivation}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl py-3 px-4 font-sans text-xs sm:text-sm font-medium focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 focus:outline-hidden transition-all shadow-xs resize-none"
                />
              </div>

              {/* Drag & Drop Upload Zone */}
              <div className="space-y-3">
                <label className="text-[10px] sm:text-[11px] font-sans font-extrabold text-slate-900 tracking-wider uppercase block">
                  SUPPORTING_DOCUMENTS
                </label>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                  className={`relative border-2 border-dashed rounded-[2.25rem] p-8 sm:p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3.5 overflow-hidden shadow-xl shadow-slate-200/60 backdrop-blur-md ${
                    isDragging
                      ? "border-slate-900 bg-slate-100/90 scale-[1.01]"
                      : "border-slate-300/80 hover:border-slate-900 bg-gradient-to-br from-[#f6f6f4] via-[#efefeb] to-[#f8f8f6] hover:from-[#f0f0ec] hover:to-[#f2f2ee]"
                  }`}
                  id="drag-drop-zone"
                >
                  {/* Subtle diagonal stripe texture overlay matching reference */}
                  <div 
                    className="absolute inset-0 opacity-[0.45] pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(-45deg, rgba(0,0,0,0.035), rgba(0,0,0,0.035) 10px, transparent 10px, transparent 20px)'
                    }}
                  />

                  {/* Top-right pill badges matching design reference */}
                  <div className="absolute top-3 right-4 flex items-center gap-1.5 z-10 pointer-events-none">
                    <span className="bg-white/90 text-slate-800 text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs border border-white/80">
                      82%
                    </span>
                    <span className="w-6 h-6 bg-white/90 text-slate-800 text-xs font-bold rounded-full flex items-center justify-center shadow-xs border border-white/80">
                      +
                    </span>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 bg-slate-900 border border-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-900/20 z-10 transition-transform hover:scale-105">
                    <UploadCloud className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-1.5 z-10 font-sans">
                    <p className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                      DRAG_&_DROP_FILES_HERE OR <span className="bg-slate-900 text-white px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest shadow-xs hover:bg-slate-800 transition-colors inline-block ml-1">[BROWSE]</span>
                    </p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      FILE_TYPES: PDF, PNG, JPEG, DOCX (MAX 10MB)
                    </p>
                  </div>
                </div>

                {/* File List Display */}
                {files.length > 0 && (
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 divide-y divide-slate-100 max-h-48 overflow-y-auto shadow-xs" id="file-list-display">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between py-2 text-xs font-sans">
                        <div className="flex items-center gap-2 text-slate-800 truncate max-w-sm">
                          <File className="w-4 h-4 text-slate-900 flex-shrink-0" />
                          <span className="truncate font-extrabold">{file.name}</span>
                          <span className="text-[10px] text-slate-500 font-medium">({file.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-full focus:outline-hidden cursor-pointer transition-colors"
                          title="Remove file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit & Save Draft buttons */}
            <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              {showAnnotations && <span className="font-sans font-bold text-[10px] text-slate-400 tracking-wider hidden sm:inline">[READY_TO_POST]</span>}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={submitting}
                  className="w-full sm:w-auto bg-amber-100/90 hover:bg-amber-200/90 disabled:bg-slate-200 text-amber-900 border border-amber-300/80 font-sans text-xs font-bold tracking-wider px-6 py-3.5 rounded-full shadow-xs hover:shadow-md active:translate-y-[1px] transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-hidden uppercase"
                  id="save-draft-btn"
                >
                  <span>{fmtText("[SAVE_DRAFT_ASSESSMENT]", showAnnotations)}</span>
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-sans text-xs font-extrabold tracking-wider px-8 py-3.5 rounded-full shadow-md shadow-slate-900/20 hover:shadow-lg active:translate-y-[1px] transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-hidden uppercase"
                  id="submit-app-btn"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{fmtText("[TRANSMITTING_PAYLOAD...]", showAnnotations)}</span>
                    </>
                  ) : (
                    <>
                      <span>{fmtText("[SUBMIT_SUPPORT_APPLICATION]", showAnnotations)}</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        ) : isDraftSaved ? (
          <motion.div
            key="success-draft"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 text-left py-4"
            id="app-success-view-draft"
          >
            {/* Header card with draft state */}
            <div className="bg-amber-100/80 text-amber-950 p-6 sm:p-8 rounded-[2rem] border border-amber-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
              <div className="space-y-2">
                <span className="font-sans text-[9px] font-black text-amber-900/70 tracking-widest uppercase block">
                  [DRAFT_ASSESSMENT_SAVED_OK]
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-slate-900 tracking-tight uppercase leading-none">
                  Draft Needs Assessment Saved!
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-sans max-w-xl leading-relaxed font-medium">
                  Your 7-pillar Needs Assessment and company details have been saved as a working draft. You have <strong>not submitted</strong> this assessment yet.
                </p>
              </div>
              <div className="flex-shrink-0 bg-slate-900 text-white rounded-2xl p-4 font-sans space-y-1 text-center min-w-[150px] shadow-sm">
                <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">DRAFT_ID</span>
                <span className="text-sm font-black tracking-wider text-amber-300">{draftTrackingCode}</span>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase block mt-1 tracking-widest">
                  UNSUBMITTED_DRAFT
                </span>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-[2rem] p-6 space-y-4 shadow-sm">
              <h4 className="font-sans font-black text-sm sm:text-base text-slate-900 uppercase">What are the next steps?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-700 leading-relaxed">
                <div className="bg-slate-50/80 p-4 border border-slate-200/80 rounded-2xl">
                  <h5 className="font-sans font-bold text-slate-900 mb-1.5 uppercase">1. Access & Edit Your Draft</h5>
                  <p className="text-slate-600">
                    Log in to the <strong>SMME Self-Service Portal</strong> tab at any time using your registered company email (<strong className="text-slate-950 underline">{formData.email || "draft@example.co.za"}</strong>) or your Draft ID (<strong className="text-slate-900 font-extrabold">{draftTrackingCode}</strong>).
                  </p>
                </div>
                <div className="bg-slate-50/80 p-4 border border-slate-200/80 rounded-2xl">
                  <h5 className="font-sans font-bold text-slate-900 mb-1.5 uppercase">2. Checkboxes are Active</h5>
                  <p className="text-slate-600">
                    Inside the Self-Service Portal, because this assessment has not been submitted, the yes/no checkboxes remain <strong>completely active and editable</strong>. You can change your responses, add custom gaps, and save progress.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setIsDraftSaved(false);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-bold tracking-wider px-6 py-3 rounded-full shadow-md cursor-pointer transition-all uppercase"
              >
                [CREATE_NEW_OR_EDIT]
              </button>
            </div>
          </motion.div>
        ) : (
          track === "capability" ? (
            <motion.div
              key="success-capability"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 text-left py-4"
              id="app-success-view-capability"
            >
              {/* Header card with success state */}
              <div className="bg-slate-900/95 backdrop-blur-xl text-white p-6 sm:p-8 rounded-[2rem] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl shadow-slate-900/20">
                <div className="space-y-2">
                  <span className="font-sans text-[9px] font-bold text-amber-300 tracking-widest uppercase block">
                    [DIAGNOSTIC_ASSESSMENT_REPORT_V1]
                  </span>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-none">
                    Capability Diagnostic Recommendation Report
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl leading-relaxed">
                    Based on your 7-pillar Needs Assessment Questionnaire, the Capability Recommendation Engine has automatically determined your operational gaps and matched your enterprise with fully-subsidized interventions.
                  </p>
                </div>
                <div className="flex-shrink-0 bg-white text-slate-900 rounded-2xl border border-slate-200 p-4 font-sans space-y-1 text-center min-w-[150px] shadow-sm">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">TRACKING_CODE</span>
                  <span className="text-sm font-black tracking-wider">SPA-2026-X8B</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black px-2 py-0.5 rounded-full uppercase block mt-1 tracking-widest">
                    PRE-APPROVED
                  </span>
                </div>
              </div>

              {/* Profile details */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 sm:p-5 grid grid-cols-2 md:grid-cols-4 gap-4 font-sans text-xs text-slate-800 shadow-xs">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-extrabold tracking-wider">Enterprise Name</span>
                  <span className="font-black text-slate-900 text-xs sm:text-sm">{formData.companyName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-extrabold tracking-wider">CIPC Number</span>
                  <span className="font-extrabold text-slate-900">{formData.regNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-extrabold tracking-wider">Representative</span>
                  <span className="font-extrabold text-slate-900">{formData.ownerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-extrabold tracking-wider">Industry Sector</span>
                  <span className="font-extrabold text-slate-900">{formData.industry}</span>
                </div>
              </div>

              {/* Report Layout columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: 7/12 Gaps and Interventions */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
                    <FileText className="w-5 h-5 text-slate-900" />
                    <h4 className="font-sans font-black text-sm sm:text-base text-slate-900 uppercase">
                      1. Identified Capability Gaps & Recommended Interventions
                    </h4>
                  </div>

                  {getInterventionsReport().length === 0 ? (
                    <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-6 text-center font-sans text-xs text-slate-600 font-bold uppercase shadow-xs">
                      [NO_CAPABILITY_GAPS_IDENTIFIED]
                      <p className="mt-1 font-sans text-slate-500 font-normal">Your enterprise demonstrated high preparedness across all checked pillars.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getInterventionsReport().map((rep, idx) => (
                        <div key={rep.pillarId} className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden shadow-xs">
                          {/* Accent block */}
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-900" />
                          
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <span className="font-sans text-[9px] font-bold text-slate-400 block uppercase tracking-wider">[PILLAR_GAP_0{idx + 1}]</span>
                              <h5 className="font-sans font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                                {rep.pillarTitle.substring(3)}
                              </h5>
                            </div>
                            <span className="bg-slate-900 text-white font-sans text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                              {rep.intervention}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-sans font-bold text-rose-600 block uppercase tracking-wider">Detected Gaps:</span>
                            <ul className="space-y-1 pl-4 list-disc text-xs text-slate-700 font-sans font-medium">
                              {rep.gaps.map((g, gidx) => (
                                <li key={gidx}>{g}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 border-t border-dashed border-slate-200 flex justify-between items-center text-[11px] font-sans text-slate-600">
                            <span>Diagnostic Score: {rep.totalQuestions - rep.gapsCount} / {rep.totalQuestions} Passed</span>
                            <span className="font-sans text-[9px] text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-200 font-extrabold uppercase tracking-wider">[INTERVENTION_APPROVED]</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: 5/12 Service Provider Allocation */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
                    <Building2 className="w-5 h-5 text-slate-900" />
                    <h4 className="font-sans font-black text-sm sm:text-base text-slate-900 uppercase">
                      2. Subsidized Service Provider Matches
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {getInterventionsReport().map((rep) => {
                      const providerDirectory: Record<string, { name: string; contact: string; rating: string; logo: string }> = {
                        "Business Advisory": { name: "Apex Advisory Group", contact: "info@apexadvisory.co.za", rating: "4.9/5 ★", logo: "AA" },
                        "Business Planning": { name: "Vanguard Financial Modeling", contact: "partner@vanguardplan.com", rating: "4.8/5 ★", logo: "VF" },
                        "Technical Assistance": { name: "Product Lab Africa & QA Experts", contact: "compliance@productlab.co.za", rating: "4.9/5 ★", logo: "PL" },
                        "Skills Development": { name: "SME Academy South Africa", contact: "learn@smeacademy.org", rating: "4.7/5 ★", logo: "SA" },
                        "Mentorship & Incubation": { name: "The Jozi Innovation Hub", contact: "incubator@jozihub.org", rating: "4.9/5 ★", logo: "JH" },
                        "Digital Enablement": { name: "WebCraft Digital Solutions", contact: "build@webcraft.co.za", rating: "4.8/5 ★", logo: "WC" }
                      };
                      const match = providerDirectory[rep.intervention] || { name: "Provincial Business Hub", contact: "support@gauteng.gov.za", rating: "4.8/5", logo: "PB" };
                      return (
                        <div key={rep.pillarId} className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 space-y-3 font-sans text-xs shadow-xs">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 bg-slate-900 text-white border border-slate-800 flex items-center justify-center font-extrabold text-xs rounded-xl shadow-xs">
                              {match.logo}
                            </div>
                            <div>
                              <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">[RECOMMENDED_PROVIDER]</span>
                              <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{match.name}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1 text-[11px] text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">Allocation Status:</span>
                              <span className="text-emerald-700 font-extrabold uppercase">Pre-Assigned</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">Intervention Service:</span>
                              <span className="font-extrabold text-slate-900">{rep.intervention}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">Contact Point:</span>
                              <span className="underline font-bold text-slate-900">{match.contact}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">Provider Rating:</span>
                              <span className="font-extrabold text-amber-600">{match.rating}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => alert(`Intake session request dispatched successfully for ${match.name}! They will contact you within 48 hours.`)}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 text-[9px] font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-xs"
                          >
                            [SCHEDULE_INTAKE_SESSION]
                          </button>
                        </div>
                      );
                    })}

                    {/* Next Steps card */}
                    <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
                      <div className="flex items-center gap-1.5 text-slate-900">
                        <Award className="w-4 h-4 text-slate-900" />
                        <span className="font-sans text-[10px] font-black uppercase tracking-wider">Approved Workflow Progression</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-700 font-sans leading-relaxed">
                        Your Needs Assessment data will now be compiled into an <strong>Application Dossier Package</strong>. A dedicated service provider will contact you shortly to formulate your development plan. Once completed, your business will be automatically pre-qualified for <strong>Access to Capital & Markets</strong>.
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* Action buttons at bottom */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">[DIAGNOSTIC_COMPILATION_COMPLETE]</span>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      window.print();
                    }}
                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-extrabold tracking-wider px-6 py-3 rounded-full shadow-md cursor-pointer flex items-center justify-center gap-2 uppercase"
                  >
                    <Printer className="w-4 h-4 text-white" />
                    <span>[PRINT_DIAGNOSTIC_REPORT]</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFiles([]);
                      setFormData({
                        companyName: "",
                        regNumber: "",
                        industry: "Retail / E-commerce",
                        ownerName: "",
                        email: "",
                        phone: "",
                        selectedServices: [],
                        motivation: ""
                      });
                      setResponses({});
                      setActivePillarIdx(0);
                    }}
                    className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 font-sans text-xs font-extrabold tracking-wider px-6 py-3 rounded-full border border-slate-200/80 shadow-xs cursor-pointer uppercase"
                  >
                    [SUBMIT_ANOTHER_APPLICATION]
                  </button>
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 px-4 space-y-6"
              id="app-success-view"
            >
              <div className="w-20 h-20 border border-emerald-200 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-700 shadow-xs">
                <CheckCircle2 className="w-10 h-10 stroke-[2]" />
              </div>

              <div className="space-y-3">
                <span className="font-sans text-[9px] font-black text-slate-400 block tracking-widest uppercase">[TRANSMISSION_SUCCESS]</span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-slate-900 tracking-tight uppercase leading-none">
                  Application Received Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-md mx-auto">
                  Thank you for applying, <span className="font-extrabold text-slate-900">{formData.ownerName}</span>. Your application for <span className="font-extrabold text-slate-900">{formData.companyName}</span> has been securely logged in the portal.
                </p>
              </div>

              {/* Tracking Card */}
              <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-5 max-w-sm mx-auto text-left space-y-3 font-sans shadow-xs">
                <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2.5">
                  <span className="text-slate-500 font-bold uppercase">Tracking Code:</span>
                  <span className="font-black text-slate-900 tracking-wider">SPA-2026-X8B</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Registration Status:</span>
                    <span className="font-extrabold uppercase underline">Awaiting Review</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Attached Documents:</span>
                    <span className="font-extrabold">{files.length} file(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Target Categories:</span>
                    <span className="font-extrabold truncate max-w-[180px] text-right">
                      {formData.selectedServices.length > 0 ? formData.selectedServices.join(", ") : "All Categories"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 font-sans font-bold uppercase tracking-widest block pt-2">
                An email confirmation has been dispatched to {formData.email}
              </p>

              <div className="pt-2 font-sans text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFiles([]);
                    setFormData({
                      companyName: "",
                      regNumber: "",
                      industry: "Retail / E-commerce",
                      ownerName: "",
                      email: "",
                      phone: "",
                      selectedServices: [],
                      motivation: ""
                    });
                  }}
                  className="py-3 px-6 border border-slate-200/80 text-slate-900 bg-white hover:bg-slate-50 font-bold uppercase tracking-wider transition-all rounded-full cursor-pointer shadow-xs"
                >
                  [SUBMIT_ANOTHER_APPLICATION]
                </button>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}


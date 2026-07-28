/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  IconShieldAlert as Lock, 
  IconUserCheck as User, 
  IconCheckCircle as CheckCircle2, 
  IconTrendingUp as TrendingUp, 
  IconBuilding2 as Building, 
  IconClock as Clock, 
  IconArrowRight as ArrowRight, 
  IconArrowUpRight as ExternalLink, 
  IconFileText as FileText, 
  IconCheck as Check, 
  IconBriefcase as Briefcase, 
  IconGraduationCap as GraduationCap, 
  IconMonitor as Monitor, 
  IconUsers as Users, 
  IconSettings as Settings, 
  IconShieldAlert as AlertCircle, 
  IconFilter as Filter, 
  IconDatabase as Database, 
  IconCalendar as Calendar, 
  IconTerminal as Edit3, 
  IconShieldAlert as ShieldAlert, 
  IconArrowRight as LogIn, 
  IconRotateCcw as LogOut, 
  IconRotateCcw as RefreshCw,
  IconSearch as Search,
  IconFileText as BookOpen,
  IconAward as Award,
  IconChevronDown as ChevronDown,
  IconHelpCircle as Info
} from "./icons/CustomIcons";
import { motion, AnimatePresence } from "motion/react";
import SystemProcessFlow from "./SystemProcessFlow";
import AdminDashboard from "./AdminDashboard";
import { fmtText } from "../utils/format";

// Registered providers database structure
const PROVIDERS = [
  {
    id: "p1",
    name: "Apex Advisory Group",
    specialty: "Business Advisory",
    email: "info@apexadvisory.co.za",
    pin: "2026",
    logo: "AA",
    color: "emerald"
  },
  {
    id: "p2",
    name: "Vanguard Financial Modeling",
    specialty: "Business Planning",
    email: "partner@vanguardplan.com",
    pin: "2026",
    logo: "VF",
    color: "blue"
  },
  {
    id: "p3",
    name: "Product Lab Africa & QA Experts",
    specialty: "Technical Assistance",
    email: "compliance@productlab.co.za",
    pin: "2026",
    logo: "PL",
    color: "amber"
  },
  {
    id: "p4",
    name: "SME Academy South Africa",
    specialty: "Skills Development",
    email: "learn@smeacademy.org",
    pin: "2026",
    logo: "SA",
    color: "purple"
  },
  {
    id: "p5",
    name: "The Jozi Innovation Hub",
    specialty: "Mentorship & Incubation",
    email: "incubator@jozihub.org",
    pin: "2026",
    logo: "JH",
    color: "indigo"
  },
  {
    id: "p6",
    name: "WebCraft Digital Solutions",
    specialty: "Digital Enablement",
    email: "build@webcraft.co.za",
    pin: "2026",
    logo: "WC",
    color: "rose"
  }
];

// Helper to pre-populate default SMME matches if localStorage is empty
export const INITIAL_APPLICATIONS = [
  {
    id: "SATF-881249",
    companyName: "Modise Craft Boutique",
    regNumber: "2023/123456/07",
    industry: "Retail / E-commerce",
    ownerName: "Tsoanelo Modise",
    email: "tsoanelomodise@gmail.com",
    phone: "+27 82 123 4567",
    selectedServices: ["Business Advisory", "Business Planning", "Technical Assistance", "Skills Development", "Mentorship & Incubation", "Digital Enablement"],
    motivation: "We require professional quality compliance support, 3-5 year financial modelling, and assistance with establishing tax and export compliance to service corporate retail suppliers.",
    status: "Pre-Assigned",
    dateSubmitted: "2026-07-18T14:22:00.000Z",
    advisoryNotes: "",
    gaps: [
      {
        pillarTitle: "1. Strategy, Compliance & Governance",
        intervention: "Business Advisory",
        gaps: [
          "Has your business undergone a formal diagnostic to evaluate its current operational health and strategy?",
          "Do you have formalized cashflow management and financial management structures in place?",
          "Do you have formalized Human Resources (HR) policies and advisory support?"
        ]
      },
      {
        pillarTitle: "2. Investment Readiness & Planning",
        intervention: "Business Planning",
        gaps: [
          "Do you have a comprehensive, up-to-date business plan supported by current market research?",
          "Do you have an active financial model that projects your revenue and expenses for the next 3-5 years?",
          "Do you have an active pitch deck prepared for potential investors?"
        ]
      },
      {
        pillarTitle: "3. Product & Quality Assurance",
        intervention: "Technical Assistance",
        gaps: [
          "Does your core product require further development, prototype testing, or formal certification?",
          "Do you lack formal quality assurance certifications required by your industry (e.g., ISO, HAACP)?"
        ]
      },
      {
        pillarTitle: "7. Technological Infrastructure",
        intervention: "Digital Enablement",
        gaps: [
          "Does your business have a fully functional website and an e-commerce onboarding strategy?",
          "Are you currently utilizing formal digital marketing strategies?",
          "Have you successfully integrated digital accounting software or an ERP?"
        ]
      }
    ]
  },
  {
    id: "SATF-902341",
    companyName: "Amandla Arts & Crafts Ltd",
    regNumber: "2024/987654/07",
    industry: "Manufacturing & Craft",
    ownerName: "Thabo Mokoena",
    email: "thabo@amandla-arts.co.za",
    phone: "+27 71 555 4321",
    selectedServices: ["Business Advisory", "Skills Development", "Digital Enablement"],
    motivation: "Seeking structured mentorship and digital enablement to build an export-ready e-commerce portal for international audiences.",
    status: "Intake Scheduled",
    dateSubmitted: "2026-07-15T09:15:00.000Z",
    advisoryNotes: "Initial introductory call scheduled for July 25th to review standard strategy templates.",
    gaps: [
      {
        pillarTitle: "1. Strategy, Compliance & Governance",
        intervention: "Business Advisory",
        gaps: [
          "Has your business undergone a formal diagnostic to evaluate its current operational health and strategy?",
          "Do you have formalized cashflow management and financial management structures in place?"
        ]
      },
      {
        pillarTitle: "4. Team Capacity & Training",
        intervention: "Skills Development",
        gaps: [
          "Does your team lack modern digital skills or AI training?",
          "Do you need formal training in marketing, procurement, manufacturing, or project management?"
        ]
      }
    ]
  },
  {
    id: "SATF-341908",
    companyName: "Limpopo Organic Oils Co",
    regNumber: "2022/456123/07",
    industry: "Agriculture & Agro-processing",
    ownerName: "Naledi Ndlovu",
    email: "naledi@limpopoorganics.co.za",
    phone: "+27 82 555 9876",
    selectedServices: ["Technical Assistance", "Mentorship & Incubation"],
    motivation: "Our cold-press facility requires technical process audits and hygiene safety certification to unlock retail supply channels.",
    status: "Active",
    dateSubmitted: "2026-07-10T11:45:00.000Z",
    advisoryNotes: "Audit of cold press hygiene underway. Scheduled factory floor inspection.",
    gaps: [
      {
        pillarTitle: "3. Product & Quality Assurance",
        intervention: "Technical Assistance",
        gaps: [
          "Does your core product require further development, prototype testing, or formal certification?",
          "Do you lack formal quality assurance certifications required by your industry (e.g., ISO, HAACP)?"
        ]
      }
    ]
  },
  {
    id: "SATF-119402",
    companyName: "Lekker Bakes Bakery",
    regNumber: "2021/765432/07",
    industry: "Food & Beverages",
    ownerName: "Lerato Khumalo",
    email: "lerato@lekkerbakes.co.za",
    phone: "+27 83 234 5678",
    selectedServices: ["Digital Enablement"],
    motivation: "We need digital accounting and a reliable point of sale integration to manage our bakery's growing demand.",
    status: "Completed",
    dateSubmitted: "2026-07-01T08:30:00.000Z",
    advisoryNotes: "Successfully deployed cloud accounting software. Point of Sale hardware delivered and staff trained. Ready for market operations.",
    gaps: [
      {
        pillarTitle: "7. Technological Infrastructure",
        intervention: "Digital Enablement",
        gaps: [
          "Have you successfully integrated digital accounting software or an Enterprise Resource Planning (ERP) system?"
        ]
      }
    ]
  },
  {
    id: "SATF-552233",
    companyName: "Ubuntu Eco-Farms",
    regNumber: "2024/223344/07",
    industry: "Agriculture & Agro-processing",
    ownerName: "Nomsa Dube",
    email: "nomsa@ubuntueco.co.za",
    phone: "+27 72 345 6789",
    selectedServices: ["Business Advisory", "Skills Development", "Digital Enablement"],
    motivation: "We require strategic advisory on South African tax compliance, team training in international export readiness, and establishing a professional e-commerce store to sell fresh organic crops directly to consumers.",
    status: "Draft",
    dateSubmitted: "2026-07-20T10:15:00.000Z",
    advisoryNotes: "Draft needs assessment prepared by the owner for review.",
    gaps: [
      {
        pillarTitle: "1. Strategy, Compliance & Governance",
        intervention: "Business Advisory",
        gaps: [
          "Is your business fully compliant with current tax, legal, and industry-specific governance requirements?",
          "Do you have formalized Human Resources (HR) policies and advisory support?"
        ]
      },
      {
        pillarTitle: "4. Team Capacity & Training",
        intervention: "Skills Development",
        gaps: [
          "Are you looking to expand internationally but lack \"Export Readiness\" training?"
        ]
      },
      {
        pillarTitle: "7. Technological Infrastructure",
        intervention: "Digital Enablement",
        gaps: [
          "Does your business have a fully functional website and an e-commerce onboarding strategy?"
        ]
      }
    ]
  },
  {
    id: "SATF-104928",
    companyName: "Soweto Logistics Hub",
    regNumber: "2023/554433/07",
    industry: "Retail / E-commerce",
    ownerName: "Sipho Cele",
    email: "sipho@sowetologistics.co.za",
    phone: "+27 81 777 6655",
    selectedServices: ["Business Planning", "Digital Enablement"],
    motivation: "Our township distribution hub needs proper 3-5 year financial modeling to pitch to prospective logistics partners, and digital systems (POS/ERP) to optimize delivery routes and inventory tracking.",
    status: "Pre-Assigned",
    dateSubmitted: "2026-07-19T11:40:00.000Z",
    advisoryNotes: "Pending allocation of an approved Business Planning advisory firm.",
    gaps: [
      {
        pillarTitle: "2. Investment Readiness & Planning",
        intervention: "Business Planning",
        gaps: [
          "Do you have an active financial model that projects your revenue and expenses for the next 3-5 years?",
          "Is your business currently considered \"investment ready\" by formal funding institutions?"
        ]
      },
      {
        pillarTitle: "7. Technological Infrastructure",
        intervention: "Digital Enablement",
        gaps: [
          "Have you successfully integrated digital accounting software or an Enterprise Resource Planning (ERP) system?"
        ]
      }
    ]
  },
  {
    id: "SATF-420951",
    companyName: "Karoo Pure Spring Water",
    regNumber: "2022/887766/07",
    industry: "Manufacturing & Craft",
    ownerName: "David Botha",
    email: "david@karoopure.co.za",
    phone: "+27 82 888 1122",
    selectedServices: ["Technical Assistance", "Mentorship & Incubation"],
    motivation: "Our local Karoo water-bottling plant requires urgent technical guidance on ISO quality standards compliance, alongside personal executive coaching for the founding team to handle scaled production demands.",
    status: "Active",
    dateSubmitted: "2026-07-16T15:30:00.000Z",
    advisoryNotes: "Assigned to SEDA Quality Assurance specialists. Scheduled on-site water purification systems audit for next week.",
    gaps: [
      {
        pillarTitle: "3. Product & Quality Assurance",
        intervention: "Technical Assistance",
        gaps: [
          "Do you lack formal quality assurance certifications required by your industry (e.g., ISO, HAACP)?"
        ]
      },
      {
        pillarTitle: "6. Leadership & Guidance",
        intervention: "Mentorship & Incubation",
        gaps: [
          "Do the founders or directors require executive or business coaching?"
        ]
      }
    ]
  }
];

// The 7-Pillar standard diagnostic gaps mapping for interactive user editing
const PILLAR_STANDARD_GAPS = [
  {
    specialty: "Business Advisory",
    title: "1. Strategy, Compliance & Governance",
    gaps: [
      "Has your business undergone a formal diagnostic to evaluate its current operational health and strategy?",
      "Do you have formalized cashflow management and financial management structures in place?",
      "Is your business fully compliant with current tax, legal, and industry-specific governance requirements?",
      "Do you have formalized Human Resources (HR) policies and advisory support?"
    ]
  },
  {
    specialty: "Business Planning",
    title: "2. Investment Readiness & Planning",
    gaps: [
      "Do you have a comprehensive, up-to-date business plan supported by current market research?",
      "Do you have an active financial model that projects your revenue and expenses for the next 3-5 years?",
      "Do you have a professional pitch deck prepared for potential investors or buyers?",
      "Is your business currently considered \"investment ready\" by formal funding institutions?"
    ]
  },
  {
    specialty: "Technical Assistance",
    title: "3. Product & Quality Assurance",
    gaps: [
      "Does your core product require further development, prototype testing, or formal certification?",
      "Do you lack formal quality assurance certifications required by your industry (e.g., ISO, HAACP)?",
      "Do you need assistance with intellectual property (IP) registration or trademarking?",
      "Does your product require professional branding or packaging design to compete in the market?"
    ]
  },
  {
    specialty: "Skills Development",
    title: "4. Team Capacity & Training",
    gaps: [
      "Do you or your staff require training in foundational entrepreneurship or financial literacy?",
      "Are you looking to expand internationally but lack 'Export Readiness' training?",
      "Does your team lack modern digital skills or AI training?",
      "Do you need formal training in marketing, procurement, manufacturing, or project management?"
    ]
  },
  {
    specialty: "Mentorship & Incubation",
    title: "5 & 6. Ecosystem, Leadership & Guidance",
    gaps: [
      "Would your business benefit from joining an accelerator programme or innovation hub?",
      "Do you require access to physical incubation spaces (e.g., office space, shared manufacturing facilities)?",
      "Would your startup benefit from virtual incubation and specialized technology support?",
      "Would you benefit from being allocated an industry-specific mentor to guide your growth?",
      "Do the founders or directors require executive or business coaching?",
      "Would you like to participate in structured peer-learning groups with other entrepreneurs?"
    ]
  },
  {
    specialty: "Digital Enablement",
    title: "7. Technological Infrastructure",
    gaps: [
      "Does your business have a fully functional website and an e-commerce onboarding strategy?",
      "Are you currently utilizing formal digital marketing strategies to reach customers?",
      "Do you have a modern Point of Sale (POS) system integrated into your daily operations?",
      "Have you successfully integrated digital accounting software or an Enterprise Resource Planning (ERP) system?"
    ]
  }
];

// The 7-Pillar questions matching ApplicationForm.tsx for exact yes/no checkbox replication
const PILLAR_QUESTIONS = [
  {
    id: "strategy",
    title: "1. Strategy, Compliance & Governance",
    recommendation: "Business Advisory",
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
    questions: [
      { id: "q7_1", text: "Does your business have a fully functional website and an e-commerce onboarding strategy?", recommendOn: "no" },
      { id: "q7_2", text: "Are you currently utilizing formal digital marketing strategies to reach customers?", recommendOn: "no" },
      { id: "q7_3", text: "Do you have a modern Point of Sale (POS) system integrated into your daily operations?", recommendOn: "no" },
      { id: "q7_4", text: "Have you successfully integrated digital accounting software or an Enterprise Resource Planning (ERP) system?", recommendOn: "no" }
    ]
  }
];

const getSpecialtyIcon = (specialty: string) => {
  switch (specialty) {
    case "Business Advisory":
      return <Briefcase className="w-4 h-4 text-emerald-600" />;
    case "Business Planning":
      return <TrendingUp className="w-4 h-4 text-blue-600" />;
    case "Technical Assistance":
      return <Award className="w-4 h-4 text-amber-600" />;
    case "Skills Development":
      return <GraduationCap className="w-4 h-4 text-purple-600" />;
    case "Mentorship & Incubation":
      return <Users className="w-4 h-4 text-indigo-600" />;
    case "Digital Enablement":
      return <Monitor className="w-4 h-4 text-rose-600" />;
    default:
      return <FileText className="w-4 h-4 text-slate-600" />;
  }
};

interface ProviderPortalProps {
  onViewChange?: (view: "capability" | "markets" | "provider" | "admin" | "flow" | "apply") => void;
  showAnnotations?: boolean;
}

export default function ProviderPortal({ onViewChange, showAnnotations = true }: ProviderPortalProps) {
  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [loggedInProvider, setLoggedInProvider] = useState<typeof PROVIDERS[0] | null>(() => {
    const stored = localStorage.getItem("satf_logged_in_provider");
    if (stored) {
      if (stored === "none" || stored === "null") return null;
      try { return JSON.parse(stored); } catch (e) {}
    }
    return PROVIDERS[0];
  });
  const [loginError, setLoginError] = useState("");

  const updateLoggedInProvider = (provider: typeof PROVIDERS[0] | null) => {
    setLoggedInProvider(provider);
    if (provider) {
      localStorage.setItem("satf_logged_in_provider", JSON.stringify(provider));
    } else {
      localStorage.setItem("satf_logged_in_provider", "none");
    }
    window.dispatchEvent(new CustomEvent("satf-provider-changed"));
  };
  
  // Multi-Portal Login State
  const [loginMode, setLoginMode] = useState<"provider" | "user" | "insights">("provider");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [userLoginError, setUserLoginError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<any | null>(() => {
    const stored = localStorage.getItem("satf_logged_in_user");
    if (stored) {
      if (stored === "none" || stored === "null") return null;
      try { return JSON.parse(stored); } catch (e) {}
    }
    return null;
  });

  const updateLoggedInUser = (user: any | null) => {
    setLoggedInUser(user);
    if (user) {
      localStorage.setItem("satf_logged_in_user", JSON.stringify(user));
    } else {
      localStorage.setItem("satf_logged_in_user", "none");
    }
    window.dispatchEvent(new CustomEvent("satf-session-changed"));
  };
  const [selectedUserAppId, setSelectedUserAppId] = useState<string>("");
  const [userResponses, setUserResponses] = useState<Record<string, "yes" | "no" | "not_sure">>({});
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");

  // Operational Insights State
  const [selectedInsightsRole, setSelectedInsightsRole] = useState("SATF Fund Executive Manager");
  const [insightsPinInput, setInsightsPinInput] = useState("");
  const [insightsLoginError, setInsightsLoginError] = useState("");
  const [loggedInInsights, setLoggedInInsights] = useState<any | null>(null);
  const [activeInsightsTab, setActiveInsightsTab] = useState<"metrics" | "pillars" | "flow">("metrics");

  // SMME Edit profile states
  const [userCompanyName, setUserCompanyName] = useState("");
  const [userOwnerName, setUserOwnerName] = useState("");
  const [userRegNumber, setUserRegNumber] = useState("");
  const [userIndustry, setUserIndustry] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userMotivation, setUserMotivation] = useState("");
  const [userSelectedServices, setUserSelectedServices] = useState<string[]>([]);
  const [userGapsMap, setUserGapsMap] = useState<Record<string, string[]>>({});
  const [userCustomGaps, setUserCustomGaps] = useState<Record<string, string>>({});

  // SMME Applications Store loaded from localStorage
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Pre-Assigned" | "Intake Scheduled" | "Active" | "Completed">("All");

  // Load and sync providers if available, or fall back to PROVIDERS
  const [providers, setProviders] = useState<any[]>(PROVIDERS);

  const loadProviders = () => {
    const stored = localStorage.getItem("satf_providers_admin");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProviders(parsed);
          return;
        }
      } catch (e) {
        console.error("Error loading providers in provider portal", e);
      }
    }
    setProviders(PROVIDERS);
  };

  // Load and sync applications
  const loadApps = () => {
    const stored = localStorage.getItem("satf_applications");
    let currentList = INITIAL_APPLICATIONS;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge initial applications by ID to prevent losing user-created records
          const merged = [...parsed];
          INITIAL_APPLICATIONS.forEach(initial => {
            if (!merged.some(m => m.id === initial.id)) {
              merged.push(initial);
            }
          });
          currentList = merged;
          localStorage.setItem("satf_applications", JSON.stringify(merged));
        }
      } catch (e) {
        console.error("Error parsing stored applications", e);
      }
    } else {
      localStorage.setItem("satf_applications", JSON.stringify(INITIAL_APPLICATIONS));
    }
    
    setApplications(currentList);
    
    // Sync active user if loaded
    if (loggedInUser) {
      const fresh = currentList.find(u => u.id === loggedInUser.id);
      if (fresh) {
        updateLoggedInUser(fresh);
      }
    }
  };

  useEffect(() => {
    loadApps();
    loadProviders();

    // Listen to form submissions to live-update matching data and global logout requests
    const handleSubmissionSuccess = () => {
      loadApps();
      loadProviders();
    };
    const handleGlobalLogout = () => {
      handleLogout();
    };
    window.addEventListener("blueprint-submit-success", handleSubmissionSuccess);
    window.addEventListener("satf-logout", handleGlobalLogout);
    return () => {
      window.removeEventListener("blueprint-submit-success", handleSubmissionSuccess);
      window.removeEventListener("satf-logout", handleGlobalLogout);
    };
  }, [loggedInUser?.id]);

  // Handle Provider Authentication
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError("");

    const provider = providers.find(p => p.id === selectedProviderId);
    if (!provider) {
      setLoginError("Please select an approved Service Provider.");
      return;
    }

    if (pinInput !== provider.pin) {
      setLoginError("Invalid Security PIN code. Try '2026'.");
      return;
    }

    // Authenticated
    updateLoggedInProvider(provider);
    
    // Log auth action to custom console log
    window.dispatchEvent(new CustomEvent("blueprint-submit-started", {
      detail: { 
        formData: { 
          companyName: `PROVIDER_AUTH_GATE: ${provider.name}` 
        } 
      }
    }));

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("blueprint-submit-success", {
        detail: {
          formData: { 
            companyName: provider.name,
            selectedServices: [provider.specialty],
            phone: "011-SATF-AUTH"
          },
          trackingCode: `AUTH-SESSION-${provider.logo}`
        }
      }));
    }, 400);
  };

  // Quick autofill and login for provider
  const handleQuickLogin = (provider: typeof PROVIDERS[0]) => {
    setSelectedProviderId(provider.id);
    setPinInput(provider.pin);
    updateLoggedInProvider(provider);
    setLoginError("");
    
    window.dispatchEvent(new CustomEvent("blueprint-submit-started", {
      detail: { 
        formData: { 
          companyName: `SESSION_INIT: ${provider.name}` 
        } 
      }
    }));
  };

  // Handle User Login
  const handleUserLogin = () => {
    setUserLoginError("");
    const search = userSearchInput.trim().toLowerCase();
    if (!search) {
      setUserLoginError("Please enter your registered email address or tracking ID.");
      return;
    }

    const matchedUser = applications.find(
      app => app.id.toLowerCase() === search || app.email.toLowerCase() === search
    );

    if (!matchedUser) {
      setUserLoginError("No application record found with this Email or Tracking ID.");
      return;
    }

    loginAsUser(matchedUser);
  };

  const handleUserQuickLogin = (userApp: any) => {
    loginAsUser(userApp);
  };

  const loginAsUser = (app: any) => {
    updateLoggedInUser(app);
    setSelectedUserAppId(app.id);
    setUserCompanyName(app.companyName || "");
    setUserOwnerName(app.ownerName || "");
    setUserRegNumber(app.regNumber || "");
    setUserIndustry(app.industry || "Retail / E-commerce");
    setUserEmail(app.email || "");
    setUserPhone(app.phone || "");
    setUserMotivation(app.motivation || "");
    setUserSelectedServices(app.selectedServices || []);
    
    // Build gaps map
    const map: Record<string, string[]> = {};
    PILLAR_STANDARD_GAPS.forEach(p => {
      map[p.specialty] = [];
    });
    if (app.gaps) {
      app.gaps.forEach((g: any) => {
        map[g.intervention] = g.gaps || [];
      });
    }
    setUserGapsMap(map);
    setUserLoginError("");

    // Log user login in simulation console
    window.dispatchEvent(new CustomEvent("blueprint-submit-started", {
      detail: { 
        formData: { 
          companyName: `USER_SESSION_INIT: ${app.companyName}` 
        } 
      }
    }));
  };

  // Derived state to get currently selected user application / assessment
  const selectedUserApp = applications.find(app => app.id === selectedUserAppId) || loggedInUser;

  // Synchronize inputs when selectedUserAppId or loggedInUser ID changes
  useEffect(() => {
    if (!selectedUserApp) return;
    setUserCompanyName(selectedUserApp.companyName || "");
    setUserOwnerName(selectedUserApp.ownerName || "");
    setUserRegNumber(selectedUserApp.regNumber || "");
    setUserIndustry(selectedUserApp.industry || "Retail / E-commerce");
    setUserEmail(selectedUserApp.email || "");
    setUserPhone(selectedUserApp.phone || "");
    setUserMotivation(selectedUserApp.motivation || "");
    setUserSelectedServices(selectedUserApp.selectedServices || []);
    
    // Build gaps map
    const map: Record<string, string[]> = {};
    PILLAR_STANDARD_GAPS.forEach(p => {
      map[p.specialty] = [];
    });
    if (selectedUserApp.gaps) {
      selectedUserApp.gaps.forEach((g: any) => {
        map[g.intervention] = g.gaps || [];
      });
    }
    setUserGapsMap(map);

    // Build user responses mapping
    const res: Record<string, "yes" | "no" | "not_sure"> = {};
    if (selectedUserApp.responses) {
      setUserResponses({ ...selectedUserApp.responses });
    } else {
      // Reconstruct responses mapping from gaps
      PILLAR_QUESTIONS.forEach(p => {
        p.questions.forEach(q => {
          const specialtyGaps = map[p.recommendation] || [];
          if (q.recommendOn === "no") {
            if (specialtyGaps.includes(q.text)) {
              res[q.id] = "no";
            } else {
              res[q.id] = "yes";
            }
          } else {
            if (specialtyGaps.includes(q.text)) {
              res[q.id] = "yes";
            } else {
              res[q.id] = "no";
            }
          }
        });
      });
      setUserResponses(res);
    }
  }, [selectedUserAppId, loggedInUser?.id]);

  // Synchronize questionnaire responses with requested services and gaps in the Provider Portal
  useEffect(() => {
    if (!loggedInUser || !selectedUserApp || selectedUserApp.status !== "Draft") return;
    
    const triggeredInterventions = new Set<string>();
    
    PILLAR_QUESTIONS.forEach(p => {
      p.questions.forEach(q => {
        const resp = userResponses[q.id];
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

    setUserSelectedServices(Array.from(triggeredInterventions));

    // Also update userGapsMap automatically!
    const map: Record<string, string[]> = {};
    PILLAR_STANDARD_GAPS.forEach(p => {
      map[p.specialty] = [];
    });
    
    PILLAR_QUESTIONS.forEach(p => {
      p.questions.forEach(q => {
        const resp = userResponses[q.id];
        if (!resp) return;
        if (q.recommendOn === "no") {
          if (resp === "no" || resp === "not_sure") {
            map[p.recommendation].push(q.text);
          }
        } else {
          if (resp === "yes") {
            map[p.recommendation].push(q.text);
          }
        }
      });
    });
    
    setUserGapsMap(map);
  }, [userResponses, selectedUserAppId]);

  // Handle specialty toggle in User Assessment editor
  const handleSpecialtyToggle = (specialty: string) => {
    if (userSelectedServices.includes(specialty)) {
      setUserSelectedServices(prev => prev.filter(s => s !== specialty));
      setUserGapsMap(prev => ({ ...prev, [specialty]: [] }));
    } else {
      setUserSelectedServices(prev => [...prev, specialty]);
      const pGaps = PILLAR_STANDARD_GAPS.find(p => p.specialty === specialty);
      if (pGaps && pGaps.gaps.length > 0) {
        setUserGapsMap(prev => ({
          ...prev,
          [specialty]: [pGaps.gaps[0]]
        }));
      }
    }
  };

  // Handle standard gap toggle
  const handleGapToggle = (specialty: string, gapText: string) => {
    setUserGapsMap(prev => {
      const currentGaps = prev[specialty] || [];
      const updated = currentGaps.includes(gapText)
        ? currentGaps.filter(g => g !== gapText)
        : [...currentGaps, gapText];
      
      return {
        ...prev,
        [specialty]: updated
      };
    });

    if (!userSelectedServices.includes(specialty)) {
      setUserSelectedServices(prev => [...prev, specialty]);
    }
  };

  // Handle custom gap added by user
  const handleAddCustomGap = (specialty: string) => {
    const customText = userCustomGaps[specialty]?.trim();
    if (!customText) return;
    
    setUserGapsMap(prev => {
      const current = prev[specialty] || [];
      if (current.includes(customText)) return prev;
      return {
        ...prev,
        [specialty]: [...current, customText]
      };
    });
    
    if (!userSelectedServices.includes(specialty)) {
      setUserSelectedServices(prev => [...prev, specialty]);
    }
    
    setUserCustomGaps(prev => ({ ...prev, [specialty]: "" }));
  };

  // Save or submit changes to user assessment
  const handleSaveUserAssessment = (submitForm: boolean = false) => {
    if (!loggedInUser || !selectedUserApp) return;
    
    const updatedGaps = userSelectedServices.map(specialty => {
      const pillarInfo = PILLAR_STANDARD_GAPS.find(p => p.specialty === specialty);
      const title = pillarInfo ? pillarInfo.title : `${specialty} Support Gaps`;
      return {
        pillarTitle: title,
        intervention: specialty,
        gaps: userGapsMap[specialty] || []
      };
    }).filter(g => g.gaps.length > 0);
    
    const targetStatus = submitForm ? "Pre-Assigned" : (selectedUserApp.status || "Draft");

    const updatedApp = {
      ...selectedUserApp,
      companyName: userCompanyName.trim() || "Anonymous SMME",
      ownerName: userOwnerName.trim() || "Representative Owner",
      regNumber: userRegNumber.trim() || "2026/000000/07",
      industry: userIndustry,
      email: userEmail.trim(),
      phone: userPhone.trim(),
      motivation: userMotivation.trim(),
      selectedServices: userSelectedServices,
      gaps: updatedGaps,
      responses: userResponses,
      status: targetStatus
    };
    
    const nextApplications = applications.map(app => {
      if (app.id === selectedUserAppId) {
        return updatedApp;
      }
      return app;
    });
    
    setApplications(nextApplications);
    localStorage.setItem("satf_applications", JSON.stringify(nextApplications));

    if (loggedInUser.id === selectedUserAppId) {
      updateLoggedInUser(updatedApp);
    }
    
    // Success animation logs
    window.dispatchEvent(new CustomEvent("blueprint-submit-started", {
      detail: { 
        formData: { 
          companyName: `USER_NEEDS_UPDATE: App ID ${selectedUserAppId}` 
        } 
      }
    }));
    
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("blueprint-submit-success", {
        detail: {
          formData: { 
            companyName: updatedApp.companyName,
            selectedServices: updatedApp.selectedServices,
            phone: `Tracking ID: ${updatedApp.id}`
          },
          trackingCode: `NEEDS-SYNC-OK`
        }
      }));
    }, 300);
    
    setSaveSuccessMessage(submitForm ? "🎉 Assessment successfully submitted! Answers are now locked." : "💾 Assessment draft saved and synchronized successfully!");
    setTimeout(() => {
      setSaveSuccessMessage("");
    }, 4000);
  };

  // Handle Operational Insights Authentication
  const handleInsightsLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setInsightsLoginError("");

    if (!insightsPinInput.trim()) {
      setInsightsLoginError("Please enter your Security PIN code.");
      return;
    }

    if (!["2026", "9900", "1234", "8888", "admin"].includes(insightsPinInput.trim())) {
      setInsightsLoginError("Invalid Security PIN code. Try '2026'.");
      return;
    }

    const session = {
      role: selectedInsightsRole,
      analystId: `SATF-ANALYST-${Math.floor(100 + Math.random() * 900)}`,
      authenticatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pin: insightsPinInput
    };

    setLoggedInInsights(session);
    if (onViewChange) {
      onViewChange("admin");
    }
    
    window.dispatchEvent(new CustomEvent("blueprint-submit-started", {
      detail: { 
        formData: { 
          companyName: `INSIGHTS_AUTH_GATE: ${selectedInsightsRole}` 
        } 
      }
    }));

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("blueprint-submit-success", {
        detail: {
          formData: { 
            companyName: selectedInsightsRole,
            selectedServices: ["Operational Performance Analytics"],
            phone: "011-SATF-ANALYTICS"
          },
          trackingCode: `INSIGHTS-SESSION-OK`
        }
      }));
    }, 400);
  };

  const handleInsightsQuickLogin = (role: string) => {
    setSelectedInsightsRole(role);
    setInsightsPinInput("2026");
    setInsightsLoginError("");
    
    const session = {
      role: role,
      analystId: `SATF-ANALYST-2026`,
      authenticatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pin: "2026"
    };

    setLoggedInInsights(session);
    if (onViewChange) {
      onViewChange("admin");
    }

    window.dispatchEvent(new CustomEvent("blueprint-submit-started", {
      detail: { 
        formData: { 
          companyName: `INSIGHTS_QUICK_AUTH: ${role}` 
        } 
      }
    }));
  };

  // Log out
  const handleLogout = () => {
    updateLoggedInProvider(null);
    updateLoggedInUser(null);
    setLoggedInInsights(null);
    setSelectedApp(null);
    setPinInput("");
    setUserSearchInput("");
    setInsightsPinInput("");
  };

  // Save changes to notes or status of an application (Provider role)
  const updateApplication = (appId: string, updatedFields: Partial<any>) => {
    const updated = applications.map(app => {
      if (app.id === appId) {
        const nextApp = { ...app, ...updatedFields };
        if (selectedApp && selectedApp.id === appId) {
          setSelectedApp(nextApp);
        }
        return nextApp;
      }
      return app;
    });

    setApplications(updated);
    localStorage.setItem("satf_applications", JSON.stringify(updated));

    // Dispatch log update to Blueprint Controller Console
    const changedFieldsStr = Object.keys(updatedFields).map(k => `${k}='${(updatedFields as any)[k]}'`).join(", ");
    
    window.dispatchEvent(new CustomEvent("blueprint-submit-started", {
      detail: { 
        formData: { 
          companyName: `TRANS_UPDATE: App ID ${appId}` 
        } 
      }
    }));

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("blueprint-submit-success", {
        detail: {
          formData: { 
            companyName: `ID: ${appId}`,
            selectedServices: [loggedInProvider?.specialty || "Intervention"],
            phone: `Action: ${changedFieldsStr}`
          },
          trackingCode: `DB-TX-SYNC`
        }
      }));
    }, 300);
  };

  // Filter application list based on active provider and filters
  const getMatchedApplications = () => {
    if (!loggedInProvider) return [];

    return applications.filter(app => {
      const isMatchedSpecialty = app.selectedServices?.includes(loggedInProvider.specialty);
      if (!isMatchedSpecialty) return false;

      // Check if there is an explicit assignment for this specialty
      const assignedId = app.assignedProviders?.[loggedInProvider.specialty];
      if (assignedId) {
        // If explicitly assigned to someone else, we don't show it.
        // If explicitly assigned to us, we show it!
        if (assignedId !== loggedInProvider.id) return false;
      } else {
        // Fallback: Check if this loggedInProvider is the default provider for this specialty
        const defaultProviderForSpecialty = providers.find(p => p.specialty === loggedInProvider.specialty);
        if (defaultProviderForSpecialty && defaultProviderForSpecialty.id !== loggedInProvider.id) {
          // If we are not the default provider, and there's no explicit assignment, we don't show it
          return false;
        }
      }

      if (statusFilter !== "All" && app.status !== statusFilter) return false;

      if (searchTerm.trim() !== "") {
        const s = searchTerm.toLowerCase();
        const matchesCompany = app.companyName?.toLowerCase().includes(s);
        const matchesOwner = app.ownerName?.toLowerCase().includes(s);
        const matchesReg = app.regNumber?.toLowerCase().includes(s);
        const matchesId = app.id?.toLowerCase().includes(s);
        if (!matchesCompany && !matchesOwner && !matchesReg && !matchesId) return false;
      }

      return true;
    });
  };

  const matchedApps = getMatchedApplications();

  // Color mapping based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Pre-Assigned":
        return "bg-slate-100 text-slate-800 border-slate-350 font-bold border";
      case "Intake Scheduled":
        return "bg-amber-100 text-amber-900 border-amber-300 font-bold border";
      case "Active":
        return "bg-emerald-100 text-emerald-800 font-semibold rounded-full px-3 py-1 text-[10px] tracking-wide";
      case "Completed":
        return "bg-sky-100 text-sky-800 font-semibold rounded-full px-3 py-1 text-[10px] tracking-wide";
      default:
        return "bg-slate-100 text-slate-700 font-semibold rounded-full px-3 py-1 text-[10px] tracking-wide";
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#e2f3ec] via-[#f7f1ec] to-[#e5e9f8] w-full flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-2xl flex flex-col justify-center min-h-[calc(100vh-140px)]" id="provider-portal-container">
      {/* Soft background ambient mesh glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      


      <AnimatePresence mode="wait">
        {!loggedInProvider && !loggedInUser && !loggedInInsights ? (
          /* LOGIN FLOW GATE */
          <motion.div
            key="login-gate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md mx-auto space-y-6 text-left"
          >
            {/* Triple Login Tab Control */}
            <div className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-full border border-white/90 shadow-sm overflow-x-auto">
              <button
                type="button"
                onClick={() => {
                  setLoginMode("provider");
                  setLoginError("");
                  setUserLoginError("");
                  setInsightsLoginError("");
                }}
                className={`flex-1 font-sans text-xs font-semibold py-2.5 px-3 rounded-full transition-all cursor-pointer uppercase text-center whitespace-nowrap ${
                  loginMode === "provider"
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                PROVIDER
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMode("user");
                  setLoginError("");
                  setUserLoginError("");
                  setInsightsLoginError("");
                }}
                className={`flex-1 font-sans text-xs font-semibold py-2.5 px-3 rounded-full transition-all cursor-pointer uppercase text-center whitespace-nowrap ${
                  loginMode === "user"
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                SMME
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMode("insights");
                  setLoginError("");
                  setUserLoginError("");
                  setInsightsLoginError("");
                }}
                className={`flex-1 font-sans text-xs font-semibold py-2.5 px-3 rounded-full transition-all cursor-pointer uppercase text-center whitespace-nowrap ${
                  loginMode === "insights"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                INSIGHTS
              </button>
            </div>

            {loginMode === "provider" ? (
              /* PROVIDER AUTHENTICATION FORM */
              <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-7 sm:p-9 space-y-6 relative shadow-xl shadow-slate-900/5">
                <div className="space-y-1.5 text-center">
                  <h4 className="font-sans font-extrabold text-base text-slate-900 uppercase tracking-wide">
                    Service Provider Authentication
                  </h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    Select your assigned organization and enter the security PIN code to access matched SMME profiles.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-700 tracking-wide block uppercase">
                      PROVIDER ORGANIZATION
                    </label>
                    <select
                      value={selectedProviderId}
                      onChange={(e) => setSelectedProviderId(e.target.value)}
                      className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-3 px-5 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all cursor-pointer shadow-2xs"
                    >
                      <option value="">-- Choose Approved Provider --</option>
                      {providers.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.specialty})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-700 tracking-wide block uppercase">
                      SECURITY PIN CODE
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Security PIN Code"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-3 px-5 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all shadow-2xs"
                    />
                  </div>

                  {loginError && (
                    <div className="bg-red-50/90 border border-red-200 text-red-800 text-xs font-sans p-3.5 rounded-2xl flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-semibold uppercase tracking-wider py-4 rounded-full shadow-lg shadow-slate-900/15 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    AUTHENTICATE CREDENTIALS
                  </button>
                </form>
              </div>
            ) : loginMode === "user" ? (
              /* SMME USER AUTHENTICATION FORM */
              <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-7 sm:p-9 space-y-6 relative shadow-xl shadow-slate-900/5">
                <div className="space-y-1.5 text-center">
                  <h4 className="font-sans font-extrabold text-base text-slate-900 uppercase tracking-wide">
                    Applicant / SMME Access
                  </h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    Enter your registered company email address or application tracking ID to view allocations and edit your assessment gaps.
                  </p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleUserLogin(); }} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-700 tracking-wide block uppercase">
                      REGISTERED EMAIL OR TRACKING ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. tsoanelomodise@gmail.com or SATF-881249"
                      value={userSearchInput}
                      onChange={(e) => {
                        setUserSearchInput(e.target.value);
                        setUserLoginError("");
                      }}
                      className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-3 px-5 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all shadow-2xs"
                    />
                  </div>

                  {userLoginError && (
                    <div className="bg-red-50/90 border border-red-200 text-red-800 text-xs font-sans p-3.5 rounded-2xl flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{userLoginError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-semibold uppercase tracking-wider py-4 rounded-full shadow-lg shadow-slate-900/15 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    VERIFY AND OPEN PORTAL
                  </button>
                </form>
              </div>
            ) : (
              /* OPERATIONAL INSIGHTS AUTHENTICATION FORM */
              <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-7 sm:p-9 space-y-6 relative shadow-xl shadow-slate-900/5">
                <div className="space-y-1.5 text-center">
                  <h4 className="font-sans font-extrabold text-base text-slate-900 uppercase tracking-wide">
                    Operational Insights Authentication
                  </h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    Select your Fund Executive or Operational Auditor credentials and enter your security PIN code to access performance metrics & system intelligence.
                  </p>
                </div>

                <form onSubmit={handleInsightsLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-700 tracking-wide block uppercase">
                      OPERATIONAL ROLE / CREDENTIAL
                    </label>
                    <select
                      value={selectedInsightsRole}
                      onChange={(e) => setSelectedInsightsRole(e.target.value)}
                      className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-3 px-5 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all cursor-pointer shadow-2xs"
                    >
                      <option value="SATF Fund Executive Manager">SATF Fund Executive Manager</option>
                      <option value="SATF Operations Analyst & Auditor">SATF Operations Analyst & Auditor</option>
                      <option value="National SMME Performance Director">National SMME Performance Director</option>
                      <option value="Department of Small Business Development Representative">DSBD Government Representative</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-700 tracking-wide block uppercase">
                      SECURITY PIN CODE
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Security PIN Code (e.g. 2026)"
                      value={insightsPinInput}
                      onChange={(e) => setInsightsPinInput(e.target.value)}
                      className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-3 px-5 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all shadow-2xs"
                    />
                  </div>

                  {insightsLoginError && (
                    <div className="bg-red-50/90 border border-red-200 text-red-800 text-xs font-sans p-3.5 rounded-2xl flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{insightsLoginError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-xs font-semibold uppercase tracking-wider py-4 rounded-full shadow-lg shadow-indigo-600/15 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    AUTHENTICATE ANALYTICS SESSION
                  </button>
                </form>
              </div>
            )}

            {/* Quick Demo Login Panels */}
            {loginMode === "provider" ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Info className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider">Approved Provider Directory:</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {providers.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => handleQuickLogin(p)}
                      className="bg-white/80 hover:bg-white border border-white/90 rounded-[1.25rem] p-3 text-left font-sans text-[10px] transition-all shadow-2xs hover:shadow-md group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 truncate block group-hover:text-emerald-700">{p.name}</span>
                        <span className="text-slate-500 text-[9px] uppercase block">Matched: {p.specialty}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : loginMode === "user" ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Info className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider">Registered SMME Accounts:</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {applications.slice(0, 4).map((app) => (
                    <button
                      type="button"
                      key={app.id}
                      onClick={() => handleUserQuickLogin(app)}
                      className="bg-white/80 hover:bg-white border border-white/90 rounded-[1.25rem] p-3 text-left font-sans text-[10px] transition-all shadow-2xs hover:shadow-md group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 truncate block group-hover:text-amber-700">{app.companyName}</span>
                        <span className="text-slate-500 text-[9px] block uppercase truncate">Rep: {app.ownerName}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Info className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider">Executive Roles:</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { role: "Service Provider Authentication Executive Manager", label: "Executive Lead" },
                    { role: "Service Provider Authentication Operations Analyst & Auditor", label: "System Auditor" },
                    { role: "National SMME Performance Director", label: "Performance Director" },
                    { role: "Department of Small Business Development Representative", label: "DSBD Oversight" }
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.role}
                      onClick={() => handleInsightsQuickLogin(item.role)}
                      className="bg-white/80 hover:bg-white border border-white/90 rounded-[1.25rem] p-3 text-left font-sans text-[10px] transition-all shadow-2xs hover:shadow-md group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 truncate block group-hover:text-indigo-700">{item.label}</span>
                        <span className="text-slate-500 text-[9px] uppercase block truncate">{item.role}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : loggedInProvider ? (
          /* SERVICE PROVIDER DASHBOARD VIEW */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Logged in Provider Header (Session info moved to Header top-left) */}

            {/* Metrics Counter Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 hidden">
              <div className="bg-white/80 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-5 shadow-lg shadow-slate-900/5 text-left hover:shadow-xl hover:bg-white hover:scale-[1.01] transition-all">
                <span className="text-[10px] text-slate-500 block uppercase font-extrabold tracking-wider">TOTAL MATCHES</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block tracking-tight">
                  {applications.filter(app => app.selectedServices?.includes(loggedInProvider.specialty)).length}
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-5 shadow-lg shadow-slate-900/5 text-left hover:shadow-xl hover:bg-white hover:scale-[1.01] transition-all">
                <span className="text-[10px] text-slate-500 block uppercase font-extrabold tracking-wider">PRE ASSIGNED</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-600 mt-1 block tracking-tight">
                  {applications.filter(app => app.selectedServices?.includes(loggedInProvider.specialty) && app.status === "Pre-Assigned").length}
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-5 shadow-lg shadow-slate-900/5 text-left hover:shadow-xl hover:bg-white hover:scale-[1.01] transition-all">
                <span className="text-[10px] text-amber-700 block uppercase font-extrabold tracking-wider">INTAKE SCHEDULED</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 block tracking-tight">
                  {applications.filter(app => app.selectedServices?.includes(loggedInProvider.specialty) && app.status === "Intake Scheduled").length}
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-5 shadow-lg shadow-slate-900/5 text-left hover:shadow-xl hover:bg-white hover:scale-[1.01] transition-all">
                <span className="text-[10px] text-emerald-700 block uppercase font-extrabold tracking-wider">ACTIVE STAGE</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 block tracking-tight">
                  {applications.filter(app => app.selectedServices?.includes(loggedInProvider.specialty) && app.status === "Active").length}
                </span>
              </div>
              <div className="bg-white/80 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-5 shadow-lg shadow-slate-900/5 text-left hover:shadow-xl hover:bg-white hover:scale-[1.01] transition-all col-span-2 md:col-span-1">
                <span className="text-[10px] text-sky-700 block uppercase font-extrabold tracking-wider">COMPLETED</span>
                <span className="text-2xl sm:text-3xl font-black text-sky-600 mt-1 block tracking-tight">
                  {applications.filter(app => app.selectedServices?.includes(loggedInProvider.specialty) && app.status === "Completed").length}
                </span>
              </div>
            </div>

            {/* Interactive Filters and SMME List layout split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Matched SMMEs Queue (7/12 column width) */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-900/10 pb-3.5">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-700" />
                    <h5 className="font-sans font-extrabold text-xs uppercase tracking-wider text-slate-900">
                      SMME Referral Registry Queue ({matchedApps.length})
                    </h5>
                  </div>
                  
                  {/* Status Filters tabs */}
                  <div className="flex flex-wrap gap-1 bg-white/70 backdrop-blur-md p-1.5 rounded-full border border-white/90 shadow-2xs">
                    {(["All", "Pre-Assigned", "Intake Scheduled", "Active", "Completed"] as const).map((filter) => (
                      <button
                        type="button"
                        key={filter}
                        onClick={() => setStatusFilter(filter)}
                        className={`px-3.5 py-1.5 text-[10px] font-sans font-bold border-0 rounded-full transition-all cursor-pointer uppercase ${
                          statusFilter === filter
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-transparent text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {filter === "All" ? "ALL" : filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search matching SMMEs by name, owner or CIPC reg..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-3 pl-11 pr-5 font-sans text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white focus:outline-none shadow-2xs transition-all placeholder-slate-400"
                  />
                </div>

                {/* Matched SMMEs Grid/List */}
                {matchedApps.length === 0 ? (
                  <div className="bg-white/80 backdrop-blur-2xl border border-dashed border-slate-300 rounded-[2.25rem] p-10 text-center font-sans text-xs text-slate-500 shadow-sm">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    No matched SMME applications found for the criteria.
                    <p className="text-[10px] text-slate-400 mt-1 font-sans">Submit a new Capability Questionnaire or adjust filters to trigger new entries.</p>
                  </div>
                ) : (
                  <div className="space-y-3.5 max-h-[540px] overflow-y-auto pr-1">
                    {matchedApps.map((app) => {
                      const isSelected = selectedApp && selectedApp.id === app.id;
                      return (
                        <div
                          key={app.id}
                          onClick={() => {
                            setSelectedApp(app);
                            setEditingNotes(app.advisoryNotes || "");
                          }}
                          className={`border rounded-[1.75rem] p-5 text-left cursor-pointer transition-all flex flex-col sm:flex-row justify-between gap-4 relative overflow-hidden group shadow-sm ${
                            isSelected
                              ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/15"
                              : "bg-white/85 backdrop-blur-xl border-white/90 hover:border-emerald-300 hover:bg-white text-slate-800 hover:shadow-md hover:scale-[1.005]"
                          }`}
                        >
                          <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-[1.75rem] ${
                            app.status === "Completed" ? "bg-sky-500" :
                            app.status === "Active" ? "bg-emerald-500" :
                            app.status === "Intake Scheduled" ? "bg-amber-400" :
                            "bg-slate-300"
                          }`} />

                          <div className="space-y-1.5 font-sans pl-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold uppercase ${isSelected ? "text-slate-300" : "text-slate-400"}`}>{app.id}</span>
                              <span className="text-[10px] text-slate-400">•</span>
                              <span className={`text-[10px] font-medium ${isSelected ? "text-slate-300" : "text-slate-400"}`}>{new Date(app.dateSubmitted).toLocaleDateString()}</span>
                            </div>
                            <h5 className={`font-extrabold text-base tracking-tight ${isSelected ? "text-white" : "text-slate-900"}`}>
                              {app.companyName}
                            </h5>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 text-xs text-slate-500 font-medium">
                              <span>Rep: <strong className={isSelected ? "text-white" : "text-slate-800"}>{app.ownerName}</strong></span>
                              <span className="hidden sm:inline">•</span>
                              <span>Industry: <strong className={isSelected ? "text-white" : "text-slate-800"}>{app.industry}</strong></span>
                            </div>
                          </div>

                          <div className="flex sm:flex-col justify-between sm:justify-center items-end gap-2.5 shrink-0 border-t sm:border-t-0 border-slate-200/20 pt-2.5 sm:pt-0">
                            <span className={getStatusBadgeClass(app.status)}>
                              {app.status}
                            </span>
                            <span className={`font-sans text-[10px] font-bold flex items-center gap-1 transition-all uppercase ${isSelected ? "text-amber-300" : "text-slate-600 group-hover:text-emerald-700"}`}>
                              <span>VIEW PROFILE</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Profile Inspector Panel (5/12 column width) */}
              <div className="lg:col-span-5 bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2.25rem] p-6 sm:p-7 shadow-xl shadow-slate-900/5 space-y-5 text-left">
                <div className="flex items-center justify-between border-b border-slate-900/10 pb-3.5">
                  <div className="flex items-center gap-2 text-slate-900 font-sans text-xs font-extrabold uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>Diagnostics Inspector</span>
                  </div>
                  <span className="bg-slate-900 text-white font-sans text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                    SEC DOSSIER VIEW
                  </span>
                </div>

                {!selectedApp ? (
                  <div className="text-center py-12 text-slate-500 font-sans text-xs">
                    <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="font-extrabold text-slate-700 uppercase tracking-wide">NO SMME SELECTED</p>
                    <p className="mt-1 text.xs text-slate-500 font-sans leading-relaxed max-w-xs mx-auto">Click any SMME profile card on the left to inspect detailed capability diagnostics, gaps, and update process workflow.</p>
                  </div>
                ) : (
                  <div className="space-y-5 text-left font-sans text-xs text-slate-800">
                    
                    {/* Read Only assessment banner */}
                    <div className="bg-slate-900/95 text-white p-4 space-y-1.5 rounded-[1.5rem] shadow-md border border-slate-800">
                      <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase">
                        <Lock className="w-3.5 h-3.5" />
                        <span>🔒 Read-Only Assessment</span>
                      </div>
                      <p className="text-[10px] text-slate-300 font-sans leading-tight">
                        Pillar gaps and questionnaire responses below are controlled by the user. Providers cannot edit these but may log Advisory Progress Notes below.
                      </p>
                    </div>

                    {/* Basic details */}
                    <div className="space-y-2.5 bg-white/80 border border-slate-200/80 rounded-[1.5rem] p-4.5 shadow-2xs">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-dashed border-slate-200 pb-2 mb-1">
                        <span>Profile Registry Code</span>
                        <span className="font-bold text-slate-900 uppercase">{selectedApp.id}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Company Legal Name</span>
                        <span className="font-bold text-sm text-slate-900 leading-tight block">{selectedApp.companyName}</span>
                        <span className="text-[10px] text-slate-500 block font-medium">CIPC Reg: {selectedApp.regNumber}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] border-t border-slate-200/60">
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Representative</span>
                          <span className="font-semibold text-slate-900 block">{selectedApp.ownerName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Contact Number</span>
                          <span className="font-semibold text-slate-900 block truncate">{selectedApp.phone}</span>
                        </div>
                        <div className="col-span-2 mt-1">
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Secure Email Address</span>
                          <span className="font-semibold text-slate-900 block underline">{selectedApp.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Diagnostic Gaps Breakdown matching this specialty */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Matched Diagnostic Gaps ({loggedInProvider.specialty}):</span>
                      
                      {selectedApp.gaps?.filter((g: any) => g.intervention === loggedInProvider.specialty).length === 0 ? (
                        <div className="bg-amber-50/80 border border-amber-200/80 rounded-[1.25rem] p-3.5 text-[11px] text-amber-900 leading-snug">
                          No specific matching gaps were identified for this pillar. Matched due to broad sector pre-registration.
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                          {selectedApp.gaps?.filter((g: any) => g.intervention === loggedInProvider.specialty).map((g: any, i: number) => (
                            <div key={i} className="bg-slate-900 text-white rounded-[1.25rem] p-3.5 space-y-1.5 shadow-xs border border-slate-800">
                              <span className="text-[9px] font-bold uppercase block text-amber-400 tracking-wider">
                                {g.pillarTitle}
                              </span>
                              <ul className="space-y-1 list-disc pl-3 text-[11px] text-slate-200 font-sans leading-relaxed">
                                {g.gaps.map((item: string, idx: number) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Supporting Motivation */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">SMME Submission Motivation:</span>
                      <p className="bg-white/80 border border-slate-200/80 rounded-[1.25rem] p-3.5 text-[11px] font-sans text-slate-600 leading-relaxed max-h-24 overflow-y-auto">
                        "{selectedApp.motivation || "No custom motivation provided."}"
                      </p>
                    </div>

                    {/* Workflow State Update Controls */}
                    <div className="space-y-2.5 pt-3 border-t border-slate-200/60">
                      <span className="text-[10px] text-slate-900 block uppercase font-bold tracking-wider">Update Allocation Status:</span>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => updateApplication(selectedApp.id, { status: "Intake Scheduled" })}
                          className={`py-2.5 px-2 text-[9px] font-bold rounded-full border text-center uppercase tracking-wider cursor-pointer transition-all ${
                            selectedApp.status === "Intake Scheduled"
                              ? "bg-amber-400 border-amber-500 text-slate-900 font-extrabold shadow-md"
                              : "bg-white border-slate-200 hover:border-slate-400 text-slate-700"
                          }`}
                        >
                          SCHEDULE INTAKE
                        </button>
                        <button
                          type="button"
                          onClick={() => updateApplication(selectedApp.id, { status: "Active" })}
                          className={`py-2.5 px-2 text-[9px] font-bold rounded-full border text-center uppercase tracking-wider cursor-pointer transition-all ${
                            selectedApp.status === "Active"
                              ? "bg-emerald-500 border-emerald-600 text-white font-extrabold shadow-md"
                              : "bg-white border-slate-200 hover:border-slate-400 text-slate-700"
                          }`}
                        >
                          START ACTIVE
                        </button>
                        <button
                          type="button"
                          onClick={() => updateApplication(selectedApp.id, { status: "Completed" })}
                          className={`py-2.5 px-2 text-[9px] font-bold rounded-full border text-center uppercase tracking-wider cursor-pointer transition-all ${
                            selectedApp.status === "Completed"
                              ? "bg-sky-500 border-sky-600 text-white font-extrabold shadow-md"
                              : "bg-white border-slate-200 hover:border-slate-400 text-slate-700"
                          }`}
                        >
                          MARK COMPLETE
                        </button>
                      </div>
                    </div>

                    {/* Advisory and Progress Notes */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Provider Consultation Advisory Notes:</span>
                      <textarea
                        rows={3}
                        placeholder="Type clinical consultation findings, milestone logs, or advisory action items here..."
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        className="w-full bg-white/90 border border-slate-200/90 rounded-[1.25rem] p-4 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none resize-none text-slate-800 transition-all shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={() => updateApplication(selectedApp.id, { advisoryNotes: editingNotes })}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 text-xs font-semibold rounded-full uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.005] active:scale-[0.99] cursor-pointer"
                      >
                        SAVE CONSULTATION NOTES
                      </button>
                    </div>

                    {/* Integrated Success Stamp */}
                    {selectedApp.status === "Completed" && (
                      <div className="bg-emerald-50/90 border border-emerald-200 rounded-[1.25rem] p-3.5 text-[11px] text-emerald-900 flex items-center gap-2.5 font-sans shadow-2xs">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <div>
                          <strong className="block font-bold">PROGRAM COMPLETED SUCCESSFULLY</strong>
                          <p className="font-sans text-[10px] text-emerald-700 mt-0.5">Dossier marked complete. Pre-qualified for Access to Capital and Markets channels.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        ) : loggedInUser ? (
          /* SMME USER DASHBOARD VIEW */
          <motion.div
            key="user-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 text-left"
          >
            {/* User Info Header Block (Moved to Header top-left) */}

            {/* My Needs Assessments Registry Selector Card */}
            {(() => {
              const userAssessmentsList = applications.filter(
                app => app.email?.toLowerCase() === loggedInUser?.email?.toLowerCase() || app.id === loggedInUser?.id
              );
              return (
                <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-6 sm:p-7 shadow-xl shadow-slate-900/5 space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-slate-900/10 pb-3.5">
                    <Database className="w-4 h-4 text-emerald-700" />
                    <h5 className="font-sans font-extrabold text-xs uppercase text-slate-900 tracking-wider">
                      My Needs Assessments Registry
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed font-medium">
                    Select an assessment record below to load its details, view provider allocations, or edit/submit incomplete drafts. Yes/No checkboxes inside the assessment questionnaire are editable for drafts but finalized (read-only) once submitted.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {userAssessmentsList.map((app) => {
                      const isActive = app.id === selectedUserAppId;
                      const isDraft = app.status === "Draft";
                      return (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setSelectedUserAppId(app.id)}
                          className={`p-4 sm:p-5 border rounded-[1.5rem] text-left font-sans text-xs transition-all flex flex-col justify-between gap-3 relative cursor-pointer shadow-sm ${
                            isActive
                              ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-md"
                              : "border-white/90 bg-white/80 hover:bg-white hover:border-slate-300"
                          }`}
                        >
                          {isActive && (
                            <div className="absolute top-3 right-3 bg-slate-900 text-white text-[8px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                              LOADED
                            </div>
                          )}
                          
                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-400 block uppercase font-extrabold tracking-wider">TRACKING ID</span>
                            <span className="font-extrabold text-slate-900 block truncate text-sm">{app.id}</span>
                            <span className="text-[10px] text-slate-500 font-sans block font-medium">
                              Date: {new Date(app.dateSubmitted || app.dateCreated || Date.now()).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2 border-t border-slate-200/60 pt-2.5 mt-1">
                            <span className={getStatusBadgeClass(app.status)}>
                              {app.status}
                            </span>
                            <span className="text-[10px] text-slate-900 font-extrabold hover:underline uppercase tracking-wider">
                              {isDraft ? "EDIT DRAFT" : "VIEW REPORT"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Main User Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Needs Assessment and Profile Editor (7/12 width) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Profile Editor Card */}
                <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-6 sm:p-7 shadow-xl shadow-slate-900/5 space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-slate-900/10 pb-3.5">
                    <Settings className="w-4 h-4 text-emerald-700" />
                    <h5 className="font-sans font-extrabold text-xs uppercase tracking-wider text-slate-900">
                      Edit Business Profile Details
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-extrabold text-slate-700 block uppercase tracking-wider">Company Legal Name</label>
                      <input
                        type="text"
                        value={userCompanyName}
                        onChange={(e) => setUserCompanyName(e.target.value)}
                        disabled={selectedUserApp?.status !== "Draft"}
                        className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-2.5 px-4 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all shadow-2xs disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-extrabold text-slate-700 block uppercase tracking-wider">CIPC Reg Number</label>
                      <input
                        type="text"
                        value={userRegNumber}
                        onChange={(e) => setUserRegNumber(e.target.value)}
                        disabled={selectedUserApp?.status !== "Draft"}
                        className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-2.5 px-4 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all shadow-2xs disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-extrabold text-slate-700 block uppercase tracking-wider">Representative Owner</label>
                      <input
                        type="text"
                        value={userOwnerName}
                        onChange={(e) => setUserOwnerName(e.target.value)}
                        disabled={selectedUserApp?.status !== "Draft"}
                        className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-2.5 px-4 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all shadow-2xs disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-extrabold text-slate-700 block uppercase tracking-wider">Industry Sector</label>
                      <select
                        value={userIndustry}
                        onChange={(e) => setUserIndustry(e.target.value)}
                        disabled={selectedUserApp?.status !== "Draft"}
                        className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-2.5 px-4 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all shadow-2xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <option value="Retail / E-commerce">Retail / E-commerce</option>
                        <option value="Manufacturing & Craft">Manufacturing & Craft</option>
                        <option value="Agriculture & Agro-processing">Agriculture & Agro-processing</option>
                        <option value="Food & Beverages">Food & Beverages</option>
                        <option value="Engineering & Services">Engineering & Services</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-extrabold text-slate-700 block uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        disabled={selectedUserApp?.status !== "Draft"}
                        className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-2.5 px-4 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all shadow-2xs disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-extrabold text-slate-700 block uppercase tracking-wider">Contact Phone</label>
                      <input
                        type="text"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        disabled={selectedUserApp?.status !== "Draft"}
                        className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-full py-2.5 px-4 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all shadow-2xs disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-sans font-extrabold text-slate-700 block uppercase tracking-wider">Business Motivation Statement</label>
                    <textarea
                      rows={2}
                      value={userMotivation}
                      onChange={(e) => setUserMotivation(e.target.value)}
                      disabled={selectedUserApp?.status !== "Draft"}
                      className="w-full bg-white/90 hover:bg-white border border-slate-200/90 rounded-2xl p-3.5 font-sans text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all resize-none shadow-2xs disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* 7-Pillar Questionnaire Editor Card */}
                <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-6 sm:p-7 shadow-xl shadow-slate-900/5 space-y-4 text-left">
                  <div className="flex items-center justify-between border-b border-slate-900/10 pb-3.5 font-sans">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      <h5 className="font-extrabold text-xs uppercase text-slate-900 tracking-wider">
                        7-Pillar Needs & Gaps Diagnostic Questionnaire
                      </h5>
                    </div>
                    <span className={`text-[9px] font-extrabold px-3 py-1 uppercase rounded-full tracking-wider shadow-2xs ${
                      selectedUserApp?.status === "Draft" 
                        ? "bg-amber-400 text-slate-950 font-black" 
                        : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {selectedUserApp?.status === "Draft" ? "EDITABLE DRAFT" : "SUBMITTED FINAL"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-sans leading-relaxed font-medium">
                    Review and complete the comprehensive 7-Pillar developmental questionnaire below. Answering <strong className="text-rose-600">NO</strong> or <strong className="text-amber-600">NOT SURE</strong> reveals specific operational gaps and triggers automated allocation to national development partners.
                  </p>

                  {/* Read Only/Finalized Assessment Banner */}
                  {selectedUserApp?.status !== "Draft" && (
                    <div className="bg-slate-900 text-white p-4 space-y-1.5 rounded-2xl shadow-md font-sans">
                      <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase">
                        <Lock className="w-3.5 h-3.5" />
                        <span>🔒 Read-Only Assessment</span>
                      </div>
                      <p className="text-[10px] text-slate-300 font-sans leading-tight">
                        This needs assessment has been submitted. Checkboxes and responses are now secured and read-only.
                      </p>
                    </div>
                  )}

                  <div className="space-y-5">
                    {PILLAR_QUESTIONS.map((pillar) => {
                      const isSelected = userSelectedServices.includes(pillar.recommendation);
                      const isInteractive = selectedUserApp?.status === "Draft";
                      return (
                        <div key={pillar.id} className={`border rounded-[1.5rem] p-4.5 sm:p-5 transition-all shadow-sm ${isSelected ? 'border-emerald-300/80 bg-emerald-50/30' : 'border-white/90 bg-white/80'}`}>
                          
                          {/* Header of the Pillar */}
                          <div className="flex items-center justify-between gap-3 border-b border-slate-200/60 pb-3 mb-4">
                            <div className="flex items-center gap-2">
                              {getSpecialtyIcon(pillar.recommendation)}
                              <span className="font-sans font-extrabold text-xs text-slate-900 uppercase tracking-wide">
                                {pillar.title}
                              </span>
                            </div>
                            <span className="bg-slate-900 text-white font-sans text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                              {pillar.recommendation.replace(" & ", "_").replace(" ", "_").toUpperCase()}
                            </span>
                          </div>

                          {/* Interactive/Read-only questions inside the pillar */}
                          <div className="space-y-4 pl-1">
                            {pillar.questions.map((q) => {
                              const value = userResponses[q.id] || (q.recommendOn === "no" ? "yes" : "no");
                              return (
                                <div key={q.id} className="space-y-2">
                                  <p className="text-xs font-sans text-slate-700 leading-relaxed font-medium">{q.text}</p>
                                  <div className="flex items-center gap-2 font-sans text-[10px]">
                                    <button
                                      type="button"
                                      disabled={!isInteractive}
                                      onClick={() => {
                                        setUserResponses(prev => ({ ...prev, [q.id]: "yes" }));
                                      }}
                                      className={`px-4 py-1.5 border-0 rounded-full font-sans text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                                        value === "yes"
                                          ? "bg-slate-900 text-white shadow-xs"
                                          : isInteractive
                                            ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                            : "bg-slate-100/60 text-slate-400"
                                      }`}
                                    >
                                      YES
                                    </button>
                                    <button
                                      type="button"
                                      disabled={!isInteractive}
                                      onClick={() => {
                                        setUserResponses(prev => ({ ...prev, [q.id]: "no" }));
                                      }}
                                      className={`px-4 py-1.5 border-0 rounded-full font-sans text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                                        value === "no"
                                          ? "bg-rose-500 text-white shadow-xs"
                                          : isInteractive
                                            ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                            : "bg-slate-100/60 text-slate-400"
                                      }`}
                                    >
                                      NO
                                    </button>
                                    <button
                                      type="button"
                                      disabled={!isInteractive}
                                      onClick={() => {
                                        setUserResponses(prev => ({ ...prev, [q.id]: "not_sure" }));
                                      }}
                                      className={`px-4 py-1.5 border-0 rounded-full font-sans text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                                        value === "not_sure"
                                          ? "bg-amber-400 text-slate-950 shadow-xs"
                                          : isInteractive
                                            ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                            : "bg-slate-100/60 text-slate-400"
                                      }`}
                                    >
                                      NOT SURE
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      );
                    })}
                  </div>

                  {/* Save and submit buttons with dynamic success toast inside */}
                  <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center gap-4 justify-between">
                    <div className="w-full sm:flex-1 text-left">
                      {saveSuccessMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-emerald-50/90 border border-emerald-200 text-emerald-800 text-xs font-sans rounded-2xl p-3.5 flex items-center gap-2 shadow-2xs"
                        >
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{saveSuccessMessage}</span>
                        </motion.div>
                      )}
                    </div>
                    
                    {selectedUserApp?.status === "Draft" ? (
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto font-sans">
                        <button
                          type="button"
                          onClick={() => handleSaveUserAssessment(false)}
                          className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 text-xs font-bold tracking-wider px-6 py-3.5 rounded-full cursor-pointer transition-all uppercase shadow-xs"
                        >
                          SAVE DRAFT
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveUserAssessment(true)}
                          className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-amber-400/20 cursor-pointer transition-all uppercase"
                        >
                          SUBMIT ASSESSMENT
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] font-sans font-extrabold text-slate-400 uppercase tracking-wider">
                        SUBMISSION FINALIZED AND SECURED
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Allocation and Consultation Registry (5/12 width) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Allocations Card */}
                <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-6 sm:p-7 shadow-xl shadow-slate-900/5 space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-slate-900/10 pb-3.5 text-slate-900">
                    <Building className="w-4 h-4 text-emerald-700" />
                    <h5 className="font-sans font-extrabold text-xs uppercase tracking-wider">
                      My Allocated Service Providers
                    </h5>
                  </div>

                  <p className="text-xs text-slate-500 font-sans leading-relaxed font-medium">
                    Based on your selected assessment needs, the National Registry has allocated the following developmental agencies to support your SMME:
                  </p>

                  <div className="space-y-3">
                    {userSelectedServices.length === 0 ? (
                      <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 text-xs font-sans text-amber-900 shadow-2xs">
                        <AlertCircle className="w-5 h-5 text-amber-600 mb-1.5 block" />
                        No providers allocated. Please check/enable at least one of the support specialties in your Needs Assessment checklist to trigger automated allocation routing.
                      </div>
                    ) : (
                      userSelectedServices.map((specialty) => {
                        const assignedId = loggedInUser?.assignedProviders?.[specialty];
                        const matchedProvider = providers.find(p => p.id === assignedId) || providers.find(p => p.specialty === specialty);
                        if (!matchedProvider) return null;
                        return (
                          <div key={specialty} className="bg-white/80 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
                            <div className="flex items-center gap-3 text-left">
                              <div className="w-11 h-11 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xs shadow-xs">
                                {matchedProvider.logo}
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[9px] font-sans text-emerald-700 block uppercase font-extrabold tracking-wider">{specialty}</span>
                                <h6 className="font-sans font-extrabold text-xs text-slate-900 leading-none">{matchedProvider.name}</h6>
                                <span className="text-[10px] text-slate-500 block font-sans font-medium">{matchedProvider.email}</span>
                              </div>
                            </div>
                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 text-[9px] font-bold uppercase rounded-full whitespace-nowrap shadow-2xs">
                              ALLOCATED OK
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Consultation Progress Logs */}
                <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-6 sm:p-7 shadow-xl shadow-slate-900/5 space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-slate-900/10 pb-3.5 text-slate-900">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <h5 className="font-sans font-extrabold text-xs uppercase tracking-wider">
                      Official Advisory Progress Notes
                    </h5>
                  </div>

                  <p className="text-xs text-slate-500 font-sans leading-relaxed font-medium">
                    Below are the consultation findings, milestones, and development log entries added by your allocated advisors:
                  </p>

                  <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-4.5 space-y-3 relative overflow-hidden shadow-2xs">
                    <span className="absolute top-3 right-3 bg-slate-900 text-white text-[8px] font-sans font-bold py-0.5 px-3 uppercase rounded-full tracking-wider shadow-2xs">
                      CONSULTATION LOG
                    </span>

                    {loggedInUser.advisoryNotes ? (
                      <p className="font-sans text-xs text-slate-700 whitespace-pre-wrap leading-relaxed pt-1 font-medium">
                        "{loggedInUser.advisoryNotes}"
                      </p>
                    ) : (
                      <div className="text-center py-6 text-slate-400 font-sans text-xs">
                        <BookOpen className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                        No advisory notes recorded yet.
                        <p className="font-sans text-[10px] text-slate-400 mt-0.5">Allocated agency notes will appear here once intake procedures commence.</p>
                      </div>
                    )}

                    <div className="pt-2.5 border-t border-slate-200/60 flex items-center gap-1.5 text-slate-400 text-[9px] font-sans font-bold uppercase">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>🔒 Read-Only progress log context</span>
                    </div>
                  </div>
                </div>

                {/* Submitted Files List */}
                <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2rem] p-6 sm:p-7 shadow-xl shadow-slate-900/5 space-y-4 text-left">
                  <div className="flex items-center gap-2 border-b border-slate-900/10 pb-3.5 text-slate-900">
                    <Award className="w-4 h-4 text-emerald-700" />
                    <h5 className="font-sans font-extrabold text-xs uppercase tracking-wider">
                      Submitted Verification Folders
                    </h5>
                  </div>

                  <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-4.5 space-y-2.5 shadow-2xs">
                    <div className="flex items-center gap-2.5 text-xs text-slate-700 font-sans font-medium">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Standard compliance dossier attached</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-700 font-sans font-medium">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>SARS tax compliance verified via live API</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-700 font-sans font-medium">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>CIPC statutory legal registry active</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        ) : loggedInInsights ? (
          /* CONSOLIDATED OPERATIONAL INSIGHTS & PERFORMANCE DASHBOARD VIEW - HIDDEN & ROUTED TO MAIN ADMIN TAB */
          <motion.div
            key="insights-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 text-left hidden"
          >
            {/* Single Comprehensive Operational Insights Dashboard */}
            <AdminDashboard onViewChange={onViewChange} showAnnotations={showAnnotations} onLogout={handleLogout} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  IconTrendingUp as TrendingUp, 
  IconUsers as Users, 
  IconCheckCircle as CheckCircle2, 
  IconClock as Clock, 
  IconFileText as FileText, 
  IconStar as Star, 
  IconAward as Award, 
  IconShieldAlert as ShieldAlert, 
  IconFilter as Filter, 
  IconSearch as Search, 
  IconDatabase as Database, 
  IconPlus as Plus, 
  IconMessageSquare as MessageSquare, 
  IconSettings as Settings, 
  IconBuilding2 as Building, 
  IconShieldAlert as AlertCircle, 
  IconX as Trash2, 
  IconRotateCcw as RefreshCw,
  IconGraduationCap as GraduationCap,
  IconMonitor as Monitor,
  IconBriefcase as Briefcase,
  IconChevronDown as ChevronDown,
  IconSparkles as Sparkles,
  IconBarChart as BarChart2,
  IconShieldAlert as Lock,
  IconMail as Mail,
  IconPhone as Phone,
  IconArrowUpRight as ArrowUpRight,
  IconLogOut as LogOut,
  IconInsightsAnalytics,
  IconVerificationDossier,
  IconQualityShield,
  IconAllocationMatrix,
  IconDiagnosticRadar,
  IconRefreshSync,
  IconPipelineFunnel,
  IconDeveloperMatch,
  IconAuditTrail,
  IconGapAnalysis,
  IconDemographicDistribution,
  IconRealtimePulse,
  IconFilterSliders,
  IconExportData,
  IconCheckDouble,
  IconLightbulbIdea,
  IconCompassRadar
} from "./icons/CustomIcons";
import { motion, AnimatePresence } from "motion/react";
import { INITIAL_APPLICATIONS } from "./ProviderPortal";
import { fmtText } from "../utils/format";

// Standard Approved Providers (from ProviderPortal.tsx)
const BASE_PROVIDERS = [
  {
    id: "p1",
    name: "Apex Advisory Group",
    specialty: "Business Advisory",
    email: "info@apexadvisory.co.za",
    pin: "2026",
    logo: "AA",
    color: "emerald",
    rating: 4.8,
    reviewsCount: 12,
    status: "Active"
  },
  {
    id: "p2",
    name: "Vanguard Financial Modeling",
    specialty: "Business Planning",
    email: "partner@vanguardplan.com",
    pin: "2026",
    logo: "VF",
    color: "blue",
    rating: 4.6,
    reviewsCount: 9,
    status: "Active"
  },
  {
    id: "p3",
    name: "Product Lab Africa & QA Experts",
    specialty: "Technical Assistance",
    email: "compliance@productlab.co.za",
    pin: "2026",
    logo: "PL",
    color: "amber",
    rating: 4.9,
    reviewsCount: 15,
    status: "Active"
  },
  {
    id: "p4",
    name: "SME Academy South Africa",
    specialty: "Skills Development",
    email: "learn@smeacademy.org",
    pin: "2026",
    logo: "SA",
    color: "purple",
    rating: 4.4,
    reviewsCount: 8,
    status: "Active"
  },
  {
    id: "p5",
    name: "The Jozi Innovation Hub",
    specialty: "Mentorship & Incubation",
    email: "incubator@jozihub.org",
    pin: "2026",
    logo: "JH",
    color: "indigo",
    rating: 4.7,
    reviewsCount: 11,
    status: "Active"
  },
  {
    id: "p6",
    name: "WebCraft Digital Solutions",
    specialty: "Digital Enablement",
    email: "build@webcraft.co.za",
    pin: "2026",
    logo: "WC",
    color: "rose",
    rating: 4.8,
    reviewsCount: 14,
    status: "Active"
  }
];

// Initial preloaded reviews database
const INITIAL_REVIEWS = [
  {
    id: "r1",
    providerId: "p6",
    providerName: "WebCraft Digital Solutions",
    authorName: "Lerato Khumalo",
    companyName: "Lekker Bakes Bakery",
    rating: 5,
    comment: "The team helped us deploy our Point of Sale and digital accounting systems perfectly. Our daily sales tracking has improved tenfold and staff training was incredibly thorough.",
    date: "2026-07-02T10:14:00.000Z"
  },
  {
    id: "r2",
    providerId: "p4",
    providerName: "SME Academy South Africa",
    authorName: "Thabo Mokoena",
    companyName: "Amandla Arts & Crafts Ltd",
    rating: 4,
    comment: "Very high-quality workshops on financial literacy and international exports. The practical checklists we received have been helpful in training our secondary craft team.",
    date: "2026-07-16T15:20:00.000Z"
  },
  {
    id: "r3",
    providerId: "p1",
    providerName: "Apex Advisory Group",
    authorName: "Naledi Ndlovu",
    companyName: "Limpopo Organic Oils Co",
    rating: 5,
    comment: "Outstanding strategic diagnostic. They identified major compliance gaps in our tax structures and immediately linked us with corporate procurement advisory resources.",
    date: "2026-07-12T09:30:00.000Z"
  }
];

// 7-Pillar Questionnaire Structure for Gap Analysis mapping
const ALL_PILLARS = [
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
      "Are you looking to expand internationally but lack \"Export Readiness\" training?",
      "Does your team lack modern digital skills or AI training?",
      "Do you need formal training in marketing, procurement, manufacturing, or project management?"
    ]
  },
  {
    specialty: "Mentorship & Incubation",
    title: "5. Ecosystem & Workspace Needs",
    gaps: [
      "Would your business benefit from joining an accelerator programme or innovation hub?",
      "Do you require access to physical incubation spaces (e.g., office space, shared manufacturing facilities)?",
      "Would your startup benefit from virtual incubation and specialized technology support?"
    ]
  },
  {
    specialty: "Mentorship & Incubation",
    title: "6. Leadership & Guidance",
    gaps: [
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

const MOCK_COMPANY_NAMES = [
  "Soweto Logistics Hub", "Ubuntu Eco-Farms", "Khayelitsha Solar Tech", "Durban Spice Emporium",
  "Egoli Creative Labs", "Karoo Pure Spring Water", "Tshwane Metal Works", "Gqeberha Textiles",
  "Maputo Sea Harvest", "Zululand Honey Bee Co", "Phalaborwa Copper Crafts", "Stellenbosch Botanicals"
];

const MOCK_OWNERS = [
  "Sipho Cele", "Nomsa Dube", "Bongani Ntuli", "Zanele Khumalo", "Andile Nkosi",
  "Tshepo Masondo", "Ayanda Naidoo", "David Botha", "Grace Padayachee", "Jacobus van der Merwe"
];

const MOCK_INDUSTRIES = [
  "Retail / E-commerce", "Manufacturing & Craft", "Agriculture & Agro-processing",
  "Food & Beverages", "Green Economy & Waste", "Technology / Software", "Tourism & Hospitality"
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Draft":
      return "bg-amber-100 border-amber-300 text-amber-800";
    case "Pre-Assigned":
      return "bg-slate-100 border-slate-300 text-slate-800";
    case "Intake Scheduled":
      return "bg-blue-100 border-blue-300 text-blue-800";
    case "Active":
      return "bg-emerald-100 border-emerald-300 text-emerald-800";
    case "Completed":
      return "bg-indigo-100 border-indigo-300 text-indigo-800";
    default:
      return "bg-slate-100 border-slate-200 text-slate-600";
  }
};

const getProviderColor = (specialty: string) => {
  switch (specialty) {
    case "Business Advisory": return "emerald";
    case "Business Planning": return "blue";
    case "Technical Assistance": return "amber";
    case "Skills Development": return "purple";
    case "Mentorship & Incubation": return "indigo";
    case "Digital Enablement": return "rose";
    default: return "slate";
  }
};

interface AdminDashboardProps {
  onViewChange?: (view: "capability" | "markets" | "provider" | "admin" | "flow" | "apply") => void;
  showAnnotations?: boolean;
  onLogout?: () => void;
}

export default function AdminDashboard({ onViewChange, showAnnotations = true, onLogout }: AdminDashboardProps) {
  const [applications, setApplications] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [industryFilter, setIndustryFilter] = useState<string>("All");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("All");
  const [gapFilter, setGapFilter] = useState<string>("All");
  const [dashboardTab, setDashboardTab] = useState<"overview" | "users" | "providers" | "intelligence" | "allocation" | "flow">("overview");
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  const [treeSearch, setTreeSearch] = useState("");

  const toggleNode = (nodeId: string) => {
    setCollapsedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  // CRUD/Form States for Needs Assessments
  const [isCreatingApp, setIsCreatingApp] = useState(false);
  const [isEditingApp, setIsEditingApp] = useState(false);
  const [formCompany, setFormCompany] = useState("");
  const [formRegNumber, setFormRegNumber] = useState("");
  const [formIndustry, setFormIndustry] = useState("Retail / E-commerce");
  const [formOwner, setFormOwner] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMotivation, setFormMotivation] = useState("");
  const [formStatus, setFormStatus] = useState("Pre-Assigned");
  const [formNotes, setFormNotes] = useState("");
  const [formSelectedServices, setFormSelectedServices] = useState<string[]>([]);
  const [formGapsMap, setFormGapsMap] = useState<Record<string, string[]>>({});

  const startEditingApp = (app: any) => {
    setIsEditingApp(true);
    setIsCreatingApp(false);
    setFormCompany(app.companyName || "");
    setFormRegNumber(app.regNumber || "");
    setFormIndustry(app.industry || "Retail / E-commerce");
    setFormOwner(app.ownerName || "");
    setFormEmail(app.email || "");
    setFormPhone(app.phone || "");
    setFormMotivation(app.motivation || "");
    setFormStatus(app.status || "Pre-Assigned");
    setFormNotes(app.advisoryNotes || "");
    setFormSelectedServices(app.selectedServices || []);
    
    const gapsMap: Record<string, string[]> = {};
    if (Array.isArray(app.gaps)) {
      app.gaps.forEach((g: any) => {
        gapsMap[g.intervention] = g.gaps || [];
      });
    }
    setFormGapsMap(gapsMap);
  };

  const startCreatingApp = () => {
    setIsCreatingApp(true);
    setIsEditingApp(false);
    setSelectedApp(null);
    setFormCompany("");
    setFormRegNumber(`2026/${Math.floor(100000 + Math.random() * 899999)}/07`);
    setFormIndustry("Retail / E-commerce");
    setFormOwner("");
    setFormEmail("");
    setFormPhone("");
    setFormMotivation("");
    setFormStatus("Pre-Assigned");
    setFormNotes("");
    setFormSelectedServices([]);
    setFormGapsMap({});
  };

  const toggleFormService = (service: string) => {
    setFormSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  const toggleFormGap = (service: string, gapText: string) => {
    setFormGapsMap(prev => {
      const currentGaps = prev[service] || [];
      const nextGaps = currentGaps.includes(gapText)
        ? currentGaps.filter(g => g !== gapText)
        : [...currentGaps, gapText];
      return {
        ...prev,
        [service]: nextGaps
      };
    });
  };

  const handleSaveNewAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCompany || !formOwner || !formEmail) {
      alert("⚠️ Please complete the Company Name, Owner Name, and Contact Email.");
      return;
    }

    const newId = "SPA-" + Math.floor(100000 + Math.random() * 900000);
    const gapsArray = formSelectedServices.map(service => {
      const pillar = ALL_PILLARS.find(p => p.specialty === service);
      return {
        pillarTitle: pillar?.title || "Operational Gap Area",
        intervention: service,
        gaps: formGapsMap[service] || []
      };
    });

    const newAssessment = {
      id: newId,
      companyName: formCompany,
      regNumber: formRegNumber,
      industry: formIndustry,
      ownerName: formOwner,
      email: formEmail,
      phone: formPhone,
      selectedServices: formSelectedServices,
      motivation: formMotivation || "Created manually by administration desk.",
      status: formStatus,
      dateSubmitted: new Date().toISOString(),
      advisoryNotes: formNotes,
      gaps: gapsArray
    };

    const updatedApps = [newAssessment, ...applications];
    updateApplicationsStorage(updatedApps);

    setIsCreatingApp(false);
    setSelectedApp(newAssessment);
    alert(`🎉 Needs Assessment ${newId} created successfully!`);
  };

  const handleUpdateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    if (!formCompany || !formOwner || !formEmail) {
      alert("⚠️ Please complete the Company Name, Owner Name, and Contact Email.");
      return;
    }

    const gapsArray = formSelectedServices.map(service => {
      const pillar = ALL_PILLARS.find(p => p.specialty === service);
      return {
        pillarTitle: pillar?.title || "Operational Gap Area",
        intervention: service,
        gaps: formGapsMap[service] || []
      };
    });

    const updatedApps = applications.map(app => {
      if (app.id === selectedApp.id) {
        return {
          ...app,
          companyName: formCompany,
          regNumber: formRegNumber,
          industry: formIndustry,
          ownerName: formOwner,
          email: formEmail,
          phone: formPhone,
          selectedServices: formSelectedServices,
          motivation: formMotivation,
          status: formStatus,
          advisoryNotes: formNotes,
          gaps: gapsArray
        };
      }
      return app;
    });

    updateApplicationsStorage(updatedApps);

    const found = updatedApps.find(app => app.id === selectedApp.id);
    if (found) {
      setSelectedApp(found);
    }

    setIsEditingApp(false);
    alert(`📝 Needs Assessment ${selectedApp.id} updated successfully!`);
  };

  // State for adding a new provider review
  const [reviewForm, setReviewForm] = useState({
    providerId: "p1",
    authorName: "",
    companyName: "",
    rating: 5,
    comment: ""
  });
  const [reviewSuccess, setReviewSuccess] = useState("");

  // State for adding a new provider
  const [newProviderForm, setNewProviderForm] = useState({
    name: "",
    specialty: "Business Advisory",
    email: "",
    logo: "",
  });
  const [providerSuccess, setProviderSuccess] = useState("");

  // Sync data
  const syncAllData = () => {
    // 1. Load Applications
    const storedApps = localStorage.getItem("satf_applications");
    let loadedApps: any[] = [];
    if (storedApps) {
      try {
        const parsed = JSON.parse(storedApps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge initial applications by ID to keep user inputs while acquiring new test cases
          const merged = [...parsed];
          INITIAL_APPLICATIONS.forEach(initial => {
            if (!merged.some(m => m.id === initial.id)) {
              merged.push(initial);
            }
          });
          loadedApps = merged;
          localStorage.setItem("satf_applications", JSON.stringify(merged));
        } else {
          loadedApps = INITIAL_APPLICATIONS;
          localStorage.setItem("satf_applications", JSON.stringify(INITIAL_APPLICATIONS));
        }
      } catch (e) {
        console.error("Error reading apps in admin", e);
        loadedApps = INITIAL_APPLICATIONS;
      }
    } else {
      loadedApps = INITIAL_APPLICATIONS;
      localStorage.setItem("satf_applications", JSON.stringify(INITIAL_APPLICATIONS));
    }
    setApplications(loadedApps);

    // 2. Load Providers
    const storedProviders = localStorage.getItem("satf_providers_admin");
    if (storedProviders) {
      try {
        setProviders(JSON.parse(storedProviders));
      } catch (e) {
        console.error("Error parsing providers", e);
      }
    } else {
      localStorage.setItem("satf_providers_admin", JSON.stringify(BASE_PROVIDERS));
      setProviders(BASE_PROVIDERS);
    }

    // 3. Load Reviews
    const storedReviews = localStorage.getItem("satf_provider_reviews");
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      } catch (e) {
        console.error("Error parsing reviews", e);
      }
    } else {
      localStorage.setItem("satf_provider_reviews", JSON.stringify(INITIAL_REVIEWS));
      setReviews(INITIAL_REVIEWS);
    }
  };

  useEffect(() => {
    syncAllData();
    // Listen for storage events or custom app submissions
    const handleSync = () => syncAllData();
    window.addEventListener("blueprint-submit-success", handleSync);

    const handleSetTab = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && ["overview", "users", "providers", "intelligence", "allocation", "flow"].includes(customEvent.detail)) {
        setDashboardTab(customEvent.detail as any);
      }
    };
    window.addEventListener("set-admin-tab", handleSetTab);
    
    // Also check on mount if there's a stored tab preference
    const pendingTab = localStorage.getItem("satf_pending_admin_tab");
    if (pendingTab) {
      if (["overview", "users", "providers", "intelligence", "allocation", "flow"].includes(pendingTab)) {
        setDashboardTab(pendingTab as any);
      }
      localStorage.removeItem("satf_pending_admin_tab");
    }

    return () => {
      window.removeEventListener("blueprint-submit-success", handleSync);
      window.removeEventListener("set-admin-tab", handleSetTab);
    };
  }, []);

  // Write changes to localStorage & trigger live refresh across other components
  const updateApplicationsStorage = (updatedApps: any[]) => {
    setApplications(updatedApps);
    localStorage.setItem("satf_applications", JSON.stringify(updatedApps));
    // Dispatch custom event to notify other modules
    window.dispatchEvent(new CustomEvent("blueprint-submit-success"));
  };

  const updateProvidersStorage = (updatedProviders: any[]) => {
    setProviders(updatedProviders);
    localStorage.setItem("satf_providers_admin", JSON.stringify(updatedProviders));
  };

  const updateReviewsStorage = (updatedReviews: any[]) => {
    setReviews(updatedReviews);
    localStorage.setItem("satf_provider_reviews", JSON.stringify(updatedReviews));
  };

  // Status transitions
  const changeAppStatus = (appId: string, nextStatus: string) => {
    const nextApps = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: nextStatus,
          dateUpdated: new Date().toISOString()
        };
      }
      return app;
    });
    updateApplicationsStorage(nextApps);
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: nextStatus });
    }
  };

  // Toggle selected service for manual provider intervention allocation
  const toggleAppServiceAllocation = (appId: string, service: string) => {
    const nextApps = applications.map(app => {
      if (app.id === appId) {
        const currentServices = app.selectedServices || [];
        const nextServices = currentServices.includes(service)
          ? currentServices.filter((s: string) => s !== service)
          : [...currentServices, service];
        return {
          ...app,
          selectedServices: nextServices
        };
      }
      return app;
    });
    updateApplicationsStorage(nextApps);
    if (selectedApp && selectedApp.id === appId) {
      const currentServices = selectedApp.selectedServices || [];
      const nextServices = currentServices.includes(service)
        ? currentServices.filter((s: string) => s !== service)
        : [...currentServices, service];
      setSelectedApp({ ...selectedApp, selectedServices: nextServices });
    }
  };

  // Reassign specific service provider for an assessment specialty
  const assignProviderForSpecialty = (appId: string, specialty: string, providerId: string) => {
    const nextApps = applications.map(app => {
      if (app.id === appId) {
        const currentAssignments = app.assignedProviders || {};
        return {
          ...app,
          assignedProviders: {
            ...currentAssignments,
            [specialty]: providerId
          }
        };
      }
      return app;
    });
    updateApplicationsStorage(nextApps);
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({
        ...selectedApp,
        assignedProviders: {
          ...(selectedApp.assignedProviders || {}),
          [specialty]: providerId
        }
      });
    }
    alert(`⚡ Assigned service provider updated successfully!`);
  };

  // Interactive Infographic Click Handlers (Auto-routing to row level dossiers)
  const handlePipelineClick = (stageLabel: string) => {
    let targetStatus = "All";
    if (stageLabel.includes("Draft")) targetStatus = "Draft";
    else if (stageLabel.includes("Pre-Assigned") || stageLabel.includes("Referrals")) targetStatus = "Pre-Assigned";
    else if (stageLabel.includes("Intake")) targetStatus = "Intake Scheduled";
    else if (stageLabel.includes("Active")) targetStatus = "Active";
    else if (stageLabel.includes("Completed")) targetStatus = "Completed";

    setStatusFilter(targetStatus);
    setSpecialtyFilter("All");
    setGapFilter("All");
    setIndustryFilter("All");
    setDashboardTab("users");
    setSearchTerm("");
  };

  const handleGapClick = (gapText: string) => {
    setGapFilter(gapText);
    setStatusFilter("All");
    setSpecialtyFilter("All");
    setIndustryFilter("All");
    setDashboardTab("users");
    setSearchTerm("");
  };

  const handleSpecialtyClick = (specialty: string) => {
    setSpecialtyFilter(specialty);
    setGapFilter("All");
    setStatusFilter("All");
    setIndustryFilter("All");
    setDashboardTab("users");
    setSearchTerm("");
  };

  const handleIndustryClick = (industry: string) => {
    setIndustryFilter(industry);
    setSpecialtyFilter("All");
    setGapFilter("All");
    setStatusFilter("All");
    setDashboardTab("users");
    setSearchTerm("");
  };

  // Save specific application notes from admin desk
  const saveAppNotes = (appId: string, notes: string) => {
    const nextApps = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          advisoryNotes: notes
        };
      }
      return app;
    });
    updateApplicationsStorage(nextApps);
    alert("📝 Administrative notes saved successfully!");
  };

  // Simulate incoming live user application
  const handleSimulateApplication = () => {
    const trackingId = "SPA-" + Math.floor(100000 + Math.random() * 900000);
    const company = MOCK_COMPANY_NAMES[Math.floor(Math.random() * MOCK_COMPANY_NAMES.length)];
    const owner = MOCK_OWNERS[Math.floor(Math.random() * MOCK_OWNERS.length)];
    const industry = MOCK_INDUSTRIES[Math.floor(Math.random() * MOCK_INDUSTRIES.length)];
    
    // Pick 2-4 services requested
    const shuffledServices = [...new Set(ALL_PILLARS.map(p => p.specialty))].sort(() => 0.5 - Math.random());
    const selectedServices = shuffledServices.slice(0, Math.floor(Math.random() * 3) + 2);

    // Build matching gaps check
    const gaps = selectedServices.map(service => {
      const pillar = ALL_PILLARS.find(p => p.specialty === service);
      const shuffledGaps = [...(pillar?.gaps || [])].sort(() => 0.5 - Math.random());
      return {
        pillarTitle: pillar?.title || "Operational Gap Area",
        intervention: service,
        gaps: shuffledGaps.slice(0, Math.floor(Math.random() * shuffledGaps.length) + 1)
      };
    });

    const newApp = {
      id: trackingId,
      companyName: company,
      regNumber: `202${Math.floor(Math.random() * 4) + 1}/${Math.floor(100000 + Math.random() * 899999)}/07`,
      industry: industry,
      ownerName: owner,
      email: `${owner.toLowerCase().replace(" ", ".")}@${company.toLowerCase().replace(/[^a-z0-9]/g, "")}.co.za`,
      phone: `+27 ${Math.floor(60 + Math.random() * 25)} ${Math.floor(100 + Math.random() * 899)} ${Math.floor(1000 + Math.random() * 8999)}`,
      selectedServices,
      motivation: "This simulated SMME requires technical training, regulatory registration support, and digital infrastructure tools to compete effectively and scale their job-creation footprint in South Africa.",
      status: "Pre-Assigned",
      dateSubmitted: new Date().toISOString(),
      advisoryNotes: "Simulated application for real-time stress testing.",
      gaps
    };

    const nextApps = [newApp, ...applications];
    updateApplicationsStorage(nextApps);

    // Trigger visual notification log
    window.dispatchEvent(new CustomEvent("blueprint-submit-started", {
      detail: { formData: { companyName: `SIMULATOR: Received application from ${company}` } }
    }));
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("blueprint-submit-success", {
        detail: { formData: { companyName: company, selectedServices }, trackingCode: trackingId }
      }));
    }, 400);
  };

  // Delete simulated application
  const deleteApplication = (id: string) => {
    if (confirm("Are you sure you want to delete this application record?")) {
      const next = applications.filter(a => a.id !== id);
      updateApplicationsStorage(next);
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(null);
      }
    }
  };

  // Submit dynamic review for service provider
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.authorName || !reviewForm.comment) {
      alert("Please complete all required fields for review submission.");
      return;
    }

    const providerObj = providers.find(p => p.id === reviewForm.providerId);
    if (!providerObj) return;

    const newReview = {
      id: "r-" + Date.now(),
      providerId: reviewForm.providerId,
      providerName: providerObj.name,
      authorName: reviewForm.authorName,
      companyName: reviewForm.companyName || "Anonymous SMME",
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment,
      date: new Date().toISOString()
    };

    const nextReviews = [newReview, ...reviews];
    updateReviewsStorage(nextReviews);

    // Recalculate provider average rating
    const providerReviews = nextReviews.filter(r => r.providerId === reviewForm.providerId);
    const avgRating = Number((providerReviews.reduce((sum, r) => sum + r.rating, 0) / providerReviews.length).toFixed(1));

    const nextProviders = providers.map(p => {
      if (p.id === reviewForm.providerId) {
        return {
          ...p,
          rating: avgRating,
          reviewsCount: providerReviews.length
        };
      }
      return p;
    });
    updateProvidersStorage(nextProviders);

    setReviewSuccess(`Successfully submitted review for ${providerObj.name}!`);
    setReviewForm({
      providerId: "p1",
      authorName: "",
      companyName: "",
      rating: 5,
      comment: ""
    });
    setTimeout(() => {
      setReviewSuccess("");
    }, 3000);
  };

  // Create a new approved provider
  const handleCreateProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProviderForm.name || !newProviderForm.email) {
      alert("Please complete provider name and contact email.");
      return;
    }

    const nextId = "p" + (providers.length + 1);
    const logoInitials = newProviderForm.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

    const newProv = {
      ...newProviderForm,
      id: nextId,
      pin: "2026",
      logo: logoInitials || "SP",
      color: getProviderColor(newProviderForm.specialty),
      rating: 5.0,
      reviewsCount: 0,
      status: "Active"
    };

    const nextProviders = [...providers, newProv];
    updateProvidersStorage(nextProviders);

    setProviderSuccess(`Successfully registered ${newProv.name} as an approved developmental provider!`);
    setNewProviderForm({
      name: "",
      specialty: "Business Advisory",
      email: "",
      logo: "",
    });
    setTimeout(() => {
      setProviderSuccess("");
    }, 3500);
  };

  // Change provider status (Active, Probation, Suspended)
  const toggleProviderStatus = (provId: string, status: string) => {
    const next = providers.map(p => {
      if (p.id === provId) {
        return { ...p, status };
      }
      return p;
    });
    updateProvidersStorage(next);
  };

  // Revert / Reset entire dataset
  const handleResetAllData = () => {
    if (confirm("⚠️ WARNING: This will restore the database to original mock seeds. Any customized applications, responses, ratings, or providers will be lost. Proceed?")) {
      localStorage.removeItem("satf_applications");
      localStorage.removeItem("satf_providers_admin");
      localStorage.removeItem("satf_provider_reviews");
      syncAllData();
      setSelectedApp(null);
      alert("Database reset to original seeds completed.");
    }
  };

  // STATS & INTELLIGENCE CALCULATIONS
  const totalApps = applications.length;
  const statusCounts = {
    Draft: applications.filter(a => a.status === "Draft").length,
    "Pre-Assigned": applications.filter(a => a.status === "Pre-Assigned").length,
    "Intake Scheduled": applications.filter(a => a.status === "Intake Scheduled").length,
    Active: applications.filter(a => a.status === "Active").length,
    Completed: applications.filter(a => a.status === "Completed").length,
  };

  // Specialty Needs Popularity
  const specialtyCounts: Record<string, number> = {};
  applications.forEach(app => {
    if (Array.isArray(app.selectedServices)) {
      app.selectedServices.forEach((service: string) => {
        specialtyCounts[service] = (specialtyCounts[service] || 0) + 1;
      });
    }
  });

  // Calculate deep user gaps intelligence (rank questions that are checked/active the most)
  const gapIntelligence: { gapText: string; pillarTitle: string; specialty: string; count: number; percentage: number }[] = [];
  const allPossibleGaps: { gapText: string; pillarTitle: string; specialty: string }[] = [];

  ALL_PILLARS.forEach(pillar => {
    pillar.gaps.forEach(gapText => {
      allPossibleGaps.push({
        gapText,
        pillarTitle: pillar.title,
        specialty: pillar.specialty
      });
    });
  });

  allPossibleGaps.forEach(item => {
    let count = 0;
    applications.forEach(app => {
      if (Array.isArray(app.gaps)) {
        app.gaps.forEach((g: any) => {
          if (g.intervention === item.specialty && Array.isArray(g.gaps)) {
            if (g.gaps.includes(item.gapText)) {
              count++;
            }
          }
        });
      }
    });

    const percentage = totalApps > 0 ? Math.round((count / totalApps) * 100) : 0;
    gapIntelligence.push({
      gapText: item.gapText,
      pillarTitle: item.pillarTitle,
      specialty: item.specialty,
      count,
      percentage
    });
  });

  // Sort gaps by popularity/need rate
  const sortedGapIntelligence = [...gapIntelligence].sort((a, b) => b.count - a.count);

  // Industry breakdown
  const industryCounts: Record<string, number> = {};
  applications.forEach(app => {
    if (app.industry) {
      industryCounts[app.industry] = (industryCounts[app.industry] || 0) + 1;
    }
  });

  // Filtered Applications for User Table View
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesIndustry = industryFilter === "All" || app.industry === industryFilter;
    const matchesSpecialty = specialtyFilter === "All" || app.selectedServices?.includes(specialtyFilter);
    const matchesGap = gapFilter === "All" || app.gaps?.some((g: any) => g.gaps?.includes(gapFilter));

    return matchesSearch && matchesStatus && matchesIndustry && matchesSpecialty && matchesGap;
  });

  return (
    <div className="bg-gradient-to-br from-[#e2f3ec] via-[#f7f1ec] to-[#e5e9f8] w-full flex-grow py-8 sm:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden backdrop-blur-2xl flex flex-col justify-start min-h-[calc(100vh-140px)] space-y-8 rounded-[2.5rem] border border-white/80 shadow-2xl shadow-slate-900/5" id="admin-dashboard-container">
      {/* Soft background ambient mesh glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner & Control Area (Hidden per design request) */}
      <div className="hidden bg-gradient-to-r from-[#dcece1]/70 via-[#ebf4dc]/70 to-[#f8f5d7]/70 text-slate-900 p-6 sm:p-8 rounded-[2.25rem] shadow-xl shadow-slate-900/10 space-y-6 text-left border border-white/80 relative overflow-hidden backdrop-blur-2xl group transition-all duration-300 hover:border-white">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10 hidden">
          <div className="space-y-2">
            <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl tracking-tighter uppercase text-slate-900 opacity-100 leading-none">
              OPERATIONAL INSIGHTS
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 font-sans max-w-2xl leading-relaxed font-medium">
              Consolidated real-time monitoring of SMME capability pipelines, developer matching, operational gaps diagnosis, and quality ratings of national business advisory entities.
            </p>
          </div>
        </div>

        {/* Real-time Status Micro counters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-slate-900/10 text-xs font-mono relative z-10">
          <button
            onClick={() => handlePipelineClick("Draft")}
            className="bg-white/70 hover:bg-white/90 p-4 rounded-[1.5rem] border border-slate-900/10 text-left cursor-pointer transition-all duration-200 hover:border-amber-500/60 hover:scale-[1.02] active:scale-[0.98] group shadow-xs hover:shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            <span className="text-[9px] text-slate-500 block uppercase font-bold group-hover:text-amber-800 transition-colors flex items-center justify-between">
              {showAnnotations ? "[01_DRAFTS]" : "Drafts"} <span className="text-slate-400 group-hover:text-amber-800 transition-transform group-hover:translate-x-0.5">→</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1 block tracking-tight">{statusCounts.Draft}</span>
          </button>
          
          <button
            onClick={() => handlePipelineClick("Pre-Assigned")}
            className="bg-white/70 hover:bg-white/90 p-4 rounded-[1.5rem] border border-slate-900/10 text-left cursor-pointer transition-all duration-200 hover:border-slate-500/60 hover:scale-[1.02] active:scale-[0.98] group shadow-xs hover:shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-slate-400/10 rounded-full blur-xl pointer-events-none" />
            <span className="text-[9px] text-slate-500 block uppercase font-bold group-hover:text-slate-900 transition-colors flex items-center justify-between">
              {showAnnotations ? "[02_REFERRALS]" : "Referrals"} <span className="text-slate-400 group-hover:text-slate-900 transition-transform group-hover:translate-x-0.5">→</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1 block tracking-tight">{statusCounts["Pre-Assigned"]}</span>
          </button>
          
          <button
            onClick={() => handlePipelineClick("Intake Scheduled")}
            className="bg-white/70 hover:bg-white/90 p-4 rounded-[1.5rem] border border-slate-900/10 text-left cursor-pointer transition-all duration-200 hover:border-blue-500/60 hover:scale-[1.02] active:scale-[0.98] group shadow-xs hover:shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
            <span className="text-[9px] text-slate-500 block uppercase font-bold group-hover:text-blue-800 transition-colors flex items-center justify-between">
              {showAnnotations ? "[03_SCHEDULED]" : "Scheduled"} <span className="text-slate-400 group-hover:text-blue-800 transition-transform group-hover:translate-x-0.5">→</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1 block tracking-tight">{statusCounts["Intake Scheduled"]}</span>
          </button>
          
          <button
            onClick={() => handlePipelineClick("Active")}
            className="bg-white/70 hover:bg-white/90 p-4 rounded-[1.5rem] border border-slate-900/10 text-left cursor-pointer transition-all duration-200 hover:border-emerald-500/60 hover:scale-[1.02] active:scale-[0.98] group shadow-xs hover:shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <span className="text-[9px] text-slate-500 block uppercase font-bold group-hover:text-emerald-800 transition-colors flex items-center justify-between">
              {showAnnotations ? "[04_ACTIVE_JOBS]" : "Active Jobs"} <span className="text-slate-400 group-hover:text-emerald-800 transition-transform group-hover:translate-x-0.5">→</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 block tracking-tight">{statusCounts.Active}</span>
          </button>
          
          <button
            onClick={() => handlePipelineClick("Completed")}
            className="bg-white/70 hover:bg-white/90 p-4 rounded-[1.5rem] border border-slate-900/10 text-left cursor-pointer transition-all duration-200 hover:border-indigo-500/60 hover:scale-[1.02] active:scale-[0.98] group shadow-xs hover:shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
            <span className="text-[9px] text-slate-500 block uppercase font-bold group-hover:text-indigo-800 transition-colors flex items-center justify-between">
              {showAnnotations ? "[05_COMPLETED]" : "Completed"} <span className="text-slate-400 group-hover:text-indigo-800 transition-transform group-hover:translate-x-0.5">→</span>
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-1 block tracking-tight">{statusCounts.Completed}</span>
          </button>
        </div>
      </div>

      {/* Primary Tab Navigation */}
      <div className="bg-white/70 backdrop-blur-md p-2 rounded-full border border-white/90 shadow-lg shadow-slate-900/5 flex font-sans text-xs overflow-x-auto gap-1.5 max-w-full my-6">
        <button
          onClick={() => setDashboardTab("overview")}
          className={`px-5 py-2.5 rounded-full cursor-pointer transition-all uppercase whitespace-nowrap tracking-tight flex items-center gap-2 ${
            dashboardTab === "overview"
              ? "bg-slate-900 text-white font-extrabold shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50 font-bold"
          }`}
        >
          <IconInsightsAnalytics className={`w-4 h-4 ${dashboardTab === "overview" ? "text-white" : "text-slate-900"}`} />
          <span>OVERVIEW PANEL</span>
        </button>
        <button
          onClick={() => setDashboardTab("users")}
          className={`px-5 py-2.5 rounded-full cursor-pointer transition-all uppercase whitespace-nowrap tracking-tight flex items-center gap-2 ${
            dashboardTab === "users"
              ? "bg-slate-900 text-white font-extrabold shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50 font-bold"
          }`}
        >
          <IconVerificationDossier className={`w-4 h-4 ${dashboardTab === "users" ? "text-white" : "text-slate-900"}`} />
          <span>APPLICATION DOSSIERS ({applications.length})</span>
        </button>
        <button
          onClick={() => setDashboardTab("providers")}
          className={`px-5 py-2.5 rounded-full cursor-pointer transition-all uppercase whitespace-nowrap tracking-tight flex items-center gap-2 ${
            dashboardTab === "providers"
              ? "bg-slate-900 text-white font-extrabold shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50 font-bold"
          }`}
        >
          <IconQualityShield className={`w-4 h-4 ${dashboardTab === "providers" ? "text-white" : "text-slate-900"}`} />
          <span>PROVIDERS PERFORMANCE ({providers.length})</span>
        </button>
        <button
          onClick={() => setDashboardTab("allocation")}
          className={`px-5 py-2.5 rounded-full cursor-pointer transition-all uppercase whitespace-nowrap tracking-tight flex items-center gap-2 ${
            dashboardTab === "allocation"
              ? "bg-slate-900 text-white font-extrabold shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50 font-bold"
          }`}
        >
          <IconAllocationMatrix className={`w-4 h-4 ${dashboardTab === "allocation" ? "text-white" : "text-slate-900"}`} />
          <span>ALLOCATIONS TREE</span>
        </button>
        <button
          onClick={() => setDashboardTab("intelligence")}
          className={`px-5 py-2.5 rounded-full cursor-pointer transition-all uppercase whitespace-nowrap tracking-tight flex items-center gap-2 ${
            dashboardTab === "intelligence"
              ? "bg-slate-900 text-white font-extrabold shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50 font-bold"
          }`}
        >
          <IconDiagnosticRadar className={`w-4 h-4 ${dashboardTab === "intelligence" ? "text-white" : "text-slate-900"}`} />
          <span>GAP INTELLIGENCE</span>
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {dashboardTab === "overview" && (
        <div className="space-y-8 animate-fade-in text-left">
          
          {/* Main Stats Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/85 backdrop-blur-2xl border border-white/90 p-6 sm:p-7 rounded-[2.25rem] space-y-3 shadow-xl shadow-slate-900/5 relative hover:shadow-2xl hover:bg-white hover:scale-[1.005] transition-all">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-sans font-bold text-xs uppercase text-slate-900 tracking-wide flex items-center gap-2 opacity-100">
                  <Building className="w-4 h-4 text-emerald-700" />
                  Total Enrolled Businesses
                </h3>
                {showAnnotations && (
                  <span className="bg-emerald-100/80 text-emerald-800 border border-emerald-200/80 px-2.5 py-0.5 text-[9px] font-mono uppercase font-bold rounded-full">[METRIC_01]</span>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-sans font-black tracking-tighter text-slate-900 opacity-100">{totalApps}</span>
                <span className="text-xs text-slate-500 font-sans font-medium">SMMEs registered in database</span>
              </div>
              <p className="text-[10px] text-slate-500 font-sans leading-relaxed font-normal">
                Represents unique corporate structures that have initiated, drafted, or successfully finalized the 7-Pillar Developmental Assessment.
              </p>
            </div>

            <div className="bg-white/85 backdrop-blur-2xl border border-white/90 p-6 sm:p-7 rounded-[2.25rem] space-y-3 shadow-xl shadow-slate-900/5 relative hover:shadow-2xl hover:bg-white hover:scale-[1.005] transition-all">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-sans font-bold text-xs uppercase text-slate-900 tracking-wide flex items-center gap-2 opacity-100">
                  <TrendingUp className="w-4 h-4 text-amber-700" />
                  Pillars Needs Intensity
                </h3>
                {showAnnotations && (
                  <span className="bg-amber-100/80 text-amber-800 border border-amber-200/80 px-2.5 py-0.5 text-[9px] font-mono uppercase font-bold rounded-full">[METRIC_02]</span>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-sans font-black tracking-tighter text-slate-900 opacity-100">
                  {totalApps > 0 ? (applications.reduce((acc, curr) => acc + (curr.selectedServices?.length || 0), 0) / totalApps).toFixed(1) : 0}
                </span>
                <span className="text-xs text-slate-500 font-sans font-medium">Avg. identified gaps per user</span>
              </div>
              <p className="text-[10px] text-slate-500 font-sans leading-relaxed font-normal">
                Highlights the breadth of assistance needed by local entrepreneurs. A higher ratio signals heavy systemic bottlenecks.
              </p>
            </div>

            <div className="bg-white/85 backdrop-blur-2xl border border-white/90 p-6 sm:p-7 rounded-[2.25rem] space-y-3 shadow-xl shadow-slate-900/5 relative hover:shadow-2xl hover:bg-white hover:scale-[1.005] transition-all">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-sans font-bold text-xs uppercase text-slate-900 tracking-wide flex items-center gap-2 opacity-100">
                  <Star className="w-4 h-4 text-amber-500" />
                  Provider Quality Rating
                </h3>
                {showAnnotations && (
                  <span className="bg-sky-100/80 text-sky-800 border border-sky-200/80 px-2.5 py-0.5 text-[9px] font-mono uppercase font-bold rounded-full">[METRIC_03]</span>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-sans font-black tracking-tighter text-slate-900 opacity-100">
                  {(providers.reduce((sum, p) => sum + p.rating, 0) / providers.length).toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 font-sans font-medium">/ 5.0 cumulative avg</span>
              </div>
              <p className="text-[10px] text-slate-500 font-sans leading-relaxed font-normal">
                Derived directly from verification scores and live SMME surveys submitted following completed coaching cycles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Application state flow visualization & Industry statistics (7/12) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Application Conversion Funnel */}
              <div className="bg-white/85 backdrop-blur-2xl border border-white/90 p-6 sm:p-7 rounded-[2.25rem] shadow-xl shadow-slate-900/5 hover:bg-white transition-all space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 font-mono">
                  <h3 className="font-bold text-xs uppercase text-slate-950 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-slate-900" />
                    Application Flow Pipeline
                  </h3>
                  {showAnnotations && (
                    <span className="text-[9px] bg-slate-900 text-white px-2.5 py-1 rounded-full uppercase font-bold">[ACTIVE_CONVERSION]</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 font-sans">
                  The visual conversion rate across lifecycle stages from Draft to full Completion of developmental support loops.
                </p>

                <div className="space-y-3">
                  {[
                    { label: "Draft Stage", count: statusCounts.Draft, color: "bg-amber-400", desc: "Questionnaires incomplete" },
                    { label: "Pre-Assigned Referrals", count: statusCounts["Pre-Assigned"], color: "bg-slate-500", desc: "Awaiting primary diagnostic assessment review" },
                    { label: "Intake Scheduled", count: statusCounts["Intake Scheduled"], color: "bg-blue-500", desc: "Introductory session booked" },
                    { label: "Active Engagement", count: statusCounts.Active, color: "bg-emerald-500", desc: "Currently receiving development support" },
                    { label: "Completed Successes", count: statusCounts.Completed, color: "bg-indigo-500", desc: "Coaching cycle successfully signed-off" }
                  ].map((stage, i) => {
                    const percentage = totalApps > 0 ? Math.round((stage.count / totalApps) * 100) : 0;
                    return (
                      <button
                        key={stage.label}
                        type="button"
                        onClick={() => handlePipelineClick(stage.label)}
                        className="w-full text-left space-y-2 font-mono block p-3.5 hover:bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-all rounded-2xl cursor-pointer group shadow-2xs"
                      >
                        <div className="flex justify-between items-end text-xs text-slate-800">
                          <div>
                            <span className="font-bold uppercase group-hover:text-slate-900 group-hover:underline">{stage.label}</span>
                            <span className="text-[9px] text-slate-400 block font-sans lowercase mt-0.5">{stage.desc}</span>
                          </div>
                          <span className="font-bold text-slate-900 group-hover:underline">
                            {stage.count} <span className="text-[10px] text-slate-400">({percentage}%)</span> <span className="text-[9px] text-indigo-600 font-bold ml-1">→</span>
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                          <div 
                            className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                            style={{ width: `${Math.max(percentage, totalApps > 0 && stage.count > 0 ? 5 : 0)}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Top User Gaps Intelligence Highlights */}
              <div className="bg-white/85 backdrop-blur-2xl border border-white/90 p-6 sm:p-7 rounded-[2.25rem] shadow-xl shadow-slate-900/5 hover:bg-white transition-all space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 font-mono">
                  <h3 className="font-bold text-xs uppercase text-slate-950 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    Systemic Bottlenecks (Critical Needs)
                  </h3>
                  {showAnnotations && (
                    <span className="text-[9px] bg-red-50 border border-red-200 text-red-700 px-2.5 py-1 rounded-full uppercase font-bold">[INTEL_FEED]</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 font-sans">
                  The individual question checkpoints from the 7-Pillar framework with the highest "No" or "Not Sure" response rate. These are the specific areas hurting local businesses the most:
                </p>

                <div className="space-y-2.5">
                  {sortedGapIntelligence.slice(0, 4).map((gap, idx) => (
                    <button
                      key={gap.gapText}
                      type="button"
                      onClick={() => handleGapClick(gap.gapText)}
                      className="w-full text-left border border-slate-200/80 p-3.5 bg-slate-50/60 hover:bg-slate-100/80 flex justify-between items-start gap-4 cursor-pointer transition-all rounded-2xl group shadow-2xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-mono">
                          <span className="bg-slate-900 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">#{idx + 1}</span>
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500">{showAnnotations ? `[${gap.specialty}]` : gap.specialty}</span>
                          {showAnnotations && (
                            <span className="text-[8px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity ml-1">[FILTER_BY_GAP] →</span>
                          )}
                        </div>
                        <p className="text-xs font-sans text-slate-800 leading-tight group-hover:text-slate-950 group-hover:underline">{gap.gapText}</p>
                      </div>
                      <div className="text-right font-mono flex-shrink-0">
                        <span className="text-sm font-black text-slate-900 block">{gap.percentage}%</span>
                        <span className="text-[8px] uppercase font-bold text-slate-400 block">Need Rate</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Needs by Specialty & Industry Breakdown (5/12) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              
              {/* Needs by specialty / intervention area */}
              <div className="bg-white/85 backdrop-blur-2xl border border-white/90 p-6 sm:p-7 rounded-[2.25rem] shadow-xl shadow-slate-900/5 hover:bg-white transition-all space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 font-mono">
                  <h3 className="font-bold text-xs uppercase text-slate-950 flex items-center gap-2">
                    <Database className="w-4 h-4 text-slate-900" />
                    Requests by Pillar Area
                  </h3>
                  {showAnnotations && (
                    <span className="text-[9px] bg-indigo-50 border border-indigo-200 text-indigo-700 px-2.5 py-1 rounded-full uppercase font-bold">[COUNT_METRIC]</span>
                  )}
                </div>
                
                <div className="space-y-3 font-mono">
                  {ALL_PILLARS.map(p => p.specialty).filter((v, i, a) => a.indexOf(v) === i).map(specialty => {
                    const count = specialtyCounts[specialty] || 0;
                    const percentage = totalApps > 0 ? Math.round((count / totalApps) * 100) : 0;
                    return (
                      <button
                        key={specialty}
                        type="button"
                        onClick={() => handleSpecialtyClick(specialty)}
                        className="w-full text-left space-y-1.5 block p-2.5 hover:bg-slate-50/80 border border-slate-100/60 hover:border-slate-200 transition-all rounded-xl cursor-pointer group shadow-2xs"
                      >
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span className="uppercase group-hover:text-slate-900 group-hover:underline">{specialty}</span>
                          <span className="group-hover:underline text-indigo-600">{count} apps ({percentage}%) →</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
                          <div 
                            className="h-full bg-slate-900 rounded-full transition-all duration-300" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Industry participation statistics */}
              <div className="bg-white/85 backdrop-blur-2xl border border-white/90 p-6 sm:p-7 rounded-[2.25rem] shadow-xl shadow-slate-900/5 hover:bg-white transition-all space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 font-mono">
                  <h3 className="font-bold text-xs uppercase text-slate-950 flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-900" />
                    Industries Represented
                  </h3>
                  {showAnnotations && (
                    <span className="text-[9px] bg-slate-100 px-2.5 py-1 rounded-full uppercase text-slate-500 font-bold">[DEMOGRAPHIC]</span>
                  )}
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {MOCK_INDUSTRIES.map(ind => {
                    const count = industryCounts[ind] || 0;
                    const percentage = totalApps > 0 ? Math.round((count / totalApps) * 100) : 0;
                    return (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => handleIndustryClick(ind)}
                        className="w-full flex justify-between items-center border-b border-slate-100 pb-2.5 last:border-none hover:bg-slate-50 p-2 rounded-xl text-left cursor-pointer transition-all group"
                      >
                        <span className="text-slate-700 font-sans truncate pr-2 group-hover:text-slate-900 group-hover:underline">{ind}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="font-bold text-slate-900">{count}</span>
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-mono">{percentage}%</span>
                          <span className="text-[9px] text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Developer administrative tools */}
              <div className="bg-amber-50/80 border border-amber-200/80 p-6 rounded-3xl space-y-3 shadow-2xs">
                <h4 className="font-mono font-bold text-xs uppercase text-slate-950 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-amber-600" />
                  Administrative Hard-Reset
                </h4>
                <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                  Reset the local storage database to its default simulated configuration to purge test records and restore demo balance.
                </p>
                <button
                  type="button"
                  onClick={handleResetAllData}
                  className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-mono font-bold px-4 py-2.5 rounded-full uppercase cursor-pointer transition-all active:scale-[0.98] shadow-2xs"
                >
                  {showAnnotations ? "[HARD_RESET_ENTIRE_DATABASE]" : "Hard-Reset Entire Database"}
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB CONTENT: APPLICATIONS LIST & DOSSIERS */}
      {dashboardTab === "users" && (
        <div className="space-y-6 text-left animate-fade-in">
          
          <div className="bg-white/85 backdrop-blur-2xl border border-white/90 p-6 sm:p-7 rounded-[2.25rem] shadow-xl shadow-slate-900/5 space-y-4 transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-mono font-bold text-xs uppercase text-slate-950">
                  🔍 Filter and Search Applications Registry
                </h3>
                <button
                  onClick={startCreatingApp}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px] font-bold px-4 py-2 rounded-full cursor-pointer transition-all shadow-2xs active:scale-[0.98]"
                  type="button"
                >
                  {showAnnotations ? "[+ REGISTER_NEW_ASSESSMENT]" : "+ Register New Assessment"}
                </button>
              </div>
              
              {/* Reset Selected App helper */}
              <div className="flex items-center gap-3">
                {selectedApp && (
                  <button 
                    onClick={() => {
                      setSelectedApp(null);
                      setIsEditingApp(false);
                    }} 
                    className="font-mono text-[9px] font-bold text-slate-600 underline hover:text-slate-900 cursor-pointer"
                  >
                    {showAnnotations ? "[CLOSE_DETAILS_CARD]" : "Close Details"}
                  </button>
                )}
                {isCreatingApp && (
                  <button 
                    onClick={() => setIsCreatingApp(false)} 
                    className="font-mono text-[9px] font-bold text-slate-600 underline hover:text-slate-900 cursor-pointer"
                  >
                    {showAnnotations ? "[CANCEL_CREATION]" : "Cancel Creation"}
                  </button>
                )}
              </div>
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by ID, Company or Owner Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all font-sans"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3.5 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all font-sans"
              >
                <option value="All">All Application States</option>
                <option value="Draft">Draft</option>
                <option value="Pre-Assigned">Pre-Assigned</option>
                <option value="Intake Scheduled">Intake Scheduled</option>
                <option value="Active">Active Engagement</option>
                <option value="Completed">Completed Success</option>
              </select>

              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3.5 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all font-sans"
              >
                <option value="All">All Industries</option>
                {MOCK_INDUSTRIES.map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>

              <div className="bg-slate-100/80 p-2.5 border border-slate-200/80 rounded-xl text-center font-bold font-mono text-[10px] uppercase text-slate-600 flex items-center justify-center">
                Found {filteredApps.length} records matching filters
              </div>
            </div>

            {/* Active filter chip alerts */}
            {(statusFilter !== "All" || industryFilter !== "All" || specialtyFilter !== "All" || gapFilter !== "All" || searchTerm !== "") && (
              <div className="bg-amber-50/90 border border-amber-200 p-3.5 rounded-2xl font-mono text-[10px] flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5 text-slate-800">
                  <span className="font-bold">ACTIVE FILTER(S):</span>
                  {statusFilter !== "All" && (
                    <span className="bg-amber-100 border border-amber-300 text-slate-900 px-2 py-0.5 rounded-full uppercase font-bold">Status: {statusFilter}</span>
                  )}
                  {industryFilter !== "All" && (
                    <span className="bg-amber-100 border border-amber-300 text-slate-900 px-2 py-0.5 rounded-full uppercase font-bold">Industry: {industryFilter}</span>
                  )}
                  {specialtyFilter !== "All" && (
                    <span className="bg-amber-100 border border-amber-300 text-slate-900 px-2 py-0.5 rounded-full uppercase font-bold">Pillar: {specialtyFilter}</span>
                  )}
                  {gapFilter !== "All" && (
                    <span className="bg-amber-100 border border-amber-300 text-slate-900 px-2 py-0.5 rounded-full uppercase font-bold truncate max-w-[200px]" title={gapFilter}>Gap: {gapFilter}</span>
                  )}
                  {searchTerm !== "" && (
                    <span className="bg-amber-100 border border-amber-300 text-slate-900 px-2 py-0.5 rounded-full font-bold">Search: "{searchTerm}"</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter("All");
                    setIndustryFilter("All");
                    setSpecialtyFilter("All");
                    setGapFilter("All");
                    setSearchTerm("");
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-1 px-3 rounded-full uppercase text-[9px] cursor-pointer transition-all active:scale-[0.98]"
                >
                  {showAnnotations ? "[CLEAR_ALL_FILTERS]" : "Clear All Filters"}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Applications List (7/12) */}
            <div className="lg:col-span-7 space-y-3">
              {filteredApps.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-slate-300 p-12 text-center font-mono text-xs text-slate-400">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  No applications matched your search filters.
                  <p className="text-[10px] text-slate-500 font-sans mt-1">Try resetting the status/industry filters above or simulate a new SMME.</p>
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[700px] overflow-y-auto pr-2">
                  {filteredApps.map((app) => {
                    const isSelected = selectedApp && selectedApp.id === app.id;
                    return (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className={`border p-5 text-left cursor-pointer transition-all flex flex-col justify-between gap-3 relative rounded-2xl shadow-2xs hover:shadow-md hover:-translate-y-[1px] ${
                          isSelected
                            ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                            : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50 text-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 border-b border-slate-200/40 pb-2.5">
                          <div className="font-mono text-xs font-bold uppercase">
                            <span className={isSelected ? "text-amber-400" : "text-slate-500"}>{showAnnotations ? "[APP_ID]" : "ID:"}</span> {app.id}
                          </div>
                          <span className={`px-2.5 py-1 border text-[9px] uppercase font-bold tracking-wider rounded-full ${getStatusBadgeClass(app.status)}`}>
                            {app.status}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-bold text-sm tracking-tight">{app.companyName}</h4>
                          <div className="flex items-center gap-2 text-[11px] font-sans">
                            <span className={isSelected ? "text-slate-300 font-semibold" : "text-slate-600"}>{app.ownerName}</span>
                            <span className={isSelected ? "text-slate-500" : "text-slate-400"}>•</span>
                            <span className={isSelected ? "text-slate-300" : "text-slate-500"}>{app.industry}</span>
                          </div>
                        </div>

                        {/* Gap and services tags count */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/40 pt-2.5 text-[10px] font-mono">
                          <span className={isSelected ? "text-slate-400" : "text-slate-500"}>
                            Pillars: <strong>{app.selectedServices?.length || 0}</strong> / Gaps: <strong>{app.gaps?.reduce((acc: number, g: any) => acc + (g.gaps?.length || 0), 0) || 0}</strong>
                          </span>
                          <span className="underline font-bold text-[9px] uppercase">
                            {showAnnotations ? (isSelected ? "[DETAILS_OPEN]" : "[CLICK_TO_MANAGE]") : (isSelected ? "Details Open" : "Manage")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Interactive Application Admin Desk Details (5/12) */}
            <div className="lg:col-span-5 sticky top-24">
              {isCreatingApp ? (
                <form onSubmit={handleSaveNewAssessment} className="bg-white border border-slate-200/90 p-6 rounded-3xl space-y-4 text-left shadow-xl max-h-[750px] overflow-y-auto">
                  <div className="border-b border-slate-200/80 pb-3 font-mono">
                    <span className="text-[9px] bg-emerald-600 text-white px-2.5 py-1 rounded-full uppercase tracking-widest font-bold">
                      {showAnnotations ? "[REGISTER_NEW_ASSESSMENT_FORM]" : "Register New Assessment Form"}
                    </span>
                    <h3 className="font-bold text-sm text-slate-950 uppercase mt-1">
                      New Needs Assessment
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Company Name *</label>
                      <input 
                        type="text"
                        required
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder="e.g. Modise Craft Boutique"
                        className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">CIPC Registration No.</label>
                        <input 
                          type="text"
                          value={formRegNumber}
                          onChange={(e) => setFormRegNumber(e.target.value)}
                          placeholder="e.g. 2026/123456/07"
                          className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Industry Sector</label>
                        <select 
                          value={formIndustry}
                          onChange={(e) => setFormIndustry(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                        >
                          {MOCK_INDUSTRIES.map(ind => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Owner / Director Name *</label>
                      <input 
                        type="text"
                        required
                        value={formOwner}
                        onChange={(e) => setFormOwner(e.target.value)}
                        placeholder="e.g. Sipho Cele"
                        className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Owner Email *</label>
                        <input 
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="owner@company.co.za"
                          className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Owner Phone</label>
                        <input 
                          type="text"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder="+27 71 890 1234"
                          className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Assessment Motivation Statement</label>
                      <textarea 
                        value={formMotivation}
                        onChange={(e) => setFormMotivation(e.target.value)}
                        placeholder="Describe the primary capabilities bottlenecks and needs..."
                        rows={2}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Workflow Stage Status</label>
                      <select 
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Pre-Assigned">Pre-Assigned Referral</option>
                        <option value="Intake Scheduled">Intake Scheduled</option>
                        <option value="Active">Active Engagement</option>
                        <option value="Completed">Completed Cycle Signoff</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Internal Advisory Notes</label>
                      <textarea 
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder="Attach clinical observations or special provider requests..."
                        rows={2}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all resize-none"
                      />
                    </div>

                    {/* PILLARS SELECTION */}
                    <div className="space-y-2 border border-slate-200/80 p-3.5 bg-slate-50/60 rounded-2xl font-mono">
                      <span className="text-[9px] font-bold text-slate-600 uppercase block">
                        ⛓️ Core Support Pillars Referral
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        {[
                          "Business Advisory", "Business Planning", "Technical Assistance",
                          "Skills Development", "Mentorship & Incubation", "Digital Enablement"
                        ].map((serv) => {
                          const isAllocated = formSelectedServices.includes(serv);
                          return (
                            <button
                              key={serv}
                              type="button"
                              onClick={() => toggleFormService(serv)}
                              className={`p-2.5 border text-[9px] text-left uppercase flex flex-col justify-between cursor-pointer transition-all rounded-xl ${
                                isAllocated
                                  ? "bg-slate-900 border-slate-900 text-white font-bold shadow-xs"
                                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                              }`}
                            >
                              <span className="block font-black truncate">{serv}</span>
                              <span className="text-[7px] block mt-1 font-sans">
                                {showAnnotations ? (isAllocated ? "[ACTIVE_GAP]" : "[INACTIVE]") : (isAllocated ? "Active Gap" : "Inactive")}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* DYNAMIC GAPS LIST BASED ON CHECKED SERVICES */}
                    {formSelectedServices.length > 0 && (
                      <div className="space-y-3.5 border border-slate-200/80 p-3.5 bg-slate-50/50 rounded-2xl max-h-60 overflow-y-auto">
                        <span className="font-mono text-[9px] font-bold text-slate-500 uppercase block">
                          🎯 Configure Active Diagnostic Gaps
                        </span>
                        {formSelectedServices.map(service => {
                          const pillarObj = ALL_PILLARS.find(p => p.specialty === service);
                          if (!pillarObj) return null;
                          return (
                            <div key={service} className="space-y-1.5">
                              <h5 className="font-mono text-[8px] font-black uppercase text-slate-700 border-b border-slate-200 pb-0.5">
                                {pillarObj.title}
                              </h5>
                              <div className="space-y-1 font-sans text-[11px] text-slate-700">
                                {pillarObj.gaps.map(gapStr => {
                                  const isChecked = (formGapsMap[service] || []).includes(gapStr);
                                  return (
                                    <label key={gapStr} className="flex items-start gap-2 cursor-pointer hover:text-slate-700">
                                      <input 
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleFormGap(service, gapStr)}
                                        className="mt-0.5 border-slate-900 rounded-xs"
                                      />
                                      <span>{gapStr}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Form Controls */}
                    <div className="flex gap-2 pt-2 font-mono">
                      <button
                        type="submit"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-full shadow-2xs active:scale-[0.98] cursor-pointer transition-all"
                      >
                        {showAnnotations ? "[SAVE_ASSESSMENT]" : "Save Assessment"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCreatingApp(false)}
                        className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-full border border-slate-200 active:bg-slate-100 cursor-pointer transition-all"
                      >
                        {showAnnotations ? "[CANCEL]" : "Cancel"}
                      </button>
                    </div>
                  </div>
                </form>
              ) : isEditingApp && selectedApp ? (
                <form onSubmit={handleUpdateAssessment} className="bg-white border border-slate-200/90 p-6 rounded-3xl space-y-4 text-left shadow-xl max-h-[750px] overflow-y-auto">
                  <div className="border-b border-slate-200/80 pb-3 font-mono flex items-center justify-between">
                    <div>
                      <span className="text-[9px] bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full uppercase tracking-widest font-bold">
                        {showAnnotations ? "[EDIT_ASSESSMENT_FORM]" : "Edit Assessment Form"}
                      </span>
                      <h3 className="font-bold text-sm text-slate-950 uppercase mt-1">
                        Edit {selectedApp.id}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingApp(false)}
                      className="text-[9px] font-bold text-slate-500 underline hover:text-slate-900 cursor-pointer"
                    >
                      {showAnnotations ? "[CANCEL_EDIT]" : "Cancel Edit"}
                    </button>
                  </div>

                  <div className="space-y-3.5 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Company Name *</label>
                      <input 
                        type="text"
                        required
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">CIPC Registration No.</label>
                        <input 
                          type="text"
                          value={formRegNumber}
                          onChange={(e) => setFormRegNumber(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Industry Sector</label>
                        <select 
                          value={formIndustry}
                          onChange={(e) => setFormIndustry(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                        >
                          {MOCK_INDUSTRIES.map(ind => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Owner / Director Name *</label>
                      <input 
                        type="text"
                        required
                        value={formOwner}
                        onChange={(e) => setFormOwner(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Owner Email *</label>
                        <input 
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Owner Phone</label>
                        <input 
                          type="text"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Assessment Motivation Statement</label>
                      <textarea 
                        value={formMotivation}
                        onChange={(e) => setFormMotivation(e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Workflow Stage Status</label>
                      <select 
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Pre-Assigned">Pre-Assigned Referral</option>
                        <option value="Intake Scheduled">Intake Scheduled</option>
                        <option value="Active">Active Engagement</option>
                        <option value="Completed">Completed Cycle Signoff</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] font-bold text-slate-500 uppercase block">Internal Advisory Notes</label>
                      <textarea 
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        rows={2}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-sans focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all resize-none"
                      />
                    </div>

                    {/* PILLARS SELECTION */}
                    <div className="space-y-2 border border-slate-200/80 p-3.5 bg-slate-50/60 rounded-2xl font-mono">
                      <span className="text-[9px] font-bold text-slate-600 uppercase block">
                        ⛓️ Core Support Pillars Referral
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        {[
                          "Business Advisory", "Business Planning", "Technical Assistance",
                          "Skills Development", "Mentorship & Incubation", "Digital Enablement"
                        ].map((serv) => {
                          const isAllocated = formSelectedServices.includes(serv);
                          return (
                            <button
                              key={serv}
                              type="button"
                              onClick={() => toggleFormService(serv)}
                              className={`p-2.5 border text-[9px] text-left uppercase flex flex-col justify-between cursor-pointer transition-all rounded-xl ${
                                isAllocated
                                  ? "bg-slate-900 border-slate-900 text-white font-bold shadow-xs"
                                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                              }`}
                            >
                              <span className="block font-black truncate">{serv}</span>
                              <span className="text-[7px] block mt-1 font-sans">
                                {showAnnotations ? (isAllocated ? "[ACTIVE_GAP]" : "[INACTIVE]") : (isAllocated ? "Active Gap" : "Inactive")}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* DYNAMIC GAPS LIST BASED ON CHECKED SERVICES */}
                    {formSelectedServices.length > 0 && (
                      <div className="space-y-3.5 border border-slate-200/80 p-3.5 bg-slate-50/50 rounded-2xl max-h-60 overflow-y-auto">
                        <span className="font-mono text-[9px] font-bold text-slate-500 uppercase block">
                          🎯 Configure Active Diagnostic Gaps
                        </span>
                        {formSelectedServices.map(service => {
                          const pillarObj = ALL_PILLARS.find(p => p.specialty === service);
                          if (!pillarObj) return null;
                          return (
                            <div key={service} className="space-y-1.5">
                              <h5 className="font-mono text-[8px] font-black uppercase text-slate-700 border-b border-slate-200 pb-0.5">
                                {pillarObj.title}
                              </h5>
                              <div className="space-y-1 font-sans text-[11px] text-slate-700">
                                {pillarObj.gaps.map(gapStr => {
                                  const isChecked = (formGapsMap[service] || []).includes(gapStr);
                                  return (
                                    <label key={gapStr} className="flex items-start gap-2 cursor-pointer hover:text-slate-700">
                                      <input 
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleFormGap(service, gapStr)}
                                        className="mt-0.5 border-slate-900 rounded-xs"
                                      />
                                      <span>{gapStr}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Form Controls */}
                    <div className="flex gap-2 pt-2 font-mono">
                      <button
                        type="submit"
                        className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2.5 rounded-full shadow-2xs active:scale-[0.98] cursor-pointer transition-all"
                      >
                        {showAnnotations ? "[UPDATE_ASSESSMENT]" : "Update Assessment"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingApp(false)}
                        className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-full border border-slate-200 active:bg-slate-100 cursor-pointer transition-all"
                      >
                        {showAnnotations ? "[CANCEL]" : "Cancel"}
                      </button>
                    </div>
                  </div>
                </form>
              ) : selectedApp ? (
                <div className="bg-white border border-slate-200/90 p-6 rounded-3xl space-y-5 text-left shadow-xl sticky top-24">
                  
                  {/* Title & Actions bar */}
                  <div className="border-b border-slate-200/80 pb-3 space-y-1.5 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] bg-slate-900 text-white px-2.5 py-1 rounded-full uppercase tracking-widest font-bold">
                        {showAnnotations ? "[ADMINISTRATIVE_WORK_DESK]" : "Administrative Work Desk"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => startEditingApp(selectedApp)}
                          className="text-amber-700 hover:text-amber-800 px-3 py-1.5 border border-amber-200 hover:border-amber-300 bg-amber-50 text-[9px] font-bold rounded-full flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <Settings className="w-3 h-3" />
                          <span>{showAnnotations ? "[EDIT]" : "Edit"}</span>
                        </button>
                        <button
                          onClick={() => deleteApplication(selectedApp.id)}
                          className="text-red-600 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-full border border-transparent hover:border-red-200 transition-all cursor-pointer"
                          title="Delete application record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm text-slate-950 uppercase block truncate">
                      {selectedApp.companyName}
                    </h3>
                    <div className="text-[10px] text-slate-500">
                      ID: {selectedApp.id} / Registered: {new Date(selectedApp.dateSubmitted || Date.now()).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Operational details */}
                  <div className="space-y-3.5 text-xs font-sans">
                    <div className="grid grid-cols-2 gap-2 border border-slate-200/80 p-3 bg-slate-50/60 rounded-2xl font-mono text-[10px]">
                      <div>
                        <span className="text-slate-400 block uppercase font-bold">CIPC Reg No.</span>
                        <span className="text-slate-900 font-bold block">{selectedApp.regNumber || "Pending"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block uppercase font-bold">Owner Name</span>
                        <span className="text-slate-900 font-bold block">{selectedApp.ownerName}</span>
                      </div>
                    </div>

                    <div className="space-y-1 font-mono text-[10px] text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{selectedApp.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{selectedApp.phone || "No phone registered"}</span>
                      </div>
                    </div>

                    {/* Motivation Block */}
                    <div className="space-y-1 bg-slate-50/50 p-3.5 border border-slate-200/80 rounded-2xl">
                      <span className="font-mono text-[9px] uppercase font-bold text-slate-500 block">SMME Motivation Statement:</span>
                      <p className="text-[11px] text-slate-700 italic leading-relaxed">
                        "{selectedApp.motivation || "No custom motivation provided."}"
                      </p>
                    </div>

                    {/* INTERACTIVE STATE MANAGER OVERRIDE */}
                    <div className="space-y-2 border border-amber-200 p-4 bg-amber-50/30 rounded-2xl font-mono">
                      <span className="text-[9px] font-bold text-amber-800 uppercase block tracking-wider">
                        🛠️ Real-Time Status Transitioner
                      </span>
                      <p className="text-[10px] text-slate-600 font-sans leading-tight">
                        Admins can manually advance or revert application status. This instantly triggers provider referral queues and dashboard calculations.
                      </p>
                      
                      <div className="flex gap-2">
                        <select
                          value={selectedApp.status}
                          onChange={(e) => changeAppStatus(selectedApp.id, e.target.value)}
                          className="flex-1 bg-white border border-slate-200 p-2.5 text-xs font-bold rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 cursor-pointer"
                        >
                          <option value="Draft">Draft (Incomplete Questionnaire)</option>
                          <option value="Pre-Assigned">Pre-Assigned Referral</option>
                          <option value="Intake Scheduled">Intake Scheduled</option>
                          <option value="Active">Active Engagement</option>
                          <option value="Completed">Completed Cycle Signoff</option>
                        </select>
                      </div>
                    </div>

                    {/* ALLOCATED SPECIALTY INTERVENTIONS MANAGER */}
                    <div className="space-y-2 border border-slate-200/80 p-3.5 rounded-2xl font-mono">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block">
                        ⛓️ Assigned Pillars / Referrals
                      </span>
                      <p className="text-[10px] text-slate-500 font-sans leading-tight">
                        Manually toggle matching specialty referrals based on diagnostic gaps. Active channels can be assigned to custom service providers using the drop-downs below.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 pt-1.5">
                        {[
                          "Business Advisory", "Business Planning", "Technical Assistance",
                          "Skills Development", "Mentorship & Incubation", "Digital Enablement"
                        ].map((serv) => {
                          const isAllocated = selectedApp.selectedServices?.includes(serv);
                          const currentAssignedId = selectedApp.assignedProviders?.[serv] || providers.find(p => p.specialty === serv)?.id || "";
                          const assignedProv = providers.find(p => p.id === currentAssignedId);
                          return (
                            <div key={serv} className="space-y-1.5 p-2 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col justify-between">
                              <button
                                type="button"
                                onClick={() => toggleAppServiceAllocation(selectedApp.id, serv)}
                                className={`w-full p-2 border text-[9px] text-left uppercase flex flex-col justify-between cursor-pointer transition-all rounded-lg ${
                                  isAllocated
                                    ? "bg-slate-900 border-slate-900 text-white font-bold"
                                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                                }`}
                              >
                                <span className="block font-black truncate">{serv}</span>
                                <span className={`text-[7px] block mt-1 ${isAllocated ? "text-amber-400 font-sans font-bold" : "text-slate-400 font-sans"}`}>
                                  {isAllocated ? `Linked: ${assignedProv?.logo || "Provider"}` : (showAnnotations ? "[NOT_LINKED]" : "Not Linked")}
                                </span>
                              </button>

                              {isAllocated && (
                                <div className="space-y-1 mt-1">
                                  <label className="text-[7px] text-slate-500 uppercase font-bold block">REASSIGN_PROVIDER:</label>
                                  <select
                                    value={currentAssignedId}
                                    onChange={(e) => assignProviderForSpecialty(selectedApp.id, serv, e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg p-1 font-mono text-[8px] text-slate-900 focus:outline-hidden cursor-pointer"
                                  >
                                    <option value="">-- Choose Provider --</option>
                                    {providers.map(p => (
                                      <option key={p.id} value={p.id}>
                                        {p.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* DIAGNOSED GAPS TABLE IN DETAIL */}
                    <div className="space-y-2.5 font-mono border border-slate-200/80 p-3.5 bg-slate-50/40 rounded-2xl max-h-56 overflow-y-auto">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block">
                        🎯 Individual Checked Gaps ({selectedApp.gaps?.reduce((acc: number, g: any) => acc + (g.gaps?.length || 0), 0) || 0})
                      </span>
                      {selectedApp.gaps && selectedApp.gaps.length > 0 ? (
                        <div className="space-y-3 font-sans text-[11px]">
                          {selectedApp.gaps.map((g: any, i: number) => (
                            <div key={i} className="space-y-1 text-xs">
                              <div className="font-mono text-[9px] font-bold uppercase text-slate-500">
                                {g.pillarTitle} ({g.gaps?.length || 0})
                              </div>
                              <ul className="list-disc pl-4 space-y-1 text-slate-700 leading-normal">
                                {g.gaps?.map((gapStr: string) => (
                                  <li key={gapStr}>{gapStr}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-sans">No detailed diagnostic gaps registered. Answers are either Yes or the application is an unsubmitted Draft.</span>
                      )}
                    </div>

                    {/* ADVISORY NOTES ATTACHMENT */}
                    <div className="space-y-2 font-mono">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block">
                        📝 Administrative Assessment Notes
                      </span>
                      <textarea
                        defaultValue={selectedApp.advisoryNotes || ""}
                        id={`notes-textarea-${selectedApp.id}`}
                        placeholder="Attach clinical diagnostics, strategic referrals, or coaching notes. Viewable by assigned Service Providers..."
                        className="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-sans rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all h-24"
                      />
                      <button
                        onClick={() => {
                          const val = (document.getElementById(`notes-textarea-${selectedApp.id}`) as HTMLTextAreaElement)?.value || "";
                          saveAppNotes(selectedApp.id, val);
                        }}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase cursor-pointer transition-all shadow-2xs active:scale-[0.98]"
                      >
                        {showAnnotations ? "[SAVE_ADMIN_NOTES]" : "Save Admin Notes"}
                      </button>
                    </div>

                  </div>

                </div>
              ) : (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center font-mono text-xs text-slate-400 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)]">
                  <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  NO APPLICATION RECORD SELECTED
                  <p className="text-[10px] text-slate-500 font-sans mt-2 leading-relaxed">
                    Click any application card in the registry queue on the left to load the interactive admin desk. From here you can manage status states, override pillar referrals, view diagnostic responses, and append private expert notes.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB CONTENT: SERVICE PROVIDERS & RATINGS */}
      {dashboardTab === "providers" && (
        <div className="space-y-8 text-left animate-fade-in">
          
          {/* Main Providers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((prov) => {
              // Calculate allocations from apps
              const totalAllocated = applications.filter(app => app.selectedServices?.includes(prov.specialty)).length;
              const completedJobs = applications.filter(app => app.selectedServices?.includes(prov.specialty) && app.status === "Completed").length;
              const activeJobs = applications.filter(app => app.selectedServices?.includes(prov.specialty) && app.status === "Active").length;
              const scheduledJobs = applications.filter(app => app.selectedServices?.includes(prov.specialty) && app.status === "Intake Scheduled").length;
              
              const completionRate = totalAllocated > 0 ? Math.round((completedJobs / totalAllocated) * 100) : 0;

              return (
                <div key={prov.id} className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2.25rem] p-6 space-y-4 relative shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:bg-white hover:scale-[1.005] transition-all">
                  
                  {/* Provider Status Tag */}
                  <div className="absolute top-4 right-4 font-mono text-[7px] font-bold">
                    {prov.status === "Active" ? (
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {showAnnotations ? "[ONLINE_ACTIVE]" : "Active"}
                      </span>
                    ) : (
                      <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {showAnnotations ? `[${prov.status.toUpperCase()}]` : prov.status}
                      </span>
                    )}
                  </div>

                  {/* Header info */}
                  <div className="flex items-center gap-3 border-b border-slate-200/80 pb-3.5">
                    <div className="w-11 h-11 border border-slate-200 bg-slate-50 rounded-2xl flex items-center justify-center font-mono font-bold text-xs uppercase shadow-2xs">
                      {prov.logo || "SP"}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs text-slate-950 uppercase block truncate max-w-44" title={prov.name}>
                        {prov.name}
                      </h4>
                      <span className="bg-slate-900 text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {prov.specialty}
                      </span>
                    </div>
                  </div>

                  {/* Rating presentation */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400 uppercase text-[9px] font-bold">Feedback Rating:</span>
                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`w-3.5 h-3.5 ${idx < Math.round(prov.rating) ? "fill-amber-400" : "text-slate-200"}`} 
                          />
                        ))}
                      </div>
                      <span className="font-bold text-slate-900">{prov.rating || "5.0"}</span>
                      <span className="text-[10px] text-slate-400">({prov.reviewsCount || 0})</span>
                    </div>
                  </div>

                  {/* Assigned application micro breakdowns */}
                  <div className="grid grid-cols-4 gap-2 font-mono text-[10px] text-center bg-slate-50/60 border border-slate-200/80 rounded-2xl p-2.5">
                    <div>
                      <span className="text-slate-400 block text-[7px] uppercase font-bold">Total</span>
                      <span className="text-slate-900 font-bold text-xs">{totalAllocated}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[7px] uppercase font-bold">Intake</span>
                      <span className="text-slate-900 font-bold text-xs">{scheduledJobs}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[7px] uppercase font-bold">Active</span>
                      <span className="text-slate-900 font-bold text-xs">{activeJobs}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[7px] uppercase font-bold">Done</span>
                      <span className="text-slate-900 font-bold text-xs">{completedJobs}</span>
                    </div>
                  </div>

                  {/* Completion Rate visual slider */}
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="flex justify-between items-end text-[9px] text-slate-500 font-bold">
                      <span>COMPLETION SIGN-OFF RATE:</span>
                      <span>{completionRate}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                      <div 
                        className="h-full bg-slate-900 rounded-full transition-all duration-300"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Action dropdown for admin toggle */}
                  <div className="flex items-center justify-between border-t border-slate-200/80 pt-3 font-mono text-[9px] font-bold">
                    <span className="text-slate-400">PIN: '{prov.pin}'</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => toggleProviderStatus(prov.id, "Active")}
                        className={`px-2 py-1 rounded-full border text-[8px] cursor-pointer transition-all ${prov.status === "Active" ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 text-slate-400 border-slate-200"}`}
                      >
                        {showAnnotations ? "[ACTIVE]" : "Active"}
                      </button>
                      <button
                        onClick={() => toggleProviderStatus(prov.id, "Probation")}
                        className={`px-2 py-1 rounded-full border text-[8px] cursor-pointer transition-all ${prov.status === "Probation" ? "bg-amber-400 text-slate-900 border-amber-400 font-bold" : "bg-slate-50 text-slate-400 border-slate-200"}`}
                      >
                        {showAnnotations ? "[PROBATION]" : "Probation"}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Approved Providers Feed (7/12) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2.25rem] p-6 sm:p-7 space-y-4 shadow-xl shadow-slate-900/5 hover:bg-white transition-all">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 font-mono">
                  <h3 className="font-bold text-xs uppercase text-slate-950 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-slate-900" />
                    Latest SMME Feedback & Ratings Audit
                  </h3>
                  {showAnnotations && (
                    <span className="text-[8px] bg-slate-100 px-2.5 py-1 rounded-full uppercase text-slate-500 font-bold border border-slate-200">[VERIFIED_SURVEYS]</span>
                  )}
                </div>
                
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-xs text-slate-400 font-sans italic py-4">No verified ratings or feedback logged in local database yet.</p>
                  ) : (
                    reviews.map((rev) => (
                      <div key={rev.id} className="border border-slate-200/80 p-4 rounded-2xl bg-slate-50/50 space-y-2 text-xs">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono">
                          <div className="flex items-center gap-2">
                            <span className="bg-slate-900 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">{rev.providerLogo || "SP"}</span>
                            <span className="font-extrabold uppercase text-slate-900 truncate max-w-44">{rev.providerName}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex text-amber-400 scale-90">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star 
                                  key={idx} 
                                  className={`w-3.5 h-3.5 ${idx < rev.rating ? "fill-amber-400" : "text-slate-200"}`} 
                                />
                              ))}
                            </div>
                            <span className="font-bold text-slate-800">({rev.rating}/5)</span>
                          </div>
                        </div>

                        <p className="font-sans text-slate-700 italic leading-relaxed">
                          "{rev.comment}"
                        </p>

                        <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-200/60 font-mono">
                          <span>By {rev.authorName} ({rev.companyName})</span>
                          <span>{new Date(rev.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right: Submit rating / Log feedback Form (5/12) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Submission Form */}
              <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[2.25rem] p-6 sm:p-7 space-y-4 shadow-xl shadow-slate-900/5 hover:bg-white transition-all">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 font-mono">
                  <h3 className="font-bold text-xs uppercase text-slate-950 flex items-center gap-1.5">
                    <Plus className="w-4.5 h-4.5 text-slate-950" />
                    Record SMME Performance Survey
                  </h3>
                  {showAnnotations && (
                    <span className="text-[8px] bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full uppercase font-bold">[ADMIN_OVERRIDE_LOG]</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                  Log a feedback assessment submitted by an SMME following their completion or active engagement phase. This dynamically recalculates provider scores.
                </p>

                {reviewSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-[11px] font-mono font-bold">
                    🎉 {reviewSuccess}
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-slate-600 block uppercase text-[10px]">Target Service Provider:</label>
                    <select
                      value={reviewForm.providerId}
                      onChange={(e) => setReviewForm({ ...reviewForm, providerId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all cursor-pointer"
                    >
                      {providers.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.specialty})</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1 text-left">
                      <label className="text-slate-600 block uppercase text-[10px]">SMME Author Name:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sipho Cele"
                        value={reviewForm.authorName}
                        onChange={(e) => setReviewForm({ ...reviewForm, authorName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-sans focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-slate-600 block uppercase text-[10px]">SMME Company Name:</label>
                      <input
                        type="text"
                        placeholder="e.g. Soweto Hub"
                        value={reviewForm.companyName}
                        onChange={(e) => setReviewForm({ ...reviewForm, companyName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-sans focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-600 block uppercase text-[10px]">Satisfaction Rating (1-5 Stars):</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl focus:outline-hidden focus:bg-white font-bold cursor-pointer"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ [5 / 5 - EXCELLENT]</option>
                      <option value="4">⭐⭐⭐⭐ [4 / 5 - VERY GOOD]</option>
                      <option value="3">⭐⭐⭐ [3 / 5 - SATISFACTORY]</option>
                      <option value="2">⭐⭐ [2 / 5 - REQUIRES WORK]</option>
                      <option value="1">⭐ [1 / 5 - CRITICAL FAILURE]</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-slate-600 block uppercase text-[10px]">Qualitative Feedback Statement:</label>
                    <textarea
                      required
                      placeholder="Enter the official feedback comments regarding developmental assistance loops..."
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-sans focus:outline-hidden focus:bg-white h-20 focus:ring-2 focus:ring-slate-900 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-full uppercase cursor-pointer transition-all shadow-2xs active:scale-[0.98]"
                  >
                    {showAnnotations ? "[SUBMIT_VERIFIED_SURVEY]" : "Submit Verified Survey"}
                  </button>
                </form>
              </div>

              {/* Add approved provider form */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 font-mono">
                  <h3 className="font-bold text-xs uppercase text-slate-950 flex items-center gap-1.5">
                    <Plus className="w-4.5 h-4.5 text-slate-950" />
                    Register Approved Provider Entity
                  </h3>
                  {showAnnotations && (
                    <span className="text-[8px] bg-indigo-50 border border-indigo-200 text-indigo-700 px-2.5 py-1 rounded-full uppercase font-bold">[CIPC_REG]</span>
                  )}
                </div>

                {providerSuccess && (
                  <div className="p-3 bg-indigo-50 border border-indigo-300 rounded-2xl text-indigo-800 text-[11px] font-mono font-bold">
                    🎉 {providerSuccess}
                  </div>
                )}

                <form onSubmit={handleCreateProvider} className="space-y-3.5 text-xs font-mono">
                  <div className="space-y-1 text-left">
                    <label className="text-slate-600 block uppercase text-[10px]">Provider Agency Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pretoria Skills Academy"
                      value={newProviderForm.name}
                      onChange={(e) => setNewProviderForm({ ...newProviderForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-sans focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-600 block uppercase text-[10px]">Specialized Developmental Pillar:</label>
                    <select
                      value={newProviderForm.specialty}
                      onChange={(e) => setNewProviderForm({ ...newProviderForm, specialty: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl focus:outline-hidden focus:bg-white cursor-pointer"
                    >
                      <option value="Business Advisory">Business Advisory (Pillar 1)</option>
                      <option value="Business Planning">Business Planning (Pillar 2)</option>
                      <option value="Technical Assistance">Technical Assistance (Pillar 3)</option>
                      <option value="Skills Development">Skills Development (Pillar 4)</option>
                      <option value="Mentorship & Incubation">Mentorship & Incubation (Pillar 5 & 6)</option>
                      <option value="Digital Enablement">Digital Enablement (Pillar 7)</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-slate-600 block uppercase text-[10px]">Contact Email Address:</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. projects@agency.org.za"
                      value={newProviderForm.email}
                      onChange={(e) => setNewProviderForm({ ...newProviderForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-sans focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-full uppercase cursor-pointer transition-all shadow-2xs active:scale-[0.98]"
                  >
                    {showAnnotations ? "[AUTHORIZE_PROVIDER_PARTNER]" : "Authorize Provider Partner"}
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB CONTENT: DEEP USER GAPS INTELLIGENCE */}
      {dashboardTab === "intelligence" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-6 text-left animate-fade-in shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)]">
          
          <div className="flex justify-between items-center border-b border-slate-200/80 pb-3 font-mono">
            <h3 className="font-bold text-xs uppercase text-slate-950 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-slate-950" />
              National Business Gaps & Needs diagnostic Ranking
            </h3>
            <span className="bg-slate-900 text-white text-[8px] font-bold px-2.5 py-1 rounded-full uppercase font-mono">
              {showAnnotations ? `[TOTAL_SURVEYS: ${totalApps}]` : `Total Surveys: ${totalApps}`}
            </span>
          </div>

          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            This analytics framework aggregates diagnostic responses from the 7-Pillar framework checked by SMMEs during application submission. 
            Answering <strong className="text-red-600">NO</strong> or <strong className="text-amber-500">NOT SURE</strong> reveals a critical operational vulnerability. 
            By sorting these checkpoints, policymakers and fund administrators can identify what systemic support systems are in shortest supply nationally.
          </p>

          <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
            <table className="w-full font-mono text-xs text-left">
              <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">RANK</th>
                  <th className="py-3.5 px-4">SPECIFIC OPERATIONAL GAP CHECKPOINT</th>
                  <th className="py-3.5 px-4">DEVELOPMENTAL PILLAR CATEGORY</th>
                  <th className="py-3.5 px-4 text-center">NEED COUNT</th>
                  <th className="py-3.5 px-4 text-center">SYSTEMIC FREQUENCY %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 bg-white font-sans text-xs">
                {sortedGapIntelligence.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-400">#{idx + 1}</td>
                    <td className="py-3.5 px-4 text-slate-900 font-medium font-sans max-w-sm sm:max-w-md">{item.gapText}</td>
                    <td className="py-3.5 px-4 font-mono text-[10px]">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 border border-slate-200 uppercase font-bold tracking-tight rounded-full">
                        {item.specialty}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-center text-slate-900">{item.count}</td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      <div className="flex items-center gap-2.5 justify-center">
                        <span className="font-bold text-slate-900 w-8 text-right">{item.percentage}%</span>
                        <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200 hidden sm:block">
                          <div 
                            className={`h-full rounded-full ${
                              item.percentage > 50 ? "bg-red-500" :
                              item.percentage > 25 ? "bg-amber-400" : "bg-emerald-500"
                            }`} 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB CONTENT: INTERACTIVE SERVICE PROVIDER ALLOCATIONS TREE */}
      {dashboardTab === "allocation" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-6 text-left animate-fade-in shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)]">
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200/80 pb-4 font-mono">
            <div className="space-y-1">
              <h3 className="font-bold text-sm uppercase text-slate-950 flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-600" />
                Live Service Provider Allocation Tree
              </h3>
              <p className="text-[10px] text-slate-500 font-sans">
                Interactive organizational map tracing the allocation of SMMEs to authorized development entities across the 7-Pillar Capability Framework.
              </p>
            </div>
            
            {/* Search filter inside Tree */}
            <div className="relative font-sans">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-3.5 w-3.5 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Search Pillars, Providers or SMMEs..."
                value={treeSearch}
                onChange={(e) => setTreeSearch(e.target.value)}
                className="pl-9 pr-4 py-2 w-full sm:w-64 bg-slate-50 border border-slate-200 rounded-full text-xs font-mono focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all"
              />
              {treeSearch && (
                <button 
                  onClick={() => setTreeSearch("")} 
                  className="absolute right-3 top-2.5 text-[9px] text-slate-400 hover:text-slate-900 font-mono"
                >
                  {showAnnotations ? "[CLEAR]" : "Clear"}
                </button>
              )}
            </div>
          </div>

          {/* Allocation Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/60 shadow-2xs">
              <span className="text-slate-400 block text-[9px] uppercase font-bold">{showAnnotations ? "[ACTIVE_ALLOCATIONS]" : "Active Allocations"}</span>
              <span className="text-lg font-bold text-slate-900">
                {applications.reduce((acc, curr) => acc + (curr.selectedServices?.length || 0), 0)}
              </span>
            </div>
            <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/60 shadow-2xs">
              <span className="text-slate-400 block text-[9px] uppercase font-bold">{showAnnotations ? "[SUPPORTED_SMMES]" : "Supported SMMEs"}</span>
              <span className="text-lg font-bold text-slate-900">
                {applications.filter(a => (a.selectedServices?.length || 0) > 0).length}
              </span>
            </div>
            <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/60 shadow-2xs">
              <span className="text-slate-400 block text-[9px] uppercase font-bold">{showAnnotations ? "[ACTIVE_AGENCIES]" : "Active Agencies"}</span>
              <span className="text-lg font-bold text-slate-900">
                {providers.filter(p => p.status === "Active").length}
              </span>
            </div>
            <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/60 shadow-2xs">
              <span className="text-slate-400 block text-[9px] uppercase font-bold">{showAnnotations ? "[ALLOCATION_STABILITY]" : "Allocation Stability"}</span>
              <span className="text-lg font-bold text-emerald-600">100% SECURE</span>
            </div>
          </div>

          {/* Tree Diagram Container */}
          <div className="border border-slate-200/80 rounded-2xl bg-slate-50/40 p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[650px] space-y-6">
              
              {/* Root Node */}
              <div className="flex items-center gap-4 font-mono">
                <div className="bg-slate-900 text-white border border-slate-900 px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-2 flex-shrink-0">
                  <Building className="w-4.5 h-4.5 text-amber-400" />
                  <div>
                    {showAnnotations && (
                      <span className="text-[10px] block text-amber-400 font-bold tracking-widest">[NATIONAL_HUB]</span>
                    )}
                    <span className="text-xs font-extrabold uppercase">SERVICE PROVIDER AUTHENTICATION PIPELINE</span>
                  </div>
                </div>
                <div className="h-[2px] bg-slate-300 w-8" />
                <span className="text-[9px] text-slate-500 uppercase font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  Root Coordinator Node
                </span>
              </div>

              {/* Vertical link line container */}
              <div className="relative pl-6 space-y-4 border-l-2 border-dashed border-slate-300 ml-9 pt-2">
                
                {[
                  { specialty: "Business Advisory", title: "Pillar 1: Strategy, Compliance & Governance", color: "border-emerald-500 bg-emerald-50/50 text-emerald-800" },
                  { specialty: "Business Planning", title: "Pillar 2: Investment Readiness & Planning", color: "border-blue-500 bg-blue-50/50 text-blue-800" },
                  { specialty: "Technical Assistance", title: "Pillar 3: Product & Quality Assurance", color: "border-amber-500 bg-amber-50/50 text-amber-800" },
                  { specialty: "Skills Development", title: "Pillar 4: Team Capacity & Training", color: "border-purple-500 bg-purple-50/50 text-purple-800" },
                  { specialty: "Mentorship & Incubation", title: "Pillars 5 & 6: Leadership & Incubation", color: "border-indigo-500 bg-indigo-50/50 text-indigo-800" },
                  { specialty: "Digital Enablement", title: "Pillar 7: Technological Infrastructure", color: "border-rose-500 bg-rose-50/50 text-rose-800" },
                ].map((pillar) => {
                  const specialty = pillar.specialty;
                  const specialtyProviders = providers.filter(p => p.specialty === specialty);
                  
                  const matchesPillarSearch = !treeSearch || 
                    pillar.title.toLowerCase().includes(treeSearch.toLowerCase()) || 
                    specialty.toLowerCase().includes(treeSearch.toLowerCase());
                  
                  // Get active SMME allocations for this specialty
                  const activeAllocationsForSpecialty = applications.filter(app => {
                    const requestsSpecialty = app.selectedServices?.includes(specialty);
                    if (!requestsSpecialty) return false;
                    return true;
                  });

                  // Check if any provider or SMME child matches the search query
                  const matchingProvidersAndSMMEs = specialtyProviders.map(provider => {
                    const allocatedSMMEs = activeAllocationsForSpecialty.filter(app => {
                      const assignedId = app.assignedProviders?.[specialty];
                      if (assignedId) return assignedId === provider.id;
                      const defProvider = providers.find(p => p.specialty === specialty);
                      return defProvider?.id === provider.id;
                    });
                    
                    const matchingSMMEs = allocatedSMMEs.filter(app => 
                      !treeSearch || 
                      app.companyName?.toLowerCase().includes(treeSearch.toLowerCase()) || 
                      app.ownerName?.toLowerCase().includes(treeSearch.toLowerCase()) || 
                      app.id?.toLowerCase().includes(treeSearch.toLowerCase())
                    );
                    
                    const matchesProvSearch = !treeSearch || provider.name?.toLowerCase().includes(treeSearch.toLowerCase());
                    
                    return {
                      provider,
                      allocatedSMMEs,
                      matchingSMMEs,
                      hasMatch: matchesProvSearch || matchingSMMEs.length > 0
                    };
                  });

                  const hasVisibleChildren = matchingProvidersAndSMMEs.some(m => m.hasMatch);
                  const isVisible = matchesPillarSearch || hasVisibleChildren;
                  
                  if (!isVisible) return null;

                  const isPillarCollapsed = collapsedNodes[specialty];

                  return (
                    <div key={specialty} className="relative space-y-2">
                      {/* Horizontal connector link to Pillar */}
                      <div className="absolute -left-6 top-5 w-6 h-[2px] bg-slate-300" />
                      
                      {/* Pillar Node */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleNode(specialty)}
                          className="w-5 h-5 border border-slate-300 bg-white rounded-full flex items-center justify-center font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0 shadow-2xs"
                          title={isPillarCollapsed ? "Expand Branch" : "Collapse Branch"}
                        >
                          {isPillarCollapsed ? "+" : "−"}
                        </button>
                        
                        <div className={`border border-slate-300 rounded-2xl px-3.5 py-2 text-xs font-mono flex items-center gap-2 shadow-2xs ${pillar.color}`}>
                          <Database className="w-3.5 h-3.5" />
                          <div>
                            <span className="font-extrabold uppercase">{pillar.title}</span>
                            <span className="text-[9px] block text-slate-500 font-sans lowercase mt-0.5">
                              {activeAllocationsForSpecialty.length} active engagements assigned
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Level 2: Providers branch (rendered if not collapsed) */}
                      {!isPillarCollapsed && (
                        <div className="relative pl-8 space-y-3 border-l border-dashed border-slate-300 ml-2.5 py-1">
                          
                          {matchingProvidersAndSMMEs.map(({ provider, allocatedSMMEs, matchingSMMEs, hasMatch }) => {
                            if (treeSearch && !hasMatch && !matchesPillarSearch) return null;
                            
                            const providerNodeId = `${specialty}_${provider.id}`;
                            const isProviderCollapsed = collapsedNodes[providerNodeId];

                            return (
                              <div key={provider.id} className="relative space-y-2">
                                {/* Horizontal connector to Provider */}
                                <div className="absolute -left-8 top-5 w-8 h-[1px] bg-slate-300" />
                                
                                {/* Provider Node */}
                                <div className="flex items-center gap-3 font-mono">
                                  <button
                                    onClick={() => toggleNode(providerNodeId)}
                                    className="w-4 h-4 border border-slate-300 bg-white rounded-full flex items-center justify-center text-[10px] font-bold hover:bg-slate-50 transition-colors cursor-pointer flex-shrink-0 shadow-2xs"
                                    title={isProviderCollapsed ? "Expand allocations" : "Collapse allocations"}
                                  >
                                    {isProviderCollapsed ? "+" : "−"}
                                  </button>

                                  <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 text-xs flex items-center justify-between gap-4 min-w-[280px] shadow-2xs hover:border-slate-400 transition-all group">
                                    <div className="flex items-center gap-2.5">
                                      <div className={`w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold`}>
                                        {provider.logo}
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-slate-900">{provider.name}</h4>
                                        <p className="text-[9px] text-slate-500 font-sans flex items-center gap-1 mt-0.5">
                                          <span>★ {provider.rating}</span>
                                          <span>•</span>
                                          <span>{allocatedSMMEs.length} active matching allocations</span>
                                        </p>
                                      </div>
                                    </div>
                                    <span className="text-[8px] bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full uppercase font-bold tracking-tight">
                                      {provider.id}
                                    </span>
                                  </div>
                                </div>

                                {/* Level 3: Allocated SMMEs (rendered if provider not collapsed) */}
                                {!isProviderCollapsed && (
                                  <div className="relative pl-10 space-y-2 border-l border-dashed border-slate-200 ml-2 py-1">
                                    
                                    {allocatedSMMEs.map((app) => {
                                      const isAppMatch = !treeSearch || 
                                        app.companyName?.toLowerCase().includes(treeSearch.toLowerCase()) || 
                                        app.ownerName?.toLowerCase().includes(treeSearch.toLowerCase()) || 
                                        app.id?.toLowerCase().includes(treeSearch.toLowerCase());
                                        
                                      const matchesProvSearch = !treeSearch || provider.name?.toLowerCase().includes(treeSearch.toLowerCase());
                                      
                                      if (treeSearch && !isAppMatch && !matchesPillarSearch && !matchesProvSearch) return null;

                                      return (
                                        <div key={app.id} className="relative flex items-center gap-2 text-xs font-sans">
                                          {/* Horizontal connector to SMME */}
                                          <div className="absolute -left-10 top-4.5 w-10 h-[1px] bg-slate-200" />
                                          
                                          {/* SMME Info card inside Tree */}
                                          <div className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 p-3 rounded-2xl min-w-[340px] flex items-center justify-between gap-3 shadow-2xs transition-all">
                                            <div className="space-y-1">
                                              <div className="flex items-center gap-2">
                                                <span className="font-mono text-[9px] font-bold text-slate-500">[{app.id}]</span>
                                                <button
                                                  onClick={() => {
                                                    setSelectedApp(app);
                                                    setDashboardTab("users");
                                                  }}
                                                  className="font-bold text-slate-900 hover:underline hover:text-indigo-600 text-left cursor-pointer font-sans"
                                                >
                                                  {app.companyName}
                                                </button>
                                              </div>
                                              <p className="text-[10px] text-slate-500 flex items-center gap-1.5 font-sans">
                                                <span>Owner: {app.ownerName}</span>
                                                <span>•</span>
                                                <span className={`px-2 py-0.5 rounded-full border text-[8px] font-mono font-bold ${getStatusBadgeClass(app.status)}`}>
                                                  {app.status}
                                                </span>
                                              </p>
                                            </div>

                                            {/* Interactive Provider Allocation Control */}
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                              <span className="text-[8px] text-slate-400 font-mono uppercase">Reallocate:</span>
                                              <select
                                                value={provider.id}
                                                onChange={(e) => assignProviderForSpecialty(app.id, specialty, e.target.value)}
                                                className="bg-white border border-slate-200 text-[10px] font-mono px-2 py-1 rounded-xl focus:outline-hidden focus:border-slate-900 cursor-pointer text-slate-700"
                                              >
                                                {providers.filter(p => p.specialty === specialty).map(p => (
                                                  <option key={p.id} value={p.id}>{p.name}</option>
                                                ))}
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}

                                    {allocatedSMMEs.length === 0 && (
                                      <div className="relative text-left py-1 text-slate-400 italic text-[10px] font-sans pl-2">
                                        <div className="absolute -left-10 top-3 w-10 h-[1px] bg-slate-200" />
                                        No active SMMEs allocated to this agency
                                      </div>
                                    )}

                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-200/80 text-indigo-950 rounded-2xl text-xs leading-relaxed space-y-1.5 font-sans">
            <h5 className="font-bold font-mono uppercase text-[10px] text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-700" />
              ADMIN_TREE_DIAGNOSTICS: ALIGNING SKILLS WITH GAPS
            </h5>
            <p>
              The Service Provider Allocation Tree dynamically matches active SMMEs to vetted agencies in real-time. 
              As businesses update their operational gaps and self-assessments, administrators can dynamically shift workloads to balance the national advisory pipeline, prevent program bottlenecks, and track developmental milestones.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

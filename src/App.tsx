/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  IconArrowRight as ArrowRight, 
  IconCheckCircle as CheckCircle2, 
  IconAward as Award, 
  IconFileText as ClipboardSignature, 
  IconArrowUpRight as ArrowUpRight, 
  IconCheck as Check, 
  IconSparkles as Sparkles, 
  IconHelpCircle as HelpCircle,
  IconIntakeDossier as IntakeDossier,
  IconShieldCheck as ShieldCheck
} from "./components/icons/CustomIcons";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SupportCard from "./components/SupportCard";
import StepFlow from "./components/StepFlow";
import FAQSection from "./components/FAQSection";
import ApplicationForm from "./components/ApplicationForm";
import EligibilityModal from "./components/EligibilityModal";
import BlueprintController from "./components/BlueprintController";
import AccessToMarkets from "./components/AccessToMarkets";
import ProviderPortal from "./components/ProviderPortal";
import AdminDashboard from "./components/AdminDashboard";
import SystemProcessFlow from "./components/SystemProcessFlow";
import { SUPPORT_SERVICES, BENEFITS, BEFORE_YOU_APPLY_REQUIREMENTS } from "./data";
import { motion, AnimatePresence } from "motion/react";
import { fmtText } from "./utils/format";

export default function App() {
  const [activeView, setActiveView] = useState<"capability" | "markets" | "provider" | "admin" | "flow" | "apply">("provider");
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [showRequirementsDetail, setShowRequirementsDetail] = useState(false);

  // Set the website browser name/title explicitly
  React.useEffect(() => {
    if (activeView === "apply") {
      document.title = "Application Intake Dossier - Service Provider Authentication";
    } else if (activeView === "markets") {
      document.title = "Access to Markets - Service Provider Authentication";
    } else if (activeView === "provider") {
      document.title = "Approved Provider Portal - Service Provider Authentication";
    } else if (activeView === "admin") {
      document.title = "Admin Dashboard - Service Provider Authentication";
    } else if (activeView === "flow") {
      document.title = "System Process Flow - Service Provider Authentication";
    } else {
      document.title = "Access to Capability - Service Provider Authentication";
    }
  }, [activeView]);

  // Custom interactive annotation state
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [activeSpec, setActiveSpec] = useState<any>(null);

  const handleToggleAnnotations = (val: boolean) => {
    setShowAnnotations(val);
    if (!val) {
      setActiveSpec(null);
    }
  };

  const scrollToApply = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveView("apply");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSpecBadge = (id: string, title: string, type: string, desc: string, flow: string, database: string) => {
    if (!showAnnotations) return null;
    const isActive = activeSpec?.id === id;
    return (
      <button
        onClick={() => {
          setActiveSpec({ id, title, type, desc, flow, database });
        }}
        className={`ml-2 inline-flex items-center gap-0.5 px-2 py-0.5 font-mono text-[9px] font-bold border transition-all cursor-pointer ${
          isActive
            ? "bg-amber-400 text-slate-900 border-slate-900 shadow-sm"
            : "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
        }`}
        title={`Click to view spec details for ${id}`}
      >
        <span>SPEC_{id}</span>
        <HelpCircle className="w-2.5 h-2.5" />
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col blueprint-grid antialiased" id="access-to-capability-app">
      {/* Premium Header with custom annotation click support */}
      <Header 
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        showAnnotations={showAnnotations}
        onShowAnnotation={(id, title, text) => {
          setActiveSpec({ id, title, type: "Navigation Module", desc: text, flow: "Desktop & Mobile responsive grid", database: "None." });
        }} 
      />

      {activeView === "admin" ? (
        <section className="flex-grow w-full bg-gradient-to-br from-[#e2f3ec] via-[#f7f1ec] to-[#e5e9f8]" id="admin-dashboard-section">
          <div className="w-full h-full flex flex-col flex-grow">
            <AdminDashboard onViewChange={setActiveView} showAnnotations={showAnnotations} />
          </div>
        </section>
      ) : activeView === "provider" ? (
        <section className="flex-grow w-full bg-gradient-to-br from-[#e2f3ec] via-[#f7f1ec] to-[#e5e9f8]" id="provider-portal-section">
          <div className="w-full h-full flex flex-col flex-grow">
            <ProviderPortal onViewChange={setActiveView} showAnnotations={showAnnotations} />
          </div>
        </section>
      ) : activeView === "flow" ? (
        <section className="py-8 sm:py-12 bg-gradient-to-br from-[#e2f3ec] via-[#f7f1ec] to-[#e5e9f8] flex-grow min-h-screen" id="system-process-flow-page">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <SystemProcessFlow showAnnotations={showAnnotations} />
          </div>
        </section>
      ) : activeView === "apply" ? (
        <section className="py-8 sm:py-12 bg-slate-50 flex-grow" id="application-dossier-page">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Breadcrumb Navigation (Hidden per design spec) */}
            <nav className="hidden text-[10px] sm:text-xs font-mono font-bold tracking-widest text-slate-500 uppercase" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveView("capability"); }} className="hover:text-slate-900 transition-colors">{fmtText("HOME_PORTAL", showAnnotations)}</a>
                </li>
                <li className="flex items-center">
                  <span className="mx-1 sm:mx-2 text-slate-300">/</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveView("capability"); }} className="hover:text-slate-900 transition-colors">{fmtText("DEVELOPMENTAL_PROGRAMS", showAnnotations)}</a>
                </li>
                <li className="flex items-center text-slate-900">
                  <span className="mx-1 sm:mx-2 text-slate-300">/</span>
                  <span className="underline font-extrabold">{fmtText("[APPLICATION_INTAKE_DOSSIER]", showAnnotations)}</span>
                </li>
              </ol>
            </nav>

            {/* Standalone Page Header Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4 text-left relative overflow-hidden border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                    <IntakeDossier className="w-6 h-6" />
                  </div>
                  <div>
                    {showAnnotations && (
                      <span className="text-[10px] font-sans font-bold text-amber-400 uppercase tracking-widest block mb-1">
                        SERVICE PROVIDER AUTHENTICATION INTAKE PORTAL
                      </span>
                    )}
                    <h1 className="font-sans font-black text-3xl sm:text-4xl tracking-tight text-white uppercase leading-none">
                      Application Intake Dossier
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>VERIFIED_INTAKE</span>
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300/70 font-sans font-normal leading-relaxed max-w-2xl">
                Complete the official registration and verification dossier below to enrol your SMME into the Service Provider Authentication developmental programs. All submissions undergo live CIPC and SARS compliance verification.
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest flex items-center gap-1">
                  {showAnnotations && <span>[FORM_VIEW_SEC_05]</span>}
                  {renderSpecBadge("FORM_VIEW_SEC_05", "Secure Support Application Form", "Ingress Form Component", "Provides real-time submission capability for SMMEs. Handles drag-and-drop file attachments and detailed motivation statements.", "Interactive state collection → Submits structured JSON package via POST router → Triggers SARS and CIPC automated API simulator.", "Inserts record to postgres table 'satf_applications' with default status 'AWAITING_REVIEW'.")}
                </span>
              </div>
              <ApplicationForm track="capability" showAnnotations={showAnnotations} />
            </div>
          </div>
        </section>
      ) : activeView === "capability" ? (
        <section id="capability-landing-view">
          {/* Hero Section */}
          <section id="hero-section" className="relative pt-10 pb-16 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Breadcrumb Row */}
              <nav className="flex mb-6 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-slate-500 uppercase" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                  <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">{fmtText("HOME_PORTAL", showAnnotations)}</a>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-1 sm:mx-2 text-slate-300">/</span>
                    <a href="#" className="hover:text-slate-900 transition-colors">{fmtText("BUSINESS_TRACK", showAnnotations)}</a>
                  </li>
                  <li className="flex items-center text-slate-900">
                    <span className="mx-1 sm:mx-2 text-slate-300">/</span>
                    <span className="underline font-extrabold">{fmtText("[ACCESS_TO_CAPABILITY]", showAnnotations)}</span>
                  </li>
                </ol>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                
                {/* Hero Left Content Column */}
                <div className="lg:col-span-7 space-y-6 sm:space-y-8" id="hero-left-content">
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] font-bold text-slate-400 flex items-center gap-1.5 tracking-widest">
                      {showAnnotations && <span>[W_1.01: HERO_LANDING_TITLE_BLOCK]</span>}
                      {renderSpecBadge("W_1.01", "Hero Title Funnel", "Landing Layout Module", "Immediate corporate identity branding that establishes user focus and context.", "Direct entry gate → Directs to Diagnostic Assessment Wizard or Application Form directly.", "None. Direct UI funnel.")}
                    </span>
                    <h1 className="font-mono font-extrabold text-4xl sm:text-5xl lg:text-[54px] tracking-tight text-slate-900 leading-[1.1]" id="hero-title">
                      Access to Capability
                    </h1>
                    <h2 className="font-mono font-extrabold text-sm sm:text-base text-slate-700 tracking-tight bg-slate-100/80 inline-block px-3 py-1 rounded-md" id="hero-subtitle">
                      /* Build the capability to grow your business */
                    </h2>
                    <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed max-w-xl" id="hero-description">
                      Access to Capability connects eligible businesses with non-financial support that strengthens your skills, systems and competitiveness. From expert advice and mentorship to technical support and digital enablement, we help you become investment-ready and sustainable.
                    </p>
                  </div>

                  {/* Action Buttons inspired by Design Reference */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                    <button
                      id="hero-apply-btn"
                      onClick={scrollToApply}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold tracking-wider px-8 py-3.5 rounded-full shadow-md cursor-pointer focus:outline-hidden transition-all active:scale-[0.98]"
                    >
                      {fmtText("[APPLY_FOR_SUPPORT]", showAnnotations)}
                    </button>
                    <button
                      id="hero-eligibility-btn"
                      onClick={() => setIsEligibilityOpen(true)}
                      className="bg-white/90 hover:bg-white text-slate-900 border border-slate-200/90 font-mono text-xs font-bold tracking-wider px-8 py-3.5 rounded-full shadow-2xs cursor-pointer focus:outline-hidden transition-all active:scale-[0.98]"
                    >
                      {fmtText("[DIAGNOSTIC_WIZARD]", showAnnotations)}
                    </button>
                    <button
                      id="hero-capability-track-btn"
                      onClick={() => {
                        const element = document.getElementById("what-is-section");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold tracking-wider px-8 py-3.5 rounded-full shadow-xs cursor-pointer focus:outline-hidden transition-all active:scale-[0.98]"
                    >
                      {fmtText("[ACCESS_TO_CAPABILITY]", showAnnotations)}
                    </button>
                  </div>
                </div>

                {/* Hero Right Visual Column inspired by Design Reference */}
                <div className="lg:col-span-5 relative" id="hero-right-visual">
                  <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                    <span className="font-mono text-[9px] font-bold text-slate-400 absolute -top-5 left-0 flex items-center gap-1">
                      {showAnnotations && <span>[W_1.02: MEDIA_PLACEHOLDER_FRAME]</span>}
                      {renderSpecBadge("W_1.02", "Media Asset Placeholder", "Media Block Layout", "Predefined placeholder element representing future high-resolution video/photography illustrating SMME economic growth.", "Static layout spacer framed by standard wire-cross vector diagonals.", "None. Media bucket file load.")}
                    </span>
                    
                    {/* Hero Image Frame transformed into stylized Wireframe Placeholder Box */}
                    <div className="relative aspect-square bg-white/92 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-[0_14px_40px_-10px_rgba(15,23,42,0.06)] flex flex-col justify-between p-7 wire-placeholder-cross overflow-hidden">
                      
                      {/* Wireframe Tag details */}
                      {showAnnotations && (
                        <div className="z-10 bg-slate-900 text-white font-mono text-[10px] py-1 px-3.5 self-start uppercase tracking-wider rounded-full shadow-2xs">
                          [MOCKUP_IMAGE_PLACEHOLDER: SMILING_SOUTH_AFRICAN_ENTREPRENEUR]
                        </div>
                      )}

                      <div className="z-10 space-y-2 max-w-xs self-start">
                        {showAnnotations && <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest bg-slate-100/90 inline-block px-2.5 py-0.5 rounded-full">DIMENSIONS: 800X800PX</p>}
                        <p className="text-xs text-slate-700 leading-relaxed bg-white/95 p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                          High-fidelity imagery representing inclusive economic growth and capability development will appear in this frame during production.
                        </p>
                      </div>

                      {/* Glassmorphic Badge rewritten into clean status stamp */}
                      <div className="z-10 bg-slate-900 text-white border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3.5 shadow-lg">
                        <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold flex-shrink-0">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          {showAnnotations && <p className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">[CAPABILITY_IMPACT]</p>}
                          <p className="text-xs font-mono font-bold text-white">100% Fully-Subsidized Support</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: What is Access to Capability? */}
          <section id="what-is-section" className="py-16 bg-white border-b border-slate-200/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
              {showAnnotations && <span className="font-mono text-[9px] font-bold text-slate-400 block tracking-widest">[W_1.03: SECTION_MODULE_SUMMARY]</span>}
              <h2 className="font-mono font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight" id="what-is-title">
                What is Access to Capability?
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed max-w-3xl mx-auto" id="what-is-body">
                Access to Capability provides non-financial business development support that helps you strengthen your business, build new skills and improve performance. We connect you with the right programmes, experts and partners to help your business grow and thrive.
              </p>
            </div>
          </section>

          {/* Section: What support can you receive? */}
          <section id="support-services-section" className="py-20 sm:py-24 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
              
              {/* Section Header */}
              <div className="text-center space-y-2">
                <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest flex items-center justify-center gap-1">
                  {showAnnotations && <span>[W_1.04: SECTION_MODULE_GRID]</span>}
                  {renderSpecBadge("W_1.04", "Non-Financial Support Grid", "Interactive Categories Grid", "Presents the six key pillars of capability development support (Advisory, Planning, Technical, Skills, Incubation, Digital).", "Users browse categories. Clicking any item triggers highlight. Corresponds directly to options inside the Ingress Application Form.", "Reflected as boolean category flags inside satf_applications.requested_categories array.")}
                </span>
                <h2 className="font-mono font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight" id="support-section-title">
                  What support can you receive?
                </h2>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="support-cards-grid">
                {SUPPORT_SERVICES.map((service, index) => (
                  <SupportCard key={service.title} service={service} index={index} showAnnotations={showAnnotations} />
                ))}
              </div>

            </div>
          </section>

          {/* Section: How it works */}
          <section id="how-it-works-section" className="py-20 bg-slate-100/50 border-b border-slate-200/80 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              {/* Section Header */}
              <div className="text-center space-y-2">
                <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest flex items-center justify-center gap-1">
                  {showAnnotations && <span>[W_1.05: PROCESS_DIAGRAM_FLOW]</span>}
                  {renderSpecBadge("W_1.05", "Process Diagram Flow", "Interactive Process Line", "Chronological flowchart mapping the business journey from intake assessment to finalized advisory program.", "Aesthetic step indicators with standard progress connector bars.", "Reflected inside application progress tracking column: AWAITING_REVIEW → UNDER_AUDIT → PROGRAM_LAUNCHED.")}
                </span>
                <h2 className="font-mono font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight" id="how-it-works-title">
                  How it works
                </h2>
              </div>

              {/* Step Flow Component */}
              <StepFlow />

            </div>
          </section>

          {/* Section: Why apply? */}
          <section id="why-apply-section" className="py-20 sm:py-24 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
              
              {/* Section Header */}
              <div className="text-center space-y-2">
                <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest flex items-center justify-center gap-1">
                  {showAnnotations && <span>[W_1.06: BENEFITS_BENTO_GRID]</span>}
                  {renderSpecBadge("W_1.06", "Benefits Grid Layout", "Grid Presentation Module", "Presents structural value props designed to incentivize compliant business participation.", "Hover transitions highlight value proposition cards.", "None. Pure messaging layout.")}
                </span>
                <h2 className="font-mono font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight" id="why-apply-title">
                  Why apply?
                </h2>
              </div>

              {/* Benefits Bento Grid styled with Design Reference rounded cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="benefits-grid">
                {BENEFITS.map((benefit, idx) => (
                  <div
                    key={benefit.title}
                    id={`benefit-item-${idx}`}
                    className="bg-white/92 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 flex items-start gap-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_18px_40px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold shadow-2xs">
                      <span>{idx + 1}</span>
                    </div>
                    <div>
                      {showAnnotations && <span className="font-mono text-[8px] font-bold text-slate-400 block uppercase mb-0.5">[BENEFIT_POINT_{idx + 1}]</span>}
                      <h4 className="font-mono font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                        {benefit.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* Double Column Grid: Before You Apply & FAQ */}
          <section id="requirements-faq-section" className="py-16 sm:py-20 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Column 1: Before you apply */}
                <div className="lg:col-span-5 bg-white/92 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_14px_40px_-10px_rgba(15,23,42,0.05)]" id="before-you-apply-card">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      {showAnnotations && <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest block">[W_1.07: COMPLIANCE_CHECKLIST]</span>}
                      <h3 className="font-mono font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight" id="requirements-title">
                        Before you apply
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {showAnnotations && (
                        <p className="font-mono font-bold text-xs text-slate-900 uppercase tracking-wider bg-amber-100/80 text-amber-900 inline-block px-3 py-1 rounded-full" id="requirements-subtext">
                          [!] ENVELOPE_REQUIREMENTS:
                        </p>
                      )}
                      
                      {/* Checklist */}
                      <ul className="space-y-3" id="requirements-list">
                        {BEFORE_YOU_APPLY_REQUIREMENTS.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs text-slate-700 font-sans">
                            {showAnnotations && <span className="font-mono font-bold text-slate-900 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px] flex-shrink-0">[{idx + 1}]</span>}
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* View Full Requirements Action */}
                  <div className="pt-8 border-t border-slate-100 mt-6 flex flex-col gap-4">
                    <button
                      id="view-requirements-btn"
                      onClick={() => setShowRequirementsDetail(!showRequirementsDetail)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-mono text-xs font-bold tracking-wider py-3 px-6 rounded-full transition-all duration-150 text-center cursor-pointer focus:outline-hidden"
                    >
                      {showRequirementsDetail ? fmtText("[HIDE_REQUIREMENTS_EXPANSION]", showAnnotations) : fmtText("[VIEW_COMPLIANCE_GUIDELINES]", showAnnotations)}
                    </button>

                    <AnimatePresence>
                      {showRequirementsDetail && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-3"
                          id="requirements-detail-panel"
                        >
                          <h4 className="font-mono font-bold text-xs text-slate-900 flex items-center gap-1.5">
                            <ClipboardSignature className="w-4 h-4 text-slate-900" />
                            Submission Guidelines
                          </h4>
                          <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                            Please ensure all documents are clear, legible, and saved in PDF or high-resolution image format. All copies should ideally be certified within the last 3 months to accelerate the verification process.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Column 2: Frequently Asked Questions */}
                <div className="lg:col-span-7">
                  <FAQSection showAnnotations={showAnnotations} />
                </div>

              </div>
            </div>
          </section>

          {/* CTA Section (Ready to strengthen your business?) */}
          <section id="cta-action-banner" className="bg-slate-900 text-white py-14 sm:py-16 relative overflow-hidden border border-slate-800 my-8 max-w-7xl mx-auto rounded-3xl shadow-2xl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
                
                {/* CTA Left Info */}
                <div className="flex items-start gap-4 md:gap-5 max-w-2xl">
                  <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 items-center justify-center text-white">
                    <ClipboardSignature className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    {showAnnotations && <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest block">[W_1.08: TRIGGER_FLOW_SEC]</span>}
                    <h3 className="font-mono font-extrabold text-xl sm:text-2xl tracking-tight text-white" id="cta-heading">
                      Ready to strengthen your business?
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-300 font-sans leading-relaxed" id="cta-subheading">
                      Apply for Access to Capability and connect with the right support to help your business grow and succeed.
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex-shrink-0 w-full md:w-auto">
                  <button
                    id="cta-apply-btn"
                    onClick={scrollToApply}
                    className="w-full md:w-auto bg-blue-600 text-white hover:bg-blue-700 font-mono text-xs font-bold tracking-widest px-8 py-4 rounded-full shadow-lg transition-transform active:scale-[0.98] cursor-pointer text-center block"
                  >
                    {fmtText("[APPLICATION_INTAKE_DOSSIER]", showAnnotations)}
                  </button>
                </div>

              </div>
            </div>
          </section>
        </section>
      ) : (
        <AccessToMarkets renderSpecBadge={renderSpecBadge} scrollToApply={scrollToApply} showAnnotations={showAnnotations} />
      )}

      {/* Interactive Eligibility assessment modal */}
      <EligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onOpenApply={() => {
          scrollToApply();
        }}
      />

      {/* Premium Footer */}
      <Footer showAnnotations={showAnnotations} onViewChange={setActiveView} activeView={activeView} />

      {/* Interactive Client Demo Controller Panel */}
      <BlueprintController 
        showAnnotations={showAnnotations}
        onToggleAnnotations={handleToggleAnnotations}
        activeSpecId={activeSpec?.id || null}
        onSelectSpec={(spec) => setActiveSpec(spec)}
      />
    </div>
  );
}


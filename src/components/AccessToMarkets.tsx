/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  IconArrowRight as ArrowRight, 
  IconCheck as Check, 
  IconHelpCircle as HelpCircle, 
  IconBuilding2 as Building2, 
  IconUsers as Users, 
  IconLandmark as Landmark, 
  IconGlobe as Globe, 
  IconStore as Store, 
  IconNetwork as Network, 
  IconPlay as PlayCircle, 
  IconFileText as FileText, 
  IconShieldCheck as ShieldCheck, 
  IconTrendingUp as TrendingUp, 
  IconClipboardCheck as ClipboardCheck, 
  IconClipboardList as ClipboardList, 
  IconChevronDown as ChevronDown, 
  IconChevronUp as ChevronUp,
  IconArrowUpRight as ArrowUpRight
} from "./icons/CustomIcons";
import { motion, AnimatePresence } from "motion/react";
import ApplicationForm from "./ApplicationForm";
import { fmtText } from "../utils/format";

interface AccessToMarketsProps {
  renderSpecBadge: (id: string, title: string, type: string, desc: string, flow: string, database: string) => React.ReactNode;
  scrollToApply: (e?: React.MouseEvent) => void;
  showAnnotations?: boolean;
}

export default function AccessToMarkets({ renderSpecBadge, scrollToApply, showAnnotations = true }: AccessToMarketsProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [hoveredOpportunity, setHoveredOpportunity] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const pillars = [
    {
      id: "discover",
      icon: TrendingUp,
      title: "Discover Opportunities",
      desc: "Find procurement opportunities aligned to your business capabilities and sector profile."
    },
    {
      id: "connect",
      icon: Users,
      title: "Connect with Buyers",
      desc: "Be matched with corporate suppliers, government institutions and strategic market partners."
    },
    {
      id: "grow",
      icon: ArrowUpRight,
      title: "Grow Your Business",
      desc: "Secure high-value contracts, expand operations and create sustainable economic impact."
    }
  ];

  const opportunities = [
    {
      title: "Corporate Procurement",
      icon: Building2,
      bullets: [
        "Connect with enterprise procurement buyers",
        "Respond to corporate RFQs/RFPs directly",
        "Become an approved vendor in top systems"
      ],
      specCode: "M_1.11"
    },
    {
      title: "Supplier Development",
      icon: Users,
      bullets: [
        "Corporate incubation and enterprise programs",
        "Access enterprise development funding pools",
        "Secure off-take agreements to lock in revenue"
      ],
      specCode: "M_1.12"
    },
    {
      title: "Government Markets",
      icon: Landmark,
      bullets: [
        "Navigate and access public sector tenders",
        "Secure local municipal procurement linkages",
        "Plug into SOE supply chain networks"
      ],
      specCode: "M_1.13"
    },
    {
      title: "Export Channels",
      icon: Globe,
      bullets: [
        "Cross-border trade matchmaking engines",
        "Export readiness assessment and support",
        "Participation in international buyer missions"
      ],
      specCode: "M_1.14"
    },
    {
      title: "Retail & Distribution",
      icon: Store,
      bullets: [
        "Supermarket shelf placement training",
        "Wholesale distribution channel partnerships",
        "E-commerce marketplace integration pathways"
      ],
      specCode: "M_1.15"
    },
    {
      title: "Business Matchmaking",
      icon: Network,
      bullets: [
        "B2B strategic partnerships matching",
        "Joint venture and consortium opportunities",
        "Sub-contracting network assignments"
      ],
      specCode: "M_1.16"
    }
  ];

  const steps = [
    {
      number: 1,
      icon: ClipboardCheck,
      title: "Create Profile",
      description: "Tell us about your business, sectors & operational capabilities."
    },
    {
      number: 2,
      icon: ClipboardList,
      title: "Assessment",
      description: "Understand your compliance status and market readiness profile."
    },
    {
      number: 3,
      icon: FileText,
      title: "Showcase",
      description: "Upload verified product catalogs, dynamic specs & pricing sheets."
    },
    {
      number: 4,
      icon: Network,
      title: "Get Matched",
      description: "Smart algorithmic engine connects you to verified buyers."
    },
    {
      number: 5,
      icon: ShieldCheck,
      title: "Engage",
      description: "Respond to live opportunities and finalize commercial proposals."
    }
  ];

  const benefits = [
    { icon: TrendingUp, text: "Grow revenue streams" },
    { icon: Users, text: "Find strategic buyers" },
    { icon: Network, text: "Enter formal supply chains" },
    { icon: ShieldCheck, text: "Build business credibility" }
  ];

  const faqs = [
    {
      question: "Who can apply for Access to Markets?",
      answer: "South African enterprises seeking access to commercial opportunities, from established businesses to growing SMMEs with sufficient capacity to deliver."
    },
    {
      question: "What opportunities can businesses access?",
      answer: "Corporate procurement, government opportunities, supplier development programmes, exports and market linkages across multiple diverse sectors."
    },
    {
      question: "Do businesses need to be export ready?",
      answer: "No. Businesses can access local and regional market opportunities while utilizing the platform's resources to build their export readiness over time."
    },
    {
      question: "Is there a cost to register?",
      answer: "Registration on the Access to Markets platform is currently fully funded and free for eligible South African enterprises."
    }
  ];

  const requiredDocs = [
    "Enterprise Profile",
    "Product Catalogue",
    "Company Registration",
    "Pricing & Capacity Info",
    "Tax Compliance Status",
    "Certifications (if any)",
    "B-BBEE Certificate",
    "Ownership Declaration"
  ];

  return (
    <div className="space-y-0" id="access-to-markets-root">
      
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-slate-200/80 bg-slate-50/50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Row */}
          <nav className="flex mb-6 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-slate-500 uppercase" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
              <li>
                <a href="#" className="hover:text-slate-900 transition-colors">HOME_PORTAL</a>
              </li>
              <li className="flex items-center">
                <span className="mx-1 sm:mx-2 text-slate-300">/</span>
                <a href="#" className="hover:text-slate-900 transition-colors">BUSINESS_TRACK</a>
              </li>
              <li className="flex items-center text-slate-900">
                <span className="mx-1 sm:mx-2 text-slate-300">/</span>
                <span className="underline font-extrabold">{fmtText("[ACCESS_TO_MARKETS]", showAnnotations)}</span>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Hero Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8" id="markets-hero-left">
              <div className="space-y-4">
                <span className="font-mono text-[10px] font-bold text-slate-400 flex items-center gap-1.5 tracking-widest">
                  {showAnnotations && <span>[M_1.01: HERO_LANDING_MARKETS_BLOCK]</span>}
                  {renderSpecBadge("M_1.01", "Markets Landing Title", "Header Layout Module", "Direct portal gateway highlighting market integration and buyer matches.", "Direct action triggers smooth scroll navigation targeting the intake dossier form.", "None. Pure router navigation.")}
                </span>
                <h1 className="font-mono font-extrabold text-4xl sm:text-5xl lg:text-[54px] tracking-tight text-slate-900 leading-[1.1]" id="markets-hero-title">
                  Access to Markets
                </h1>
                <h2 className="font-mono font-extrabold text-sm sm:text-base text-slate-700 tracking-tight bg-slate-100/80 inline-block px-3 py-1 rounded-md" id="markets-hero-subtitle">
                  /* Connect your business to real commercial opportunities */
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed max-w-xl" id="markets-hero-description">
                  The Access to Markets platform helps businesses discover, connect, and compete for commercial opportunities across corporate procurement, government markets, export channels, and supplier development programmes.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4" id="markets-hero-actions">
                <button
                  onClick={() => scrollToApply()}
                  className="bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold tracking-wider px-8 py-3.5 rounded-xl shadow-sm active:scale-[0.98] transition-all cursor-pointer text-center"
                >
                  {fmtText("[APPLY_FOR_ACCESS]", showAnnotations)}
                </button>
                <a
                  href="#markets-how-it-works"
                  className="bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs font-bold tracking-wider px-8 py-3.5 rounded-xl border border-slate-300 shadow-2xs active:scale-[0.98] transition-all text-center"
                >
                  {fmtText("[LEARN_HOW_IT_WORKS]", showAnnotations)}
                </a>
              </div>
            </div>

            {/* Hero Right Visual Column - Wireframe Placeholder */}
            <div className="lg:col-span-5 relative" id="markets-hero-right">
              <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                <span className="font-mono text-[9px] font-bold text-slate-400 absolute -top-5 left-0 flex items-center gap-1">
                  {showAnnotations && <span>[M_1.02: MEDIA_PLACEHOLDER_FRAME]</span>}
                  {renderSpecBadge("M_1.02", "Markets Media Asset", "Media Block Layout", "Wireframe representation for commercial exchange illustrative graphic.", "Static CSS layout with custom wire-shadow properties.", "None.")}
                </span>

                <div className="relative aspect-square bg-white border border-slate-200/90 rounded-2xl shadow-[0_10px_35px_-8px_rgba(15,23,42,0.1)] flex flex-col justify-between p-6 wire-placeholder-cross overflow-hidden">
                  <div className="flex justify-between items-start z-10">
                    {showAnnotations && <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">[AXIS_X_SEC]</span>}
                    {showAnnotations && <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">[REF_2026]</span>}
                  </div>
                  
                  <div className="my-auto text-center space-y-3 relative z-10 bg-white/95 py-4 px-3 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-xs">
                      <PlayCircle className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-mono text-xs font-extrabold text-slate-900">MARKETS_EXCHANGE_INTRO.MP4</p>
                      <p className="font-mono text-[9px] text-slate-400">1080P • COGNITIVE INTRO WIRE • 1:44 MIN</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end z-10">
                    {showAnnotations && <span className="font-mono text-[9px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">[GRID_SCALE_5.0]</span>}
                    {showAnnotations && <span className="font-mono text-[9px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">[TRANS_FUND_2026]</span>}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-white border-b border-slate-200/80" id="markets-definition">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full mb-16 space-y-4">
            {showAnnotations && <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest block">[M_1.03: PROGRAM_PURPOSE]</span>}
            <h2 className="font-mono font-extrabold text-2xl sm:text-3xl text-slate-900 uppercase">
              What is Access to Markets?
            </h2>
            <div className="w-12 h-0.5 bg-slate-900 mx-auto" />
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-2 max-w-4xl mx-auto">
              Access to Markets enables enterprises to move beyond readiness and into active opportunity. The platform connects verified businesses with buyers looking for capable, compliant suppliers, helping enterprises access procurement opportunities, grow revenues and participate in local and international markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="text-center space-y-4 p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-slate-300 transition-all duration-200">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-mono font-bold text-sm text-slate-900">{p.title}</h3>
                    <p className="text-[11px] text-slate-500 font-sans leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Market Opportunities Available */}
      <section className="py-20 bg-slate-100/50 border-b border-slate-200/80" id="markets-opportunities">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-2">
            <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest flex items-center justify-center gap-1">
              {showAnnotations && <span>[M_1.04: OPPORTUNITIES_GRID]</span>}
              {renderSpecBadge("M_1.04", "Opportunities Grid", "Structural Block Layout", "Grid displaying six core vectors of corporate and governmental market access.", "Interactive card hover highlights pathways mapped directly to corporate and SME targets.", "Provides category filtering inside procurement db.")}
            </span>
            <h2 className="font-mono font-extrabold text-2xl sm:text-3xl text-slate-900 uppercase">
              What opportunities can you access?
            </h2>
            <div className="w-12 h-0.5 bg-slate-900 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredOpportunity === idx;
              return (
                <motion.div
                  key={idx}
                  onMouseEnter={() => setHoveredOpportunity(idx)}
                  onMouseLeave={() => setHoveredOpportunity(null)}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 relative overflow-hidden group"
                >
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div>
                        {showAnnotations && (
                          <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">
                            [PATHWAY_{idx + 1}]
                          </span>
                        )}
                        <h4 className="font-mono font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors duration-100 tracking-tight leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <ul className="space-y-2.5 font-sans">
                      {item.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                          <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center border border-slate-200">
                            <Check className="w-2.5 h-2.5 stroke-[3] text-slate-900" />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => scrollToApply()}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors duration-100 cursor-pointer"
                    >
                      <span>{fmtText("[APPLY_FOR_THIS]", showAnnotations)}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
                    </button>
                    {showAnnotations && (
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">[{item.specCode}]</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* How it works (Process Flow Diagram) */}
      <section className="py-20 bg-white border-b border-slate-200/80" id="markets-how-it-works">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-2">
            <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest flex items-center justify-center gap-1">
              {showAnnotations && <span>[M_1.05: PROCESS_FLOW_DIAGRAM]</span>}
              {renderSpecBadge("M_1.05", "Process Flow Diagram", "Interactive Process Line", "Timeline tracking user progression through onboarding, profile indexing, and buyer matching.", "Responsive dynamic layout with custom connector guides.", "Mapped inside the client applications state transition logs.")}
            </span>
            <h2 className="font-mono font-extrabold text-2xl sm:text-3xl text-slate-900 uppercase">
              How it works
            </h2>
            <div className="w-12 h-0.5 bg-slate-900 mx-auto" />
          </div>

          {/* Timeline Process Row */}
          <div className="w-full relative px-2">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 relative">
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isHovered = hoveredStep === step.number;
                return (
                  <motion.div
                    key={step.number}
                    onMouseEnter={() => setHoveredStep(step.number)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="flex flex-col items-center text-center relative group bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Connector line for desktop */}
                    {idx < steps.length - 1 && (
                      <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-[2px] bg-slate-200 -z-10" />
                    )}

                    {/* Icon Container */}
                    <div 
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative ${
                        isHovered 
                          ? "bg-slate-900 text-white shadow-md scale-105" 
                          : "bg-slate-100 text-slate-900 border border-slate-200"
                      }`}
                    >
                      {/* Step Indicator Tag */}
                      <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border flex items-center justify-center font-mono font-bold text-[10px] transition-all duration-200 ${
                        isHovered
                          ? "bg-amber-400 text-slate-950 border-slate-900 shadow-xs"
                          : "bg-slate-900 text-white border-slate-800"
                      }`}>
                        {step.number}
                      </div>
                      
                      <StepIcon className="w-6 h-6 stroke-[2]" />
                    </div>

                    {/* Step Title & Description */}
                    <div className="mt-5 space-y-1.5 max-w-[180px]">
                      <h4 className="font-mono font-bold text-xs text-slate-900 leading-snug">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Why apply? Minimalist grid */}
      <section className="py-16 bg-white border-b border-slate-200/80" id="markets-why-apply">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            {showAnnotations && <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest block">[M_1.06: BENEFITS_ACCENTS]</span>}
            <h2 className="font-mono font-extrabold text-2xl text-slate-900 uppercase">
              Why apply?
            </h2>
            <div className="w-12 h-0.5 bg-slate-900 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center w-full">
            {benefits.map((b, idx) => {
              const BenefitIcon = b.icon;
              return (
                <div key={idx} className="flex flex-col items-center space-y-4 p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-sm transition-all duration-200">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-2xs">
                    <BenefitIcon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="font-mono font-extrabold text-xs text-slate-800 tracking-tight leading-tight">
                    {b.text}
                  </h3>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Video & Eligibility Checklist */}
      <section className="py-20 bg-slate-100/50 border-b border-slate-200/80" id="markets-eligibility">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Video Placeholder */}
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest flex items-center gap-1">
                {showAnnotations && <span>[M_1.07: MEDIA_STANDARDS_WIRE]</span>}
                {renderSpecBadge("M_1.07", "Video Standard Player", "Media Container Component", "Presents an instructional wire-framed media controller detailing market application guidelines.", "Standardized click triggers media stream layer overlay.", "None.")}
              </span>
              <div className="relative aspect-video bg-white border border-slate-200/90 rounded-2xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] flex flex-col justify-between p-5 wire-placeholder-cross overflow-hidden">
                <div className="flex justify-between z-10">
                  {showAnnotations && <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">[MEDIA_PLAYER_STANDBY]</span>}
                </div>
                <div className="my-auto mx-auto text-center space-y-2 relative z-10 bg-white/95 p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <PlayCircle className="w-12 h-12 text-slate-950 mx-auto stroke-[1.5] cursor-pointer hover:scale-105 transition-transform" />
                  <p className="font-mono text-xs font-bold text-slate-900 uppercase">Watch Market Readiness video</p>
                  <p className="font-mono text-[9px] text-slate-400">DURATION: 2:15 MIN • ENTR_PULSE_GEN</p>
                </div>
                <div className="flex justify-between z-10">
                  {showAnnotations && <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">[0:00 / 2:15]</span>}
                  {showAnnotations && <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">[MUTE_PLAY]</span>}
                </div>
              </div>
            </div>

            {/* Right: Before you apply */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-10 border border-slate-200/90 rounded-2xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)]">
              <div className="space-y-6">
                <div className="space-y-2">
                  {showAnnotations && <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest block">[M_1.08: ELIGIBILITY_STANDARDS]</span>}
                  <h3 className="font-mono font-extrabold text-xl sm:text-2xl text-slate-900 uppercase">
                    Before you apply
                  </h3>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Ensure your business meets the basic eligibility criteria and you have the following required documentation ready:
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h4 className="font-mono font-extrabold text-xs text-slate-900 uppercase tracking-wider mb-4 bg-amber-100/80 text-amber-900 inline-block px-2.5 py-1 rounded-md">
                    Required Documentation
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                    {requiredDocs.map((doc, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center border border-slate-200">
                          <Check className="w-2.5 h-2.5 stroke-[3] text-slate-900" />
                        </span>
                        <span className="font-sans leading-tight">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => scrollToApply()}
                    className="inline-block border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-150 cursor-pointer"
                  >
                    {fmtText("[VIEW_FULL_REQUIREMENTS]", showAnnotations)}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-white border-b border-slate-200/80" id="markets-faq">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            <span className="font-mono text-[9px] font-bold text-slate-400 tracking-widest flex items-center justify-center gap-1">
              {showAnnotations && <span>[M_1.09: FAQ_ACCORDION]</span>}
              {renderSpecBadge("M_1.09", "FAQ Accordion", "Interactive Accordion List", "Expands to reveal key answers detailing participation requirements.", "Toggle active indexes dynamically updating list layout heights.", "None.")}
            </span>
            <h2 className="font-mono font-extrabold text-2xl text-slate-900 uppercase">
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-0.5 bg-slate-900 mx-auto" />
          </div>

          <div className="bg-white p-6 sm:p-8 border border-slate-200/90 rounded-2xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)]">
            <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full text-left py-2 font-mono font-bold text-xs sm:text-sm text-slate-900 flex justify-between items-center focus:outline-hidden cursor-pointer group"
                    >
                      <span className="group-hover:text-indigo-600 transition-colors">{faq.question}</span>
                      <span className="ml-4 flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-slate-600 font-sans leading-relaxed mt-2 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center pt-2">
              <a 
                href="#apply-section" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToApply();
                }}
                className="text-slate-900 hover:text-indigo-600 font-mono font-extrabold text-xs tracking-wider uppercase inline-flex items-center transition-colors"
              >
                {fmtText("[VIEW_ALL_FAQS_IN_KNOWLEDGE_BASE]", showAnnotations)} <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="bg-slate-950 text-white py-12 border-b border-slate-900 my-8 w-full rounded-3xl shadow-xl">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/10 items-center justify-center flex-shrink-0 text-white">
                <FileText className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h2 className="font-mono font-extrabold text-lg sm:text-xl text-white">Ready to expand your market access?</h2>
                <p className="text-slate-300 max-w-xl text-xs font-sans">
                  Apply for Access to Markets and connect with verified procurement buyers to help your business grow and succeed.
                </p>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-full lg:w-auto">
              <button
                onClick={() => scrollToApply()}
                className="w-full lg:w-auto text-center bg-white hover:bg-slate-100 text-slate-950 font-mono text-xs font-bold tracking-wider px-8 py-4 rounded-xl shadow-md transition-transform active:scale-[0.98] cursor-pointer"
              >
                {fmtText("[APPLY_FOR_ACCESS_TO_MARKETS]", showAnnotations)}
              </button>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}

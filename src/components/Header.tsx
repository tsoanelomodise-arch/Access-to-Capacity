/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  IconChevronDown as ChevronDown, 
  IconMenu as Menu, 
  IconX as X,
  IconLogOut,
  IconInsightsAnalytics
} from "./icons/CustomIcons";

interface HeaderProps {
  onShowAnnotation?: (id: string, title: string, text: string) => void;
  activeView?: "capability" | "markets" | "provider" | "admin" | "flow" | "apply";
  onViewChange?: (view: "capability" | "markets" | "provider" | "admin" | "flow" | "apply") => void;
  showAnnotations?: boolean;
}

export default function Header({ onShowAnnotation, activeView = "capability", onViewChange, showAnnotations = true }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [loggedInProvider, setLoggedInProvider] = useState<any | null>(() => {
    const stored = localStorage.getItem("satf_logged_in_provider");
    if (stored) {
      if (stored === "none" || stored === "null") return null;
      try { return JSON.parse(stored); } catch (e) {}
    }
    return {
      id: "p1",
      name: "Apex Advisory Group",
      specialty: "Business Advisory",
      email: "info@apexadvisory.co.za",
      pin: "2026",
      logo: "AA",
      color: "emerald"
    };
  });

  const [loggedInUser, setLoggedInUser] = useState<any | null>(() => {
    const stored = localStorage.getItem("satf_logged_in_user");
    if (stored) {
      if (stored === "none" || stored === "null") return null;
      try { return JSON.parse(stored); } catch (e) {}
    }
    return null;
  });

  useEffect(() => {
    const syncSessions = () => {
      const storedP = localStorage.getItem("satf_logged_in_provider");
      if (storedP) {
        if (storedP === "none" || storedP === "null") {
          setLoggedInProvider(null);
        } else {
          try { setLoggedInProvider(JSON.parse(storedP)); } catch (e) {}
        }
      }
      const storedU = localStorage.getItem("satf_logged_in_user");
      if (storedU) {
        if (storedU === "none" || storedU === "null") {
          setLoggedInUser(null);
        } else {
          try { setLoggedInUser(JSON.parse(storedU)); } catch (e) {}
        }
      }
    };

    const handleLogout = () => {
      setLoggedInProvider(null);
      setLoggedInUser(null);
    };

    window.addEventListener("satf-provider-changed", syncSessions);
    window.addEventListener("satf-session-changed", syncSessions);
    window.addEventListener("satf-logout", handleLogout);
    return () => {
      window.removeEventListener("satf-provider-changed", syncSessions);
      window.removeEventListener("satf-session-changed", syncSessions);
      window.removeEventListener("satf-logout", handleLogout);
    };
  }, []);

  const menuItems = [
    {
      name: "PROGRAMS PARTNERS & PORTALS",
      hasDropdown: true,
      items: ["Approved Provider Portal", "Application Intake Dossier", "Logout"]
    }
  ];

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 gap-6">
          
          {/* Top-Left Authenticated Session / View Banner Element */}
          {activeView === "admin" ? (
            <div className="bg-[#1B2337] text-white p-2.5 sm:p-3 rounded-2xl shadow-md border border-slate-800 flex items-center justify-between gap-3 sm:gap-5 text-left relative overflow-hidden backdrop-blur-2xl">
              <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 bg-white text-black rounded-xl flex items-center justify-center font-extrabold text-xs shadow-md border border-slate-200 shrink-0">
                  <IconInsightsAnalytics className="w-4.5 h-4.5 text-black" />
                </div>
                <div>
                  <span className="text-[9px] text-indigo-400 font-extrabold block uppercase tracking-wider leading-none mb-0.5">EXECUTIVE SESSION OK</span>
                  <h4 className="font-extrabold text-xs sm:text-sm text-white tracking-tight leading-tight uppercase">OPERATIONAL INSIGHTS</h4>
                  <span className="text-[10px] text-slate-300 block font-medium leading-none mt-0.5">Consolidated Real-Time Capability Monitoring</span>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-end text-right text-[10px] text-slate-300 space-y-0.5 relative z-10 font-medium shrink-0">
                <p>System Mode: <span className="text-white font-extrabold">Executive Audit</span></p>
                <p className="flex items-center justify-end gap-1 leading-none mt-0.5">
                  Pipeline Monitor:
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-extrabold rounded-full px-2 py-0.5 text-[9px] tracking-wide ml-1 uppercase">
                    ACTIVE AUDIT
                  </span>
                </p>
              </div>
            </div>
          ) : loggedInUser ? (
            <div className="bg-[#1B2337] text-white p-2.5 sm:p-3 rounded-2xl shadow-md border border-slate-800 flex items-center justify-between gap-3 sm:gap-5 text-left relative overflow-hidden backdrop-blur-2xl">
              <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center font-black text-xs shadow-md shadow-amber-500/25 border border-amber-300/40 shrink-0">
                  SMME
                </div>
                <div>
                  <span className="text-[9px] text-amber-400 font-extrabold block uppercase tracking-wider leading-none mb-0.5">USER SESSION OK</span>
                  <h4 className="font-extrabold text-xs sm:text-sm text-white tracking-tight leading-tight">{loggedInUser.companyName}</h4>
                  <span className="text-[10px] text-slate-300 block font-medium leading-none mt-0.5">Representative: <strong className="text-white">{loggedInUser.ownerName}</strong></span>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-end text-right text-[10px] text-slate-300 space-y-0.5 relative z-10 font-medium shrink-0">
                <p>CIPC Reg: <span className="text-white font-extrabold">{loggedInUser.regNumber}</span></p>
                <p className="flex items-center justify-end gap-1.5 leading-none mt-0.5">
                  Contact: <span className="text-white font-bold">{loggedInUser.phone}</span>
                  <span className="bg-white/10 text-white border border-white/20 font-extrabold rounded-full px-2 py-0.5 text-[9px] tracking-wide ml-1">
                    {loggedInUser.status || "Draft"}
                  </span>
                </p>
              </div>
            </div>
          ) : loggedInProvider ? (
            <div className="bg-[#1B2337] text-white p-2.5 sm:p-3 rounded-2xl shadow-md border border-slate-800 flex items-center justify-between gap-3 sm:gap-5 text-left relative overflow-hidden backdrop-blur-2xl">
              <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-extrabold text-xs shadow-md shadow-emerald-500/25 border border-emerald-400/30 shrink-0">
                  {loggedInProvider.logo}
                </div>
                <div>
                  <span className="text-[9px] text-emerald-400 font-extrabold block uppercase tracking-wider leading-none mb-0.5">AUTHENTICATED SESSION OK</span>
                  <h4 className="font-extrabold text-xs sm:text-sm text-white tracking-tight leading-tight">{loggedInProvider.name}</h4>
                  <span className="text-[10px] text-slate-300 block font-medium leading-none mt-0.5">Assigned Specialty: <strong className="text-white">{loggedInProvider.specialty}</strong></span>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-end text-right text-[10px] text-slate-300 space-y-0.5 relative z-10 font-medium shrink-0">
                <p>System Email: <a href={`mailto:${loggedInProvider.email}`} className="text-white underline underline-offset-2">{loggedInProvider.email}</a></p>
                <p className="flex items-center justify-end gap-1">Matched Category: <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wide inline-block">{loggedInProvider.specialty}</span></p>
              </div>
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {/* Header Navigation Area */}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 shrink-0 ml-auto" id="desktop-nav">
            {menuItems.map((item) => {
              const isPendingFlow = localStorage.getItem("satf_pending_admin_tab") === "flow";
              const isCategoryActive = 
                (item.name === "PROGRAMS PARTNERS & PORTALS" && (activeView === "provider" || activeView === "apply" || (activeView === "admin" && isPendingFlow))) ||
                (item.name === "OPERATIONAL INSIGHTS" && activeView === "admin" && !isPendingFlow);

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    id={`nav-item-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-sans font-black text-xs sm:text-sm tracking-tight transition-all duration-150 focus:outline-hidden uppercase ${
                      activeDropdown === item.name || isCategoryActive
                        ? "text-white bg-slate-950 font-black shadow-2xs"
                        : "text-slate-800 hover:text-slate-950 hover:bg-slate-100/90 font-extrabold"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                    )}
                  </button>

                  {/* Desktop Dropdown Popovers */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.12 }}
                        className="absolute right-0 mt-1.5 w-64 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl py-2 z-50 rounded-2xl overflow-hidden"
                        id={`dropdown-menu-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {item.items?.map((subItem) => {
                          const isCapability = subItem === "Access to Capability";
                          const isMarkets = subItem === "Access to Markets";
                          const isProvider = subItem === "Approved Provider Portal";
                          const isAdmin = subItem === "Performance Dashboard";
                          const isAllocation = subItem === "Provider Allocation Tree";
                          const isFlow = subItem === "System Process Flow";
                          const isApply = subItem === "Apply Now" || subItem === "Application Intake Dossier";
                          const isStories = subItem === "Success Stories";
                          const isLogout = subItem === "Logout";

                          if (isLogout) {
                            return (
                              <div key={subItem} className="pt-1.5 mt-1 border-t border-slate-200/80 px-1">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.dispatchEvent(new CustomEvent("satf-logout"));
                                    if (onViewChange) onViewChange("provider");
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full text-left px-3 py-2 text-xs font-sans font-black text-rose-600 hover:text-rose-800 hover:bg-rose-50/80 rounded-xl transition-colors duration-100 flex items-center justify-between group cursor-pointer uppercase tracking-tight"
                                >
                                  <span className="flex items-center gap-2">
                                    <IconLogOut className="w-3.5 h-3.5 text-slate-900 group-hover:text-black" />
                                    <span>LOGOUT SESSION</span>
                                  </span>
                                  <span className="text-[9px] font-bold text-rose-500 bg-rose-100/70 px-1.5 py-0.5 rounded-full uppercase">
                                    Exit
                                  </span>
                                </button>
                              </div>
                            );
                          }

                          const isSelectable = isCapability || isMarkets || isProvider || isAdmin || isAllocation || isFlow || isApply || isStories;

                          const isPendingAlloc = localStorage.getItem("satf_pending_admin_tab") === "allocation";
                          const isActive = (isCapability && activeView === "capability") || 
                                           (isMarkets && activeView === "markets") || 
                                           (isProvider && activeView === "provider") ||
                                           (isAdmin && activeView === "admin" && !isPendingAlloc) ||
                                           (isAllocation && activeView === "admin" && isPendingAlloc) ||
                                           (isFlow && activeView === "flow") ||
                                           (isApply && activeView === "apply");
                          return (
                            <a
                              key={subItem}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (isSelectable) {
                                  if (isFlow) {
                                    if (onViewChange) onViewChange("flow");
                                  } else if (isAllocation) {
                                    localStorage.setItem("satf_pending_admin_tab", "allocation");
                                    window.dispatchEvent(new CustomEvent("set-admin-tab", { detail: "allocation" }));
                                    if (onViewChange) onViewChange("admin");
                                  } else if (isAdmin) {
                                    localStorage.setItem("satf_pending_admin_tab", "overview");
                                    window.dispatchEvent(new CustomEvent("set-admin-tab", { detail: "overview" }));
                                    if (onViewChange) onViewChange("admin");
                                  } else if (isApply) {
                                    if (onViewChange) onViewChange("apply");
                                  } else if (isStories) {
                                    if (onViewChange) onViewChange("capability");
                                    setTimeout(() => {
                                      const el = document.getElementById("why-apply-section");
                                      if (el) el.scrollIntoView({ behavior: "smooth" });
                                    }, 300);
                                  } else if (onViewChange) {
                                    onViewChange(
                                      isCapability ? "capability" : 
                                      isMarkets ? "markets" : "provider"
                                    );
                                  }
                                  setActiveDropdown(null);
                                } else {
                                  alert(`💡 Note: "${subItem}" represents a prospective SATF program. For this interactive demo, please navigate to Access to Capability, Access to Markets, the Provider Portal, or the Performance Dashboard.`);
                                }
                              }}
                              className={`block px-4 py-2.5 text-xs font-sans font-extrabold tracking-tight text-slate-800 hover:text-slate-950 hover:bg-slate-100/80 transition-colors duration-100 ${
                                isActive ? "text-slate-950 font-black bg-emerald-50/90 border-l-4 border-emerald-600" : ""
                              }`}
                            >
                              {subItem}
                            </a>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>



          {/* Mobile hamburger menu toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-900 border-2 border-slate-900 hover:bg-slate-100 rounded-sm focus:outline-hidden ml-auto"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t-2 border-slate-900 overflow-hidden"
            id="mobile-menu-drawer"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 font-sans">
              {menuItems.map((item) => (
                <div key={item.name} className="border-b border-slate-200 pb-2 last:border-none">
                  <div
                    className="flex justify-between items-center py-2 text-xs font-black uppercase tracking-tight text-slate-900 cursor-pointer"
                    onClick={() => item.hasDropdown && setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""}`} />
                    )}
                  </div>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pl-4 space-y-1 mt-1 bg-slate-50 border border-slate-200 p-2"
                    >
                      {item.items?.map((subItem) => {
                        const isCapability = subItem === "Access to Capability";
                        const isMarkets = subItem === "Access to Markets";
                        const isProvider = subItem === "Approved Provider Portal";
                        const isAdmin = subItem === "Performance Dashboard";
                        const isAllocation = subItem === "Provider Allocation Tree";
                        const isFlow = subItem === "System Process Flow";
                        const isApply = subItem === "Apply Now" || subItem === "Application Intake Dossier";
                        const isStories = subItem === "Success Stories";
                        const isLogout = subItem === "Logout";

                        if (isLogout) {
                          return (
                            <div key={subItem} className="pt-2 mt-2 border-t border-slate-200">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.dispatchEvent(new CustomEvent("satf-logout"));
                                  if (onViewChange) onViewChange("provider");
                                  setIsOpen(false);
                                }}
                                className="w-full text-left py-2 px-2 text-xs font-mono font-bold text-rose-600 hover:bg-rose-50 rounded flex items-center gap-2 cursor-pointer"
                              >
                                <IconLogOut className="w-4 h-4 text-slate-900" />
                                <span>LOGOUT SESSION</span>
                              </button>
                            </div>
                          );
                        }

                        const isSelectable = isCapability || isMarkets || isProvider || isAdmin || isAllocation || isFlow || isApply || isStories;

                        const isPendingAlloc = localStorage.getItem("satf_pending_admin_tab") === "allocation";
                        const isActive = (isCapability && activeView === "capability") || 
                                         (isMarkets && activeView === "markets") || 
                                         (isProvider && activeView === "provider") ||
                                         (isAdmin && activeView === "admin" && !isPendingAlloc) ||
                                         (isAllocation && activeView === "admin" && isPendingAlloc) ||
                                         (isFlow && activeView === "flow") ||
                                         (isApply && activeView === "apply");
                        return (
                          <a
                            key={subItem}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (isSelectable) {
                                if (isFlow) {
                                  if (onViewChange) onViewChange("flow");
                                } else if (isAllocation) {
                                  localStorage.setItem("satf_pending_admin_tab", "allocation");
                                  window.dispatchEvent(new CustomEvent("set-admin-tab", { detail: "allocation" }));
                                  if (onViewChange) onViewChange("admin");
                                } else if (isAdmin) {
                                  localStorage.setItem("satf_pending_admin_tab", "overview");
                                  window.dispatchEvent(new CustomEvent("set-admin-tab", { detail: "overview" }));
                                  if (onViewChange) onViewChange("admin");
                                } else if (isApply) {
                                  if (onViewChange) onViewChange("apply");
                                } else if (isStories) {
                                  if (onViewChange) onViewChange("capability");
                                  setTimeout(() => {
                                    const el = document.getElementById("why-apply-section");
                                    if (el) el.scrollIntoView({ behavior: "smooth" });
                                  }, 300);
                                } else if (onViewChange) {
                                  onViewChange(
                                    isCapability ? "capability" : 
                                    isMarkets ? "markets" : "provider"
                                  );
                                }
                                setIsOpen(false);
                              } else {
                                alert(`💡 Note: "${subItem}" represents a prospective SATF program. For this interactive demo, please navigate to Access to Capability, Access to Markets, the Provider Portal, or the Performance Dashboard.`);
                              }
                            }}
                            className={`block py-1.5 text-xs ${
                              isActive 
                                ? "text-slate-900 font-extrabold underline decoration-2 underline-offset-4 bg-slate-100/50 px-2" 
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            {subItem}
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


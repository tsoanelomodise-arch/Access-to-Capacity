/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  IconArrowRight as ArrowRight, 
  IconCheckCircle as CheckCircle2,
  IconShieldCheck,
  IconLinkedin as Linkedin,
  IconYoutube as Youtube
} from "./icons/CustomIcons";
import { motion, AnimatePresence } from "motion/react";
import { fmtText } from "../utils/format";

interface FooterProps {
  showAnnotations?: boolean;
  activeView?: "capability" | "markets" | "provider" | "admin" | "flow" | "apply";
  onViewChange?: (view: "capability" | "markets" | "provider" | "admin" | "flow" | "apply") => void;
}

export default function Footer({ showAnnotations = true, activeView = "capability", onViewChange }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (!onViewChange) return;

    if (link === "Access to Capability") {
      onViewChange("capability");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (link === "Access to Markets") {
      onViewChange("markets");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (link === "Access to Capital") {
      onViewChange("capability");
      setTimeout(() => {
        const el = document.getElementById("what-is-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);
    } else if (link === "Success Stories") {
      onViewChange("capability");
      setTimeout(() => {
        const el = document.getElementById("why-apply-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);
    } else if (link === "System Process Flow") {
      onViewChange("flow");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (link === "Apply Now") {
      onViewChange("apply");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onViewChange("capability");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const footerLinks = [
    {
      title: "ABOUT US",
      links: ["Who We Are", "Our Mandate", "Our Approach", "System Process Flow", "Governance"]
    },
    {
      title: "FOR BUSINESSES",
      links: [
        "Access to Capital",
        "Access to Capability",
        "Access to Markets",
        "Success Stories",
        "Apply Now"
      ]
    }
  ];

  return (
    <footer id="app-footer" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onViewChange) {
                  onViewChange("capability");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-3 focus:outline-hidden group"
              id="footer-logo-link"
            >
              {showAnnotations ? (
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-mono font-bold text-xs tracking-tighter border border-white/10 group-hover:bg-white group-hover:text-slate-950 transition-colors">
                  [L1]
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center font-mono font-extrabold text-xs tracking-tighter shadow-sm">
                  SPA
                </div>
              )}
              <div className="flex flex-col font-mono">
                <span className="font-extrabold text-base tracking-wider text-white leading-none">
                  SERVICE PROVIDER AUTHENTICATION
                </span>
                <span className="font-medium text-xs tracking-widest text-slate-400 leading-relaxed">
                  {fmtText("PORTAL", showAnnotations)}
                </span>
              </div>
            </a>
            
            <p className="text-xs text-slate-400 font-mono leading-relaxed max-w-sm" id="footer-tagline">
              Mobilising capital. Building enterprises. Supporting SMME growth.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3" id="footer-socials">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-white hover:text-slate-950 flex items-center justify-center text-slate-400 border border-slate-800 transition-all shadow-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-white hover:text-slate-950 flex items-center justify-center text-slate-400 border border-slate-800 transition-all font-mono font-bold text-xs shadow-xs"
                aria-label="X"
              >
                X
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-white hover:text-slate-950 flex items-center justify-center text-slate-400 border border-slate-800 transition-all shadow-xs"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-2 gap-6">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-4" id={`footer-col-${group.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <h4 className="font-mono font-bold text-[10px] tracking-widest text-white uppercase bg-slate-900/80 inline-block px-2.5 py-1 rounded-md border border-slate-800">
                  {group.title}
                </h4>
                <ul className="space-y-2.5 text-[11px] font-mono">
                  {group.links.map((link) => {
                    const isActive =
                      (link === "Access to Capability" && activeView === "capability") ||
                      (link === "Access to Markets" && activeView === "markets") ||
                      (link === "System Process Flow" && activeView === "flow") ||
                      (link === "Apply Now" && activeView === "apply");

                    return (
                      <li key={link}>
                        <a
                          href="#"
                          onClick={(e) => handleLinkClick(e, link)}
                          className={`text-slate-400 hover:text-white hover:underline transition-colors ${
                            isActive ? "text-white font-bold underline" : ""
                          }`}
                        >
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-4" id="footer-newsletter-col">
            <h4 className="font-mono font-bold text-[10px] tracking-widest text-white uppercase bg-slate-900/80 inline-block px-2.5 py-1 rounded-md border border-slate-800">
              NEWSLETTER
            </h4>
            <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
              Stay updated with the latest opportunities and insights.
            </p>

            <form onSubmit={handleSubmit} className="relative mt-2" id="footer-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 text-xs font-mono text-white border border-slate-800 py-3 pl-4 pr-12 rounded-xl placeholder-slate-500 focus:outline-hidden focus:border-white transition-all"
              />
              <button
                type="submit"
                id="newsletter-submit-btn"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-white hover:bg-slate-200 text-slate-950 transition-colors rounded-lg flex items-center justify-center font-bold"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="flex items-center gap-2 text-xs text-white font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-700 shadow-md"
                  id="newsletter-success-toast"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Subscribed successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>

        {/* Bottom copyright and legal info */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] text-slate-500 font-mono gap-4" id="footer-bottom-info">
          <div>
            © 2026 Service Provider Authentication Portal. Wireframe Prototype V1.0.
          </div>
          <div className="flex gap-4 sm:gap-6 divide-x divide-slate-800">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="pl-4 hover:text-slate-300 transition-colors">Terms & Conditions</a>
            <a href="#" className="pl-4 hover:text-slate-300 transition-colors">PAIA</a>
          </div>
        </div>

      </div>
    </footer>
  );
}


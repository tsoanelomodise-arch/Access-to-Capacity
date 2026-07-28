/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BespokeIcon, IconArrowRight, IconCheck } from "./icons/CustomIcons";
import { SupportService } from "../types";
import { motion } from "motion/react";
import { fmtText } from "../utils/format";

interface SupportCardProps {
  service: SupportService;
  index: number;
  showAnnotations?: boolean;
  key?: string | number;
}

export default function SupportCard({ service, index, showAnnotations = true }: SupportCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`support-card-${index}`}
      className="bg-white/92 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_35px_-6px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_-8px_rgba(15,23,42,0.1)] hover:-translate-y-1 relative overflow-hidden group hover:border-slate-300/80"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="space-y-5">
        {/* Design Reference Inspired Icon & Header Block */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
            <BespokeIcon name={service.iconName} size={22} className="text-white" strokeWidth={1.8} />
          </div>
          <div>
            {showAnnotations && (
              <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">
                [SERVICE_{index + 1}]
              </span>
            )}
            <h4 className="font-mono font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-slate-800 transition-colors duration-100 tracking-tight leading-snug">
              {service.title}
            </h4>
          </div>
        </div>

        {/* Bullet List of Items */}
        <ul className="space-y-2.5 font-sans" id={`support-card-items-${index}`}>
          {service.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
              <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center border border-slate-200">
                <IconCheck size={10} strokeWidth={3} className="text-slate-900" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learn more interactive link */}
      <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
        <a
          href={service.learnMoreLink}
          className="inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors duration-100 group/link"
        >
          <span>{fmtText("[LEARN_MORE]", showAnnotations)}</span>
          <IconArrowRight size={14} className="text-slate-900 group-hover/link:translate-x-1 transition-transform" />
        </a>
        {showAnnotations && (
          <span className="font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">[W_{index + 1}.02]</span>
        )}
      </div>
    </motion.div>
  );
}



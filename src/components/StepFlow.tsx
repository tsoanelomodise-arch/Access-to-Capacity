/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  IconClipboardCheck, 
  IconClipboardList, 
  IconNetwork, 
  IconHandshake, 
  IconTrendingUp 
} from "./icons/CustomIcons";
import { HOW_IT_WORKS_STEPS } from "../data";
import { motion } from "motion/react";

const ICONS_MAP: Record<number, React.FC<{ size?: number | string; className?: string; strokeWidth?: number }>> = {
  1: IconClipboardCheck,
  2: IconClipboardList,
  3: IconNetwork,
  4: IconHandshake,
  5: IconTrendingUp,
};

export default function StepFlow() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="w-full" id="how-it-works-flow">
      {/* Connector lines on desktop are positioned relatively */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 relative">
        {HOW_IT_WORKS_STEPS.map((step, idx) => {
          const IconComponent = ICONS_MAP[step.number] || IconClipboardCheck;
          const isHovered = hoveredStep === step.number;

          return (
            <motion.div
              key={step.number}
              onMouseEnter={() => setHoveredStep(step.number)}
              onMouseLeave={() => setHoveredStep(null)}
              className="flex flex-col items-center text-center relative group focus:outline-hidden bg-white/92 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-[0_10px_30px_-6px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_40px_-8px_rgba(15,23,42,0.1)] transition-all duration-300"
              id={`step-card-${step.number}`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Connector line for desktop */}
              {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                <div 
                  className="hidden md:block absolute top-12 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-[2px] bg-slate-200 -z-10" 
                  id={`step-line-${step.number}`}
                />
              )}

              {/* Icon Container Wireframe inspired by Design Reference */}
              <div 
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative ${
                  isHovered 
                    ? "bg-slate-900 text-white shadow-md scale-105" 
                    : "bg-slate-100 text-slate-900 border border-slate-200"
                }`}
                id={`step-icon-container-${step.number}`}
              >
                {/* Step indicator tag */}
                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border flex items-center justify-center font-mono font-bold text-[10px] transition-all duration-200 ${
                  isHovered
                    ? "bg-amber-400 text-slate-950 border-slate-900 shadow-xs"
                    : "bg-slate-900 text-white border-slate-800"
                }`}>
                  {step.number}
                </div>
                
                <IconComponent size={24} strokeWidth={1.8} />
              </div>

              {/* Title & Description */}
              <div className="mt-5 space-y-2 max-w-[180px]">
                <h4 className="font-mono font-bold text-xs text-slate-900 group-hover:text-slate-800 leading-snug">
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
  );
}



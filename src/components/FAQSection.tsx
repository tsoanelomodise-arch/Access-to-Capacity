/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  IconPlus as Plus, 
  IconX as Minus, 
  IconArrowUpRight as ArrowUpRight 
} from "./icons/CustomIcons";
import { FAQS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { fmtText } from "../utils/format";

interface FAQSectionProps {
  showAnnotations?: boolean;
}

export default function FAQSection({ showAnnotations = true }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-section" className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] h-full flex flex-col justify-between">
      <div className="space-y-6">
        <div className="space-y-2">
          {showAnnotations && (
            <span className="font-mono text-[9px] font-bold text-slate-400 block tracking-widest">[ACCORDION_FAQ_SYSTEM]</span>
          )}
          <h3 className="font-mono font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight" id="faq-heading">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="divide-y divide-slate-100 border-t border-b border-slate-100" id="faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-4 first:pt-4 last:pb-4" id={`faq-item-${index}`}>
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex justify-between items-start text-left gap-4 focus:outline-hidden group cursor-pointer"
                  id={`faq-btn-${index}`}
                >
                  <span className="font-sans font-bold text-xs sm:text-[13px] text-slate-800 group-hover:text-indigo-600 transition-colors duration-100">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center transition-all duration-200 group-hover:bg-slate-900 group-hover:text-white">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="overflow-hidden"
                      id={`faq-answer-container-${index}`}
                    >
                      <p className="mt-3 text-xs text-slate-600 font-medium leading-relaxed font-sans bg-slate-50 p-3.5 rounded-xl border border-slate-100" id={`faq-answer-${index}`}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-8 mt-6 flex justify-between items-center border-t border-slate-100">
        <a
          href="#"
          id="view-all-faqs-link"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800 hover:text-indigo-600 transition-colors"
        >
          <span>{fmtText("[VIEW_ALL_FAQS]", showAnnotations)}</span>
          <ArrowUpRight className="w-4 h-4 text-slate-900" />
        </a>
        {showAnnotations && (
          <span className="font-mono text-[9px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">[MODULE_FAQ_07]</span>
        )}
      </div>
    </div>
  );
}



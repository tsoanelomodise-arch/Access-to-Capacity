/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  IconX as X, 
  IconCheckCircle as CheckCircle2, 
  IconShieldAlert as AlertCircle, 
  IconSparkles as Sparkles, 
  IconArrowRight as ArrowRight, 
  IconHelpCircle as HelpCircle 
} from "./icons/CustomIcons";
import { motion, AnimatePresence } from "motion/react";

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApply: () => void;
}

export default function EligibilityModal({ isOpen, onClose, onOpenApply }: EligibilityModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [result, setResult] = useState<"eligible" | "ineligible" | null>(null);

  const questions = [
    {
      id: 1,
      text: "Is your business registered in South Africa as an SMME (Small, Medium, or Micro Enterprise)?",
      desc: "Must be a legally registered business operating within the borders of South Africa."
    },
    {
      id: 2,
      text: "Do you have valid company registration documents (e.g., CIPC) and proof of address?",
      desc: "These will be required during the official documentation stage."
    },
    {
      id: 3,
      text: "Is your business tax-compliant with the South African Revenue Service (SARS)?",
      desc: "A valid Tax Clearance Pin or Tax Compliance Certificate (TCC) is necessary."
    },
    {
      id: 4,
      text: "Are you seeking non-financial development support (rather than direct financial loans or grants)?",
      desc: "Access to Capability provides mentorship, advisory, planning, and system enablement, not direct capital."
    }
  ];

  const handleAnswer = (answer: boolean) => {
    const updatedAnswers = { ...answers, [currentStep]: answer };
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results
      const allYes = Object.values(updatedAnswers).every((val) => val === true);
      setResult(allYes ? "eligible" : "ineligible");
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const handleApplyNext = () => {
    onClose();
    onOpenApply();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop overlay */}
        <div 
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity" 
          onClick={onClose} 
        />

        {/* Vertical center spacer */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal content body (Wireframe Version) */}
        <div className="inline-block align-bottom bg-white rounded-none text-left overflow-hidden border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative">
          
          {/* Header */}
          <div className="bg-slate-900 px-6 py-5 flex justify-between items-center text-white border-b-2 border-slate-900">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-300 font-bold uppercase tracking-wider">
                [W_ELIGIBILITY_WIZARD]
              </span>
            </div>
            <button 
              onClick={onClose} 
              className="p-1 border border-transparent hover:border-white text-slate-300 hover:text-white transition-all focus:outline-hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {result === null ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6 animate-none"
                >
                  {/* Progress Indicator */}
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] font-extrabold text-slate-900 tracking-wider uppercase">
                      DIAGNOSTIC_STEP {currentStep + 1} / {questions.length}
                    </span>
                    <div className="flex gap-1.5">
                      {questions.map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 border border-slate-900 transition-all duration-100 ${
                            i === currentStep ? "w-6 bg-slate-900" : i < currentStep ? "w-2 bg-slate-300" : "w-2 bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question block */}
                  <div className="space-y-3 border-l-4 border-slate-900 pl-4 py-1">
                    <h4 className="font-mono font-bold text-base text-slate-900 leading-snug">
                      {questions[currentStep].text}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed">
                      {questions[currentStep].desc}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                      onClick={() => handleAnswer(true)}
                      className="py-4 px-6 bg-slate-50 hover:bg-slate-900 border-2 border-slate-900 text-slate-900 hover:text-white font-mono font-bold text-xs rounded-none transition-all active:translate-x-[1px] active:translate-y-[1px] cursor-pointer text-center"
                    >
                      [YES_CONFIRM]
                    </button>
                    <button
                      onClick={() => handleAnswer(false)}
                      className="py-4 px-6 bg-white hover:bg-slate-100 border-2 border-slate-900 text-slate-700 font-mono font-bold text-xs rounded-none transition-all active:translate-x-[1px] active:translate-y-[1px] cursor-pointer text-center"
                    >
                      [NO_REJECT]
                    </button>
                  </div>
                </motion.div>
              ) : result === "eligible" ? (
                <motion.div
                  key="eligible"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-16 h-16 border-2 border-slate-900 bg-slate-50 flex items-center justify-center mx-auto text-slate-900">
                    <CheckCircle2 className="w-8 h-8 stroke-[2]" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono font-extrabold text-lg sm:text-xl text-slate-900">
                      STATUS: ELIGIBLE
                    </h4>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed max-w-sm mx-auto">
                      Great news! Based on your answers, your business qualifies for the fully subsidized Access to Capability development support.
                    </p>
                  </div>

                  <div className="bg-slate-50 border-2 border-slate-900 rounded-none p-4 text-left flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                    <div className="font-sans">
                      <h5 className="font-bold text-xs text-slate-900 leading-snug">What happens next?</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                        Submit your full details, and our advisory committee will connect with you to formulate your customized 1-on-1 business development plan.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2 font-mono text-xs font-bold">
                    <button
                      onClick={handleReset}
                      className="flex-1 py-3 px-4 bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-900 rounded-none transition-colors"
                    >
                      [START_OVER]
                    </button>
                    <button
                      onClick={handleApplyNext}
                      className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 rounded-none transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>[SUBMIT_DETAILS]</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ineligible"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-16 h-16 border-2 border-slate-900 bg-slate-50 flex items-center justify-center mx-auto text-slate-900">
                    <AlertCircle className="w-8 h-8 stroke-[2]" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono font-extrabold text-lg sm:text-xl text-slate-900">
                      STATUS: INELIGIBLE
                    </h4>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed max-w-sm mx-auto">
                      It appears your business doesn't currently meet all minimum criteria for this specific non-financial support stream.
                    </p>
                  </div>

                  <div className="bg-slate-50 border-2 border-slate-900 rounded-none p-4 text-left flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                    <div className="font-sans">
                      <h5 className="font-bold text-xs text-slate-900 leading-snug">How to proceed?</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                        You can review the full documents list in the "Before you apply" section or speak with one of our advisors to see how to align your business with the criteria.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2 font-mono text-xs font-bold">
                    <button
                      onClick={handleReset}
                      className="flex-1 py-3 px-4 bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-900 rounded-none transition-colors"
                    >
                      [RETRY_WIZARD]
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 rounded-none transition-colors"
                    >
                      [CLOSE]
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}


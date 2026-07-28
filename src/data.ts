/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SupportService, HowItWorksStep, Benefit, FaqItem } from "./types";

export const SUPPORT_SERVICES: SupportService[] = [
  {
    title: "Business Advisory",
    iconName: "Briefcase",
    items: [
      "Strategy development",
      "Financial management",
      "Cashflow management",
      "Governance advisory",
      "HR, Tax & Legal advisory"
    ],
    learnMoreLink: "#"
  },
  {
    title: "Business Planning",
    iconName: "FileText",
    items: [
      "Business plan development",
      "Financial modelling",
      "Pitch deck preparation",
      "Governance advisory",
      "Investment readiness"
    ],
    learnMoreLink: "#"
  },
  {
    title: "Technical Assistance",
    iconName: "Settings",
    items: [
      "Product development",
      "Product testing",
      "Certification & quality",
      "Packaging & branding",
      "IP registration"
    ],
    learnMoreLink: "#"
  },
  {
    title: "Skills Development",
    iconName: "GraduationCap",
    items: [
      "Entrepreneurship",
      "Digital & AI skills",
      "Marketing",
      "Procurement",
      "Manufacturing & more"
    ],
    learnMoreLink: "#"
  },
  {
    title: "Mentorship & Incubation",
    iconName: "Users",
    items: [
      "Business mentoring",
      "Executive coaching",
      "Incubation & accelerators",
      "Innovation hubs",
      "Peer learning"
    ],
    learnMoreLink: "#"
  },
  {
    title: "Digital Enablement",
    iconName: "Monitor",
    items: [
      "Website development",
      "E-commerce onboarding",
      "Digital marketing",
      "Accounting & ERP",
      "POS implementation"
    ],
    learnMoreLink: "#"
  }
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: 1,
    title: "Apply online",
    description: "Submit your application through the Service Provider Authentication Portal."
  },
  {
    number: 2,
    title: "Business assessment",
    description: "Complete a business needs assessment so we understand your gaps."
  },
  {
    number: 3,
    title: "Capability matching",
    description: "We recommend the right support and match you with suitable programmes."
  },
  {
    number: 4,
    title: "Provider allocation",
    description: "You are connected with experts or service providers."
  },
  {
    number: 5,
    title: "Participate & grow",
    description: "Engage in the support programme and build a stronger business."
  }
];

export const BENEFITS: Benefit[] = [
  {
    title: "Strengthen your business operations",
    iconName: "TrendingUp"
  },
  {
    title: "Build new skills and capability",
    iconName: "Award"
  },
  {
    title: "Access expert mentorship",
    iconName: "UserCheck"
  },
  {
    title: "Improve investment readiness",
    iconName: "BarChart3"
  },
  {
    title: "Increase competitiveness and efficiency",
    iconName: "Zap"
  },
  {
    title: "Prepare for funding and growth opportunities",
    iconName: "Target"
  }
];

export const BEFORE_YOU_APPLY_REQUIREMENTS = [
  "Identity Document",
  "Company Registration Documents",
  "Tax Compliance Certificate",
  "Business Profile",
  "Existing Business Plan (if available)",
  "Proof of Address",
  "Ownership Declaration",
  "B-BBEE Certificate / Affidavit (if available)",
  "Supporting Motivation"
];

export const FAQS: FaqItem[] = [
  {
    question: "Who can apply for Access to Capability?",
    answer: "The programme is open to registered South African SMMEs (Small, Medium, and Micro Enterprises) that are operating, have growth potential, and meet our basic eligibility criteria, including B-BBEE alignment."
  },
  {
    question: "How much does it cost to access support?",
    answer: "Access to Capability provides fully-subsidized, non-financial business development support. There are no direct costs or fees charged to the participating businesses for the consultation or training received."
  },
  {
    question: "Do I receive funding through this programme?",
    answer: "No, this is a non-financial support programme focused on building business systems, skills, and operations. However, successful completion of the programme significantly improves your investment readiness for future funding opportunities."
  },
  {
    question: "How long does the support last?",
    answer: "The duration of the support varies based on the custom development plan created for your business. On average, standard support programmes range from 3 to 12 months."
  },
  {
    question: "Can I apply for funding after completing this programme?",
    answer: "Yes, completing this programme ensures you meet the compliance, planning, and governance requirements that funders look for, making you a strong candidate to apply for financial support from our partner programs or financial partners."
  }
];

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SupportService {
  title: string;
  iconName: string;
  items: string[];
  learnMoreLink: string;
}

export interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  iconName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqList: FAQItem[] = [
    {
      question: 'How much government subsidy can I receive for rooftop solar installation?',
      answer: 'Under the PM Surya Ghar: Muft Bijli Yojana, residential consumers receive direct bank transfer subsidies: ₹30,000 for 1 kW systems, ₹60,000 for 2 kW systems, and a maximum of ₹78,000 for 3 kW or higher capacity systems. M/S Rout Traders manages the portal paperwork for you.',
      category: 'Subsidy',
    },
    {
      question: 'What is the typical payback period and lifetime savings of a residential solar system?',
      answer: 'Most residential systems achieve full capital payback within 3 to 4 years through reduced electricity bills. Considering solar panels are warrantied for 25 years, you enjoy over 20+ years of virtually free electricity.',
      category: 'ROI',
    },
    {
      question: 'How much shade-free rooftop area do I need for 3 kW, 5 kW, or 10 kW systems?',
      answer: 'As a general rule: ~300 sq ft is needed for 3 kW, ~500 sq ft for 5 kW, and ~1,000 sq ft for 10 kW. The area should have minimal shade from trees or neighboring buildings during peak sun hours (10 AM to 4 PM).',
      category: 'Technical',
    },
    {
      question: 'How do solar panels perform during rainy or cloudy days?',
      answer: 'Solar panels generate power using solar radiance, not direct heat. While output during heavy monsoon cloud cover may drop to 20%-40%, the system remains connected to the DISCOM grid to ensure unbroken electricity supply.',
      category: 'Performance',
    },
    {
      question: 'What warranties and after-sales maintenance are provided by M/S Rout Traders?',
      answer: 'We supply Tier-1 Mono PERC solar modules with 25-Year Performance Warranties, 5 to 10-Year Inverter Warranties, and 5-Year Workmanship Warranty. We also include 1 year of complimentary scheduled cleaning & inspection visits.',
      category: 'Warranty',
    },
    {
      question: 'How long does physical installation and DISCOM net-metering setup take?',
      answer: 'On-site installation is completed swiftly in just 2 to 4 working days. Following installation, DISCOM inspection and bi-directional net meter installation typically take 2 to 3 weeks.',
      category: 'Installation',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white text-slate-900 relative border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full mb-3 inline-block">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 mt-3 text-sm">
            Everything you need to know about rooftop solar, government subsidies, and installation with M/S Rout Traders.
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between space-x-4 focus:outline-none hover:bg-slate-100/80 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-slate-900 flex-shrink-0" />
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-yellow-400 border-yellow-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200/60">
                    <p className="pt-2">{item.answer}</p>
                    <div className="mt-3 inline-block text-[10px] font-bold text-slate-900 bg-yellow-400/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Category: {item.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

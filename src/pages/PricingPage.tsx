import React, { useState } from 'react';
import { TargetPricingSection } from '../components/TargetPricingSection';
import { FAQS } from '../data/mockData';
import { ChevronDown, ChevronUp, HelpCircle, ShieldCheck } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Concise 4-item FAQ for pricing
  const pricingFaqs = FAQS.slice(0, 4);

  return (
    <div className="w-full bg-[#0B0E2A] text-[#F4F6FC]">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Isolated Pricing Layout: Header → Side-by-side Pricing Cards */}
        <TargetPricingSection 
          onNavigate={onNavigate} 
          title="Simple One-Time Access" 
          subtitle="Choose single exam focus or unlock all nursing test banks for life. No subscriptions, auto-renewals, or surprise charges."
        />

        {/* Concise FAQ Accordion in Clean High-Contrast Dark Card Structure */}
        <div className="max-w-4xl mx-auto space-y-6 pt-6 border-t border-[#1A1A4E]">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] uppercase tracking-wider bg-[#131738] px-3.5 py-1.5 rounded-full border border-slate-700/60">
              <HelpCircle className="h-4 w-4 text-[#FFD60A]" />
              <span>Common Questions</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight font-editorial-serif">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Everything you need to know about our one-time access model and guarantee.
            </p>
          </div>

          <div className="space-y-4">
            {pricingFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#131738] text-white border border-slate-700/60 shadow-md overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white hover:text-[#FFD60A] transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-[#FFD60A] shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 shrink-0 ml-4" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reassurance Banner */}
          <div className="mt-8 p-6 rounded-2xl bg-[#131738] text-white border border-[#5D5FEF]/40 shadow-lg flex flex-col sm:flex-row items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#1A1A4E] text-[#FFD60A] border border-[#5D5FEF]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-6 w-6 stroke-[#FFD60A]" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-white">100% Pass or Money-Back Guarantee</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Complete 80% of your test bank questions with a 75%+ score. If you do not pass your official exam, we refund 100% of your payment.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

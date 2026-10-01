import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, Sparkles, Shield, ArrowRight, Clock, Award } from 'lucide-react';
import { EXAM_BANKS } from '../data/mockData';

interface TargetPricingSectionProps {
  selectedExamId?: string | null;
  onNavigate?: (path: string) => void;
  title?: string;
  subtitle?: string;
}

export const TargetPricingSection: React.FC<TargetPricingSectionProps> = ({ 
  selectedExamId, 
  onNavigate,
  title = "Simple One-Time Access",
  subtitle = "Choose single exam focus or unlock all nursing test banks for life. No subscriptions, auto-renewals, or surprise charges."
}) => {
  const { openCheckout } = useAuth();

  const selectedExam = EXAM_BANKS.find(e => e.id === selectedExamId);

  const handleSelectBasic = () => {
    openCheckout({
      id: selectedExam ? `basic-${selectedExam.id}` : 'basic-test-bank',
      title: selectedExam ? `Basic Test Bank - ${selectedExam.title}` : 'Basic Test Bank (Single Exam)',
      type: 'basic_test_bank',
      price: 49,
      examId: selectedExam?.id
    });
  };

  const handleSelectComplete = () => {
    openCheckout({
      id: 'complete-pass-bundle',
      title: 'Complete Pass Bundle (All Test Banks + Predictors)',
      type: 'complete_bundle',
      price: 89
    });
  };

  return (
    <section id="pricing" className="py-12 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] uppercase tracking-wider bg-[#131738] px-3.5 py-1.5 rounded-full border border-slate-700/60">
            <Sparkles className="h-4 w-4 text-[#FFD60A]" />
            <span>One-Time Access Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-editorial-serif">
            {title}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedExam ? (
              <span>
                Configured for <strong className="text-[#FFD60A]">{selectedExam.title}</strong>. {subtitle}
              </span>
            ) : (
              <span>{subtitle}</span>
            )}
          </p>
        </div>

        {/* Pricing Cards Grid (Side-by-side desktop in high-contrast white cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Card 1: Basic Test Bank ($49 / one-time) */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-xl transition-all hover:shadow-2xl">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-sans">Basic Test Bank</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {selectedExam ? `Single Exam Focus (${selectedExam.title})` : 'Single Exam Focus'}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5D5FEF]/10 text-[#5D5FEF]">
                  <Clock className="h-6 w-6 stroke-[2.2]" />
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-slate-900 font-mono tabular-nums">$49</span>
                <span className="text-sm font-semibold text-slate-500">/ one-time</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">90 days of complete access. No renewal fees.</p>

              {/* Structured Bullet Feature List */}
              <div className="mt-8 space-y-3.5 border-t border-slate-100 pt-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5D5FEF]/10 text-[#5D5FEF] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">1,500+ Practice Questions</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5D5FEF]/10 text-[#5D5FEF] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Detailed Answer Explanations</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5D5FEF]/10 text-[#5D5FEF] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">90-Day Unrestricted Access</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5D5FEF]/10 text-[#5D5FEF] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Mobile &amp; Desktop Sync</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4">
              <button
                onClick={handleSelectBasic}
                className="w-full py-4 px-6 rounded-full bg-[#5D5FEF] hover:bg-[#4D4FD9] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99]"
              >
                <span>Select Basic ($49)</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Complete Pass Bundle ($89 / one-time) [Highlighted Card] */}
          <div className="relative flex flex-col justify-between p-8 rounded-2xl bg-white text-slate-900 border-2 border-[#FFD60A] shadow-2xl">
            
            {/* Most Popular Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full bg-[#FFD60A] text-[#0B0E2A] text-xs font-black uppercase tracking-wider shadow-md">
                MOST POPULAR
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-sans">Complete Pass Bundle</h3>
                  <p className="text-xs font-semibold text-[#5D5FEF] mt-1">All Exams + Predictor</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5D5FEF]/10 text-[#5D5FEF]">
                  <Award className="h-6 w-6 stroke-[2.2]" />
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-slate-900 font-mono tabular-nums">$89</span>
                <span className="text-sm font-semibold text-slate-500">/ one-time</span>
              </div>
              <p className="text-xs font-semibold text-emerald-600 mt-1">Lifetime access with 100% Pass or Money-Back Guarantee.</p>

              {/* Structured Bullet Feature List */}
              <div className="mt-8 space-y-3.5 border-t border-slate-100 pt-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">All Test Banks (NCLEX, HESI, TEAS)</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Next-Gen (NGN) Case Studies</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">2 Full Readiness Predictors</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Lifetime Access Guarantee</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4">
              <button
                onClick={handleSelectComplete}
                className="w-full py-4 px-6 rounded-full bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,214,10,0.35)] transition-all active:scale-[0.99]"
              >
                <span>Get Complete Pass ($89)</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Reassurance Banner */}
        <div className="mt-10 text-center text-xs text-slate-400 flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Shield className="h-4 w-4 text-[#FFD60A]" />
            100% Refund Pass Guarantee
          </span>
          <span>·</span>
          <span>Instant Account Activation</span>
          <span>·</span>
          <span>Visa Encrypted Stripe Processing</span>
        </div>

      </div>
    </section>
  );
};

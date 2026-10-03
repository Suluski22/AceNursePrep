import React from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { 
  Stethoscope, 
  Award, 
  FileCheck, 
  Brain, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Lock,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const examCategories = [
    {
      id: 'nclex-rn',
      title: 'NCLEX Exams',
      subtitle: 'NCLEX-RN & NCLEX-PN',
      tag: 'Next-Gen (NGN)',
      qCount: '5,600+ Questions',
      icon: <Stethoscope className="h-5 w-5 text-[#FFD60A]" />,
      desc: 'Computer-adaptive case studies, clinical judgment measurement model & SATA.',
      freeRoute: '/free-practice',
      bankRoute: '/exam-banks?selected=nclex-rn'
    },
    {
      id: 'hesi-rn-exit',
      title: 'HESI Exams',
      subtitle: 'PN & RN Exit Predictor',
      tag: '900+ Benchmark',
      qCount: '4,000+ Questions',
      icon: <Award className="h-5 w-5 text-[#FFD60A]" />,
      desc: 'Elsevier scoring benchmark with med-surg, pharmacology & prioritization.',
      freeRoute: '/free-practice',
      bankRoute: '/exam-banks?selected=hesi-rn-exit'
    },
    {
      id: 'ati-rn-comprehensive-predictor',
      title: 'ATI School Exams',
      subtitle: 'Comprehensive Predictor',
      tag: '100% Free Full Access',
      qCount: '6,250+ Questions (2,400 Free)',
      icon: <FileCheck className="h-5 w-5 text-[#FFD60A]" />,
      desc: 'Proctored school exams, nursing management, maternity & pharmacology.',
      freeRoute: '/practice/ati-rn-comprehensive-predictor',
      bankRoute: '/exam-banks?selected=ati-rn-comprehensive-predictor'
    },
    {
      id: 'ati-teas',
      title: 'ATI TEAS Exams',
      subtitle: 'TEAS Version 7',
      tag: 'Admissions Prep',
      qCount: '1,650+ Questions',
      icon: <Brain className="h-5 w-5 text-[#FFD60A]" />,
      desc: 'Human anatomy, dimensional math, scientific reasoning & reading analysis.',
      freeRoute: '/free-practice',
      bankRoute: '/exam-banks?selected=ati-teas'
    }
  ];

  return (
    <div className="w-full bg-[#0B0E2A] text-[#F4F6FC] flex flex-col justify-between">
      
      {/* 1. Neatly Framed Transparent Hero Section */}
      <HeroCarousel onNavigate={onNavigate} />

      {/* 2. Core Value Props & Main Trial / Access Triggers (Compact Balanced Launchpad) */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Section Header with Quick CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1A1A4E]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] uppercase tracking-wider mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Select Your Nursing Exam Category</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white tracking-tight font-editorial-serif">
              Instant Access to High-Yield Test Banks
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/free-practice')}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#131738] text-[#FFD60A] border border-[#FFD60A]/40 hover:bg-[#1A1A4E] transition-colors whitespace-nowrap"
            >
              Try 10 Free Questions
            </button>
            <button
              onClick={() => onNavigate('/exam-banks')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#FFD60A] text-[#0B0E2A] hover:bg-[#ffe033] transition-colors whitespace-nowrap"
            >
              <span>Explore All Banks</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Core Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {examCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-[#131738] border border-slate-700/60 hover:border-[#5D5FEF] transition-all flex flex-col justify-between shadow-lg group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A4E] border border-slate-700/60 shadow-sm">
                    {cat.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#FFD60A] bg-[#1A1A4E] px-2.5 py-1 rounded-full border border-[#FFD60A]/20">
                    {cat.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#FFD60A] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs font-medium text-slate-300 -mt-0.5 mb-2">
                  {cat.subtitle}
                </p>

                <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{cat.qCount}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onNavigate(cat.freeRoute)}
                    className="py-1.5 px-2 rounded-lg bg-[#0B0E2A] hover:bg-[#1A1A4E] text-[#FFD60A] border border-slate-700/80 text-[11px] font-bold text-center transition-colors"
                  >
                    Free Trial
                  </button>
                  <button
                    onClick={() => onNavigate(cat.bankRoute)}
                    className="py-1.5 px-2 rounded-lg bg-[#5D5FEF] hover:bg-[#6C5CE7] text-white text-[11px] font-bold text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Bank</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Compact Bottom Trust & Guarantee Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-[#131738] via-[#1A1A4E]/80 to-[#131738] border border-[#5D5FEF]/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B0E2A] text-[#FFD60A] border border-[#FFD60A]/30 shrink-0">
              <ShieldCheck className="h-6 w-6 stroke-[#FFD60A]" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white block">
                100% Pass or Money-Back Guarantee · Single One-Time Purchase
              </span>
              <span className="text-[11px] text-slate-300">
                No automatic renewals, recurring charges, or hidden fees. Single payment grants instant access.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/pricing')}
              className="px-5 py-2.5 rounded-full bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-xs shadow-md transition-colors whitespace-nowrap"
            >
              Get Instant Access
            </button>
          </div>
        </div>

      </section>

    </div>
  );
};

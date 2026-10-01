import React, { useState, useEffect } from 'react';
import { EXAM_BANKS } from '../data/mockData';
import { TargetPricingSection } from '../components/TargetPricingSection';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  FileCheck, 
  Sparkles, 
  ShieldCheck, 
  HeartPulse, 
  Stethoscope, 
  Activity,
  CheckCircle2,
  Check,
  ArrowDown
} from 'lucide-react';
import { ExamCategory } from '../types';

interface ExamBanksPageProps {
  initialSelectedExamId?: string | null;
  onNavigate: (path: string) => void;
}

export const ExamBanksPage: React.FC<ExamBanksPageProps> = ({ initialSelectedExamId, onNavigate }) => {
  const [selectedExamId, setSelectedExamId] = useState<string | null>(initialSelectedExamId || 'nclex-rn');
  const [selectedTab, setSelectedTab] = useState<string>('All');

  useEffect(() => {
    if (initialSelectedExamId) {
      setSelectedExamId(initialSelectedExamId);
    }
  }, [initialSelectedExamId]);

  // Handle "View Package" click: stores selected exam and smoothly scrolls down to the pricing cards
  const handleViewPackage = (examId: string) => {
    setSelectedExamId(examId);
    window.history.pushState(null, '', `/exam-banks?selected=${examId}#pricing`);
    const pricingElem = document.getElementById('pricing');
    if (pricingElem) {
      pricingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getExamIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="h-6 w-6 text-[#5D5FEF]" />;
      case 'GraduationCap': return <GraduationCap className="h-6 w-6 text-[#5D5FEF]" />;
      case 'Award': return <Award className="h-6 w-6 text-[#5D5FEF]" />;
      case 'FileCheck': return <FileCheck className="h-6 w-6 text-[#5D5FEF]" />;
      case 'Sparkles': return <Sparkles className="h-6 w-6 text-[#5D5FEF]" />;
      case 'ShieldCheck': return <ShieldCheck className="h-6 w-6 text-[#5D5FEF]" />;
      case 'HeartPulse': return <HeartPulse className="h-6 w-6 text-[#5D5FEF]" />;
      case 'Stethoscope': return <Stethoscope className="h-6 w-6 text-[#5D5FEF]" />;
      case 'Activity': return <Activity className="h-6 w-6 text-[#5D5FEF]" />;
      default: return <Stethoscope className="h-6 w-6 text-[#5D5FEF]" />;
    }
  };

  const categories: ExamCategory[] = [
    'ATI TEAS Exams',
    'HESI Exams',
    'ATI School Exams',
    'NCLEX Exams'
  ];

  const filteredCategories = selectedTab === 'All' 
    ? categories 
    : categories.filter(c => c.toLowerCase().includes(selectedTab.toLowerCase()) || selectedTab.toLowerCase().includes(c.toLowerCase()));

  return (
    <div className="w-full bg-[#0B0E2A] text-[#F4F6FC]">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Isolated Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] uppercase tracking-wider bg-[#131738] px-3.5 py-1.5 rounded-full border border-slate-700/60">
            <Sparkles className="h-4 w-4 text-[#FFD60A]" />
            <span>Standardized Question Bank Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight font-editorial-serif">
            Select Your Test Bank
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Get realistic practice and guaranteed pass materials tailored to your specific exam.
          </p>
        </div>

        {/* Category Tabs (Segmented Control) */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {['All', 'ATI TEAS', 'HESI', 'ATI School', 'NCLEX'].map((tab) => {
            const isActive = selectedTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FFD60A] text-[#0B0E2A] shadow-md font-bold'
                    : 'bg-[#131738] text-slate-300 hover:text-white hover:bg-[#1A1A4E] border border-slate-700/70'
                }`}
              >
                {tab === 'All' ? 'All Test Banks' : tab}
              </button>
            );
          })}
        </div>

        {/* 4 Exam Categories (Card-based grid with high-contrast white cards) */}
        <div className="space-y-12">
          {filteredCategories.map((category) => {
            const examsInCategory = EXAM_BANKS.filter(e => e.category === category);

            return (
              <div key={category} className="space-y-6">
                
                {/* Category Section Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1A1A4E]">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-[#FFD60A]"></span>
                    <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
                      {category}
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {examsInCategory.length} {examsInCategory.length === 1 ? 'Exam Bank' : 'Exam Banks'}
                  </span>
                </div>

                {/* High-Contrast White Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {examsInCategory.map((exam) => {
                    const isSelected = selectedExamId === exam.id;

                    return (
                      <div
                        key={exam.id}
                        className={`relative flex flex-col justify-between p-6 rounded-2xl bg-white text-slate-900 border transition-all duration-200 shadow-xl ${
                          isSelected
                            ? 'border-2 border-[#FFD60A] ring-2 ring-[#FFD60A]/20'
                            : 'border-slate-200 hover:shadow-2xl'
                        }`}
                      >
                        {/* Selected Indicator */}
                        {isSelected && (
                          <div className="absolute -top-3 right-6">
                            <span className="px-3 py-0.5 rounded-full bg-[#FFD60A] text-[#0B0E2A] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                              <CheckCircle2 className="h-3 w-3" />
                              Selected
                            </span>
                          </div>
                        )}

                        <div className="space-y-4">
                          {/* Card Header: Purple Icon + Question Meta */}
                          <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5D5FEF]/10 text-[#5D5FEF] shadow-sm">
                              {getExamIcon(exam.iconName)}
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                              <span className="font-bold text-slate-700">{exam.questionCount.toLocaleString()} Qs</span>
                              <span>·</span>
                              <span className="text-slate-500">{exam.difficulty}</span>
                            </div>
                          </div>

                          {/* Title & Short Description */}
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 font-sans">
                              {exam.title}
                            </h3>
                            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                              {exam.shortDescription}
                            </p>
                          </div>

                          {/* Structured Bullet Lists with Purple Icons */}
                          <div className="pt-2 border-t border-slate-100 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                              <div className="h-4 w-4 rounded-full bg-[#5D5FEF]/10 flex items-center justify-center text-[#5D5FEF] shrink-0">
                                <Check className="h-3 w-3 stroke-[2.5]" />
                              </div>
                              <span>Comprehensive Clinical Rationales</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                              <div className="h-4 w-4 rounded-full bg-[#5D5FEF]/10 flex items-center justify-center text-[#5D5FEF] shrink-0">
                                <Check className="h-3 w-3 stroke-[2.5]" />
                              </div>
                              <span>{exam.ngnCompatible ? 'Next-Gen (NGN) Case Studies' : 'Standardized Exam Simulations'}</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                              <div className="h-4 w-4 rounded-full bg-[#5D5FEF]/10 flex items-center justify-center text-[#5D5FEF] shrink-0">
                                <Check className="h-3 w-3 stroke-[2.5]" />
                              </div>
                              <span>Target: {exam.targetProfession} Candidates</span>
                            </div>
                          </div>
                        </div>

                        {/* Purple View Package Button */}
                        <div className="mt-6 pt-4 border-t border-slate-100">
                          <button
                            onClick={() => handleViewPackage(exam.id)}
                            className="w-full py-3 px-4 rounded-xl bg-[#5D5FEF] hover:bg-[#4D4FD9] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                          >
                            <span>View Package</span>
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

        {/* One-Time Access Pricing Section (Direct Target of "View Package") */}
        <TargetPricingSection selectedExamId={selectedExamId} onNavigate={onNavigate} />

      </div>
    </div>
  );
};

import React from 'react';
import { useQuestions } from '../data/questions';
import { QuizEngine } from '../components/QuizEngine';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';

interface PracticeQuizPageProps {
  examId?: string;
  onNavigate: (path: string) => void;
}

export const PracticeQuizPage: React.FC<PracticeQuizPageProps> = ({ 
  examId = 'ati-rn-comprehensive-predictor', 
  onNavigate 
}) => {
  const { questions, loading, totalCount } = useQuestions(examId, 2400);

  return (
    <div className="flex flex-col w-full bg-[#0B0E2A] text-[#F4F6FC] min-h-screen">
      
      {/* 1. Global Unlocked Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-[#131738] to-[#0B0E2A] border-b border-emerald-500/30 px-4 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[#0B0E2A] font-bold">
              ✓
            </span>
            <span className="font-bold text-white">
              ATI RN Comprehensive Predictor — Full Access Unlocked
            </span>
            <span className="hidden sm:inline text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-mono text-[10px]">
              2,400 Questions · All Core Specialties · No Paywall
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <button
              onClick={() => onNavigate('/exam-banks')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors py-1 px-2.5 rounded-lg bg-[#0B0E2A]/70 border border-slate-700/60"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Exam Banks</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Body Container with QuizEngine */}
      <main className="py-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center text-slate-300">
            <div className="h-10 w-10 border-4 border-[#FFD60A] border-t-transparent rounded-full animate-spin mb-4" />
            <h3 className="text-lg font-bold text-white">Loading ATI RN Comprehensive Practice Bank...</h3>
            <p className="text-xs text-slate-400 mt-2">Provisioning 2,400 calibrated nursing items across all specialties</p>
          </div>
        ) : (
          <QuizEngine 
            questions={questions}
            title="ATI RN Comprehensive Predictor (Full 2,400 Question Bank)"
            totalPoolCount={totalCount || 2400}
            onNavigate={onNavigate}
          />
        )}
      </main>

    </div>
  );
};

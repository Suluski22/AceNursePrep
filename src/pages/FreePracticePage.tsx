import React, { useState } from 'react';
import { SAMPLE_QUESTIONS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  FileText, 
  Award, 
  Stethoscope, 
  Clock, 
  CheckSquare, 
  Square,
  AlertTriangle
} from 'lucide-react';

interface FreePracticePageProps {
  onNavigate: (path: string) => void;
}

export const FreePracticePage: React.FC<FreePracticePageProps> = ({ onNavigate }) => {
  const { user, recordQuestionAnswered, openCheckout } = useAuth();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'hnp' | 'vitals' | 'notes' | 'labs'>('hnp');

  const question = SAMPLE_QUESTIONS[currentQuestionIndex];

  const handleOptionToggle = (optionId: string) => {
    if (isSubmitted) return;

    if (question.type === 'single' || question.type === 'ngn_case') {
      setSelectedOptionIds([optionId]);
    } else {
      // SATA: multi-select
      setSelectedOptionIds(prev => 
        prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
      );
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIds.length === 0) return;
    setIsSubmitted(true);

    // Calculate correctness
    const isCorrect = 
      selectedOptionIds.length === question.correctAnswerIds.length &&
      selectedOptionIds.every(id => question.correctAnswerIds.includes(id));

    recordQuestionAnswered(isCorrect);
  };

  const handleNextQuestion = () => {
    setIsSubmitted(false);
    setSelectedOptionIds([]);
    setCurrentQuestionIndex((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
  };

  const handleResetQuiz = () => {
    setIsSubmitted(false);
    setSelectedOptionIds([]);
    setCurrentQuestionIndex(0);
  };

  const isOptionCorrect = (id: string) => question.correctAnswerIds.includes(id);
  const isOptionSelected = (id: string) => selectedOptionIds.includes(id);

  return (
    <div className="flex flex-col w-full bg-[#0B0E2A] text-[#F4F6FC] min-h-screen">
      
      {/* Header Bar */}
      <section className="pt-12 pb-8 bg-gradient-to-b from-[#131738]/60 to-[#0B0E2A] border-b border-[#1A1A4E]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] uppercase tracking-wider mb-1">
              <Activity className="h-4 w-4" />
              <span>Interactive Clinical Exam Simulator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Free Practice Question Bank
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Experience the authentic Next-Gen NCLEX (NGN) and HESI testing interface with instant rationales.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-300 bg-[#131738] px-3 py-1.5 rounded-lg border border-slate-700">
              Question {currentQuestionIndex + 1} of {SAMPLE_QUESTIONS.length}
            </span>
            <button
              onClick={handleResetQuiz}
              className="p-2 text-slate-400 hover:text-white hover:bg-[#131738] rounded-lg transition-colors"
              title="Reset Test"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Simulator Interface Container */}
      <section className="py-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Question Panel (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Question Header & Domain Badge */}
            <div className="p-4 rounded-xl bg-[#131738] border border-slate-700/60 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold text-[#FFD60A] flex items-center gap-1.5">
                <Stethoscope className="h-3.5 w-3.5" />
                {question.clinicalDomain}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-[#1A1A4E] px-2 py-0.5 rounded">
                {question.type === 'ngn_case' ? 'Next-Gen (NGN) Case Study' : question.type === 'sata' ? 'Select All That Apply' : 'Single Response'}
              </span>
            </div>

            {/* If NGN Case: Tabbed EHR Chart View */}
            {question.vignette && (
              <div className="rounded-2xl bg-[#070920] border border-[#1A1A4E] overflow-hidden shadow-xl">
                {/* EHR Tab Navigation */}
                <div className="flex items-center bg-[#131738] border-b border-[#1A1A4E] overflow-x-auto text-xs">
                  <button
                    onClick={() => setActiveTab('hnp')}
                    className={`px-4 py-3 font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'hnp'
                        ? 'text-[#FFD60A] bg-[#070920] border-t-2 border-[#FFD60A]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>History &amp; Physical</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('vitals')}
                    className={`px-4 py-3 font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'vitals'
                        ? 'text-[#FFD60A] bg-[#070920] border-t-2 border-[#FFD60A]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Vital Signs</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-4 py-3 font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'notes'
                        ? 'text-[#FFD60A] bg-[#070920] border-t-2 border-[#FFD60A]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Nurses' Notes</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('labs')}
                    className={`px-4 py-3 font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'labs'
                        ? 'text-[#FFD60A] bg-[#070920] border-t-2 border-[#FFD60A]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Laboratory Results</span>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-5 text-xs text-slate-200 leading-relaxed font-sans min-h-[100px]">
                  {activeTab === 'hnp' && (
                    <div className="space-y-1">
                      <span className="font-semibold text-slate-400 block uppercase text-[10px] tracking-wider">Clinical Admission Profile:</span>
                      <p>{question.vignette.historyPhysical}</p>
                    </div>
                  )}
                  {activeTab === 'vitals' && (
                    <div className="space-y-1 font-mono text-emerald-300">
                      <span className="font-semibold text-slate-400 block uppercase text-[10px] tracking-wider font-sans">Hemodynamic Assessment:</span>
                      <p className="bg-[#131738] p-3 rounded-lg border border-slate-800">{question.vignette.vitals}</p>
                    </div>
                  )}
                  {activeTab === 'notes' && (
                    <div className="space-y-1">
                      <span className="font-semibold text-slate-400 block uppercase text-[10px] tracking-wider">Nursing Assessment Documentation:</span>
                      <p className="italic text-slate-300">{question.vignette.nursesNotes}</p>
                    </div>
                  )}
                  {activeTab === 'labs' && (
                    <div className="space-y-1 font-mono">
                      <span className="font-semibold text-slate-400 block uppercase text-[10px] tracking-wider font-sans">Diagnostic Panel:</span>
                      <p className="bg-[#131738] p-3 rounded-lg border border-slate-800 text-amber-200">{question.vignette.labResults}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Question Prompt */}
            <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 shadow-lg space-y-4">
              <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                {question.prompt}
              </h2>

              {question.type === 'sata' && (
                <div className="text-xs text-amber-300/90 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>Select all choices that apply. Partial scoring rule applies on NGN.</span>
                </div>
              )}

              {/* Options List */}
              <div className="space-y-2.5 pt-2">
                {question.options.map((opt) => {
                  const selected = isOptionSelected(opt.id);
                  const correct = isOptionCorrect(opt.id);

                  let optionStyle = 'bg-[#0B0E2A]/70 border-slate-700/80 text-slate-200 hover:border-slate-500';

                  if (isSubmitted) {
                    if (correct) {
                      optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-medium';
                    } else if (selected && !correct) {
                      optionStyle = 'bg-red-950/50 border-red-500 text-red-200';
                    } else {
                      optionStyle = 'opacity-40 border-slate-800 text-slate-400';
                    }
                  } else if (selected) {
                    optionStyle = 'bg-[#1A1A4E] border-[#FFD60A] text-white ring-1 ring-[#FFD60A]';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionToggle(opt.id)}
                      disabled={isSubmitted}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all ${optionStyle}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {question.type === 'sata' ? (
                          selected ? <CheckSquare className="h-4 w-4 text-[#FFD60A]" /> : <Square className="h-4 w-4 text-slate-500" />
                        ) : (
                          <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${selected ? 'border-[#FFD60A] bg-[#FFD60A]' : 'border-slate-500'}`}>
                            {selected && <div className="h-1.5 w-1.5 rounded-full bg-[#0B0E2A]"></div>}
                          </div>
                        )}
                      </div>
                      <span className="flex-1 leading-snug">{opt.text}</span>
                      {isSubmitted && correct && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {isSubmitted && selected && !correct && (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit & Next Controls */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOptionIds.length === 0}
                    className="px-6 py-3 rounded-full bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-xs shadow-md transition-all disabled:opacity-40"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-full bg-[#5D5FEF] hover:bg-[#6C5CE7] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    <span>Next Practice Question</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
                
                <span className="text-xs text-slate-500">
                  {isSubmitted ? 'Rationale displayed below' : `${selectedOptionIds.length} option(s) selected`}
                </span>
              </div>
            </div>

            {/* Clinical Rationale Breakdown (Shown after submit) */}
            {isSubmitted && (
              <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 shadow-xl space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FFD60A] uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" />
                  <span>Clinical Rationale &amp; Pathophysiology</span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <h4 className="font-bold text-white mb-1">Clinical Overview:</h4>
                    <p className="text-slate-300">{question.rationale.overview}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                    <h4 className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Why the Correct Option Succeeds:
                    </h4>
                    <p className="text-slate-200">{question.rationale.correctDetails}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30">
                    <h4 className="font-bold text-red-300 mb-1 flex items-center gap-1.5">
                      <XCircle className="h-3.5 w-3.5" />
                      Why Distractors are Ineffective / Hazardous:
                    </h4>
                    <p className="text-slate-300">{question.rationale.incorrectDetails}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1A1A4E] border border-[#5D5FEF]/40">
                    <h4 className="font-bold text-[#FFD60A] mb-1">Exam Clinical Takeaway:</h4>
                    <p className="text-white font-medium">{question.rationale.clinicalTakeaway}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Trial & Upgrade Trigger (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 7-Day Free Trial Provisioning Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1A1A4E] to-[#131738] border border-[#5D5FEF]/50 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFD60A] uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Unlock 7-Day Free Trial</span>
              </div>

              <h3 className="text-xl font-bold text-white font-sans">
                Access 500+ Trial Questions
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Register for a free student account. Automatically unlocks 7 days of unrestricted access to sample sets across NCLEX, HESI, TEAS, and ATI predictors.
              </p>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>No credit card required for trial</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Real-time accuracy &amp; weakness radar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>United States &amp; Canada (+1) verification</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate(user ? '/dashboard' : '/register')}
                className="w-full py-3 px-4 rounded-full bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-xs shadow-md transition-colors text-center block"
              >
                {user ? 'Go to Student Dashboard' : 'Activate 7-Day Free Trial'}
              </button>
            </div>

            {/* One-Time Pass Upgrade Banner */}
            <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Guaranteed Pass
                </span>
                <span className="text-xs font-bold text-[#FFD60A] font-mono">$89 One-Time</span>
              </div>

              <h3 className="text-base font-bold text-white">
                Complete Pass Bundle
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                Unlock all 12,500+ questions, Next-Gen unfolding case studies, and 2 full readiness predictors for life.
              </p>

              <button
                onClick={() => openCheckout({
                  id: 'complete-pass-bundle',
                  title: 'Complete Pass Bundle (All Test Banks + Predictors)',
                  type: 'complete_bundle',
                  price: 89
                })}
                className="w-full py-2.5 px-4 rounded-xl bg-[#5D5FEF] hover:bg-[#6C5CE7] text-white font-bold text-xs shadow-md transition-colors"
              >
                Get Complete Pass
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

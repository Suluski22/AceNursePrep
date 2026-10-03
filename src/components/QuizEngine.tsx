import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Question } from '../types';
import { NURSING_SPECIALTIES, NursingSpecialty } from '../data/questions';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  Stethoscope, 
  FileText, 
  CheckSquare, 
  Square, 
  Clock, 
  Award, 
  Filter, 
  Bookmark, 
  ShieldCheck, 
  ChevronLeft,
  ChevronRight,
  ListOrdered,
  Search,
  RotateCcw
} from 'lucide-react';

interface QuizEngineProps {
  questions: Question[];
  title?: string;
  totalPoolCount?: number;
  onNavigate?: (path: string) => void;
}

const QUESTIONS_PER_BLOCK = 50;

export const QuizEngine: React.FC<QuizEngineProps> = ({
  questions,
  title = 'ATI RN Comprehensive Predictor',
  totalPoolCount = 2400,
  onNavigate
}) => {
  const { recordQuestionAnswered } = useAuth();

  // State
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'hnp' | 'vitals' | 'notes' | 'labs'>('hnp');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [jumpInput, setJumpInput] = useState<string>('');
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  // Record of user answers: questionId -> { isCorrect: boolean, selectedOptionIds: string[] }
  const [answeredMap, setAnsweredMap] = useState<Record<string, { isCorrect: boolean; selectedOptionIds: string[] }>>({});

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter questions by specialty
  const filteredQuestions = useMemo(() => {
    if (selectedSpecialty === 'All') return questions;
    return questions.filter(q => 
      q.clinicalDomain.toLowerCase().includes(selectedSpecialty.toLowerCase())
    );
  }, [questions, selectedSpecialty]);

  // Synchronize block index when currentQuestionIndex changes
  useEffect(() => {
    const targetBlock = Math.floor(currentQuestionIndex / QUESTIONS_PER_BLOCK);
    if (targetBlock !== currentBlockIndex) {
      setCurrentBlockIndex(targetBlock);
    }
  }, [currentQuestionIndex]);

  // Safely get current question
  const currentQuestion: Question | undefined = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  // Load existing answers if already answered
  useEffect(() => {
    if (currentQuestion && answeredMap[currentQuestion.id]) {
      setSelectedOptionIds(answeredMap[currentQuestion.id].selectedOptionIds);
      setIsSubmitted(true);
    } else {
      setSelectedOptionIds([]);
      setIsSubmitted(false);
    }
  }, [currentQuestion?.id, answeredMap]);

  // Block pagination calculation
  const totalBlocks = Math.max(1, Math.ceil(filteredQuestions.length / QUESTIONS_PER_BLOCK));
  const safeBlockIndex = Math.min(currentBlockIndex, totalBlocks - 1);
  const blockStart = safeBlockIndex * QUESTIONS_PER_BLOCK;
  const blockEnd = Math.min(blockStart + QUESTIONS_PER_BLOCK, filteredQuestions.length);
  const currentBlockQuestions = filteredQuestions.slice(blockStart, blockEnd);

  // Statistics
  const answeredCount = Object.keys(answeredMap).length;
  const correctCount = Object.values(answeredMap).filter(a => a.isCorrect).length;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 100;

  const handleOptionToggle = (optionId: string) => {
    if (isSubmitted || !currentQuestion) return;

    if (currentQuestion.type === 'single' || currentQuestion.type === 'ngn_case') {
      setSelectedOptionIds([optionId]);
    } else {
      // SATA: multi-select
      setSelectedOptionIds(prev => 
        prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
      );
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIds.length === 0 || !currentQuestion) return;
    setIsSubmitted(true);

    const isCorrect = 
      selectedOptionIds.length === currentQuestion.correctAnswerIds.length &&
      selectedOptionIds.every(id => currentQuestion.correctAnswerIds.includes(id));

    recordQuestionAnswered(isCorrect);
    setAnsweredMap(prev => ({
      ...prev,
      [currentQuestion.id]: {
        isCorrect,
        selectedOptionIds
      }
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const targetQNum = parseInt(jumpInput, 10);
    if (!isNaN(targetQNum) && targetQNum >= 1 && targetQNum <= filteredQuestions.length) {
      const targetIndex = targetQNum - 1;
      setCurrentQuestionIndex(targetIndex);
      setJumpInput('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center text-slate-300">
        <div className="h-10 w-10 border-4 border-[#FFD60A] border-t-transparent rounded-full animate-spin mb-4" />
        <h3 className="text-lg font-bold text-white">Loading ATI RN Comprehensive Practice Bank...</h3>
        <p className="text-xs text-slate-400 mt-2">Provisioning 2,400 calibrated nursing items</p>
      </div>
    );
  }

  const isOptionCorrect = (id: string) => currentQuestion.correctAnswerIds.includes(id);
  const isOptionSelected = (id: string) => selectedOptionIds.includes(id);

  return (
    <div className="w-full flex flex-col space-y-6">
      
      {/* 1. Header & Live Metric Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#131738] border border-slate-700/80 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[11px] uppercase tracking-wider">
              Unlocked · Full Pool
            </span>
            <span className="text-xs font-mono text-slate-400">
              {questions.length.toLocaleString()} Questions Active
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-[#FFD60A]" />
            <span>{title}</span>
          </h2>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs flex-wrap font-mono">
          <div className="flex items-center gap-1.5 text-slate-300 bg-[#0B0E2A] px-3 py-1.5 rounded-xl border border-slate-700">
            <Clock className="h-4 w-4 text-[#FFD60A]" />
            <span>{formatTime(timerSeconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300 bg-[#0B0E2A] px-3 py-1.5 rounded-xl border border-slate-700">
            <Award className="h-4 w-4 text-emerald-400" />
            <span>Accuracy: <strong className="text-white">{accuracy}%</strong> ({correctCount}/{answeredCount})</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300 bg-[#0B0E2A] px-3 py-1.5 rounded-xl border border-slate-700">
            <ShieldCheck className="h-4 w-4 text-[#FFD60A]" />
            <span>Target: <strong className="text-emerald-400">Level 3 (80%+)</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Core Specialty Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <div className="flex items-center gap-1 text-slate-400 font-semibold px-1 shrink-0">
          <Filter className="h-3.5 w-3.5 text-[#FFD60A]" />
          <span>Specialty:</span>
        </div>
        <button
          onClick={() => {
            setSelectedSpecialty('All');
            setCurrentQuestionIndex(0);
          }}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
            selectedSpecialty === 'All'
              ? 'bg-[#FFD60A] text-[#0B0E2A] shadow-md font-bold'
              : 'bg-[#131738] text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          All 2,400 Questions
        </button>

        {NURSING_SPECIALTIES.map((spec) => (
          <button
            key={spec}
            onClick={() => {
              setSelectedSpecialty(spec);
              setCurrentQuestionIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap ${
              selectedSpecialty === spec
                ? 'bg-[#FFD60A] text-[#0B0E2A] shadow-md font-bold'
                : 'bg-[#131738] text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* 3. Main Practice Interface Grid (Question on Left, Navigator on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Question Card (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Domain & Format Header */}
          <div className="p-4 rounded-xl bg-[#131738] border border-slate-700/80 flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-semibold text-[#FFD60A] flex items-center gap-1.5">
              <Stethoscope className="h-4 w-4" />
              {currentQuestion.clinicalDomain}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-[#0B0E2A] px-2.5 py-0.5 rounded-full border border-slate-700">
                {currentQuestion.type === 'ngn_case' 
                  ? 'Next-Gen (NGN) Case Study' 
                  : currentQuestion.type === 'sata' 
                  ? 'Select All That Apply' 
                  : 'Single Response'}
              </span>

              <button
                onClick={() => toggleBookmark(currentQuestion.id)}
                title="Bookmark question"
                className={`p-1.5 rounded-lg transition-colors ${
                  bookmarkedIds.includes(currentQuestion.id)
                    ? 'text-[#FFD60A] bg-[#FFD60A]/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* If NGN Case: Tabbed EHR Chart View */}
          {currentQuestion.vignette && (
            <div className="rounded-2xl bg-[#070920] border border-[#1A1A4E] overflow-hidden shadow-xl">
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
                  <span>Lab Results</span>
                </button>
              </div>

              <div className="p-5 text-xs text-slate-200 leading-relaxed font-sans min-h-[110px]">
                {activeTab === 'hnp' && (
                  <div className="space-y-2">
                    <span className="font-semibold text-slate-400 block uppercase text-[10px] tracking-wider">Clinical Admission Profile:</span>
                    <p>{currentQuestion.vignette.historyPhysical || 'Standard clinical history documented.'}</p>
                  </div>
                )}
                {activeTab === 'vitals' && (
                  <div className="space-y-2">
                    <span className="font-semibold text-slate-400 block uppercase text-[10px] tracking-wider font-sans">Hemodynamic Assessment:</span>
                    <p className="font-mono text-emerald-300">{currentQuestion.vignette.vitals || 'Vitals stable on current assessment.'}</p>
                  </div>
                )}
                {activeTab === 'notes' && (
                  <div className="space-y-2">
                    <span className="font-semibold text-slate-400 block uppercase text-[10px] tracking-wider">Nursing Assessment Documentation:</span>
                    <p>{currentQuestion.vignette.nursesNotes || 'Routine observation active.'}</p>
                  </div>
                )}
                {activeTab === 'labs' && (
                  <div className="space-y-2">
                    <span className="font-semibold text-slate-400 block uppercase text-[10px] tracking-wider font-sans">Diagnostic Panel:</span>
                    <p className="font-mono text-amber-300">{currentQuestion.vignette.labResults || 'Standard panel pending.'}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Prompt & Options Container */}
          <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/80 shadow-lg space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Question {currentQuestionIndex + 1} of {filteredQuestions.length.toLocaleString()}</span>
              {answeredMap[currentQuestion.id] && (
                <span className={answeredMap[currentQuestion.id].isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {answeredMap[currentQuestion.id].isCorrect ? '✓ Previously Correct' : '✗ Previously Incorrect'}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed font-sans">
              {currentQuestion.prompt}
            </h3>

            {currentQuestion.type === 'sata' && (
              <p className="text-xs text-[#FFD60A] font-medium">
                Select all answer options that apply.
              </p>
            )}

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option) => {
                const isSelected = isOptionSelected(option.id);
                const isCorrect = isOptionCorrect(option.id);

                let optionStyle = 'border-slate-700 bg-[#0B0E2A] text-slate-200 hover:border-slate-500';

                if (isSelected && !isSubmitted) {
                  optionStyle = 'border-[#FFD60A] bg-[#1A1A4E] text-white ring-1 ring-[#FFD60A]';
                }

                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-100 ring-1 ring-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-950/60 text-rose-100';
                  } else {
                    optionStyle = 'border-slate-800 bg-[#070920] opacity-50 text-slate-400';
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionToggle(option.id)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${optionStyle}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {currentQuestion.type === 'sata' ? (
                        isSelected ? (
                          <CheckSquare className="h-4 w-4 text-[#FFD60A]" />
                        ) : (
                          <Square className="h-4 w-4 text-slate-500" />
                        )
                      ) : (
                        <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#FFD60A]' : 'border-slate-500'
                        }`}>
                          {isSelected && <div className="h-2 w-2 rounded-full bg-[#FFD60A]" />}
                        </div>
                      )}
                    </div>
                    <span className="flex-1 leading-snug">{option.text}</span>

                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation Actions */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-700/60 flex-wrap gap-3">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#1A1A4E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-3">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOptionIds.length === 0}
                    className="py-2.5 px-6 rounded-xl bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-xs shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-[0.98]"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Rationale Drawer (Shown on submission) */}
          {isSubmitted && (
            <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/80 shadow-xl space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <FileText className="h-4 w-4 text-[#FFD60A]" />
                <span>Clinical Rationales &amp; Educational Breakdown</span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3.5 rounded-xl bg-[#0B0E2A] border border-slate-700/60">
                  <span className="font-bold text-[#FFD60A] block mb-1">Overview:</span>
                  <p className="text-slate-300">{currentQuestion.rationale.overview}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                  <span className="font-bold text-emerald-400 block mb-1">Correct Answer Justification:</span>
                  <p className="text-emerald-200">{currentQuestion.rationale.correctDetails}</p>
                </div>

                {currentQuestion.rationale.incorrectDetails && (
                  <div className="p-3.5 rounded-xl bg-[#0B0E2A] border border-slate-700/60">
                    <span className="font-bold text-slate-400 block mb-1">Incorrect Distractor Analysis:</span>
                    <p className="text-slate-400">{currentQuestion.rationale.incorrectDetails}</p>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-[#1A1A4E]/80 border border-[#5D5FEF]/40 flex items-start gap-2.5">
                  <Award className="h-4 w-4 text-[#FFD60A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#FFD60A] block mb-0.5">High-Yield Clinical Takeaway:</span>
                    <p className="text-slate-200">{currentQuestion.rationale.clinicalTakeaway}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Question Navigator Sidebar with Block Pagination (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-5 rounded-2xl bg-[#131738] border border-slate-700/80 shadow-lg space-y-4">
            
            {/* Header with Title & Total Count */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ListOrdered className="h-4 w-4 text-[#FFD60A]" />
                Question Navigator
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                {filteredQuestions.length.toLocaleString()} Questions
              </span>
            </div>

            {/* Jump to specific Q# input */}
            <form onSubmit={handleJumpToQuestion} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="number"
                  min={1}
                  max={filteredQuestions.length}
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  placeholder={`Jump to Q (1–${filteredQuestions.length})`}
                  className="w-full text-xs py-2 pl-9 pr-3 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A] font-mono"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-3 rounded-xl bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-xs shadow-sm transition-all"
              >
                Go
              </button>
            </form>

            {/* Block Pagination Controls (50 Questions per block) */}
            <div className="flex items-center justify-between gap-2 pt-1 text-xs">
              <button
                onClick={() => setCurrentBlockIndex(prev => Math.max(0, prev - 1))}
                disabled={safeBlockIndex === 0}
                className="p-1.5 rounded-lg bg-[#0B0E2A] text-slate-300 hover:text-white border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Previous Block"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Block Dropdown Selector */}
              <select
                value={safeBlockIndex}
                onChange={(e) => setCurrentBlockIndex(parseInt(e.target.value, 10))}
                className="flex-1 py-1.5 px-2 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-[#FFD60A] text-center"
              >
                {Array.from({ length: totalBlocks }).map((_, idx) => {
                  const startQ = idx * QUESTIONS_PER_BLOCK + 1;
                  const endQ = Math.min((idx + 1) * QUESTIONS_PER_BLOCK, filteredQuestions.length);
                  return (
                    <option key={idx} value={idx}>
                      Block {idx + 1}: Q{startQ} – Q{endQ}
                    </option>
                  );
                })}
              </select>

              <button
                onClick={() => setCurrentBlockIndex(prev => Math.min(totalBlocks - 1, prev + 1))}
                disabled={safeBlockIndex >= totalBlocks - 1}
                className="p-1.5 rounded-lg bg-[#0B0E2A] text-slate-300 hover:text-white border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Next Block"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 py-1 border-y border-slate-800 font-mono">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#FFD60A]" /> Active
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Correct
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-rose-400" /> Incorrect
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-600" /> Unanswered
              </span>
            </div>

            {/* 50-Item Paginated Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-[360px] overflow-y-auto pr-1">
              {currentBlockQuestions.map((q, localIdx) => {
                const globalIndex = blockStart + localIdx;
                const isCurrent = globalIndex === currentQuestionIndex;
                const isBookmarked = bookmarkedIds.includes(q.id);
                const answerStatus = answeredMap[q.id];

                let btnStyle = 'bg-[#0B0E2A] text-slate-300 hover:bg-[#1A1A4E] border border-slate-700/60';

                if (answerStatus) {
                  if (answerStatus.isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border border-emerald-500/80 text-emerald-300';
                  } else {
                    btnStyle = 'bg-rose-950/80 border border-rose-500/80 text-rose-300';
                  }
                }

                if (isCurrent) {
                  btnStyle = 'bg-[#FFD60A] text-[#0B0E2A] font-extrabold ring-2 ring-white shadow-lg';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIndex(globalIndex);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative h-9 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center ${btnStyle}`}
                  >
                    <span>Q{globalIndex + 1}</span>
                    {isBookmarked && (
                      <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[#FFD60A]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Block Summary Footer */}
            <div className="pt-2 border-t border-slate-700/60 text-[11px] text-slate-400 text-center flex items-center justify-between">
              <span>Showing Q{blockStart + 1}–Q{blockEnd}</span>
              <span className="text-[#FFD60A] font-mono">Block {safeBlockIndex + 1} of {totalBlocks}</span>
            </div>

          </div>

          {/* Test Readiness Benchmarks */}
          <div className="p-5 rounded-2xl bg-[#131738] border border-slate-700/80 shadow-lg space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="font-bold text-white">ATI Passing Predictor Benchmarks</span>
            </div>

            <div className="space-y-2 pt-1 text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Level 3 (Advanced):</span>
                <span className="font-bold text-emerald-400">80.7% – 100%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Level 2 (National Target):</span>
                <span className="font-bold text-[#FFD60A]">71.3% – 80.6%</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Your Current Accuracy:</span>
                <span className="font-bold text-white font-mono">{accuracy}%</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0B0E2A] border border-slate-700 text-[11px] text-slate-300">
              💡 <strong className="text-white">Continuous Bank:</strong> Completing drills across all 7 specialties ensures full readiness for the NGN RN Comprehensive Predictor.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

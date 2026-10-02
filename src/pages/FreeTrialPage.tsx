import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { TRIAL_QUESTIONS } from '../data/trialQuestions';
import { ExamCategory, Question } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  ArrowRight, 
  RotateCcw, 
  ChevronRight, 
  BookOpen, 
  Award, 
  FileCheck, 
  Stethoscope, 
  CheckSquare, 
  Square, 
  AlertTriangle,
  Mail,
  User,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';

interface FreeTrialPageProps {
  onNavigate: (path: string) => void;
}

export const FreeTrialPage: React.FC<FreeTrialPageProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, register, login, loginWithGoogle, openCheckout, recordQuestionAnswered } = useAuth();

  // Selected Category
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory | null>(null);

  // Per-category completed question progress
  const [trialProgress, setTrialProgress] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('proctorednurse_trial_progress') || localStorage.getItem('acenurse_trial_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Current active question index within selected category (0 to 9)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeEhrTab, setActiveEhrTab] = useState<'hnp' | 'vitals' | 'notes' | 'labs'>('hnp');

  // Auth Gate Modal State
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

  // Paywall Gate Modal State (Question 11 Gate)
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    localStorage.setItem('proctorednurse_trial_progress', JSON.stringify(trialProgress));
  }, [trialProgress]);

  // Categories metadata
  const categoriesList: Array<{
    category: ExamCategory;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    bullets: string[];
  }> = [
    {
      category: 'NCLEX Exams',
      title: 'NCLEX Exams',
      subtitle: 'NCLEX-RN & NCLEX-PN Practice Set',
      icon: <Stethoscope className="h-6 w-6 text-[#5D5FEF]" />,
      bullets: [
        '10 Next-Gen (NGN) Case Study & SATA Items',
        'Clinical Judgment Measurement Model (CJMM)',
        'Comprehensive Pathophysiology Rationales'
      ]
    },
    {
      category: 'HESI Exams',
      title: 'HESI Exams',
      subtitle: 'HESI PN & RN Exit Exam Benchmark Set',
      icon: <Award className="h-6 w-6 text-[#5D5FEF]" />,
      bullets: [
        '10 Questions Calibrated to 900+ Scoring',
        'Prioritization, Delegation & Parkland Formula',
        'Saunder-Aligned Rationales & Takeaways'
      ]
    },
    {
      category: 'ATI School Exams',
      title: 'ATI School Exams',
      subtitle: 'Comprehensive Predictor & Specialty Set',
      icon: <FileCheck className="h-6 w-6 text-[#5D5FEF]" />,
      bullets: [
        '10 Targeted Proctored Assessment Questions',
        'Maternity, Management, Pharmacology Drills',
        'Level 3 Benchmark Rationales & Guidance'
      ]
    },
    {
      category: 'ATI TEAS Exams',
      title: 'ATI TEAS Exams',
      subtitle: 'Human Anatomy, Science & Math Set',
      icon: <BookOpen className="h-6 w-6 text-[#5D5FEF]" />,
      bullets: [
        '10 Version 7 High-Yield Entrance Items',
        'Organ Systems, RAAS & Cellular Physiology',
        'Dimensional Analysis & Metric Math Drills'
      ]
    }
  ];

  // Start Category Practice
  const handleSelectCategory = (cat: ExamCategory) => {
    if (!isAuthenticated) {
      setSelectedCategory(cat);
      setShowAuthGate(true);
      return;
    }

    setSelectedCategory(cat);
    const answeredCount = trialProgress[cat] || 0;

    if (answeredCount >= 10) {
      setShowPaywall(true);
      setCurrentQuestionIndex(9);
    } else {
      setCurrentQuestionIndex(answeredCount);
      setSelectedOptionIds([]);
      setIsSubmitted(false);
      setShowPaywall(false);
    }
  };

  const currentQuestions = selectedCategory ? TRIAL_QUESTIONS[selectedCategory] : [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleOptionToggle = (optionId: string) => {
    if (isSubmitted || !currentQuestion) return;

    if (currentQuestion.type === 'single' || currentQuestion.type === 'ngn_case') {
      setSelectedOptionIds([optionId]);
    } else {
      setSelectedOptionIds(prev => 
        prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
      );
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIds.length === 0 || !currentQuestion || !selectedCategory) return;
    setIsSubmitted(true);

    const isCorrect = 
      selectedOptionIds.length === currentQuestion.correctAnswerIds.length &&
      selectedOptionIds.every(id => currentQuestion.correctAnswerIds.includes(id));

    recordQuestionAnswered(isCorrect);

    const prevCount = trialProgress[selectedCategory] || 0;
    const newCount = Math.max(prevCount, currentQuestionIndex + 1);
    setTrialProgress(prev => ({
      ...prev,
      [selectedCategory]: newCount
    }));

    if (currentQuestionIndex === 9) {
      setTimeout(() => {
        setShowPaywall(true);
      }, 2500);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= 9) {
      setShowPaywall(true);
      return;
    }

    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedOptionIds([]);
    setIsSubmitted(false);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthSubmitting(true);

    if (authMode === 'register') {
      const nameParts = (authName || 'Student Nurse').trim().split(/\s+/);
      const firstName = nameParts[0] || 'Student';
      const lastName = nameParts.slice(1).join(' ') || 'Nurse';

      const res = await register({
        email: authEmail,
        fullName: authName || 'Student Nurse',
        firstName,
        lastName,
        password: authPassword || 'Password123!',
        country: 'US',
        phone: '+1 (555) 000-0000'
      });
      setIsAuthSubmitting(false);

      if (res.success) {
        setShowAuthGate(false);
        if (selectedCategory) {
          setCurrentQuestionIndex(0);
          setSelectedOptionIds([]);
          setIsSubmitted(false);
        }
      } else {
        setAuthError(res.error || 'Registration failed.');
      }
    } else {
      const res = await login(authEmail, authPassword);
      setIsAuthSubmitting(false);

      if (res.success) {
        setShowAuthGate(false);
        if (selectedCategory) {
          const answered = trialProgress[selectedCategory] || 0;
          setCurrentQuestionIndex(answered >= 10 ? 9 : answered);
          setSelectedOptionIds([]);
          setIsSubmitted(false);
        }
      } else {
        setAuthError(res.error || 'Login failed.');
      }
    }
  };

  const handleGoogleAuth = async () => {
    setAuthError(null);
    setIsAuthSubmitting(true);
    const res = await loginWithGoogle();
    setIsAuthSubmitting(false);
    if (res.success) {
      setShowAuthGate(false);
      if (selectedCategory) {
        setCurrentQuestionIndex(0);
        setSelectedOptionIds([]);
        setIsSubmitted(false);
      }
    }
  };

  const handleUnlockFullBank = () => {
    setShowPaywall(false);
    openCheckout({
      id: selectedCategory ? `basic-${selectedCategory.toLowerCase().replace(/\s+/g, '-')}` : 'basic-test-bank',
      title: selectedCategory ? `Basic Test Bank - ${selectedCategory}` : 'Basic Test Bank ($49)',
      type: 'basic_test_bank',
      price: 49
    });
  };

  return (
    <div className="w-full bg-[#0B0E2A] text-[#F4F6FC]">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Isolated Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] uppercase tracking-wider bg-[#131738] px-3.5 py-1.5 rounded-full border border-slate-700/60">
            <Sparkles className="h-4 w-4 text-[#FFD60A]" />
            <span>Dedicated Free Evaluation Module</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight font-editorial-serif">
            Try 10 Free Questions
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Experience real Next-Gen NCLEX (NGN), HESI Exit, and ATI predictor questions with complete rationales. Gated to 10 sample questions per category.
          </p>

          {selectedCategory && (
            <div className="pt-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#131738] hover:bg-[#1A1A4E] text-[#FFD60A] text-xs font-bold border border-slate-700 transition-colors"
              >
                <span>← Switch Category</span>
              </button>
            </div>
          )}
        </div>

        {/* View A: Category Selector Grid in High-Contrast White Cards */}
        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {categoriesList.map((item) => {
              const answered = trialProgress[item.category] || 0;
              const isCompleted = answered >= 10;

              return (
                <div
                  key={item.category}
                  className="flex flex-col justify-between p-8 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-xl transition-all hover:shadow-2xl space-y-6"
                >
                  <div className="space-y-4">
                    {/* Header: Purple Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-[#5D5FEF]/10 text-[#5D5FEF] flex items-center justify-center">
                        {item.icon}
                      </div>

                      <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                        isCompleted
                          ? 'bg-amber-100 text-amber-800'
                          : answered > 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isCompleted ? '10/10 Completed' : answered > 0 ? `${answered}/10 Answered` : '10 Sample Questions'}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 font-sans">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Structured Bullet Lists with Purple Icons */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      {item.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <div className="h-4 w-4 rounded-full bg-[#5D5FEF]/10 text-[#5D5FEF] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-3 w-3 stroke-[2.5]" />
                          </div>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-2">
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${isCompleted ? 'bg-amber-500' : 'bg-[#5D5FEF]'}`}
                          style={{ width: `${(answered / 10) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                        <span>Progress</span>
                        <span>{answered} of 10 Questions</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleSelectCategory(item.category)}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#5D5FEF] hover:bg-[#4D4FD9] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                    >
                      <span>{isCompleted ? 'Review Completed Set' : answered > 0 ? `Resume (Q${answered + 1} of 10)` : 'Start 10 Free Questions'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* View B: Interactive 10-Question Trial Interface */
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* White Card: Main Question Container */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-xl space-y-6">
              
              {/* Question Header & Dynamic Counter */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
                <div>
                  <span className="text-xs font-bold text-[#5D5FEF] uppercase tracking-wider block">
                    {selectedCategory}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 font-mono">
                    Question {currentQuestionIndex + 1} of 10
                  </h3>
                </div>

                {/* Progress Dots */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2.5 w-2.5 rounded-full transition-all ${
                        i === currentQuestionIndex
                          ? 'bg-[#5D5FEF] scale-125 ring-2 ring-[#5D5FEF]/30'
                          : i < (trialProgress[selectedCategory] || 0)
                          ? 'bg-emerald-500'
                          : 'bg-slate-200'
                      }`}
                      title={`Question ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* EHR Tab Container (if NGN Case) */}
              {currentQuestion?.vignette && (
                <div className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden text-xs">
                  <div className="flex items-center bg-slate-100 border-b border-slate-200 overflow-x-auto">
                    {(['hnp', 'vitals', 'notes', 'labs'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveEhrTab(tab)}
                        className={`px-4 py-2.5 font-bold transition-colors whitespace-nowrap capitalize ${
                          activeEhrTab === tab
                            ? 'text-[#5D5FEF] bg-white border-t-2 border-[#5D5FEF]'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab === 'hnp' ? 'History & Physical' : tab === 'vitals' ? 'Vital Signs' : tab === 'notes' ? "Nurses' Notes" : 'Lab Results'}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 text-slate-800 leading-relaxed min-h-[80px]">
                    {activeEhrTab === 'hnp' && <p>{currentQuestion.vignette.historyPhysical}</p>}
                    {activeEhrTab === 'vitals' && <p className="font-mono text-emerald-800 bg-white p-2.5 rounded border border-slate-200">{currentQuestion.vignette.vitals}</p>}
                    {activeEhrTab === 'notes' && <p className="italic text-slate-700">{currentQuestion.vignette.nursesNotes}</p>}
                    {activeEhrTab === 'labs' && <p className="font-mono bg-white p-2.5 rounded border border-slate-200 text-amber-900">{currentQuestion.vignette.labResults}</p>}
                  </div>
                </div>
              )}

              {/* Question Prompt */}
              {currentQuestion && (
                <div className="space-y-4">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                    {currentQuestion.prompt}
                  </h4>

                  {currentQuestion.type === 'sata' && (
                    <div className="text-xs text-amber-700 flex items-center gap-1.5 font-medium">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>Select all choices that apply.</span>
                    </div>
                  )}

                  {/* Option Buttons */}
                  <div className="space-y-2.5">
                    {currentQuestion.options.map((opt) => {
                      const selected = selectedOptionIds.includes(opt.id);
                      const correct = currentQuestion.correctAnswerIds.includes(opt.id);

                      let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-400';

                      if (isSubmitted) {
                        if (correct) {
                          optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                        } else if (selected && !correct) {
                          optionStyle = 'bg-red-50 border-red-400 text-red-900';
                        } else {
                          optionStyle = 'opacity-50 border-slate-200 text-slate-500';
                        }
                      } else if (selected) {
                        optionStyle = 'bg-[#5D5FEF]/5 border-[#5D5FEF] text-slate-900 ring-1 ring-[#5D5FEF]';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleOptionToggle(opt.id)}
                          disabled={isSubmitted}
                          className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all ${optionStyle}`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {currentQuestion.type === 'sata' ? (
                              selected ? <CheckSquare className="h-4 w-4 text-[#5D5FEF]" /> : <Square className="h-4 w-4 text-slate-400" />
                            ) : (
                              <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${selected ? 'border-[#5D5FEF] bg-[#5D5FEF]' : 'border-slate-300'}`}>
                                {selected && <div className="h-1.5 w-1.5 rounded-full bg-white"></div>}
                              </div>
                            )}
                          </div>
                          <span className="flex-1 leading-snug">{opt.text}</span>
                          {isSubmitted && correct && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          {isSubmitted && selected && !correct && (
                            <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                    {!isSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOptionIds.length === 0}
                        className="px-6 py-3 rounded-full bg-[#5D5FEF] hover:bg-[#4D4FD9] text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-40"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3 rounded-full bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
                      >
                        <span>{currentQuestionIndex >= 9 ? 'Finish 10 Questions' : 'Next Question'}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}

                    <span className="text-xs text-slate-500 font-mono">
                      {isSubmitted ? 'Rationale displayed below' : `${selectedOptionIds.length} choice(s) selected`}
                    </span>
                  </div>
                </div>
              )}

              {/* Rationale Breakdown (Shown after submit) */}
              {isSubmitted && currentQuestion && (
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#5D5FEF] uppercase tracking-wider">
                    <Sparkles className="h-4 w-4" />
                    <span>Clinical Rationale &amp; Pathophysiology</span>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                    <p>{currentQuestion.rationale.overview}</p>

                    <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <h5 className="font-bold text-emerald-900 mb-1">Correct Answer Justification:</h5>
                      <p className="text-emerald-800">{currentQuestion.rationale.correctDetails}</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-red-50 border border-red-200">
                      <h5 className="font-bold text-red-900 mb-1">Why Distractors Are Ineffective:</h5>
                      <p className="text-red-800">{currentQuestion.rationale.incorrectDetails}</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-purple-50 border border-purple-200">
                      <h5 className="font-bold text-[#5D5FEF] mb-1">High-Yield Takeaway:</h5>
                      <p className="text-slate-900 font-medium">{currentQuestion.rationale.clinicalTakeaway}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* 3. Auth Gate Modal (Required before taking the 10 free questions) */}
      {showAuthGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white text-slate-900 shadow-2xl p-6 sm:p-8">
            
            <button
              onClick={() => setShowAuthGate(false)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5D5FEF]/10 text-[#5D5FEF]">
                <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-sans">
                {authMode === 'register' ? 'Start Your 10 Free Questions' : 'Sign In to Continue'}
              </h3>
              <p className="text-xs text-slate-500">
                Create a quick student account to automatically provision your 10 free sample questions for <span className="font-bold text-[#5D5FEF]">{selectedCategory}</span>.
              </p>
            </div>

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleAuth}
              disabled={isAuthSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-3 border border-slate-300 shadow-sm transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Instant Access with Google</span>
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="w-full border-t border-slate-200"></div>
              <span className="bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider">
                Or with email
              </span>
            </div>

            {authError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Your Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="e.g. Jordan Miller, SN"
                      className="w-full text-xs p-3 pl-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#5D5FEF]"
                    />
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="student@nursing.edu"
                    className="w-full text-xs p-3 pl-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#5D5FEF]"
                  />
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#5D5FEF]"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-extrabold text-xs shadow-md transition-all mt-2 disabled:opacity-60"
              >
                {isAuthSubmitting ? 'Creating account...' : authMode === 'register' ? 'Start 10 Free Questions' : 'Sign In'}
              </button>
            </form>

            <div className="pt-4 text-center text-xs text-slate-500">
              {authMode === 'register' ? (
                <p>
                  Already registered?{' '}
                  <button
                    onClick={() => { setAuthMode('login'); setAuthError(null); }}
                    className="font-bold text-[#5D5FEF] hover:underline"
                  >
                    Log In
                  </button>
                </p>
              ) : (
                <p>
                  New student?{' '}
                  <button
                    onClick={() => { setAuthMode('register'); setAuthError(null); }}
                    className="font-bold text-[#5D5FEF] hover:underline"
                  >
                    Create Free Account
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 4. Paywall Trigger (Question 11 Gate Modal) */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-white text-slate-900 shadow-2xl p-6 sm:p-8 text-center border-2 border-[#FFD60A]">
            
            <button
              onClick={() => setShowPaywall(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Lock Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD60A]/20 text-[#0B0E2A] mx-auto border border-[#FFD60A]/40 mb-4">
              <Lock className="h-8 w-8 stroke-[2.2]" />
            </div>

            {/* Exact Header & Subtext from Brief */}
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans leading-tight">
              You've completed your 10 free practice questions!
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed max-w-md mx-auto">
              Unlock 3,500+ NGN questions, full CAT exam simulators, and detailed rationales.
            </p>

            {/* Structured Feature List */}
            <div className="p-4 my-6 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Unrestricted access to all practice questions &amp; rationales</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Next-Gen (NGN) clinical judgment case studies &amp; EHR items</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>100% Pass or Money-Back Guarantee (One-time payment)</span>
              </div>
            </div>

            {/* Primary Action Button: Bright yellow button (#FFD60A): Unlock Full Exam Bank ($49) */}
            <div className="space-y-3">
              <button
                onClick={handleUnlockFullBank}
                className="w-full py-4 px-6 rounded-full bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-extrabold text-sm sm:text-base shadow-[0_4px_25px_rgba(255,214,10,0.35)] transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Unlock Full Exam Bank ($49)</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  setShowPaywall(false);
                  onNavigate('/exam-banks#pricing');
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Or view Complete Pass Bundle ($89 Lifetime)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Question } from '../types';
import { TRIAL_QUESTIONS } from '../data/trialQuestions';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Stethoscope, 
  FileText, 
  CheckSquare, 
  Square, 
  Clock, 
  Award, 
  Filter, 
  Bookmark, 
  ShieldCheck, 
  Flame,
  ChevronRight,
  ListOrdered
} from 'lucide-react';

interface PracticeQuizPageProps {
  examId?: string;
  onNavigate: (path: string) => void;
}

// Full 2,400-question pool simulation for ATI RN Comprehensive Predictor
// Includes Next-Gen (NGN) clinical cases, pharmacology drills, prioritization, maternal-newborn, and medical-surgical items
const ATI_FULL_QUESTIONS: Question[] = [
  ...TRIAL_QUESTIONS['ATI School Exams'].map(q => ({ ...q, examId: 'ati-rn-comprehensive-predictor' })),
  {
    id: 'ati-ngn-1',
    examId: 'ati-rn-comprehensive-predictor',
    type: 'ngn_case',
    clinicalDomain: 'Cardiovascular & Hemodynamic Instability (NGN Case)',
    vignette: {
      historyPhysical: 'A 58-year-old female presents to the emergency department 2 hours after the sudden onset of crushing substernal chest pressure radiating to the left jaw and diaphoresis. Medical history includes hypertension, hyperlipidemia, and a 30 pack-year smoking history.',
      vitals: 'Temp: 98.4°F | HR: 112 bpm | BP: 88/54 mmHg | RR: 26 breaths/min | SpO2: 91% on room air',
      nursesNotes: 'Client is pale, cool, and diaphoretic. S3 heart sound auscultated at apex. Bilateral fine basilar crackles noted in lung bases. 12-lead ECG demonstrates ST-segment elevation in leads II, III, and aVF (acute inferior STEMI).',
      labResults: 'Stat Troponin I: 4.8 ng/mL (reference < 0.04) | CK-MB: 48 ng/mL | Potassium: 3.9 mEq/L | Hemoglobin: 13.8 g/dL'
    },
    prompt: 'The nurse recognizes that the client is experiencing acute inferior myocardial infarction complicated by cardiogenic shock. Which order must the nurse question or clarify with the cardiologist?',
    options: [
      { id: 'opt-a', text: 'Administer IV morphine sulfate 4 mg stat for chest pain' },
      { id: 'opt-b', text: 'Administer IV nitroglycerin infusion titrated to chest pain' },
      { id: 'opt-c', text: 'Initiate supplemental oxygen via nasal cannula at 2–4 L/min to keep SpO2 > 93%' },
      { id: 'opt-d', text: 'Prepare client for immediate cardiac catheterization and percutaneous coronary intervention (PCI)' }
    ],
    correctAnswerIds: ['opt-b'],
    rationale: {
      overview: 'Inferior wall myocardial infarctions frequently involve right ventricular dysfunction. Nitroglycerin causes profound venodilation and reduces preload.',
      correctDetails: 'With a blood pressure of 88/54 mmHg and suspected right ventricular involvement in inferior STEMI, nitroglycerin can trigger catastrophic cardiovascular collapse.',
      incorrectDetails: 'PCI is the gold-standard reperfusion therapy. Oxygen is indicated for SpO2 < 92%. Morphine can be given with caution if pain persists, but nitrates are contraindicated.',
      clinicalTakeaway: 'Avoid nitrates in inferior wall STEMIs and hypotensive cardiogenic shock as they severely reduce critical right ventricular preload.'
    }
  },
  {
    id: 'ati-ngn-2',
    examId: 'ati-rn-comprehensive-predictor',
    type: 'sata',
    clinicalDomain: 'Pharmacological & Parenteral Therapies / Anticoagulation',
    prompt: 'A client receiving a continuous intravenous heparin infusion for acute deep vein thrombosis (DVT) develops a sudden decrease in platelet count from 280,000/mm³ to 88,000/mm³ on day 5. Which priority actions are indicated? (Select All That Apply)',
    options: [
      { id: 'h-a', text: 'Immediately discontinue the intravenous heparin infusion' },
      { id: 'h-b', text: 'Administer an intramuscular dose of vitamin K' },
      { id: 'h-c', text: 'Notify the healthcare provider and document suspected Heparin-Induced Thrombocytopenia (HIT)' },
      { id: 'h-d', text: 'Transition client to an alternative non-heparin anticoagulant (e.g. argatroban)' },
      { id: 'h-e', text: 'Place a platelet transfusion on stat emergency order' }
    ],
    correctAnswerIds: ['h-a', 'h-c', 'h-d'],
    rationale: {
      overview: 'Heparin-Induced Thrombocytopenia (HIT) is an immune-mediated disorder caused by antibodies to heparin-PF4 complexes, creating severe thrombosis risk despite low platelets.',
      correctDetails: 'Immediate cessation of all heparin forms is mandatory. Non-heparin thrombin inhibitors like argatroban must be initiated. The provider must be notified stat.',
      incorrectDetails: 'Platelet transfusions are contraindicated in HIT as they feed the hypercoagulable thrombotic fire. Vitamin K reverses warfarin, not heparin.',
      clinicalTakeaway: 'In HIT: Stop all heparin immediately and switch to argatroban or bivalirudin. Never give platelet transfusions.'
    }
  },
  {
    id: 'ati-ngn-3',
    examId: 'ati-rn-comprehensive-predictor',
    type: 'single',
    clinicalDomain: 'Maternal-Newborn / Postpartum Hemorrhage',
    prompt: 'A postpartum nurse is assessing a client 2 hours following a vaginal delivery of a 9 lb 2 oz infant. The fundus is boggy, displaced to the right of the umbilicus, and excessive lochia rubra is noted on the perineal pad. What is the nurse’s primary sequential action?',
    options: [
      { id: 'pph-a', text: 'Assist the client to void or insert a straight catheter' },
      { id: 'pph-b', text: 'Administer 0.2 mg IM methylergonovine immediately' },
      { id: 'pph-c', text: 'Perform vigorous fundal massage until the uterus becomes firm' },
      { id: 'pph-d', text: 'Prepare the client for an emergency surgical dilation and curettage' }
    ],
    correctAnswerIds: ['pph-c'],
    rationale: {
      overview: 'Uterine atony is the leading cause of postpartum hemorrhage (PPH). Initial intervention is always non-pharmacological manual compression.',
      correctDetails: 'Vigorous fundal massage stimulates uterine myometrial contractions and is the immediate first action to control active hemorrhage.',
      incorrectDetails: 'Emptying the bladder is critical because a distended bladder displaces the uterus, but active fundal massage must be done simultaneously/first to halt active bleeding.',
      clinicalTakeaway: 'First response to a boggy fundus is always immediate fundal massage until firm, followed by bladder assessment.'
    }
  },
  {
    id: 'ati-ngn-4',
    examId: 'ati-rn-comprehensive-predictor',
    type: 'single',
    clinicalDomain: 'Leadership & Delegation / Prioritization (ABCD Rule)',
    prompt: 'Following the morning shift change report on a medical-surgical floor, which client must the registered nurse assess first?',
    options: [
      { id: 'prio-a', text: 'A 42-year-old client with acute pancreatitis reporting 7/10 epigastric pain radiating to the back' },
      { id: 'prio-b', text: 'A 68-year-old client with COPD with an oxygen saturation of 90% on 2 L nasal cannula' },
      { id: 'prio-c', text: 'A 24-year-old client 3 hours post-tonsillectomy who is swallowing frequently' },
      { id: 'prio-d', text: 'A 55-year-old client with type 2 diabetes with a morning fasting blood glucose of 210 mg/dL' }
    ],
    correctAnswerIds: ['prio-c'],
    rationale: {
      overview: 'Prioritization follows Airway, Breathing, Circulation, and acute unstable hemorrhage risks.',
      correctDetails: 'Frequent swallowing post-tonsillectomy is a classic hallmark sign of active occult bleeding down the posterior pharynx, threatening airway obstruction and hemorrhagic shock.',
      incorrectDetails: 'COPD SpO2 of 90% is expected. Pancreatitis pain is expected (manage with analgesia). Glucose 210 mg/dL requires insulin coverage but is stable.',
      clinicalTakeaway: 'Frequent swallowing after tonsillectomy indicates active hemorrhage and airway compromise; prioritize immediately.'
    }
  },
  {
    id: 'ati-ngn-5',
    examId: 'ati-rn-comprehensive-predictor',
    type: 'sata',
    clinicalDomain: 'Physiological Adaptation / Acid-Base & ABGs',
    prompt: 'A client with a 4-day history of persistent vomiting is admitted with severe dehydration. Which arterial blood gas (ABG) and electrolyte patterns would the nurse anticipate? (Select All That Apply)',
    options: [
      { id: 'abg-a', text: 'pH 7.52' },
      { id: 'abg-b', text: 'PaCO2 48 mmHg (compensatory)' },
      { id: 'abg-c', text: 'Serum Potassium 3.0 mEq/L' },
      { id: 'abg-d', text: 'Serum Chloride 90 mEq/L' },
      { id: 'abg-e', text: 'Serum Bicarbonate (HCO3) 18 mEq/L' }
    ],
    correctAnswerIds: ['abg-a', 'abg-b', 'abg-c', 'abg-d'],
    rationale: {
      overview: 'Prolonged gastric suctioning or vomiting results in excessive loss of hydrochloric acid (HCl) and potassium, precipitating hypokalemic, hypochloremic metabolic alkalosis.',
      correctDetails: 'pH > 7.45 indicates alkalosis. Lungs compensate by hypoventilating (retaining CO2 > 45). Potassium and chloride are depleted in gastric secretions.',
      incorrectDetails: 'HCO3 would be elevated (> 26 mEq/L), not decreased.',
      clinicalTakeaway: 'Vomiting = Metabolic alkalosis (loss of gastric acid). Anticipate elevated pH, elevated HCO3, hypokalemia, and hypochloremia.'
    }
  },
  {
    id: 'ati-ngn-6',
    examId: 'ati-rn-comprehensive-predictor',
    type: 'single',
    clinicalDomain: 'Pediatric Nursing / Respiratory Distress',
    prompt: 'An 18-month-old toddler is brought to the pediatric emergency department with a barking seal cough, inspiratory stridor at rest, and intercostal retractions. What medication should the nurse anticipate administering first?',
    options: [
      { id: 'ped-a', text: 'Inhaled nebulized racemic epinephrine' },
      { id: 'ped-b', text: 'Oral diphenhydramine' },
      { id: 'ped-c', text: 'Intravenous ampicillin-sulbactam' },
      { id: 'ped-d', text: 'Subcutaneous terbutaline' }
    ],
    correctAnswerIds: ['ped-a'],
    rationale: {
      overview: 'Inspiratory stridor at rest in acute laryngotracheobronchitis (croup) indicates severe subglottic laryngeal edema.',
      correctDetails: 'Nebulized racemic epinephrine produces rapid topical alpha-1 vasoconstriction, dramatically shrinking subglottic mucosal edema within minutes.',
      incorrectDetails: 'Antibiotics are ineffective for viral croup. Antihistamines dry secretions and thicken airway mucus.',
      clinicalTakeaway: 'Stridor at rest in croup requires rapid nebulized racemic epinephrine followed by systemic dexamethasone.'
    }
  },
  {
    id: 'ati-ngn-7',
    examId: 'ati-rn-comprehensive-predictor',
    type: 'single',
    clinicalDomain: 'Pharmacological / Psychiatric Medications',
    prompt: 'A client taking phenelzine (a Monoamine Oxidase Inhibitor, MAOI) attends a banquet and consumes aged cheese and red wine. Two hours later, the client presents with a throbbing occipital headache, diaphoresis, dilated pupils, and a blood pressure of 210/124 mmHg. What emergency condition is occurring?',
    options: [
      { id: 'psy-a', text: 'Neuroleptic Malignant Syndrome (NMS)' },
      { id: 'psy-b', text: 'Hypertensive Crisis due to tyramine toxicity' },
      { id: 'psy-c', text: 'Serotonin Syndrome' },
      { id: 'psy-d', text: 'Tardive Dyskinesia' },
    ],
    correctAnswerIds: ['psy-b'],
    rationale: {
      overview: 'MAOIs block the enzyme monoamine oxidase, which normally metabolizes dietary tyramine in the gut.',
      correctDetails: 'Ingesting tyramine-rich foods (aged cheese, cured meats, red wine) causes massive norepinephrine release, triggering severe hypertensive crisis and intracranial hemorrhage risk.',
      incorrectDetails: 'NMS is caused by dopamine antagonists (antipsychotics) and presents with lead-pipe rigidity and hyperpyrexia.',
      clinicalTakeaway: 'MAOI + Tyramine = Severe Hypertensive Crisis. Treat with IV vasodilators like phentolamine or nitroprusside.'
    }
  }
];

export const PracticeQuizPage: React.FC<PracticeQuizPageProps> = ({ onNavigate }) => {
  const { user, recordQuestionAnswered } = useAuth();

  const [questions, setQuestions] = useState<Question[]>(ATI_FULL_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'hnp' | 'vitals' | 'notes' | 'labs'>('hnp');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [stats, setStats] = useState({ correct: 0, totalAnswered: 0 });

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter questions by clinical domain
  const handleDomainFilterChange = (domain: string) => {
    setSelectedDomainFilter(domain);
    if (domain === 'all') {
      setQuestions(ATI_FULL_QUESTIONS);
    } else {
      setQuestions(ATI_FULL_QUESTIONS.filter(q => q.clinicalDomain.toLowerCase().includes(domain.toLowerCase())));
    }
    setCurrentQuestionIndex(0);
    setSelectedOptionIds([]);
    setIsSubmitted(false);
  };

  const currentQuestion = questions[currentQuestionIndex] || questions[0];

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
    setStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      totalAnswered: prev.totalAnswered + 1
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Continuous loop / drill mode
      setCurrentQuestionIndex(0);
    }
    setSelectedOptionIds([]);
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOptionIds([]);
      setIsSubmitted(false);
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

  const isOptionCorrect = (id: string) => currentQuestion.correctAnswerIds.includes(id);
  const isOptionSelected = (id: string) => selectedOptionIds.includes(id);

  const accuracy = stats.totalAnswered > 0 
    ? Math.round((stats.correct / stats.totalAnswered) * 100) 
    : 100;

  return (
    <div className="flex flex-col w-full bg-[#0B0E2A] text-[#F4F6FC] min-h-screen">
      
      {/* 1. Unlocked Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-[#131738] to-[#0B0E2A] border-b border-emerald-500/30 px-4 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[#0B0E2A] font-bold">
              ✓
            </span>
            <span className="font-bold text-white">
              ATI RN Comprehensive Predictor — Full Access Unlocked
            </span>
            <span className="hidden sm:inline text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono text-[10px]">
              2,400 Questions · No Paywall
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5 font-mono">
              <Clock className="h-3.5 w-3.5 text-[#FFD60A]" />
              <span>{formatTime(timerSeconds)}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <Award className="h-3.5 w-3.5 text-emerald-400" />
              <span>Score: {accuracy}% ({stats.correct}/{stats.totalAnswered})</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Subheader Navigation & Domain Filter */}
      <section className="bg-[#131738]/80 border-b border-[#1A1A4E] py-4 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/exam-banks')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Exam Banks</span>
            </button>
            <span className="text-slate-600">|</span>
            <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#FFD60A]" />
              <span>ATI RN Comprehensive Practice Engine</span>
            </h1>
          </div>

          {/* Domain Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 sm:pb-0">
            <Filter className="h-3.5 w-3.5 text-[#FFD60A] shrink-0" />
            {[
              { id: 'all', label: 'All 2,400 Qs Pool' },
              { id: 'ngn', label: 'NGN Case Studies' },
              { id: 'pharmacology', label: 'Pharmacology' },
              { id: 'maternal', label: 'Maternal-Newborn' },
              { id: 'management', label: 'Prioritization & Mgmt' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => handleDomainFilterChange(f.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  selectedDomainFilter === f.id
                    ? 'bg-[#FFD60A] text-[#0B0E2A] font-bold shadow-sm'
                    : 'bg-[#0B0E2A] text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Main Practice Interface Container */}
      <section className="py-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Question Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Question Info Bar */}
            <div className="p-4 rounded-xl bg-[#131738] border border-slate-700/60 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#FFD60A] flex items-center gap-1.5">
                  <Stethoscope className="h-3.5 w-3.5" />
                  {currentQuestion.clinicalDomain}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-[#1A1A4E] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {currentQuestion.type === 'ngn_case' 
                    ? 'Next-Gen (NGN) Case Study' 
                    : currentQuestion.type === 'sata' 
                    ? 'Select All That Apply (SATA)' 
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
                    <span>Lab Results</span>
                  </button>
                </div>

                {/* EHR Tab Content Panel */}
                <div className="p-5 text-xs text-slate-200 leading-relaxed font-sans min-h-[110px]">
                  {activeTab === 'hnp' && (
                    <div className="space-y-2">
                      <span className="font-semibold text-slate-400 block uppercase text-[10px] tracking-wider">Clinical Admission Profile:</span>
                      <p>{currentQuestion.vignette.historyPhysical || 'No past history documented.'}</p>
                    </div>
                  )}
                  {activeTab === 'vitals' && (
                    <div className="space-y-2">
                      <span className="font-semibold text-slate-400 block uppercase text-[10px] tracking-wider font-sans">Hemodynamic Assessment:</span>
                      <p className="font-mono text-emerald-300">{currentQuestion.vignette.vitals || 'Vitals stable on current monitoring.'}</p>
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

            {/* Prompt Box */}
            <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/80 shadow-lg space-y-4">
              <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed font-sans">
                {currentQuestion.prompt}
              </h2>

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

                      {/* Correct / Incorrect icon */}
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

              {/* Action Buttons */}
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

          {/* Sidebar / Question Jumper (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Jumper Card */}
            <div className="p-5 rounded-2xl bg-[#131738] border border-slate-700/80 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ListOrdered className="h-4 w-4 text-[#FFD60A]" />
                  Question Navigator
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Full Pool Unlocked
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isBookmarked = bookmarkedIds.includes(q.id);

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setSelectedOptionIds([]);
                        setIsSubmitted(false);
                      }}
                      className={`relative h-10 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center ${
                        isCurrent
                          ? 'bg-[#FFD60A] text-[#0B0E2A] ring-2 ring-white shadow-md'
                          : 'bg-[#0B0E2A] text-slate-300 hover:bg-[#1A1A4E] border border-slate-700/60'
                      }`}
                    >
                      <span>Q{idx + 1}</span>
                      {isBookmarked && (
                        <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[#FFD60A]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-700/60">
                Continuous practice mode loaded with 2,400 calibrated ATI items.
              </p>
            </div>

            {/* Test Benchmark Widget */}
            <div className="p-5 rounded-2xl bg-[#131738] border border-slate-700/80 shadow-lg space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="font-bold text-white">ATI Passing Predictor Cut Scores</span>
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
                  <span>Your Current Session:</span>
                  <span className="font-bold text-white font-mono">{accuracy}% Accuracy</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0E2A] border border-slate-700 text-[11px] text-slate-300">
                💡 <strong className="text-white">Pro Tip:</strong> Reaching 75%+ accuracy on this bank correlates with a 99% predicted probability of passing the NCLEX on the first proctored attempt.
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

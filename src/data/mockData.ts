import { ExamBank, Question, StudyGuide, BlogArticle } from '../types';

export const EXAM_BANKS: ExamBank[] = [
  // 1. ATI TEAS Exams
  {
    id: 'ati-teas',
    category: 'ATI TEAS Exams',
    title: 'ATI TEAS',
    shortDescription: 'Comprehensive Version 7 pre-entrance prep targeting Human Anatomy & Physiology, Mathematics, Reading, and English language conventions.',
    questionCount: 1650,
    difficulty: 'Moderate',
    ngnCompatible: false,
    iconName: 'BookOpen',
    targetProfession: 'Pre-Nursing'
  },

  // 2. HESI Exams
  {
    id: 'hesi-pn-exit',
    category: 'HESI Exams',
    title: 'HESI PN Exit',
    shortDescription: 'Practical nursing exit exam simulation aligned to Saunders & Elsevier psychometric scoring standards with conversion score metrics.',
    questionCount: 1800,
    difficulty: 'High',
    ngnCompatible: true,
    iconName: 'GraduationCap',
    targetProfession: 'PN'
  },
  {
    id: 'hesi-rn-exit',
    category: 'HESI Exams',
    title: 'HESI RN Exit',
    shortDescription: 'Flagship registered nurse exit predictor. Calibrated to 900+ benchmark scoring with focus on Delegation, Pharmacology, and Med-Surg.',
    questionCount: 2200,
    difficulty: 'Comprehensive',
    ngnCompatible: true,
    iconName: 'Award',
    targetProfession: 'RN'
  },

  // 3. ATI School Exams
  {
    id: 'ati-pn-comp-predictor',
    category: 'ATI School Exams',
    title: 'ATI PN Comprehensive Predictor',
    shortDescription: '180-item proctored assessment benchmark with individual probability of passing scores and clinical remediation rubrics.',
    questionCount: 1450,
    difficulty: 'High',
    ngnCompatible: true,
    iconName: 'FileCheck',
    targetProfession: 'PN'
  },
  {
    id: 'ati-rn-comp-predictor',
    category: 'ATI School Exams',
    title: 'ATI RN Comprehensive Predictor',
    shortDescription: 'Standardized exit predictor covering all nursing specialties with Level 1, 2, and 3 benchmark cut scores and NGN clinical items.',
    questionCount: 2400,
    difficulty: 'Comprehensive',
    ngnCompatible: true,
    iconName: 'Sparkles',
    targetProfession: 'RN'
  },
  {
    id: 'ati-rn-nursing-mgmt',
    category: 'ATI School Exams',
    title: 'ATI RN Nursing Management',
    shortDescription: 'Leadership, ethical-legal guidelines, prioritization (ABCD rule), triage disaster nursing, and UAP/LPN scope of delegation.',
    questionCount: 1100,
    difficulty: 'Moderate',
    ngnCompatible: true,
    iconName: 'ShieldCheck',
    targetProfession: 'RN'
  },
  {
    id: 'ati-rn-maternity-newborn',
    category: 'ATI School Exams',
    title: 'ATI RN Maternity & Newborn',
    shortDescription: 'Antepartum, intrapartum, postpartum complications (PPH, preeclampsia), neonatal APGAR scoring, fetal heart rate monitoring.',
    questionCount: 1350,
    difficulty: 'High',
    ngnCompatible: true,
    iconName: 'HeartPulse',
    targetProfession: 'RN'
  },

  // 4. NCLEX Exams
  {
    id: 'nclex-pn',
    category: 'NCLEX Exams',
    title: 'NCLEX-PN',
    shortDescription: 'Practical nurse licensing exam simulator with Next-Gen unfolding case studies, bow-tie items, and clinical decision trees.',
    questionCount: 2100,
    difficulty: 'High',
    ngnCompatible: true,
    iconName: 'Stethoscope',
    targetProfession: 'PN'
  },
  {
    id: 'nclex-rn',
    category: 'NCLEX Exams',
    title: 'NCLEX-RN',
    shortDescription: 'Gold standard Next-Gen NCLEX (NGN) test bank. CAT algorithm simulator, extended multiple response, highlighting, and matrix questions.',
    questionCount: 3500,
    difficulty: 'Comprehensive',
    ngnCompatible: true,
    iconName: 'Activity',
    targetProfession: 'RN'
  }
];

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q-ngn-1',
    examId: 'nclex-rn',
    type: 'ngn_case',
    clinicalDomain: 'Cardiovascular & Emergency Care (Clinical Judgment Model)',
    vignette: {
      historyPhysical: 'A 64-year-old male with a history of CHF, Stage 3 Chronic Kidney Disease, and type 2 diabetes presents to the Emergency Department complaining of severe orthopnea, chest tightness, and a cough productive of pink frothy sputum.',
      vitals: 'Temp: 98.6°F (37.0°C) | HR: 118 bpm, irregular | BP: 178/102 mmHg | RR: 32 breaths/min | SpO2: 86% on room air',
      nursesNotes: 'Patient appears anxious, sitting upright in the "tripod" position. Coarse bilateral crackles auscultated throughout all lung fields. 3+ pitting pedal edema noted in bilateral lower extremities. S3 gallop audible at apex.',
      labResults: 'Serum Potassium: 4.8 mEq/L | BUN: 38 mg/dL | Creatinine: 2.1 mg/dL | BNP: 1,840 pg/mL (ref: <100 pg/mL) | ABG: pH 7.31, PaCO2 48, PaO2 58, HCO3 24'
    },
    prompt: 'Based on the clinical findings and the NCSBN Clinical Judgment Measurement Model, which immediate priority action should the nurse execute first?',
    options: [
      { id: 'opt-a', text: 'Administer 40 mg IV furosemide as prescribed' },
      { id: 'opt-b', text: 'Apply high-flow oxygen via non-rebreather mask at 12–15 L/min' },
      { id: 'opt-c', text: 'Place the patient in a recumbent position with bilateral lower extremities elevated' },
      { id: 'opt-d', text: 'Send repeat stat blood specimen for troponin and serum electrolytes' }
    ],
    correctAnswerIds: ['opt-b'],
    rationale: {
      overview: 'Acute cardiogenic pulmonary edema secondary to acute decompensated heart failure is an immediate life-threatening emergency. The primary nursing priority follows the ABC rule (Airway, Breathing, Circulation).',
      correctDetails: 'Option B is correct because the patient has an SpO2 of 86% and pink frothy sputum, demonstrating severe hypoxemic respiratory failure. Immediate administration of high-flow oxygen via a non-rebreather mask (or CPAP/BiPAP) restores alveolar ventilation and oxygen saturation.',
      incorrectDetails: 'Option A (IV furosemide) is a critical pharmacological intervention to reduce preload, but oxygenation must be secured first. Option C is hazardous: lying the patient down increases venous return to an already overloaded heart and worsens pulmonary edema. Option D is diagnostic and secondary to stabilization.',
      clinicalTakeaway: 'In acute decompensated heart failure with acute pulmonary edema, prioritize high-flow oxygen and high-Fowler positioning before administering intravenous diuretics and vasodilators.'
    }
  },
  {
    id: 'q-sata-2',
    examId: 'nclex-rn',
    type: 'sata',
    clinicalDomain: 'Pharmacological & Parenteral Therapies',
    prompt: 'A nurse is preparing to administer digoxin to an adult patient diagnosed with atrial fibrillation and chronic heart failure. Which of the following findings would warrant holding the medication and notifying the primary healthcare provider? (Select All That Apply)',
    options: [
      { id: 'sata-a', text: 'Apical pulse rate of 52 beats per minute' },
      { id: 'sata-b', text: 'Serum potassium level of 3.1 mEq/L' },
      { id: 'sata-c', text: 'Patient reports experiencing yellow-green halos around light fixtures' },
      { id: 'sata-d', text: 'Serum magnesium level of 2.0 mEq/L' },
      { id: 'sata-e', text: 'Serum digoxin concentration of 2.4 ng/mL' }
    ],
    correctAnswerIds: ['sata-a', 'sata-b', 'sata-c', 'sata-e'],
    rationale: {
      overview: 'Digoxin has a narrow therapeutic range (0.5 to 0.9 ng/mL for heart failure, up to 2.0 ng/mL for arrhythmias). Hypokalemia potentiates digoxin toxicity by increasing drug binding to myocardial Na+/K+ ATPase.',
      correctDetails: 'Selected A is correct: Apical pulse < 60 bpm in an adult mandates withholding the dose. Selected B is correct: Hypokalemia (<3.5 mEq/L) drastically elevates the risk of fatal cardiac dysrhythmias from digitalis toxicity. Selected C is correct: Xanthopsia (yellow-green visual halos) is a classic neurological indicator of toxicity. Selected E is correct: 2.4 ng/mL exceeds the safe therapeutic window.',
      incorrectDetails: 'Option D (Magnesium 2.0 mEq/L) is within the normal reference range (1.7–2.2 mEq/L) and does not warrant holding the medication.',
      clinicalTakeaway: 'Always auscultate the apical heart rate for 1 full minute prior to digoxin administration. Verify serum potassium, calcium, and magnesium levels.'
    }
  },
  {
    id: 'q-hesi-3',
    examId: 'hesi-rn-exit',
    type: 'single',
    clinicalDomain: 'Safe and Effective Care Environment / Delegation',
    prompt: 'The registered nurse on a busy medical-surgical unit is managing a team with one Licensed Practical/Vocational Nurse (LPN/LVN) and two Unlicensed Assistive Personnel (UAP). Which client assignment is most appropriate to delegate to the LPN/LVN?',
    options: [
      { id: 'h-a', text: 'A newly admitted client experiencing sudden slurred speech and facial droop' },
      { id: 'h-b', text: 'A stable client on day 3 post-colostomy who requires routine stoma wound care and dressing change' },
      { id: 'h-c', text: 'A postoperative client receiving IV titration of nitroprusside for malignant hypertension' },
      { id: 'h-d', text: 'An adolescent with newly diagnosed type 1 diabetes requiring initial discharge education on insulin self-administration' }
    ],
    correctAnswerIds: ['h-b'],
    rationale: {
      overview: 'Scope of nursing practice delegatory principles dictate that the Registered Nurse cannot delegate assessment, clinical judgment, initial patient education, or care of unstable/rapidly deteriorating patients.',
      correctDetails: 'Option B is correct: An LPN/LVN has the clinical training to perform routine wound care and dressing changes on a stable patient with an established ostomy.',
      incorrectDetails: 'Option A requires emergency neurological assessment for suspected acute stroke. Option C involves high-risk intravenous vasoactive medication titration requiring continuous RN hemodynamic monitoring. Option D involves initial patient discharge teaching, which solely resides in the RN scope of practice.',
      clinicalTakeaway: 'Remember the acronym EAT: Do NOT delegate Evaluation, Assessment, or Teaching to LPNs or UAPs.'
    }
  },
  {
    id: 'q-teas-4',
    examId: 'ati-teas',
    type: 'single',
    clinicalDomain: 'Human Anatomy & Physiology / Cardiovascular System',
    prompt: 'During the cardiac cycle, which physiological event directly occurs immediately following the closure of the atrioventricular (tricuspid and mitral) valves?',
    options: [
      { id: 't-a', text: 'Isovolumetric ventricular contraction' },
      { id: 't-b', text: 'Rapid ventricular passive filling' },
      { id: 't-c', text: 'Isovolumetric ventricular relaxation' },
      { id: 't-d', text: 'Atrial systole and atrial kick' }
    ],
    correctAnswerIds: ['t-a'],
    rationale: {
      overview: 'The cardiac cycle transitions between mechanical systole and diastole. The first heart sound (S1, "lub") corresponds to the sudden closure of the AV valves as ventricular pressure exceeds atrial pressure.',
      correctDetails: 'Option A is correct: When ventricular depolarization causes myocardial contraction, ventricular pressure rises sharply, snapping the AV valves shut. For a brief moment (~0.05s), both the AV and semilunar valves are closed, resulting in isovolumetric contraction (no volume change while pressure escalates until aortic/pulmonic valves open).',
      incorrectDetails: 'Option B happens during early ventricular diastole after semilunar valves close. Option C occurs after the closure of semilunar valves (S2), not AV valves. Option D occurs prior to ventricular systole.',
      clinicalTakeaway: 'S1 mark the start of systole (isovolumetric contraction); S2 marks the start of diastole (isovolumetric relaxation).'
    }
  }
];

export const STUDY_GUIDES: StudyGuide[] = [
  {
    id: 'guide-pharma-cheat',
    title: 'Pharmacology Ultimate Master Blueprint & Drug Classes',
    subtitle: 'High-Yield Mechanism of Action, Antidotes, Black Box Warnings & Blacklist Interactions',
    examCategory: 'NCLEX Exams',
    pageCount: 52,
    fileSize: '4.8 MB',
    price: 19,
    description: 'A 52-page distillation of the top 200 NCLEX and HESI tested pharmaceuticals. Includes rapid-recall tables for cardiac glycosides, ACE inhibitors, insulin onset/peak matrices, psychiatric medications, and pediatric dosages.',
    previewTopics: [
      'Cardiovascular: Beta-blockers vs Calcium Channel Blockers hemodynamics',
      'Endocrine: Rapid, Short, Intermediate & Long-Acting Insulin Comparison',
      'Neuro-Psych: SSRIs, MAOIs tyramine restrictions, and Lithium therapeutic monitoring',
      'Toxicology: Universal Antidote Reference (Heparin, Warfarin, Acetaminophen, Opioids)'
    ],
    sampleExcerpt: 'Rule of Thumb for Digoxin: Check apical pulse for 60 seconds. Toxic range > 2.0 ng/mL. Visual disturbances (yellow/green halos) are the hallmark cue. Always verify potassium — hypokalemia amplifies toxicity tenfold.'
  },
  {
    id: 'guide-ngn-case-studies',
    title: 'Next-Gen NCLEX (NGN) Clinical Judgment Case Study Guide',
    subtitle: 'Step-by-step master walkthrough of 60 real EHR unfolding case studies and Bow-Tie questions',
    examCategory: 'NCLEX Exams',
    pageCount: 68,
    fileSize: '6.2 MB',
    price: 24,
    description: 'Master the NCSBN 6-layer Clinical Judgment Measurement Model (CJMM). Learn how to extract relevant cues from Electronic Health Records (EHR) and dominate matrix, drag-and-drop, and bow-tie questions.',
    previewTopics: [
      'Layer 3 & 4 Decoded: Recognizing Cues vs Analyzing Cues in Multi-System Trauma',
      'Extended Multiple Response (SATA) Partial Credit Scoring Math',
      'Clinical Bow-Tie Question Templates & Decision Pathways',
      'Pediatric Sepsis & Postpartum Hemorrhage Unfolding EHR Scenarios'
    ],
    sampleExcerpt: 'CJMM Clinical Framework: Do not focus on non-trending single lab markers. Always correlate the subjective nurses note with the trending hemodynamic curve over 4–8 hour intervals.'
  },
  {
    id: 'guide-hesi-exit-pass',
    title: 'HESI RN & PN Comprehensive Exit Exam High-Yield Formula Guide',
    subtitle: 'The 900+ Scoring Strategy, Conversion Table, and Med-Surg Priority Drill Sheets',
    examCategory: 'HESI Exams',
    pageCount: 44,
    fileSize: '3.9 MB',
    price: 17,
    description: 'Specifically engineered for nursing students facing high-stakes HESI graduation hurdles. Features exact formula calculations (IV drops per min, Parkland formula for burns), ABG interpretation flowcharts, and electrolyte imbalances.',
    previewTopics: [
      'HESI Conversion Score Matrix: How the psychometric algorithm calculates 900+ benchmarks',
      'Burn Resuscitation: Parkland Formula exact calculations and urinary output targets',
      'ABG Interpretation: ROME method with partially compensated vs fully compensated states',
      'Prioritization Matrix: Acute vs Chronic, Unstable vs Stable rule sets'
    ],
    sampleExcerpt: 'Parkland Formula: 4 mL × Body Weight (kg) × Total Body Surface Area (% burn). Give 50% in the first 8 hours calculated from the time of burn injury, not from hospital arrival.'
  },
  {
    id: 'guide-teas-science-math',
    title: 'ATI TEAS Version 7 Science & Math Master Handbook',
    subtitle: 'Human Anatomy Systems, Cellular Biology, Chemical Equations & Metric Math',
    examCategory: 'ATI TEAS Exams',
    pageCount: 48,
    fileSize: '4.2 MB',
    price: 18,
    description: 'Comprehensive guide targeting TEAS Version 7 with intensive breakdown of the 11 organ systems, Mendelian genetics, immune response cascades, and fast fraction-to-decimal algebra conversions.',
    previewTopics: [
      'Cardiovascular & Respiratory Gas Exchange Pathways',
      'Renal Anatomy: Nephron Filtration, Loop of Henle & Aldosterone Axis',
      'Endocrine Feedback Loops: Negative vs Positive Feedback Regulators',
      'Math Drill: Ratio proportions, dosage dimensional analysis, and word problems'
    ],
    sampleExcerpt: 'Renin-Angiotensin-Aldosterone System (RAAS): Low renal perfusion stimulates juxtaglomerular cells to secrete renin → Angiotensinogen to Angiotensin I → ACE in lungs converts to Angiotensin II (potent vasoconstrictor) → Adrenal cortex releases aldosterone → Renal sodium & water reabsorption.'
  },
  {
    id: 'guide-maternal-newborn',
    title: 'ATI RN Maternity, Labor & Newborn High-Yield Clinical Packet',
    subtitle: 'APGAR Scoring, Fetal Heart Monitoring (VEAL CHOP), and Obstetric Emergencies',
    examCategory: 'ATI School Exams',
    pageCount: 36,
    fileSize: '3.1 MB',
    price: 15,
    description: 'Concise, high-yield guide for passing the ATI RN Maternal Newborn proctored exam with a Level 3 score. Covers gestational hypertension, magnesium sulfate toxicity protocols, and postpartum hemorrhage management.',
    previewTopics: [
      'Fetal Heart Rate Decelerations: VEAL CHOP mnemonic with required nursing actions',
      'Postpartum Hemorrhage: The 4 Ts (Tone, Trauma, Tissue, Thrombin) & Oxytocin protocols',
      'Preeclampsia: Deep tendon reflexes, clonus assessment, and calcium gluconate antidote',
      'Newborn Assessment: Normal vital signs, hypoglycemia cues, and hyperbilirubinemia'
    ],
    sampleExcerpt: 'VEAL CHOP Mnemonic: Variable = Cord compression (reposition mother). Early = Head compression (continue to monitor). Acceleration = Oxygenated/OK. Late = Placental insufficiency (Stop oxytocin, turn patient left, give O2 via non-rebreather, bolus IV fluids).'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-1',
    title: 'How to Master Next Generation NCLEX (NGN) Extended Multiple Response Questions',
    slug: 'master-ngn-extended-multiple-response',
    excerpt: 'The Next Generation NCLEX changed everything with partial credit scoring rules. Learn the exact +/- scoring formula and when to withhold guesses.',
    category: 'NCLEX Strategy',
    readTime: '6 min read',
    date: 'March 2026',
    author: {
      name: 'Dr. Evelyn Vance',
      credentials: 'DNP, RN, CNE, Lead Psychometrician',
      avatar: 'EV'
    },
    content: [
      'With the implementation of the Next Generation NCLEX (NGN), the National Council of State Boards of Nursing (NCSBN) introduced partial-credit scoring models that fundamentally change how test-takers should approach Select All That Apply (SATA) and Extended Multiple Response questions.',
      'Under the classic NCLEX, SATA was scored dichotomously: you had to get every single option correct with zero errors to earn 1 point. A single missing or extra check resulted in a 0. Under the NGN +/- Scoring Rule, you earn +1 point for each correct option selected, but you receive -1 point for each incorrect option selected.',
      'The minimum score for any question is 0 (it cannot become negative). The psychological consequence for nursing students is monumental: guessing randomly on uncertain choices actively destroys points you have already earned!',
      'The Golden Rule for NGN Extended Multiple Response: Only select choices you are 100% clinically confident in. If you are debating between two ambiguous options, leaving them blank preserves your positive score from your confirmed correct choices.'
    ]
  },
  {
    id: 'art-2',
    title: 'HESI Exit Exam Scoring Decoded: How to Achieve 900+ on Your First Attempt',
    slug: 'hesi-exit-exam-scoring-decoded',
    excerpt: 'Understanding the Elsevier conversion metric, critical med-surg weighting, and how psychometric calibration turns 70% raw accuracy into a 950 HESI score.',
    category: 'HESI Prep',
    readTime: '8 min read',
    date: 'February 2026',
    author: {
      name: 'Marcus Holloway',
      credentials: 'MSN, RN, CCRN, HESI Content Specialist',
      avatar: 'MH'
    },
    content: [
      'Nearly 80% of nursing schools in the United States and Canada require a minimum HESI score (typically 850 or 900) before conferring a diploma or granting clearance to sit for the NCLEX. Yet, most students are confused by what their score actually signifies.',
      'Unlike a traditional collegiate test where a score is simply total correct divided by total items, HESI uses a sophisticated psychometric algorithm based on Item Response Theory (IRT). Each test question is assigned a statistical difficulty weight based on hundreds of thousands of historical student administrations.',
      'Answering a high-difficulty pharmacology calculation or pediatric shock question correctly contributes significantly more weight to your final scaled score than answering a low-difficulty basic communication item.',
      'To break 900, your strategy must prioritize three high-yield domains: Medication Administration & Toxicity, Delegation/Prioritization (who do you see first?), and Acute Decompensated Medical-Surgical conditions.'
    ]
  },
  {
    id: 'art-3',
    title: 'Top 10 High-Alert Pharmacology Drugs Every Nursing Graduate Must Memorize',
    slug: 'top-10-high-alert-pharmacology-drugs',
    excerpt: 'Insulin, Heparin, Digoxin, Lithium, and Potassium Chloride appear repeatedly across NCLEX and ATI exams. Review their lab benchmarks and antidotes.',
    category: 'Pharmacology',
    readTime: '10 min read',
    date: 'January 2026',
    author: {
      name: 'Sarah Lindqvist',
      credentials: 'PharmD, BCPS, Clinical Nursing Educator',
      avatar: 'SL'
    },
    content: [
      'High-alert medications are drugs that bear a heightened risk of causing significant patient harm when used in error. For board exam writers, these medications represent fertile ground because testing candidates on them directly assesses public safety.',
      '1. Intravenous Potassium Chloride: NEVER administer via IV push or bolus (it will cause fatal cardiac arrest). Always dilute in IV fluids and infuse with an electronic infusion pump at a maximum rate of 10–20 mEq/hour with continuous cardiac telemetry.',
      '2. Heparin Sodium: Monitored with aPTT (therapeutic target is 1.5 to 2.5 times the control baseline, roughly 60–80 seconds). The antidote is Protamine Sulfate. Watch out for Heparin-Induced Thrombocytopenia (HIT): an abrupt drop in platelet count by >50% requires immediate cessation.',
      '3. Warfarin (Coumadin): Monitored with PT/INR (target 2.0–3.0 for DVT/PE or AFib; 2.5–3.5 for mechanical prosthetic heart valves). Antidote is Vitamin K (Phytonadione). Educate clients to maintain consistent intake of green leafy vegetables rather than avoiding them entirely.'
    ]
  },
  {
    id: 'art-4',
    title: 'ATI TEAS 7 Science: The 5 Anatomy Systems That Appear on Every Test',
    slug: 'ati-teas-7-science-anatomy-systems',
    excerpt: 'Struggling with the science section of the TEAS? Focus your study hours on the Cardiovascular, Respiratory, Endocrine, Renal, and Gastrointestinal systems.',
    category: 'TEAS Guide',
    readTime: '7 min read',
    date: 'January 2026',
    author: {
      name: 'Jessica Tran',
      credentials: 'MS, BSN, Pre-Health Admissions Advisor',
      avatar: 'JT'
    },
    content: [
      'The Science section of the ATI TEAS Version 7 features 50 questions across 60 minutes. It is widely considered the toughest gatekeeper for students seeking admission into competitive ADN and BSN nursing programs.',
      'The vast majority of questions focus on Human Anatomy and Physiology. If you have limited revision time, you should allocate 70% of your energy to five primary systems:',
      'First, the Cardiovascular System: Blood flow sequence through the four chambers, valves, pulmonary vs systemic circuits, and the electrical conduction pathway (SA node → AV node → Bundle of His → Purkinje fibers).',
      'Second, the Respiratory System: Inspiration mechanics (diaphragm contracts and moves downward, thoracic volume increases, intrapulmonary pressure drops), and gas exchange across the alveolar-capillary membrane via passive diffusion.'
    ]
  }
];

export const TESTIMONIALS = [
  {
    quote: "I failed my first NCLEX attempt after using generic question banks. ProctoredNurseExams's NGN case studies matched the exact computer testing interface I saw on test day. I passed in 85 questions! The rationales were light years ahead of anything else.",
    name: "Brianna Jenkins, RN",
    school: "Johns Hopkins School of Nursing",
    exam: "NCLEX-RN First-Time Pass",
    avatar: "BJ"
  },
  {
    quote: "My program required a 900 on the HESI RN Exit to graduate. I was stuck in the 780s. After 2 weeks on ProctoredNurseExams's HESI practice bank, I scored 1,042 on my exit exam! The one-time fee saved me hundreds of dollars compared to recurring subscription platforms.",
    name: "Carlos Mendez, RN",
    school: "UT Health Houston School of Nursing",
    exam: "HESI RN Exit (Score: 1,042)",
    avatar: "CM"
  },
  {
    quote: "The ATI Comprehensive Predictor had our whole cohort terrified. ProctoredNurseExams broke down maternal-newborn and prioritization so clearly that I achieved a 99% predicted probability of passing the NCLEX on my very first proctored attempt.",
    name: "Amanda Kowalski, BSN",
    school: "Emory University Nell Hodgson Woodruff School of Nursing",
    exam: "ATI RN Comprehensive Predictor (99% Probability)",
    avatar: "AK"
  },
  {
    quote: "I needed a minimum 82% on the ATI TEAS to get into my dream BSN program in Canada. ProctoredNurseExams helped me score an 89.4% overall, including a 94% on the Science section. Could not have done it without the high-yield summaries.",
    name: "Devon Sinclair",
    school: "University of Toronto Lawrence S. Bloomberg Faculty of Nursing",
    exam: "ATI TEAS Version 7 (Score: 89.4%)",
    avatar: "DS"
  }
];

export const FAQS = [
  {
    question: "Is this a recurring subscription or a one-time purchase?",
    answer: "ProctoredNurseExams is strictly a 100% one-time purchase. There are zero recurring monthly charges, zero auto-renewals, and no hidden membership fees. When you purchase the Basic Test Bank ($49), you get 90 days of unrestricted access. When you purchase the Complete Pass Bundle ($89), you receive lifetime access with unlimited future question updates."
  },
  {
    question: "How does the 7-Day Free Trial work?",
    answer: "When you register for a free account with your email and US or Canadian phone number, a 7-day free trial access pass is automatically provisioned to your profile. You get immediate access to sample question sets across NCLEX, HESI, TEAS, and ATI test banks, clinical case studies, and performance tracking inside your student dashboard without entering credit card details."
  },
  {
    question: "Are your test bank questions updated for the Next Generation NCLEX (NGN)?",
    answer: "Yes! All NCLEX and clinical exit exams in our bank feature authentic NGN item formats including 6-question unfolding clinical case studies, Bow-Tie items, Extended Multiple Response (Select All That Apply with partial credit scoring), Drag-and-Drop cloze formulas, and Matrix clinical judgment grids."
  },
  {
    question: "What is your 100% Pass Guarantee policy?",
    answer: "We stand behind our materials with an unconditional guarantee. If you complete at least 80% of your purchased test bank questions and achieve a practice readiness average of 75% or higher but do not pass your official exam, we will provide a full 100% refund of your purchase price plus extended access until you succeed."
  },
  {
    question: "Can I access the test bank on mobile devices and tablets?",
    answer: "Absolutely. ProctoredNurseExams is built with a responsive, mobile-first web interface. Your study progress, question answers, bookmarks, and quiz stats sync in real-time across your iPhone, Android smartphone, iPad/tablet, and Mac or Windows desktop."
  },
  {
    question: "How do the Pay-to-Download Study Guides work?",
    answer: "When you purchase any of our high-yield PDF study guides, our private cloud storage generates a secure, short-lived signed download link (TTL ≤ 60 seconds) that triggers an instant high-resolution PDF download to your device. The document is also permanently saved to 'My Downloads' in your student dashboard for future access anytime."
  }
];

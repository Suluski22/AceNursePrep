import { Question, ExamCategory } from '../types';

export const TRIAL_QUESTIONS: Record<ExamCategory, Question[]> = {
  // 1. NCLEX Exams (10 Questions)
  'NCLEX Exams': [
    {
      id: 'nclex-1',
      examId: 'nclex-rn',
      type: 'ngn_case',
      clinicalDomain: 'Cardiovascular & Emergency Care (CJMM)',
      vignette: {
        historyPhysical: 'A 64-year-old male with a history of CHF, Stage 3 CKD, and type 2 diabetes presents to the ED with severe orthopnea, chest tightness, and a cough productive of pink frothy sputum.',
        vitals: 'Temp: 98.6°F | HR: 118 bpm, irregular | BP: 178/102 mmHg | RR: 32 breaths/min | SpO2: 86% on room air',
        nursesNotes: 'Patient appears anxious in tripod position. Coarse bilateral crackles auscultated throughout all lung fields. 3+ pitting pedal edema. S3 gallop audible.',
        labResults: 'Serum Potassium: 4.8 mEq/L | BUN: 38 mg/dL | Creatinine: 2.1 mg/dL | BNP: 1,840 pg/mL | ABG: pH 7.31, PaCO2 48, PaO2 58, HCO3 24'
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
        overview: 'Acute cardiogenic pulmonary edema is an immediate life-threatening emergency. Priority follows the ABC rule (Airway, Breathing, Circulation).',
        correctDetails: 'High-flow oxygen via non-rebreather restores alveolar oxygenation immediately for SpO2 86% with pink frothy sputum.',
        incorrectDetails: 'IV furosemide reduces preload but oxygenation must be established first. Recumbent position increases venous return and worsens pulmonary congestion.',
        clinicalTakeaway: 'In acute pulmonary edema, prioritize high-flow oxygen and high-Fowler position prior to diuretics.'
      }
    },
    {
      id: 'nclex-2',
      examId: 'nclex-rn',
      type: 'sata',
      clinicalDomain: 'Pharmacological & Parenteral Therapies',
      prompt: 'A nurse is preparing to administer digoxin to an adult patient diagnosed with atrial fibrillation and chronic heart failure. Which findings warrant withholding the medication? (Select All That Apply)',
      options: [
        { id: 'sata-a', text: 'Apical pulse rate of 52 beats per minute' },
        { id: 'sata-b', text: 'Serum potassium level of 3.1 mEq/L' },
        { id: 'sata-c', text: 'Patient reports experiencing yellow-green halos around light fixtures' },
        { id: 'sata-d', text: 'Serum magnesium level of 2.0 mEq/L' },
        { id: 'sata-e', text: 'Serum digoxin concentration of 2.4 ng/mL' }
      ],
      correctAnswerIds: ['sata-a', 'sata-b', 'sata-c', 'sata-e'],
      rationale: {
        overview: 'Digoxin has a narrow therapeutic index (0.5–0.9 ng/mL for HF). Hypokalemia potentiates fatal toxicity.',
        correctDetails: 'Apical pulse < 60 bpm, K+ < 3.5 mEq/L, xanthopsia (halos), and level > 2.0 ng/mL all indicate toxicity or severe risk.',
        incorrectDetails: 'Magnesium 2.0 mEq/L is normal (1.7–2.2 mEq/L).',
        clinicalTakeaway: 'Always auscultate apical pulse for 1 full minute prior to digoxin administration.'
      }
    },
    {
      id: 'nclex-3',
      examId: 'nclex-rn',
      type: 'single',
      clinicalDomain: 'Physiological Adaptation / Neurological',
      prompt: 'A client with a traumatic brain injury has an intracranial pressure (ICP) of 24 mmHg. Which nursing intervention is most appropriate to optimize cerebral perfusion pressure?',
      options: [
        { id: 'n3-a', text: 'Elevate the head of the bed 30 degrees with the head in a neutral midline position' },
        { id: 'n3-b', text: 'Perform endotracheal suctioning every 30 minutes to ensure airway clearance' },
        { id: 'n3-c', text: 'Flex the client’s hips and knees to improve venous return' },
        { id: 'n3-d', text: 'Administer hypotonic intravenous fluids rapidly to expand volume' },
      ],
      correctAnswerIds: ['n3-a'],
      rationale: {
        overview: 'Normal ICP is 5–15 mmHg. Levels > 20 mmHg require immediate interventions to enhance jugular venous drainage.',
        correctDetails: 'HOB elevation 30 degrees with neutral neck alignment facilitates venous return from the cranium without compromising MAP.',
        incorrectDetails: 'Frequent suctioning causes coughing and spikes ICP. Hip flexion increases intra-abdominal and intrathoracic pressure. Hypotonic fluids worsen cerebral edema.',
        clinicalTakeaway: 'Maintain HOB at 30 degrees and keep the neck midline; avoid hip flexion.'
      }
    },
    {
      id: 'nclex-4',
      examId: 'nclex-rn',
      type: 'single',
      clinicalDomain: 'Reduction of Risk Potential / Endocrine',
      prompt: 'A client with type 1 diabetes is admitted in Diabetic Ketoacidosis (DKA). After fluid resuscitation is initiated, an IV regular insulin infusion is started. Which laboratory value requires immediate notification of the provider prior to insulin titration?',
      options: [
        { id: 'n4-a', text: 'Serum blood glucose of 480 mg/dL' },
        { id: 'n4-b', text: 'Serum potassium of 3.2 mEq/L' },
        { id: 'n4-c', text: 'Serum bicarbonate of 14 mEq/L' },
        { id: 'n4-d', text: 'Arterial blood pH of 7.28' }
      ],
      correctAnswerIds: ['n4-b'],
      rationale: {
        overview: 'Insulin shifts potassium into intracellular space, causing rapid worsening of hypokalemia and fatal cardiac dysrhythmias.',
        correctDetails: 'If serum potassium is < 3.3 mEq/L, insulin must be held and potassium repleted first.',
        incorrectDetails: 'Hyperglycemia and acidemia are expected findings of DKA that insulin will resolve.',
        clinicalTakeaway: 'Never administer IV insulin if serum potassium is below 3.3 mEq/L.'
      }
    },
    {
      id: 'nclex-5',
      examId: 'nclex-rn',
      type: 'sata',
      clinicalDomain: 'Safe and Effective Care / Infection Control',
      prompt: 'A nurse is caring for a client admitted with active pulmonary tuberculosis. Which infection prevention precautions are mandatory? (Select All That Apply)',
      options: [
        { id: 'n5-a', text: 'Placement in an airborne infection isolation room with negative pressure ventilation' },
        { id: 'n5-b', text: 'Healthcare personnel must don a fit-tested N95 respirator before entering the room' },
        { id: 'n5-c', text: 'A surgical mask placed on the client when transported outside the room' },
        { id: 'n5-d', text: 'Leaving the isolation room door propped open to monitor respiratory status' },
        { id: 'n5-e', text: 'Universal double-gloving for all routine physical assessments' }
      ],
      correctAnswerIds: ['n5-a', 'n5-b', 'n5-c'],
      rationale: {
        overview: 'Mycobacterium tuberculosis spreads via droplet nuclei in airborne currents.',
        correctDetails: 'Requires airborne isolation (negative pressure, 6–12 air changes/hour), N95 respirator for staff, and surgical mask on patient during transport.',
        incorrectDetails: 'The door must remain closed at all times. Routine double gloving is not an airborne standard.',
        clinicalTakeaway: 'Airborne isolation requires negative pressure, closed doors, and an N95 respirator.'
      }
    },
    {
      id: 'nclex-6',
      examId: 'nclex-rn',
      type: 'single',
      clinicalDomain: 'Safe and Effective Care / Prioritization',
      prompt: 'Following morning interdisciplinary handoff, which client should the registered nurse assess first?',
      options: [
        { id: 'n6-a', text: 'A client with asthma reporting audible wheezing whose nebulizer was given 45 minutes ago' },
        { id: 'n6-b', text: 'A client with deep vein thrombosis on IV heparin whose aPTT is 72 seconds' },
        { id: 'n6-c', text: 'A post-thyroidectomy client with a sudden high-pitched harsh sound during inspiration and numbness in fingers' },
        { id: 'n6-d', text: 'A client with a closed femur fracture who rates pain 8/10 and requests prescribed analgesics' }
      ],
      correctAnswerIds: ['n6-c'],
      rationale: {
        overview: 'Laryngeal stridor post-thyroidectomy signals acute airway obstruction secondary to hypocalcemia (tetany from parathyroid trauma) or laryngeal edema.',
        correctDetails: 'Option C is an immediate airway emergency requiring calcium gluconate and tracheostomy tray at bedside.',
        incorrectDetails: 'Option A is stable post-treatment. Option B has a therapeutic aPTT (60–80s). Option D has severe pain but is stable circulation.',
        clinicalTakeaway: 'Post-thyroidectomy inspiratory stridor indicates airway obstruction—see this patient first.'
      }
    },
    {
      id: 'nclex-7',
      examId: 'nclex-rn',
      type: 'single',
      clinicalDomain: 'Pharmacological & Parenteral Therapies',
      prompt: 'A client receiving an intravenous infusion of magnesium sulfate for preeclampsia develops a respiratory rate of 10 breaths/min, absent patellar reflexes, and urine output of 15 mL/hr. What is the immediate nursing action?',
      options: [
        { id: 'n7-a', text: 'Slow the infusion rate by 50% and recheck reflexes in 30 minutes' },
        { id: 'n7-b', text: 'Discontinue the magnesium sulfate infusion immediately and prepare IV calcium gluconate' },
        { id: 'n7-c', text: 'Increase intravenous maintenance fluids to promote renal clearance' },
        { id: 'n7-d', text: 'Place the client on a continuous positive airway pressure (CPAP) machine' }
      ],
      correctAnswerIds: ['n7-b'],
      rationale: {
        overview: 'Loss of deep tendon reflexes, bradypnea (<12), and oliguria (<30 mL/hr) are cardinal signs of magnesium toxicity.',
        correctDetails: 'Stop infusion immediately and administer antidote (calcium gluconate 10% IV push).',
        incorrectDetails: 'Slowing the infusion is insufficient when toxicity has already caused respiratory depression.',
        clinicalTakeaway: 'The specific antidote for magnesium sulfate toxicity is calcium gluconate.'
      }
    },
    {
      id: 'nclex-8',
      examId: 'nclex-rn',
      type: 'sata',
      clinicalDomain: 'Health Promotion and Maintenance / Pediatrics',
      prompt: 'A nurse is evaluating an infant suspected of having pyloric stenosis. Which clinical findings support this diagnosis? (Select All That Apply)',
      options: [
        { id: 'n8-a', text: 'Projectile non-bilious vomiting immediately following feeds' },
        { id: 'n8-b', text: 'Palpable olive-shaped mass in the right upper quadrant of the abdomen' },
        { id: 'n8-c', text: 'Currant jelly-like stools containing blood and mucus' },
        { id: 'n8-d', text: 'Visible peristaltic waves passing from left to right across the epigastrium' },
        { id: 'n8-e', text: 'Hypochloremic metabolic acidosis on laboratory assessment' }
      ],
      correctAnswerIds: ['n8-a', 'n8-b', 'n8-d'],
      rationale: {
        overview: 'Hypertrophic pyloric stenosis causes gastric outlet obstruction in infants 2–8 weeks old.',
        correctDetails: 'Hallmarks: projectile non-bilious emesis, olive-shaped RUQ mass, and visible peristaltic waves.',
        incorrectDetails: 'Currant jelly stools are classic for intussusception. Repeated gastric emesis produces hypochloremic metabolic ALKALOSIS, not acidosis.',
        clinicalTakeaway: 'Pyloric stenosis Triad: Projectile non-bilious vomiting, olive mass, and metabolic alkalosis.'
      }
    },
    {
      id: 'nclex-9',
      examId: 'nclex-rn',
      type: 'single',
      clinicalDomain: 'Psychosocial Integrity / Mental Health',
      prompt: 'A client diagnosed with bipolar I disorder is prescribed lithium carbonate. Which dietary instruction is most vital to prevent lithium toxicity?',
      options: [
        { id: 'n9-a', text: 'Follow a strict low-sodium diet with less than 1,500 mg sodium daily' },
        { id: 'n9-b', text: 'Maintain a consistent daily intake of dietary sodium and drink 2–3 liters of water per day' },
        { id: 'n9-c', text: 'Restrict fluid intake to 1 liter daily to maintain therapeutic serum levels' },
        { id: 'n9-d', text: 'Avoid foods high in tyramine such as aged cheeses and cured meats' }
      ],
      correctAnswerIds: ['n9-b'],
      rationale: {
        overview: 'Lithium is an alkali metal handled by the kidneys identically to sodium. Hyponatremia causes renal reabsorption of lithium, precipitating severe toxicity.',
        correctDetails: 'Maintaining consistent sodium and adequate hydration prevents fluctuations in lithium excretion.',
        incorrectDetails: 'Sodium restriction or fluid restriction triggers toxic accumulation. Tyramine restriction is for MAO inhibitors.',
        clinicalTakeaway: 'Consistent sodium intake and 2–3L fluids/day are essential for patients on lithium.'
      }
    },
    {
      id: 'nclex-10',
      examId: 'nclex-rn',
      type: 'single',
      clinicalDomain: 'Physiological Adaptation / Oncology',
      prompt: 'A client receiving induction chemotherapy for acute lymphoblastic leukemia develops hyperkalemia, hyperphosphatemia, hypocalcemia, and acute hyperuricemia. Which oncologic emergency should the nurse recognize?',
      options: [
        { id: 'n10-a', text: 'Superior Vena Cava Syndrome' },
        { id: 'n10-b', text: 'Tumor Lysis Syndrome (TLS)' },
        { id: 'n10-c', text: 'Disseminated Intravascular Coagulation (DIC)' },
        { id: 'n10-d', text: 'Syndrome of Inappropriate Antidiuretic Hormone (SIADH)' }
      ],
      correctAnswerIds: ['n10-b'],
      rationale: {
        overview: 'Massive rapid breakdown of malignant cells releases intracellular ions into circulation.',
        correctDetails: 'TLS is characterized by high potassium, high phosphate, high uric acid, and secondary hypocalcemia.',
        incorrectDetails: 'SVC syndrome causes thoracic vascular congestion. DIC causes coagulopathy. SIADH causes severe hyponatremia.',
        clinicalTakeaway: 'Tumor Lysis Syndrome: High Potassium, High Phosphate, High Uric Acid, Low Calcium. Treated with IV hydration and rasburicase/allopurinol.'
      }
    }
  ],

  // 2. HESI Exams (10 Questions)
  'HESI Exams': [
    {
      id: 'hesi-1',
      examId: 'hesi-rn-exit',
      type: 'single',
      clinicalDomain: 'Safe and Effective Care Environment / Delegation',
      prompt: 'The RN on a medical-surgical unit is managing a team with one LPN/LVN and two UAPs. Which assignment is most appropriate to delegate to the LPN/LVN?',
      options: [
        { id: 'h-a', text: 'A newly admitted client experiencing sudden slurred speech and facial droop' },
        { id: 'h-b', text: 'A stable client on day 3 post-colostomy who requires routine stoma wound care and dressing change' },
        { id: 'h-c', text: 'A postoperative client receiving IV titration of nitroprusside for malignant hypertension' },
        { id: 'h-d', text: 'An adolescent with newly diagnosed type 1 diabetes requiring initial discharge education' }
      ],
      correctAnswerIds: ['h-b'],
      rationale: {
        overview: 'RNs cannot delegate initial assessment, clinical evaluation, or discharge teaching.',
        correctDetails: 'LPNs can perform routine sterile wound care and dressing changes on stable established stomas.',
        incorrectDetails: 'Stroke assessment, vasoactive titrations, and initial insulin teaching are strictly RN responsibilities.',
        clinicalTakeaway: 'Remember EAT: Do NOT delegate Evaluation, Assessment, or initial Teaching.'
      }
    },
    {
      id: 'hesi-2',
      examId: 'hesi-rn-exit',
      type: 'single',
      clinicalDomain: 'Fluid and Electrolyte Balance / Acid-Base',
      prompt: 'A client with prolonged nasogastric suctioning presents with arterial blood gas (ABG) results: pH 7.51, PaCO2 46 mmHg, PaO2 92 mmHg, HCO3 34 mEq/L. How should the nurse interpret these findings?',
      options: [
        { id: 'h2-a', text: 'Uncompensated Respiratory Alkalosis' },
        { id: 'h2-b', text: 'Partially Compensated Metabolic Alkalosis' },
        { id: 'h2-c', text: 'Fully Compensated Metabolic Acidosis' },
        { id: 'h2-d', text: 'Uncompensated Metabolic Acidosis' }
      ],
      correctAnswerIds: ['h2-b'],
      rationale: {
        overview: 'ROME method: pH 7.51 is alkalotic. HCO3 34 is high (metabolic cause). PaCO2 46 is elevated attempting to compensate.',
        correctDetails: 'Since pH remains outside normal range (7.35–7.45) while PaCO2 is elevating to buffer, it is partially compensated metabolic alkalosis.',
        incorrectDetails: 'Respiratory alkalosis would feature a low PaCO2. Fully compensated requires normal pH.',
        clinicalTakeaway: 'Nasogastric suctioning removes hydrochloric acid, precipitating metabolic alkalosis.'
      }
    },
    {
      id: 'hesi-3',
      examId: 'hesi-rn-exit',
      type: 'sata',
      clinicalDomain: 'Cardiovascular / Myocardial Infarction',
      prompt: 'A client arrives at the emergency department with acute central crushing substernal chest pain radiating to the jaw. Which initial nursing interventions are indicated? (Select All That Apply)',
      options: [
        { id: 'h3-a', text: 'Obtain a 12-lead electrocardiogram (ECG) within 10 minutes of arrival' },
        { id: 'h3-b', text: 'Administer 162–325 mg of chewable aspirin if not contraindicated' },
        { id: 'h3-c', text: 'Administer sublingual nitroglycerin without checking blood pressure' },
        { id: 'h3-d', text: 'Establish intravenous access and draw blood for serum cardiac biomarkers (troponin)' },
        { id: 'h3-e', text: 'Administer high-flow oxygen even if pulse oximetry is 99% on room air' }
      ],
      correctAnswerIds: ['h3-a', 'h3-b', 'h3-d'],
      rationale: {
        overview: 'AHA guidelines for STEMI prioritize rapid ECG (<10 min), antiplatelet therapy, and cardiac markers.',
        correctDetails: '12-lead ECG within 10 mins, chewable aspirin, and IV access with troponins are vital.',
        incorrectDetails: 'Nitroglycerin requires BP verification (contraindicated if SBP < 90). Routine oxygen is not indicated if SpO2 ≥ 90% (may cause hyperoxic vasoconstriction).',
        clinicalTakeaway: 'ECG within 10 minutes and chewable aspirin are top immediate acute coronary syndrome priorities.'
      }
    },
    {
      id: 'hesi-4',
      examId: 'hesi-rn-exit',
      type: 'single',
      clinicalDomain: 'Pharmacological / Anticoagulants',
      prompt: 'A client on continuous IV heparin therapy has an aPTT of 135 seconds (control 30 seconds) and spontaneous hematuria. Which medication should the nurse anticipate administering?',
      options: [
        { id: 'h4-a', text: 'Vitamin K (Phytonadione)' },
        { id: 'h4-b', text: 'Protamine Sulfate' },
        { id: 'h4-c', text: 'Aminocaproic Acid' },
        { id: 'h4-d', text: 'Deferoxamine' }
      ],
      correctAnswerIds: ['h4-b'],
      rationale: {
        overview: 'The therapeutic aPTT target for heparin is 1.5–2.5 times control (45–75 seconds). 135 seconds indicates severe overdose with hemorrhage.',
        correctDetails: 'Protamine sulfate binds heparin into an inactive salt compound.',
        incorrectDetails: 'Vitamin K is the reversal agent for warfarin. Deferoxamine is an iron chelator.',
        clinicalTakeaway: 'Heparin antidote = Protamine sulfate. Warfarin antidote = Vitamin K.'
      }
    },
    {
      id: 'hesi-5',
      examId: 'hesi-rn-exit',
      type: 'single',
      clinicalDomain: 'Gastrointestinal / Cirrhosis',
      prompt: 'A client with end-stage hepatic cirrhosis develops asterixis, confusion, and fetor hepaticus. Serum ammonia is 112 mcg/dL. Which medication should the nurse anticipate administering?',
      options: [
        { id: 'h5-a', text: 'Lactulose' },
        { id: 'h5-b', text: 'Spironolactone' },
        { id: 'h5-c', text: 'Propranolol' },
        { id: 'h5-d', text: 'Sucralfate' }
      ],
      correctAnswerIds: ['h5-a'],
      rationale: {
        overview: 'Hepatic encephalopathy results from toxic accumulation of blood ammonia crossing the blood-brain barrier.',
        correctDetails: 'Lactulose acidifies colonic contents, converting ammonia (NH3) to ammonium (NH4+) which is excreted in feces (target 2–3 soft stools/day).',
        incorrectDetails: 'Spironolactone treats ascites. Propranolol reduces portal vein hypertension.',
        clinicalTakeaway: 'Lactulose traps ammonia in the colon to treat hepatic encephalopathy.'
      }
    },
    {
      id: 'hesi-6',
      examId: 'hesi-rn-exit',
      type: 'single',
      clinicalDomain: 'Renal and Urinary / Dialysis',
      prompt: 'During peritoneal dialysis outflow drainage, the nurse observes that the effluent fluid is cloudy and turbid. The client reports mild abdominal tenderness. What is the priority nursing action?',
      options: [
        { id: 'h6-a', text: 'Warm the next dialysate infusion bag in a microwave' },
        { id: 'h6-b', text: 'Instill heparin into the peritoneal catheter to clear fibrin clots' },
        { id: 'h6-c', text: 'Obtain an effluent sample for culture and sensitivity and notify the healthcare provider' },
        { id: 'h6-d', text: 'Position the client on their side to accelerate drainage outflow' }
      ],
      correctAnswerIds: ['h6-c'],
      rationale: {
        overview: 'Cloudy peritoneal dialysis effluent is the hallmark primary indicator of peritonitis.',
        correctDetails: 'The nurse must collect an effluent specimen for cell count, Gram stain, and culture immediately.',
        incorrectDetails: 'Never microwave dialysate bags. Heparin does not treat bacterial infection.',
        clinicalTakeaway: 'Cloudy dialysate outflow = Peritonitis until proven otherwise.'
      }
    },
    {
      id: 'hesi-7',
      examId: 'hesi-rn-exit',
      type: 'sata',
      clinicalDomain: 'Musculoskeletal / Fractures',
      prompt: 'A young adult client with a closed tibia-fibula fracture has a newly applied plaster cast. Which findings suggest early compartment syndrome? (Select All That Apply)',
      options: [
        { id: 'h7-a', text: 'Intractable pain disproportionate to the injury that is unrelieved by opioids' },
        { id: 'h7-b', text: 'Paresthesia and numbness in the distal toes' },
        { id: 'h7-c', text: 'Pain provoked by passive dorsiflexion of the foot' },
        { id: 'h7-d', text: 'Absence of distal dorsalis pedis pulse (pulselessness)' },
        { id: 'h7-e', text: 'Warm, erythematous skin with brisk 1-second capillary refill' }
      ],
      correctAnswerIds: ['h7-a', 'h7-b', 'h7-c'],
      rationale: {
        overview: 'Compartment syndrome occurs when increased tissue pressure impairs microcirculation.',
        correctDetails: 'Early signs: Severe unrelenting pain out of proportion, pain on passive stretch, and paresthesias.',
        incorrectDetails: 'Pulselessness and pallor are late, ominous signs of irreversible neuromuscular necrosis.',
        clinicalTakeaway: 'Early compartment syndrome signs are Pain out of proportion and Paresthesia.'
      }
    },
    {
      id: 'hesi-8',
      examId: 'hesi-rn-exit',
      type: 'single',
      clinicalDomain: 'Respiratory / Mechanical Ventilation',
      prompt: 'The high-pressure alarm sounds repeatedly on the mechanical ventilator of an intubated client. Which assessment should the nurse perform first?',
      options: [
        { id: 'h8-a', text: 'Check the ventilator tubing for disconnections or cuff leaks' },
        { id: 'h8-b', text: 'Auscultate bilateral breath sounds for secretions, bronchospasm, or pneumothorax' },
        { id: 'h8-c', text: 'Immediately increase the FiO2 to 100%' },
        { id: 'h8-d', text: 'Silently mute the alarm and check the circuit water trap' }
      ],
      correctAnswerIds: ['h8-b'],
      rationale: {
        overview: 'High-pressure alarms trigger when resistance to airflow increases (secretions, biting tube, pneumothorax, bronchospasm).',
        correctDetails: 'Always assess the patient before equipment: auscultate breath sounds to identify secretions needing suction or sudden absent sounds of tension pneumothorax.',
        incorrectDetails: 'Tubing leaks cause low-pressure alarms.',
        clinicalTakeaway: 'High-pressure alarm = Obstruction/Resistance. Always assess patient breath sounds first.'
      }
    },
    {
      id: 'hesi-9',
      examId: 'hesi-rn-exit',
      type: 'single',
      clinicalDomain: 'Pharmacological / Psychiatric',
      prompt: 'A client taking haloperidol for schizophrenia presents with a temperature of 103.6°F (39.8°C), severe "lead-pipe" muscle rigidity, confusion, and diaphoresis. Which life-threatening reaction is occurring?',
      options: [
        { id: 'h9-a', text: 'Acute Dystonic Reaction' },
        { id: 'h9-b', text: 'Neuroleptic Malignant Syndrome (NMS)' },
        { id: 'h9-c', text: 'Tardive Dyskinesia' },
        { id: 'h9-d', text: 'Serotonin Syndrome' }
      ],
      correctAnswerIds: ['h9-b'],
      rationale: {
        overview: 'NMS is a fatal idiosyncratic reaction to dopamine-receptor antagonists.',
        correctDetails: 'Hallmarks: hyperpyrexia, lead-pipe rigidity, autonomic instability, and elevated creatine kinase.',
        incorrectDetails: 'Dystonia presents with acute muscle spasm without hyperthermia. Tardive dyskinesia is involuntary orofacial chorea.',
        clinicalTakeaway: 'NMS Triad: Hyperthermia, Lead-pipe rigidity, Autonomic instability. Stop antipsychotic and give dantrolene/bromocriptine.'
      }
    },
    {
      id: 'hesi-10',
      examId: 'hesi-rn-exit',
      type: 'single',
      clinicalDomain: 'Emergency / Burn Resuscitation',
      prompt: 'Using the Parkland Formula (4 mL × kg × % TBSA), how much intravenous lactated Ringer’s fluid should a 70-kg client with a 40% full-thickness burn receive during the first 8 hours after the injury?',
      options: [
        { id: 'h10-a', text: '5,600 mL' },
        { id: 'h10-b', text: '11,200 mL' },
        { id: 'h10-c', text: '2,800 mL' },
        { id: 'h10-d', text: '8,400 mL' }
      ],
      correctAnswerIds: ['h10-a'],
      rationale: {
        overview: 'Parkland Formula: Total 24-hr fluid = 4 mL × 70 kg × 40 = 11,200 mL.',
        correctDetails: '50% of the total must be given in the first 8 hours from burn onset: 11,200 ÷ 2 = 5,600 mL.',
        incorrectDetails: '11,200 mL is the 24-hr total. 2,800 mL is 25%.',
        clinicalTakeaway: 'Parkland Formula: Administer half of total 24-hour calculated fluids in the first 8 hours.'
      }
    }
  ],

  // 3. ATI School Exams (10 Questions)
  'ATI School Exams': [
    {
      id: 'ati-1',
      examId: 'ati-rn-comp-predictor',
      type: 'single',
      clinicalDomain: 'Management of Care / Ethical-Legal',
      prompt: 'A nurse discovers a medication error where a double dose of metoprolol was administered to a client. What is the nurse’s sequential priority response?',
      options: [
        { id: 'a1-a', text: 'Immediately notify the pharmacy to file an electronic incident ticket' },
        { id: 'a1-b', text: 'Assess the client’s blood pressure and apical pulse, then notify the healthcare provider' },
        { id: 'a1-c', text: 'Complete a risk management incident report and file a copy in the medical record' },
        { id: 'a1-d', text: 'Withhold the next three scheduled doses of all antihypertensive agents' }
      ],
      correctAnswerIds: ['a1-b'],
      rationale: {
        overview: 'Client safety is always the first priority in medication errors.',
        correctDetails: 'Assess vital signs immediately to check for severe bradycardia/hypotension before notifying the provider.',
        incorrectDetails: 'Incident reports are administrative and must never be placed inside the patient chart.',
        clinicalTakeaway: 'In medication errors: 1. Assess patient, 2. Notify provider, 3. Complete incident report (never chart report existence).'
      }
    },
    {
      id: 'ati-2',
      examId: 'ati-rn-maternity-newborn',
      type: 'single',
      clinicalDomain: 'Maternal-Newborn / Fetal Monitoring',
      prompt: 'During active labor, the electronic fetal monitor displays persistent late decelerations with decreased beat-to-beat variability. What is the correct priority sequence of nursing actions?',
      options: [
        { id: 'a2-a', text: 'Stop oxytocin infusion, reposition client onto left side, administer O2 via non-rebreather at 10 L/min, and increase IV fluids' },
        { id: 'a2-b', text: 'Perform a sterile vaginal examination to evaluate cervical dilation' },
        { id: 'a2-c', text: 'Place the client in supine position and apply scalp stimulation' },
        { id: 'a2-d', text: 'Administer an IV bolus of terbutaline and prepare for immediate vacuum extraction' }
      ],
      correctAnswerIds: ['a2-a'],
      rationale: {
        overview: 'Late decelerations indicate uteroplacental insufficiency.',
        correctDetails: 'Immediate intrauterine resuscitation: Stop oxytocin (stop uterine contractions), left lateral position (relieve vena cava compression), O2 at 8–10 L/min, and IV fluid bolus.',
        incorrectDetails: 'Supine position compresses the aorta and vena cava, worsening placental perfusion.',
        clinicalTakeaway: 'Late decelerations = Placental insufficiency. Stop Pitocin, turn to left side, oxygen, IV bolus.'
      }
    },
    {
      id: 'ati-3',
      examId: 'ati-rn-maternity-newborn',
      type: 'sata',
      clinicalDomain: 'Maternal-Newborn / Preeclampsia',
      prompt: 'A nurse is evaluating a client at 34 weeks gestation with severe preeclampsia. Which clinical findings indicate worsening disease? (Select All That Apply)',
      options: [
        { id: 'a3-a', text: 'Blood pressure of 168/112 mmHg on two separate readings' },
        { id: 'a3-b', text: 'Persistent frontal headache unresponsive to acetaminophen' },
        { id: 'a3-c', text: 'Right upper quadrant epigastric pain' },
        { id: 'a3-d', text: 'Deep tendon reflexes 1+ without clonus' },
        { id: 'a3-e', text: 'Platelet count of 75,000/mm3' }
      ],
      correctAnswerIds: ['a3-a', 'a3-b', 'a3-c', 'a3-e'],
      rationale: {
        overview: 'Severe preeclampsia causes widespread vasospasm and endothelial cell damage.',
        correctDetails: 'BP ≥ 160/110, severe headache, epigastric/RUQ pain (hepatic ischemia/capsular distension), and thrombocytopenia (<100k) are diagnostic of severe preeclampsia/HELLP syndrome.',
        incorrectDetails: 'Hyporeflexia (1+) is not a sign of worsening preeclampsia (hyperreflexia and clonus are).',
        clinicalTakeaway: 'Epigastric pain in severe preeclampsia indicates hepatic edema and imminent seizure/rupture risk.'
      }
    },
    {
      id: 'ati-4',
      examId: 'ati-pn-comp-predictor',
      type: 'single',
      clinicalDomain: 'Pharmacological / Cardiac',
      prompt: 'A client taking lisinopril calls the clinic complaining of swelling in the lips, tongue, and throat that began 30 minutes ago. What instruction must the nurse give immediately?',
      options: [
        { id: 'a4-a', text: 'Take an oral dose of diphenhydramine and monitor for 2 hours' },
        { id: 'a4-b', text: 'Call 911 immediately or go to the nearest emergency room for severe angioedema' },
        { id: 'a4-c', text: 'Discontinue the evening dose and request a prescription for losartan' },
        { id: 'a4-d', text: 'Drink warm fluids and suck on ice chips to relieve mucosal swelling' }
      ],
      correctAnswerIds: ['a4-b'],
      rationale: {
        overview: 'ACE inhibitors can trigger sudden life-threatening angioedema of the upper airway.',
        correctDetails: 'Rapid airway compromise requires immediate emergency medical services (911).',
        incorrectDetails: 'Oral antihistamines are dangerously inadequate for acute airway obstruction.',
        clinicalTakeaway: 'ACE inhibitor angioedema is a medical emergency due to airway obstruction.'
      }
    },
    {
      id: 'ati-5',
      examId: 'ati-rn-nursing-mgmt',
      type: 'single',
      clinicalDomain: 'Leadership & Delegation / Scope',
      prompt: 'Which clinical task is most appropriate for the registered nurse to delegate to an unlicensed assistive personnel (UAP)?',
      options: [
        { id: 'a5-a', text: 'Assisting a stable hemiplegic client with ambulation using a gait belt' },
        { id: 'a5-b', text: 'Providing discharge instructions on colostomy pouch changing' },
        { id: 'a5-c', text: 'Assessing skin turgor and capillary refill in an elderly client with dehydration' },
        { id: 'a5-d', text: 'Administering routine subcutaneous heparin injection' }
      ],
      correctAnswerIds: ['a5-a'],
      rationale: {
        overview: 'UAP duties are limited to non-invasive routine hygiene, ambulation assistance, vital signs on stable patients, and ADLs.',
        correctDetails: 'Ambulation of a stable client with a gait belt is well within UAP training.',
        incorrectDetails: 'Teaching, physical assessment, and medication administration require licensed nursing scope.',
        clinicalTakeaway: 'Delegate stable ADLs and vital signs to UAP; retain assessment and medications for licensed nurses.'
      }
    },
    {
      id: 'ati-6',
      examId: 'ati-rn-comp-predictor',
      type: 'single',
      clinicalDomain: 'Physiological Adaptation / Endocrine',
      prompt: 'A client 12 hours post-thyroidectomy develops tingling sensations around the mouth (perioral paresthesia) and a positive Chvostek’s sign. What should the nurse suspect?',
      options: [
        { id: 'a6-a', text: 'Hypercalcemia' },
        { id: 'a6-b', text: 'Hypocalcemia due to accidental parathyroid gland removal' },
        { id: 'a6-c', text: 'Thyroid storm' },
        { id: 'a6-d', text: 'Recurrent laryngeal nerve paralysis' }
      ],
      correctAnswerIds: ['a6-b'],
      rationale: {
        overview: 'Parathyroid glands regulate calcium. Inadvertent trauma or devascularization during thyroid surgery causes sudden hypocalcemia.',
        correctDetails: 'Signs: perioral numbness, tingling in fingertips, Chvostek’s (facial twitching) and Trousseau’s signs (carpal spasm).',
        incorrectDetails: 'Hypercalcemia causes lethargy and shortened QT interval. Thyroid storm causes tachycardia and hyperthermia.',
        clinicalTakeaway: 'Positive Chvostek and Trousseau signs = Hypocalcemia. Treat with IV calcium gluconate.'
      }
    },
    {
      id: 'ati-7',
      examId: 'ati-rn-nursing-mgmt',
      type: 'sata',
      clinicalDomain: 'Emergency Preparedness / Triage',
      prompt: 'In a mass casualty disaster triage scenario (START triage), which victims should receive a RED tag (Immediate Priority)? (Select All That Apply)',
      options: [
        { id: 'a7-a', text: 'A victim with an open tension pneumothorax and severe respiratory distress' },
        { id: 'a7-b', text: 'A victim with an active femoral arterial bleed controlled only with pressure dressing' },
        { id: 'a7-c', text: 'A victim with catastrophic open cranial trauma, no spontaneous respirations after airway positioning' },
        { id: 'a7-d', text: 'A conscious victim with a closed radial fracture who is ambulatory' },
        { id: 'a7-e', text: 'A victim with severe burns over 15% TBSA with stridor and singed nasal hairs' }
      ],
      correctAnswerIds: ['a7-a', 'a7-b', 'a7-e'],
      rationale: {
        overview: 'Red tags (Immediate) have life-threatening injuries with high survival probability if treated within minutes.',
        correctDetails: 'Tension pneumothorax, major uncontrolled hemorrhage, and impending airway burn compromise are RED tags.',
        incorrectDetails: 'Apneic trauma victims are tagged BLACK (Expectant). Ambulatory walking wounded are GREEN (Minor).',
        clinicalTakeaway: 'Red tag = Immediate life threat that can survive with rapid airway/hemodynamic intervention.'
      }
    },
    {
      id: 'ati-8',
      examId: 'ati-rn-maternity-newborn',
      type: 'single',
      clinicalDomain: 'Maternal-Newborn / APGAR Scoring',
      prompt: 'A newborn at 1 minute of life displays: heart rate 124 bpm, vigorous loud crying, active movement in all four extremities, prompt sneeze with nasal catheter stimulation, and pink body with cyanotic hands and feet. What is the calculated APGAR score?',
      options: [
        { id: 'a8-a', text: '8' },
        { id: 'a8-b', text: '9' },
        { id: 'a8-c', text: '10' },
        { id: 'a8-d', text: '7' }
      ],
      correctAnswerIds: ['a8-b'],
      rationale: {
        overview: 'APGAR criteria: Heart rate >100 (2), Respiratory effort loud cry (2), Muscle tone active (2), Reflex irritability prompt sneeze (2), Color acrocyanosis (1).',
        correctDetails: 'Total APGAR score = 2 + 2 + 2 + 2 + 1 = 9.',
        incorrectDetails: 'A score of 10 requires completely pink skin including extremities.',
        clinicalTakeaway: 'Acrocyanosis (blue extremities with pink trunk) loses 1 point on color; score of 9 is normal.'
      }
    },
    {
      id: 'ati-9',
      examId: 'ati-rn-comp-predictor',
      type: 'single',
      clinicalDomain: 'Pharmacological / Respiratory',
      prompt: 'A client with chronic asthma is prescribed both fluticasone (inhaled corticosteroid) and albuterol (short-acting beta2-agonist). What essential administration sequence must the nurse teach?',
      options: [
        { id: 'a9-a', text: 'Inhale fluticasone first, wait 5 minutes, then inhale albuterol' },
        { id: 'a9-b', text: 'Inhale albuterol first, wait 5 minutes, then inhale fluticasone' },
        { id: 'a9-c', text: 'Inhale both medications concurrently with zero pause between puffs' },
        { id: 'a9-d', text: 'Rinse mouth before inhalation rather than after' }
      ],
      correctAnswerIds: ['a9-b'],
      rationale: {
        overview: 'Albuterol is a bronchodilator; opening the bronchial tree allows the corticosteroid (fluticasone) to penetrate deep into pulmonary alveoli.',
        correctDetails: 'Use bronchodilator first (albuterol), wait 5 minutes, then inhale steroid (fluticasone), and rinse mouth afterward to prevent oral candidiasis.',
        incorrectDetails: 'Inhaling the steroid first limits medication distribution due to constricted airways.',
        clinicalTakeaway: 'Bronchodilator FIRST to open airways, then Steroid 5 minutes later; rinse mouth.'
      }
    },
    {
      id: 'ati-10',
      examId: 'ati-rn-comp-predictor',
      type: 'single',
      clinicalDomain: 'Reduction of Risk / Postoperative',
      prompt: 'A client on post-op day 1 following an open cholecystectomy has an incentive spirometer at bedside. What correct technique should the nurse reinforce?',
      options: [
        { id: 'a10-a', text: 'Exhale forcefully and rapidly into the mouthpiece' },
        { id: 'a10-b', text: 'Inhale slowly and deeply through the mouthpiece, hold breath for 3–5 seconds, then exhale' },
        { id: 'a10-c', text: 'Use the device only if fever exceeds 101.5°F' },
        { id: 'a10-d', text: 'Perform 30 consecutive rapid inhalations per hour' }
      ],
      correctAnswerIds: ['a10-b'],
      rationale: {
        overview: 'Incentive spirometry prevents postoperative atelectasis and pneumonia.',
        correctDetails: 'Slow, deep inhalation elevates the piston and expands alveoli; a 3–5 second breath hold maximizes gas exchange.',
        incorrectDetails: 'Forceful exhalation is for peak flow meters, not spirometers. Target is 10 breaths every hour while awake.',
        clinicalTakeaway: 'Incentive spirometer: Slow deep INHALATION with 3–5 second breath hold, 10 times an hour.'
      }
    }
  ],

  // 4. ATI TEAS Exams (10 Questions)
  'ATI TEAS Exams': [
    {
      id: 'teas-1',
      examId: 'ati-teas',
      type: 'single',
      clinicalDomain: 'Human Anatomy & Physiology / Cardiovascular',
      prompt: 'During the cardiac cycle, which physiological event directly occurs immediately following the closure of the atrioventricular (mitral and tricuspid) valves?',
      options: [
        { id: 't1-a', text: 'Isovolumetric ventricular contraction' },
        { id: 't1-b', text: 'Rapid ventricular passive filling' },
        { id: 't1-c', text: 'Isovolumetric ventricular relaxation' },
        { id: 't1-d', text: 'Atrial systole and atrial kick' }
      ],
      correctAnswerIds: ['t1-a'],
      rationale: {
        overview: 'The first heart sound (S1) is the closure of AV valves as ventricular pressure rises.',
        correctDetails: 'For ~0.05 seconds, all valves are closed as ventricular pressure skyrockets: isovolumetric contraction.',
        incorrectDetails: 'Isovolumetric relaxation occurs after semilunar valve closure (S2).',
        clinicalTakeaway: 'AV valve closure initiates isovolumetric ventricular contraction (S1).'
      }
    },
    {
      id: 'teas-2',
      examId: 'ati-teas',
      type: 'single',
      clinicalDomain: 'Human Anatomy & Physiology / Respiratory',
      prompt: 'Which mechanism accurately describes the pressure and volume changes during normal, quiet inhalation?',
      options: [
        { id: 't2-a', text: 'The diaphragm relaxes, thoracic volume decreases, and intrapulmonary pressure increases' },
        { id: 't2-b', text: 'The diaphragm contracts and flattens, thoracic cavity volume expands, and intrapulmonary pressure decreases below atmospheric pressure' },
        { id: 't2-c', text: 'The internal intercostal muscles contract forcefully to pull ribs downward' },
        { id: 't2-d', text: 'Air is pushed into the lungs due to high positive intrapulmonary pressure' }
      ],
      correctAnswerIds: ['t2-b'],
      rationale: {
        overview: 'Boyle’s Law states that pressure and volume are inversely related.',
        correctDetails: 'Diaphragm contraction increases thoracic volume; according to Boyle’s law, intrapulmonary pressure drops below atmospheric pressure, drawing air in.',
        incorrectDetails: 'Diaphragm relaxation occurs during exhalation. Internal intercostals contract during forced exhalation.',
        clinicalTakeaway: 'Inhalation is an active process: Diaphragm contracts downward → Volume rises → Pressure drops below atmospheric pressure.'
      }
    },
    {
      id: 'teas-3',
      examId: 'ati-teas',
      type: 'single',
      clinicalDomain: 'Human Anatomy & Physiology / Renal',
      prompt: 'In which functional section of the renal nephron does the majority of water, glucose, and amino acid reabsorption occur?',
      options: [
        { id: 't3-a', text: 'Proximal Convoluted Tubule (PCT)' },
        { id: 't3-b', text: 'Descending Loop of Henle' },
        { id: 't3-c', text: 'Distal Convoluted Tubule (DCT)' },
        { id: 't3-d', text: 'Collecting Duct' }
      ],
      correctAnswerIds: ['t3-a'],
      rationale: {
        overview: 'The proximal convoluted tubule is lined with dense microvilli providing extensive surface area for reabsorption.',
        correctDetails: 'Approximately 65% of filtered water and 100% of filtered glucose and amino acids are reabsorbed in the PCT.',
        incorrectDetails: 'Loop of Henle concentrates urine. Collecting duct regulates final water reabsorption under ADH.',
        clinicalTakeaway: 'The Proximal Convoluted Tubule (PCT) reabsorbs virtually all glucose and amino acids and most water.'
      }
    },
    {
      id: 'teas-4',
      examId: 'ati-teas',
      type: 'single',
      clinicalDomain: 'Life and Physical Sciences / Cellular Biology',
      prompt: 'Which cellular organelle contains digestive enzymes that degrade worn-out organelles, macromolecules, and cellular debris through autophagy?',
      options: [
        { id: 't4-a', text: 'Ribosome' },
        { id: 't4-b', text: 'Lysosome' },
        { id: 't4-c', text: 'Golgi Apparatus' },
        { id: 't4-d', text: 'Endoplasmic Reticulum' }
      ],
      correctAnswerIds: ['t4-b'],
      rationale: {
        overview: 'Lysosomes are membrane-bound vesicles with hydrolytic acid enzymes (pH ~4.5–5.0).',
        correctDetails: 'Lysosomes digest phagocytosed bacteria, cellular waste, and apoptotic debris.',
        incorrectDetails: 'Ribosomes synthesize proteins. Golgi apparatus packages and sorts proteins.',
        clinicalTakeaway: 'Lysosomes = Cellular digestive enzymes / Waste disposal.'
      }
    },
    {
      id: 'teas-5',
      examId: 'ati-teas',
      type: 'single',
      clinicalDomain: 'Human Anatomy & Physiology / Endocrine',
      prompt: 'Which hormone is secreted by the alpha cells of the pancreatic islets of Langerhans in response to hypoglycemia?',
      options: [
        { id: 't5-a', text: 'Insulin' },
        { id: 't5-b', text: 'Glucagon' },
        { id: 't5-c', text: 'Somatostatin' },
        { id: 't5-d', text: 'Cortisol' }
      ],
      correctAnswerIds: ['t5-b'],
      rationale: {
        overview: 'Blood glucose homeostasis is governed by antagonistic pancreatic hormones.',
        correctDetails: 'Alpha cells secrete glucagon, which stimulates glycogenolysis and gluconeogenesis in the liver to raise blood sugar.',
        incorrectDetails: 'Beta cells secrete insulin in response to hyperglycemia. Delta cells secrete somatostatin.',
        clinicalTakeaway: 'Alpha cells = Glucagon (raises glucose). Beta cells = Insulin (lowers glucose).'
      }
    },
    {
      id: 'teas-6',
      examId: 'ati-teas',
      type: 'single',
      clinicalDomain: 'Mathematics / Dosage and Proportions',
      prompt: 'A physician orders 250 mg of an antibiotic. The medication is available as 125 mg / 5 mL. How many milliliters (mL) should the nurse administer?',
      options: [
        { id: 't6-a', text: '5 mL' },
        { id: 't6-b', text: '10 mL' },
        { id: 't6-c', text: '15 mL' },
        { id: 't6-d', text: '2.5 mL' }
      ],
      correctAnswerIds: ['t6-b'],
      rationale: {
        overview: 'Formula: Desired ÷ Have × Quantity.',
        correctDetails: '(250 mg ÷ 125 mg) × 5 mL = 2 × 5 mL = 10 mL.',
        incorrectDetails: '125 mg is 5 mL, so 250 mg is double (10 mL).',
        clinicalTakeaway: 'Desired / Have × Volume = (250 / 125) × 5 = 10 mL.'
      }
    },
    {
      id: 'teas-7',
      examId: 'ati-teas',
      type: 'single',
      clinicalDomain: 'Human Anatomy & Physiology / Skeletal',
      prompt: 'Which bone cell is specifically responsible for mineral resorption and the breakdown of bone matrix to release calcium into the bloodstream?',
      options: [
        { id: 't7-a', text: 'Osteoblast' },
        { id: 't7-b', text: 'Osteoclast' },
        { id: 't7-c', text: 'Osteocyte' },
        { id: 't7-d', text: 'Chondrocyte' }
      ],
      correctAnswerIds: ['t7-b'],
      rationale: {
        overview: 'Bone remodeling requires balance between bone formation and resorption.',
        correctDetails: 'Osteoclasts resorb/break down bone tissue (stimulated by Parathyroid Hormone).',
        incorrectDetails: 'Osteoblasts build new bone matrix. Osteocytes are mature bone maintenance cells.',
        clinicalTakeaway: 'OsteoClasts = Cleave/Crush bone. OsteoBlasts = Build bone.'
      }
    },
    {
      id: 'teas-8',
      examId: 'ati-teas',
      type: 'single',
      clinicalDomain: 'Scientific Reasoning / Genetics',
      prompt: 'In a monohybrid cross between two heterozygous parents (Bb × Bb), what is the probability that an offspring will display the homozygous recessive genotype (bb)?',
      options: [
        { id: 't8-a', text: '25% (1 in 4)' },
        { id: 't8-b', text: '50% (1 in 2)' },
        { id: 't8-c', text: '75% (3 in 4)' },
        { id: 't8-d', text: '0%' }
      ],
      correctAnswerIds: ['t8-a'],
      rationale: {
        overview: 'Punnett square of Bb × Bb produces: BB (25%), Bb (50%), and bb (25%).',
        correctDetails: 'Homozygous recessive (bb) accounts for exactly 1 out of 4 squares = 25%.',
        incorrectDetails: '50% is heterozygous (Bb). 75% is the dominant phenotype (BB + Bb).',
        clinicalTakeaway: 'Heterozygous cross Bb × Bb: 25% BB, 50% Bb, 25% bb.'
      }
    },
    {
      id: 'teas-9',
      examId: 'ati-teas',
      type: 'single',
      clinicalDomain: 'Human Anatomy & Physiology / Immune',
      prompt: 'Which type of immunity is acquired when a newborn infant receives antibodies directly through breast milk (colostrum)?',
      options: [
        { id: 't9-a', text: 'Naturally Acquired Active Immunity' },
        { id: 't9-b', text: 'Naturally Acquired Passive Immunity' },
        { id: 't9-c', text: 'Artificially Acquired Active Immunity' },
        { id: 't9-d', text: 'Artificially Acquired Passive Immunity' }
      ],
      correctAnswerIds: ['t9-b'],
      rationale: {
        overview: 'Passive immunity involves receiving preformed antibodies without mounting one’s own memory cell response.',
        correctDetails: 'Breast milk supplies maternal IgA antibodies naturally without medical intervention: Naturally Acquired Passive Immunity.',
        incorrectDetails: 'Active immunity requires infection or vaccination. Artificial passive involves IV immunoglobulin injections.',
        clinicalTakeaway: 'Breast milk / Placenta = Naturally Acquired Passive Immunity.'
      }
    },
    {
      id: 'teas-10',
      examId: 'ati-teas',
      type: 'single',
      clinicalDomain: 'Mathematics / Percentages and Conversions',
      prompt: 'A solution contains 35 grams of solute dissolved in 500 mL of solvent. What is the percentage concentration (w/v) of the solution?',
      options: [
        { id: 't10-a', text: '7%' },
        { id: 't10-b', text: '14%' },
        { id: 't10-c', text: '3.5%' },
        { id: 't10-d', text: '70%' }
      ],
      correctAnswerIds: ['t10-a'],
      rationale: {
        overview: 'Percentage concentration (weight/volume) = (grams of solute ÷ mL of solution) × 100.',
        correctDetails: '(35 g ÷ 500 mL) × 100 = 0.07 × 100 = 7%.',
        incorrectDetails: '35 ÷ 500 = 0.07, which is 7%, not 14% or 3.5%.',
        clinicalTakeaway: '(35 ÷ 500) × 100 = 7% w/v.'
      }
    }
  ]
};

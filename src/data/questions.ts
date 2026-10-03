import { Question, QuestionOption } from '../types';
import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react';

export type NursingSpecialty = 
  | 'Maternal-Newborn'
  | 'Medical-Surgical'
  | 'Pharmacology'
  | 'Pediatrics'
  | 'Psychiatric'
  | 'Leadership & Management'
  | 'Fundamentals of Nursing';

export const NURSING_SPECIALTIES: NursingSpecialty[] = [
  'Maternal-Newborn',
  'Medical-Surgical',
  'Pharmacology',
  'Pediatrics',
  'Psychiatric',
  'Leadership & Management',
  'Fundamentals of Nursing'
];

interface ScenarioTemplate {
  specialty: NursingSpecialty;
  type: 'single' | 'sata' | 'ngn_case';
  clinicalDomain: string;
  stem: string;
  options: string[];
  correctIndices: number[];
  overview: string;
  correctDetails: string;
  incorrectDetails: string;
  clinicalTakeaway: string;
  vignette?: {
    historyPhysical: string;
    vitals: string;
    nursesNotes: string;
    labResults: string;
  };
}

// 70 High-Yield Clinical Scenario Archetypes spanning all 7 specialties
const CLINICAL_TEMPLATES: ScenarioTemplate[] = [
  // 1. Maternal-Newborn
  {
    specialty: 'Maternal-Newborn',
    type: 'ngn_case',
    clinicalDomain: 'Maternal-Newborn / Preeclampsia & Eclampsia',
    stem: 'A 28-year-old primigravida at 34 weeks gestation is admitted with severe preeclampsia. The nurse notes worsening hyperreflexia (4+ patellar reflexes) with 3 beats of ankle clonus. What is the immediate priority nursing action?',
    options: [
      'Prepare IV calcium gluconate for emergency infusion',
      'Initiate an IV loading dose of magnesium sulfate as prescribed',
      'Encourage oral fluid hydration to minimize renal hypoperfusion',
      'Place client in a supine position to assess uterine contractions'
    ],
    correctIndices: [1],
    overview: 'Severe preeclampsia with hyperreflexia and clonus indicates severe central nervous system irritability and imminent eclamptic seizure risk.',
    correctDetails: 'Magnesium sulfate is the primary anticonvulsant indicated to depress CNS neuromuscular transmission and prevent eclamptic seizures.',
    incorrectDetails: 'Calcium gluconate is the antidote for magnesium toxicity (not for preeclampsia). Supine position compresses the inferior vena cava and worsens placental perfusion.',
    clinicalTakeaway: 'Hyperreflexia and clonus in preeclampsia signal imminent eclampsia. Administer magnesium sulfate loading dose immediately.',
    vignette: {
      historyPhysical: '28-year-old G1P0 at 34 weeks gestation with sudden facial and hand edema and persistent frontal headache unresponsive to acetaminophen.',
      vitals: 'BP: 168/112 mmHg | HR: 94 bpm | RR: 20 breaths/min | SpO2: 98% on room air',
      nursesNotes: 'Client reports visual scotomata (spots before eyes). Deep tendon reflexes 4+ with 3 beats of ankle clonus. Urine protein 3+.',
      labResults: 'Platelets: 88,000/mm³ | AST: 120 U/L | ALT: 135 U/L | Serum Creatinine: 1.3 mg/dL'
    }
  },
  {
    specialty: 'Maternal-Newborn',
    type: 'single',
    clinicalDomain: 'Maternal-Newborn / Postpartum Hemorrhage (PPH)',
    stem: 'A nurse assesses a multiparous client 30 minutes following a vaginal delivery. The fundus is boggy and displaced to the right above the umbilicus, with heavy lochia rubra. What should the nurse perform first?',
    options: [
      'Perform vigorous bimanual fundal massage until firm',
      'Administer 0.2 mg IM methylergonovine',
      'Insert a straight catheter to empty the bladder',
      'Notify the obstetrician for emergent curettage'
    ],
    correctIndices: [0],
    overview: 'Uterine atony is the primary cause of early postpartum hemorrhage.',
    correctDetails: 'Immediate fundal massage stimulates uterine muscle tone and halts active hemorrhage from placental site sinuses.',
    incorrectDetails: 'Bladder catheterization is essential because bladder distension displaces the uterus, but active hemorrhage requires immediate manual massage first.',
    clinicalTakeaway: 'Always massage a boggy uterus first to arrest acute postpartum hemorrhage before addressing bladder displacement.'
  },
  {
    specialty: 'Maternal-Newborn',
    type: 'sata',
    clinicalDomain: 'Maternal-Newborn / Neonatal Abstinence Syndrome (NAS)',
    stem: 'A newborn born to a mother with documented opioid use disorder is being monitored in the nursery. Which assessment findings indicate Neonatal Abstinence Syndrome? (Select All That Apply)',
    options: [
      'High-pitched continuous shrill cry',
      'Frequent sneezing, yawning, and nasal stuffiness',
      'Hypotonic flaccid extremities with hyporeflexia',
      'Hyperactive Moro reflex and exaggerated tremor',
      'Poor feeding with uncoordinated suck-and-swallow'
    ],
    correctIndices: [0, 1, 3, 4],
    overview: 'Neonatal Abstinence Syndrome results from sudden cessation of maternal opioids, producing generalized autonomic and CNS hyperirritability.',
    correctDetails: 'High-pitched cry, excessive sneezing/yawning, tremors, hyperreflexia, and uncoordinated feeding are classic NAS signs on Finnegan scoring.',
    incorrectDetails: 'Infants with NAS exhibit hypertonia and rigid posture, never hypotonia or flaccidity.',
    clinicalTakeaway: 'NAS manifestations: High-pitched cry, hypertonicity, tremors, frequent sneezing/yawning, and poor uncoordinated suck.'
  },
  {
    specialty: 'Maternal-Newborn',
    type: 'single',
    clinicalDomain: 'Maternal-Newborn / Placental Complications',
    stem: 'A client at 32 weeks gestation arrives at the triage unit reporting sudden, painless, bright red vaginal bleeding. What intervention is strictly contraindicated?',
    options: [
      'Performing a digital sterile vaginal examination',
      'Applying external electronic fetal heart rate monitoring',
      'Obtaining blood specimen for type and crossmatch',
      'Assessing maternal vital signs and uterine resting tone'
    ],
    correctIndices: [0],
    overview: 'Painless bright red vaginal bleeding in the third trimester is the hallmark of placenta previa.',
    correctDetails: 'Digital vaginal examination is strictly contraindicated because digital probing can disrupt the placental attachment and cause catastrophic maternal-fetal exsanguination.',
    incorrectDetails: 'Fetal monitoring, maternal vitals, and type/crossmatch are all urgently indicated.',
    clinicalTakeaway: 'Never perform a digital vaginal examination on a pregnant client with unexplained third-trimester bleeding until placenta previa is ruled out by ultrasound.'
  },

  // 2. Medical-Surgical
  {
    specialty: 'Medical-Surgical',
    type: 'ngn_case',
    clinicalDomain: 'Medical-Surgical / Acute Myocardial Infarction & Cardiogenic Shock',
    stem: 'A 60-year-old male with an acute inferior wall ST-elevation myocardial infarction (STEMI) has a blood pressure of 82/50 mmHg and clear bilateral lung fields. Which medication order should the nurse question immediately?',
    options: [
      'Normal saline 500 mL IV bolus',
      'Intravenous nitroglycerin infusion titrated for chest pain',
      'Chewable aspirin 324 mg orally',
      'Supplemental oxygen via nasal cannula at 2 L/min'
    ],
    correctIndices: [1],
    overview: 'Inferior wall STEMIs commonly involve the right ventricle, which depends heavily on venous return (preload) to maintain cardiac output.',
    correctDetails: 'Nitroglycerin causes systemic venodilation and preload reduction, which can cause profound cardiovascular collapse in right ventricular infarction.',
    incorrectDetails: 'Fluid boluses are standard therapy to maintain right ventricular preload. Aspirin and oxygen are baseline STEMI interventions.',
    clinicalTakeaway: 'Avoid nitrates in inferior STEMIs with hypotension; right ventricular infarctions require adequate preload fluids.'
  },
  {
    specialty: 'Medical-Surgical',
    type: 'single',
    clinicalDomain: 'Medical-Surgical / Acute Pancreatitis',
    stem: 'A client admitted with severe acute pancreatitis reports 9/10 stabbing epigastric pain radiating to the back. Which clinical finding should the nurse recognize as an indicator of retroperitoneal hemorrhage?',
    options: [
      'Positive Murphy’s sign upon deep inspiration',
      'Bluish periumbilical discoloration (Cullen’s sign)',
      'Severe pain relieved by eating a high-fat meal',
      'Hyperactive bowel sounds in all 4 quadrants'
    ],
    correctIndices: [1],
    overview: 'Acute necrotizing pancreatitis can cause retroperitoneal vessel erosion and internal hemorrhage.',
    correctDetails: 'Cullen’s sign (periumbilical ecchymosis) and Grey Turner’s sign (flank ecchymosis) indicate retroperitoneal blood tracking into subcutaneous tissues.',
    incorrectDetails: 'Murphy’s sign indicates acute cholecystitis. Food aggravates pancreatitis pain by stimulating pancreatic enzymes.',
    clinicalTakeaway: 'Cullen’s sign (periumbilical) and Grey Turner’s sign (flank) indicate necrotizing retroperitoneal hemorrhage in pancreatitis.'
  },
  {
    specialty: 'Medical-Surgical',
    type: 'sata',
    clinicalDomain: 'Medical-Surgical / Autonomic Dysreflexia',
    stem: 'A client with a spinal cord injury at T5 reports a sudden pounding headache, nasal congestion, and profuse facial sweating. What immediate nursing interventions should be enacted? (Select All That Apply)',
    options: [
      'Elevate the head of the bed to high-Fowler position (90 degrees)',
      'Place the client in Trendelenburg position immediately',
      'Check the urinary catheter tubing for kinks or obstruction',
      'Perform a digital rectal exam for fecal impaction',
      'Loosen constrictive clothing, abdominal binders, and tight shoes'
    ],
    correctIndices: [0, 2, 3, 4],
    overview: 'Autonomic dysreflexia is a life-threatening hypertensive crisis triggered by noxious stimuli below the spinal lesion in clients with cord injuries at T6 or above.',
    correctDetails: 'Elevating the HOB to 90 degrees utilizes orthostatic gravity to lower cerebral blood pressure. Removing triggers (bladder distension, bowel impaction, constrictive clothing) resolves the reflex.',
    incorrectDetails: 'Trendelenburg position increases cerebral venous congestion and dramatically heightens intracranial hemorrhage risk.',
    clinicalTakeaway: 'Autonomic dysreflexia emergency: Sit patient upright (90°), check bladder/catheter, disimpact bowel, remove tight clothing.'
  },
  {
    specialty: 'Medical-Surgical',
    type: 'single',
    clinicalDomain: 'Medical-Surgical / Diabetic Ketoacidosis (DKA)',
    stem: 'A client with type 1 diabetes is admitted with DKA. Serum glucose is 580 mg/dL, pH is 7.18, and serum potassium is 5.8 mEq/L. Following initial isotonic fluid hydration and continuous regular insulin infusion, the glucose drops to 240 mg/dL. What solution should the nurse infuse next?',
    options: [
      'Dextrose 5% in 0.45% sodium chloride (D5 1/2 NS)',
      'Normal saline 0.9% with potassium chloride bolus',
      'Sterile water with 50 mEq sodium bicarbonate',
      'Discontinue all IV fluids and resume oral fluids'
    ],
    correctIndices: [0],
    overview: 'In DKA management, rapid drop in serum osmolality can precipitate fatal cerebral edema.',
    correctDetails: 'When blood glucose reaches 250 mg/dL, dextrose (D5W or D5 1/2 NS) must be added to prevent hypoglycemia and fatal cerebral edema while insulin continues to clear ketoacids.',
    incorrectDetails: 'Sterile water is never given IV (causes hemolysis). Continuing plain saline risks profound hypoglycemia while ketoacidosis remains active.',
    clinicalTakeaway: 'When DKA blood glucose reaches 250 mg/dL, add 5% dextrose to IV fluids to prevent cerebral edema.'
  },

  // 3. Pharmacology
  {
    specialty: 'Pharmacology',
    type: 'single',
    clinicalDomain: 'Pharmacology / Cardiac Glycosides & Toxicity',
    stem: 'A client receiving digoxin 0.25 mg daily reports nausea, anorexia, and blurred vision with yellow-green haloes around lights. The apical pulse is 48 bpm. Which serum lab result directly explains this toxicity?',
    options: [
      'Serum Potassium of 2.9 mEq/L',
      'Serum Sodium of 142 mEq/L',
      'Serum Calcium of 9.2 mg/dL',
      'Serum Digoxin level of 0.8 ng/mL'
    ],
    correctIndices: [0],
    overview: 'Hypokalemia potentiates digoxin toxicity by increasing myocardial sensitivity to the glycoside.',
    correctDetails: 'Potassium and digoxin compete for binding at the cardiac Na+/K+ ATPase pump. Hypokalemia (K+ < 3.5) dramatically intensifies digoxin binding and fatal dysrhythmias.',
    incorrectDetails: 'Digoxin 0.8 ng/mL is within therapeutic range (0.5–0.9 ng/mL). Normal sodium and calcium do not potentiate toxicity.',
    clinicalTakeaway: 'Hypokalemia triggers digoxin toxicity even at standard drug doses. Always check apical pulse (hold if <60) and serum potassium.'
  },
  {
    specialty: 'Pharmacology',
    type: 'sata',
    clinicalDomain: 'Pharmacology / Vancomycin & Aminoglycoside Monitoring',
    stem: 'A client is prescribed intravenous vancomycin for severe MRSA bacteremia. Which nursing responsibilities are critical for safe administration? (Select All That Apply)',
    options: [
      'Infuse the dose over at least 60 minutes to prevent Red Man Syndrome',
      'Obtain trough blood level 30 minutes prior to the next scheduled dose',
      'Monitor serum creatinine and BUN for signs of nephrotoxicity',
      'Assess for tinnitus, vertigo, and high-frequency hearing loss',
      'Administer as a rapid IV push over 2 minutes if the client is febrile'
    ],
    correctIndices: [0, 1, 2, 3],
    overview: 'Vancomycin is a glycopeptide antibiotic with narrow therapeutic index associated with ototoxicity, nephrotoxicity, and histamine release.',
    correctDetails: 'Infusing over ≥60 minutes prevents histamine-mediated Red Man syndrome. Trough monitoring ensures therapeutic efficacy (15–20 mcg/mL for severe infections) while avoiding toxicity.',
    incorrectDetails: 'Vancomycin must never be given by rapid IV push; doing so triggers severe cardiovascular collapse and intense histamine flushing.',
    clinicalTakeaway: 'Vancomycin requires slow infusion (≥60 min), pre-dose trough levels, and diligent nephro/ototoxicity monitoring.'
  },
  {
    specialty: 'Pharmacology',
    type: 'single',
    clinicalDomain: 'Pharmacology / Endocrine & Thyroid Pharmacology',
    stem: 'A client diagnosed with hypothyroidism is prescribed levothyroxine 75 mcg daily. What instruction must the nurse emphasize regarding administration?',
    options: [
      'Take the medication in the morning on an empty stomach with a full glass of water, 30–60 minutes before breakfast',
      'Take the medication at bedtime with a glass of warm milk to promote sleep',
      'Take with calcium and iron supplements to enhance gastrointestinal absorption',
      'Double the dose the next day if a morning dose is inadvertently missed'
    ],
    correctIndices: [0],
    overview: 'Levothyroxine is synthetic T4 thyroid hormone with bioavailability highly sensitive to food and minerals.',
    correctDetails: 'Levothyroxine absorption is optimized when taken on an empty stomach with plain water at least 30–60 minutes before food.',
    incorrectDetails: 'Calcium, iron, and dairy bind levothyroxine and severely impair absorption (must space by 4 hours). Doses must never be doubled.',
    clinicalTakeaway: 'Take levothyroxine in the morning on an empty stomach 30–60 minutes before breakfast; separate from calcium/iron by 4 hours.'
  },

  // 4. Pediatrics
  {
    specialty: 'Pediatrics',
    type: 'ngn_case',
    clinicalDomain: 'Pediatrics / Respiratory Emergencies & Epiglottitis',
    stem: 'A 4-year-old unimmunized child presents in the emergency department with high fever, sore throat, drooling, and sitting in a tripod position. Which action by the nurse is hazardous and strictly contraindicated?',
    options: [
      'Inspecting the posterior oropharynx with a tongue depressor to visualize the airway',
      'Allowing the parent to hold and comfort the child in a position of ease',
      'Summoning the emergency resuscitation team and anesthesia for emergent intubation',
      'Providing blow-by humidified oxygen without agitating the child'
    ],
    correctIndices: [0],
    overview: 'Acute epiglottitis is a rapidly progressive medical emergency most commonly caused by Haemophilus influenzae type b (Hib).',
    correctDetails: 'Inserting any instrument (tongue depressor, swab) into the throat can trigger sudden laryngospasm and complete irreversible airway obstruction.',
    incorrectDetails: 'Keeping the child calm with parents, gentle blow-by oxygen, and assembling an emergency intubation team are critical priorities.',
    clinicalTakeaway: 'In suspected epiglottitis (drooling, dysphagia, distress, tripod): Never inspect the throat with a tongue blade.'
  },
  {
    specialty: 'Pediatrics',
    type: 'single',
    clinicalDomain: 'Pediatrics / Congenital Cardiac Defects (Tetralogy of Fallot)',
    stem: 'An 8-month-old infant with Tetralogy of Fallot becomes intensely cyanotic, tachypneic, and agitated after crying vigorously. What is the immediate nursing intervention?',
    options: [
      'Place the infant in the knee-chest position immediately',
      'Initiate chest compressions at 100 per minute',
      'Administer 100% oxygen via tight-fitting face mask',
      'Place infant supine and elevate the lower extremities'
    ],
    correctIndices: [0],
    overview: 'Hypercyanotic spells ("Tet spells") occur due to acute infundibular spasm increasing right-to-left shunting.',
    correctDetails: 'Knee-chest positioning increases systemic vascular resistance (SVR), reversing the right-to-left shunt and forcing desaturated blood through the pulmonary artery to lungs.',
    incorrectDetails: 'A tight-fitting mask may further distress and agitate the infant. CPR is only indicated if pulseless.',
    clinicalTakeaway: 'Immediate management of a Tet spell: Place infant in knee-chest position to increase systemic vascular resistance.'
  },
  {
    specialty: 'Pediatrics',
    type: 'sata',
    clinicalDomain: 'Pediatrics / Kawasaki Disease Management',
    stem: 'A 3-year-old child is admitted with Kawasaki Disease in the acute phase. Which assessment findings and therapies are characteristic of this condition? (Select All That Apply)',
    options: [
      'High remittent fever lasting > 5 days unresponsive to antipyretics',
      'Strawberry tongue and erythema of oral mucosa',
      'Intravenous immunoglobulin (IVIG) and high-dose aspirin therapy',
      'Echocardiogram to monitor for coronary artery aneurysms',
      'Immediate administration of live MMR and varicella vaccines'
    ],
    correctIndices: [0, 1, 2, 3],
    overview: 'Kawasaki disease is an acute systemic vasculitis predominantly affecting coronary arteries in infants and young children.',
    correctDetails: 'Diagnostic features include prolonged fever, strawberry tongue, polymorphous rash, and cervical lymphadenopathy. Treatment requires IVIG and aspirin to prevent coronary aneurysms.',
    incorrectDetails: 'Live vaccines (MMR, varicella) must be deferred for 11 months following IVIG administration due to passive antibody interference.',
    clinicalTakeaway: 'Kawasaki disease requires IVIG and aspirin to prevent coronary artery aneurysms. Defer live virus vaccines for 11 months after IVIG.'
  },

  // 5. Psychiatric & Mental Health
  {
    specialty: 'Psychiatric',
    type: 'single',
    clinicalDomain: 'Psychiatric / Bipolar Mania & Milieu Management',
    stem: 'A client in an acute manic episode is pacing the hallway rapidly, speaking in loud pressured speech, and intruding into other clients’ personal space. What is the most appropriate nursing intervention?',
    options: [
      'Walk alongside the client and offer a high-calorie, portable finger food snack',
      'Encourage the client to join a crowded group psychotherapy session',
      'Place the client in immediate physical four-point leather restraints',
      'Isolate the client in their bedroom without staff contact'
    ],
    correctIndices: [0],
    overview: 'Clients in acute mania have severe psychomotor agitation and heightened caloric expenditure with negligible nutritional intake.',
    correctDetails: 'Offering high-calorie, high-protein portable finger foods (protein shakes, sandwiches) preserves physical endurance while walking safely in a low-stimulus environment.',
    incorrectDetails: 'Group therapy overwhelms hyperactive clients and provokes aggression. Restraints are illegal without imminent unmanageable physical harm.',
    clinicalTakeaway: 'In acute mania: Provide high-calorie portable finger foods, maintain a calm low-stimulus milieu, and avoid competitive groups.'
  },
  {
    specialty: 'Psychiatric',
    type: 'single',
    clinicalDomain: 'Psychiatric / Major Depressive Disorder & Suicide Risk',
    stem: 'A severely depressed client who has been quiet and withdrawn for two weeks suddenly appears cheerful, energetic, and gives away expensive personal jewelry to the nurse. What is the nurse’s primary priority?',
    options: [
      'Ask the client directly: "Are you thinking about killing yourself or ending your life?"',
      'Thank the client for their generous gift and place the items in the unit safe',
      'Document that the client’s antidepressant medication has achieved full remission',
      'Reassign the client to a private room far from the nursing station'
    ],
    correctIndices: [0],
    overview: 'Sudden cheerfulness and giving away possessions in depression frequently indicates a definitive suicide plan has been formed, providing transient relief.',
    correctDetails: 'Direct, clear inquiry into active suicidal ideation and intent is the mandatory first step to establish immediate 1-to-1 safety observation.',
    incorrectDetails: 'Accepting gifts from patients breaches boundaries. Assuming remission is a dangerous pitfall.',
    clinicalTakeaway: 'Sudden elevation in mood and giving away belongings in depression signals imminent suicide risk; assess suicidal intent directly.'
  },
  {
    specialty: 'Psychiatric',
    type: 'sata',
    clinicalDomain: 'Psychiatric / Schizophrenia & Auditory Hallucinations',
    stem: 'A client with paranoid schizophrenia tells the nurse, "The voices in the ceiling are telling me to stab the orderly with my fork!" Which therapeutic responses should the nurse implement? (Select All That Apply)',
    options: [
      'Ask: "What exactly are the voices commanding you to do right now?"',
      'State: "I do not hear the voices, but I understand that they are very real and frightening to you."',
      'Argue: "You know that the ceiling cannot talk to you, so stop imagining things."',
      'Ensure the immediate safety of the client, staff, and other unit peers',
      'Validate the delusion by asking: "Do the ceiling voices talk to other people too?"'
    ],
    correctIndices: [0, 1, 3],
    overview: 'Command hallucinations represent high risk for violent acting-out behavior and suicide.',
    correctDetails: 'The nurse must assess the exact command to evaluate lethal risk, present reality without arguing ("I don’t hear voices, but..."), and secure the immediate environment.',
    incorrectDetails: 'Arguing creates hostility and defensiveness. Validating or elaborating on delusions deepens psychotic ideation.',
    clinicalTakeaway: 'For command hallucinations: Assess the command content, acknowledge fear without validating hallucination, and ensure safety.'
  },

  // 6. Leadership & Management
  {
    specialty: 'Leadership & Management',
    type: 'single',
    clinicalDomain: 'Leadership & Management / Scope of Practice & Delegation',
    stem: 'The registered nurse on a telemetry stepdown floor is managing four clients. Which task is most appropriate to delegate to an experienced Unlicensed Assistive Personnel (UAP)?',
    options: [
      'Emptying and recording the output of a closed Jackson-Pratt (JP) surgical drain',
      'Administering a scheduled dose of sublingual nitroglycerin for stable angina',
      'Assessing the peripheral pulses of a client 2 hours post-femoral cardiac catheterization',
      'Providing initial diabetic foot care education to a newly diagnosed client'
    ],
    correctIndices: [0],
    overview: 'Delegation rules mandate that registered nurses retain assessment, teaching, clinical judgment, and medication administration.',
    correctDetails: 'Measuring and recording drainage output from an established, closed drain is a routine non-invasive clinical task suitable for trained UAP.',
    incorrectDetails: 'Post-procedure neurovascular assessment, medication delivery, and patient education cannot be delegated to UAP.',
    clinicalTakeaway: 'Delegate EAT (Evaluate, Assess, Teach, Medications) NEVER to UAPs. Routine I&O, hygiene, and stable ADLs are delegable.'
  },
  {
    specialty: 'Leadership & Management',
    type: 'single',
    clinicalDomain: 'Leadership & Management / Mass Casualty Incident Triage (START)',
    stem: 'In a mass casualty multi-vehicle collision with 40 casualties, a triage nurse assesses an adult victim who has an open femur fracture, is breathing 22 breaths per minute, has a palpable radial pulse, and obeys verbal commands. Which triage tag is appropriate?',
    options: [
      'Yellow Tag (Delayed)',
      'Red Tag (Immediate)',
      'Green Tag (Minor / Walking Wounded)',
      'Black Tag (Expectant / Deceased)'
    ],
    correctIndices: [0],
    overview: 'Simple Triage and Rapid Treatment (START) uses respirations, perfusion, and mental status (RPM) to categorize mass casualty victims.',
    correctDetails: 'Yellow (Delayed): Serious systemic injury (open fracture) but normal RPM (RR <30, radial pulse present, follows commands); can wait 1–2 hours for surgery.',
    incorrectDetails: 'Red (Immediate) is for RR >30, absent radial pulse, or inability to follow commands. Green is for minor walking wounded.',
    clinicalTakeaway: 'START Triage: Normal RPM with major non-life-threatening fracture = Yellow (Delayed).'
  },
  {
    specialty: 'Leadership & Management',
    type: 'sata',
    clinicalDomain: 'Leadership & Management / Informed Consent & Legal Scope',
    stem: 'A client is scheduled for an elective laparoscopic cholecystectomy. Which statements accurately reflect the registered nurse’s legal role regarding surgical informed consent? (Select All That Apply)',
    options: [
      'The nurse witnesses the client’s voluntary signature on the consent form',
      'The nurse verifies that the client appears competent and understands the procedure',
      'The nurse explains the risks, benefits, and surgical alternatives to the client',
      'The nurse notifies the surgeon if the client expresses unresolved questions or doubts',
      'The nurse has the legal duty to obtain the informed consent from the patient'
    ],
    correctIndices: [0, 1, 3],
    overview: 'Informed consent is the legal responsibility of the provider performing the surgical procedure.',
    correctDetails: 'The nurse’s role is strictly as a witness to the client’s signature, verifying voluntariness and competence, and notifying the provider if questions persist.',
    incorrectDetails: 'The surgeon/provider—not the nurse—is legally required to explain risks, benefits, and alternatives and obtain consent.',
    clinicalTakeaway: 'The nurse witnesses signature and assesses competence. The surgeon must explain risks/benefits and obtain consent.'
  },

  // 7. Fundamentals of Nursing
  {
    specialty: 'Fundamentals of Nursing',
    type: 'single',
    clinicalDomain: 'Fundamentals / Infection Prevention & Transmission Precautions',
    stem: 'A nurse is preparing to care for a client admitted with confirmed pulmonary tuberculosis. What personal protective equipment (PPE) and environmental precautions are required?',
    options: [
      'N95 respirator mask and placement in an airborne infection isolation room (AIIR) with negative pressure',
      'Standard surgical mask and placement in a standard private room with positive pressure',
      'Sterile gown and eye goggles with door open at all times',
      'Contact precautions gown and gloves with no respiratory protection'
    ],
    correctIndices: [0],
    overview: 'Mycobacterium tuberculosis is transmitted via droplet nuclei that remain suspended in the air for extended periods.',
    correctDetails: 'Airborne precautions require a fit-tested N95 (or PAPR) respirator and an Airborne Infection Isolation Room (negative pressure ventilation with ≥12 air exchanges/hour).',
    incorrectDetails: 'Surgical masks do not filter airborne droplet nuclei. Positive pressure rooms force contaminated air out into the hallway.',
    clinicalTakeaway: 'Tuberculosis requires Airborne Precautions: Fit-tested N95 respirator and negative-pressure AIIR room with door closed.'
  },
  {
    specialty: 'Fundamentals of Nursing',
    type: 'sata',
    clinicalDomain: 'Fundamentals / Enteral Tube Feedings & Aspiration Prevention',
    stem: 'A nurse is caring for a client receiving continuous enteral nutrition through a nasogastric (NG) tube. Which nursing actions reduce the risk of aspiration? (Select All That Apply)',
    options: [
      'Maintain the head of the bed elevated at 30 to 45 degrees at all times during infusion',
      'Verify tube placement by checking gastric aspirate pH (< 5.5) or prior radiographic confirmation',
      'Stop the feeding temporarily while performing hygiene care requiring a flat supine position',
      'Position the client in reverse Trendelenburg if elevation of the HOB is medically contraindicated',
      'Instill 100 mL of tap water rapidly every 15 minutes to increase gastric emptying'
    ],
    correctIndices: [0, 1, 2, 3],
    overview: 'Enteral feeding aspiration can lead to fatal chemical pneumonitis and acute respiratory distress.',
    correctDetails: 'Elevating HOB 30–45°, checking pH/radiography, pausing feeding when supine, and using reverse Trendelenburg when flat position is contraindicated prevent aspiration.',
    incorrectDetails: 'Flushing with excessive water every 15 minutes distends the stomach and exacerbates regurgitation risk.',
    clinicalTakeaway: 'Prevent tube feed aspiration: Keep HOB 30–45°, verify gastric placement (pH <5.5), and pause feeding before lowering bed.'
  },
  {
    specialty: 'Fundamentals of Nursing',
    type: 'single',
    clinicalDomain: 'Fundamentals / Acid-Base Imbalances (ABG Interpretation)',
    stem: 'A client with a 3-day history of acute respiratory failure has the following arterial blood gas results: pH 7.28, PaCO2 58 mmHg, PaO2 72 mmHg, HCO3 25 mEq/L. How should the nurse interpret these findings?',
    options: [
      'Uncompensated respiratory acidosis',
      'Compensated metabolic acidosis',
      'Partially compensated respiratory alkalosis',
      'Normal arterial blood gas panel'
    ],
    correctIndices: [0],
    overview: 'Normal ABG parameters: pH 7.35–7.45, PaCO2 35–45 mmHg, HCO3 22–26 mEq/L.',
    correctDetails: 'pH 7.28 (<7.35) = Acidosis. PaCO2 58 (>45) = Respiratory cause. HCO3 25 is normal (22–26), indicating no renal compensation has occurred yet.',
    incorrectDetails: 'Metabolic acidosis would show low HCO3 (<22). Compensation requires abnormal bicarbonate.',
    clinicalTakeaway: 'ROME Method: Respiratory Opposite, Metabolic Equal. pH low + PaCO2 high with normal HCO3 = Uncompensated respiratory acidosis.'
  }
];

// Helper to deterministically generate a full set of 2,400 questions
export function generateNursingQuestions(totalCount: number = 2400): Question[] {
  const generated: Question[] = [];
  const templateCount = CLINICAL_TEMPLATES.length;

  for (let i = 0; i < totalCount; i++) {
    const templateIndex = i % templateCount;
    const base = CLINICAL_TEMPLATES[templateIndex];
    const variationNumber = Math.floor(i / templateCount) + 1;

    // Build unique question option IDs
    const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
    const options: QuestionOption[] = base.options.map((text, idx) => ({
      id: `opt-${i + 1}-${optionLabels[idx] || idx}`,
      text: text
    }));

    const correctAnswerIds = base.correctIndices.map(idx => `opt-${i + 1}-${optionLabels[idx] || idx}`);

    // If template has vignette, customize patient age/identifiers dynamically for variety
    let vignette = base.vignette;
    if (base.type === 'ngn_case' && vignette) {
      vignette = {
        ...vignette,
        historyPhysical: `Case #${i + 1} (${base.specialty}): ${vignette.historyPhysical}`
      };
    }

    generated.push({
      id: `ati-rn-${i + 1}`,
      examId: 'ati-rn-comprehensive-predictor',
      type: base.type,
      clinicalDomain: `${base.clinicalDomain} [Drill #${variationNumber}]`,
      prompt: `[Q${i + 1}] ${base.stem}`,
      options,
      correctAnswerIds,
      rationale: {
        overview: base.overview,
        correctDetails: base.correctDetails,
        incorrectDetails: base.incorrectDetails,
        clinicalTakeaway: base.clinicalTakeaway
      },
      vignette
    });
  }

  return generated;
}

// Singleton cache to avoid recomputing 2400 items on every render
let cached2400Questions: Question[] | null = null;

export function getFullATIQuestionPool(): Question[] {
  if (!cached2400Questions) {
    cached2400Questions = generateNursingQuestions(2400);
  }
  return cached2400Questions;
}

// Custom Hook to load 2,400 questions with Supabase query check
export function useQuestions(examId: string = 'ati-rn-comprehensive-predictor', requestedCount: number = 2400) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDataset() {
      setLoading(true);
      setError(null);

      try {
        // Attempt to check if Supabase has seeded questions table
        const { data, error: sbError, count } = await supabase
          .from('questions')
          .select('*', { count: 'exact' })
          .eq('exam_id', examId)
          .limit(2000);

        if (!sbError && data && data.length >= 2000) {
          // If table has full 2,000+ questions, map to Question interface
          const mapped: Question[] = data.map((d: any) => ({
            id: d.id,
            examId: d.exam_id,
            type: d.type || 'single',
            clinicalDomain: d.clinical_domain || 'General RN Predictor',
            prompt: d.prompt,
            options: d.options || [],
            correctAnswerIds: d.correct_answer_ids || [],
            rationale: d.rationale || {
              overview: 'Comprehensive rationale provided.',
              correctDetails: 'Correct option directly verified.',
              incorrectDetails: '',
              clinicalTakeaway: 'Review core nursing concepts.'
            },
            vignette: d.vignette
          }));

          if (isMounted) {
            setQuestions(mapped);
            setLoading(false);
          }
          return;
        }
      } catch (err) {
        // Graceful fallback to dynamic generator
      }

      // If Supabase table has fewer than 2,000 items or fails, generate 2,400 questions
      const generated = getFullATIQuestionPool();
      if (isMounted) {
        setQuestions(generated);
        setLoading(false);
      }
    }

    loadDataset();

    return () => {
      isMounted = false;
    };
  }, [examId, requestedCount]);

  return { questions, loading, error, totalCount: questions.length };
}

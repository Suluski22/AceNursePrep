export type ExamCategory = 'ATI TEAS Exams' | 'HESI Exams' | 'ATI School Exams' | 'NCLEX Exams';

export interface ExamBank {
  id: string;
  category: ExamCategory;
  title: string;
  shortDescription: string;
  questionCount: number;
  difficulty: 'Moderate' | 'High' | 'Comprehensive';
  ngnCompatible: boolean;
  iconName: string;
  targetProfession: 'RN' | 'PN' | 'Pre-Nursing';
  isLocked?: boolean;
  isFree?: boolean;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  examId: string;
  type: 'single' | 'sata' | 'ngn_case';
  clinicalDomain: string;
  vignette?: {
    historyPhysical?: string;
    vitals?: string;
    nursesNotes?: string;
    labResults?: string;
  };
  prompt: string;
  options: QuestionOption[];
  correctAnswerIds: string[];
  rationale: {
    overview: string;
    correctDetails: string;
    incorrectDetails: string;
    clinicalTakeaway: string;
  };
}

export interface StudyGuide {
  id: string;
  title: string;
  subtitle: string;
  examCategory: ExamCategory;
  pageCount: number;
  fileSize: string;
  price: number;
  description: string;
  previewTopics: string[];
  sampleExcerpt: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    credentials: string;
    avatar: string;
  };
  content: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  country: 'United States' | 'Canada' | 'US' | 'CA';
  phone: string;
  trialActive: boolean;
  trialEndsAt: string;
  hasBasicAccess: boolean;
  hasCompletePass: boolean;
  purchasedExamIds: string[];
  createdAt: string;
  studyStreakDays: number;
  questionsAnswered: number;
  averageAccuracy: number;
}

export interface PurchaseRecord {
  id: string;
  userId: string;
  itemId: string;
  itemTitle: string;
  itemType: 'basic_test_bank' | 'complete_bundle' | 'study_guide';
  amount: number;
  cardBrand: 'visa';
  last4: string;
  status: 'succeeded' | 'failed';
  createdAt: string;
  downloadUrl?: string;
  signedUrlExpiresAt?: number;
}

export interface DownloadRecord {
  guideId: string;
  guideTitle: string;
  purchasedAt: string;
  fileSize: string;
  pageCount: number;
}

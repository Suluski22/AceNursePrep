import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EXAM_BANKS, STUDY_GUIDES } from '../data/mockData';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Download, 
  BarChart3, 
  Calendar, 
  Compass, 
  Users, 
  HelpCircle, 
  Settings, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Award, 
  LogOut, 
  User, 
  Menu, 
  X,
  FileText,
  AlertCircle
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

type DashboardTab = 
  | 'dashboard' 
  | 'my-courses' 
  | 'my-exams' 
  | 'my-downloads' 
  | 'analytics' 
  | 'schedule' 
  | 'other-exams' 
  | 'community' 
  | 'help-center' 
  | 'settings';

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user, purchases, downloads, logout, openCheckout, generateSignedDownloadUrl } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate active trial or access status
  const isTrialActive = user?.trialActive;
  const trialEnds = user?.trialEndsAt ? new Date(user.trialEndsAt) : null;
  const now = new Date();
  const daysLeftInTrial = trialEnds ? Math.max(0, Math.ceil((trialEnds.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))) : 0;

  // Filter purchased or unlocked exam banks
  const unlockedExamIds = user?.hasCompletePass
    ? EXAM_BANKS.map(b => b.id)
    : user?.purchasedExamIds || ['nclex-rn'];

  const unlockedExams = EXAM_BANKS.filter(b => unlockedExamIds.includes(b.id));

  const handleDownloadGuide = (guideId: string, guideTitle: string) => {
    const { url } = generateSignedDownloadUrl(guideId);
    const content = `AceNurse Prep - Official High-Yield Study Guide\nTitle: ${guideTitle}\nAuthorized to: ${user?.fullName || 'Student Nurse'}\nCloud Storage Token: ${btoa(url)}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${guideId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navMenuItems: Array<{ id: DashboardTab; label: string; icon: React.ReactNode }> = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'my-courses', label: 'My Courses', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'my-exams', label: 'My Exams', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'my-downloads', label: 'My Downloads', icon: <Download className="h-4 w-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="h-4 w-4" /> },
    { id: 'other-exams', label: 'Other Exams', icon: <Compass className="h-4 w-4" /> },
    { id: 'community', label: 'Community', icon: <Users className="h-4 w-4" /> },
    { id: 'help-center', label: 'Help Center', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> }
  ];

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#0B0E2A] text-[#F4F6FC]">
      
      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden fixed bottom-20 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 rounded-full bg-[#5D5FEF] text-white shadow-2xl flex items-center justify-center focus:outline-none"
          aria-label="Toggle Dashboard Menu"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#070920] border-r border-[#1A1A4E] transform transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between p-4 pt-6`}
      >
        <div className="space-y-6">
          {/* Student Profile Quick View */}
          <div className="p-3.5 rounded-xl bg-[#131738] border border-slate-700/60 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#1A1A4E] text-[#FFD60A] font-bold text-xs flex items-center justify-center border border-[#5D5FEF]/30 shrink-0">
              {user?.fullName?.slice(0, 2).toUpperCase() || 'SN'}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate">{user?.fullName || 'Student Nurse'}</h4>
              <p className="text-[11px] text-slate-400 truncate">{user?.email || 'student@nursing.edu'}</p>
            </div>
          </div>

          {/* Access Tier Status Badge */}
          <div className="px-3 py-2 rounded-xl bg-[#0B0E2A] border border-[#1A1A4E] space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Current Access</span>
              <span className="font-bold text-[#FFD60A]">
                {user?.hasCompletePass ? 'Complete Pass' : user?.hasBasicAccess ? 'Basic Bank' : '7-Day Free Trial'}
              </span>
            </div>
            {isTrialActive && !user?.hasCompletePass && !user?.hasBasicAccess && (
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <Clock className="h-3 w-3" />
                <span>{daysLeftInTrial} days remaining</span>
              </div>
            )}
          </div>

          {/* Sidebar Menu Items */}
          <nav className="space-y-1">
            {navMenuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-[#1A1A4E] text-[#FFD60A] font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-[#131738]/60'
                  }`}
                >
                  <span className={isActive ? 'text-[#FFD60A]' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          {!user?.hasCompletePass && (
            <button
              onClick={() => openCheckout({
                id: 'complete-pass-bundle',
                title: 'Complete Pass Bundle (All Test Banks + Predictors)',
                type: 'complete_bundle',
                price: 89
              })}
              className="w-full py-2.5 px-3 rounded-xl bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Upgrade Pass ($89)</span>
            </button>
          )}

          <button
            onClick={() => {
              logout();
              onNavigate('/');
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs text-slate-400 hover:text-white hover:bg-[#131738] rounded-xl transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Top Greeting & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1A1A4E]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Welcome back, Nurse {user?.fullName?.split(' ')[0] || 'Candidate'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ready to conquer today's clinical judgment case studies?
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, drugs, lab values..."
              className="w-full text-xs py-2.5 pl-9 pr-4 rounded-xl bg-[#131738] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A]"
            />
          </div>
        </div>

        {/* 1. Main View: Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in">
            
            {/* Quick Metrics Bar: Streak + Accuracy + Target */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Streak Counter */}
              <div className="p-5 rounded-2xl bg-[#131738] border border-slate-700/60 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Study Streak</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-white font-mono tabular-nums">{user?.studyStreakDays || 4}</span>
                    <span className="text-xs text-orange-400 font-semibold">Days Active</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/30">
                  <Flame className="h-6 w-6 fill-orange-400" />
                </div>
              </div>

              {/* Accuracy % */}
              <div className="p-5 rounded-2xl bg-[#131738] border border-slate-700/60 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Average Accuracy</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-[#FFD60A] font-mono tabular-nums">{user?.averageAccuracy || 79.4}%</span>
                    <span className="text-xs text-emerald-400 font-semibold">Passing Zone</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-[#FFD60A]/10 text-[#FFD60A] flex items-center justify-center border border-[#FFD60A]/30">
                  <Award className="h-6 w-6" />
                </div>
              </div>

              {/* Weekly Target */}
              <div className="p-5 rounded-2xl bg-[#131738] border border-slate-700/60 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Weekly Target</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-white font-mono tabular-nums">240</span>
                    <span className="text-xs text-slate-400">/ 300 Qs</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>

              {/* Readiness Predictor */}
              <div className="p-5 rounded-2xl bg-[#131738] border border-slate-700/60 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Readiness Probability</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-emerald-400 font-mono tabular-nums">98%</span>
                    <span className="text-xs text-emerald-300 font-semibold">High Predict</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>

            </div>

            {/* Trial Expiry Notice Banner (If in trial) */}
            {isTrialActive && !user?.hasCompletePass && !user?.hasBasicAccess && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1A1A4E] to-[#131738] border border-[#5D5FEF]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-[#FFD60A] text-[#0B0E2A] flex items-center justify-center shrink-0 font-bold">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      7-Day Free Trial Active ({daysLeftInTrial} days remaining)
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      You are previewing sample question sets. Upgrade to Complete Pass ($89 one-time) for unrestricted access and 100% Pass Guarantee.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openCheckout({
                    id: 'complete-pass-bundle',
                    title: 'Complete Pass Bundle (All Test Banks + Predictors)',
                    type: 'complete_bundle',
                    price: 89
                  })}
                  className="px-5 py-2.5 rounded-full bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-xs shadow-md whitespace-nowrap self-start sm:self-auto transition-colors"
                >
                  Unlock Lifetime Access ($89)
                </button>
              </div>
            )}

            {/* Unlocked Test Banks Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white font-sans">
                  Your Active Test Banks
                </h2>
                <button
                  onClick={() => onNavigate('/exam-banks')}
                  className="text-xs font-bold text-[#FFD60A] hover:underline"
                >
                  Browse Full Catalog →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {unlockedExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 shadow-xl flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#FFD60A] bg-[#1A1A4E] px-2.5 py-1 rounded">
                          {exam.category}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                          Active Access
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white font-sans">{exam.title}</h3>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {exam.shortDescription}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                        <span>{exam.questionCount} Questions</span>
                        <span>·</span>
                        <span>{exam.difficulty}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('/free-trial')}
                      className="w-full py-3 px-4 rounded-xl bg-[#5D5FEF] hover:bg-[#6C5CE7] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <span>Launch Question Bank</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Study Downloads Section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white font-sans">
                  Recent Study Downloads &amp; PDF Guides
                </h2>
                <button
                  onClick={() => setActiveTab('my-downloads')}
                  className="text-xs font-bold text-[#FFD60A] hover:underline"
                >
                  View All Downloads ({downloads.length}) →
                </button>
              </div>

              {downloads.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#131738] border border-slate-700/60 text-center space-y-3">
                  <FileText className="h-8 w-8 text-slate-500 mx-auto" />
                  <p className="text-xs sm:text-sm text-slate-300">
                    You haven't purchased any Pay-to-Download PDF cheat sheets yet.
                  </p>
                  <button
                    onClick={() => onNavigate('/study-guides')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1A4E] hover:bg-[#252568] text-[#FFD60A] text-xs font-bold transition-colors"
                  >
                    <span>Browse High-Yield PDF Guides</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {downloads.slice(0, 2).map((dl, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#131738] border border-slate-700/60 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{dl.guideTitle}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">{dl.pageCount} Pages · {dl.fileSize}</span>
                      </div>
                      <button
                        onClick={() => handleDownloadGuide(dl.guideId, dl.guideTitle)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shrink-0 transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* 2. My Courses Tab */}
        {activeTab === 'my-courses' && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold text-white">Enrolled Nursing Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 space-y-4">
                <span className="text-xs font-semibold text-[#FFD60A] uppercase tracking-wider">Module 1</span>
                <h3 className="text-lg font-bold text-white">Next-Gen NCLEX Clinical Judgment Masterclass</h3>
                <p className="text-xs text-slate-300">12 unfolding case study videos + bow-tie decision matrix walkthroughs.</p>
                <div className="w-full bg-[#0B0E2A] rounded-full h-2">
                  <div className="bg-[#FFD60A] h-2 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Progress: 75%</span>
                  <span>9/12 Lessons</span>
                </div>
                <button onClick={() => onNavigate('/free-trial')} className="w-full py-2.5 rounded-xl bg-[#5D5FEF] text-white font-bold text-xs">
                  Continue Course
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 space-y-4">
                <span className="text-xs font-semibold text-[#FFD60A] uppercase tracking-wider">Module 2</span>
                <h3 className="text-lg font-bold text-white">HESI Exit 900+ Scoring Strategies</h3>
                <p className="text-xs text-slate-300">Prioritization frameworks (EAT, ABCD), med-surg drills, and dosage equations.</p>
                <div className="w-full bg-[#0B0E2A] rounded-full h-2">
                  <div className="bg-[#5D5FEF] h-2 rounded-full w-1/2"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Progress: 50%</span>
                  <span>4/8 Lessons</span>
                </div>
                <button onClick={() => onNavigate('/free-trial')} className="w-full py-2.5 rounded-xl bg-[#5D5FEF] text-white font-bold text-xs">
                  Continue Course
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. My Exams Tab */}
        {activeTab === 'my-exams' && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold text-white">My Examination Predictors</h2>
            <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Full NCLEX-RN Simulation Exam 1</h3>
                  <p className="text-xs text-slate-400">150 Questions · Computer-Adaptive · 5hr time limit</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-500/30">
                  Score: 84% (High Pass)
                </span>
              </div>
              <button onClick={() => onNavigate('/free-trial')} className="py-2.5 px-4 rounded-xl bg-[#5D5FEF] text-white font-bold text-xs">
                Review Diagnostic Report
              </button>
            </div>
          </div>
        )}

        {/* 4. My Downloads Tab */}
        {activeTab === 'my-downloads' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">My PDF Study Downloads</h2>
                <p className="text-xs text-slate-400">Secure signed download tokens are generated dynamically on click.</p>
              </div>
              <button
                onClick={() => onNavigate('/study-guides')}
                className="px-4 py-2 rounded-xl bg-[#FFD60A] text-[#0B0E2A] font-bold text-xs shadow-md"
              >
                Get More Guides
              </button>
            </div>

            {downloads.length === 0 ? (
              <div className="p-12 rounded-2xl bg-[#131738] border border-slate-700/60 text-center space-y-3">
                <FileText className="h-10 w-10 text-slate-500 mx-auto" />
                <p className="text-sm text-slate-300">No study guides purchased yet.</p>
                <button
                  onClick={() => onNavigate('/study-guides')}
                  className="px-6 py-2.5 rounded-full bg-[#5D5FEF] text-white font-bold text-xs shadow-md"
                >
                  Explore Pay-to-Download Guides
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {downloads.map((dl, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{dl.guideTitle}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-1">{dl.pageCount} Pages · {dl.fileSize}</p>
                      <span className="text-[10px] text-emerald-400">Verified Private License</span>
                    </div>
                    <button
                      onClick={() => handleDownloadGuide(dl.guideId, dl.guideTitle)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold text-white">Performance &amp; Weakness Radar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 space-y-2">
                <span className="text-xs text-slate-400">Pharmacology &amp; Parenteral</span>
                <div className="text-3xl font-bold text-emerald-400 font-mono">86%</div>
                <div className="w-full bg-[#0B0E2A] rounded-full h-2 mt-2">
                  <div className="bg-emerald-400 h-2 rounded-full w-[86%]"></div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 space-y-2">
                <span className="text-xs text-slate-400">Reduction of Risk Potential</span>
                <div className="text-3xl font-bold text-[#FFD60A] font-mono">78%</div>
                <div className="w-full bg-[#0B0E2A] rounded-full h-2 mt-2">
                  <div className="bg-[#FFD60A] h-2 rounded-full w-[78%]"></div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 space-y-2">
                <span className="text-xs text-slate-400">Management of Care / Delegation</span>
                <div className="text-3xl font-bold text-blue-400 font-mono">82%</div>
                <div className="w-full bg-[#0B0E2A] rounded-full h-2 mt-2">
                  <div className="bg-blue-400 h-2 rounded-full w-[82%]"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold text-white">Study Calendar &amp; Exam Countdown</h2>
            <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-[#FFD60A]" />
                <div>
                  <h3 className="text-base font-bold text-white">Official Board Exam Date Target</h3>
                  <p className="text-xs text-slate-400">Target: November 15, 2026 (45 days remaining)</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                Daily Study Plan: Complete 40 practice questions + review 2 Next-Gen clinical case studies each evening.
              </p>
            </div>
          </div>
        )}

        {/* 7. Other Exams Tab */}
        {activeTab === 'other-exams' && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold text-white">Available Test Banks Catalog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXAM_BANKS.map((b) => (
                <div key={b.id} className="p-5 rounded-2xl bg-[#131738] border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{b.title}</h4>
                    <span className="text-xs text-slate-400">{b.category} · {b.questionCount} Qs</span>
                  </div>
                  <button
                    onClick={() => onNavigate(`/exam-banks?selected=${b.id}#pricing`)}
                    className="px-3 py-1.5 rounded-lg bg-[#5D5FEF] text-white text-xs font-bold"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold text-white">Nursing Cohort Study Feed</h2>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#131738] border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Jessica R., RN Candidate (Texas)</span>
                  <span className="text-slate-400">12 min ago</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Just finished the Cardiovascular NGN unfolding case! The rationale explaining why oxygen is priority before furosemide in acute pulmonary edema really helped cement the concept."
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#131738] border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Marcus T., BSN Senior (Emory)</span>
                  <span className="text-slate-400">1 hour ago</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Does anyone have advice for memorizing the VEAL CHOP fetal deceleration triggers? The AceNurse maternity guide broke it down super simply!"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 9. Help Center Tab */}
        {activeTab === 'help-center' && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold text-white">AceNurse Educator Support</h2>
            <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 space-y-4">
              <h3 className="text-base font-bold text-white">Need Clinical Question Tutoring?</h3>
              <p className="text-xs text-slate-300">
                Our faculty of MSN and DNP nurse educators are on standby. Reach out via email or start a chat with our admissions team.
              </p>
              <div className="flex items-center gap-4 text-xs">
                <a href="mailto:support@acenurseprep.com" className="text-[#FFD60A] font-bold hover:underline">
                  support@acenurseprep.com
                </a>
                <span>·</span>
                <span className="text-slate-400">+1 (800) 419-PREP</span>
              </div>
            </div>
          </div>
        )}

        {/* 10. Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in max-w-xl">
            <h2 className="text-2xl font-bold text-white">Account Settings</h2>
            <div className="p-6 rounded-2xl bg-[#131738] border border-slate-700/60 space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  disabled
                  value={user?.fullName || ''}
                  className="w-full p-3 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Email</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full p-3 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Country</label>
                <input
                  type="text"
                  disabled
                  value={user?.country || 'United States'}
                  className="w-full p-3 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Phone Number (+1)</label>
                <input
                  type="text"
                  disabled
                  value={user?.phone || '+1 (555) 000-0000'}
                  className="w-full p-3 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};

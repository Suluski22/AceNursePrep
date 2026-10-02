import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, ChevronRight, User, LogOut } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Exam Banks', path: '/exam-banks' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Free Practice', path: '/free-practice' },
    { label: 'Study Guides', path: '/study-guides' },
    { label: 'Blog', path: '/blog' }
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1A1A4E] bg-[#0B0E2A]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-3 sm:px-5 lg:px-8 gap-2">
        
        {/* Left Zone: Logo icon + ProctoredNurseExams branding */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 sm:gap-3 text-left transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD60A]"
            aria-label="ProctoredNurseExams Home"
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5D5FEF] to-[#1A1A4E] text-[#FFD60A] shadow-md border border-[#5D5FEF]/30 shrink-0">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 fill-[#FFD60A]/10 stroke-[#FFD60A] stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white font-sans whitespace-nowrap">
                ProctoredNurseExams
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-medium -mt-0.5 hidden xs:block">
                Learn. Practice. Succeed.
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Bar CTAs: Directly Visible On The Bar (Never Hidden in Dropdown) */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 overflow-x-auto py-1.5 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors rounded-lg whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#FFD60A] bg-[#131738] font-semibold shadow-sm'
                      : 'text-[#F4F6FC]/90 hover:text-white hover:bg-[#131738]/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs: Log In & Get Access (Directly on the bar) */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-1 shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => handleNavClick('/dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
                    currentPath === '/dashboard'
                      ? 'bg-[#1A1A4E] border-[#5D5FEF] text-white'
                      : 'bg-[#131738] border-slate-700/60 text-[#F4F6FC] hover:border-slate-500'
                  }`}
                >
                  <User className="h-3.5 w-3.5 text-[#FFD60A]" />
                  <span className="max-w-[100px] truncate">{user?.fullName || 'Dashboard'}</span>
                </button>
                <button
                  onClick={logout}
                  title="Log Out"
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-[#131738] rounded-lg transition-colors"
                  aria-label="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                {/* Log In CTA link directly on the bar */}
                <button
                  onClick={() => handleNavClick('/login')}
                  className={`px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors rounded-lg whitespace-nowrap shrink-0 ${
                    currentPath === '/login'
                      ? 'text-[#FFD60A] bg-[#131738] font-semibold'
                      : 'text-[#F4F6FC]/90 hover:text-white hover:bg-[#131738]/60'
                  }`}
                >
                  Log In
                </button>

                {/* Primary Pill Button: Get Access > directly on the bar */}
                <button
                  onClick={() => handleNavClick('/pricing')}
                  className="group flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-[#0B0E2A] bg-[#FFD60A] hover:bg-[#ffe033] transition-all rounded-full shadow-[0_2px_12px_rgba(255,214,10,0.3)] hover:shadow-[0_4px_16px_rgba(255,214,10,0.4)] whitespace-nowrap shrink-0 active:scale-[0.98]"
                >
                  <span>Get Access</span>
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Shield, ChevronRight, User, LogOut } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Exam Banks', path: '/exam-banks' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Free Practice', path: '/free-practice' },
    { label: 'Blog', path: '/blog' }
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1A1A4E] bg-[#0B0E2A]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Zone: Logo icon + AceNurse Prep branding in clean white text */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD60A]"
            aria-label="AceNurse Prep Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5D5FEF] to-[#1A1A4E] text-[#FFD60A] shadow-md border border-[#5D5FEF]/30 shrink-0">
              <Shield className="h-6 w-6 fill-[#FFD60A]/10 stroke-[#FFD60A] stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white font-sans whitespace-nowrap">
                AceNurse Prep
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium -mt-0.5">
                Learn. Practice. Succeed.
              </span>
            </div>
          </button>
        </div>

        {/* Center Zone: Nav Links (Centered, visible on md: and above) */}
        <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg whitespace-nowrap ${
                  isActive
                    ? 'text-[#FFD60A] bg-[#131738]'
                    : 'text-[#F4F6FC]/85 hover:text-white hover:bg-[#131738]/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Zone: Action Buttons (Log In ghost link + yellow Get Access button) */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('/dashboard')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors border ${
                  currentPath === '/dashboard'
                    ? 'bg-[#1A1A4E] border-[#5D5FEF] text-white'
                    : 'bg-[#131738] border-slate-700/60 text-[#F4F6FC] hover:border-slate-500'
                }`}
              >
                <User className="h-3.5 w-3.5 text-[#FFD60A]" />
                <span className="max-w-[120px] truncate">{user?.fullName || 'Dashboard'}</span>
              </button>
              <button
                onClick={logout}
                title="Log Out"
                className="p-2 text-slate-400 hover:text-white hover:bg-[#131738] rounded-lg transition-colors"
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Ghost Link: Log In (routes to /login) */}
              <button
                onClick={() => handleNavClick('/login')}
                className="px-4 py-2 text-sm font-medium text-[#F4F6FC] hover:text-white transition-colors rounded-full hover:bg-[#131738] whitespace-nowrap"
              >
                Log In
              </button>

              {/* Primary Pill Button: Get Access (bright yellow #FFD60A with dark text) */}
              <button
                onClick={() => handleNavClick('/pricing')}
                className="group flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-[#0B0E2A] bg-[#FFD60A] hover:bg-[#ffe033] transition-all rounded-full shadow-[0_2px_12px_rgba(255,214,10,0.25)] hover:shadow-[0_4px_18px_rgba(255,214,10,0.35)] whitespace-nowrap active:scale-[0.98]"
              >
                <span>Get Access</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle (block md:hidden) */}
        <div className="flex items-center gap-2 md:hidden">
          {!isAuthenticated && (
            <button
              onClick={() => handleNavClick('/pricing')}
              className="px-3 py-1.5 text-xs font-bold text-[#0B0E2A] bg-[#FFD60A] rounded-full whitespace-nowrap"
            >
              Get Access
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F4F6FC] hover:text-white hover:bg-[#131738] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD60A]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1A1A4E] bg-[#0B0E2A] px-4 pt-3 pb-6 shadow-2xl transition-all">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`flex items-center justify-between px-4 py-3 text-base font-medium rounded-xl text-left transition-colors ${
                    isActive
                      ? 'text-[#FFD60A] bg-[#131738]'
                      : 'text-[#F4F6FC] hover:bg-[#131738]/60'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </button>
              );
            })}
          </nav>

          <div className="mt-5 pt-5 border-t border-[#1A1A4E] flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavClick('/dashboard')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#5D5FEF] text-white font-semibold text-sm shadow-md"
                >
                  <User className="h-4 w-4" />
                  <span>Go to Student Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 text-center text-sm font-medium text-slate-400 hover:text-white"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('/pricing')}
                  className="w-full py-3.5 px-4 rounded-full bg-[#FFD60A] text-[#0B0E2A] font-bold text-center text-sm shadow-lg"
                >
                  Get Instant Access
                </button>
                <button
                  onClick={() => handleNavClick('/login')}
                  className="w-full py-3 px-4 rounded-full border border-slate-700 bg-[#131738] text-white font-medium text-center text-sm"
                >
                  Log In to Student Account
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

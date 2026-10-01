import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Globe, 
  ArrowRight, 
  AlertCircle, 
  Sparkles
} from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
  onNavigate: (path: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login', onNavigate }) => {
  const { login, register, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState<'US' | 'CA'>('US');
  const [phone, setPhone] = useState('+1 ');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Keep +1 auto-code prefix for US and Canada
    if (!val.startsWith('+1')) {
      val = '+1 ' + val.replace(/^\+?1?\s*/, '');
    }
    setPhone(val);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    if (mode === 'register') {
      if (!firstName.trim()) {
        setIsSubmitting(false);
        setErrorMessage('Please enter your first name.');
        return;
      }
      if (!lastName.trim()) {
        setIsSubmitting(false);
        setErrorMessage('Please enter your last name.');
        return;
      }
      if (country !== 'US' && country !== 'CA') {
        setIsSubmitting(false);
        setErrorMessage('Registration is strictly restricted to United States (US) and Canada (CA) residents.');
        return;
      }

      const res = await register({
        email,
        password,
        firstName,
        lastName,
        country,
        phone
      });

      setIsSubmitting(false);

      if (res.success) {
        onNavigate('/dashboard');
      } else {
        setErrorMessage(res.error || 'Registration failed. Please check your credentials.');
      }
    } else {
      // Login
      const res = await login(email, password);
      setIsSubmitting(false);

      if (res.success) {
        onNavigate('/dashboard');
      } else {
        setErrorMessage(res.error || 'Invalid email or password.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);
    const res = await loginWithGoogle();
    setIsSubmitting(false);
    if (res.success) {
      onNavigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 bg-[#0B0E2A] text-[#F4F6FC]">
      <div className="w-full max-w-md space-y-8">
        
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A1A4E] text-[#FFD60A] border border-[#5D5FEF]/40 shadow-lg">
            <ShieldCheck className="h-7 w-7 stroke-[2.2]" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight font-sans">
            {mode === 'register' ? 'Create Your Student Account' : 'Student Portal Login'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {mode === 'register'
              ? 'Includes automatic 7-Day Free Trial access to all exam banks.'
              : 'Sign in to access your test banks, analytics, and downloads.'}
          </p>
        </div>

        {/* Auth Card Container */}
        <div className="p-8 rounded-2xl bg-[#131738] border border-slate-700/60 shadow-2xl space-y-6">
          
          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-3 shadow-md transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-700"></div>
            <span className="bg-[#131738] px-3 text-[11px] text-slate-400 uppercase tracking-wider">
              Or with email
            </span>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Rachel"
                      className="w-full text-xs p-3 pl-9 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A]"
                    />
                    <User className="absolute left-3 top-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Adams, SN"
                      className="w-full text-xs p-3 pl-9 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A]"
                    />
                    <User className="absolute left-3 top-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nurse@nursing.edu"
                  className="w-full text-xs p-3 pl-10 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A]"
                />
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs p-3 pl-10 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A]"
                />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Country Restricted to US & Canada with +1 Phone code */}
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Country (United States &amp; Canada Only)
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value as 'US' | 'CA')}
                      className="w-full text-xs p-3 pl-10 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white focus:outline-none focus:border-[#FFD60A] appearance-none"
                    >
                      <option value="US">United States (US) (+1)</option>
                      <option value="CA">Canada (CA) (+1)</option>
                    </select>
                    <Globe className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    AceNurse Prep licensing is strictly compliant with US NCSBN and Canadian CRNE/NCLEX mandates.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone Number (+1 Auto-Code)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full text-xs p-3 pl-10 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A] font-mono"
                    />
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Free Trial Provisioning Notice */}
                <div className="p-3.5 rounded-xl bg-[#1A1A4E]/70 border border-[#5D5FEF]/40 flex items-start gap-2.5 text-xs text-slate-200">
                  <Sparkles className="h-4 w-4 text-[#FFD60A] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#FFD60A]">7-Day Free Trial Auto-Provisioned:</strong> Complete registration to immediately unlock sample sets across all 4 exam categories. No credit card required.
                  </p>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 border-2 border-[#0B0E2A] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{mode === 'register' ? 'Register & Start 7-Day Trial' : 'Sign In to Student Account'}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle between Login and Register */}
          <div className="pt-2 text-center text-xs text-slate-400">
            {mode === 'register' ? (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => { setMode('login'); setErrorMessage(null); }}
                  className="font-bold text-[#FFD60A] hover:underline"
                >
                  Log In
                </button>
              </p>
            ) : (
              <p>
                Need exam preparation materials?{' '}
                <button
                  onClick={() => { setMode('register'); setErrorMessage(null); }}
                  className="font-bold text-[#FFD60A] hover:underline"
                >
                  Create Free Account
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

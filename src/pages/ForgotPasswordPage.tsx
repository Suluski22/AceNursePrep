import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, ArrowLeft, AlertCircle, CheckCircle2, Shield, Lock } from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const redirectToUrl = `${window.location.origin}/update-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: redirectToUrl,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Password reset link sent! Check your inbox to set a new password.');
        setEmail('');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred while requesting your password reset.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('/login')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sign In</span>
        </button>

        {/* Card Container */}
        <div className="rounded-2xl bg-[#131738] border border-slate-700/80 p-8 shadow-2xl backdrop-blur-md">
          {/* Header Icon */}
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A1A4E] text-[#FFD60A] border border-[#5D5FEF]/40 shadow-lg">
              <Lock className="h-6 w-6 stroke-[2.2]" />
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
              Reset Your Password
            </h1>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Enter the email address associated with your account and we'll send you a password reset link.
            </p>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-5 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-start gap-3 text-xs text-emerald-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="reset-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nurse@nursing.edu"
                  className="w-full text-xs p-3.5 pl-10 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A] transition-colors"
                />
                <Mail className="absolute left-3.5 top-4 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 border-2 border-[#0B0E2A] border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          {/* Security footnote */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#FFD60A]" />
              <span>Secure encrypted password reset via Supabase Auth</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

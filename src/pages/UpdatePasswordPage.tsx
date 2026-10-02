import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface UpdatePasswordPageProps {
  onNavigate: (path: string) => void;
}

export const UpdatePasswordPage: React.FC<UpdatePasswordPageProps> = ({ onNavigate }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter identical passwords.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Password updated successfully! Redirecting to login...');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          onNavigate('/login?reset=true');
        }, 2000);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred while updating your password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">

        {/* Card Container */}
        <div className="rounded-2xl bg-[#131738] border border-slate-700/80 p-8 shadow-2xl backdrop-blur-md">
          {/* Header Icon */}
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A1A4E] text-[#FFD60A] border border-[#5D5FEF]/40 shadow-lg">
              <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
              Set New Password
            </h1>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Enter and confirm your new secure password below to regain full access to your student test banks.
            </p>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-5 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-start gap-3 text-xs text-emerald-200 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200 animate-in fade-in">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-xs font-medium text-slate-300 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full text-xs p-3.5 pl-10 pr-10 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A] transition-colors"
                />
                <Lock className="absolute left-3.5 top-4 h-4 w-4 text-slate-400 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-4 text-slate-400 hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-xs font-medium text-slate-300 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  className="w-full text-xs p-3.5 pl-10 rounded-xl bg-[#0B0E2A] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A] transition-colors"
                />
                <Lock className="absolute left-3.5 top-4 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !!successMessage}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 border-2 border-[#0B0E2A] border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </form>

          {/* Footer Back to Login */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 text-center">
            <button
              onClick={() => onNavigate('/login')}
              className="text-xs text-[#FFD60A] hover:underline"
            >
              Cancel and return to Sign In
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

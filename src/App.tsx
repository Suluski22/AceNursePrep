/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingSupport } from './components/FloatingSupport';
import { CheckoutModal } from './components/CheckoutModal';

import { HomePage } from './pages/HomePage';
import { ExamBanksPage } from './pages/ExamBanksPage';
import { StudyGuidesPage } from './pages/StudyGuidesPage';
import { PricingPage } from './pages/PricingPage';
import { FreeTrialPage } from './pages/FreeTrialPage';
import { BlogPage } from './pages/BlogPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { UpdatePasswordPage } from './pages/UpdatePasswordPage';
import { PracticeQuizPage } from './pages/PracticeQuizPage';

export function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Extract query parameters like ?selected=nclex-rn
  const [selectedExamId, setSelectedExamId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('selected');
  });

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      const params = new URLSearchParams(window.location.search);
      setSelectedExamId(params.get('selected'));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle Supabase OAuth and email confirmation callback redirects
  useEffect(() => {
    document.title = 'ProctoredNurseExams | Pass NCLEX, HESI & ATI Nursing Exams';
    if (currentPath.startsWith('/auth/callback')) {
      const timer = setTimeout(() => {
        navigateTo('/dashboard');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentPath]);

  const navigateTo = (targetPath: string) => {
    // Parse path and query
    const [pathOnly, searchPart] = targetPath.split('?');
    const params = new URLSearchParams(searchPart ? searchPart.split('#')[0] : '');
    const selected = params.get('selected');

    if (selected) {
      setSelectedExamId(selected);
    }

    setCurrentPath(pathOnly);
    window.history.pushState(null, '', targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Rendering
  const renderCurrentPage = () => {
    if (currentPath === '/exam-banks') {
      return <ExamBanksPage initialSelectedExamId={selectedExamId} onNavigate={navigateTo} />;
    }
    if (currentPath === '/study-guides') {
      return <StudyGuidesPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/pricing') {
      return <PricingPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/practice/ati-rn-comprehensive-predictor' || currentPath.startsWith('/practice')) {
      return <PracticeQuizPage examId="ati-rn-comprehensive-predictor" onNavigate={navigateTo} />;
    }
    if (currentPath === '/free-trial' || currentPath === '/free-practice') {
      return <FreeTrialPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/blog') {
      return <BlogPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/login') {
      return <AuthPage initialMode="login" onNavigate={navigateTo} />;
    }
    if (currentPath === '/register') {
      return <AuthPage initialMode="register" onNavigate={navigateTo} />;
    }
    if (currentPath === '/forgot-password') {
      return <ForgotPasswordPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/update-password' || currentPath.startsWith('/update-password')) {
      return <UpdatePasswordPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/dashboard/settings') {
      return <DashboardPage initialTab="settings" onNavigate={navigateTo} />;
    }
    if (currentPath === '/dashboard') {
      return <DashboardPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/auth/callback' || currentPath.startsWith('/auth/callback')) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] py-16 px-4 text-center">
          <div className="h-10 w-10 border-4 border-[#FFD60A] border-t-transparent rounded-full animate-spin mb-4"></div>
          <h3 className="text-xl font-bold text-white">Verifying your student session...</h3>
          <p className="text-xs text-slate-300 mt-2">Connecting to ProctoredNurseExams portal</p>
        </div>
      );
    }
    // Default: Home
    return <HomePage onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0E2A] text-[#F4F6FC] font-sans antialiased selection:bg-[#FFD60A] selection:text-[#0B0E2A]">
      {/* 1. Global Navigation Header */}
      <Header currentPath={currentPath} onNavigate={navigateTo} />

      {/* 2. Main Page Content View */}
      <div className="flex-1 w-full">
        {renderCurrentPage()}
      </div>

      {/* 3. Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* 4. Floating Support Widgets (WhatsApp & Live Chat persisted across all pages) */}
      <FloatingSupport />

      {/* 5. Stripe Visa-Only Checkout Modal */}
      <CheckoutModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

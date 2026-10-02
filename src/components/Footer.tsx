import React, { useState } from 'react';
import { Shield, Mail, Phone, MapPin, X, FileText, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

type LegalModalType = 'terms' | 'privacy' | 'guarantee' | 'reviews' | null;

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  return (
    <footer className="w-full border-t border-[#1A1A4E] bg-[#0B0E2A] text-[#F4F6FC]">
      {/* Main 5-Column Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-8">
          
          {/* Column 1 (Left Brand & Contact Block) */}
          <div className="space-y-4">
            {/* Yellow icon + ProctoredNurseExams title */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1A1A4E] text-[#FFD60A] border border-[#5D5FEF]/30 shadow-md shrink-0">
                <Shield className="h-5 w-5 fill-[#FFD60A]/10 stroke-[#FFD60A] stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                ProctoredNurseExams
              </span>
            </div>

            {/* Tagline */}
            <p className="text-xs font-semibold text-[#FFD60A] tracking-wide uppercase">
              Learn. Practice. Succeed.
            </p>

            {/* Contact details */}
            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#FFD60A] shrink-0" />
                <a
                  href="mailto:support@proctorednurseexams.com"
                  className="hover:text-white hover:underline transition-colors"
                >
                  support@proctorednurseexams.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#FFD60A] shrink-0" />
                <a
                  href="tel:+13053347148"
                  className="hover:text-white hover:underline transition-colors"
                >
                  📞 +1 (305) 334-7148
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#FFD60A] shrink-0" />
                <span>Houston, TX, USA</span>
              </div>
            </div>

            {/* Circular social icon buttons: Facebook (f), Instagram (📷), TikTok (🎵) */}
            <div className="pt-2">
              <div className="flex items-center gap-2.5">
                {/* Facebook (f) */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#131738] text-slate-300 hover:text-[#0B0E2A] hover:bg-[#FFD60A] transition-colors border border-slate-700/60 shadow-sm"
                  aria-label="ProctoredNurseExams Facebook"
                >
                  <span className="text-xs font-bold font-serif">f</span>
                </a>

                {/* Instagram (📷) */}
                <a
                  href="https://www.instagram.com/homeofassignments_2020/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#131738] text-slate-300 hover:text-[#0B0E2A] hover:bg-[#FFD60A] transition-colors border border-slate-700/60 shadow-sm"
                  aria-label="ProctoredNurseExams Instagram"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* TikTok (🎵) */}
                <a
                  href="https://www.tiktok.com/@ebooks20252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#131738] text-slate-300 hover:text-[#0B0E2A] hover:bg-[#FFD60A] transition-colors border border-slate-700/60 shadow-sm"
                  aria-label="ProctoredNurseExams TikTok"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Exam Banks */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase">Exam Banks</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('/exam-banks?selected=nclex-rn')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  NCLEX Test Bank
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/exam-banks?selected=hesi-rn-exit')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  HESI A2 Test Bank
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/exam-banks?selected=ati-teas')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  TEAS Practice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/exam-banks?selected=ati-rn-comp-predictor')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  ATI Test Bank
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/exam-banks?selected=ati-rn-comp-predictor')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  ATI Comprehensive Predictor
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Preparation */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase">Preparation</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('/free-practice')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  Free Practice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/study-guides')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  Study Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/blog')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const chatBtn = document.getElementById('proctorednurse-chat-trigger');
                    if (chatBtn) chatBtn.click();
                    else onNavigate('/pricing');
                  }}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  Help Center
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase">Company</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('/pricing')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal('reviews')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  Reviews
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@proctorednurseexams.com"
                  className="hover:text-[#FFD60A] transition-colors block"
                >
                  Contact
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/pricing')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('/blog')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  Blog Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/free-practice')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  Free Practice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/pricing')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/study-guides')}
                  className="hover:text-[#FFD60A] transition-colors text-left"
                >
                  Study Guides
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@proctorednurseexams.com"
                  className="hover:text-[#FFD60A] transition-colors block"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Bar & Exact Regulatory Disclaimers Matching Reference */}
        <div className="mt-12 pt-8 border-t border-[#1A1A4E] text-xs text-slate-400 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-400">
              Copyright © 2026 ProctoredNurseExams. All rights reserved. ProctoredNurseExams is not affiliated with nursing regulatory bodies.
            </div>
            <div className="flex items-center gap-5 text-slate-300">
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-[#FFD60A] transition-colors underline-offset-4 hover:underline"
              >
                Terms of Service
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-[#FFD60A] transition-colors underline-offset-4 hover:underline"
              >
                Privacy Policy
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => setLegalModal('guarantee')}
                className="hover:text-[#FFD60A] transition-colors underline-offset-4 hover:underline"
              >
                Guarantee Terms
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#131738]/80 border border-slate-800 text-[11px] leading-relaxed text-slate-400 text-center md:text-left">
            <span className="font-semibold text-slate-300">Regulatory &amp; Trademark Disclaimer:</span> NCLEX®, NCLEX-RN®, and NCLEX-PN® are registered trademarks of the National Council of State Boards of Nursing, Inc. (NCSBN®). ATI®, TEAS®, and Comprehensive Predictor® are registered trademarks of Assessment Technologies Institute, LLC. HESI® is a registered trademark of Elsevier Inc. ProctoredNurseExams is an independent commercial educational preparation service and is neither affiliated with, endorsed by, nor authorized by NCSBN, ATI, or Elsevier. All materials are original proprietary psychometric test bank questions.
          </div>
        </div>
      </div>

      {/* Clean In-App Legal / Reviews Modal (Eliminates disruptive window.alert) */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-[#0B0E2A] border border-[#1A1A4E] shadow-2xl p-6 text-[#F4F6FC] space-y-4">
            <div className="flex items-center justify-between border-b border-[#1A1A4E] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#FFD60A]" />
                <h3 className="text-lg font-bold text-white capitalize">
                  {legalModal === 'terms' && 'Terms of Service'}
                  {legalModal === 'privacy' && 'Privacy Policy'}
                  {legalModal === 'guarantee' && '100% Pass or Money-Back Guarantee'}
                  {legalModal === 'reviews' && 'Verified Student Reviews'}
                </h3>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#131738]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
              {legalModal === 'terms' && (
                <>
                  <p>ProctoredNurseExams materials are licensed for single individual student use. Unrestricted one-time access with lifetime updates for selected test banks.</p>
                  <p>Sharing credentials, redistributing proprietary case studies, or scraping content is strictly prohibited under federal copyright laws.</p>
                  <p>No subscription billing: all payments are single transactions without automatic recurring renewal charges.</p>
                </>
              )}

              {legalModal === 'privacy' && (
                <>
                  <p>Student data is encrypted in transit and at rest using enterprise AES-256 standards.</p>
                  <p>We do not sell student credentials, testing performance diagnostics, or personal identifiers to third parties.</p>
                  <p>All payment processing is handled exclusively through PCI-DSS Level 1 compliant gateways.</p>
                </>
              )}

              {legalModal === 'guarantee' && (
                <>
                  <p className="font-semibold text-white">Our Ironclad Guarantee Commitment:</p>
                  <p>Complete at least 80% of your purchased test bank with a cumulative score of 75%+ prior to your official examination date.</p>
                  <p>If you do not pass your official NCLEX, HESI, or ATI examination, provide an official copy of your candidate report within 30 days for a 100% tuition refund or complimentary extended access until you pass.</p>
                </>
              )}

              {legalModal === 'reviews' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[#131738] border border-slate-700/60">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white">Sarah Jenkins, BSN, RN</span>
                      <span className="text-[#FFD60A]">★★★★★</span>
                    </div>
                    <p className="text-[11px] text-slate-300">"Passed NCLEX-RN in 85 questions! The NGN case studies matched the actual test environment exactly."</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#131738] border border-slate-700/60">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white">Marcus Vance, LPN</span>
                      <span className="text-[#FFD60A]">★★★★★</span>
                    </div>
                    <p className="text-[11px] text-slate-300">"Scored 994 on my HESI Exit Exam after 3 weeks of practice. The rationales are unmatched."</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#1A1A4E] flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-full bg-[#FFD60A] text-[#0B0E2A] font-bold text-xs hover:bg-[#ffe033] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

import React, { useState } from 'react';
import { STUDY_GUIDES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  Download, 
  Lock, 
  Sparkles, 
  Check, 
  Eye, 
  X, 
  Clock, 
  ShieldCheck, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { StudyGuide } from '../types';

interface StudyGuidesPageProps {
  onNavigate: (path: string) => void;
}

export const StudyGuidesPage: React.FC<StudyGuidesPageProps> = ({ onNavigate }) => {
  const { openCheckout, downloads, generateSignedDownloadUrl } = useAuth();
  const [selectedGuideForPreview, setSelectedGuideForPreview] = useState<StudyGuide | null>(null);

  const handleBuyGuide = (guide: StudyGuide) => {
    openCheckout({
      id: guide.id,
      title: guide.title,
      type: 'study_guide',
      price: guide.price
    });
  };

  const isGuidePurchased = (guideId: string) => {
    return downloads.some(d => d.guideId === guideId);
  };

  const handleDownloadPurchased = (guide: StudyGuide) => {
    // Generate fresh signed URL token
    const { url, expiresAt } = generateSignedDownloadUrl(guide.id);
    const content = `AceNurse Prep - Official High-Yield Clinical Study Guide\nTitle: ${guide.title}\nFormat: High-Resolution Clinical PDF\nPage Count: ${guide.pageCount}\nAuthorized Licensee: Registered Student Nurse\nSecurity Token: ${btoa(url)}\n\nExcerpt:\n${guide.sampleExcerpt}\n\nTopics Covered:\n${guide.previewTopics.join('\n')}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${guide.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full bg-[#0B0E2A] text-[#F4F6FC]">
      
      {/* Header Banner */}
      <section className="pt-16 pb-12 bg-gradient-to-b from-[#131738]/50 to-[#0B0E2A] border-b border-[#1A1A4E]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>High-Yield Clinical PDF Handbooks</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight font-editorial-serif">
            Pay-to-Download Study Guides
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Concise, high-yield digital cheat sheets and formulas crafted by nurse faculty for rapid review before your testing date.
          </p>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-4 w-4 text-[#FFD60A]" />
              Secure 60s Signed Cloud Downloads
            </span>
            <span>·</span>
            <span>Permanent Storage in "My Downloads"</span>
            <span>·</span>
            <span>Printable &amp; iPad GoodNotes Compatible</span>
          </div>
        </div>
      </section>

      {/* Card Grid for Pay-to-Download PDF Resources */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {STUDY_GUIDES.map((guide) => {
            const purchased = isGuidePurchased(guide.id);

            return (
              <div
                key={guide.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#131738] border border-slate-700/60 shadow-xl hover:border-slate-500 transition-all"
              >
                <div className="space-y-4">
                  {/* Category & File Metadata */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#FFD60A] bg-[#1A1A4E] px-2.5 py-1 rounded-md border border-[#5D5FEF]/30">
                      {guide.examCategory}
                    </span>
                    <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                      <span>{guide.pageCount} Pages</span>
                      <span>·</span>
                      <span>{guide.fileSize}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug font-sans">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {guide.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {guide.description}
                  </p>

                  {/* High-Yield Topics Highlight */}
                  <div className="p-3 rounded-xl bg-[#0B0E2A]/70 border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Key Clinical Pearls:
                    </span>
                    {guide.previewTopics.slice(0, 2).map((topic, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="h-3.5 w-3.5 text-[#FFD60A] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-2xl font-bold text-[#FFD60A] font-mono tabular-nums">
                      ${guide.price}
                    </span>
                    <span className="text-[10px] text-slate-400 block">one-time download</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedGuideForPreview(guide)}
                      className="p-2.5 rounded-xl bg-[#1A1A4E] hover:bg-[#252568] text-slate-300 hover:text-white transition-colors"
                      title="Preview excerpt"
                      aria-label="Preview study guide"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    {purchased ? (
                      <button
                        onClick={() => handleDownloadPurchased(guide)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBuyGuide(guide)}
                        className="px-4 py-2.5 rounded-xl bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                      >
                        <Lock className="h-3.5 w-3.5" />
                        <span>Buy PDF (${guide.price})</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* Guide Preview Modal */}
      {selectedGuideForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0B0E2A] border border-[#1A1A4E] shadow-2xl p-6 sm:p-8 text-[#F4F6FC] max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedGuideForPreview(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#131738]"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#FFD60A] uppercase tracking-wider block">
                  Study Guide Blueprint Preview
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedGuideForPreview.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedGuideForPreview.pageCount} Pages · {selectedGuideForPreview.fileSize} · High-Res PDF
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#131738] border border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Table of Contents &amp; Tested Clinical Concepts:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedGuideForPreview.previewTopics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#FFD60A] shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Excerpt Box */}
              <div className="p-4 rounded-xl bg-[#1A1A4E]/60 border border-[#5D5FEF]/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-[#FFD60A]" />
                    Page Sample Excerpt
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Page 14 Excerpt</span>
                </div>
                <blockquote className="text-xs text-slate-200 italic leading-relaxed pl-3 border-l-2 border-[#FFD60A]">
                  "{selectedGuideForPreview.sampleExcerpt}"
                </blockquote>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  <span className="text-2xl font-bold text-[#FFD60A] font-mono tabular-nums">
                    ${selectedGuideForPreview.price}
                  </span>
                  <span className="text-xs text-slate-400 ml-2">Instant Signed Download</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedGuideForPreview(null)}
                    className="px-4 py-2.5 text-xs text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const guide = selectedGuideForPreview;
                      setSelectedGuideForPreview(null);
                      handleBuyGuide(guide);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-xs shadow-lg transition-colors flex items-center gap-1.5"
                  >
                    <Download className="h-4 w-4" />
                    <span>Purchase &amp; Download</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

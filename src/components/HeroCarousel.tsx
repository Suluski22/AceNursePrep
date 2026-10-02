import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

import simLabImg from '../assets/images/hero_nursing_simulation_lab_1790858033628.jpg';
import hospitalImg from '../assets/images/hero_nursing_hospital_clinical_1790858047265.jpg';
import studyingImg from '../assets/images/hero_nursing_students_studying_1790858065699.jpg';

interface HeroCarouselProps {
  onNavigate: (path: string) => void;
}

const HERO_IMAGES = [
  {
    url: simLabImg || '/images/hero_nursing_simulation_lab.jpg',
    fallback: '/images/hero_nursing_simulation_lab.jpg',
    alt: 'Nursing students in clinical simulation training lab'
  },
  {
    url: hospitalImg || '/images/hero_nursing_hospital_clinical.jpg',
    fallback: '/images/hero_nursing_hospital_clinical.jpg',
    alt: 'Registered nurse reviewing medical charts in hospital corridor'
  },
  {
    url: studyingImg || '/images/hero_nursing_students_studying.jpg',
    fallback: '/images/hero_nursing_students_studying.jpg',
    alt: 'Dedicated nursing students collaborating with clinical textbooks'
  }
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  return (
    <section className="relative min-h-[660px] lg:min-h-[740px] flex items-center justify-center overflow-hidden bg-[#0B0E2A] pb-16 pt-10">
      {/* Background Image Carousel with Crisp Visibility & Bundled Asset Fallbacks */}
      <div className="absolute inset-0 z-0 bg-[#0B0E2A]">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-[#0B0E2A] overflow-hidden ${
              idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } transform transition-transform duration-[7000ms]`}
          >
            <img
              src={img.url}
              alt={img.alt}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes(img.fallback)) {
                  target.src = img.fallback;
                }
              }}
            />
          </div>
        ))}

        {/* Lightweight Transparent Overlay (Max 35% dark so photos remain vibrant, crisp and clear) */}
        <div className="absolute inset-0 bg-black/35 backdrop-brightness-95 pointer-events-none"></div>
        {/* Subtle bottom gradient to blend gently into the dark navy canvas without obscuring the background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0E2A]/20 to-[#0B0E2A]/90 pointer-events-none"></div>
      </div>

      {/* Manual Carousel Controls (Quiet affordances on side) */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-[#131738]/85 hover:bg-[#1A1A4E] text-slate-200 hover:text-white backdrop-blur-md border border-slate-600/50 shadow-md transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-mono text-slate-200 px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-sm">
          {currentIndex + 1} / {HERO_IMAGES.length}
        </span>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-[#131738]/85 hover:bg-[#1A1A4E] text-slate-200 hover:text-white backdrop-blur-md border border-slate-600/50 shadow-md transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Centered, Clean Hero Container */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full">
        
        {/* 1. Badge (Top): ■ TRUSTED BY 50,000+ NURSING STUDENTS in yellow accent text */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider text-[#FFD60A] uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-[#FFD60A]/30">
          <span className="text-[#FFD60A] text-sm">■</span>
          <span>TRUSTED BY 50,000+ NURSING STUDENTS</span>
        </div>

        {/* 2. Main Headline (Restored): Large serif headline with crisp drop-shadow */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.1] font-editorial-serif drop-shadow-[0_3px_8px_rgba(0,0,0,0.85)] max-w-3xl">
          Pass Your <span className="text-[#FFD60A] italic underline decoration-[#FFD60A]/50 underline-offset-8">Proctored Nursing Exam</span> on the First Try.
        </h1>

        {/* 3. Sub-feature Cards: Aligned directly underneath the main headline with clean spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-2xl text-left">
          <div className="p-4 rounded-xl bg-[#131738]/90 border border-slate-700/80 backdrop-blur-md shadow-xl flex items-start gap-3 transition-transform hover:-translate-y-0.5">
            <CheckCircle className="h-5 w-5 text-[#FFD60A] shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-slate-100 leading-snug drop-shadow-sm">
              Realistic test banks built for NCLEX, HESI A2, TEAS &amp; ATI.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#131738]/90 border border-slate-700/80 backdrop-blur-md shadow-xl flex items-start gap-3 transition-transform hover:-translate-y-0.5">
            <Sparkles className="h-5 w-5 text-[#FFD60A] shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-slate-100 leading-snug drop-shadow-sm">
              One-time purchase. No subscription. No surprises.
            </p>
          </div>
        </div>

        {/* 4. Hero CTAs: Primary yellow button next to secondary ghost button on a single aligned row */}
        <div className="flex flex-row items-center justify-center gap-4 mt-8 flex-wrap">
          {/* Primary yellow button */}
          <button
            onClick={() => onNavigate('/exam-banks')}
            className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-extrabold text-sm sm:text-base shadow-[0_4px_25px_rgba(255,214,10,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            <span>Get Instant Access</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary ghost/translucent button: Free Practice Questions */}
          <button
            onClick={() => onNavigate('/free-practice')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#131738]/90 hover:bg-[#1A1A4E] text-[#F4F6FC] hover:text-white border border-slate-500/60 font-semibold text-sm sm:text-base backdrop-blur-md shadow-lg transition-colors whitespace-nowrap"
          >
            <span>Free Practice Questions</span>
          </button>
        </div>

        {/* 5. Trust Metrics Bar: Cleanly below the CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>99.2% First-Time Pass Rate</span>
          </div>
          <span className="hidden sm:inline text-slate-400" aria-hidden="true">|</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FFD60A]"></span>
            <span>Next-Gen (NGN) Case Studies</span>
          </div>
          <span className="hidden sm:inline text-slate-400" aria-hidden="true">|</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#6C5CE7]"></span>
            <span>100% Pass or Money-Back Guarantee</span>
          </div>
        </div>

      </div>
    </section>
  );
};

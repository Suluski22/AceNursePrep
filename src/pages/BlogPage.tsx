import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../data/mockData';
import { BlogArticle } from '../types';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowRight, 
  X, 
  Sparkles, 
  User, 
  Check
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingArticle, setReadingArticle] = useState<BlogArticle | null>(null);

  const categories = ['All', 'NCLEX Strategy', 'HESI Prep', 'Pharmacology', 'TEAS Guide'];

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-[#0B0E2A] text-[#F4F6FC]">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Isolated Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD60A] uppercase tracking-wider bg-[#131738] px-3.5 py-1.5 rounded-full border border-slate-700/60">
            <BookOpen className="h-4 w-4 text-[#FFD60A]" />
            <span>Nursing Faculty &amp; Psychometrician Insights</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight font-editorial-serif">
            Nursing Study Guides &amp; NGN Strategy Articles
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Evidence-based test-taking frameworks, clinical scoring decoders, and high-yield pharmacology breakdowns.
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search NGN, HESI scores, pharmacology..."
                className="w-full text-xs py-3 pl-10 pr-4 rounded-xl bg-[#131738] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A]"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FFD60A] text-[#0B0E2A] font-bold shadow-md'
                    : 'bg-[#131738] text-slate-300 hover:text-white border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* High-Contrast White Cards Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-sm text-slate-400">No clinical articles matched your query.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs text-[#FFD60A] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col justify-between p-8 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-xl hover:shadow-2xl transition-all space-y-6"
              >
                <div className="space-y-4">
                  {/* Category Pill in Purple + Read Time */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#5D5FEF] bg-[#5D5FEF]/10 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{article.readTime}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-sans leading-snug hover:text-[#5D5FEF] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Author Info & Read Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#5D5FEF]/10 text-[#5D5FEF] font-bold text-xs flex items-center justify-center">
                      {article.author.avatar}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{article.author.name}</span>
                      <span className="text-[11px] text-slate-500 block line-clamp-1">{article.author.credentials}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setReadingArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5D5FEF] hover:text-[#4D4FD9] hover:underline"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Full Article Reading Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white text-slate-900 shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setReadingArticle(null)}
              className="absolute top-6 right-6 p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              aria-label="Close reader"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              {/* Meta */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#5D5FEF] bg-[#5D5FEF]/10 px-3 py-1 rounded-full">
                  {readingArticle.category}
                </span>
                <span className="text-slate-500 font-mono">
                  {readingArticle.readTime} · {readingArticle.date}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 tracking-tight leading-snug font-editorial-serif">
                {readingArticle.title}
              </h2>

              {/* Author badge */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="h-10 w-10 rounded-full bg-[#5D5FEF]/10 text-[#5D5FEF] font-bold text-xs flex items-center justify-center">
                  {readingArticle.author.avatar}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{readingArticle.author.name}</span>
                  <span className="text-[11px] text-slate-500 block">{readingArticle.author.credentials}</span>
                </div>
              </div>

              {/* Body Prose */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-sans pt-2">
                {readingArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Action Banner at bottom of article */}
              <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-slate-900">Test your clinical knowledge now</h4>
                  <p className="text-xs text-slate-600">Try 10 free practice questions from our test banks.</p>
                </div>
                <button
                  onClick={() => {
                    setReadingArticle(null);
                    onNavigate('/free-trial');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-extrabold text-xs shadow-md whitespace-nowrap transition-colors"
                >
                  Try 10 Free Questions
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

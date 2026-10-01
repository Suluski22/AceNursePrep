import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle2, Headphones, Sparkles } from 'lucide-react';

export const FloatingSupport: React.FC = () => {
  // WhatsApp Modal State (Bottom-Left)
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState('Hello AceNurse Prep! I have a question about the NCLEX-RN Complete Pass Bundle.');
  const [whatsappSent, setWhatsappSent] = useState(false);

  // Live Chat Drawer State (Bottom-Right)
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'Hi there! I am Nurse Sarah from AceNurse Prep. Are you studying for NCLEX, HESI, or ATI TEAS? How can I help you pass on your first try?',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: now }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Thanks for asking! Our test banks include realistic Next-Gen case studies, SATA partial scoring, and comprehensive rationales with a 100% pass guarantee. Would you like to try our free practice questions or explore our one-time access pricing?";
      const lower = userText.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('discount')) {
        reply = "Our Basic Test Bank is $49 (one-time, 90 days), and the Complete Pass Bundle is $89 (one-time, lifetime access with all exams). There are zero recurring subscriptions!";
      } else if (lower.includes('trial') || lower.includes('free')) {
        reply = "You can register for a 7-Day Free Trial instantly with your email and US/CA phone number. It unlocks full sample question sets in your student dashboard without needing a credit card!";
      } else if (lower.includes('ngn') || lower.includes('next gen') || lower.includes('case')) {
        reply = "Yes, our NCLEX bank contains authentic Next-Gen unfolding case studies, bow-tie questions, and matrix items following the NCSBN Clinical Judgment Measurement Model.";
      } else if (lower.includes('visa') || lower.includes('card') || lower.includes('pay')) {
        reply = "We accept secure one-time checkout via Stripe with Visa cards. Once processed, your test bank or PDF study guide unlocks immediately!";
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsappSent(true);
    setTimeout(() => {
      // Simulate opening WhatsApp chat or resetting
      setWhatsappSent(false);
      setWhatsappOpen(false);
    }, 2000);
  };

  return (
    <>
      {/* 1. Bottom-Left: Floating Green WhatsApp Icon Button */}
      <div className="fixed bottom-[20px] left-[20px] z-50">
        <button
          onClick={() => setWhatsappOpen(!whatsappOpen)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba59] transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
          aria-label="Contact nursing admissions on WhatsApp"
        >
          {/* Animated ping dot */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 border-2 border-[#0B0E2A]"></span>
          </span>

          {/* WhatsApp SVG Icon */}
          <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.888 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>

        {/* WhatsApp Modal Popover */}
        {whatsappOpen && (
          <div className="absolute bottom-16 left-0 w-80 sm:w-96 rounded-2xl bg-[#0B0E2A] border border-[#25D366]/40 shadow-2xl p-5 text-[#F4F6FC] z-50">
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1A4E]">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Nursing Admissions WhatsApp</h4>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    Direct Advisor Line
                  </p>
                </div>
              </div>
              <button
                onClick={() => setWhatsappOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {whatsappSent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-[#25D366] mx-auto animate-bounce" />
                <p className="text-sm font-semibold text-white">Message Dispatched!</p>
                <p className="text-xs text-slate-300">An admissions counselor will connect on WhatsApp within 3 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppSend} className="mt-4 space-y-3">
                <p className="text-xs text-slate-300">
                  Chat directly with an exam prep advisor regarding test bank coverage, institutional pricing, or NGN questions.
                </p>
                <div>
                  <textarea
                    rows={3}
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-[#131738] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366]"
                    placeholder="Type your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Start WhatsApp Chat</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* 2. Bottom-Right: Live Chat Widget ("AceNurse Prep – Replies within 3 min") */}
      <div className="fixed bottom-[20px] right-[20px] z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1A1A4E] hover:bg-[#242468] text-white border border-[#5D5FEF]/50 shadow-2xl transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#5D5FEF]/30"
            aria-label="Open Live Chat Support"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#5D5FEF] text-white">
              <MessageSquare className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>AceNurse Prep Live Chat</span>
                <Sparkles className="h-3 w-3 text-[#FFD60A]" />
              </div>
              <div className="text-[10px] text-emerald-300 font-medium">
                Replies within 3 min
              </div>
            </div>
          </button>
        ) : (
          <div className="w-[92vw] sm:w-96 rounded-2xl bg-[#0B0E2A] border border-[#1A1A4E] shadow-2xl flex flex-col overflow-hidden max-h-[520px]">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#1A1A4E] to-[#131738] border-b border-[#2D2D7A] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full bg-[#5D5FEF] flex items-center justify-center text-white font-bold text-xs border border-white/20">
                  <Headphones className="h-5 w-5" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#1A1A4E]"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">AceNurse Prep Support</h4>
                  <p className="text-[11px] text-emerald-400 font-medium">Replies within 3 min · Live Educator</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Close Chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 min-h-[260px] max-h-[320px] bg-[#070A20]/50">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#5D5FEF] text-white rounded-br-none'
                        : 'bg-[#131738] text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-2 bg-[#131738] rounded-xl w-16">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 bg-[#0B0E2A] border-t border-[#1A1A4E] flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <button
                onClick={() => setChatInput('What is included in the 7-day free trial?')}
                className="px-2.5 py-1 rounded-full bg-[#131738] hover:bg-[#1A1A4E] text-slate-300 whitespace-nowrap transition-colors border border-slate-800"
              >
                Free Trial info
              </button>
              <button
                onClick={() => setChatInput('Is this a one-time purchase or monthly?')}
                className="px-2.5 py-1 rounded-full bg-[#131738] hover:bg-[#1A1A4E] text-slate-300 whitespace-nowrap transition-colors border border-slate-800"
              >
                Pricing details
              </button>
              <button
                onClick={() => setChatInput('Do you have Next-Gen NGN case studies?')}
                className="px-2.5 py-1 rounded-full bg-[#131738] hover:bg-[#1A1A4E] text-slate-300 whitespace-nowrap transition-colors border border-slate-800"
              >
                NGN Questions
              </button>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendChatMessage} className="p-3 bg-[#0B0E2A] border-t border-[#1A1A4E] flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about NCLEX, HESI, pricing..."
                className="flex-1 text-xs p-2.5 rounded-xl bg-[#131738] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#5D5FEF]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#FFD60A] text-[#0B0E2A] hover:bg-[#ffe033] font-bold transition-colors focus:outline-none"
                aria-label="Send Message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

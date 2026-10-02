import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, CheckCircle2, AlertCircle, Download, Clock, ShieldCheck, CreditCard } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { activeCheckoutItem, closeCheckout, processStripePayment, user } = useAuth();

  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardholderName, setCardholderName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    purchaseId: string;
    signedUrl?: string;
  } | null>(null);

  // Signed URL TTL countdown timer (60s)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (successData?.signedUrl && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [successData, timeLeftSeconds]);

  if (!activeCheckoutItem) return null;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces every 4 digits
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
    if (errorMessage) setErrorMessage(null);
  };

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4);
    }
    setExpDate(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsProcessing(true);

    const cleanCard = cardNumber.replace(/\s+/g, '');
    if (cleanCard.length < 13) {
      setIsProcessing(false);
      setErrorMessage('Please enter a valid card number.');
      return;
    }

    const res = await processStripePayment({
      cardNumber: cleanCard,
      expDate,
      cvc,
      postalCode,
      cardholderName: cardholderName || 'Student Nurse'
    });

    setIsProcessing(false);

    if (res.success && res.purchaseId) {
      setSuccessData({
        purchaseId: res.purchaseId,
        signedUrl: res.signedUrl
      });
      setTimeLeftSeconds(60);
    } else {
      setErrorMessage(res.error || 'Payment failed. Please try another card or contact your bank.');
    }
  };

  const handleClose = () => {
    setSuccessData(null);
    setErrorMessage(null);
    setCardNumber('');
    closeCheckout();
  };

  // Helper to trigger instant download simulation
  const handleDownloadPDF = () => {
    // Generate sample PDF blob
    const content = `ProctoredNurseExams - Official High-Yield Clinical Study Guide\nTitle: ${activeCheckoutItem.title}\nAuthorized Licensee: ${cardholderName || user?.fullName || 'Registered Student'}\nSecurity Token ID: ${successData?.purchaseId}\n\nContents:\n1. Next-Gen Clinical Judgment Measurement Model (CJMM)\n2. High-Yield Pharmacology & Antidotes Matrix\n3. Pediatric & Maternal-Newborn Vital Benchmarks\n4. Saunders/HESI 900+ Scoring Conversions\n5. Practice Vignettes and Diagnostic Rationales`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${activeCheckoutItem.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0B0E2A] border border-[#1A1A4E] shadow-2xl p-6 sm:p-8 text-[#F4F6FC]">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#131738] transition-colors"
          aria-label="Close checkout"
        >
          <X className="h-5 w-5" />
        </button>

        {successData ? (
          /* Payment Succeeded View */
          <div className="space-y-6 text-center py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mx-auto border border-emerald-500/30">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white font-sans">Payment Confirmed!</h3>
              <p className="text-xs text-slate-400 mt-1">Transaction ID: {successData.purchaseId}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#131738] border border-slate-700/60 text-left space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Item</span>
                <span className="text-white font-medium">{activeCheckoutItem.title}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Amount Paid</span>
                <span className="text-[#FFD60A] font-bold text-sm font-mono tabular-nums">${activeCheckoutItem.price}.00</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Type</span>
                <span className="text-slate-300">One-Time Access (No Subscription)</span>
              </div>
            </div>

            {/* If Study Guide: Pay-to-Download signed URL with 60s TTL */}
            {activeCheckoutItem.type === 'study_guide' && (
              <div className="p-4 rounded-xl bg-[#1A1A4E]/60 border border-[#5D5FEF]/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#FFD60A]" />
                    Private Supabase Signed URL
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    <Clock className="h-3 w-3" />
                    TTL: {timeLeftSeconds}s remaining
                  </span>
                </div>

                <p className="text-xs text-slate-300 text-left leading-relaxed">
                  Your secure download token is active. The file has also been permanently added to <strong className="text-white">My Downloads</strong> in your student dashboard.
                </p>

                <button
                  onClick={handleDownloadPDF}
                  disabled={timeLeftSeconds <= 0}
                  className="w-full py-3 px-4 rounded-xl bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  <span>{timeLeftSeconds > 0 ? 'Download High-Yield PDF Now' : 'Signed Link Expired (Access in Dashboard)'}</span>
                </button>
              </div>
            )}

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-[#5D5FEF] hover:bg-[#4D4FD9] text-white font-semibold text-sm transition-colors"
            >
              Continue to Student Dashboard
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FFD60A] uppercase tracking-wider">
                <Lock className="h-3.5 w-3.5" />
                <span>Stripe Encrypted Checkout · 256-Bit SSL</span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">Complete Your Access</h3>
              <p className="text-xs text-slate-400">One-time payment. Zero recurring charges or auto-renewals.</p>
            </div>

            {/* Selected Item Summary Card */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#131738] border border-slate-700/60">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400 uppercase tracking-wide block">Selected Package</span>
                <span className="text-sm font-semibold text-white block">{activeCheckoutItem.title}</span>
                <span className="text-[11px] text-emerald-400 block">Instant Activation Guarantee</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#FFD60A] font-mono tabular-nums">
                  ${activeCheckoutItem.price}
                </span>
                <span className="text-[10px] text-slate-400 block">one-time</span>
              </div>
            </div>

            {/* Processing Error Notice (Silent handling rule applies) */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Cardholder Full Name
                </label>
                <input
                  type="text"
                  required
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full text-xs p-3 rounded-xl bg-[#131738] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Billing Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nurse@example.com"
                  className="w-full text-xs p-3 rounded-xl bg-[#131738] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Card Information
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4000 0000 0000 0000"
                    maxLength={19}
                    className="w-full text-xs p-3 pr-10 rounded-xl bg-[#131738] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A] font-mono"
                  />
                  <CreditCard className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    required
                    value={expDate}
                    onChange={handleExpChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full text-xs p-3 rounded-xl bg-[#131738] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A] font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    required
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    className="w-full text-xs p-3 rounded-xl bg-[#131738] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A] font-mono text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Postal / ZIP Code (US or Canada)
                </label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.toUpperCase().slice(0, 10))}
                  placeholder="e.g. 78701 or M5V 2T6"
                  className="w-full text-xs p-3 rounded-xl bg-[#131738] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD60A]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#FFD60A] hover:bg-[#ffe033] text-[#0B0E2A] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-4 w-4 border-2 border-[#0B0E2A] border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Stripe Authorization...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Pay ${activeCheckoutItem.price}.00 USD (One-Time)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Developer Test Helper Hint */}
              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-400">Testing Note:</span> Use <code className="text-[#FFD60A] bg-[#131738] px-1 py-0.5 rounded">4242 4242 4242 4242</code> for test Visa payment.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useText } from '../utils/textDb';

// ─────────────────────────────────────────────────────────────
// PROMPT GENERATOR
// Generates the exact prompt string for the Admin to paste
// into an AI Deep Research tool.
// ─────────────────────────────────────────────────────────────
const generateDeepResearchPrompt = (name, dob, lifePathNumber, customerEmail) => {
  return `ĐÓNG VAI (ROLE):
Bạn là một Chuyên gia Khai vấn Cá nhân (Personal Life Coach) và Biên tập viên phong cách sống.

NHIỆM VỤ (TASK):
Viết một bài phân tích chuyên sâu về định hướng phát triển cá nhân (khoảng 1000 - 1500 từ). Hãy viết mạch lạc, truyền cảm hứng và mang tính ứng dụng cao.

THÔNG TIN ĐẦU VÀO (INPUT):
* Tên người nhận: ${name}
* Dữ liệu thời gian: ${dob}
* Nhóm tính cách: Nhóm số ${lifePathNumber}

YÊU CẦU VỀ VĂN PHONG (TONE & VIBE):
* Ngôn ngữ tiếng Việt mang phong cách "Quiet Luxury": Tinh tế, sâu sắc và chuyên nghiệp. 
* Lời văn mang tính khích lệ, hướng tới sự phát triển toàn diện. Không dùng bất kỳ từ ngữ nào mang tính chất tâm linh, y học hay trị liệu.

CẤU TRÚC BÀI VIẾT (Markdown):
Phần 1: Đặc Điểm Tính Cách Trọng Tâm
Phần 2: Động Lực Bên Trong & Điểm Cần Cải Thiện
Phần 3: Lộ Trình Phát Triển Bản Thân
Phần 4: 4 Giai Đoạn Nền Tảng
Phần 5: Định Hướng Công Việc & Giao Tiếp Xã Hội
Phần 6: Gợi Ý Xây Dựng Kế Hoạch Hành Động
`;
};

// ─────────────────────────────────────────────────────────────
// CHECKOUT MODAL
// ─────────────────────────────────────────────────────────────
export default function CheckoutModal({ isOpen, onClose, userData, results }) {
  const { t } = useText();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promptPreview, setPromptPreview] = useState(null); // QA only: shows prompt popup
  const [copied, setCopied] = useState(false);

  const isQA = import.meta.env.VITE_APP_ENV !== 'production';

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setIsSubmitted(false);
      setIsProcessing(false);
      setPromptPreview(null);
      setCopied(false);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleCopyPrompt = async () => {
    if (!promptPreview) return;
    try {
      await navigator.clipboard.writeText(promptPreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = promptPreview;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsProcessing(true);

    const prompt = generateDeepResearchPrompt(
      userData.name,
      userData.dob,
      results.lifePathNumber,
      email
    );

    if (isQA) {
      // ── QA MODE: Show prompt in a popup for admin to copy ──
      setTimeout(() => {
        setIsProcessing(false);
        setPromptPreview(prompt);
      }, 400);
    } else {
      // ── PRODUCTION MODE: Auto-send via mailto ──
      const adminEmail = 'Crash147852369@gmail.com';
      const subject = encodeURIComponent(`[Đơn Hàng Mới] Báo Cáo Premium - ${userData.name}`);
      const body = encodeURIComponent(prompt);
      
      window.open(`mailto:${adminEmail}?subject=${subject}&body=${body}`, '_self');

      setTimeout(() => {
        setIsProcessing(false);
        setIsSubmitted(true);
      }, 800);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-luxury-charcoal/40 backdrop-blur-sm" />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 w-full bg-white rounded-sm shadow-[0_20px_60px_rgb(0,0,0,0.12)] overflow-hidden ${promptPreview ? 'max-w-2xl' : 'max-w-md'}`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center text-luxury-charcoal/40 hover:text-luxury-charcoal transition-colors"
              aria-label="Đóng"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="2" y1="2" x2="14" y2="14" />
                <line x1="14" y1="2" x2="2" y2="14" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {promptPreview ? (
                /* ── QA: PROMPT PREVIEW ── */
                <motion.div
                  key="prompt-preview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-6 sm:p-8"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600">
                          {t('checkout.qaTitle')}
                        </p>
                        <p className="text-xs text-luxury-charcoal/50 mt-1 font-serif">
                          {t('checkout.qaSubtitle')}
                        </p>
                      </div>
                      <button
                        onClick={handleCopyPrompt}
                        className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-widest rounded-sm transition-all ${
                          copied
                            ? 'bg-green-800 text-white'
                            : 'bg-luxury-charcoal text-luxury-alabaster hover:bg-black'
                        }`}
                      >
                        {copied ? t('checkout.qaCopiedBtn') : t('checkout.qaCopyBtn')}
                      </button>
                    </div>

                    <div className="bg-luxury-beige border border-luxury-charcoal/10 rounded-sm p-4 max-h-[50vh] overflow-y-auto">
                      <pre className="text-xs text-luxury-charcoal/80 whitespace-pre-wrap font-mono leading-relaxed">
                        {promptPreview}
                      </pre>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        onClick={() => {
                          setPromptPreview(null);
                          setIsSubmitted(true);
                        }}
                        className="px-6 py-2.5 bg-luxury-charcoal text-luxury-alabaster hover:bg-black text-[10px] font-semibold uppercase tracking-widest rounded-sm transition-colors"
                      >
                        {t('checkout.qaDoneBtn')}
                      </button>
                    </div>
                  </div>
                </motion.div>

              ) : !isSubmitted ? (
                /* ── CHECKOUT FORM ── */
                <motion.div
                  key="checkout-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 sm:p-10"
                >
                  {/* Header */}
                  <div className="text-center mb-8 space-y-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-luxury-charcoal/50">
                      {t('report.premiumCta.tagline')}
                    </p>
                    <h2 className="text-2xl sm:text-[26px] font-serif leading-snug text-luxury-charcoal">
                      {t('checkout.title')}
                    </h2>
                    <div className="flex items-center justify-center space-x-3 pt-2">
                      <div className="h-px w-8 bg-luxury-charcoal/15"></div>
                      <span className="text-lg font-serif text-luxury-charcoal">{t('checkout.priceLabel')}</span>
                      <div className="h-px w-8 bg-luxury-charcoal/15"></div>
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="mb-8 space-y-3">
                    {t('checkout.features').map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-luxury-charcoal/70">
                        <span className="mr-3 text-[10px] text-luxury-charcoal/30">✦</span>
                        <span className="font-serif">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px w-full bg-luxury-charcoal/8 mb-8"></div>

                  {/* QR Code Placeholder */}
                  <div className="mb-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-luxury-charcoal/50 mb-3 text-center">
                      {t('checkout.bankTransferTitle')}
                    </p>
                    <div className="w-40 h-40 mx-auto bg-luxury-beige border border-dashed border-luxury-charcoal/15 rounded-sm flex flex-col items-center justify-center text-luxury-charcoal/30 mb-4">
                      <svg className="w-8 h-8 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="3" height="3" />
                        <rect x="18" y="14" width="3" height="3" />
                        <rect x="14" y="18" width="3" height="3" />
                        <rect x="18" y="18" width="3" height="3" />
                      </svg>
                      <span className="text-[10px] font-serif italic">{t('checkout.qrPlaceholder')}</span>
                    </div>
                    <div className="text-center space-y-1.5 text-sm text-luxury-charcoal/70">
                      <p className="font-serif">
                        <span className="text-luxury-charcoal/40 text-xs uppercase tracking-wider mr-2">{t('checkout.bankNameLabel')}</span>
                        {t('checkout.bankNameValue')}
                      </p>
                      <p className="font-serif">
                        <span className="text-luxury-charcoal/40 text-xs uppercase tracking-wider mr-2">{t('checkout.bankAccountLabel')}</span>
                        {t('checkout.bankAccountValue')}
                      </p>
                      <p className="font-serif">
                        <span className="text-luxury-charcoal/40 text-xs uppercase tracking-wider mr-2">{t('checkout.bankAccountHolderLabel')}</span>
                        {t('checkout.bankAccountHolderValue')}
                      </p>
                      <p className="text-[10px] text-luxury-charcoal/40 italic font-serif pt-1">
                        {t('checkout.transferDescLabel')} {userData.name}
                      </p>
                    </div>
                  </div>

                  <div className="h-px w-full bg-luxury-charcoal/8 mb-6"></div>

                  {/* Email Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-semibold text-luxury-charcoal/60 uppercase tracking-[0.2em]">
                        {t('checkout.emailInputLabel')}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('checkout.emailPlaceholder')}
                        required
                        className="w-full px-4 py-3.5 bg-luxury-beige/60 border border-luxury-charcoal/10 focus:outline-none focus:border-luxury-charcoal/40 focus:ring-1 focus:ring-luxury-charcoal/40 transition-all font-sans text-sm text-luxury-charcoal rounded-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-luxury-charcoal text-luxury-alabaster hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed py-4 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors rounded-sm shadow-md flex items-center justify-center"
                    >
                      {isProcessing ? (
                        <span className="flex items-center space-x-2">
                          <span className="w-3 h-3 border border-luxury-alabaster/40 border-t-luxury-alabaster rounded-full animate-spin"></span>
                          <span>{t('checkout.processingBtn')}</span>
                        </span>
                      ) : (
                        t('checkout.confirmBtn')
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                /* ── SUCCESS STATE ── */
                <motion.div
                  key="checkout-success"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-8 sm:p-10 text-center"
                >
                  <div className="py-8 space-y-8">
                    {/* Success Icon */}
                    <div className="w-16 h-16 mx-auto rounded-full bg-luxury-beige flex items-center justify-center">
                      <svg className="w-7 h-7 text-luxury-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-serif text-luxury-charcoal leading-snug">
                        {t('checkout.successTitle')}
                      </h3>
                      <p className="text-sm font-serif italic leading-relaxed text-luxury-charcoal/70 max-w-xs mx-auto">
                        {t('checkout.successDescription')}
                      </p>
                    </div>

                    <div className="h-px w-12 bg-luxury-charcoal/15 mx-auto"></div>

                    <p className="text-[10px] text-luxury-charcoal/40 uppercase tracking-widest">
                      {email}
                    </p>

                    <button
                      onClick={onClose}
                      className="mt-4 px-10 py-3.5 bg-luxury-charcoal text-luxury-alabaster hover:bg-black text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors rounded-sm shadow-md"
                    >
                      {t('common.close')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

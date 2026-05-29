import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GoogleAd from './GoogleAd';
import CheckoutModal from './CheckoutModal';
import { useText } from '../utils/textDb';

const FadeInSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

export default function ReportView({ userData, results, handleReset }) {
  const { t } = useText();
  const { lifePathNumber, destinyNumber, elements, analysisData, synthesis } = results;
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const da = analysisData.deepAnalysis;

  return (
    <div className="min-h-screen bg-luxury-alabaster text-luxury-charcoal font-sans selection:bg-luxury-charcoal selection:text-luxury-alabaster">
      
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-luxury-alabaster/80 backdrop-blur-md border-b border-luxury-charcoal/5 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={handleReset}
          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-luxury-charcoal/5 hover:bg-luxury-charcoal/10 border border-luxury-charcoal/20 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-luxury-charcoal transition-all flex items-center gap-2 shadow-sm"
        >
          <span className="text-sm sm:text-base leading-none">←</span> {t('report.closeReport')}
        </button>
        <div className="font-serif text-sm tracking-widest uppercase">{t('common.brandName')}</div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24 space-y-24">
        
        {/* Header Title */}
        <FadeInSection>
          <div className="text-center space-y-6 border-b border-luxury-charcoal/10 pb-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-luxury-charcoal/50">
              {t('report.headerSubtitle')}
            </p>
            <h1 className="text-4xl sm:text-5xl font-serif leading-tight">
              {userData.name}
            </h1>
            <p className="text-sm font-sans tracking-wide text-luxury-charcoal/60">
              {t('report.dobLabel')}{userData.dob.split('-').reverse().join('.')}
            </p>
          </div>
        </FadeInSection>

        {/* Hero Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeInSection>
            <div className="bg-luxury-beige p-10 rounded-sm text-center space-y-4 h-full border border-luxury-charcoal/5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-luxury-charcoal/50">{t('report.lifePathTitle')}</p>
              <div className="text-8xl font-serif text-luxury-charcoal">{lifePathNumber}</div>
              <p className="text-sm italic font-serif text-luxury-charcoal/80">{t('report.lifePathSubtitle')}</p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="bg-luxury-beige p-10 rounded-sm text-center space-y-4 h-full border border-luxury-charcoal/5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-luxury-charcoal/50">{t('report.destinyTitle')}</p>
              <div className="text-8xl font-serif text-luxury-charcoal">{destinyNumber}</div>
              <p className="text-sm italic font-serif text-luxury-charcoal/80">{t('report.destinySubtitle')}</p>
            </div>
          </FadeInSection>
        </div>

        {/* Dynamic Synthesis — unique per user */}
        {synthesis && (
          <FadeInSection>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-luxury-charcoal/10" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-luxury-charcoal/40 whitespace-nowrap">{t('report.synthesisLabel')}</p>
                <div className="h-px flex-1 bg-luxury-charcoal/10" />
              </div>
              <div className="bg-luxury-beige/60 border border-luxury-charcoal/8 rounded-sm p-8 sm:p-10">
                <p className="text-base sm:text-lg font-serif leading-loose text-luxury-charcoal/80 text-justify italic">
                  {synthesis}
                </p>
              </div>
            </div>
          </FadeInSection>
        )}

        {/* Title & Overview */}
        <FadeInSection>
          <div className="space-y-8 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif italic text-luxury-charcoal leading-snug">
              "{analysisData.title}"
            </h2>
            <div className="h-px w-12 bg-luxury-charcoal/20 mx-auto"></div>
            <p className="text-base sm:text-lg font-serif leading-loose text-luxury-charcoal/80 text-justify">
              {analysisData.overview}
            </p>
          </div>
        </FadeInSection>

        {/* Ad Placeholder 1 */}
        <FadeInSection>
          <div className="w-full bg-luxury-beige border border-dashed border-luxury-charcoal/20 rounded-sm p-4 flex flex-col items-center justify-center text-luxury-charcoal/40 min-h-[120px] relative overflow-hidden">
            <span className="text-[10px] mb-2 opacity-60 font-serif italic">Advertisement</span>
            <GoogleAd format="fluid" layout="in-article" slot="1111111111" />
          </div>
        </FadeInSection>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeInSection>
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-luxury-charcoal border-l-2 border-luxury-charcoal pl-4">{t('report.strengthsLabel')}</h3>
              <ul className="space-y-4 pl-4">
                {da.strengths.map((item, index) => (
                  <li key={index} className="flex items-start text-sm sm:text-base leading-relaxed text-luxury-charcoal/80">
                    <span className="mr-4 mt-1.5 text-[8px] text-luxury-charcoal/40">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-luxury-charcoal border-l-2 border-luxury-charcoal pl-4">{t('report.challengesLabel')}</h3>
              <ul className="space-y-4 pl-4">
                {da.weaknesses.map((item, index) => (
                  <li key={index} className="flex items-start text-sm sm:text-base leading-relaxed text-luxury-charcoal/80">
                    <span className="mr-4 mt-1.5 text-[8px] text-luxury-charcoal/40">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>

        {/* Soul Urge & Personality Mask */}
        {(da.soulUrge || da.personalityMask) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {da.soulUrge && (
              <FadeInSection>
                <div className="h-full space-y-4 bg-white p-8 rounded-sm border border-luxury-charcoal/5 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🌙</span>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-luxury-charcoal">{t('report.soulUrgeLabel')}</h3>
                  </div>
                  <p className="text-sm font-serif leading-loose text-luxury-charcoal/75 text-justify">
                    {da.soulUrge}
                  </p>
                </div>
              </FadeInSection>
            )}
            {da.personalityMask && (
              <FadeInSection delay={0.15}>
                <div className="h-full space-y-4 bg-white p-8 rounded-sm border border-luxury-charcoal/5 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🎭</span>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-luxury-charcoal">{t('report.personalityMaskLabel')}</h3>
                  </div>
                  <p className="text-sm font-serif leading-loose text-luxury-charcoal/75 text-justify">
                    {da.personalityMask}
                  </p>
                </div>
              </FadeInSection>
            )}
          </div>
        )}

        {/* Career & Wealth */}
        <FadeInSection>
          <div className="space-y-6 bg-white p-8 sm:p-12 shadow-[0_4px_20px_rgb(0,0,0,0.02)] rounded-sm border border-luxury-charcoal/5">
            <h3 className="text-xl font-serif text-luxury-charcoal">{t('report.careerLabel')}</h3>
            <p className="text-base leading-loose text-luxury-charcoal/80 font-serif whitespace-pre-line">
              {da.careerAndWealth}
            </p>
          </div>
        </FadeInSection>

        {/* Love & Relationships */}
        <FadeInSection>
          <div className="space-y-6 bg-white p-8 sm:p-12 shadow-[0_4px_20px_rgb(0,0,0,0.02)] rounded-sm border border-luxury-charcoal/5">
            <h3 className="text-xl font-serif text-luxury-charcoal">{t('report.loveLabel')}</h3>
            <p className="text-base leading-loose text-luxury-charcoal/80 font-serif whitespace-pre-line">
              {da.loveAndRelationships}
            </p>
          </div>
        </FadeInSection>

        {/* Ad Placeholder 2 */}
        <FadeInSection>
          <div className="w-full bg-luxury-beige border border-dashed border-luxury-charcoal/20 rounded-sm p-4 flex flex-col items-center justify-center text-luxury-charcoal/40 min-h-[120px] relative overflow-hidden">
            <span className="text-[10px] mb-2 opacity-60 font-serif italic">Advertisement</span>
            <GoogleAd format="fluid" layout="in-article" slot="2222222222" />
          </div>
        </FadeInSection>

        {/* Karmic Lessons */}
        {da.karmicLessons && (
          <FadeInSection>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-luxury-charcoal/10" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-luxury-charcoal/40 whitespace-nowrap">{t('report.karmicLessonsLabel')}</p>
                <div className="h-px flex-1 bg-luxury-charcoal/10" />
              </div>
              <div className="border-l-2 border-luxury-charcoal/20 pl-8 py-2">
                <p className="text-base sm:text-lg font-serif leading-loose text-luxury-charcoal/80 italic text-justify">
                  {da.karmicLessons}
                </p>
              </div>
            </div>
          </FadeInSection>
        )}

        {/* Future & Peaks */}
        <FadeInSection>
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-luxury-charcoal border-l-2 border-luxury-charcoal pl-4">{t('report.futureLabel')}</h3>
            <p className="text-base leading-loose text-luxury-charcoal/80 font-serif pl-4 whitespace-pre-line">
              {da.futureAndPeaks}
            </p>
          </div>
        </FadeInSection>

        {/* Shadow Work — dark card */}
        {da.shadowWork && (
          <FadeInSection>
            <div className="bg-luxury-charcoal text-luxury-alabaster p-8 sm:p-12 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 text-[200px] text-luxury-alabaster opacity-[0.03] font-serif leading-none -mt-8 -ml-4 select-none">🌑</div>
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-px w-6 bg-luxury-alabaster/30"></div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-luxury-alabaster/50">{t('report.shadowWorkSubtitle')}</p>
                </div>
                <h3 className="text-lg sm:text-xl font-serif text-luxury-alabaster leading-snug">
                  {t('report.shadowWorkTitle')}
                </h3>
                <p className="text-sm sm:text-base font-serif leading-loose text-luxury-alabaster/75 text-justify">
                  {da.shadowWork}
                </p>
              </div>
            </div>
          </FadeInSection>
        )}

        {/* Happiness & Healing */}
        <FadeInSection>
          <div className="bg-luxury-charcoal text-luxury-alabaster p-10 sm:p-16 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 text-[160px] text-luxury-alabaster opacity-5 font-serif leading-none -mt-8 -ml-4">"</div>
            <div className="relative z-10 space-y-8 text-center max-w-xl mx-auto">
              <h3 className="font-sans uppercase tracking-[0.2em] text-[10px] font-semibold text-luxury-alabaster/60">{t('report.healingLabel')}</h3>
              <p className="text-lg sm:text-xl font-serif italic leading-relaxed text-luxury-alabaster">
                {da.happinessAndHealing}
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Crystals & Healing */}
        {da.crystalsAndHealing && da.crystalsAndHealing.length > 0 && (
          <FadeInSection>
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-luxury-charcoal/40">{t('report.crystalsSubtitle')}</p>
                <h3 className="text-2xl font-serif text-luxury-charcoal">{t('report.crystalsTitle')}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {da.crystalsAndHealing.map((crystal, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="bg-white border border-luxury-charcoal/5 rounded-sm p-6 space-y-3 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-full bg-luxury-beige flex items-center justify-center text-lg">💎</div>
                    <h4 className="text-sm font-semibold text-luxury-charcoal leading-snug">{crystal.name}</h4>
                    <p className="text-xs font-serif text-luxury-charcoal/60 leading-relaxed">{crystal.benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        {/* Daily Affirmations */}
        {da.affirmations && da.affirmations.length > 0 && (
          <FadeInSection>
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-luxury-charcoal/40">{t('report.affirmationsSubtitle')}</p>
                <h3 className="text-2xl font-serif text-luxury-charcoal">{t('report.affirmationsTitle')}</h3>
              </div>
              <div className="space-y-4">
                {da.affirmations.map((affirmation, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="flex items-start gap-5 bg-luxury-beige/50 border border-luxury-charcoal/5 rounded-sm p-6 hover:bg-luxury-beige transition-colors"
                  >
                    <span className="text-luxury-charcoal/30 font-serif text-2xl leading-none mt-1 shrink-0">0{idx + 1}</span>
                    <p className="text-base sm:text-lg font-serif italic text-luxury-charcoal leading-relaxed">
                      "{affirmation}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        <div className="h-px w-full bg-luxury-charcoal/10"></div>

        {/* Five Elements */}
        <FadeInSection>
          <div className="space-y-10 py-4">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-serif text-luxury-charcoal">{t('report.elementsTitle')}</h3>
              <p className="text-xs font-sans text-luxury-charcoal/60 uppercase tracking-widest">{t('report.elementsSubtitle')}</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-6">
              {elements && Object.entries(elements).map(([element, percentage]) => (
                <div key={element} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-semibold tracking-wide text-luxury-charcoal">{element}</span>
                    <span className="text-xs font-mono text-luxury-charcoal/60">{percentage}%</span>
                  </div>
                  <div className="w-full bg-luxury-charcoal/5 rounded-sm h-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className="bg-luxury-charcoal h-full rounded-sm" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Affiliate Products */}
        <FadeInSection>
          <div className="pt-16 pb-8 space-y-10 border-t border-luxury-charcoal/10">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-serif text-luxury-charcoal">{t('report.affiliateTitle')}</h3>
              <p className="text-[10px] font-sans text-luxury-charcoal/50 uppercase tracking-[0.2em]">{t('report.affiliateSubtitle')}</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {t('report.affiliates').map((item, idx) => (
                <div key={idx} className="group bg-white border border-luxury-charcoal/5 p-4 rounded-sm flex flex-col items-center text-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-luxury-charcoal/20 cursor-pointer">
                  <div className="w-16 h-16 bg-luxury-beige rounded-full mb-4 flex items-center justify-center text-luxury-charcoal/20 group-hover:scale-105 transition-transform">
                    <span className="text-[10px] font-serif italic">Image</span>
                  </div>
                  <h4 className="text-xs font-semibold text-luxury-charcoal mb-1">{item.name}</h4>
                  <span className="text-[9px] text-luxury-charcoal/50 uppercase tracking-widest">{item.type}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Premium CTA */}
        <FadeInSection>
          <div className="pt-16 pb-8 border-t border-luxury-charcoal/10">
            <div className="bg-luxury-charcoal text-luxury-alabaster p-10 sm:p-16 rounded-sm relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-[40%] h-full bg-white/[0.02] transform skew-x-[-12deg] translate-x-[20%]"></div>
              <div className="relative z-10 space-y-6 max-w-md mx-auto">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-luxury-alabaster/50">
                  {t('report.premiumCta.tagline')}
                </p>
                <h3 className="text-2xl sm:text-3xl font-serif leading-snug">
                  {t('report.premiumCta.title')}
                </h3>
                <p className="text-sm font-serif italic text-luxury-alabaster/60 leading-relaxed">
                  {t('report.premiumCta.description')}
                </p>
                <div className="flex items-center justify-center space-x-3 pt-2">
                  <div className="h-px w-8 bg-luxury-alabaster/20"></div>
                  <span className="text-lg font-serif">{t('report.premiumCta.price')}</span>
                  <div className="h-px w-8 bg-luxury-alabaster/20"></div>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="mt-4 px-10 py-4 bg-luxury-alabaster text-luxury-charcoal hover:bg-white text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors rounded-sm shadow-lg"
                >
                  {t('report.premiumCta.unlockBtn')}
                </button>
              </div>
            </div>
          </div>
        </FadeInSection>

      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        userData={userData}
        results={results}
      />
    </div>
  );
}

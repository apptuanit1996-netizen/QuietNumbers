import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GoogleAd from './GoogleAd';
import { useText } from '../utils/textDb';

const FadeInSection = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0f] pointer-events-none">
      {/* Deep Space Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1c2c] via-[#0a0a0f] to-black opacity-80"></div>
      
      {/* Slow Moving Orbs / Nebulas */}
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] bg-gradient-to-r from-[#2c1b4d] to-[#122e43] rounded-full blur-[120px] -top-[300px] -left-[200px] opacity-40 mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-r from-[#43122c] to-[#1b4d40] rounded-full blur-[100px] bottom-[10%] -right-[100px] opacity-30 mix-blend-screen"
      />

      {/* Floating Particles (Stars) */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: Math.random() * 0.5 + 0.1,
            y: Math.random() * 100 + "%",
            x: Math.random() * 100 + "%"
          }}
          animate={{
            y: [null, Math.random() * -100 - 50 + "%"],
            opacity: [null, Math.random() * 0.8 + 0.2, 0]
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      {/* Orbital Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] sm:w-[80vw] sm:h-[80vw] border border-white/5 rounded-full opacity-20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 250, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] sm:w-[100vw] sm:h-[100vw] border border-[#66fcf1]/10 rounded-full opacity-30 border-dashed"
      />
    </div>
  );
};

export default function ZodiacReportView({ userData, results, handleReset }) {
  const { t } = useText();
  const data = results.zodiacInfo;
  const synergy = results.zodiacSynergy;

  if (!data) return null;

  const [dailyQuote, setDailyQuote] = useState({
    text: data.quoteOfTheDay,
    author: "Zodiac"
  });

  useEffect(() => {
    fetch('https://dummyjson.com/quotes/random')
      .then(res => res.json())
      .then(json => {
        if (json.quote) {
          setDailyQuote({
            text: json.quote,
            author: json.author
          });
        }
      })
      .catch(err => console.error("Failed to fetch dynamic quote", err));
  }, []);

  // Glassmorphism Card Style
  const glassCard = "bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e0e2e4] font-sans selection:bg-[#66fcf1] selection:text-[#0b0c10] overflow-hidden relative">
      <AnimatedBackground />

      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-[#0a0a0f]/60 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={handleReset}
          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white transition-all flex items-center gap-2 shadow-lg"
        >
          <span className="text-sm sm:text-base leading-none">←</span> {t('zodiacReport.closeReport')}
        </button>
        <div className="font-serif text-sm tracking-widest uppercase text-white/80">{t('common.brandName')}</div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 space-y-20 relative z-10">
        
        {/* Header Title */}
        <FadeInSection>
          <div className="text-center space-y-6">
            <motion.p 
              initial={{ letterSpacing: "0em" }}
              animate={{ letterSpacing: "0.3em" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-[10px] font-semibold uppercase text-[#66fcf1]/80"
            >
              {t('zodiacReport.headerSubtitle')}
            </motion.p>
            <h1 className="text-4xl sm:text-6xl font-serif leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              {userData.name}
            </h1>
            <p className="text-sm font-sans tracking-widest text-white/40 uppercase">
              {t('report.dobLabel')}{userData.dob.split('-').reverse().join('.')}
            </p>
          </div>
        </FadeInSection>

        {/* Hero Zodiac Symbol (Glass) */}
        <FadeInSection delay={0.2}>
          <div className={`${glassCard} p-12 sm:p-20 text-center space-y-10 relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", type: "spring" }}
              className="text-8xl sm:text-[160px] leading-none filter drop-shadow-[0_0_30px_rgba(102,252,241,0.3)]"
            >
              {data.symbol}
            </motion.div>
            <div className="space-y-3 relative z-10">
              <h2 className="text-4xl sm:text-5xl font-serif text-white tracking-widest">{data.name}</h2>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">{data.dates}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-8 relative z-10">
              <div className="px-8 py-4 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm">
                <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-1.5">{t('zodiacReport.elementLabel')}</span>
                <span className="text-sm font-semibold text-white tracking-widest uppercase">{data.element}</span>
              </div>
              <div className="px-8 py-4 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm">
                <span className="text-[9px] text-white/40 uppercase tracking-widest block mb-1.5">{t('zodiacReport.rulingPlanetLabel')}</span>
                <span className="text-sm font-semibold text-white tracking-widest uppercase">{data.rulingPlanet}</span>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Dynamic Astro-Numerology Synergy */}
        {synergy && (
          <FadeInSection>
            <div className={`${glassCard} p-10 sm:p-12 relative border-l-4 border-l-[#f9ed69]`}>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f9ed69]">{t('zodiacReport.synergyTitle')}</h3>
              </div>
              <p className="text-lg sm:text-xl font-serif leading-loose text-white/90 text-justify">
                {synergy}
              </p>
            </div>
          </FadeInSection>
        )}

        {/* Ad Placeholder 1 */}
        <FadeInSection>
          <div className="w-full bg-black/40 border border-dashed border-white/20 rounded-3xl p-4 flex flex-col items-center justify-center text-white/40 min-h-[120px] relative overflow-hidden backdrop-blur-sm">
            <span className="text-[10px] mb-2 opacity-60 font-serif italic">Advertisement</span>
            <GoogleAd format="fluid" layout="in-article" slot="4444444444" />
          </div>
        </FadeInSection>

        {/* Quote of the Day */}
        <FadeInSection>
          <div className={`${glassCard} p-8 sm:p-12 text-center space-y-4 border border-white/20`}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#66fcf1]">Quote Of The Day</h3>
            <p className="text-lg sm:text-xl font-serif italic text-white/90 leading-relaxed">
              "{dailyQuote.text}"
            </p>
            <p className="text-[10px] font-sans uppercase tracking-widest text-white/50">
              - {dailyQuote.author} -
            </p>
          </div>
        </FadeInSection>

        {/* Overview */}
        <FadeInSection>
          <div className={`${glassCard} p-10 sm:p-14 space-y-8`}>
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#66fcf1]"></div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#66fcf1]">{t('zodiacReport.overviewTitle')}</h3>
            </div>
            <p className="text-base sm:text-xl font-serif leading-[2.2] text-white/80 text-justify first-letter:text-5xl first-letter:font-serif first-letter:text-[#66fcf1] first-letter:mr-2 first-letter:float-left">
              {data.overview}
            </p>
          </div>
        </FadeInSection>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeInSection>
            <div className={`${glassCard} p-10 space-y-8 h-full border-t-2 border-t-[#66fcf1]/50`}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#66fcf1]">{t('zodiacReport.strengthsLabel')}</h3>
              <ul className="space-y-6">
                {data.strengths.map((item, index) => (
                  <li key={index} className="flex items-start text-sm sm:text-base leading-relaxed text-white/70">
                    <span className="mr-5 mt-1.5 text-[10px] text-[#66fcf1]">✧</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className={`${glassCard} p-10 space-y-8 h-full border-t-2 border-t-[#ff6b6b]/50`}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b6b]">{t('zodiacReport.weaknessesLabel')}</h3>
              <ul className="space-y-6">
                {data.weaknesses.map((item, index) => (
                  <li key={index} className="flex items-start text-sm sm:text-base leading-relaxed text-white/70">
                    <span className="mr-5 mt-1.5 text-[10px] text-[#ff6b6b]">✧</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>

        {/* Love & Relationships & Love Language */}
        <FadeInSection>
          <div className={`${glassCard} p-10 sm:p-14 space-y-12`}>
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-6 flex items-center gap-4">
                <span className="text-[#ffb6b9]">♥</span> {t('zodiacReport.loveLabel')}
              </h3>
              <p className="text-base sm:text-lg leading-loose text-white/70 font-serif text-justify">
                {data.love}
              </p>
            </div>
            
            {data.loveLanguage && (
              <div className="bg-black/30 p-6 sm:p-8 rounded-2xl border border-white/5">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[#ffb6b9] mb-3">
                  {t('zodiacReport.loveLanguageLabel')}
                </h4>
                <p className="text-base font-serif italic text-white/90">
                  "{data.loveLanguage}"
                </p>
              </div>
            )}
          </div>
        </FadeInSection>

        {/* Career & Wealth */}
        <FadeInSection>
          <div className={`${glassCard} p-10 sm:p-14 space-y-12`}>
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-6 flex items-center gap-4">
                <span className="text-[#f9ed69]">✦</span> {t('zodiacReport.careerLabel')}
              </h3>
              <p className="text-base sm:text-lg leading-loose text-white/70 font-serif text-justify">
                {data.career}
              </p>
            </div>

            {data.wealthPotential && (
              <div className="bg-black/30 p-6 sm:p-8 rounded-2xl border border-white/5 border-l-2 border-l-[#f9ed69]">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[#f9ed69] mb-3">
                  {t('zodiacReport.wealthLabel')}
                </h4>
                <p className="text-base font-serif italic text-white/90">
                  {data.wealthPotential}
                </p>
              </div>
            )}
          </div>
        </FadeInSection>

        {/* Shadow Work & Karmic Lessons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeInSection>
            <div className={`bg-black/60 backdrop-blur-xl border border-white/5 p-10 rounded-3xl h-full shadow-2xl relative overflow-hidden`}>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ff6b6b]/10 rounded-full blur-3xl"></div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
                {t('zodiacReport.shadowWorkTitle')}
              </h3>
              <p className="text-base font-serif leading-loose text-white/70 text-justify">
                {data.shadowWork}
              </p>
            </div>
          </FadeInSection>
          
          <FadeInSection delay={0.2}>
            <div className={`bg-black/60 backdrop-blur-xl border border-white/5 p-10 rounded-3xl h-full shadow-2xl relative overflow-hidden`}>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#45a29e]/10 rounded-full blur-3xl"></div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
                {t('zodiacReport.karmicLessonsTitle')}
              </h3>
              <p className="text-base font-serif leading-loose text-white/70 text-justify">
                {data.karmicLessons}
              </p>
            </div>
          </FadeInSection>
        </div>

        {/* Lucky Numbers & Colors */}
        <FadeInSection>
          <div className="flex flex-wrap justify-center gap-6">
            {data.luckyNumbers && (
              <div className={`${glassCard} px-10 py-6 text-center`}>
                <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Con số may mắn</span>
                <span className="text-2xl font-serif text-white">{data.luckyNumbers.join(' & ')}</span>
              </div>
            )}
            {data.luckyColors && (
              <div className={`${glassCard} px-10 py-6 text-center`}>
                <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Màu sắc thịnh vượng</span>
                <span className="text-xl font-serif text-white">{data.luckyColors.join(' - ')}</span>
              </div>
            )}
          </div>
        </FadeInSection>

        {/* Spiritual Practices */}
        {data.spiritualPractices && (
          <FadeInSection>
            <div className={`${glassCard} p-10 sm:p-14 text-center space-y-6 border border-white/20`}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                {t('zodiacReport.spiritualPracticesTitle')}
              </h3>
              <p className="text-lg sm:text-xl font-serif italic text-white/90">
                "{data.spiritualPractices}"
              </p>
            </div>
          </FadeInSection>
        )}

        {/* Crystals */}
        {data.crystals && data.crystals.length > 0 && (
          <FadeInSection>
            <div className="space-y-10">
              <div className="text-center">
                <h3 className="text-2xl font-serif text-white">{t('zodiacReport.crystalsTitle')}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {data.crystals.map((crystal, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`${glassCard} p-8 space-y-4 hover:border-white/30 transition-all duration-500 group`}
                  >
                    <div className="w-14 h-14 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                      💎
                    </div>
                    <h4 className="text-base font-serif text-white">{crystal.name}</h4>
                    <p className="text-xs font-sans text-white/60 leading-relaxed">{crystal.benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        {/* Affirmations */}
        {data.affirmations && data.affirmations.length > 0 && (
          <FadeInSection>
            <div className={`${glassCard} p-10 sm:p-16 space-y-12`}>
              <div className="text-center">
                <h3 className="text-2xl font-serif text-white">{t('zodiacReport.affirmationsTitle')}</h3>
              </div>
              <div className="space-y-8">
                {data.affirmations.map((affirmation, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                    className="flex items-center gap-8 bg-white/5 p-6 rounded-2xl border border-white/5"
                  >
                    <span className="text-white/20 font-serif text-4xl leading-none italic shrink-0">0{idx + 1}</span>
                    <p className="text-base sm:text-xl font-serif italic text-white/90 leading-relaxed">
                      "{affirmation}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from './DatePicker';
import Footer from './Footer';
import { useText } from '../utils/textDb';

const FALLBACK_QUOTE = {
  text: "Bình yên không nằm ở thế giới bên ngoài, mà hiện diện tĩnh lặng sâu thẳm bên trong bạn.",
  author: "Ngạn ngữ"
};

function useDailyQuote(fallbackQuote) {
  const [quote, setQuote] = useState(fallbackQuote);

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuote = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random');
        const res = await fetch(proxyUrl, { signal: controller.signal });
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        const parsed = JSON.parse(data.contents);
        if (parsed && parsed[0] && parsed[0].q) {
          setQuote({ text: parsed[0].q, author: parsed[0].a });
        } else {
          setQuote(fallbackQuote);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setQuote(fallbackQuote);
        }
      }
    };

    fetchQuote();
    return () => controller.abort();
  }, [fallbackQuote]);

  return quote;
}

export default function LandingView({ userData, handleInputChange, handleCalculate, onSelectTopic }) {
  const { t } = useText();
  const fallbackQuote = {
    text: t('landing.fallbackQuoteText'),
    author: t('landing.fallbackQuoteAuthor')
  };
  const quote = useDailyQuote(fallbackQuote);
  return (
    <div className="flex flex-col min-h-screen w-full bg-luxury-beige">
      {/* Hero Section */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center py-20 px-4">
        {/* Animated Orbs Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[15%] w-72 h-72 rounded-full bg-[#e8cdb2] blur-3xl opacity-40 mix-blend-multiply"
          />
          <motion.div 
            animate={{ 
              y: [0, 40, 0],
              x: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-[#d6c1a0] blur-3xl opacity-30 mix-blend-multiply"
          />
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              x: [0, -40, 0],
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[40%] left-[40%] w-80 h-80 rounded-full bg-[#b89e82] blur-3xl opacity-20 mix-blend-multiply"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-luxury-charcoal via-gray-700 to-luxury-charcoal mb-10 text-center leading-[1.15] tracking-tight drop-shadow-sm">
            {t('landing.heroTitle')}
          </h1>
          
          <div className="w-full bg-white/40 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-3xl z-20 relative border border-white/60">
            <form className="w-full space-y-7">
              <div className="flex flex-col space-y-2.5">
                <label htmlFor="name" className="text-[10px] font-semibold text-luxury-charcoal/70 uppercase tracking-[0.2em] ml-1">{t('landing.nameLabel')}</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  placeholder={t('landing.namePlaceholder')}
                  className="w-full px-5 py-4 bg-white/60 backdrop-blur-sm border border-white focus:outline-none focus:border-[#d6c1a0] focus:ring-4 focus:ring-[#d6c1a0]/20 transition-all font-sans text-sm text-luxury-charcoal rounded-xl shadow-inner placeholder-gray-400"
                  required
                />
              </div>

              <div className="flex flex-col space-y-2.5 relative z-40">
                <label htmlFor="dob" className="text-[10px] font-semibold text-luxury-charcoal/70 uppercase tracking-[0.2em] ml-1">{t('landing.dobLabel')}</label>
                <DatePicker 
                  value={userData.dob}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button 
                  type="button"
                  onClick={(e) => handleCalculate(e, 'numerology')}
                  className="flex-1 bg-gradient-to-r from-luxury-charcoal to-gray-800 text-luxury-alabaster hover:shadow-lg hover:-translate-y-0.5 py-4 px-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-300 rounded-xl shadow-md border border-gray-700"
                >
                  {t('landing.submitBtn')}
                </button>
                <button 
                  type="button"
                  onClick={(e) => handleCalculate(e, 'zodiac')}
                  className="flex-1 bg-white/60 backdrop-blur-md text-luxury-charcoal hover:bg-white border border-white py-4 px-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-300 rounded-xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-0.5"
                >
                  {t('landing.submitZodiacBtn')}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Info Section */}
      <div className="bg-luxury-alabaster py-24 px-6 border-t border-luxury-charcoal/5 z-10 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 cursor-pointer group"
            onClick={() => onSelectTopic('lifePath')}
          >
            <h3 className="text-2xl font-serif text-luxury-charcoal group-hover:text-black transition-colors relative inline-block">
              {t('landing.topics.lifePath.title')}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-charcoal transition-all group-hover:w-full"></span>
            </h3>
            <p className="text-luxury-charcoal/70 text-sm leading-relaxed group-hover:text-luxury-charcoal/90 transition-colors">
              {t('landing.topics.lifePath.description')}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 cursor-pointer group"
            onClick={() => onSelectTopic('destiny')}
          >
            <h3 className="text-2xl font-serif text-luxury-charcoal group-hover:text-black transition-colors relative inline-block">
              {t('landing.topics.destiny.title')}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-charcoal transition-all group-hover:w-full"></span>
            </h3>
            <p className="text-luxury-charcoal/70 text-sm leading-relaxed group-hover:text-luxury-charcoal/90 transition-colors">
              {t('landing.topics.destiny.description')}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 cursor-pointer group"
            onClick={() => onSelectTopic('elements')}
          >
            <h3 className="text-2xl font-serif text-luxury-charcoal group-hover:text-black transition-colors relative inline-block">
              {t('landing.topics.elements.title')}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-charcoal transition-all group-hover:w-full"></span>
            </h3>
            <p className="text-luxury-charcoal/70 text-sm leading-relaxed group-hover:text-luxury-charcoal/90 transition-colors">
              {t('landing.topics.elements.description')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Daily Quote Footer */}
      <div className="bg-luxury-beige border-t border-luxury-charcoal/5 py-12 px-6">
        <div className="max-w-xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {quote && (
              <motion.div
                key={quote.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="space-y-3"
              >
                <span className="block text-luxury-charcoal/20 font-serif text-4xl leading-none select-none">&ldquo;</span>
                <p className="text-sm sm:text-base font-serif italic text-luxury-charcoal/80 leading-relaxed">
                  {quote.text}
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-luxury-charcoal/60 font-sans font-semibold">
                  &mdash; {quote.author}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}

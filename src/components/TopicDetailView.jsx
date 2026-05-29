import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useText } from '../utils/textDb';
import { topicDetailsData } from '../constants/topicDetailsData';

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

export default function TopicDetailView({ topicId, handleClose }) {
  const { t } = useText();
  const data = topicDetailsData[topicId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#fdfcf0] text-luxury-charcoal font-sans selection:bg-luxury-charcoal selection:text-luxury-alabaster relative">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-[#fdfcf0]/80 backdrop-blur-xl border-b border-luxury-charcoal/5 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={handleClose}
          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-luxury-charcoal/5 hover:bg-luxury-charcoal/10 border border-luxury-charcoal/10 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm"
        >
          <span className="text-sm sm:text-base leading-none">←</span> {t('topicDetail.backBtn')}
        </button>
        <div className="font-serif text-sm tracking-widest uppercase cursor-pointer hover:opacity-70 transition-opacity" onClick={handleClose}>
          {t('common.brandName')}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div 
            animate={{ y: [0, -30, 0], scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[5%] w-[25rem] h-[25rem] bg-[#e8cdb2] rounded-full blur-[100px] opacity-40 mix-blend-multiply"
          />
          <motion.div 
            animate={{ y: [0, 30, 0], scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-60 right-[5%] w-[20rem] h-[20rem] bg-[#d6c1a0] rounded-full blur-[100px] opacity-30 mix-blend-multiply"
          />
        </div>

        {/* Hero Header */}
        <motion.div 
          initial={{ y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 space-y-6"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-white border border-luxury-charcoal/10 shadow-lg rounded-2xl flex items-center justify-center text-4xl sm:text-5xl mb-6">
            {data.icon}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-luxury-charcoal via-gray-700 to-luxury-charcoal leading-tight drop-shadow-sm py-2">
            {data.title}
          </h1>
          <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.3em] text-luxury-charcoal/50">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Content Block */}
        <motion.div 
          initial={{ y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full bg-white/60 backdrop-blur-2xl p-6 sm:p-12 md:p-16 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 relative text-base sm:text-lg leading-loose text-luxury-charcoal/80 text-justify font-serif"
        >
          {data.content}
        </motion.div>
        
        <div className="h-px w-24 bg-luxury-charcoal/20 mx-auto mt-24"></div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import { aboutData, termsOfUseData, privacyPolicyData, termsOfServiceData } from '../constants/staticPagesData';

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 30 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

const SectionBlock = ({ title, children }) => (
  <div className="mb-12">
    <h3 className="text-xl sm:text-2xl font-serif text-luxury-charcoal mb-6 pb-2 border-b border-luxury-charcoal/10 inline-block">
      {title}
    </h3>
    <div className="space-y-4 text-base sm:text-lg leading-loose text-luxury-charcoal/80 text-justify font-serif">
      {children}
    </div>
  </div>
);

const PageLayout = ({ data, handleClose }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { title, subtitle, icon, sections, footer } = data;

  return (
    <div className="min-h-screen bg-[#fdfcf0] flex flex-col font-sans text-luxury-charcoal selection:bg-luxury-charcoal selection:text-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-[#fdfcf0]/80 backdrop-blur-xl border-b border-luxury-charcoal/5 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={handleClose}
          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-luxury-charcoal/5 hover:bg-luxury-charcoal/10 border border-luxury-charcoal/10 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2"
        >
          <span className="text-sm sm:text-base leading-none">←</span> Trở Về
        </button>
        <div className="font-serif text-sm tracking-widest uppercase text-luxury-charcoal/80">QuietNumbers</div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div 
            animate={{ y: [0, -40, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-[10%] w-[30rem] h-[30rem] bg-[#e8cdb2] rounded-full blur-[100px] opacity-40 mix-blend-multiply"
          />
          <motion.div 
            animate={{ y: [0, 40, 0], scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-40 right-[10%] w-[25rem] h-[25rem] bg-[#d6c1a0] rounded-full blur-[100px] opacity-30 mix-blend-multiply"
          />
        </div>

        {/* Hero Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-white border border-luxury-charcoal/10 shadow-lg rounded-2xl flex items-center justify-center text-4xl sm:text-5xl mb-6">
            {icon}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-luxury-charcoal via-gray-700 to-luxury-charcoal leading-tight drop-shadow-sm py-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.3em] text-luxury-charcoal/50">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Content Card */}
        <motion.div 
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full bg-white/60 backdrop-blur-2xl p-6 sm:p-12 md:p-16 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 relative"
        >
          {sections.map((section, index) => (
            <FadeIn key={index}>
              <SectionBlock title={section.title}>
                {section.content}
              </SectionBlock>
            </FadeIn>
          ))}
          {footer && (
            <FadeIn>
              {footer}
            </FadeIn>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export const AboutView = ({ handleClose }) => <PageLayout data={aboutData} handleClose={handleClose} />;
export const TermsOfUseView = ({ handleClose }) => <PageLayout data={termsOfUseData} handleClose={handleClose} />;
export const PrivacyPolicyView = ({ handleClose }) => <PageLayout data={privacyPolicyData} handleClose={handleClose} />;
export const TermsOfServiceView = ({ handleClose }) => <PageLayout data={termsOfServiceData} handleClose={handleClose} />;

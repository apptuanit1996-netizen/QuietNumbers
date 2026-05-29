import { useState, useEffect } from 'react';
import LandingView from './components/LandingView';
import ReportView from './components/ReportView';
import { calculateLifePathNumber, calculateDestinyNumber, generateSynthesis } from './utils/numerologyMath';
import { calculateFiveElements } from './utils/baziMath';
import { numerologyData } from './constants/numerologyData';
import TopicDetailView from './components/TopicDetailView';
import PdfGeneratorView from './components/PdfGeneratorView';
import ZodiacReportView from './components/ZodiacReportView';
import { getZodiacSign, generateAstroNumSynergy } from './utils/zodiacMath';
import { zodiacData } from './constants/zodiacData';
import { AboutView, TermsOfUseView, PrivacyPolicyView, TermsOfServiceView } from './components/StaticPages';
import { useText } from './utils/textDb';

function App() {
  const { t } = useText();
  const [userData, setUserData] = useState({ name: '', dob: '' });
  // Steps: 0 = Input Form, 1 = Loading, 2 = Report
  const [appStep, setAppStep] = useState(0);
  const [reportType, setReportType] = useState('numerology');
  const [results, setResults] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Path-based routing for admin pages
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleCloseRoute = () => { 
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = (e, type = 'numerology') => {
    if (e) e.preventDefault();
    
    if (!userData.name || !userData.dob) {
      alert(t('app.validationAlert'));
      return;
    }

    // Move to Loading State
    setAppStep(1);
    setReportType(type);

    // Calculate Data immediately but don't show yet
    const lifePathNumber = calculateLifePathNumber(userData.dob);
    const destinyNumber = calculateDestinyNumber(userData.name);
    const elements = calculateFiveElements(userData.dob);
    
    // Fallback to 9 if number data is missing
    const analysisData = numerologyData[lifePathNumber] || numerologyData[9];
    const synthesis = generateSynthesis(lifePathNumber, destinyNumber);

    // Calculate Zodiac
    const signKey = getZodiacSign(userData.dob);
    const zodiacInfo = signKey ? zodiacData[signKey] : null;
    const zodiacSynergy = generateAstroNumSynergy(signKey, lifePathNumber);

    setResults({ lifePathNumber, destinyNumber, elements, analysisData, synthesis, zodiacInfo, zodiacSynergy });
  };

  // Handle the 2-second loading delay
  useEffect(() => {
    let timer;
    if (appStep === 1) {
      timer = setTimeout(() => {
        setAppStep(2);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [appStep]);

  const handleReset = () => {
    setAppStep(0);
    setUserData({ name: '', dob: '' });
    setResults(null);
  };

  if (route === '/pdfgen') return <PdfGeneratorView handleClose={handleCloseRoute} />;
  if (route === '/about') return <AboutView handleClose={handleCloseRoute} />;
  if (route === '/terms') return <TermsOfUseView handleClose={handleCloseRoute} />;
  if (route === '/privacy') return <PrivacyPolicyView handleClose={handleCloseRoute} />;
  if (route === '/tos') return <TermsOfServiceView handleClose={handleCloseRoute} />;

  return (
    <>
      {selectedTopic && (
        <TopicDetailView 
          topicId={selectedTopic} 
          handleClose={() => setSelectedTopic(null)} 
        />
      )}

      {!selectedTopic && appStep === 0 && (
        <LandingView 
          userData={userData} 
          handleInputChange={handleInputChange} 
          handleCalculate={handleCalculate} 
          onSelectTopic={setSelectedTopic}
        />
      )}

      {!selectedTopic && appStep === 1 && (
        <div className="min-h-screen bg-luxury-alabaster flex flex-col items-center justify-center p-6 text-luxury-charcoal font-sans">
          <div className="flex flex-col items-center space-y-6 animate-pulse">
            <div className="w-16 h-16 border-t-2 border-r-2 border-luxury-charcoal rounded-full animate-spin"></div>
            <p className="text-sm font-serif italic tracking-wider text-luxury-charcoal/60">
              {t('app.loadingText')}
            </p>
          </div>
        </div>
      )}

      {!selectedTopic && appStep === 2 && results && reportType === 'numerology' && (
        <ReportView 
          userData={userData} 
          results={results} 
          handleReset={handleReset} 
        />
      )}

      {!selectedTopic && appStep === 2 && results && reportType === 'zodiac' && (
        <ZodiacReportView 
          userData={userData} 
          results={results} 
          handleReset={handleReset} 
        />
      )}
    </>
  );
}

export default App;

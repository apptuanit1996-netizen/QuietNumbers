import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useText } from '../utils/textDb';

const DatePicker = ({ value, onChange }) => {
  const { t } = useText();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse initial value (dd-mm-yyyy)
  const parseDate = (str) => {
    if (!str) return new Date(1990, 0, 1); // Default to a reasonable year
    const parts = str.split('-');
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return new Date(1990, 0, 1);
  };

  const [currentDate, setCurrentDate] = useState(parseDate(value));

  // Sync state if value changes from outside
  useEffect(() => {
    if (value) {
        setCurrentDate(parseDate(value));
    }
  }, [value]);

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = t('datePicker.months');

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const startDay = (year, month) => new Date(year, month, 1).getDay();

  const handleSelect = (day) => {
    const formattedDate = `${String(day).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
    // Simulate event object for handleInputChange
    onChange({
      target: {
        name: 'dob',
        value: formattedDate
      }
    });
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const start = startDay(year, month);

    const blanksStandard = Array.from({ length: start }, (_, i) => i);
    const dayNodes = Array.from({ length: days }, (_, i) => i + 1);

    return (
      <div className="absolute top-full left-0 mt-2 bg-white border border-luxury-charcoal/10 rounded-sm shadow-[0_10px_40px_rgb(0,0,0,0.08)] p-5 z-50 w-72">
        <div className="flex justify-between items-center mb-4 space-x-2">
          <select 
            className="w-1/2 p-2 bg-luxury-beige border border-luxury-charcoal/5 rounded-sm focus:outline-none focus:border-luxury-charcoal/30 text-sm font-serif cursor-pointer text-center outline-none"
            value={month}
            onChange={(e) => setCurrentDate(new Date(year, parseInt(e.target.value), 1))}
          >
            {months.map((m, idx) => (
              <option key={idx} value={idx}>{m}</option>
            ))}
          </select>
          <select 
            className="w-1/2 p-2 bg-luxury-beige border border-luxury-charcoal/5 rounded-sm focus:outline-none focus:border-luxury-charcoal/30 text-sm font-serif cursor-pointer text-center outline-none"
            value={year}
            onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), month, 1))}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {t('datePicker.days').map(d => (
            <div key={d} className="text-center text-[10px] font-semibold text-luxury-charcoal/40 uppercase tracking-wider py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {blanksStandard.map(b => (
            <div key={`blank-${b}`} className="p-2" />
          ))}
          {dayNodes.map(d => {
            const isSelected = value && value === `${String(d).padStart(2, '0')}-${String(month + 1).padStart(2, '0')}-${year}`;
            return (
              <div 
                key={d} 
                onClick={() => handleSelect(d)}
                className={`text-center py-2 text-sm cursor-pointer rounded-sm transition-all duration-200
                  ${isSelected ? 'bg-luxury-charcoal text-luxury-alabaster font-semibold shadow-md scale-105' : 'text-luxury-charcoal hover:bg-luxury-beige hover:text-black'}
                `}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="w-full px-5 py-4 bg-white/60 backdrop-blur-sm border border-white hover:border-[#d6c1a0] transition-all font-sans text-sm text-luxury-charcoal rounded-xl shadow-inner cursor-pointer flex justify-between items-center">
        <span className={value ? 'text-luxury-charcoal' : 'text-gray-400'}>
          {value || t('datePicker.placeholder')}
        </span>
        <svg className="w-4 h-4 text-luxury-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 left-0" 
          >
            {renderCalendar()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;

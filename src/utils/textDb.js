import { useState, useEffect } from 'react';
import defaultUiText from '../constants/uiText.json';

const STORAGE_KEY = 'quiet_numbers_ui_text';

// Initialize localStorage on module load
const getStoredDb = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUiText));
      return defaultUiText;
    }
    // Deep merge to ensure any newly added keys in JSON are present even if user has older localStorage
    const parsed = JSON.parse(stored);
    const merged = deepMerge(defaultUiText, parsed);
    return merged;
  } catch (e) {
    console.error('Failed to parse text DB from localStorage', e);
    return defaultUiText;
  }
};

// Simple deep helper to merge localStorage state with default values
const deepMerge = (target, source) => {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
};

let globalDb = getStoredDb();

// Helper to get nested value by dot notation path
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined;
  }, obj);
};

// Helper to set nested value by dot notation path
const setNestedValue = (obj, path, value) => {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (current[part] === undefined) {
      current[part] = {};
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
};

// Update a specific path in local DB
export const updateUiText = (path, value) => {
  globalDb = { ...globalDb };
  setNestedValue(globalDb, path, value);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globalDb));
    // Dispatch a custom event to notify all useText hooks
    window.dispatchEvent(new CustomEvent('ui-text-change', { detail: { path, value } }));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
};

// Expose on window for easy console debugging and updates
if (typeof window !== 'undefined') {
  window.updateUiText = updateUiText;
  window.getUiTextDb = () => globalDb;
  window.resetUiTextDb = () => {
    localStorage.removeItem(STORAGE_KEY);
    globalDb = getStoredDb();
    window.dispatchEvent(new CustomEvent('ui-text-change'));
  };
}

export const useText = () => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setTick(t => t + 1);
    };
    window.addEventListener('ui-text-change', handleUpdate);
    return () => window.removeEventListener('ui-text-change', handleUpdate);
  }, []);

  const t = (path, fallback = '') => {
    const val = getNestedValue(globalDb, path);
    if (val !== undefined) return val;
    // Fallback to initial JSON file just in case
    const jsonVal = getNestedValue(defaultUiText, path);
    return jsonVal !== undefined ? jsonVal : fallback || path;
  };

  return { t, updateText: updateUiText };
};

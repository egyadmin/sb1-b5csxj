import { create } from 'zustand';

interface LanguageState {
  language: 'ar' | 'en';
  setLanguage: (language: 'ar' | 'en') => void;
  isRTL: boolean;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'ar',
  isRTL: true,
  setLanguage: (language) => set({ 
    language,
    isRTL: language === 'ar'
  }),
}));
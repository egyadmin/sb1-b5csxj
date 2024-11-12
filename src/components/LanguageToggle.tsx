import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

interface LanguageToggleProps {
  collapsed?: boolean;
}

export default function LanguageToggle({ collapsed }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguageStore();
  
  return (
    <button
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="flex items-center gap-2 w-full p-3 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
    >
      <Languages className="h-5 w-5" />
      {!collapsed && (
        <span>{language === 'ar' ? 'English' : 'العربية'}</span>
      )}
    </button>
  );
}
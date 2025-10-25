import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Button } from '@/components/ui/button';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="w-16"
    >
      {language === 'ar' ? 'Français' : 'العربية'}
    </Button>
  );
};

export default LanguageToggle;
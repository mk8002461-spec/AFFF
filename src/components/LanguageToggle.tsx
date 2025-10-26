import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
  ];

  const currentLangName = languages.find(lang => lang.code === language)?.name || 'Language';

  return (
    <DropdownMenu dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-28 justify-between">
          <Globe className="h-4 w-4" />
          {currentLangName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={language === 'ar' ? 'start' : 'end'}>
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code} 
            onClick={() => setLanguage(lang.code as 'ar' | 'fr' | 'en')}
            className={language === lang.code ? 'bg-accent font-semibold' : ''}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
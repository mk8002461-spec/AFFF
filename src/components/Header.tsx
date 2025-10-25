import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import LanguageToggle from './LanguageToggle';
import { Home, LayoutDashboard, BarChart3, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = {
  ar: [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'لوحة التحكم', path: '/dashboard', icon: LayoutDashboard },
    { name: 'الإحصائيات', path: '/stats', icon: BarChart3 },
    { name: 'التسجيل', path: '/register', icon: UserPlus },
  ],
  fr: [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Tableau de Bord', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Statistiques', path: '/stats', icon: BarChart3 },
    { name: 'Inscription', path: '/register', icon: UserPlus },
  ],
};

const Header: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const items = navItems[language];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      isRTL ? 'font-arabic' : 'font-sans'
    )}>
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        {/* Logo/Title */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="inline-block font-bold text-lg text-primary">
            {language === 'ar' ? 'مسوّقات المغرب' : 'Marketeuses Maroc'}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4" dir={isRTL ? 'rtl' : 'ltr'}>
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <LanguageToggle />
          {/* Mobile Menu Placeholder (Sheet/Drawer implementation would go here) */}
        </div>
      </div>
    </header>
  );
};

export default Header;
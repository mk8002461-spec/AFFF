import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import LanguageToggle from './LanguageToggle';
import { Home, LayoutDashboard, BarChart3, UserPlus, LogOut, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = {
  ar: [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'لوحة التحكم', path: '/dashboard', icon: LayoutDashboard },
    { name: 'الإحصائيات', path: '/stats', icon: BarChart3 },
  ],
  fr: [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Tableau de Bord', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Statistiques', path: '/stats', icon: BarChart3 },
  ],
};

const Header: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const { user, signOut } = useAuth();
  const items = navItems[language];

  const authButtonContent = user ? {
    name: language === 'ar' ? 'تسجيل الخروج' : 'Déconnexion',
    icon: LogOut,
    action: signOut,
    variant: 'destructive' as const,
  } : {
    name: language === 'ar' ? 'تسجيل الدخول' : 'Connexion',
    icon: LogIn,
    path: '/auth',
    variant: 'default' as const,
  };

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
          
          {/* Auth/Logout Button in Nav */}
          {user ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={authButtonContent.action}
              className="text-sm font-medium transition-colors hover:text-destructive flex items-center gap-1"
            >
              <authButtonContent.icon className="h-4 w-4" />
              {authButtonContent.name}
            </Button>
          ) : (
            <Link
              to={authButtonContent.path!}
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
            >
              <authButtonContent.icon className="h-4 w-4" />
              {authButtonContent.name}
            </Link>
          )}
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
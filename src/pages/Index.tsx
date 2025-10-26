import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index: React.FC = () => {
  const { language, isRTL } = useLanguage();

  const content = {
    ar: {
      title: "منصة تسويق بالعمولة للمسوّقات المغربيات",
      subtitle: "انضمي إلى شبكة النجاح. تتبعي طلباتك، وحققي أرباحك بكل سهولة وأناقة مغربية.",
      cta: "ابدئي رحلتك الآن",
      featuresTitle: "لماذا تختارين مسوّقات المغرب؟",
      features: [
        { icon: CheckCircle, text: "شفافية كاملة: تتبع دقيق للطلبيات الموصّلة والمرتجعة." },
        { icon: Zap, text: "أداء متفوق: إحصائيات فورية لمساعدتك على تحسين أدائك." },
        { icon: Heart, text: "مجتمع داعم: انضمي إلى نخبة المسوّقات المغربيات." },
      ],
      designNote: "تصميم أنيق وبسيط، مستوحى من الألوان المحايدة ولمسة عصرية مغربية.",
      techNote: "*ملاحظة تقنية: سيتم استخدام Google Sheets لتخزين بيانات المسوّقات والطلبات، مما يضمن سهولة الإدارة والوصول عبر واجهات برمجة تطبيقات Google AI (مثل Vertex AI) لتحليل الإحصائيات وعرضها هنا.",
    },
    fr: {
      title: "Plateforme d'Affiliation pour les Marketeuses Marocaines",
      subtitle: "Rejoignez le réseau du succès. Suivez vos commandes et réalisez vos bénéfices avec facilité et élégance marocaine.",
      cta: "Commencez votre voyage maintenant",
      featuresTitle: "Pourquoi choisir Marketeuses Maroc ?",
      features: [
        { icon: CheckCircle, text: "Transparence totale : Suivi précis des commandes livrées et retournées." },
        { icon: Zap, text: "Performance supérieure : Statistiques instantanées pour optimiser vos résultats." },
        { icon: Heart, text: "Communauté de soutien : Rejoignez l'élite des marketeuses marocaines." },
      ],
      designNote: "Design élégant et simple, inspiré des couleurs neutres avec une touche marocaine moderne.",
      techNote: "*Note technique : Google Sheets sera utilisé pour stocker les données des marketeuses et des commandes, assurant une gestion facile et l'accès via les API Google AI (comme Vertex AI) pour analyser et afficher les statistiques ici.",
    },
    en: {
      title: "Affiliate Marketing Platform for Moroccan Marketers",
      subtitle: "Join the network of success. Track your orders and realize your profits with ease and Moroccan elegance.",
      cta: "Start Your Journey Now",
      featuresTitle: "Why Choose Moroccan Marketers?",
      features: [
        { icon: CheckCircle, text: "Full Transparency: Accurate tracking of delivered and returned orders." },
        { icon: Zap, text: "Superior Performance: Instant statistics to help you optimize your results." },
        { icon: Heart, text: "Supportive Community: Join the elite of Moroccan marketers." },
      ],
      designNote: "Elegant and simple design, inspired by neutral colors with a modern Moroccan touch.",
      techNote: "*Technical Note: Google Sheets will be used to store marketer and order data, ensuring easy management and access via Google AI APIs (like Vertex AI) to analyze and display statistics here.",
    },
  };

  const currentContent = content[language as 'ar' | 'fr' | 'en'];

  return (
    <div className={cn("min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center p-4", isRTL ? 'text-right' : 'text-left')} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto py-16 md:py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-primary">
          {currentContent.title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          {currentContent.subtitle}
        </p>
        <Link to="/register">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-10 py-6 shadow-lg">
            {currentContent.cta}
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl py-12">
        <h2 className="text-3xl font-bold mb-10 text-center text-primary">
          {currentContent.featuresTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentContent.features.map((feature, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-md bg-card transition-transform hover:scale-[1.02]">
              <feature.icon className="h-8 w-8 text-amber-600 mb-4 mx-auto md:mx-0" />
              <p className="text-lg font-semibold text-foreground">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Google Integration Note */}
      <section className="mt-12 p-4 bg-secondary/50 rounded-lg max-w-4xl mx-auto">
        <p className="text-sm text-muted-foreground">
          {currentContent.techNote}
        </p>
      </section>
    </div>
  );
};

export default Index;
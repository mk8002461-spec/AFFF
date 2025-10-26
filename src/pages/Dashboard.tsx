import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, XCircle } from 'lucide-react';

interface MarketerData {
  id: number;
  fullName: string;
  deliveredOrders: number;
  returnedOrders: number;
}

// بيانات وهمية (تحاكي البيانات المسحوبة من Google Sheets)
const mockMarketers: MarketerData[] = [
  { id: 1, fullName: "فاطمة الزهراء", deliveredOrders: 150, returnedOrders: 12 },
  { id: 2, fullName: "خديجة العلوي", deliveredOrders: 95, returnedOrders: 5 },
  { id: 3, fullName: "مريم بناني", deliveredOrders: 210, returnedOrders: 30 },
  { id: 4, fullName: "سناء القادري", deliveredOrders: 45, returnedOrders: 3 },
];

const Dashboard: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const content = {
    ar: {
      title: "لوحة تحكم المسوّقة",
      subtitle: "مرحباً بك! تتبعي أداءك وطلباتك الموصّلة والمرتجعة.",
      searchPlaceholder: "ابحثي بالاسم أو عدد الطلبات...",
      delivered: "طلبيات موصّلة",
      returned: "طلبيات مرتجعة",
      name: "الاسم الكامل",
      noResults: "لا توجد نتائج مطابقة.",
    },
    fr: {
      title: "Tableau de Bord de la Marketeuse",
      subtitle: "Bienvenue ! Suivez vos performances, commandes livrées et retournées.",
      searchPlaceholder: "Rechercher par nom ou nombre de commandes...",
      delivered: "Commandes Livrées",
      returned: "Commandes Retournées",
      name: "Nom Complet",
      noResults: "Aucun résultat correspondant.",
    },
    en: {
      title: "Marketer Dashboard",
      subtitle: "Welcome! Track your performance, delivered, and returned orders.",
      searchPlaceholder: "Search by name or order count...",
      delivered: "Delivered Orders",
      returned: "Returned Orders",
      name: "Full Name",
      noResults: "No matching results found.",
    },
  };

  const currentContent = content[language as 'ar' | 'fr' | 'en'];

  const filteredMarketers = useMemo(() => {
    if (!searchTerm) {
      // في التطبيق الحقيقي، ستعرض بيانات المسوّقة المسجلة دخولها فقط.
      return mockMarketers; 
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    return mockMarketers.filter(marketer => 
      marketer.fullName.toLowerCase().includes(lowerCaseSearch) ||
      marketer.deliveredOrders.toString().includes(lowerCaseSearch) ||
      marketer.returnedOrders.toString().includes(lowerCaseSearch)
    );
  }, [searchTerm]);

  return (
    <div className={cn("container py-12", isRTL ? 'text-right' : 'text-left')} dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-4xl font-bold mb-2 text-primary">{currentContent.title}</h1>
      <p className="text-lg text-muted-foreground mb-8">{currentContent.subtitle}</p>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-lg">
        <Search className={cn("absolute h-4 w-4 text-muted-foreground", isRTL ? 'right-3 top-1/2 transform -translate-y-1/2' : 'left-3 top-1/2 transform -translate-y-1/2')} />
        <Input
          placeholder={currentContent.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn("w-full pl-10 pr-4", isRTL ? 'text-right pr-10 pl-4' : 'text-left')}
        />
      </div>

      {/* Marketer List/Profile Display */}
      <div className="space-y-6">
        {filteredMarketers.length > 0 ? (
          filteredMarketers.map((marketer) => (
            <Card key={marketer.id} className="shadow-lg border-l-4 border-amber-600">
              <CardHeader>
                <CardTitle className="text-2xl">{currentContent.name}: {marketer.fullName}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="flex items-center space-x-2 p-3 bg-green-50/50 rounded-md" dir="ltr">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-sm text-muted-foreground">{currentContent.delivered}</p>
                    <p className="text-xl font-bold text-green-700">{marketer.deliveredOrders}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-red-50/50 rounded-md" dir="ltr">
                  <XCircle className="h-6 w-6 text-red-600" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-sm text-muted-foreground">{currentContent.returned}</p>
                    <p className="text-xl font-bold text-red-700">{marketer.returnedOrders}</p>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-lg text-muted-foreground">{currentContent.noResults}</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { cn } from '@/lib/utils';
import StatsCard from '@/components/StatsCard';
import { Package, TrendingUp, Trophy, User } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// بيانات وهمية (تحاكي البيانات المجمعة من Google Sheets/AI analysis)
const totalOrders = 1540;
const successRate = 88.5; // Percentage of delivered orders
const topMarketers = [
  { rank: 1, name: "مريم بناني", delivered: 210, success: 90.5 },
  { rank: 2, name: "فاطمة الزهراء", delivered: 150, success: 92.0 },
  { rank: 3, name: "خديجة العلوي", delivered: 95, success: 95.2 },
];

const Stats: React.FC = () => {
  const { language, isRTL } = useLanguage();

  const content = {
    ar: {
      title: "الإحصائيات العامة للمنصة",
      subtitle: "نظرة عامة على أداء شبكة المسوّقات لدينا.",
      totalOrders: "إجمالي الطلبات",
      successRate: "نسبة النجاح (التوصيل)",
      topMarketersTitle: "أفضل المسوّقات",
      table: {
        rank: "الترتيب",
        name: "الاسم",
        delivered: "طلبيات موصّلة",
        success: "نسبة النجاح",
      },
    },
    fr: {
      title: "Statistiques Générales de la Plateforme",
      subtitle: "Aperçu des performances de notre réseau de marketeuses.",
      totalOrders: "Total des Commandes",
      successRate: "Taux de Succès (Livraison)",
      topMarketersTitle: "Meilleures Marketeuses",
      table: {
        rank: "Rang",
        name: "Nom",
        delivered: "Commandes Livrées",
        success: "Taux de Succès",
      },
    },
  };

  const currentContent = content[language];

  return (
    <div className={cn("container py-12", isRTL ? 'text-right' : 'text-left')} dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-4xl font-bold mb-2 text-primary">{currentContent.title}</h1>
      <p className="text-lg text-muted-foreground mb-8">{currentContent.subtitle}</p>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3 mb-10">
        <StatsCard 
          title={currentContent.totalOrders} 
          value={totalOrders.toLocaleString(language)} 
          icon={Package} 
          colorClass="text-amber-600"
        />
        <StatsCard 
          title={currentContent.successRate} 
          value={`${successRate.toFixed(1)}%`} 
          icon={TrendingUp} 
          colorClass="text-green-600"
        />
        <StatsCard 
          title={currentContent.topMarketersTitle} 
          value={topMarketers[0].name} 
          icon={Trophy} 
          colorClass="text-yellow-500"
        />
      </div>

      {/* Top Marketers Table */}
      <h2 className="text-3xl font-bold mb-6 text-primary">{currentContent.topMarketersTitle}</h2>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">{currentContent.table.rank}</TableHead>
              <TableHead>{currentContent.table.name}</TableHead>
              <TableHead className="text-center">{currentContent.table.delivered}</TableHead>
              <TableHead className="text-center">{currentContent.table.success}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topMarketers.map((marketer) => (
              <TableRow key={marketer.rank}>
                <TableCell className="font-medium">{marketer.rank}</TableCell>
                <TableCell className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {marketer.name}
                </TableCell>
                <TableCell className="text-center font-semibold text-green-700">{marketer.delivered}</TableCell>
                <TableCell className="text-center">{marketer.success.toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Stats;
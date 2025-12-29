import { Store, Zap, BarChart3, ShieldCheck } from 'lucide-react';
import { KpiCard } from '../components/KpiCard';

export const DashboardView = ({ orgData, agencies, t }: { orgData: any, agencies: any[], t: any }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Grille de KPIs avec VRAIES DONNÉES du Swagger et Traductions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          label={t.kpi.agencies} 
          value={agencies?.length || 0} 
          growth="+2" 
          icon={<Store size={20} />} 
        />
        
        <KpiCard 
          label={t.kpi.rentals} 
          value={orgData?.totalRentals || 0} 
          growth="+12%" 
          icon={<Zap size={20} />} 
        />
        
        <KpiCard 
          label={t.kpi.revenue} 
          value={`${orgData?.monthlyRevenue?.toLocaleString() || 0} XAF`} 
          growth="+8.4%" 
          icon={<BarChart3 size={20} />} 
        />
        
        <KpiCard 
          label={t.kpi.systemAlerts} 
          value={orgData?.isVerified ? "0" : "1"} 
          badge={!orgData?.isVerified ? t.kpi.verificationRequired : undefined}
          highlight={!orgData?.isVerified}
          icon={<ShieldCheck size={20} />} 
        />
      </div>

      {/* Reste du Dashboard (Graphiques, etc. peuvent être ajoutés ici avec t.charts.*) */}
    </div>
  );
};
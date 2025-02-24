import React from 'react';
import { Users, Activity, UserPlus } from 'lucide-react';
import { MetricCard } from '../shared/MetricCard';

export const MembersOverviewMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <MetricCard 
        title="Total Members"
        value="1,256"
        change="+8"
        description="Total registered members in the platform"
        icon={Users}
        trend="up"
      />
      <MetricCard 
        title="Active Members"
        value="892"
        change="+5"
        description="Members who engaged in investment activities last month"
        icon={Activity}
        trend="up"
      />
      <MetricCard 
        title="New Members"
        value="124"
        change="+15"
        description="Recently joined members in the last month"
        icon={UserPlus}
        trend="up"
      />
    </div>
  );
};
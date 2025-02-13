import React from 'react';
import { Activity, Users, Star } from 'lucide-react';
import { MetricCard } from './MetricCard';

export const EngagementOverviewMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <MetricCard 
        title="Total Member Engagements"
        value="4,523"
        change="+9"
        description="Total engagement actions performed by members"
        icon={Activity}
        trend="up"
      />
      <MetricCard 
        title="Average Engagement Per Member"
        value="5.3"
        change="+4"
        description="Average interactions per active member"
        icon={Users}
        trend="up"
      />
      <MetricCard 
        title="Most Active Member"
        value="James Walker"
        change="+32"
        description="Highest engagement recorded last month"
        icon={Star}
        trend="up"
      />
    </div>
  );
};
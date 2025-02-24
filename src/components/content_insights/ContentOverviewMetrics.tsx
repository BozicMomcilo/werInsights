import React from 'react';
import { FileText, PlayCircle, Star } from 'lucide-react';
import { MetricCard } from '../shared/MetricCard';

//TODO: Connect with real data about content

export const ContentOverviewMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <MetricCard 
        title="Total Content"
        value="235"
        change="+12"
        description="Total number of investment-related articles published"
        icon={FileText}
        trend="up"
      />
      <MetricCard 
        title="Total Live Content"
        value="18,756"
        change="+7"
        description="Total number of views across video content"
        icon={PlayCircle}
        trend="up"
      />
      <MetricCard 
        title="Content Read Rate"
        value="Market Trends Report 2024"
        change="+25"
        description="Most viewed content piece in the last month"
        icon={Star}
        trend="up"
      />
    </div>
  );
};
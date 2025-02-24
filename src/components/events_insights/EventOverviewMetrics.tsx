import React from 'react';
import { Calendar, Users, CheckCircle,} from 'lucide-react';
import { MetricCard } from '../shared/MetricCard';

//TODO: Connect with real data about events

export const EventOverviewMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <MetricCard 
        title="Total Events"
        value="152"
        change="+15%"
        description="Total number of events hosted on the platform"
        icon={Calendar}
        trend="up"
      />
      <MetricCard 
        title="Total Live Events"
        value="78%"
        change="+5%"
        description="Average audience participation rate across all events"
        icon={Users}
        trend="up"
      />
      <MetricCard 
        title="Total Upcoming Events"
        value="62%"
        change="-2%"
        description="Percentage of attendees engaging in post-event actions"
        icon={CheckCircle}
        trend="down"
      />
    </div>
  );
};
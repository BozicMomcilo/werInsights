import React from 'react';
import { Calendar, Users, CheckCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MetricCard = ({ title, value, change, description, icon: Icon, trend }) => (
  <div className="glass-panel p-6 transition-all duration-300 hover:scale-105 group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-[#B0B3BA] text-sm font-medium mb-2">{title}</h3>
        <div className="text-3xl font-semibold text-[#FFE8AC] mb-2">{value}</div>
        <div className="text-sm text-[#B0B3BA]">{description}</div>
      </div>
      <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center group-hover:shadow-glow">
        <Icon className="w-5 h-5 text-[#FFE8AC]" />
      </div>
    </div>
    <div className="flex items-center text-sm">
      <span className={`font-medium flex items-center gap-1 ${trend === 'up' ? 'text-[#28E0B9]' : 'text-[#FF3B3B]'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {change}
      </span>
      <span className="text-[#B0B3BA] ml-2">Since last period</span>
    </div>
  </div>
);

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
        title="Average Event Engagement"
        value="78%"
        change="+5%"
        description="Average audience participation rate across all events"
        icon={Users}
        trend="up"
      />
      <MetricCard 
        title="Average Follow-Up Rate"
        value="62%"
        change="-2%"
        description="Percentage of attendees engaging in post-event actions"
        icon={CheckCircle}
        trend="down"
      />
    </div>
  );
};
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MetricCard = ({ title, value, change, trend }: { title: string, value: string, change: string, trend: 'up' | 'down' }) => {
  const TrendIcon = trend === 'up' ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend === 'up' ? 'text-[#28E0B9]' : 'text-[#FF3B3B]';
  
  return (
    <div className="metric-card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-[#B0B3BA] text-sm font-medium mb-2">{title}</h3>
          <div className="metric-value">{value}</div>
        </div>
        <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
          <TrendIcon className={`w-5 h-5 ${trendColor}`} />
        </div>
      </div>
      <div className="flex items-center text-sm">
        <span className={`font-medium ${trendColor}`}>
          {trend === 'up' ? '↑' : '↓'} {change}%
        </span>
        <span className="text-[#B0B3BA] ml-2">Since last month</span>
      </div>
    </div>
  );
};

export const KeyMetrics: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-6">
        <MetricCard 
          title="Total Deals" 
          value="1,200" 
          change="10"
          trend="down"
        />
        <MetricCard 
          title="Total Events" 
          value="150" 
          change="5"
          trend="up"
        />
        <MetricCard 
          title="Total Engagements" 
          value="25,000" 
          change="15"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <MetricCard 
          title="Active Members" 
          value="3,400" 
          change="8"
          trend="up"
        />
        <MetricCard 
          title="Avg. Content Read Rate" 
          value="75%" 
          change="5"
          trend="up"
        />
      </div>
    </div>
  );
};
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MetricCard = ({ title, value, change, sparkline }) => (
  <div className="metric-card">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-[#B0B3BA] text-sm font-medium mb-2">{title}</h3>
        <div className="metric-value">{value}</div>
      </div>
      <div className="w-24 h-12">
        <svg className="w-full h-full">
          <path d={sparkline} className="sparkline" />
        </svg>
      </div>
    </div>
    <div className="flex items-center text-sm">
      <span className="text-[#FFE8AC] font-medium">↑ {change}%</span>
      <span className="text-[#B0B3BA] ml-2">Since last week</span>
    </div>
  </div>
);

export const KeyMetrics: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-6">
        <MetricCard 
          title="Total Investment Volume" 
          value="215M" 
          change="37.7"
          sparkline="M0,40 C20,35 40,45 60,30 S80,45 100,35" 
        />
        <MetricCard 
          title="Total ROI Achieved" 
          value="11" 
          change="32.7"
          sparkline="M0,35 C20,45 40,30 60,50 S80,25 100,40" 
        />
        <MetricCard 
          title="Active Investors" 
          value="847" 
          change="12.3"
          sparkline="M0,45 C20,40 40,35 60,45 S80,30 100,35" 
        />
      </div>

      {/* Performance Overview */}
      <div className="glass-panel p-6">
        <h2 className="section-title mb-6">Performance Overview</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 glass-panel">
              <div>
                <div className="text-sm text-[#B0B3BA] mb-1">Portfolio Growth</div>
                <div className="text-2xl font-medium text-[#FFE8AC]">+24.8%</div>
              </div>
              <ArrowUpRight className="w-6 h-6 text-[#28E0B9]" />
            </div>
            <div className="flex justify-between items-center p-4 glass-panel">
              <div>
                <div className="text-sm text-[#B0B3BA] mb-1">Investor Satisfaction</div>
                <div className="text-2xl font-medium text-[#FFE8AC]">92%</div>
              </div>
              <ArrowUpRight className="w-6 h-6 text-[#28E0B9]" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 glass-panel">
              <div>
                <div className="text-sm text-[#B0B3BA] mb-1">Risk Assessment</div>
                <div className="text-2xl font-medium text-[#FFE8AC]">Low</div>
              </div>
              <ArrowDownRight className="w-6 h-6 text-[#72A0D6]" />
            </div>
            <div className="flex justify-between items-center p-4 glass-panel">
              <div>
                <div className="text-sm text-[#B0B3BA] mb-1">Market Position</div>
                <div className="text-2xl font-medium text-[#FFE8AC]">Strong</div>
              </div>
              <ArrowUpRight className="w-6 h-6 text-[#28E0B9]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
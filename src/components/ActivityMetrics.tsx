import React, { useState, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Clock, Users, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

// Sample data - replace with real data
const generateData = (days: number) => {
  const data = [];
  const features = ['Feed Explore', 'Search Explore', 'Deal Room'];
  const baseValues = { 'Feed Explore': 150, 'Search Explore': 120, 'Deal Room': 90 };
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const dayData: any = {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
    
    features.forEach(feature => {
      const baseValue = baseValues[feature];
      const randomVariation = Math.random() * 40 - 20; // Random variation between -20 and +20
      dayData[feature] = Math.max(0, Math.round(baseValue + randomVariation));
      dayData[`${feature} HNWI`] = Math.round(dayData[feature] * 0.6);
      dayData[`${feature} Institutional`] = Math.round(dayData[feature] * 0.4);
    });
    
    data.push(dayData);
  }
  
  return data;
};

interface FilterState {
  period: string;
  segment: string;
  features: string[];
}

const COLORS = {
  'Feed Explore': '#72A0D6',
  'Search Explore': '#FFE8AC',
  'Deal Room': '#9FB8D9'
};

export const ActivityMetrics: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    period: '7D',
    segment: 'All',
    features: ['Feed Explore', 'Search Explore', 'Deal Room']
  });
  
  const [data, setData] = useState(() => generateData(7));
  
  const handlePeriodChange = (period: string) => {
    setFilters(prev => ({ ...prev, period }));
    const days = period === '7D' ? 7 : period === '30D' ? 30 : 90;
    setData(generateData(days));
  };
  
  const handleExport = useCallback(async () => {
    const element = document.getElementById('engagement-chart');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'engagement-metrics.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  }, []);

  const getTopFeature = () => {
    const totals = {};
    data.forEach(day => {
      filters.features.forEach(feature => {
        totals[feature] = (totals[feature] || 0) + day[feature];
      });
    });
    return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
  };

  const getAverageClicks = () => {
    let total = 0;
    let count = 0;
    data.forEach(day => {
      filters.features.forEach(feature => {
        total += day[feature];
        count++;
      });
    });
    return Math.round(total / count);
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="section-title">Activity & Engagement: Deal Interaction Metrics</h2>
        <div className="flex flex-wrap gap-2">
          {/* Time Period Filter */}
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <select
              value={filters.period}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="7D">Last 7 Days</option>
              <option value="30D">Last 30 Days</option>
              <option value="90D">Last 90 Days</option>
            </select>
          </div>
          
          {/* Investor Segment Filter */}
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <select
              value={filters.segment}
              onChange={(e) => setFilters(prev => ({ ...prev, segment: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="All">All Investors</option>
              <option value="HNWI">HNWI</option>
              <option value="Institutional">Institutional</option>
            </select>
          </div>
          
          {/* Export Button */}
          <button
            onClick={handleExport}
            className="glass-panel px-4 py-2 flex items-center space-x-2 button-hover"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="glass-panel px-4 py-2">
          <span className="text-[#B0B3BA]">Average Interactions:</span>
          <span className="ml-2 text-[#FFE8AC] font-medium">{getAverageClicks()}</span>
        </div>
        <div className="glass-panel px-4 py-2">
          <span className="text-[#B0B3BA]">Most Active Feature:</span>
          <span className="ml-2 text-[#FFE8AC] font-medium">{getTopFeature()}</span>
        </div>
      </div>

      {/* Chart */}
      <div id="engagement-chart" className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="date"
              stroke="#B0B3BA"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#B0B3BA"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A101A',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              labelStyle={{ color: '#EAEAEA' }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px'
              }}
            />
            {filters.features.map((feature) => (
              <Bar
                key={feature}
                dataKey={filters.segment === 'All' ? feature : `${feature} ${filters.segment}`}
                fill={COLORS[feature]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-xs text-[#B0B3BA] mt-4 text-right">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};
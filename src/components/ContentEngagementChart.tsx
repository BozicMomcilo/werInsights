import React, { useState } from 'react';
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
import { Calendar, Filter, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

// Sample data - replace with real data from your backend
const generateData = () => {
  const contentTypes = ['Articles', 'Videos', 'Webinars', 'Reports', 'Podcasts'];
  return contentTypes.map(type => ({
    type,
    averageTime: Math.floor(Math.random() * 45) + 15, // 15-60 minutes
    engagementRate: Math.floor(Math.random() * 30) + 70, // 70-100%
    totalViews: Math.floor(Math.random() * 5000) + 1000,
  }));
};

export const ContentEngagementChart: React.FC = () => {
  const [data] = useState(generateData());
  const [timeframe, setTimeframe] = useState('month');

  const handleExport = async () => {
    const element = document.getElementById('content-engagement-chart');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'content-engagement.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // Calculate metrics
  const totalEngagementTime = data.reduce((acc, curr) => acc + curr.averageTime, 0);
  const averageEngagementTime = Math.round(totalEngagementTime / data.length);
  const mostEngagingType = data.reduce((prev, curr) => 
    prev.engagementRate > curr.engagementRate ? prev : curr
  ).type;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="!bg-[#0A101A] !border-white/10 !rounded-xl !border !backdrop-blur-lg p-4 min-w-[200px] shadow-2xl">
          <div className="font-medium mb-2">{label}</div>
          <div className="space-y-2">
            <div>
              <div className="text-[#B0B3BA] text-xs">Average Time</div>
              <div className="text-[#FFE8AC] font-medium">{data.averageTime} minutes</div>
            </div>
            <div>
              <div className="text-[#B0B3BA] text-xs">Engagement Rate</div>
              <div className="text-[#28E0B9] font-medium">{data.engagementRate}%</div>
            </div>
            <div>
              <div className="text-[#B0B3BA] text-xs">Total Views</div>
              <div className="text-white font-medium">{data.totalViews.toLocaleString()}</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Content Engagement Analysis</h2>
        <div className="flex items-center space-x-4">
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
          <button
            onClick={handleExport}
            className="glass-panel px-4 py-2 flex items-center space-x-2 button-hover"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Engagement Metrics Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Average Time per Content</div>
          <div className="text-[#FFE8AC] text-2xl font-semibold">{averageEngagementTime} min</div>
        </div>
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Most Engaging Type</div>
          <div className="text-[#FFE8AC] text-2xl font-semibold">{mostEngagingType}</div>
        </div>
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Total Content Types</div>
          <div className="text-[#FFE8AC] text-2xl font-semibold">{data.length}</div>
        </div>
      </div>

      <div id="content-engagement-chart" className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="type"
              stroke="#B0B3BA"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#B0B3BA"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ 
                value: 'Average Time (minutes)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#B0B3BA' }
              }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(114, 160, 214, 0.05)' }}
            />
            <Bar
              dataKey="averageTime"
              fill="#72A0D6"
              radius={[4, 4, 0, 0]}
              className="transition-all duration-300 hover:opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-2 text-sm text-[#B0B3BA]">
        <div className="font-medium text-white mb-3">Key Insights:</div>
        <div className="grid grid-cols-2 gap-4">
          <div>✔️ Highest engagement in {mostEngagingType}</div>
          <div>✔️ Average viewing time: {averageEngagementTime} minutes</div>
          <div>✔️ Consistent engagement across formats</div>
          <div>✔️ Strong multimedia content performance</div>
        </div>
      </div>

      <div className="text-xs text-[#B0B3BA] mt-4 text-right">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};
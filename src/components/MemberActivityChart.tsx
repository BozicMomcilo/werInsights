import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Calendar, Filter, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

// Sample data - replace with real data from your backend
const generateData = () => {
  const weeks = 12; // Increased to show more data points
  const data = [];

  for (let i = 1; i <= weeks; i++) {
    // Generate random activity counts for different types
    const dealInteractions = Math.floor(Math.random() * 50) + 30;
    const documentViews = Math.floor(Math.random() * 40) + 20;
    const comments = Math.floor(Math.random() * 30) + 15;
    const eventParticipations = Math.floor(Math.random() * 20) + 10;

    data.push({
      week: `Week ${i}`,
      totalActivity: dealInteractions + documentViews + comments + eventParticipations,
      dealInteractions,
      documentViews,
      comments,
      eventParticipations
    });
  }

  return data;
};

export const MemberActivityChart: React.FC = () => {
  const [data] = useState(generateData());
  const [timeframe, setTimeframe] = useState('12weeks');

  const handleExport = async () => {
    const element = document.getElementById('member-activity-chart');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'platform-activity.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // Calculate average activity
  const averageActivity = Math.round(
    data.reduce((acc, curr) => acc + curr.totalActivity, 0) / data.length
  );

  // Find peak activity
  const peakActivity = Math.max(...data.map(d => d.totalActivity));

  // Calculate growth rate
  const firstWeekActivity = data[0].totalActivity;
  const lastWeekActivity = data[data.length - 1].totalActivity;
  const growthRate = Math.round(
    ((lastWeekActivity - firstWeekActivity) / firstWeekActivity) * 100
  );

  return (
    <div className="glass-panel p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Platform Activity Overview</h2>
        <div className="flex items-center space-x-4">
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="4weeks">Last 4 Weeks</option>
              <option value="8weeks">Last 8 Weeks</option>
              <option value="12weeks">Last 12 Weeks</option>
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

      {/* Activity Metrics Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Average Weekly Activity</div>
          <div className="text-[#FFE8AC] text-2xl font-semibold">{averageActivity}</div>
        </div>
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Peak Activity</div>
          <div className="text-[#FFE8AC] text-2xl font-semibold">{peakActivity}</div>
        </div>
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Growth Rate</div>
          <div className={`text-2xl font-semibold ${growthRate >= 0 ? 'text-[#28E0B9]' : 'text-[#FF3B3B]'}`}>
            {growthRate}%
          </div>
        </div>
      </div>

      <div id="member-activity-chart" className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="totalActivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#72A0D6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#72A0D6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="week"
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
            <Area
              type="monotone"
              dataKey="totalActivity"
              stroke="#72A0D6"
              fill="url(#totalActivity)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-2 text-sm text-[#B0B3BA]">
        <div className="font-medium text-white mb-3">Activity Breakdown:</div>
        <div className="grid grid-cols-2 gap-4">
          <div>✔️ Deal Room Interactions</div>
          <div>✔️ Document Views & Downloads</div>
          <div>✔️ Comments & Discussions</div>
          <div>✔️ Event Participations</div>
        </div>
      </div>

      <div className="text-xs text-[#B0B3BA] mt-4 text-right">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Calendar, Filter, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

// Sample data structure for the stream funnel
const generateFunnelData = () => {
  const stages = ['Sent', 'Viewed', 'Accepted', 'Maybe', 'Declined'];
  const data = [];
  
  for (let i = 0; i < 10; i++) {
    const point = {
      x: i,
      Sent: 1000 - (i * 20),
      Viewed: 850 - (i * 25),
      Accepted: 600 - (i * 30),
      Maybe: 200 - (i * 10),
      Declined: 150 - (i * 8),
    };
    data.push(point);
  }
  
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-4 min-w-[200px]">
        <div className="space-y-2">
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex justify-between items-center">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-[#B0B3BA]">{entry.name}:</span>
              </div>
              <span className="font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const EventResponseVisualizations: React.FC = () => {
  const [funnelData] = useState(generateFunnelData());
  const [timeframe, setTimeframe] = useState('week');

  const handleExport = async () => {
    const element = document.getElementById('response-funnel');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'event-responses.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // Calculate metrics for the summary
  const totalInvitations = 1000;
  const totalAccepted = 600;
  const totalMaybe = 200;
  const totalDeclined = 150;
  const responseRate = ((totalAccepted + totalMaybe + totalDeclined) / totalInvitations * 100).toFixed(1);

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Event Response Flow</h2>
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

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Total Invitations</div>
          <div className="text-[#72A0D6] text-2xl font-semibold">
            {totalInvitations.toLocaleString()}
          </div>
        </div>
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Accepted</div>
          <div className="text-[#28E0B9] text-2xl font-semibold">
            {totalAccepted.toLocaleString()}
          </div>
        </div>
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Maybe</div>
          <div className="text-[#FFE8AC] text-2xl font-semibold">
            {totalMaybe.toLocaleString()}
          </div>
        </div>
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Response Rate</div>
          <div className="text-[#72A0D6] text-2xl font-semibold">
            {responseRate}%
          </div>
        </div>
      </div>

      {/* Stream Funnel Chart */}
      <div id="response-funnel" className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={funnelData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              stroke="#B0B3BA"
              tickLine={false}
              hide
            />
            <YAxis
              stroke="#B0B3BA"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="Sent"
              stackId="1"
              stroke="#72A0D6"
              fill="#72A0D6"
            />
            <Area
              type="monotone"
              dataKey="Viewed"
              stackId="1"
              stroke="#9FB8D9"
              fill="#9FB8D9"
            />
            <Area
              type="monotone"
              dataKey="Accepted"
              stackId="1"
              stroke="#28E0B9"
              fill="#28E0B9"
            />
            <Area
              type="monotone"
              dataKey="Maybe"
              stackId="1"
              stroke="#FFE8AC"
              fill="#FFE8AC"
            />
            <Area
              type="monotone"
              dataKey="Declined"
              stackId="1"
              stroke="#FF3B3B"
              fill="#FF3B3B"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center space-x-6 mt-6">
        {[
          { label: 'Sent', color: '#72A0D6' },
          { label: 'Viewed', color: '#9FB8D9' },
          { label: 'Accepted', color: '#28E0B9' },
          { label: 'Maybe', color: '#FFE8AC' },
          { label: 'Declined', color: '#FF3B3B' }
        ].map(item => (
          <div key={item.label} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="text-xs text-[#B0B3BA] mt-6 text-right">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};
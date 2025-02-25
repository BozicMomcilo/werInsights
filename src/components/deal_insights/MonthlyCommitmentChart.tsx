import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Calendar, Download, TrendingUp } from 'lucide-react';
import html2canvas from 'html2canvas';

// Sample data - replace with real data from your backend
const generateMonthlyData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months.map(month => ({
    month,
    committedAmount: Math.floor(Math.random() * 50 + 20), // Random amount between 20M and 70M
    significantChange: Math.random() > 0.8 // Randomly mark some months as significant
  }));
};

const formatValue = (value: number) => {
  return `$${value}M`;
};

export const MonthlyCommitmentChart: React.FC = () => {
  const [data] = useState(generateMonthlyData());
  const [selectedYear, setSelectedYear] = useState('2024');

  // Calculate metrics
  const totalCommitment = data.reduce((acc, curr) => acc + curr.committedAmount, 0);
  const averageCommitment = Number((totalCommitment / data.length).toFixed(2));
  const highestMonth = data.reduce((prev, curr) => 
    prev.committedAmount > curr.committedAmount ? prev : curr
  );

  const handleExport = async () => {
    const element = document.getElementById('monthly-commitment-chart');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'monthly-commitments.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const amount = data.committedAmount;
      const difference = amount - averageCommitment;
      const percentDiff = ((difference / averageCommitment) * 100).toFixed(1);
      
      return (
        <div className="glass-panel p-4 min-w-[200px]">
          <div className="font-medium mb-2">{label} {selectedYear}</div>
          <div className="space-y-2">
            <div>
              <div className="text-[#B0B3BA] text-xs">Committed Amount</div>
              <div className="text-[#4BAA4A] text-lg font-medium">{formatValue(amount)}</div>
            </div>
            <div className="pt-2 border-t border-white/10">
              <div className="text-[#B0B3BA] text-xs">vs. Monthly Average</div>
              <div className={`font-medium ${difference >= 0 ? 'text-[#4BAA4A]' : 'text-[#FF3B3B]'}`}>
                {difference >= 0 ? '+' : ''}{percentDiff}%
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Monthly Commitment Trends</h2>
        <div className="flex items-center space-x-4">
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
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
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Total Annual Commitment</div>
          <div className="text-[#4BAA4A] text-2xl font-semibold">{formatValue(totalCommitment)}</div>
        </div>
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Monthly Average</div>
          <div className="text-[#4BAA4A] text-2xl font-semibold">{formatValue(averageCommitment)}</div>
        </div>
        <div className="glass-panel p-4">
          <div className="text-[#B0B3BA] text-sm mb-1">Highest Month</div>
          <div className="text-[#4BAA4A] text-2xl font-semibold">
            {highestMonth.month}: {formatValue(highestMonth.committedAmount)}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div id="monthly-commitment-chart" className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorCommitment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4BAA4A" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4BAA4A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="month"
              stroke="#B0B3BA"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#B0B3BA"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: 'rgba(75, 170, 74, 0.2)',
                strokeWidth: 2,
                fill: 'rgba(75, 170, 74, 0.1)'
              }}
            />
            <ReferenceLine
              y={averageCommitment}
              stroke="#FFE8AC"
              strokeDasharray="3 3"
              label={{
                value: 'Monthly Average',
                fill: '#FFE8AC',
                fontSize: 12,
                position: 'right'
              }}
            />
            <Area
              type="monotone"
              dataKey="committedAmount"
              stroke="#4BAA4A"
              fill="url(#colorCommitment)"
              strokeWidth={2}
              dot={{ r: 4, fill: "#4BAA4A" }}
              activeDot={{
                r: 6,
                fill: "#4BAA4A",
                stroke: "#FFFFFF",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="mt-6 space-y-2 text-sm text-[#B0B3BA]">
        <div className="font-medium text-white mb-3">Key Insights:</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-[#4BAA4A]" />
            <span>Highest commitment in {highestMonth.month}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-[#4BAA4A]" />
            <span>Average monthly commitment: {formatValue(averageCommitment)}</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-[#B0B3BA] mt-4 text-right">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};
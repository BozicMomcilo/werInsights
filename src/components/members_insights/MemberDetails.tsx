import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart,
  Shield,
  Leaf,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Sample member data - replace with real data from your backend
const getMemberDetails = (id: string) => ({
  id: parseInt(id),
  name: 'Alice Richardson',
  role: 'Co-investor',
  company: 'Venture Capital Partners',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=1200&h=400&fit=crop',
  commitmentDomains: [
    { name: 'Living', color: '#72A0D6', icon: Heart },
    { name: 'Resilience', color: '#28E0B9', icon: Shield },
    { name: 'Life', color: '#FFE8AC', icon: Leaf }
  ],
  deals: [
    { name: 'TechVision AI', amount: 2500000, date: '2024-01' },
    { name: 'GreenEnergy Solutions', amount: 1800000, date: '2024-02' },
    { name: 'HealthTech Innovations', amount: 3200000, date: '2024-03' },
    { name: 'Future Mobility', amount: 2100000, date: '2024-04' }
  ],
  appMetrics: {
    appOpens: [
      { date: '2024-01', count: 45 },
      { date: '2024-02', count: 52 },
      { date: '2024-03', count: 38 },
      { date: '2024-04', count: 61 }
    ],
    messages: [
      { date: '2024-01', count: 28 },
      { date: '2024-02', count: 35 },
      { date: '2024-03', count: 22 },
      { date: '2024-04', count: 42 }
    ],
    eventResponses: [
      { status: 'Accepted', count: 12 },
      { status: 'Declined', count: 3 },
      { status: 'Maybe', count: 5 }
    ]
  }
});

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="!bg-[#0A101A] !border-white/10 !rounded-xl !border !backdrop-blur-xl p-4 min-w-[200px] shadow-2xl">
        <div className="font-medium mb-2">{label}</div>
        <div className="space-y-2">
          <div>
            <div className="text-[#B0B3BA] text-xs">Amount</div>
            <div className="text-[#72A0D6] text-lg font-medium">
              ${(payload[0].value / 1000000).toFixed(2)}M
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="!bg-[#0A101A] !border-white/10 !rounded-xl !border !backdrop-blur-xl p-4 min-w-[200px] shadow-2xl">
        <div className="font-medium mb-2">{label}</div>
        <div className="space-y-2">
          <div>
            <div className="text-[#B0B3BA] text-xs">Activity Count</div>
            <div className="text-[#72A0D6] text-lg font-medium">
              {payload[0].value}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomEventTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="!bg-[#0A101A] !border-white/10 !rounded-xl !border !backdrop-blur-xl p-4 min-w-[200px] shadow-2xl">
        <div className="font-medium mb-2">{label}</div>
        <div className="space-y-2">
          <div>
            <div className="text-[#B0B3BA] text-xs">Response Count</div>
            <div className="text-[#28E0B9] text-lg font-medium">
              {payload[0].value}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const MemberDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const member = getMemberDetails(id!);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="glass-panel p-2 hover:bg-[#72A0D6]/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-medium">{member.name}</h1>
      </div>

      {/* Profile Banner */}
      <div className="glass-panel overflow-hidden">
        <div 
          className="w-full h-[300px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${member.coverImage})` }}
        >
          <div className="absolute bottom-6 left-6 flex items-end space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/10">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h2 className="text-2xl font-medium text-white drop-shadow-lg">
                {member.name}
              </h2>
              <div className="text-[#B0B3BA]">{member.company}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Commitment Domains */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-medium mb-6">Commitment Domains</h3>
        <div className="grid grid-cols-3 gap-4">
          {member.commitmentDomains.map((domain) => {
            const Icon = domain.icon;
            return (
              <div 
                key={domain.name}
                className="glass-panel p-4 flex items-center space-x-3"
                style={{ borderColor: `${domain.color}33` }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${domain.color}1a` }}
                >
                  <Icon 
                    className="w-5 h-5"
                    style={{ color: domain.color }}
                  />
                </div>
                <div>
                  <div className="text-sm text-[#B0B3BA]">Domain</div>
                  <div className="font-medium" style={{ color: domain.color }}>
                    {domain.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commitment Performance */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-medium mb-6">Commitment Performance</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={member.deals}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="#B0B3BA"
                fontSize={12}
              />
              <YAxis
                stroke="#B0B3BA"
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000000}M`}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ 
                  fill: 'rgba(255, 255, 255, 0.1)',
                  
                }}
              />
              <Bar 
                dataKey="amount" 
                fill="#72A0D6"
                radius={[4, 4, 0, 0]}
                className="transition-all duration-300"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* App Interaction Metrics */}
      <div className="grid grid-cols-2 gap-6">
        {/* App Opens & Messages */}
        <div className="glass-panel p-6">
          <h3 className="text-xl font-medium mb-6">App Activity</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={member.appMetrics.appOpens}>
                <defs>
                  <linearGradient id="appOpens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#72A0D6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#72A0D6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#B0B3BA" />
                <YAxis stroke="#B0B3BA" />
                <Tooltip 
                  content={<CustomAreaTooltip />}
                  cursor={{ 
                    stroke: 'rgba(255, 255, 255, 0.1)',
                    strokeWidth: 2,
                    fill: 'rgba(255, 255, 255, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#72A0D6"
                  fillOpacity={1}
                  fill="url(#appOpens)"
                  className="transition-all duration-300"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Event Responses */}
        <div className="glass-panel p-6">
          <h3 className="text-xl font-medium mb-6">Event Responses</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={member.appMetrics.eventResponses}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="status" stroke="#B0B3BA" />
                <YAxis stroke="#B0B3BA" />
                <Tooltip 
                  content={<CustomEventTooltip />}
                  cursor={{ 
                    fill: 'rgba(255, 255, 255, 0.1)',
                    
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#28E0B9" 
                  radius={[4, 4, 0, 0]}
                  className="transition-all duration-300"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Filter, ChevronDown, Calendar, ArrowUpRight, Clock } from 'lucide-react';

const deals = [
  { 
    id: 1, 
    name: 'Alexander Emerson', 
    date: 'January 17, 2025', 
    tickets: 2, 
    type: 'Living', 
    capital: '2M',
    status: 'Active',
    sector: 'Tech',
    performance: '+12.5%',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&q=80&fit=crop'
  },
  { 
    id: 2, 
    name: 'Dominique Baptiste', 
    date: 'January 16, 2025', 
    tickets: 1, 
    type: 'Living', 
    capital: '2M',
    status: 'Pending',
    sector: 'Life',
    performance: '+8.3%',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
  },
  { 
    id: 3, 
    name: 'Elizabeth Scott', 
    date: 'January 16, 2025', 
    tickets: 1, 
    type: 'Living', 
    capital: '2M',
    status: 'Active',
    sector: 'Resilience',
    performance: '+15.7%',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
  },
  { 
    id: 4, 
    name: 'Gloria Atamna', 
    date: 'January 15, 2025', 
    tickets: 2, 
    type: 'Living', 
    capital: '2M',
    status: 'Closed',
    sector: 'Tech',
    performance: '+21.2%',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&q=80&fit=crop'
  },
  { 
    id: 5, 
    name: 'Giselle Burch', 
    date: 'January 15, 2025', 
    tickets: 1, 
    type: 'Living', 
    capital: '2M',
    status: 'Active',
    sector: 'Life',
    performance: '+9.8%',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=160&h=160&q=80&fit=crop'
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'text-[#28E0B9]';
    case 'pending':
      return 'text-[#FFE8AC]';
    case 'closed':
      return 'text-[#B0B3BA]';
    default:
      return 'text-white';
  }
};

const getSectorColor = (sector: string) => {
  switch (sector.toLowerCase()) {
    case 'tech':
      return 'text-[#72A0D6]';
    case 'life':
      return 'text-[#FFE8AC]';
    case 'resilience':
      return 'text-[#28E0B9]';
    default:
      return 'text-white';
  }
};

export const DealsOverview: React.FC = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    sector: 'all',
    period: 'month'
  });

  const MetricCard = ({ title, value, change, icon: Icon }) => (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-[#B0B3BA] text-sm font-medium mb-2">{title}</h3>
          <div className="metric-value">{value}</div>
        </div>
        <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-center text-sm">
        <span className="text-[#28E0B9] font-medium">↑ {change}%</span>
        <span className="text-[#B0B3BA] ml-2">Since last month</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Deal Metrics */}
      <div className="grid grid-cols-3 gap-6">
        <MetricCard 
          title="Total Deals" 
          value="13" 
          change="32.7"
          icon={ArrowUpRight}
        />
        <MetricCard 
          title="Average Deal Size" 
          value="1.8M" 
          change="15.4"
          icon={ArrowUpRight}
        />
        <MetricCard 
          title="Time to Close" 
          value="18 Days" 
          change="-8.3"
          icon={Clock}
        />
      </div>

      {/* Deals Table */}
      <div className="glass-panel p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">Deals Overview</h2>
          <div className="flex items-center space-x-4">
            <div className="glass-panel px-4 py-2 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-white" />
              <select
                value={filters.period}
                onChange={(e) => setFilters(prev => ({ ...prev, period: e.target.value }))}
                className="bg-transparent border-none text-sm focus:outline-none"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
            <div className="glass-panel px-4 py-2 flex items-center space-x-2">
              <Filter className="w-4 h-4 text-white" />
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="bg-transparent border-none text-sm focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="glass-panel px-4 py-2 flex items-center space-x-2">
              <Filter className="w-4 h-4 text-white" />
              <select
                value={filters.sector}
                onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
                className="bg-transparent border-none text-sm focus:outline-none"
              >
                <option value="all">All Sectors</option>
                <option value="tech">Technology</option>
                <option value="life">Life Sciences</option>
                <option value="resilience">Resilience</option>
              </select>
            </div>
          </div>
        </div>
        
        <table className="w-full">
          <thead>
            <tr className="text-[#B0B3BA] text-sm font-medium">
              <th className="text-left pb-4">Full name</th>
              <th className="text-left pb-4">Date</th>
              <th className="text-left pb-4">Status</th>
              <th className="text-left pb-4">Sector</th>
              <th className="text-left pb-4">Performance</th>
              <th className="text-left pb-4">Capital left</th>
            </tr>
          </thead>
          <tbody className="font-light">
            {deals.map((deal) => (
              <tr key={deal.id} className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10 hover:ring-[#72A0D6]/30 transition-all duration-300">
                      <img 
                        src={deal.image} 
                        alt={deal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{deal.name}</span>
                  </div>
                </td>
                <td className="py-4">{deal.date}</td>
                <td className="py-4">
                  <span className={`${getStatusColor(deal.status)} font-medium`}>
                    {deal.status}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`${getSectorColor(deal.sector)} font-medium`}>
                    {deal.sector}
                  </span>
                </td>
                <td className="py-4 text-[#28E0B9] font-medium">{deal.performance}</td>
                <td className="py-4">{deal.capital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
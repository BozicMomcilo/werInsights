import React, { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';

const members = [
  {
    id: 1,
    name: 'Alice Richardson',
    company: 'Venture Capital Partners',
    membership_status: 'Active',
    last_activity: 'April 5, 2024',
    investment_tier: 'Gold',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 2,
    name: 'David Kim',
    company: 'Horizon Investments',
    membership_status: 'Inactive',
    last_activity: 'March 20, 2024',
    investment_tier: 'Silver',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 3,
    name: 'Sofia Martinez',
    company: 'GreenTech Solutions',
    membership_status: 'Pending',
    last_activity: 'April 10, 2024',
    investment_tier: 'Platinum',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 4,
    name: 'James Walker',
    company: 'Infinity Wealth Group',
    membership_status: 'Active',
    last_activity: 'April 8, 2024',
    investment_tier: 'Gold',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 5,
    name: 'Emily Chen',
    company: 'Future Fund Management',
    membership_status: 'Active',
    last_activity: 'April 15, 2024',
    investment_tier: 'Platinum',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'text-[#51EFF9]';
    case 'inactive':
      return 'text-[#FF5C5C]';
    case 'pending':
      return 'text-[#FFE8AC]';
    default:
      return 'text-white';
  }
};

const getTierColor = (tier: string) => {
  switch (tier.toLowerCase()) {
    case 'platinum':
      return 'text-[#E5E4E2]';
    case 'gold':
      return 'text-[#FFD700]';
    case 'silver':
      return 'text-[#C0C0C0]';
    default:
      return 'text-white';
  }
};

export const MembersOverviewTable: React.FC = () => {
  const [filters, setFilters] = useState({
    period: 'month',
    status: 'all',
    tier: 'all'
  });

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">Members Overview</h2>
          <div className="flex items-center space-x-4">
            <div className="glass-panel px-4 py-2 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
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
              <Filter className="w-4 h-4" />
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="bg-transparent border-none text-sm focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="glass-panel px-4 py-2 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <select
                value={filters.tier}
                onChange={(e) => setFilters(prev => ({ ...prev, tier: e.target.value }))}
                className="bg-transparent border-none text-sm focus:outline-none"
              >
                <option value="all">All Tiers</option>
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
              </select>
            </div>
          </div>
        </div>
        
        <table className="w-full">
          <thead>
            <tr className="text-[#B0B3BA] text-sm font-medium">
              <th className="text-left pb-4">Full name</th>
              <th className="text-left pb-4">Company</th>
              <th className="text-left pb-4">Status</th>
              <th className="text-left pb-4">Investment Tier</th>
              <th className="text-left pb-4">Last Activity</th>
            </tr>
          </thead>
          <tbody className="font-light">
            {members.map((member) => (
              <tr 
                key={member.id} 
                className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{member.name}</span>
                  </div>
                </td>
                <td className="py-4">{member.company}</td>
                <td className="py-4">
                  <span className={`${getStatusColor(member.membership_status)} font-medium`}>
                    {member.membership_status}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`${getTierColor(member.investment_tier)} font-medium`}>
                    {member.investment_tier}
                  </span>
                </td>
                <td className="py-4">{member.last_activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Member Distribution Map */}
    </div>
  )
};
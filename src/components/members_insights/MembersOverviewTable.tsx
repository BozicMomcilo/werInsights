import React, { useState } from 'react';
import { Calendar, Filter, Globe, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Expanded members array with more items for pagination demonstration
const members = [
  {
    id: 1,
    name: 'Alice Richardson',
    type: 'Co-investor',
    country: 'United States',
    committedVolume: '5.2M',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 2,
    name: 'David Kim',
    type: 'Co-creator',
    country: 'South Korea',
    committedVolume: '3.8M',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 3,
    name: 'Sofia Martinez',
    type: 'Co-investor',
    country: 'Spain',
    committedVolume: '7.1M',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 4,
    name: 'James Walker',
    type: 'Co-creator',
    country: 'United Kingdom',
    committedVolume: '4.5M',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 5,
    name: 'Emily Chen',
    type: 'Co-investor',
    country: 'Singapore',
    committedVolume: '6.3M',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 6,
    name: 'Michael Brown',
    type: 'Co-creator',
    country: 'Canada',
    committedVolume: '4.9M',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 7,
    name: 'Sarah Lee',
    type: 'Co-investor',
    country: 'Australia',
    committedVolume: '5.8M',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 8,
    name: 'Thomas Anderson',
    type: 'Co-creator',
    country: 'Germany',
    committedVolume: '6.7M',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&q=80&fit=crop'
  }
];

const getMemberTypeColor = (type: string) => {
  switch (type) {
    case 'Co-investor':
      return 'text-[#72A0D6]';
    case 'Co-creator':
      return 'text-[#28E0B9]';
    default:
      return 'text-white';
  }
};

const ITEMS_PER_PAGE = 5;

export const MembersOverviewTable: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    period: 'month',
    type: 'all',
    country: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const indexOfLastMember = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstMember = indexOfLastMember - ITEMS_PER_PAGE;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(members.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleMemberClick = (memberId: number) => {
    navigate(`/dashboard/members/${memberId}`);
  };

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
              <Briefcase className="w-4 h-4" />
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="bg-transparent border-none text-sm focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="co-investor">Co-investors</option>
                <option value="co-creator">Co-creators</option>
              </select>
            </div>
            <div className="glass-panel px-4 py-2 flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <select
                value={filters.country}
                onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                className="bg-transparent border-none text-sm focus:outline-none"
              >
                <option value="all">All Countries</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="sg">Singapore</option>
                <option value="kr">South Korea</option>
                <option value="es">Spain</option>
              </select>
            </div>
          </div>
        </div>
        
        <table className="w-full">
          <thead>
            <tr className="text-[#B0B3BA] text-sm font-medium">
              <th className="text-left pb-4">Member</th>
              <th className="text-left pb-4">Type</th>
              <th className="text-left pb-4">Country</th>
              <th className="text-right pb-4">Committed Volume</th>
            </tr>
          </thead>
          <tbody className="font-light">
            {currentMembers.map((member) => (
              <tr 
                key={member.id} 
                className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors cursor-pointer"
                onClick={() => handleMemberClick(member.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleMemberClick(member.id);
                  }
                }}
              >
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10 hover:ring-[#72A0D6]/30 transition-all duration-300">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{member.name}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <div className={`${getMemberTypeColor(member.type)} font-medium flex items-center`}>
                      <Briefcase className="w-4 h-4 mr-2" />
                      {member.type}
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-[#FFE8AC]" />
                    <span>{member.country}</span>
                  </div>
                </td>
                <td className="py-4 text-right">
                  <span className="text-[#72A0D6] font-semibold text-lg">
                    ${member.committedVolume}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
          <div className="text-sm text-[#B0B3BA]">
            Showing {indexOfFirstMember + 1} to {Math.min(indexOfLastMember, members.length)} of {members.length} members
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="glass-panel p-2 disabled:opacity-50 button-hover"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`glass-panel px-4 py-2 ${
                  currentPage === number ? 'bg-[#72A0D6]/20 text-white' : 'text-[#B0B3BA]'
                } button-hover`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="glass-panel p-2 disabled:opacity-50 button-hover"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#72A0D6]" />
                <span>Co-investor</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#28E0B9]" />
                <span>Co-creator</span>
              </div>
            </div>
            <div className="text-[#B0B3BA]">
              Total Members: {members.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Calendar, Filter, Clock, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample data - replace with real data from your backend
const engagementResponses = [
  {
    id: 1,
    member: {
      name: 'Alice Richardson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop',
      role: 'Senior Investor'
    },
    engagement: {
      title: 'Q2 Investment Strategy Meeting',
      type: 'Event'
    },
    response: 'Attending',
    date: '2024-04-20T10:00:00',
    status: 'current'
  },
  {
    id: 2,
    member: {
      name: 'David Kim',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop',
      role: 'Portfolio Manager'
    },
    engagement: {
      title: 'Tech Sector Analysis Webinar',
      type: 'Webinar'
    },
    response: 'Maybe',
    date: '2024-04-22T14:00:00',
    status: 'current'
  },
  {
    id: 3,
    member: {
      name: 'Sofia Martinez',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop',
      role: 'Investment Analyst'
    },
    engagement: {
      title: 'Startup Pitch Day',
      type: 'Event'
    },
    response: 'Not Attending',
    date: '2024-04-18T09:00:00',
    status: 'past'
  },
  {
    id: 4,
    member: {
      name: 'James Walker',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop',
      role: 'Investment Director'
    },
    engagement: {
      title: 'Market Trends Discussion',
      type: 'Meeting'
    },
    response: 'Attending',
    date: '2024-04-25T11:00:00',
    status: 'current'
  },
  {
    id: 5,
    member: {
      name: 'Emily Chen',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop',
      role: 'Venture Partner'
    },
    engagement: {
      title: 'Investment Committee Review',
      type: 'Meeting'
    },
    response: 'Attending',
    date: '2024-04-15T15:00:00',
    status: 'past'
  }
];

// Add more sample data for better pagination demonstration
const additionalResponses = [
  // Current engagements
  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 6,
    member: {
      name: `Current Member ${i + 1}`,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&q=80&fit=crop',
      role: 'Investor'
    },
    engagement: {
      title: `Current Event ${i + 1}`,
      type: ['Event', 'Webinar', 'Meeting'][i % 3]
    },
    response: ['Attending', 'Maybe', 'Not Attending'][i % 3],
    date: new Date(Date.now() + (i * 86400000)).toISOString(),
    status: 'current'
  })),
  // Past engagements
  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 14,
    member: {
      name: `Past Member ${i + 1}`,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&q=80&fit=crop',
      role: 'Investor'
    },
    engagement: {
      title: `Past Event ${i + 1}`,
      type: ['Event', 'Webinar', 'Meeting'][i % 3]
    },
    response: ['Attending', 'Maybe', 'Not Attending'][i % 3],
    date: new Date(Date.now() - (i * 86400000)).toISOString(),
    status: 'past'
  }))
];

const allEngagementResponses = [...engagementResponses, ...additionalResponses];

const getResponseColor = (response: string) => {
  switch (response.toLowerCase()) {
    case 'attending':
      return 'text-[#28E0B9]';
    case 'not attending':
      return 'text-[#FF3B3B]';
    case 'maybe':
      return 'text-[#FFE8AC]';
    default:
      return 'text-white';
  }
};

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'event':
      return 'text-[#72A0D6]';
    case 'webinar':
      return 'text-[#FFE8AC]';
    case 'meeting':
      return 'text-[#28E0B9]';
    default:
      return 'text-white';
  }
};

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemCount: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  className?: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemCount,
  totalItems,
  startIndex,
  endIndex,
  className = ''
}) => (
  <div className={`flex justify-between items-center pt-4 ${className}`}>
    <div className="text-sm text-[#B0B3BA]">
      Showing {startIndex + 1} to {Math.min(endIndex, itemCount)} of {itemCount} responses
    </div>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="glass-panel p-2 disabled:opacity-50 button-hover"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`glass-panel px-4 py-2 ${
            currentPage === number ? 'bg-[#72A0D6]/20 text-white' : 'text-[#B0B3BA]'
          } button-hover`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="glass-panel p-2 disabled:opacity-50 button-hover"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const ITEMS_PER_PAGE = 5;

export const EngagementResponseList: React.FC = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    response: 'all',
    type: 'all',
    sortBy: 'date'
  });

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentEngagementsPage, setCurrentEngagementsPage] = useState(1);
  const [pastEngagementsPage, setPastEngagementsPage] = useState(1);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Filter and sort all responses
  const filteredResponses = allEngagementResponses
    .filter(response => {
      if (filters.status !== 'all' && response.status !== filters.status) return false;
      if (filters.response !== 'all' && response.response.toLowerCase() !== filters.response) return false;
      if (filters.type !== 'all' && response.engagement.type.toLowerCase() !== filters.type) return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Separate current and past engagements
  const allCurrentEngagements = filteredResponses.filter(response => response.status === 'current');
  const allPastEngagements = filteredResponses.filter(response => response.status === 'past');

  // Calculate pagination for current engagements
  const currentTotalPages = Math.ceil(allCurrentEngagements.length / ITEMS_PER_PAGE);
  const currentStartIndex = (currentEngagementsPage - 1) * ITEMS_PER_PAGE;
  const currentEndIndex = currentStartIndex + ITEMS_PER_PAGE;
  const currentEngagements = allCurrentEngagements.slice(currentStartIndex, currentEndIndex);

  // Calculate pagination for past engagements
  const pastTotalPages = Math.ceil(allPastEngagements.length / ITEMS_PER_PAGE);
  const pastStartIndex = (pastEngagementsPage - 1) * ITEMS_PER_PAGE;
  const pastEndIndex = pastStartIndex + ITEMS_PER_PAGE;
  const pastEngagements = allPastEngagements.slice(pastStartIndex, pastEndIndex);

  const renderEngagementItem = (response: typeof allEngagementResponses[0], isPast = false) => (
    <div
      key={response.id}
      className={`glass-panel p-4 transition-all duration-300 hover:bg-[#72A0D6]/5 ${
        isPast ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10">
            <img
              src={response.member.image}
              alt={response.member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{response.member.name}</span>
              <span className="text-sm text-[#B0B3BA]">•</span>
              <span className="text-sm text-[#B0B3BA]">{response.member.role}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-sm ${getTypeColor(response.engagement.type)}`}>
                {response.engagement.type}
              </span>
              <span className="text-sm text-[#B0B3BA]">•</span>
              <span className="text-sm text-[#B0B3BA]">{response.engagement.title}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className={`font-medium ${getResponseColor(response.response)}`}>
            {response.response}
          </div>
          <div className="text-sm text-[#B0B3BA]">
            {formatDate(response.date)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="glass-panel p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Engagement Responses</h2>
        <div className="flex items-center space-x-4">
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Time</option>
              <option value="current">Current</option>
              <option value="past">Past</option>
            </select>
          </div>
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <select
              value={filters.response}
              onChange={(e) => setFilters(prev => ({ ...prev, response: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Responses</option>
              <option value="attending">Attending</option>
              <option value="not attending">Not Attending</option>
              <option value="maybe">Maybe</option>
            </select>
          </div>
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="event">Events</option>
              <option value="webinar">Webinars</option>
              <option value="meeting">Meetings</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Current Engagements Section */}
        {allCurrentEngagements.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#28E0B9]">Current Engagements</h3>
              <button
                onClick={toggleSortOrder}
                className="glass-panel p-2 flex items-center space-x-2"
              >
                <span className="text-sm">Sort by Date</span>
                {sortOrder === 'desc' ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="space-y-2">
              {currentEngagements.map(response => renderEngagementItem(response))}
            </div>
            {currentTotalPages > 1 && (
              <PaginationControls
                currentPage={currentEngagementsPage}
                totalPages={currentTotalPages}
                onPageChange={setCurrentEngagementsPage}
                itemCount={allCurrentEngagements.length}
                totalItems={allCurrentEngagements.length}
                startIndex={currentStartIndex}
                endIndex={currentEndIndex}
                className="border-t border-white/5"
              />
            )}
          </div>
        )}

        {/* Past Engagements Section */}
        {allPastEngagements.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-[#B0B3BA] mb-4">Past Engagements</h3>
            <div className="space-y-2">
              {pastEngagements.map(response => renderEngagementItem(response, true))}
            </div>
            {pastTotalPages > 1 && (
              <PaginationControls
                currentPage={pastEngagementsPage}
                totalPages={pastTotalPages}
                onPageChange={setPastEngagementsPage}
                itemCount={allPastEngagements.length}
                totalItems={allPastEngagements.length}
                startIndex={pastStartIndex}
                endIndex={pastEndIndex}
                className="border-t border-white/5"
              />
            )}
          </div>
        )}
      </div>

      {filteredResponses.length === 0 && (
        <div className="text-center py-8 text-[#B0B3BA]">
          No responses match your filters
        </div>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample readers data - expanded for pagination demonstration
const responses = [
  {
    id: 1,
    member: {
      name: 'Alice Richardson',
      role: 'Senior Investor',
      readDate: '2024-04-20T15:30:00',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
    },
    questionnaire: {
      type: 'Multi-Question',
      title: 'Investment Strategy Survey 2024'
    }
  },
  {
    id: 2,
    member: {
      name: 'David Kim',
      role: 'Portfolio Manager',
      readDate: '2024-04-20T14:45:00',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
    },
    questionnaire: {
      type: 'Rating',
      title: 'Portfolio Performance Review'
    }
  },
  {
    id: 3,
    member: {
      name: 'Sofia Martinez',
      role: 'Investment Analyst',
      readDate: '2024-04-20T13:15:00',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop'
    },
    questionnaire: {
      type: 'Multi-answer',
      title: 'Market Sentiment Analysis'
    }
  },
  {
    id: 4,
    member: {
      name: 'James Walker',
      role: 'Market Researcher',
      readDate: '2024-04-20T12:30:00',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop'
    },
    questionnaire: {
      type: 'Single Answer',
      title: 'Risk Assessment Survey'
    }
  },
  {
    id: 5,
    member: {
      name: 'Emily Chen',
      role: 'Investment Director',
      readDate: '2024-04-20T11:45:00',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
    },
    questionnaire: {
      type: 'Questionnaire',
      title: 'Emerging Markets Survey'
    }
  },
  {
    id: 6,
    member: {
      name: 'Michael Brown',
      role: 'Portfolio Analyst',
      readDate: '2024-04-20T11:30:00',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&q=80&fit=crop'
    },
    questionnaire: {
      type: 'Multi-answer',
      title: 'ESG Investment Preferences'
    }
  },
  {
    id: 7,
    member: {
      name: 'Sarah Lee',
      role: 'Investment Manager',
      readDate: '2024-04-20T11:15:00',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&q=80&fit=crop'
    },
    questionnaire: {
      type: 'Rating',
      title: 'Portfolio Risk Assessment'
    }
  },
  {
    id: 8,
    member: {
      name: 'Thomas Anderson',
      role: 'Senior Analyst',
      readDate: '2024-04-20T11:00:00',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&q=80&fit=crop'
    },
    questionnaire: {
      type: 'Single Answer',
      title: 'Market Outlook Survey'
    }
  }
];

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'multi-question':
      return 'text-[#72A0D6]';
    case 'rating':
      return 'text-[#FFE8AC]';
    case 'multi-answer':
      return 'text-[#28E0B9]';
    case 'single answer':
      return 'text-[#4BAA4A]';
    default:
      return 'text-white';
  }
};

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemCount: number;
  startIndex: number;
  endIndex: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemCount,
  startIndex,
  endIndex,
}) => (
  <div className="flex justify-between items-center mt-6">
    <div className="text-sm text-[#B0B3BA]">
      Showing {startIndex + 1} to {Math.min(endIndex, itemCount)} of {itemCount} responses
    </div>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="glass-panel p-2 disabled:opacity-50 button-hover"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export const EngagementResponseList: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    period: 'month',
    type: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResponses = responses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(responses.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Engagement Response List</h2>
        <div className="flex items-center space-x-4">
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Clock className="w-4 h-4" />
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
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="multi-question">Multi-Question</option>
              <option value="rating">Rating</option>
              <option value="multi-answer">Multi-answer</option>
              <option value="single">Single Answer</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {currentResponses.map((response) => (
          <div 
            key={response.id}
            className="glass-panel p-4 transition-all duration-300 hover:bg-[#72A0D6]/5 cursor-pointer"
            onClick={() => navigate(`/dashboard/engagements/${response.id}/responses`)}
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
                    <span className={`text-sm ${getTypeColor(response.questionnaire.type)}`}>
                      {response.questionnaire.type}
                    </span>
                    <span className="text-sm text-[#B0B3BA]">•</span>
                    <span className="text-sm text-[#B0B3BA]">{response.questionnaire.title}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-[#B0B3BA]">
                {formatDate(response.member.readDate)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemCount={responses.length}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      )}
    </div>
  );
};
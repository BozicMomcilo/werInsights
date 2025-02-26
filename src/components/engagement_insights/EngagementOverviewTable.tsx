import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample data - replace with real data from your backend
const engagements = [
  {
    id: 1,
    title: 'Investment Strategy Survey 2024',
    type: 'Questionnaire',
    responseCount: 156,
    createdAt: '2024-04-20',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 2,
    title: 'Portfolio Performance Review',
    type: 'Rating',
    responseCount: 89,
    createdAt: '2024-04-18',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 3,
    title: 'Market Sentiment Analysis',
    type: 'Multi-answer',
    responseCount: 234,
    createdAt: '2024-04-15',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 4,
    title: 'Risk Assessment Survey',
    type: 'Single Answer',
    responseCount: 178,
    createdAt: '2024-04-12',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 7,
    title: 'Emerging Markets Survey',
    type: 'Questionnaire',
    responseCount: 145,
    createdAt: '2024-04-10',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 8,
    title: 'ESG Investment Preferences',
    type: 'Multi-answer',
    responseCount: 167,
    createdAt: '2024-04-08',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=160&h=160&q=80&fit=crop'
  },
  // Past engagements
  {
    id: 5,
    title: '2023 Year-End Investment Review',
    type: 'Questionnaire',
    responseCount: 312,
    createdAt: '2023-12-15',
    status: 'past',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 6,
    title: 'Portfolio Allocation Preferences',
    type: 'Multi-answer',
    responseCount: 245,
    createdAt: '2023-12-10',
    status: 'past',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 9,
    title: 'Q4 2023 Market Outlook',
    type: 'Rating',
    responseCount: 198,
    createdAt: '2023-12-05',
    status: 'past',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 10,
    title: 'Investment Risk Tolerance',
    type: 'Single Answer',
    responseCount: 276,
    createdAt: '2023-12-01',
    status: 'past',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 11,
    title: 'Cryptocurrency Investment Survey',
    type: 'Multi-answer',
    responseCount: 189,
    createdAt: '2023-11-28',
    status: 'past',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 12,
    title: 'Global Markets Assessment',
    type: 'Questionnaire',
    responseCount: 234,
    createdAt: '2023-11-25',
    status: 'past',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=160&h=160&q=80&fit=crop'
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Questionnaire':
      return 'text-[#72A0D6]';
    case 'Rating':
      return 'text-[#FFE8AC]';
    case 'Multi-answer':
      return 'text-[#28E0B9]';
    case 'Single Answer':
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
      Showing {startIndex + 1} to {Math.min(endIndex, itemCount)} of {itemCount} items
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

const EngagementTable: React.FC<{
  engagements: typeof engagements;
  title: string;
  titleColor?: string;
}> = ({ engagements, title, titleColor = 'text-white' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEngagements = engagements.slice(startIndex, endIndex);
  const totalPages = Math.ceil(engagements.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-medium ${titleColor}`}>{title}</h3>
        <div className="text-sm text-[#B0B3BA]">
          Page {currentPage} of {totalPages}
        </div>
      </div>
      
      <div className="glass-panel p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[#B0B3BA] text-sm font-medium">
                <th className="text-left pb-4">Title</th>
                <th className="text-left pb-4">Type</th>
                <th className="text-center pb-4">Responses</th>
                <th className="text-right pb-4">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {currentEngagements.map((engagement) => (
                <tr
                  key={engagement.id}
                  onClick={() => navigate(`/dashboard/engagements/${engagement.id}`)}
                  className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors cursor-pointer"
                >
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-white/10">
                        <img
                          src={engagement.thumbnail}
                          alt={engagement.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium hover:text-[#72A0D6] transition-colors">
                        {engagement.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`${getTypeColor(engagement.type)} font-medium`}>
                      {engagement.type}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-[#FFE8AC] font-medium">
                      {engagement.responseCount}
                    </span>
                  </td>
                  <td className="py-4 text-right text-[#B0B3BA]">
                    {formatDate(engagement.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemCount={engagements.length}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}
      </div>
    </div>
  );
};

export const EngagementOverviewTable: React.FC = () => {
  const [filters, setFilters] = useState({
    period: 'month',
    type: 'all'
  });

  const activeEngagements = engagements.filter(e => e.status === 'active');
  const pastEngagements = engagements.filter(e => e.status === 'past');

  return (
    <div className="glass-panel p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Engagement Overview</h2>
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
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="questionnaire">Questionnaire</option>
              <option value="rating">Rating</option>
              <option value="multi">Multi-answer</option>
              <option value="single">Single Answer</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <EngagementTable
          engagements={activeEngagements}
          title="Active Engagements"
          titleColor="text-[#28E0B9]"
        />

        <EngagementTable
          engagements={pastEngagements}
          title="Past Engagements"
          titleColor="text-[#B0B3BA]"
        />
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#72A0D6]" />
              <span>Questionnaire</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#FFE8AC]" />
              <span>Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#28E0B9]" />
              <span>Multi-answer</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#4BAA4A]" />
              <span>Single Answer</span>
            </div>
          </div>
          <div className="text-[#B0B3BA]">
            Total Engagements: {engagements.length}
          </div>
        </div>
      </div>
    </div>
  );
};
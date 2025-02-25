import React, { useState } from 'react';
import { Calendar, Filter, FileText, BookOpen, FileEdit, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Extended content data with status and more items
const allContent = [
  // Active Content
  {
    id: 1,
    title: 'Market Trends Report 2024',
    content_type: 'Summary Report',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&q=80&fit=crop',
    published_date: 'April 5, 2024',
    author: {
      name: 'David Kim',
      role: 'Market Analyst',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
    },
    views: 5230,
    engagement_rate: '92%'
  },
  {
    id: 2,
    title: 'Q1 Investment Insights',
    content_type: 'Article',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&q=80&fit=crop',
    published_date: 'March 28, 2024',
    author: {
      name: 'Sofia Martinez',
      role: 'Investment Strategist',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop'
    },
    views: 3860,
    engagement_rate: '88%'
  },
  {
    id: 3,
    title: 'TechVision AI Series A Update',
    content_type: 'Deal Update',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&q=80&fit=crop',
    published_date: 'April 12, 2024',
    author: {
      name: 'Alice Richardson',
      role: 'Deal Lead',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
    },
    views: 7120,
    engagement_rate: '95%'
  },
  {
    id: 4,
    title: 'Investment Strategies 2024',
    content_type: 'Summary Report',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&q=80&fit=crop',
    published_date: 'April 8, 2024',
    author: {
      name: 'James Walker',
      role: 'Portfolio Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop'
    },
    views: 4580,
    engagement_rate: '87%'
  },
  {
    id: 5,
    title: 'Emerging Markets Analysis',
    content_type: 'Article',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&q=80&fit=crop',
    published_date: 'April 15, 2024',
    author: {
      name: 'Emily Chen',
      role: 'Market Researcher',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
    },
    views: 2890,
    engagement_rate: '84%'
  },
  {
    id: 6,
    title: 'Future of Fintech Report',
    content_type: 'Summary Report',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&q=80&fit=crop',
    published_date: 'April 18, 2024',
    author: {
      name: 'Michael Brown',
      role: 'Technology Analyst',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&q=80&fit=crop'
    },
    views: 1890,
    engagement_rate: '82%'
  },
  // Past Content
  {
    id: 7,
    title: 'Q4 2023 Market Review',
    content_type: 'Summary Report',
    status: 'past',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&q=80&fit=crop',
    published_date: 'January 5, 2024',
    author: {
      name: 'Sarah Lee',
      role: 'Market Analyst',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&q=80&fit=crop'
    },
    views: 8920,
    engagement_rate: '91%'
  },
  {
    id: 8,
    title: '2023 Investment Recap',
    content_type: 'Article',
    status: 'past',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&q=80&fit=crop',
    published_date: 'December 28, 2023',
    author: {
      name: 'Thomas Anderson',
      role: 'Investment Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&q=80&fit=crop'
    },
    views: 7450,
    engagement_rate: '89%'
  },
  {
    id: 9,
    title: 'Year-End Portfolio Analysis',
    content_type: 'Summary Report',
    status: 'past',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&q=80&fit=crop',
    published_date: 'December 15, 2023',
    author: {
      name: 'Emma Wilson',
      role: 'Portfolio Analyst',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
    },
    views: 6230,
    engagement_rate: '86%'
  }
];

const getContentTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'article':
      return Newspaper;
    case 'summary report':
      return FileText;
    case 'deal update':
      return FileEdit;
    default:
      return BookOpen;
  }
};

const getContentTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'summary report':
      return 'text-[#72A0D6]';
    case 'article':
      return 'text-[#FFE8AC]';
    case 'deal update':
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
  <div className="flex justify-between items-center mt-4">
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

const ContentTable: React.FC<{
  content: typeof allContent;
  title: string;
  titleColor?: string;
}> = ({ content, title, titleColor = 'text-white' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContent = content.slice(startIndex, endIndex);
  const totalPages = Math.ceil(content.length / itemsPerPage);

  const handleContentClick = (contentId: number) => {
    navigate(`/content/${contentId}`);
  };

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-medium ${titleColor}`}>{title}</h3>
      <table className="w-full">
        <thead>
          <tr className="text-[#B0B3BA] text-sm font-medium">
            <th className="text-left pb-4">Content</th>
            <th className="text-left pb-4">Type</th>
            <th className="text-left pb-4">Author</th>
            <th className="text-left pb-4">Published Date</th>
          </tr>
        </thead>
        <tbody className="font-light">
          {currentContent.map((item) => {
            const ContentTypeIcon = getContentTypeIcon(item.content_type);
            return (
              <tr 
                key={item.id} 
                className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors cursor-pointer"
                onClick={() => handleContentClick(item.id)}
              >
                <td className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 rounded-lg overflow-hidden ring-2 ring-white/10">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium hover:text-[#72A0D6] transition-colors">
                        {item.title}
                      </div>
                      <div className="text-sm text-[#B0B3BA] mt-1">
                        {item.views.toLocaleString()} views
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <ContentTypeIcon className={`w-4 h-4 ${getContentTypeColor(item.content_type)}`} />
                    <span className={`${getContentTypeColor(item.content_type)} font-medium`}>
                      {item.content_type}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10">
                      <img 
                        src={item.author.image} 
                        alt={item.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{item.author.name}</div>
                      <div className="text-sm text-[#B0B3BA]">{item.author.role}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-[#B0B3BA]">{item.published_date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemCount={content.length}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      )}
    </div>
  );
};

export const ContentOverviewTable: React.FC = () => {
  const [filters, setFilters] = useState({
    period: 'month',
    type: 'all',
    sort: 'date'
  });

  const activeContent = allContent.filter(item => item.status === 'active');
  const pastContent = allContent.filter(item => item.status === 'past');

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Content Overview</h2>
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
              <option value="article">Articles</option>
              <option value="summary_report">Summary Reports</option>
              <option value="deal_update">Deal Updates</option>
            </select>
          </div>
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <select
              value={filters.sort}
              onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        {/* Active Content Section */}
        <ContentTable 
          content={activeContent} 
          title="Active Content" 
          titleColor="text-[#28E0B9]"
        />

        {/* Past Content Section */}
        <ContentTable 
          content={pastContent} 
          title="Past Content" 
          titleColor="text-[#B0B3BA]"
        />
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#72A0D6]" />
              <span>Summary Report</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#FFE8AC]" />
              <span>Article</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#28E0B9]" />
              <span>Deal Update</span>
            </div>
          </div>
          <div className="text-[#B0B3BA]">
            Total Content: {allContent.length}
          </div>
        </div>
      </div>
    </div>
  );
};
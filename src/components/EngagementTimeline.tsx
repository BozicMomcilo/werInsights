import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Clock, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

// Sample data - replace with real data from your backend
const generateEngagements = () => {
  const types = ['comment', 'like', 'share'];
  const contentTypes = ['article', 'video', 'webinar'];
  const members = [
    {
      name: 'Alice Richardson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
    },
    {
      name: 'David Kim',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
    },
    {
      name: 'Sofia Martinez',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop'
    },
    {
      name: 'James Walker',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop'
    }
  ];
  const titles = [
    'The Future of Investment Banking',
    'Sustainable Investment Strategies',
    'Market Analysis Q1 2024',
    'Emerging Technologies in Finance',
    'Global Economic Trends'
  ];

  const engagements = [];
  for (let i = 0; i < 50; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    const member = members[Math.floor(Math.random() * members.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const date = new Date();
    date.setMinutes(date.getMinutes() - i * 30); // Each engagement 30 minutes apart

    engagements.push({
      id: i + 1,
      type,
      contentType,
      member,
      title,
      timestamp: date,
    });
  }

  return engagements;
};

const getEngagementIcon = (type: string) => {
  switch (type) {
    case 'comment':
      return MessageSquare;
    case 'like':
      return ThumbsUp;
    case 'share':
      return Share2;
    default:
      return MessageSquare;
  }
};

const getEngagementColor = (type: string) => {
  switch (type) {
    case 'comment':
      return 'text-[#28E0B9]';
    case 'like':
      return 'text-[#FFE8AC]';
    case 'share':
      return 'text-[#72A0D6]';
    default:
      return 'text-white';
  }
};

const getContentTypeColor = (type: string) => {
  switch (type) {
    case 'article':
      return 'text-[#72A0D6]';
    case 'video':
      return 'text-[#FFE8AC]';
    case 'webinar':
      return 'text-[#28E0B9]';
    default:
      return 'text-white';
  }
};

const formatTimestamp = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

export const EngagementTimeline: React.FC = () => {
  const [engagements] = useState(generateEngagements());
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    type: 'all',
    contentType: 'all'
  });

  const itemsPerPage = 5; // Changed from 10 to 5
  const filteredEngagements = engagements.filter(engagement => {
    if (filter.type !== 'all' && engagement.type !== filter.type) return false;
    if (filter.contentType !== 'all' && engagement.contentType !== filter.contentType) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredEngagements.length / itemsPerPage);
  const currentEngagements = filteredEngagements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="glass-panel p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Recent Engagements</h2>
        <div className="flex items-center space-x-4">
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <select
              value={filter.type}
              onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="comment">Comments</option>
              <option value="like">Likes</option>
              <option value="share">Shares</option>
            </select>
          </div>
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <select
              value={filter.contentType}
              onChange={(e) => setFilter(prev => ({ ...prev, contentType: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Content</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="webinar">Webinars</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {currentEngagements.map((engagement) => {
          const EngagementIcon = getEngagementIcon(engagement.type);
          return (
            <div 
              key={engagement.id}
              className="glass-panel p-4 transition-all duration-300 hover:bg-[#72A0D6]/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10">
                    <img 
                      src={engagement.member.image}
                      alt={engagement.member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{engagement.member.name}</span>
                      <EngagementIcon className={`w-4 h-4 ${getEngagementColor(engagement.type)}`} />
                      <span className={`text-sm ${getContentTypeColor(engagement.contentType)}`}>
                        {engagement.contentType}
                      </span>
                    </div>
                    <div className="text-[#B0B3BA] text-sm mt-1">
                      {engagement.title}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-[#B0B3BA] text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  {formatTimestamp(engagement.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-[#B0B3BA]">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredEngagements.length)} of {filteredEngagements.length} engagements
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="glass-panel p-2 disabled:opacity-50 button-hover"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`glass-panel px-4 py-2 ${
                  currentPage === pageNumber ? 'bg-[#72A0D6]/20 text-white' : 'text-[#B0B3BA]'
                } button-hover`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="glass-panel p-2 disabled:opacity-50 button-hover"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Calendar, Filter, MessageSquare, ThumbsUp, PenSquare, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { EngagementResponseList } from './EngagementResponseList';

const engagements = [
  {
    id: 1,
    member_name: 'Alice Richardson',
    engagement_type: 'Comment',
    interaction_count: '58',
    last_engagement: 'April 5, 2024',
    top_activity: 'Deal Discussions',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 2,
    member_name: 'David Kim',
    engagement_type: 'Like',
    interaction_count: '72',
    last_engagement: 'March 28, 2024',
    top_activity: 'Market Reports',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 3,
    member_name: 'Sofia Martinez',
    engagement_type: 'Post',
    interaction_count: '35',
    last_engagement: 'April 12, 2024',
    top_activity: 'Investment Strategies',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 4,
    member_name: 'James Walker',
    engagement_type: 'Share',
    interaction_count: '42',
    last_engagement: 'April 8, 2024',
    top_activity: 'Tech Investments',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 5,
    member_name: 'Emily Chen',
    engagement_type: 'Comment',
    interaction_count: '63',
    last_engagement: 'April 15, 2024',
    top_activity: 'Market Analysis',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
  }
];

const getEngagementTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'comment':
      return MessageSquare;
    case 'like':
      return ThumbsUp;
    case 'post':
      return PenSquare;
    case 'share':
      return Share2;
    default:
      return MessageSquare;
  }
};

const getEngagementTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'post':
      return 'text-[#72A0D6]';
    case 'like':
      return 'text-[#FFE8AC]';
    case 'comment':
      return 'text-[#28E0B9]';
    case 'share':
      return 'text-[#B475E0]';
    default:
      return 'text-white';
  }
};

const ITEMS_PER_PAGE = 5;

export const EngagementOverviewTable: React.FC = () => {
  const [filters, setFilters] = useState({
    period: 'month',
    type: 'all',
    sort: 'interactions'
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(engagements.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = engagements.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
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
                <option value="post">Posts</option>
                <option value="like">Likes</option>
                <option value="comment">Comments</option>
                <option value="share">Shares</option>
              </select>
            </div>
            <div className="glass-panel px-4 py-2 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <select
                value={filters.sort}
                onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                className="bg-transparent border-none text-sm focus:outline-none"
              >
                <option value="interactions">Sort by Interactions</option>
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </div>
        
        <table className="w-full">
          <thead>
            <tr className="text-[#B0B3BA] text-sm font-medium">
              <th className="text-left pb-4">Member Name</th>
              <th className="text-left pb-4">Engagement Type</th>
              <th className="text-left pb-4">Interaction Count</th>
              <th className="text-left pb-4">Last Engagement</th>
              <th className="text-left pb-4">Top Activity</th>
            </tr>
          </thead>
          <tbody className="font-light divide-y divide-white/5">
            {currentItems.map((engagement) => {
              const EngagementTypeIcon = getEngagementTypeIcon(engagement.engagement_type);
              return (
                <tr 
                  key={engagement.id} 
                  className="hover:bg-[#72A0D6]/5 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10">
                        <img 
                          src={engagement.image} 
                          alt={engagement.member_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="hover:text-[#72A0D6] cursor-pointer transition-colors">
                        {engagement.member_name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <EngagementTypeIcon className={`w-4 h-4 ${getEngagementTypeColor(engagement.engagement_type)}`} />
                      <span className={`${getEngagementTypeColor(engagement.engagement_type)} font-medium`}>
                        {engagement.engagement_type}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">{engagement.interaction_count}</td>
                  <td className="py-4">{engagement.last_engagement}</td>
                  <td className="py-4">{engagement.top_activity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
          <div className="text-sm text-[#B0B3BA]">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, engagements.length)} of {engagements.length} items
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="glass-panel p-2 disabled:opacity-50 button-hover"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`glass-panel px-4 py-2 ${
                  currentPage === number ? 'bg-[#72A0D6]/20 text-white' : 'text-[#B0B3BA]'
                } button-hover`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="glass-panel p-2 disabled:opacity-50 button-hover"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-sm text-[#B0B3BA]">
          <div className="font-medium text-white mb-3">Engagement Types:</div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <PenSquare className="w-4 h-4 text-[#72A0D6]" />
              <span>Posts</span>
            </div>
            <div className="flex items-center space-x-2">
              <ThumbsUp className="w-4 h-4 text-[#FFE8AC]" />
              <span>Likes</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-[#28E0B9]" />
              <span>Comments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Share2 className="w-4 h-4 text-[#B475E0]" />
              <span>Shares</span>
            </div>
          </div>
        </div>
      </div>

      <EngagementResponseList />
    </div>
  );
};
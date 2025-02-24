import React, { useState } from 'react';
import { Calendar, Filter, FileText, PlayCircle, FileSpreadsheet } from 'lucide-react';

const content = [
  {
    id: 1,
    title: 'Market Trends Report 2024',
    content_type: 'Report',
    engagements: '5,230 Views',
    published_date: 'April 5, 2024',
    author: 'David Kim',
    author_image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 2,
    title: 'Q1 Investment Insights',
    content_type: 'Article',
    engagements: '3,860 Reads',
    published_date: 'March 28, 2024',
    author: 'Sofia Martinez',
    author_image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 3,
    title: 'Future of GreenTech',
    content_type: 'Video',
    engagements: '7,120 Views',
    published_date: 'April 12, 2024',
    author: 'Alice Richardson',
    author_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 4,
    title: 'Investment Strategies 2024',
    content_type: 'Report',
    engagements: '4,580 Views',
    published_date: 'April 8, 2024',
    author: 'James Walker',
    author_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 5,
    title: 'Emerging Markets Analysis',
    content_type: 'Article',
    engagements: '2,890 Reads',
    published_date: 'April 15, 2024',
    author: 'Emily Chen',
    author_image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
  }
];

const getContentTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'article':
      return FileText;
    case 'video':
      return PlayCircle;
    case 'report':
      return FileSpreadsheet;
    default:
      return FileText;
  }
};

const getContentTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'report':
      return 'text-[#72A0D6]';
    case 'article':
      return 'text-[#FFE8AC]';
    case 'video':
      return 'text-[#28E0B9]';
    default:
      return 'text-white';
  }
};

export const ContentOverviewTable: React.FC = () => {
  const [filters, setFilters] = useState({
    period: 'month',
    type: 'all',
    sort: 'date'
  });

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
              <option value="video">Videos</option>
              <option value="report">Reports</option>
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
              <option value="engagement">Sort by Engagement</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>
      </div>
      
      <table className="w-full">
        <thead>
          <tr className="text-[#B0B3BA] text-sm font-medium">
            <th className="text-left pb-4">Title</th>
            <th className="text-left pb-4">Content Type</th>
            <th className="text-left pb-4">Engagements</th>
            <th className="text-left pb-4">Published Date</th>
            <th className="text-left pb-4">Author</th>
          </tr>
        </thead>
        <tbody className="font-light">
          {content.map((item) => {
            const ContentTypeIcon = getContentTypeIcon(item.content_type);
            return (
              <tr 
                key={item.id} 
                className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <ContentTypeIcon className={`w-5 h-5 ${getContentTypeColor(item.content_type)}`} />
                    <span className="hover:text-[#72A0D6] cursor-pointer transition-colors">
                      {item.title}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`${getContentTypeColor(item.content_type)} font-medium`}>
                    {item.content_type}
                  </span>
                </td>
                <td className="py-4">{item.engagements}</td>
                <td className="py-4">{item.published_date}</td>
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10">
                      <img 
                        src={item.author_image} 
                        alt={item.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{item.author}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
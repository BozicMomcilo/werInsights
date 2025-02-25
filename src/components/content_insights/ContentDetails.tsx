import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Users, Eye, BookOpen, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample readers data - expanded for pagination demonstration
const readers = [
  {
    id: 1,
    name: 'Alice Richardson',
    role: 'Senior Investor',
    readDate: '2024-04-20T15:30:00',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 2,
    name: 'David Kim',
    role: 'Portfolio Manager',
    readDate: '2024-04-20T14:45:00',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 3,
    name: 'Sofia Martinez',
    role: 'Investment Analyst',
    readDate: '2024-04-20T13:15:00',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 4,
    name: 'James Walker',
    role: 'Market Researcher',
    readDate: '2024-04-20T12:30:00',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 5,
    name: 'Emily Chen',
    role: 'Investment Director',
    readDate: '2024-04-20T11:45:00',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 6,
    name: 'Michael Brown',
    role: 'Portfolio Analyst',
    readDate: '2024-04-20T11:30:00',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 7,
    name: 'Sarah Lee',
    role: 'Investment Manager',
    readDate: '2024-04-20T11:15:00',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 8,
    name: 'Thomas Anderson',
    role: 'Senior Analyst',
    readDate: '2024-04-20T11:00:00',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&q=80&fit=crop'
  }
];

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
  <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
    <div className="text-sm text-[#B0B3BA]">
      Showing {startIndex + 1} to {Math.min(endIndex, itemCount)} of {itemCount} readers
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

const getContentDetails = (id: string) => {
  // This would normally fetch from your backend
  return {
    id: parseInt(id),
    title: 'Market Trends Report 2024',
    content_type: 'Summary Report',
    status: 'active',
    description: 'A comprehensive analysis of market trends and investment opportunities for 2024, focusing on emerging technologies and sustainable investments.',
    image: 'https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=1200&h=400&fit=crop',
    published_date: 'April 5, 2024',
    author: {
      name: 'David Kim',
      role: 'Market Analyst',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
    },
    metrics: {
      total_reads: 5230,
      unique_readers: 4150,
      average_time: '8.5 minutes',
      completion_rate: '87%'
    },
    readers: readers
  };
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const ContentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const content = getContentDetails(id!);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReaders = content.readers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(content.readers.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="glass-panel p-2 hover:bg-[#72A0D6]/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-medium">{content.title}</h1>
      </div>

      {/* Content Banner */}
      <div className="glass-panel overflow-hidden">
        <div 
          className="w-full h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url(${content.image})` }}
        />
      </div>

      {/* Content Info */}
      <div className="grid grid-cols-3 gap-6">
        <div className="glass-panel p-6 col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-5 h-5 text-[#72A0D6]" />
            <h2 className="text-lg font-medium">{content.content_type}</h2>
          </div>
          <p className="text-[#B0B3BA] leading-relaxed">
            {content.description}
          </p>
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
                <img 
                  src={content.author.image} 
                  alt={content.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{content.author.name}</div>
                <div className="text-sm text-[#B0B3BA]">{content.author.role}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium mb-4">Content Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-[#72A0D6]" />
                <span className="text-[#B0B3BA]">Total Reads</span>
              </div>
              <span className="font-medium">{content.metrics.total_reads}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#72A0D6]" />
                <span className="text-[#B0B3BA]">Unique Readers</span>
              </div>
              <span className="font-medium">{content.metrics.unique_readers}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#72A0D6]" />
                <span className="text-[#B0B3BA]">Average Time</span>
              </div>
              <span className="font-medium">{content.metrics.average_time}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#72A0D6]" />
                <span className="text-[#B0B3BA]">Completion Rate</span>
              </div>
              <span className="font-medium">{content.metrics.completion_rate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Readers List */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-medium mb-6">Recent Readers</h3>
        <div className="space-y-4">
          {currentReaders.map((reader) => (
            <div 
              key={reader.id}
              className="flex items-center justify-between p-4 glass-panel hover:bg-[#72A0D6]/5 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10">
                  <img 
                    src={reader.image} 
                    alt={reader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{reader.name}</div>
                  <div className="text-sm text-[#B0B3BA]">{reader.role}</div>
                </div>
              </div>
              <div className="text-sm text-[#B0B3BA]">
                {formatDate(reader.readDate)}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemCount={content.readers.length}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}
      </div>
    </div>
  );
};
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import { EngagementResponseList } from './EngagementResponseList';

// Sample detailed engagement data - replace with real data from your backend
const getEngagementDetails = (id: string) => ({
  id: parseInt(id),
  title: 'Investment Strategy Survey 2024',
  description: 'Annual survey to gather insights on investment preferences and market outlook',
  type: 'Multi-Question',
  image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop',
  createdAt: '2024-04-20T10:00:00',
  metrics: {
    totalResponses: 156,
    averageCompletionTime: '8.5 minutes',
    completionRate: '87%'
  },
  creator: {
    name: 'David Kim',
    role: 'Market Analyst',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
  }
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const EngagementDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const details = getEngagementDetails(id!);

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
        <h1 className="text-2xl font-medium">{details.title}</h1>
      </div>

      {/* Engagement Banner */}
      <div className="glass-panel overflow-hidden">
        <div 
          className="w-full h-[300px] bg-cover bg-center"
          style={{ backgroundImage: `url(${details.image})` }}
        />
      </div>

      {/* Engagement Info */}
      <div className="grid grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
              <img
                src={details.creator.image}
                alt={details.creator.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-lg">{details.creator.name}</div>
              <div className="text-[#B0B3BA]">{details.creator.role}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Created On</div>
                <div>{formatDate(details.createdAt)}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Type</div>
                <div>{details.type}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium mb-4">Engagement Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-[#B0B3BA]">Total Responses</div>
              <div className="text-[#72A0D6] font-medium">{details.metrics.totalResponses}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-[#B0B3BA]">Average Completion Time</div>
              <div className="text-[#72A0D6] font-medium">{details.metrics.averageCompletionTime}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-[#B0B3BA]">Completion Rate</div>
              <div className="text-[#72A0D6] font-medium">{details.metrics.completionRate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Responses List */}
      <EngagementResponseList />
    </div>
  );
};
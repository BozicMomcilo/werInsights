import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, FileText, Star } from 'lucide-react';

// Sample detailed response data - replace with real data from your backend
const getEngagementDetails = (id: string) => ({
  id: parseInt(id),
  member: {
    name: 'Alice Richardson',
    role: 'Senior Investor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
  },
  questionnaire: {
    title: 'Investment Strategy Survey 2024',
    description: 'Annual survey to gather insights on investment preferences and market outlook',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop',
    type: 'Multi-Question'
  },
  completedAt: '2024-04-20T10:00:00',
  responses: [
    {
      question: 'What is your preferred investment sector for 2024?',
      type: 'multiple_choice',
      answer: 'Technology',
      options: ['Technology', 'Healthcare', 'Renewable Energy', 'Financial Services']
    },
    {
      question: 'Rate your confidence in the market outlook for 2024',
      type: 'rating',
      answer: 4,
      scale: 5,
      label: 'Very Confident'
    },
    {
      question: 'What is your target investment horizon?',
      type: 'single_choice',
      answer: '3-5 years',
      options: ['1-2 years', '3-5 years', '5-10 years', '10+ years']
    },
    {
      question: 'Which emerging technologies are you most interested in?',
      type: 'multiple_select',
      answer: ['Artificial Intelligence', 'Blockchain', 'Quantum Computing'],
      options: ['Artificial Intelligence', 'Blockchain', 'Quantum Computing', 'Biotechnology', 'Clean Energy']
    },
    {
      question: 'Additional comments on your investment strategy',
      type: 'text',
      answer: 'Focusing on high-growth technology companies with strong fundamentals and clear path to profitability.'
    }
  ]
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

const getResponseDisplay = (response: any) => {
  switch (response.type) {
    case 'rating':
      return (
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {Array.from({ length: response.scale }, (_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < response.answer ? 'text-[#FFE8AC] fill-[#FFE8AC]' : 'text-[#B0B3BA]'
                }`}
              />
            ))}
          </div>
          <span className="text-[#FFE8AC] ml-2">{response.label}</span>
        </div>
      );
    case 'multiple_select':
      return (
        <div className="space-y-2">
          {response.answer.map((item: string, index: number) => (
            <div
              key={index}
              className="glass-panel px-3 py-1 inline-block mr-2 text-[#72A0D6]"
            >
              {item}
            </div>
          ))}
        </div>
      );
    case 'text':
      return (
        <div className="glass-panel p-4 text-[#B0B3BA]">
          {response.answer}
        </div>
      );
    default:
      return (
        <div className="text-[#72A0D6] font-medium">
          {Array.isArray(response.answer) ? response.answer.join(', ') : response.answer}
        </div>
      );
  }
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
        <h1 className="text-2xl font-medium">{details.questionnaire.title}</h1>
      </div>

      {/* Questionnaire Banner */}
      <div className="glass-panel overflow-hidden">
        <div 
          className="w-full h-[300px] bg-cover bg-center"
          style={{ backgroundImage: `url(${details.questionnaire.image})` }}
        />
      </div>

      {/* Response Overview */}
      <div className="grid grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
              <img
                src={details.member.image}
                alt={details.member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-lg">{details.member.name}</div>
              <div className="text-[#B0B3BA]">{details.member.role}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Completed On</div>
                <div>{formatDate(details.completedAt)}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Questionnaire Type</div>
                <div>{details.questionnaire.type}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium mb-4">Questionnaire Description</h3>
          <p className="text-[#B0B3BA] leading-relaxed">
            {details.questionnaire.description}
          </p>
        </div>
      </div>

      {/* Responses */}
      <div className="glass-panel p-6">
        <h2 className="text-xl font-medium mb-6">Responses</h2>
        <div className="space-y-6">
          {details.responses.map((response, index) => (
            <div
              key={index}
              className="glass-panel p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h4 className="font-medium">{response.question}</h4>
                  <div className="text-sm text-[#B0B3BA]">
                    Type: {response.type.replace('_', ' ').charAt(0).toUpperCase() + response.type.slice(1)}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                {getResponseDisplay(response)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
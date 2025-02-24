import React, { useState } from 'react';
import { Calendar, Filter, } from 'lucide-react';

const attendees = [
  {
    id: 1,
    name: 'Alice Richardson',
    company: 'Venture Capital Partners',
    event: 'Investor Roundtable – Q2 2024',
    status: 'Confirmed',
    rsvpDate: 'April 5, 2024',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 2,
    name: 'David Kim',
    company: 'Horizon Investments',
    event: 'Private Deal Briefing – FinTech',
    status: 'Maybe',
    rsvpDate: 'March 28, 2024',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 3,
    name: 'Sofia Martinez',
    company: 'GreenTech Solutions',
    event: 'Industry Conference – Sustainable Investing',
    status: 'Confirmed',
    rsvpDate: 'April 12, 2024',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 4,
    name: 'James Walker',
    company: 'Infinity Wealth Group',
    event: 'Networking Social – Emerging Markets',
    status: 'Declined',
    rsvpDate: 'April 8, 2024',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 5,
    name: 'Emily Chen',
    company: 'Future Fund Management',
    event: 'Investor Roundtable – Q2 2024',
    status: 'Pending',
    rsvpDate: 'April 15, 2024',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'text-[#28E0B9]';
    case 'maybe':
      return 'text-[#FFE8AC]';
    case 'declined':
      return 'text-[#FF3B3B]';
    case 'pending':
      return 'text-[#B0B3BA]';
    default:
      return 'text-white';
  }
};

export const EventsOverview: React.FC = () => {
  const [filters, setFilters] = useState({
    period: 'month',
    status: 'all',
    event: 'all'
  });

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Events Overview</h2>
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
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="maybe">Maybe</option>
              <option value="declined">Declined</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <select
              value={filters.event}
              onChange={(e) => setFilters(prev => ({ ...prev, event: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Events</option>
              <option value="roundtable">Investor Roundtable</option>
              <option value="briefing">Deal Briefing</option>
              <option value="conference">Industry Conference</option>
              <option value="social">Networking Social</option>
            </select>
          </div>
        </div>
      </div>
      
      <table className="w-full">
        <thead>
          <tr className="text-[#B0B3BA] text-sm font-medium">
            <th className="text-left pb-4">Full name</th>
            <th className="text-left pb-4">Company</th>
            <th className="text-left pb-4">Event</th>
            <th className="text-left pb-4">Status</th>
            <th className="text-left pb-4">RSVP Date</th>
          </tr>
        </thead>
        <tbody className="font-light">
          {attendees.map((attendee) => (
            <tr 
              key={attendee.id} 
              className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors"
            >
              <td className="py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10">
                    <img 
                      src={attendee.image} 
                      alt={attendee.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{attendee.name}</span>
                </div>
              </td>
              <td className="py-4">{attendee.company}</td>
              <td className="py-4">{attendee.event}</td>
              <td className="py-4">
                <span className={`${getStatusColor(attendee.status)} font-medium`}>
                  {attendee.status}
                </span>
              </td>
              <td className="py-4">{attendee.rsvpDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
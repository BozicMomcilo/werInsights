import React, { useState } from 'react';
import { Calendar, Filter, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Expanded events array with more items for pagination
const events = [
  {
    id: 1,
    title: 'Q2 2024 Founder Meetup',
    type: 'Founder Event',
    dueDate: 'April 25, 2024',
    accepted: 45,
    declined: 12,
    maybe: 8,
    totalInvited: 85,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 2,
    title: 'Tech Investment Webinar',
    type: 'Online Event',
    dueDate: 'April 28, 2024',
    accepted: 128,
    declined: 34,
    maybe: 22,
    totalInvited: 250,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 3,
    title: 'Startup Pitch Day',
    type: 'Founder Event',
    dueDate: 'May 5, 2024',
    accepted: 75,
    declined: 15,
    maybe: 10,
    totalInvited: 120,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 4,
    title: 'Investment Strategy Workshop',
    type: 'Online Event',
    dueDate: 'May 12, 2024',
    accepted: 95,
    declined: 25,
    maybe: 15,
    totalInvited: 180,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 5,
    title: 'Networking Mixer',
    type: 'Founder Event',
    dueDate: 'May 15, 2024',
    accepted: 62,
    declined: 18,
    maybe: 12,
    totalInvited: 100,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 6,
    title: 'AI in Finance Summit',
    type: 'Online Event',
    dueDate: 'May 20, 2024',
    accepted: 150,
    declined: 30,
    maybe: 25,
    totalInvited: 300,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 7,
    title: 'Venture Capital Forum',
    type: 'Founder Event',
    dueDate: 'May 25, 2024',
    accepted: 85,
    declined: 20,
    maybe: 15,
    totalInvited: 150,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 8,
    title: 'Blockchain Technology Meetup',
    type: 'Online Event',
    dueDate: 'June 1, 2024',
    accepted: 110,
    declined: 28,
    maybe: 18,
    totalInvited: 200,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=160&h=160&q=80&fit=crop'
  }
];

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'Founder Event':
      return 'text-[#72A0D6]';
    case 'Online Event':
      return 'text-[#28E0B9]';
    default:
      return 'text-white';
  }
};

const getResponseRateColor = (accepted: number, total: number) => {
  const rate = (accepted / total) * 100;
  if (rate >= 70) return 'text-[#28E0B9]';
  if (rate >= 40) return 'text-[#FFE8AC]';
  return 'text-[#FF3B3B]';
};

export const EventsOverview: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    period: 'month',
    type: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEventClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

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
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Events</option>
              <option value="founder">Founder Events</option>
              <option value="online">Online Events</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[#B0B3BA] text-sm font-medium">
              <th className="text-left pb-4">Event Title</th>
              <th className="text-left pb-4">Event Type</th>
              <th className="text-left pb-4">Due Date</th>
              <th className="text-center pb-4">Accepted</th>
              <th className="text-center pb-4">Declined</th>
              <th className="text-center pb-4">Maybe</th>
              <th className="text-right pb-4">Response Rate</th>
            </tr>
          </thead>
          <tbody className="font-light">
            {currentEvents.map((event) => {
              const responseRate = ((event.accepted / event.totalInvited) * 100).toFixed(1);
              return (
                <tr 
                  key={event.id} 
                  className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors cursor-pointer"
                  onClick={() => handleEventClick(event.id)}
                >
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium whitespace-nowrap">{event.title}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`${getEventTypeColor(event.type)} font-medium`}>
                      {event.type}
                    </span>
                  </td>
                  <td className="py-4 whitespace-nowrap">{event.dueDate}</td>
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="w-4 h-4 text-[#28E0B9]" />
                      <span className="text-[#28E0B9] font-medium">{event.accepted}</span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="w-4 h-4 text-[#FF3B3B]" />
                      <span className="text-[#FF3B3B] font-medium">{event.declined}</span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="w-4 h-4 text-[#FFE8AC]" />
                      <span className="text-[#FFE8AC] font-medium">{event.maybe}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <span className={`${getResponseRateColor(event.accepted, event.totalInvited)} font-medium`}>
                      {responseRate}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-[#B0B3BA]">
          Showing {indexOfFirstEvent + 1} to {Math.min(indexOfLastEvent, events.length)} of {events.length} events
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="glass-panel p-2 disabled:opacity-50 button-hover"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`glass-panel px-4 py-2 ${
                currentPage === number ? 'bg-[#72A0D6]/20 text-white' : 'text-[#B0B3BA]'
              } button-hover`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="glass-panel p-2 disabled:opacity-50 button-hover"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#72A0D6]" />
              <span>Founder Event</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#28E0B9]" />
              <span>Online Event</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
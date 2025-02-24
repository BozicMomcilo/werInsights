import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Users } from 'lucide-react';

// Sample attendee data
const attendees = {
  accepted: [
    { id: 1, name: 'Alice Richardson', company: 'Venture Capital Partners', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop' },
    { id: 2, name: 'David Kim', company: 'Horizon Investments', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop' },
    { id: 3, name: 'Sofia Martinez', company: 'GreenTech Solutions', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop' }
  ],
  declined: [
    { id: 4, name: 'James Walker', company: 'Infinity Wealth Group', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop' },
    { id: 5, name: 'Emily Chen', company: 'Future Fund Management', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop' }
  ],
  maybe: [
    { id: 6, name: 'Michael Brown', company: 'Tech Ventures', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&q=80&fit=crop' },
    { id: 7, name: 'Sarah Lee', company: 'Innovation Capital', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&q=80&fit=crop' }
  ]
};

const AttendeeTable: React.FC<{ attendees: typeof attendees.accepted; status: string }> = ({ attendees, status }) => (
  <div className="glass-panel p-6 mt-6">
    <h3 className="text-lg font-medium mb-4">{status} ({attendees.length})</h3>
    <table className="w-full">
      <thead>
        <tr className="text-[#B0B3BA] text-sm font-medium">
          <th className="text-left pb-4">Attendee</th>
          <th className="text-left pb-4">Company</th>
        </tr>
      </thead>
      <tbody className="font-light">
        {attendees.map((attendee) => (
          <tr key={attendee.id} className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors">
            <td className="py-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10">
                  <img 
                    src={attendee.image} 
                    alt={attendee.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium">{attendee.name}</span>
              </div>
            </td>
            <td className="py-4">{attendee.company}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the event from the events array (you'll need to move this to a shared location)
  const event = {
    id: 1,
    title: 'Q2 2024 Founder Meetup',
    type: 'Founder Event',
    date: 'April 25, 2024',
    time: '2:00 PM - 5:00 PM EST',
    location: 'Innovation Hub',
    address: '123 Tech Avenue, Silicon Valley, CA',
    description: 'Join us for an exclusive gathering of founders and investors to discuss the latest trends in technology and venture capital.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop',
    locationImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
  };

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
        <h1 className="text-2xl font-medium">{event.title}</h1>
      </div>

      {/* Event Banner */}
      <div className="glass-panel overflow-hidden">
        <div 
          className="w-full h-[300px] bg-cover bg-center"
          style={{ backgroundImage: `url(${event.image})` }}
        />
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-3 gap-6">
        <div className="glass-panel p-6 col-span-2">
          <h2 className="text-xl font-medium mb-4">Event Details</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-[#72A0D6]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-[#72A0D6]" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#72A0D6] flex-shrink-0" />
              <div>
                <div className="font-medium">{event.location}</div>
                <div className="text-[#B0B3BA]">{event.address}</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-[#B0B3BA] leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-xl font-medium mb-4">Location</h2>
          <div 
            className="w-full h-[200px] rounded-lg bg-cover bg-center mb-4"
            style={{ backgroundImage: `url(${event.locationImage})` }}
          />
          <div className="text-sm text-[#B0B3BA]">
            <div className="font-medium text-white mb-1">{event.location}</div>
            {event.address}
          </div>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="glass-panel p-6">
        <h2 className="text-xl font-medium mb-6">Attendance Overview</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="glass-panel p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="w-5 h-5 text-[#28E0B9]" />
              <span className="text-[#B0B3BA]">Accepted</span>
            </div>
            <div className="text-2xl font-semibold text-[#28E0B9]">
              {attendees.accepted.length}
            </div>
          </div>
          <div className="glass-panel p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="w-5 h-5 text-[#FFE8AC]" />
              <span className="text-[#B0B3BA]">Maybe</span>
            </div>
            <div className="text-2xl font-semibold text-[#FFE8AC]">
              {attendees.maybe.length}
            </div>
          </div>
          <div className="glass-panel p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="w-5 h-5 text-[#FF3B3B]" />
              <span className="text-[#B0B3BA]">Declined</span>
            </div>
            <div className="text-2xl font-semibold text-[#FF3B3B]">
              {attendees.declined.length}
            </div>
          </div>
        </div>
      </div>

      {/* Attendee Lists */}
      <AttendeeTable attendees={attendees.accepted} status="Accepted" />
      <AttendeeTable attendees={attendees.maybe} status="Maybe" />
      <AttendeeTable attendees={attendees.declined} status="Declined" />
    </div>
  );
};
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { Filter, Calendar, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

// Sample event data with updated colors
const eventData = [
  {
    event_type: "Investor Roundtable",
    total_attendees: 450,
    engagement_score: 82,
    follow_up_rate: 60,
    color: "#72A0D6"  // soft blue
  },
  {
    event_type: "Private Deal Briefing",
    total_attendees: 320,
    engagement_score: 89,
    follow_up_rate: 75,
    color: "#FFE8AC"  // warm pastel yellow
  },
  {
    event_type: "Industry Conference",
    total_attendees: 1200,
    engagement_score: 74,
    follow_up_rate: 50,
    color: "#969FA7"  // muted gray-blue
  },
  {
    event_type: "Networking Social",
    total_attendees: 600,
    engagement_score: 91,
    follow_up_rate: 80,
    color: "#CEDCEC"  // light cool blue
  }
];

const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="transition-all duration-300 filter drop-shadow-[0_0_12px_rgba(255,232,172,0.6)]"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 8}
        outerRadius={innerRadius - 2}
        fill={fill}
        className="transition-all duration-300"
      />
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fill="#FFFFFF"
        className="text-sm font-medium drop-shadow-lg"
      >
        {payload.event_type}
      </text>
      <text
        x={cx}
        y={cy + 16}
        textAnchor="middle"
        fill="#FFE8AC"
        className="text-sm font-medium drop-shadow-lg"
      >
        {payload.total_attendees} Attendees
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const totalAttendees = eventData.reduce((acc, curr) => acc + curr.total_attendees, 0);
    const attendeeShare = ((data.total_attendees / totalAttendees) * 100).toFixed(1);
    
    return (
      <div className="glass-panel p-6 min-w-[280px] backdrop-blur-xl bg-[rgba(10,16,26,0.85)] border border-white/20 shadow-2xl">
        <div className="font-medium text-lg mb-3 text-white">{data.event_type}</div>
        <div className="space-y-4">
          <div>
            <div className="text-[#B0B3BA] text-xs mb-1">Total Attendees</div>
            <div className="text-[#FFE8AC] text-lg font-medium">{data.total_attendees}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[#B0B3BA] text-xs mb-1">Engagement Score</div>
              <div className="text-white font-medium">{data.engagement_score}%</div>
            </div>
            <div>
              <div className="text-[#B0B3BA] text-xs mb-1">Follow-up Rate</div>
              <div className="text-white font-medium">{data.follow_up_rate}%</div>
            </div>
          </div>
          <div className="pt-3 border-t border-white/10">
            <div className="text-[#B0B3BA] text-xs mb-1">Share of Total Attendance</div>
            <div className="text-white font-medium">{attendeeShare}%</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const EventParticipationChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [filters, setFilters] = useState({
    period: 'month',
    type: 'all'
  });

  const handleExport = async () => {
    const element = document.getElementById('event-chart');
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'event-participation.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const getTotalAttendees = () => {
    return eventData.reduce((acc, curr) => acc + curr.total_attendees, 0);
  };

  const getAverageEngagement = () => {
    return Math.round(
      eventData.reduce((acc, curr) => acc + curr.engagement_score, 0) / eventData.length
    );
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Event Participation & Engagement</h2>
        <div className="flex items-center space-x-4">
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <select
              value={filters.period}
              onChange={(e) => setFilters(prev => ({ ...prev, period: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
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
              <option value="roundtable">Roundtables</option>
              <option value="briefing">Briefings</option>
              <option value="conference">Conferences</option>
              <option value="social">Social Events</option>
            </select>
          </div>
          <button
            onClick={handleExport}
            className="glass-panel px-4 py-2 flex items-center space-x-2 button-hover"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="flex items-center space-x-6 mb-6 text-sm">
        <div className="glass-panel px-4 py-2">
          <span className="text-[#B0B3BA]">Total Attendees:</span>
          <span className="ml-2 text-[#FFE8AC] font-medium">{getTotalAttendees()}</span>
        </div>
        <div className="glass-panel px-4 py-2">
          <span className="text-[#B0B3BA]">Average Engagement:</span>
          <span className="ml-2 text-[#FFE8AC] font-medium">{getAverageEngagement()}%</span>
        </div>
      </div>

      {/* Radial Chart */}
      <div id="event-chart" className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={eventData}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={140}
              dataKey="total_attendees"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {eventData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="transition-all duration-300 hover:filter hover:brightness-110"
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />}
              wrapperStyle={{ outline: 'none' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="mt-6 space-y-2 text-sm text-[#B0B3BA]">
        <div className="font-medium text-white mb-3">Key Insights:</div>
        <div>✔️ Analyze participation trends across different event types</div>
        <div>✔️ Compare engagement levels to identify high-performing events</div>
        <div>✔️ Measure follow-up rates to track post-event effectiveness</div>
      </div>

      {/* Legend */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-6">
          {eventData.map((event) => (
            <div key={event.event_type} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: event.color }}
              />
              <span className="text-xs whitespace-nowrap">{event.event_type}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-[#B0B3BA]">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
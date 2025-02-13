import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Calendar, Filter, Users } from 'lucide-react';

// World topology data
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// Sample member distribution data
const memberData = {
  "North America": { count: 2450, coordinates: [-100, 40], topType: "HNWI", recentActivity: "+15%" },
  "Europe": { count: 1850, coordinates: [15, 50], topType: "Institutional", recentActivity: "+12%" },
  "Asia-Pacific": { count: 1650, coordinates: [100, 30], topType: "HNWI", recentActivity: "+18%" },
  "Middle East": { count: 950, coordinates: [45, 25], topType: "HNWI", recentActivity: "+8%" },
  "Africa": { count: 550, coordinates: [20, 0], topType: "Institutional", recentActivity: "+5%" },
  "Latin America": { count: 750, coordinates: [-60, -15], topType: "HNWI", recentActivity: "+10%" }
};

// Color scale for choropleth
const colorScale = scaleLinear<string>()
  .domain([0, 2500])
  .range(["#1E354A", "#72A0D6"]);

// Bubble size scale
const bubbleScale = scaleLinear()
  .domain([0, 2500])
  .range([10, 30]);

const CustomTooltip: React.FC<{ region: string; data: any }> = ({ region, data }) => (
  <div className="glass-panel p-4 min-w-[240px] backdrop-blur-xl bg-[rgba(10,16,26,0.85)] border border-white/20 shadow-2xl">
    <div className="font-medium text-lg mb-3 text-white">{region}</div>
    <div className="space-y-3">
      <div>
        <div className="text-[#B0B3BA] text-xs mb-1">Total Members</div>
        <div className="text-[#FFE8AC] text-lg font-medium">{data.count.toLocaleString()}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-[#B0B3BA] text-xs mb-1">Top Member Type</div>
          <div className="text-white font-medium">{data.topType}</div>
        </div>
        <div>
          <div className="text-[#B0B3BA] text-xs mb-1">Recent Growth</div>
          <div className="text-[#28E0B9] font-medium">{data.recentActivity}</div>
        </div>
      </div>
    </div>
  </div>
);

export const MemberDistributionMap: React.FC = () => {
  const [filters, setFilters] = useState({
    period: 'month',
    memberType: 'all',
    region: 'all'
  });

  const [tooltipContent, setTooltipContent] = useState<{ region: string; data: any } | null>(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: any) => {
    setPosition(position);
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="section-title">Member Distribution by Region</h2>
        <div className="flex flex-wrap gap-2">
          {/* Time Period Filter */}
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <select
              value={filters.period}
              onChange={(e) => setFilters(prev => ({ ...prev, period: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="month">Last 30 Days</option>
              <option value="quarter">Quarterly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
          
          {/* Member Type Filter */}
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <select
              value={filters.memberType}
              onChange={(e) => setFilters(prev => ({ ...prev, memberType: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Members</option>
              <option value="hnwi">HNWIs</option>
              <option value="institutional">Institutional</option>
            </select>
          </div>
          
          {/* Region Filter */}
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <select
              value={filters.region}
              onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Regions</option>
              <option value="na">North America</option>
              <option value="eu">Europe</option>
              <option value="apac">Asia-Pacific</option>
              <option value="mea">Middle East & Africa</option>
              <option value="latam">Latin America</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={handleZoomIn}
          className="glass-panel p-2 hover:bg-white/10 transition-colors"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="glass-panel p-2 hover:bg-white/10 transition-colors"
        >
          -
        </button>
      </div>

      {/* Map Container */}
      <div className="relative h-[500px] w-full">
        <ComposableMap
          projection="geoMercator"
          className="w-full h-full"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const regionData = Object.entries(memberData).find(([region]) =>
                    geo.properties.name.includes(region)
                  );
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={regionData ? colorScale(regionData[1].count) : "#1E354A"}
                      stroke="#ffffff10"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#72A0D6" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
            {Object.entries(memberData).map(([region, data]) => (
              <Marker
                key={region}
                coordinates={data.coordinates}
                onMouseEnter={(e) => {
                  setTooltipContent({ region, data });
                  const target = e.target as HTMLElement;
                  target.style.cursor = "pointer";
                }}
                onMouseLeave={(e) => {
                  setTooltipContent(null);
                  const target = e.target as HTMLElement;
                  target.style.cursor = "default";
                }}
              >
                <circle
                  r={bubbleScale(data.count)}
                  fill="#72A0D6"
                  fillOpacity={0.6}
                  stroke="#ffffff"
                  strokeWidth={1}
                  className="transition-all duration-300 hover:fill-opacity-80"
                />
                <text
                  textAnchor="middle"
                  y={4}
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "8px",
                    fill: "#fff",
                    pointerEvents: "none",
                  }}
                >
                  {data.count}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip */}
        {tooltipContent && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >
            <CustomTooltip region={tooltipContent.region} data={tooltipContent.data} />
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div>
            <div className="text-sm font-medium mb-2">Member Density</div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-[#1E354A]" />
                <span className="text-xs">Low</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-[#72A0D6]" />
                <span className="text-xs">High</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-[#B0B3BA]">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
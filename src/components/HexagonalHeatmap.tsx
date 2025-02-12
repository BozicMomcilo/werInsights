import React, { useState, useCallback } from 'react';
import { Calendar, Filter } from 'lucide-react';

// Sample data for hexagonal cells
const generateHexData = () => {
  const data = [];
  const rows = 10;
  const cols = 15;
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const value = Math.random() * 100;
      data.push({
        id: `${i}-${j}`,
        x: j * 60 + (i % 2 ? 30 : 0),
        y: i * 52,
        value,
        deals: Math.floor(Math.random() * 20) + 1,
      });
    }
  }
  return data;
};

const getHexColor = (value: number) => {
  if (value > 75) return '#FFE8AC';
  if (value > 50) return '#72A0D6';
  return '#1E354A';
};

interface FilterState {
  period: string;
  sector: string;
}

export const HexagonalHeatmap: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    period: 'YTD',
    sector: 'All',
  });
  
  const [hexData] = useState(() => generateHexData());
  const [hoveredHex, setHoveredHex] = useState<string | null>(null);

  const renderHexagon = (x: number, y: number, value: number, id: string, deals: number) => {
    const isHovered = hoveredHex === id;
    const color = getHexColor(value);
    
    return (
      <g
        key={id}
        transform={`translate(${x},${y})`}
        onMouseEnter={() => setHoveredHex(id)}
        onMouseLeave={() => setHoveredHex(null)}
        style={{ cursor: 'pointer' }}
      >
        <path
          d="M25,0 L50,14.433756729740645 L50,43.30127018922194 L25,57.735026918962584 L0,43.30127018922194 L0,14.433756729740645 Z"
          fill={color}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          style={{
            transition: 'all 0.3s ease',
            filter: isHovered ? 'brightness(1.3) drop-shadow(0 0 8px rgba(255, 232, 172, 0.6))' : 'none',
          }}
        />
        {isHovered && (
          <foreignObject x="-60" y="-40" width="120" height="80">
            <div className="glass-panel p-2 text-xs text-center">
              <div className="font-medium text-white">{deals} Deals</div>
              <div className="text-[#B0B3BA]">Density: {Math.round(value)}%</div>
            </div>
          </foreignObject>
        )}
      </g>
    );
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Hexagonal Heatmap</h2>
        <div className="flex items-center space-x-4">
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <select
              value={filters.period}
              onChange={(e) => setFilters(prev => ({ ...prev, period: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="YTD">Year to Date</option>
              <option value="Q1">Last Quarter</option>
              <option value="1Y">Last Year</option>
            </select>
          </div>
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <select
              value={filters.sector}
              onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="All">All Sectors</option>
              <option value="Tech">Technology</option>
              <option value="Life">Life Sciences</option>
              <option value="Resilience">Resilience</option>
            </select>
          </div>
        </div>
      </div>

      <div className="relative h-[400px] overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 900 520" preserveAspectRatio="xMidYMid meet">
          {hexData.map(({ id, x, y, value, deals }) => renderHexagon(x, y, value, id, deals))}
        </svg>
      </div>

      <div className="mt-6 space-y-2 text-sm text-[#B0B3BA]">
        <div className="font-medium text-white mb-3">Key Insights:</div>
        <div>✔️ High-density regions indicate concentrated investment activity</div>
        <div>✔️ Color intensity correlates with deal volume and value</div>
        <div>✔️ Hover over hexagons to view detailed metrics</div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-8">
          <div>
            <div className="text-sm font-medium mb-2">Deal Density</div>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-4 bg-gradient-to-r from-[#1E354A] via-[#72A0D6] to-[#FFE8AC] rounded" />
              <div className="flex justify-between w-24text-xs">
                <span>Low</span>
                <span>High</span>
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
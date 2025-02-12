import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { Filter } from 'lucide-react';

// Sample investment data
const investmentData = [
  {
    region: "North America",
    tech: 2400000000,
    life: 1800000000,
    resilience: 900000000
  },
  {
    region: "Europe",
    tech: 1900000000,
    life: 2200000000,
    resilience: 750000000
  },
  {
    region: "Asia-Pacific",
    tech: 3100000000,
    life: 1500000000,
    resilience: 1200000000
  },
  {
    region: "Middle East & Africa",
    tech: 1100000000,
    life: 800000000,
    resilience: 600000000
  }
];

// Region-specific colors
const REGION_COLORS = {
  "North America": "#72A0D6",
  "Europe": "#FFE8AC",
  "Asia-Pacific": "#969FA7",
  "Middle East & Africa": "#CEDCEC"
};

// Sector colors with regional blending
const getSectorColor = (region: string, sector: string) => {
  const baseColor = REGION_COLORS[region];
  switch (sector) {
    case 'tech':
      return `${baseColor}`;
    case 'life':
      return `${baseColor}CC`; // 80% opacity
    case 'resilience':
      return `${baseColor}99`; // 60% opacity
    default:
      return baseColor;
  }
};

const formatValue = (value: number) => {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`;
  }
  return `$${(value / 1000000).toFixed(1)}M`;
};

const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 12}
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
        innerRadius={innerRadius - 12}
        outerRadius={innerRadius - 4}
        fill={fill}
        className="transition-all duration-300"
      />
      <text
        x={cx}
        y={cy - 12}
        textAnchor="middle"
        fill="#FFFFFF"
        className="text-sm font-medium drop-shadow-lg"
      >
        {payload.region}
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fill="#FFE8AC"
        className="text-sm font-medium drop-shadow-lg"
      >
        {formatValue(value)}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = data.tech + data.life + data.resilience;
    const totalAllRegions = investmentData.reduce((acc, curr) => 
      acc + curr.tech + curr.life + curr.resilience, 0
    );
    const regionShare = ((total / totalAllRegions) * 100).toFixed(1);
    
    return (
      <div className="glass-panel p-6 min-w-[240px] backdrop-blur-xl bg-[rgba(10,16,26,0.85)] border border-white/20 shadow-2xl">
        <div className="font-medium text-lg mb-3 text-white">{data.region}</div>
        <div className="space-y-3">
          <div>
            <div className="text-[#B0B3BA] text-xs mb-1">Total Investment</div>
            <div className="text-[#FFE8AC] text-lg font-medium">{formatValue(total)}</div>
          </div>
          <div>
            <div className="text-[#B0B3BA] text-xs mb-2">Global Share</div>
            <div className="text-white font-medium">{regionShare}%</div>
          </div>
          <div className="pt-3 border-t border-white/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#72A0D6] flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#72A0D6] mr-2" />
                Tech
              </span>
              <span>{((data.tech / total) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#FFE8AC] flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#FFE8AC] mr-2" />
                Life
              </span>
              <span>{((data.life / total) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#28E0B9] flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#28E0B9] mr-2" />
                Resilience
              </span>
              <span>{((data.resilience / total) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const RegionalInvestmentChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const processData = () => {
    return investmentData.map(item => ({
      region: item.region,
      value: selectedSector === 'all' 
        ? item.tech + item.life + item.resilience
        : item[selectedSector],
      ...item
    }));
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Regional Investment Share</h2>
        <div className="flex items-center space-x-4">
          <div className="glass-panel px-4 py-2 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-transparent border-none text-sm focus:outline-none"
            >
              <option value="all">All Sectors</option>
              <option value="tech">Technology</option>
              <option value="life">Life Sciences</option>
              <option value="resilience">Resilience</option>
            </select>
          </div>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={processData()}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={140}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {processData().map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={selectedSector === 'all' 
                    ? REGION_COLORS[entry.region]
                    : getSectorColor(entry.region, selectedSector)
                  }
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

      <div className="mt-6 space-y-2 text-sm text-[#B0B3BA]">
        <div className="font-medium text-white mb-3">Key Insights:</div>
        <div>✔️ Easily compare regional investment shares at a glance</div>
        <div>✔️ Understand sector-based allocation within each region</div>
        <div>✔️ Analyze real-time investment trends with interactive filters</div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-8">
          <div>
            <div className="text-sm font-medium mb-2">Regions</div>
            <div className="flex items-center space-x-4">
              {Object.entries(REGION_COLORS).map(([region, color]) => (
                <div key={region} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs whitespace-nowrap">{region}</span>
                </div>
              ))}
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
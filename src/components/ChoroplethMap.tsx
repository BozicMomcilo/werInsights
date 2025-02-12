import React, { useState, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Tooltip } from 'react-tooltip';
import { Calendar, Filter } from 'lucide-react';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// Sample investment data
const investmentData = {
  USA: { value: 250, deals: 45, sectors: { Tech: 40, Life: 35, Resilience: 25 } },
  GBR: { value: 120, deals: 28, sectors: { Tech: 30, Life: 45, Resilience: 25 } },
  DEU: { value: 180, deals: 32, sectors: { Tech: 35, Life: 30, Resilience: 35 } },
  FRA: { value: 90, deals: 20, sectors: { Tech: 25, Life: 40, Resilience: 35 } },
  CHN: { value: 200, deals: 38, sectors: { Tech: 45, Life: 30, Resilience: 25 } },
};

const colorScale = scaleLinear<string>()
  .domain([0, 250])
  .range(["#1E354A", "#72A0D6"]);

interface FilterState {
  period: string;
  sector: string;
}

export const ChoroplethMap: React.FC = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [tooltipContent, setTooltipContent] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    period: "YTD",
    sector: "All"
  });

  const handleMoveEnd = useCallback((position: any) => {
    setPosition(position);
  }, []);

  const renderTooltipContent = (geo: any) => {
    const data = investmentData[geo.properties.ISO_A3];
    if (!data) return "";

    return `
      <div class="p-4 max-w-xs">
        <h3 class="font-semibold mb-2">${geo.properties.NAME}</h3>
        <div class="space-y-2">
          <p>Total Investment: $${data.value}M</p>
          <p>Number of Deals: ${data.deals}</p>
          <div class="mt-2">
            <p class="font-medium mb-1">Sector Breakdown:</p>
            <div class="space-y-1">
              ${Object.entries(data.sectors)
                .map(([sector, percentage]) => 
                  `<div class="flex justify-between">
                    <span>${sector}:</span>
                    <span>${percentage}%</span>
                  </div>`
                ).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Geo Distribution of Deals</h2>
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

      <div className="relative h-[500px] overflow-hidden">
        <ComposableMap projection="geoMercator">
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const data = investmentData[geo.properties.ISO_A3];
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={data ? colorScale(data.value) : "#1E354A"}
                      stroke="#0A101A"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          outline: "none",
                          fill: "#FFE8AC",
                          filter: "brightness(1.2) drop-shadow(0 0 8px rgba(255, 232, 172, 0.6))"
                        },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={() => {
                        setTooltipContent(renderTooltipContent(geo));
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      data-tooltip-id="geo-tooltip"
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <div className="mt-6 space-y-2 text-sm text-[#B0B3BA]">
        <div className="font-medium text-white mb-3">Key Insights:</div>
        <div>✔️ Identify investment hotspots at a glance</div>
        <div>✔️ Compare deal activity across multiple regions effortlessly</div>
        <div>✔️ Analyze sector-based investment trends dynamically</div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-8">
          <div>
            <div className="text-sm font-medium mb-2">Investment Value</div>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-4 bg-gradient-to-r from-[#1E354A] to-[#72A0D6] rounded" />
              <div className="flex justify-between w-24 text-xs">
                <span>$0M</span>
                <span>$250M</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-[#B0B3BA]">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <Tooltip
        id="geo-tooltip"
        html={tooltipContent}
        className="!bg-[#0A101A] !border !border-white/10 !rounded-xl !backdrop-blur-lg"
      />
    </div>
  );
};
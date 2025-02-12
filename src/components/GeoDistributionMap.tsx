import React, { useState, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Tooltip } from 'react-tooltip';
import { Calendar, Filter } from 'lucide-react';
import html2canvas from 'html2canvas';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// Sample data - replace with real data
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

export const GeoDistributionMap: React.FC = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [tooltipContent, setTooltipContent] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    period: "YTD",
    sector: "All"
  });

  const handleMoveEnd = useCallback((position: any) => {
    setPosition(position);
  }, []);

  const handleExport = useCallback(async () => {
    const mapElement = document.getElementById('geo-map');
    if (mapElement) {
      const canvas = await html2canvas(mapElement);
      const link = document.createElement('a');
      link.download = 'geo-distribution-map.png';
      link.href = canvas.toDataURL();
      link.click();
    }
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
    <div className="space-y-4">
      {/* Minimal Filter Bar */}
      <div className="flex items-center justify-between">
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

      {/* Map */}
      <div id="geo-map" className="h-[500px] relative">
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
                        hover: { outline: "none", fill: "#72A0D6" },
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
            {Object.entries(investmentData).map(([countryCode, data]) => (
              <Marker
                key={countryCode}
                coordinates={getCountryCoordinates(countryCode)}
              >
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={`rounded-full ${
                      data.value > 200 ? 'bg-[#72A0D6]' : 'bg-[#72A0D6]'
                    }`}
                    style={{
                      width: '6px',
                      height: '6px',
                      boxShadow: '0 0 10px rgba(114,160,214,0.8)'
                    }}
                  />
                </div>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <Tooltip
        id="geo-tooltip"
        html={tooltipContent}
        className="!bg-[#0A101A] !border !border-white/10 !rounded-xl !backdrop-blur-lg"
      />
    </div>
  );
};

// Helper function to get country coordinates (simplified for example)
function getCountryCoordinates(countryCode: string): [number, number] {
  const coordinates: { [key: string]: [number, number] } = {
    USA: [-95, 38],
    GBR: [-0.1, 51.5],
    DEU: [10.4, 51.1],
    FRA: [2.2, 46.2],
    CHN: [104.2, 35.8],
  };
  return coordinates[countryCode] || [0, 0];
}
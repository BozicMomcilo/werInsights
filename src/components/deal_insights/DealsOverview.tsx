import React, { useState, useEffect } from 'react';
import { Filter, Calendar, ArrowUpRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase/supabaseClient';
import { MetricCard } from '../shared/MetricCard';
import { MonthlyCommitmentChart } from './MonthlyCommitmentChart';

const deals = [
  {
    id: 1,
    title: 'Series A - TechVision AI',
    status: 'active',
    dueDate: '2024-06-30',
    committedVolume: '5.2M',
    minimumRaise: '3M',
    maximumRaise: '7M',
    capitalLeft: '1.8M',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 2,
    title: 'Seed Round - GreenEnergy Solutions',
    status: 'active',
    dueDate: '2024-07-15',
    committedVolume: '2.1M',
    minimumRaise: '2M',
    maximumRaise: '4M',
    capitalLeft: '1.9M',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 3,
    title: 'Series B - HealthTech Innovations',
    status: 'active',
    dueDate: '2024-08-01',
    committedVolume: '12.5M',
    minimumRaise: '10M',
    maximumRaise: '15M',
    capitalLeft: '2.5M',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 4,
    title: 'Series C - Blockchain Solutions',
    status: 'active',
    dueDate: '2024-09-15',
    committedVolume: '25M',
    minimumRaise: '20M',
    maximumRaise: '30M',
    capitalLeft: '5M',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 5,
    title: 'Pre-Seed - Quantum Computing Labs',
    status: 'past',
    dueDate: '2024-05-30',
    committedVolume: '1.5M',
    minimumRaise: '1M',
    maximumRaise: '2M',
    capitalLeft: '0M',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 6,
    title: 'Series A - AI Solutions Corp',
    status: 'past',
    dueDate: '2024-05-15',
    committedVolume: '8.5M',
    minimumRaise: '7M',
    maximumRaise: '10M',
    capitalLeft: '0M',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 7,
    title: 'Seed Round - FintechPay',
    status: 'past',
    dueDate: '2024-05-01',
    committedVolume: '3.2M',
    minimumRaise: '3M',
    maximumRaise: '5M',
    capitalLeft: '0M',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&q=80&fit=crop'
  },
  {
    id: 8,
    title: 'Series B - CloudTech Solutions',
    status: 'past',
    dueDate: '2024-04-15',
    committedVolume: '15.8M',
    minimumRaise: '15M',
    maximumRaise: '20M',
    capitalLeft: '0M',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop'
  }
];

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemCount: number;
  startIndex: number;
  endIndex: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemCount,
  startIndex,
  endIndex,
}) => (
  <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
    <div className="text-sm text-[#B0B3BA]">
      Showing {startIndex + 1} to {Math.min(endIndex, itemCount)} of {itemCount} deals
    </div>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="glass-panel p-2 disabled:opacity-50 button-hover"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`glass-panel px-4 py-2 ${
            currentPage === number ? 'bg-[#72A0D6]/20 text-white' : 'text-[#B0B3BA]'
          } button-hover`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="glass-panel p-2 disabled:opacity-50 button-hover"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const EmptyDealsMessage = ({ type }: { type: string }) => (
  <div className="text-center py-8 text-[#B0B3BA]">
    <p>No {type} deals available</p>
  </div>
);

const DealTable: React.FC<{
  deals: typeof deals;
  title: string;
  titleColor?: string;
}> = ({ deals, title, titleColor = 'text-white' }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDeals = deals.slice(startIndex, endIndex);
  const totalPages = Math.max(1, Math.ceil(deals.length / itemsPerPage));

  const handleDealClick = (dealId: number) => {
    navigate(`/dashboard/deals/${dealId}`);
  };

  return (
    <div className="glass-panel p-6">
      <h3 className={`text-lg font-medium ${titleColor} mb-4`}>{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[#B0B3BA] text-sm font-medium">
              <th className="text-left pb-4">Deal Title</th>
              <th className="text-left pb-4">Due Date</th>
              <th className="text-right pb-4">Committed Volume</th>
              <th className="text-right pb-4">Minimum Raise</th>
              <th className="text-right pb-4">Maximum Raise</th>
              <th className="text-right pb-4">Capital Left</th>
            </tr>
          </thead>
          <tbody className="font-light">
            {currentDeals.length > 0 ? (
              currentDeals.map((deal) => (
                <tr 
                  key={deal.id} 
                  className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors cursor-pointer"
                  onClick={() => handleDealClick(deal.id)}
                >
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10 hover:ring-[#72A0D6]/30 transition-all duration-300">
                        <img
                          src={deal.image}
                          alt={deal.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium whitespace-nowrap">{deal.title}</span>
                    </div>
                  </td>
                  <td className="py-4 whitespace-nowrap">{deal.dueDate}</td>
                  <td className="py-4 text-right font-medium text-[#72A0D6]">{deal.committedVolume}</td>
                  <td className="py-4 text-right text-[#B0B3BA]">{deal.minimumRaise}</td>
                  <td className="py-4 text-right text-[#B0B3BA]">{deal.maximumRaise}</td>
                  <td className="py-4 text-right font-medium text-[#FFE8AC]">{deal.capitalLeft}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <EmptyDealsMessage type={title.toLowerCase()} />
                </td>
              </tr>
            )}
            {currentDeals.length < 5 && Array.from({ length: 5 - currentDeals.length }).map((_, index) => (
              <tr key={`empty-${index}`} className="border-t border-white/5">
                <td colSpan={6} className="py-4">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemCount={deals.length}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </div>
  );
};

export const DealsOverview: React.FC = () => {
  const [filters, setFilters] = useState({
    period: 'month'
  });

  const [totalDeals, setTotalDeals] = useState(0);
  const [totalCommittedVolume, setTotalCommittedVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeals = async () => {
      if (!isSupabaseConfigured()) {
        setError('Supabase is not configured. Please connect your Supabase project first.');
        return;
      }

      try {
        const { data, error: supabaseError } = await supabase!
          .from('item')
          .select('*').eq('type', 'Deal');

        if (supabaseError) {
          throw supabaseError;
        }

        if (data) {
          setTotalDeals(data.length);
          const committedVolume = data.reduce((acc, deal) => acc + (parseFloat(deal.committedVolume) || 0), 0);
          setTotalCommittedVolume(committedVolume);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching deals');
        console.error('Error fetching deals:', err);
      }
    };

    fetchDeals();
  }, []);

  const activeDeals = deals.filter(deal => deal.status === 'active');
  const pastDeals = deals.filter(deal => deal.status === 'past');

  return (
    <div className="space-y-8">
      {error && (
        <div className="glass-panel p-4 text-[#FF3B3B] bg-[#FF3B3B]/10">
          {error}
        </div>
      )}

      {/* Deal Metrics */}
      <div className="grid grid-cols-3 gap-6">
        <MetricCard
          title="Total Deals"
          value={totalDeals.toString()}
          change="32.7"
          icon={ArrowUpRight}
        />
        <MetricCard
          title="Total Committed Volume"
          value={`$${(totalCommittedVolume / 1000000).toFixed(1)}M`}
          change="15.4"
          icon={ArrowUpRight}
        />
        <MetricCard
          title="Average Deal Duration"
          value="45 Days"
          change="+12.3"
          icon={Clock}
        />
      </div>

      {/* Deals Overview */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="section-title">Deals Overview</h2>
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
          </div>
        </div>

        {/* Active Deals Section */}
        <DealTable 
          deals={activeDeals} 
          title="Active Deals" 
          titleColor="text-[#28E0B9]"
        />

        {/* Past Deals Section */}
        <DealTable 
          deals={pastDeals} 
          title="Past Deals" 
          titleColor="text-[#B0B3BA]"
        />
      </div>

      {/* Monthly Commitment Chart */}
      <MonthlyCommitmentChart />
    </div>
  );
};
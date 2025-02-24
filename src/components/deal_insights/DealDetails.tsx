import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  Briefcase, 
  Tag, 
  Globe, 
  CircleDollarSign,
  Target,
  BarChart3,
  FileStack,
  TrendingUp
} from 'lucide-react';

// Sample deal data - replace with real data from your backend
const dealData = {
  id: 1,
  title: 'TechVision AI Series A',
  image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop',
  founder: {
    name: 'Sarah Chen',
    position: 'CEO & Co-founder',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
  },
  patron: {
    name: 'Michael Ross',
    position: 'Managing Partner',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&q=80&fit=crop'
  },
  leadInvestor: {
    name: 'David Thompson',
    firm: 'Horizon Ventures',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=160&h=160&q=80&fit=crop'
  },
  type: 'Equity',
  domain: 'Artificial Intelligence',
  facts: {
    currentRound: 'Series A',
    capitalLeft: '$2.8M',
    ticketSize: '$250K - $500K',
    stage: 'Growth',
    structure: 'Preferred Shares',
    valuation: '$45M'
  },
  commitments: [
    {
      investor: {
        name: 'Alice Richardson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&q=80&fit=crop'
      },
      tickets: 2,
      amount: '$500K',
      status: 'Confirmed'
    },
    {
      investor: {
        name: 'James Walker',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&q=80&fit=crop'
      },
      tickets: 1,
      amount: '$250K',
      status: 'Pending'
    },
    {
      investor: {
        name: 'Emily Chen',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&q=80&fit=crop'
      },
      tickets: 3,
      amount: '$750K',
      status: 'Confirmed'
    }
  ]
};


export const DealDetails: React.FC = () => {
  const navigate = useNavigate();

  // In a real application, fetch deal data based on the ID
  // const [deal, setDeal] = useState(null);
  // useEffect(() => { fetchDealData(id) }, [id]);

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
        <h1 className="text-2xl font-medium">{dealData.title}</h1>
      </div>

      {/* Deal Banner */}
      <div className="glass-panel overflow-hidden">
        <div 
          className="w-full h-[300px] bg-cover bg-center"
          style={{ backgroundImage: `url(${dealData.image})` }}
        />
      </div>

      {/* Key People */}
      <div className="grid grid-cols-3 gap-6">
        {/* Founder */}
        <div className="glass-panel p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Building2 className="w-5 h-5 text-[#72A0D6]" />
            <h2 className="text-lg font-medium">Founder</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
              <img 
                src={dealData.founder.image} 
                alt={dealData.founder.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{dealData.founder.name}</div>
              <div className="text-sm text-[#B0B3BA]">{dealData.founder.position}</div>
            </div>
          </div>
        </div>

        {/* Patron */}
        <div className="glass-panel p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-5 h-5 text-[#72A0D6]" />
            <h2 className="text-lg font-medium">Patron</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
              <img 
                src={dealData.patron.image} 
                alt={dealData.patron.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{dealData.patron.name}</div>
              <div className="text-sm text-[#B0B3BA]">{dealData.patron.position}</div>
            </div>
          </div>
        </div>

        {/* Lead Investor */}
        <div className="glass-panel p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Briefcase className="w-5 h-5 text-[#72A0D6]" />
            <h2 className="text-lg font-medium">Lead Investor</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
              <img 
                src={dealData.leadInvestor.image} 
                alt={dealData.leadInvestor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{dealData.leadInvestor.name}</div>
              <div className="text-sm text-[#B0B3BA]">{dealData.leadInvestor.firm}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Information */}
      <div className="grid grid-cols-2 gap-6">
        {/* General Info */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-medium mb-6">Deal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Tag className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Deal Type</div>
                <div className="font-medium">{dealData.type}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Domain</div>
                <div className="font-medium">{dealData.domain}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deal Facts */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-medium mb-6">Deal Facts</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <CircleDollarSign className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Current Round</div>
                <div className="font-medium">{dealData.facts.currentRound}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Capital Left</div>
                <div className="font-medium">{dealData.facts.capitalLeft}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Ticket Size</div>
                <div className="font-medium">{dealData.facts.ticketSize}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileStack className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Stage</div>
                <div className="font-medium">{dealData.facts.stage}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Briefcase className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Structure</div>
                <div className="font-medium">{dealData.facts.structure}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-[#72A0D6]" />
              <div>
                <div className="text-sm text-[#B0B3BA]">Valuation</div>
                <div className="font-medium">{dealData.facts.valuation}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commitments Table */}
      <div className="glass-panel p-6">
        <h2 className="text-xl font-medium mb-6">Deal Commitments</h2>
        <table className="w-full">
          <thead>
            <tr className="text-[#B0B3BA] text-sm font-medium">
              <th className="text-left pb-4">Investor</th>
              <th className="text-center pb-4">Tickets</th>
              <th className="text-right pb-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {dealData.commitments.map((commitment, index) => (
              <tr 
                key={index}
                className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10">
                      <img 
                        src={commitment.investor.image} 
                        alt={commitment.investor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{commitment.investor.name}</span>
                  </div>
                </td>
                <td className="py-4 text-center">{commitment.tickets}</td>
                <td className="py-4 text-right font-medium text-[#72A0D6]">
                  {commitment.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
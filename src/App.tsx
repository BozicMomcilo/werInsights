import React, { useState } from 'react';
import { 
  LineChart, 
  MessageCircle, 
  MapPin, 
  Layers,
  Settings,
  LayoutDashboard,
  ChevronDown,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { Logo } from './components/Logo';
import { RegionalInvestmentChart } from './components/RegionalInvestmentChart';
import { DealsOverview } from './components/DealsOverview';
import { KeyMetrics } from './components/KeyMetrics';
import { ActivityMetrics } from './components/ActivityMetrics';
import { EventParticipationChart } from './components/EventParticipationChart';
import { EventOverviewMetrics } from './components/EventOverviewMetrics';
import { EventsOverview } from './components/EventsOverview';
import { MembersOverviewMetrics } from './components/MembersOverviewMetrics';
import { MembersOverviewTable } from './components/MembersOverviewTable';
import { MemberActivityChart } from './components/MemberActivityChart';
import { ContentOverviewMetrics } from './components/ContentOverviewMetrics';
import { ContentOverviewTable } from './components/ContentOverviewTable';
import { EngagementOverviewMetrics } from './components/EngagementOverviewMetrics';
import { EngagementOverviewTable } from './components/EngagementOverviewTable';

const navItems = [
  { icon: LineChart, label: 'Insights', active: true },
  { icon: MessageCircle, label: 'Communication Center' },
  { icon: MapPin, label: 'Placement' },
  { icon: Layers, label: 'CMS' },
  { icon: Settings, label: 'Administration' },
  { icon: LayoutDashboard, label: 'Dashboard' },
];

export type TabType = 'key-metrics' | 'members' | 'deals' | 'events' | 'content' | 'engagement';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('key-metrics');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'key-metrics':
        return <KeyMetrics />;
      case 'members':
        return (
          <div className="space-y-8">
            <MembersOverviewMetrics />
            <MembersOverviewTable />
            <MemberActivityChart />
          </div>
        );
      case 'deals':
        return (
          <div className="space-y-8">
            <DealsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityMetrics />
              <RegionalInvestmentChart />
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="space-y-8">
            <EventOverviewMetrics />
            <EventsOverview />
            <EventParticipationChart />
          </div>
        );
      case 'content':
        return (
          <div className="space-y-8">
            <ContentOverviewMetrics />
            <ContentOverviewTable />
          </div>
        );
      case 'engagement':
        return (
          <div className="space-y-8">
            <EngagementOverviewMetrics />
            <EngagementOverviewTable />
          </div>
        );
      default:
        return <div className="text-center py-12 text-[#B0B3BA]">Content for {activeTab} tab coming soon</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="flex flex-col h-full">
          <div className="flex justify-center py-8 mb-8">
            <Logo />
          </div>
          <nav className="flex-1 px-4 space-y-4">
            {navItems.map((item, index) => (
              <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
                <item.icon className="w-6 h-6 flex-shrink-0 text-white" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-28 pr-4 py-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-medium tracking-wide text-white">Insights</h1>
            <div className="tab-container ml-8">
              <button 
                className={`tab ${activeTab === 'key-metrics' ? 'active' : ''}`}
                onClick={() => setActiveTab('key-metrics')}
              >
                Key metrics
              </button>
              <button 
                className={`tab ${activeTab === 'members' ? 'active' : ''}`}
                onClick={() => setActiveTab('members')}
              >
                Members
              </button>
              <button 
                className={`tab ${activeTab === 'deals' ? 'active' : ''}`}
                onClick={() => setActiveTab('deals')}
              >
                Deals
              </button>
              <button 
                className={`tab ${activeTab === 'events' ? 'active' : ''}`}
                onClick={() => setActiveTab('events')}
              >
                Events
              </button>
              <button 
                className={`tab ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                Content
              </button>
              <button 
                className={`tab ${activeTab === 'engagement' ? 'active' : ''}`}
                onClick={() => setActiveTab('engagement')}
              >
                Engagement
              </button>
            </div>
          </div>
          <div className="profile-image-container">
            <img 
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=160&h=160&q=80&fit=crop" 
              alt="Profile" 
              className="profile-image"
            />
          </div>
        </header>

        {/* Tab Content */}
        {renderTabContent()}
      </main>
    </div>
  );
}

export default App;
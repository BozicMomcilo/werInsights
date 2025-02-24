import { 
  LineChart, 
  Users,
  Briefcase,
  Calendar,
  FileText,
  Activity
} from 'lucide-react';
import { RegionalInvestmentChart } from './components/deal_insights/RegionalInvestmentChart';
import { KeyMetrics } from './components/general_insights/KeyMetrics';
import { MembersOverviewTable } from './components/members_insights/MembersOverviewTable';
import { MembersOverviewMetrics } from './components/members_insights/MembersOverviewMetrics';
import { EventOverviewMetrics } from './components/events_insights/EventOverviewMetrics';
import { ActivityMetrics } from './components/general_insights/ActivityMetrics';
import { DealsOverview } from './components/deal_insights/DealsOverview';
import { EventsOverview } from './components/events_insights/EventsOverview';
import { EventParticipationChart } from './components/events_insights/EventParticipationChart';
import { ContentOverviewMetrics } from './components/content_insights/ContentOverviewMetrics';
import { ContentOverviewTable } from './components/content_insights/ContentOverviewTable';
import { EngagementOverviewTable } from './components/engagement_insights/EngagementOverviewTable';
import { EngagementOverviewMetrics } from './components/engagement_insights/EngagementOverviewMetrics';
import { Logo } from './components/shared/Logo';  
import { ThemeSwitcher } from './components/shared/ThemeSwitcher';
import { ThemeProvider } from './contexts/ThemeContext';
import { useState } from 'react';

export type TabType = 'key-metrics' | 'members' | 'deals' | 'events' | 'content' | 'engagement';

const navItems = [
  { icon: LineChart, label: 'Key Metrics', id: 'key-metrics' },
  { icon: Users, label: 'Members', id: 'members' },
  { icon: Briefcase, label: 'Deals', id: 'deals' },
  { icon: Calendar, label: 'Events', id: 'events' },
  { icon: FileText, label: 'Content', id: 'content' },
  { icon: Activity, label: 'Engagement', id: 'engagement' },
];

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
    <ThemeProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="flex flex-col h-full">
            <div className="flex justify-center py-8">
              <Logo />
            </div>
            <nav className="flex flex-col flex-1 px-4 space-y-4">
              {navItems.map((item) => (
                <div 
                  key={item.id}
                  className={`nav-item ${item.id === activeTab ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id as TabType)}
                  role="button"
                  tabIndex={0}
                >
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
              <div className="flex-1" />
              <ThemeSwitcher />
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 pl-28 pr-4 py-4">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-medium tracking-wide">
              {navItems.find(item => item.id === activeTab)?.label || 'Insights'}
            </h1>
            <div className="profile-image-container">
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=160&h=160&q=80&fit=crop" 
                alt="Profile" 
                className="profile-image"
              />
            </div>
          </header>

          {/* Content */}
          {renderTabContent()}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
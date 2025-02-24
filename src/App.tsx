import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn } from './components/auth/SignIn';
import { auth } from './lib/auth';
import { 
  LineChart, 
  MessageCircle, 
  MapPin, 
  Layers,
  Settings,
  LayoutDashboard,
} from 'lucide-react';
import { Logo } from './components/shared/Logo';
import { RegionalInvestmentChart } from './components/RegionalInvestmentChart';
import { DealsOverview } from './components/deal_insights/DealsOverview';
import { KeyMetrics } from './components/general_insights/KeyMetrics';
import { ActivityMetrics } from './components/general_insights/ActivityMetrics';
import { EventParticipationChart } from './components/events_insights/EventParticipationChart';
import { EventOverviewMetrics } from './components/events_insights/EventOverviewMetrics';
import { EventsOverview } from './components/events_insights/EventsOverview';
import { MembersOverviewMetrics } from './components/members_insights/MembersOverviewMetrics';
import { MembersOverviewTable } from './components/members_insights/MembersOverviewTable';
import { MemberActivityChart } from './components/members_insights/MemberActivityChart';
import { ContentOverviewMetrics } from './components/content_insights/ContentOverviewMetrics';
import { ContentOverviewTable } from './components/content_insights/ContentOverviewTable';
import { ContentEngagementChart } from './components/content_insights/ContentEngagementChart';
import { EngagementOverviewMetrics } from './components/engagement_insights/EngagementOverviewMetrics';
import { EngagementOverviewTable } from './components/engagement_insights/EngagementOverviewTable';
import { EngagementTimeline } from './components/engagement_insights/EngagementTimeline';

const navItems = [
  { icon: LineChart, label: 'Insights', active: true },
  { icon: MessageCircle, label: 'Communication Center' },
  { icon: MapPin, label: 'Placement' },
  { icon: Layers, label: 'CMS' },
  { icon: Settings, label: 'Administration' },
  { icon: LayoutDashboard, label: 'Dashboard' },
];

export type TabType = 'key-metrics' | 'members' | 'deals' | 'events' | 'content' | 'engagement';

function Dashboard() {
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
            <ContentEngagementChart />
          </div>
        );
      case 'engagement':
        return (
          <div className="space-y-8">
            <EngagementOverviewMetrics />
            <EngagementOverviewTable />
            <EngagementTimeline />
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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
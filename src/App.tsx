import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  LineChart, 
  Users,
  Briefcase,
  Calendar,
  FileText,
  Activity
} from 'lucide-react';
import { KeyMetrics } from './components/general_insights/KeyMetrics';
import { MembersOverviewTable } from './components/members_insights/MembersOverviewTable';
import { MembersOverviewMetrics } from './components/members_insights/MembersOverviewMetrics';
import { EventOverviewMetrics } from './components/events_insights/EventOverviewMetrics';
import { DealsOverview } from './components/deal_insights/DealsOverview';
import { DealDetails } from './components/deal_insights/DealDetails';
import { EventsOverview } from './components/events_insights/EventsOverview';
import { EventDetails } from './components/events_insights/EventDetails';
import { ContentOverviewMetrics } from './components/content_insights/ContentOverviewMetrics';
import { ContentOverviewTable } from './components/content_insights/ContentOverviewTable';
import { ContentDetails } from './components/content_insights/ContentDetails';
import { EngagementOverviewMetrics } from './components/engagement_insights/EngagementOverviewMetrics';
import { EngagementDetails } from './components/engagement_insights/EngagementDetails';
import { Logo } from './components/shared/Logo';  
import { ThemeSwitcher } from './components/shared/ThemeSwitcher';
import { ThemeProvider } from './contexts/ThemeContext';
import { useState } from 'react';
import { EngagementResponseList } from './components/engagement_insights/EngagementResponseList';
import { MemberDetails } from './components/members_insights/MemberDetails';

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
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                <MembersOverviewMetrics />
                <MembersOverviewTable />
              </div>
            } />
            <Route path="/members/:id" element={<MemberDetails />} />
          </Routes>
        );
      case 'deals':
        return (
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                <DealsOverview />
              </div>
            } />
            <Route path="/deals/:id" element={<DealDetails />} />
          </Routes>
        );
      case 'events':
        return (
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                <EventOverviewMetrics />
                <EventsOverview />
              </div>
            } />
            <Route path="/events/:id" element={<EventDetails />} />
          </Routes>
        );
      case 'content':
        return (
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                <ContentOverviewMetrics />
                <ContentOverviewTable />
              </div>
            } />
            <Route path="/content/:id" element={<ContentDetails />} />
          </Routes>
        );
      case 'engagement':
        return (
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                <EngagementOverviewMetrics />
                <EngagementResponseList />
              </div>
            } />
            <Route path="/engagement/:id" element={<EngagementDetails />} />
          </Routes>
        );
      default:
        return <div className="text-center py-12 text-[#B0B3BA]">Content for {activeTab} tab coming soon</div>;
    }
  };

  return (
    <Router>
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
    </Router>
  );
}

export default App;
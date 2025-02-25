import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { 
  LineChart, 
  Users,
  Briefcase,
  Calendar,
  FileText,
  Activity,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../lib/auth/auth';
import { Logo } from '../../shared/Logo';
import { ThemeSwitcher } from '../../shared/ThemeSwitcher';
import { KeyMetrics } from "../../general_insights/KeyMetrics";
import { MembersOverviewTable } from "../../members_insights/MembersOverviewTable";
import { MembersOverviewMetrics } from "../../members_insights/MembersOverviewMetrics";
import { MemberActivityChart } from "../../members_insights/MemberActivityChart";
import { DealsOverview } from "../../deal_insights/DealsOverview";
import { EventOverviewMetrics } from "../../events_insights/EventOverviewMetrics";
import { EventsOverview } from "../../events_insights/EventsOverview";
import { ContentOverviewMetrics } from "../../content_insights/ContentOverviewMetrics";
import { ContentOverviewTable } from "../../content_insights/ContentOverviewTable";
import { ContentEngagementChart } from "../../content_insights/ContentEngagementChart";
import { EngagementOverviewMetrics } from "../../engagement_insights/EngagementOverviewMetrics";
import { EngagementResponseList } from "../../engagement_insights/EngagementResponseList";
import { MemberDetails } from '../../members_insights/MemberDetails';

export type TabType = 'key-metrics' | 'members' | 'deals' | 'events' | 'content' | 'engagement';

const navItems = [
  { icon: LineChart, label: 'Key Metrics', id: 'key-metrics' },
  { icon: Users, label: 'Members', id: 'members' },
  { icon: Briefcase, label: 'Deals', id: 'deals' },
  { icon: Calendar, label: 'Events', id: 'events' },
  { icon: FileText, label: 'Content', id: 'content' },
  { icon: Activity, label: 'Engagement', id: 'engagement' },
];

export function GeneralDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('key-metrics');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
          </div>
        );
      case 'events':
        return (
          <div className="space-y-8">
            <EventOverviewMetrics />
            <EventsOverview />
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
            <EngagementResponseList />
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
            <div className="px-2 py-4">
              <div className="border-t border-white/10" />
            </div>
            <div className="pb-2">
              <button
                onClick={handleSignOut}
                className="nav-item text-[#FF3B3B] hover:bg-[#FF3B3B]/10"
              >
                <LogOut className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
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
  );
}
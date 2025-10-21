'use client';
import { Home, Users, Gift, CreditCard, Bell, FileText } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> },
    { key: 'users', label: 'Users', icon: <Users size={18} /> },
    { key: 'resources', label: 'Resources', icon: <FileText size={18} /> },
    { key: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { key: 'promotions', label: 'Promotions', icon: <Gift size={18} /> },
    { key: 'payments', label: 'Payments', icon: <CreditCard size={18} /> },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-50 to-white shadow-lg border-r border-gray-200 flex flex-col h-screen">
      <div className="h-[69px] p-4 text-2xl font-bold text-blue-600 bg-white border-b border-gray-200 flex items-center">
        <span className="mr-2">🌐</span> Echo English
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center w-full gap-3 px-4 py-2 text-sm rounded-lg transition-all duration-200
              ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-md border-l-4 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
              }`}
          >
            {tab.icon}
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

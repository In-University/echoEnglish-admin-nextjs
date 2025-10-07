"use client";
import { Home, Users, Gift, CreditCard } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { key: "users", label: "Quản lý User", icon: <Users size={18} /> },
    { key: "resources", label: "Quản lý Resource", icon: <Home size={18} /> },
    { key: "promotions", label: "Khuyến mãi", icon: <Gift size={18} /> },
    { key: "payments", label: "Thanh toán", icon: <CreditCard size={18} /> },
  ];

  return (
    <aside className="w-60 bg-white shadow-md border-r flex flex-col">
      <div className="p-4 text-xl font-bold text-blue-600 border-b"># DASHMIN</div>
      <nav className="flex-1 p-2 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center w-full gap-2 px-4 py-2 text-sm rounded-md transition-all 
              ${
                activeTab === tab.key
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

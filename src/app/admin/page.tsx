'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UsersPage from './components/UsersPage';
import ResourcesPage from './components/ResourcesPage';
import PromotionsPage from './components/PromotionsPage';
import PaymentsPage from './components/PaymentsPage';
import { NotificationsPage } from './components/NotificationsPage';
import { ResourcesManagementPage } from './components/ResourcesManagementPage';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header user={user} onLogout={handleLogout} />
        <main className="p-6">
          {activeTab === 'users' && <UsersPage />}
          {activeTab === 'resources' && <ResourcesManagementPage />}
          {activeTab === 'notifications' && <NotificationsPage />}
          {activeTab === 'promotions' && <PromotionsPage />}
          {activeTab === 'payments' && <PaymentsPage />}
        </main>
      </div>
    </div>
  );
}

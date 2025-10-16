'use client';

import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationBell } from './notification/NotificationBell';

export default function Header({ user, onLogout }: any) {
  return (
    <header className="flex justify-between items-center bg-white shadow-sm p-4 border-b">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <NotificationBell />
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings size={20} />
        </button>
        <span className="text-sm text-gray-600">
          {user ? user.fullName || user.email : ''}
        </span>
        <Button variant="outline" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}

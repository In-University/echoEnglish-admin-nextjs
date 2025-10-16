import api from './api';

export interface Notification {
  _id: string;
  title: string;
  body?: string;
  deepLink?: string;
  type: string;
  createdAt: string;
  createdBy?: string;
  isRead: boolean;
}

export interface PushNotificationDto {
  title: string;
  body?: string;
  deepLink?: string;
  type: string;
  userIds?: string[];
}

export const notificationApi = {
  // Push notification
  pushNotification: async (data: PushNotificationDto) => {
    const response = await api.post('/notifications', data);
    return response.data;
  },

  // Get all notifications
  getAllNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read/all');
    return response.data;
  },

  // Mark as read
  markAsRead: async (id: string) => {
    const response = await api.put(`/notifications/read/${id}`);
    return response.data;
  },

  // Delete notification
  deleteNotification: async (id: string) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },
};

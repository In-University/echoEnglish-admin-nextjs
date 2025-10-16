'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  notificationApi,
  type PushNotificationDto,
} from '@/lib/notificationApi';
import { getAllUsers, type User } from '@/lib/userApi';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';

export function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [formData, setFormData] = useState<PushNotificationDto>({
    title: '',
    body: '',
    deepLink: '',
    type: 'info',
    userIds: [],
  });

  // Load users on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await getAllUsers();
        setUsers(userList);
      } catch (error) {
        console.error('Failed to load users:', error);
        toast.error('Failed to load users');
      }
    };
    loadUsers();
  }, []);

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    setIsLoading(true);
    try {
      const payload: PushNotificationDto = {
        ...formData,
        userIds: selectedUsers,
      };

      await notificationApi.pushNotification(payload);

      toast.success(
        !payload.userIds || payload.userIds.length === 0
          ? 'Broadcast notification sent successfully'
          : 'Notification sent successfully'
      );

      // Reset form
      setFormData({
        title: '',
        body: '',
        deepLink: '',
        type: 'info',
        userIds: [],
      });
      setSelectedUsers([]);
    } catch (error) {
      console.error('Failed to send notification:', error);
      toast.error('Failed to send notification');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications Management</h1>
        <p className="text-muted-foreground mt-1">
          Send notifications to users
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send Notification</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter notification title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Body</Label>
              <Input
                id="body"
                placeholder="Enter notification body (optional)"
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deepLink">Deep Link</Label>
              <Input
                id="deepLink"
                placeholder="Enter deep link (optional)"
                value={formData.deepLink}
                onChange={(e) =>
                  setFormData({ ...formData, deepLink: e.target.value })
                }
              />
            </div>

            <div className="space-y-3">
              <Label>Select Users</Label>
              <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                {users.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Loading users...
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 pb-2 border-b">
                      <Checkbox
                        id="select-all"
                        checked={selectedUsers.length === users.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedUsers(users.map((u) => u._id));
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                      />
                      <label
                        htmlFor="select-all"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Select All ({users.length})
                      </label>
                    </div>
                    {users.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={user._id}
                          checked={selectedUsers.includes(user._id)}
                          onCheckedChange={() => handleUserToggle(user._id)}
                        />
                        <label
                          htmlFor={user._id}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {user.fullName} ({user.email})
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedUsers.length > 0
                  ? `${selectedUsers.length} user(s) selected`
                  : 'No users selected - will broadcast to all users'}
              </p>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

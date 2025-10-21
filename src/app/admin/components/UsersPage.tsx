'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  getUsers,
  createUser,
  updateUser,
  softDeleteUser,
} from '@/lib/userApi';
import { getRoles } from '@/lib/roleApi';
import {
  User,
  UserFormData,
  PaginatedResponse,
  Role,
  Gender,
} from '@/types/user';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    gender: '',
    role: '',
  });

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 5;

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers(page, limit, search);
      const result = res.data as PaginatedResponse<User>;
      setUsers(result.data);
      setTotalPages(result.totalPages || 1);
    } catch {
      toast.error('Failed to load user list');
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await getRoles('');
      setRoles(res.data);
    } catch {
      toast.error('Failed to load roles');
    }
  };

  const handleOpenForm = (user?: User) => {
    if (user) {
      setEditingUser(user);
      const firstRole =
        user.roles && user.roles.length > 0 ? user.roles[0] : null;
      const roleId =
        firstRole && typeof firstRole === 'object'
          ? firstRole._id
          : typeof firstRole === 'string'
            ? firstRole
            : '';

      setFormData({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        gender: user.gender || '',
        role: roleId,
      });
    } else {
      setEditingUser(null);
      setFormData({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        gender: '',
        role: '',
      });
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        roles: formData.role ? [formData.role] : [],
      };

      delete payload.role;

      if (editingUser) {
        await updateUser(editingUser._id, payload);
        toast.success('User updated successfully');
      } else {
        await createUser(payload);
        toast.success('User created successfully');
      }
      setOpen(false);
      fetchUsers();
    } catch {
      toast.error('Error while saving user');
    }
  };

  const handleSoftDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await softDeleteUser(id);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage system users and their roles
          </p>
        </div>
        <Button onClick={() => handleOpenForm()}>+ Add User</Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-2 text-left">Full Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{u.fullName}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">
                  {u.roles && u.roles.length > 0
                    ? u.roles
                        .map((r) => (typeof r === 'object' ? r.name : r))
                        .join(', ')
                    : '-'}
                </td>
                <td className="p-2 flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenForm(u)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleSoftDelete(u._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {page} / {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      {/* Dialog Add/Edit User */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? 'Edit User' : 'Add New User'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {!editingUser && (
              <Input
                placeholder="Password"
                type="password"
                value={formData.password || ''}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            )}
            <Input
              placeholder="Phone Number"
              value={formData.phoneNumber || ''}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
            <Input
              placeholder="Address"
              value={formData.address || ''}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />

            {/* Gender */}
            <select
              className="border rounded p-2 w-full"
              value={formData.gender || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gender: e.target.value as Gender | '',
                })
              }
            >
              <option value="">-- Select Gender --</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>

            {/* Role */}
            <select
              className="border rounded p-2 w-full"
              value={formData.role || ''}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="">-- Select Role --</option>
              {roles.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>

            <Button onClick={handleSubmit}>
              {editingUser ? 'Save Changes' : 'Create User'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

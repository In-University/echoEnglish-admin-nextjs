"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import api from "@/lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  // 🔁 Load danh sách người dùng
  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/users`, { params: { search } });
      setUsers(res.data.data || res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách người dùng");
    }
  };

  const handleOpenForm = (user?: any) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber || "",
      });
    } else {
      setEditingUser(null);
      setFormData({ fullName: "", email: "", phoneNumber: "" });
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser._id}`, formData);
        toast.success("Cập nhật người dùng thành công");
      } else {
        await api.post(`/users`, formData);
        toast.success("Tạo người dùng thành công");
      }
      setOpen(false);
      fetchUsers();
    } catch (err) {
      toast.error("Không thể lưu người dùng");
    }
  };

  const handleSoftDelete = async (id: string) => {
    if (!confirm("Xác nhận xóa người dùng này?")) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success("Đã xóa mềm người dùng");
      fetchUsers();
    } catch (err) {
      toast.error("Không thể xóa người dùng");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Quản lý User</h2>
        <Button onClick={() => handleOpenForm()}>+ Thêm User</Button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-2 text-left">Họ tên</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">SĐT</th>
            <th className="p-2 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b hover:bg-gray-50">
              <td className="p-2">{u.fullName}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phoneNumber || "-"}</td>
              <td className="p-2 flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenForm(u)}
                >
                  Sửa
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleSoftDelete(u._id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog thêm/sửa user */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Cập nhật người dùng" : "Thêm người dùng"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Họ tên"
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
            <Input
              placeholder="Số điện thoại"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
            <Button onClick={handleSubmit}>
              {editingUser ? "Lưu thay đổi" : "Tạo mới"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

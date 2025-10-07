"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

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

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // Load user list
  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    const res = await fetch(`/users?search=${search}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data.data);
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
    const method = editingUser ? "PUT" : "POST";
    const url = editingUser ? `/users/${editingUser._id}` : `/users`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success(editingUser ? "Cập nhật thành công" : "Tạo người dùng thành công");
      setOpen(false);
      fetchUsers();
    } else {
      toast.error("Lỗi khi lưu người dùng");
    }
  };

  const handleSoftDelete = async (id: string) => {
    if (!confirm("Xác nhận xóa người dùng này?")) return;
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      toast.success("Đã xóa mềm người dùng");
      fetchUsers();
    } else {
      toast.error("Không thể xóa người dùng");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Quản lý User</h2>
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
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b hover:bg-gray-50">
              <td className="p-2">{u.fullName}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phoneNumber || "-"}</td>
              <td className="p-2 flex gap-2 justify-center">
                <Button variant="outline" size="sm" onClick={() => handleOpenForm(u)}>
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
            <DialogTitle>{editingUser ? "Cập nhật người dùng" : "Thêm người dùng"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Họ tên"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              placeholder="Số điện thoại"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
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

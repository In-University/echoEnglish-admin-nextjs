"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("users");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user");
    if (!token || !userData) {
      router.push("/auth/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar trái */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">
            Xin chào, {user ? user.fullName || user.email : ""}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="flex flex-col w-full p-2 space-y-2 bg-transparent">
            <TabsTrigger
              value="users"
              className={cn(
                "justify-start px-4 py-2 text-left rounded-lg transition-all",
                activeTab === "users"
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
              👤 Quản lý User
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className={cn(
                "justify-start px-4 py-2 text-left rounded-lg transition-all",
                activeTab === "resources"
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
              📦 Quản lý Resource
            </TabsTrigger>
            <TabsTrigger
              value="promotions"
              className={cn(
                "justify-start px-4 py-2 text-left rounded-lg transition-all",
                activeTab === "promotions"
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
              🎁 Quản lý Khuyến mãi
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className={cn(
                "justify-start px-4 py-2 text-left rounded-lg transition-all",
                activeTab === "payments"
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
              💳 Quản lý Thanh toán
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="p-4 border-t mt-auto">
          <Button
            variant="outline"
            className="w-full text-red-500 border-red-200 hover:bg-red-50"
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </div>
      </aside>

      {/* Nội dung bên phải */}
      <main className="flex-1 p-8">
        <Tabs value={activeTab}>
          <TabsContent value="users">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                👤 Quản lý User
              </h2>
              <p className="text-gray-600">
                Hiển thị danh sách user, thêm, xóa, sửa...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                📦 Quản lý Resource
              </h2>
              <p className="text-gray-600">
                Danh sách tài nguyên (videos, lessons...)
              </p>
            </div>
          </TabsContent>

          <TabsContent value="promotions">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                🎁 Quản lý Khuyến mãi
              </h2>
              <p className="text-gray-600">
                Danh sách và tạo mới các chương trình giảm giá.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                💳 Quản lý Thanh toán
              </h2>
              <p className="text-gray-600">
                Danh sách hóa đơn, trạng thái thanh toán.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

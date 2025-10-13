"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

export function PromoTable({ promos, loading, onEdit, onDelete }: any) {
  return (
    <div className="shadow-md border border-gray-200 bg-white rounded-2xl overflow-hidden">
      <div className="max-h-[60vh] overflow-y-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left font-semibold">Mã</th>
              <th className="p-3 text-left font-semibold">Giảm giá</th>
              <th className="p-3 text-left font-semibold">Đã dùng</th>
              <th className="p-3 text-left font-semibold">Giới hạn</th>
              <th className="p-3 text-left font-semibold">Trạng thái</th>
              <th className="p-3 text-center font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : promos.length > 0 ? (
              promos.map((promo: any) => (
                <motion.tr
                  key={promo._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-mono">{promo.code}</td>
                  <td className="p-3">{promo.discount}%</td>
                  <td className="p-3">{promo.usedCount}</td>
                  <td className="p-3">{promo.usageLimit ?? "-"}</td>
                  <td className="p-3">
                    {promo.active ? (
                      <Badge className="bg-green-100 text-green-700">
                        Đang hoạt động
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700">Ngừng hoạt động</Badge>
                    )}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <Button size="icon" variant="outline" onClick={() => onEdit(promo)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => onDelete(promo._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-500 italic">
                  Không có mã khuyến mãi nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  getPromos,
  createPromo,
  updatePromo,
  deletePromo,
} from '@/lib/promoApi';
import { PromoCode } from '@/types/promo';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { PromoFilterCard } from './promotion/PromoFilterCard';
import { PromoTable } from './promotion/PromoTable';
import { PromoDialogForm } from './promotion/PromoDialogForm';

export default function PromotionsPage() {
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    sort: 'desc',
    active: '',
    minDiscount: '',
    maxDiscount: '',
    status: '',
    availability: '',
  });

  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const res = await getPromos(page, limit, filters);
      const result = res.data || {};
      setPromos(result.data || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch {
      toast.error('Không thể tải danh sách khuyến mãi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, [page, filters]);

  const handleSave = async (form: Partial<PromoCode>) => {
    try {
      const payload = {
        code: form.code,
        discount: Number(form.discount),
        usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
        expiration: form.expiration,
        active: !!form.active,
      };

      if (editingPromo) {
        await updatePromo(editingPromo._id!, payload);
        toast.success('Đã cập nhật khuyến mãi');
      } else {
        await createPromo(payload);
        toast.success('Đã tạo khuyến mãi mới');
      }

      setOpenDialog(false);
      fetchPromos();
    } catch {
      toast.error('Lưu thất bại');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePromo(id);
      toast.success('Đã xoá thành công');
      fetchPromos();
    } catch {
      toast.error('Xoá thất bại');
    }
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý khuyến mãi</h2>
        <Button
          className="bg-primary text-white"
          onClick={() => {
            setEditingPromo(null);
            setOpenDialog(true);
          }}
        >
          <Plus className="w-4 h-4 mr-1" /> Tạo mã giảm giá
        </Button>
      </div>

      <PromoFilterCard
        filters={filters}
        setFilters={setFilters}
        reload={fetchPromos}
      />

      <PromoTable
        promos={promos}
        loading={loading}
        onEdit={(promo: PromoCode) => {
          setEditingPromo(promo);
          setOpenDialog(true);
        }}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Trước
        </Button>
        <span className="text-gray-600 text-sm">
          Trang {page}/{totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Sau <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <PromoDialogForm
        open={openDialog}
        setOpen={setOpenDialog}
        editingPromo={editingPromo}
        onSave={handleSave}
      />
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { getPayments } from '@/lib/paymentApi';
import PaymentFilters from '@/app/admin/components/payment/PaymentFilterCard';
import PaymentStats from '@/app/admin/components/payment/PaymentStats';
import PaymentTable from '@/app/admin/components/payment/PaymentTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PaymentsPage() {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>({});
  const [filters, setFilters] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const fetchPayments = async (page = 1, filters = {}) => {
    setLoading(true);
    try {
      const res = await getPayments(page, 10, filters);
      setData(res.data.data);
      setPagination(res.data.pagination);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(page, filters);
  }, [page, filters]);

  const stats = {
    totalAmount: data.reduce((a, b) => a + (b.amount || 0), 0),
    totalTransactions: pagination.total || data.length,
    succeeded: data.filter((x) => x.status === 'SUCCEEDED').length,
    failed: data.filter((x) => x.status === 'FAILED').length,
    purchased: data
      .filter((x) => x.type === 'purchase')
      .reduce((a, b) => a + (b.tokens || 0), 0),
    used: data
      .filter((x) => x.type === 'deduction')
      .reduce((a, b) => a + (b.tokens || 0), 0),
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage transactions and payment records
        </p>
      </div>
      <PaymentStats {...stats} />
      <PaymentFilters onFilter={setFilters} />
      {loading ? (
        <p className="text-center py-6 text-gray-500">Loading...</p>
      ) : (
        <PaymentTable data={data} />
      )}

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasPrev}
          onClick={() => setPage(page - 1)}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Trước
        </Button>
        <span>
          Trang {pagination.page} / {pagination.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasNext}
          onClick={() => setPage(page + 1)}
        >
          Sau <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

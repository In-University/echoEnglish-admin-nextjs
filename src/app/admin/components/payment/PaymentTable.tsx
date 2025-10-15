'use client';

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge'; // nếu bạn chưa có component Badge thì mình có thể gửi luôn

interface PaymentTableProps {
  data: any[];
}

export default function PaymentTable({ data }: PaymentTableProps) {
  const formatAmount = (amount: number) =>
    amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUCCEEDED':
        return (
          <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Succeeded
          </Badge>
        );
      case 'FAILED':
        return (
          <Badge className="bg-red-100 text-red-700 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Failed
          </Badge>
        );
      case 'EXPIRED':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Expired
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 flex items-center gap-1">
            {status}
          </Badge>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    if (type === 'purchase')
      return <ArrowUpCircle className="text-blue-500 w-4 h-4" />;
    if (type === 'deduction')
      return <ArrowDownCircle className="text-orange-500 w-4 h-4" />;
    return <Wallet className="text-gray-400 w-4 h-4" />;
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left font-semibold">Time</th>
            <th className="p-3 text-left font-semibold">User</th>
            <th className="p-3 text-left font-semibold">Type</th>
            <th className="p-3 text-left font-semibold">Amount</th>
            <th className="p-3 text-left font-semibold">Tokens</th>
            <th className="p-3 text-left font-semibold">Status</th>
            <th className="p-3 text-left font-semibold">Gateway</th>
            <th className="p-3 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-6 text-gray-500 italic">
                No transactions found
              </td>
            </tr>
          ) : (
            data.map((tx) => (
              <tr
                key={tx._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 text-gray-700">
                  {new Date(tx.createdAt).toLocaleString('vi-VN')}
                </td>
                <td className="p-3 text-gray-700">{tx.user || '—'}</td>
                <td className="p-3 flex items-center gap-2 capitalize text-gray-800">
                  {getTypeIcon(tx.type)}
                  {tx.type}
                </td>
                <td className="p-3 font-medium text-gray-900">
                  {formatAmount(tx.amount)}
                </td>
                <td className="p-3">{tx.tokens}</td>
                <td className="p-3">{getStatusBadge(tx.status)}</td>
                <td className="p-3 text-gray-700">{tx.paymentGateway}</td>
                <td className="p-3 text-gray-600">{tx.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

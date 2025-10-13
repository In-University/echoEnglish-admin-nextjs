interface StatsProps {
  totalAmount: number;
  totalTransactions: number;
  succeeded: number;
  failed: number;
  purchased: number;
  used: number;
}

export default function PaymentStats({
  totalAmount,
  totalTransactions,
  succeeded,
  failed,
  purchased,
  used,
}: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
      <div className="p-3 border rounded-xl bg-green-50">
        <p className="text-sm text-gray-500">Total Spent</p>
        <h3 className="text-green-600 font-bold text-lg">
          {totalAmount.toLocaleString()} ₫
        </h3>
      </div>
      <div className="p-3 border rounded-xl bg-blue-50">
        <p className="text-sm text-gray-500">Credits Purchased</p>
        <h3 className="text-blue-600 font-bold text-lg">+{purchased}</h3>
      </div>
      <div className="p-3 border rounded-xl bg-red-50">
        <p className="text-sm text-gray-500">Credits Used</p>
        <h3 className="text-red-600 font-bold text-lg">-{used}</h3>
      </div>
      <div className="p-3 border rounded-xl bg-emerald-50">
        <p className="text-sm text-gray-500">Succeeded</p>
        <h3 className="text-emerald-600 font-bold text-lg">{succeeded}</h3>
      </div>
      <div className="p-3 border rounded-xl bg-purple-50">
        <p className="text-sm text-gray-500">Total Transactions</p>
        <h3 className="text-purple-600 font-bold text-lg">{totalTransactions}</h3>
      </div>
    </div>
  );
}

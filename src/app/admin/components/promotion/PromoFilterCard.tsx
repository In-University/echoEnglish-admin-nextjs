'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PromoFilterProps {
  filters: any;
  setFilters: (f: any) => void;
  reload: () => void;
}

const defaultFilters = {
  search: '',
  sort: 'desc',
  active: '',
  minDiscount: '',
  maxDiscount: '',
  status: '',
  availability: '',
};

// ─── Dropdown chọn ──────────────────────────────
const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div className="flex flex-col gap-2">
    <Label className="font-medium text-sm">{label}</Label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-3 py-2 w-full text-sm bg-white"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export function PromoFilterCard({
  filters,
  setFilters,
  reload,
}: PromoFilterProps) {
  const [showFilter, setShowFilter] = useState(true);

  const handleReset = () => {
    setFilters(defaultFilters);
    setTimeout(reload, 0); // đảm bảo reload sau khi setFilters hoàn tất
  };

  return (
    <div className="space-y-4">
      {/* ─── Thanh tìm kiếm ─────────────────────── */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Tìm mã khuyến mãi..."
          value={filters.search}
          onChange={(e) =>
            setFilters((f: any) => ({ ...f, search: e.target.value }))
          }
          className="pl-9"
        />
      </div>

      {/* ─── Bộ lọc khuyến mãi ───────────────────── */}
      <Card>
        <CardHeader
          className="flex flex-row justify-between items-center cursor-pointer select-none"
          onClick={() => setShowFilter(!showFilter)}
        >
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Filter className="w-5 h-5 text-muted-foreground" />
            Bộ lọc khuyến mãi
          </CardTitle>
          {showFilter ? <ChevronUp /> : <ChevronDown />}
        </CardHeader>

        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <CardContent className="pt-2 space-y-6">
                {/* ─── Dòng chọn dropdown ───────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <FilterSelect
                    label="Trạng thái hoạt động"
                    value={filters.active}
                    onChange={(v) =>
                      setFilters((f: any) => ({ ...f, active: v }))
                    }
                    options={[
                      { value: '', label: 'Tất cả' },
                      { value: 'true', label: 'Đang hoạt động' },
                      { value: 'false', label: 'Ngừng hoạt động' },
                    ]}
                  />

                  <FilterSelect
                    label="Sắp xếp"
                    value={filters.sort}
                    onChange={(v) =>
                      setFilters((f: any) => ({ ...f, sort: v }))
                    }
                    options={[
                      { value: 'desc', label: 'Mới nhất' },
                      { value: 'asc', label: 'Cũ nhất' },
                    ]}
                  />

                  <FilterSelect
                    label="Hiệu lực"
                    value={filters.status}
                    onChange={(v) =>
                      setFilters((f: any) => ({ ...f, status: v }))
                    }
                    options={[
                      { value: '', label: 'Tất cả' },
                      { value: 'valid', label: 'Còn hạn' },
                      { value: 'expired', label: 'Hết hạn' },
                    ]}
                  />

                  <FilterSelect
                    label="Tình trạng lượt dùng"
                    value={filters.availability}
                    onChange={(v) =>
                      setFilters((f: any) => ({ ...f, availability: v }))
                    }
                    options={[
                      { value: '', label: 'Tất cả' },
                      { value: 'available', label: 'Còn lượt' },
                      { value: 'out', label: 'Hết lượt' },
                    ]}
                  />
                </div>

                {/* ─── Khoảng giảm giá & Nút ───────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
                  <div className="col-span-2 flex flex-col gap-2">
                    <Label className="font-medium text-sm">
                      Khoảng giảm giá (%)
                    </Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        placeholder="Từ"
                        value={filters.minDiscount ?? ''}
                        onChange={(e) =>
                          setFilters((f: any) => ({
                            ...f,
                            minDiscount: e.target.value,
                          }))
                        }
                      />
                      <span className="text-muted-foreground">-</span>
                      <Input
                        type="number"
                        placeholder="Đến"
                        value={filters.maxDiscount ?? ''}
                        onChange={(e) =>
                          setFilters((f: any) => ({
                            ...f,
                            maxDiscount: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 lg:col-span-2 justify-end">
                    <Button onClick={reload}>Áp dụng</Button>
                    <Button variant="outline" onClick={handleReset}>
                      Làm mới
                    </Button>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}

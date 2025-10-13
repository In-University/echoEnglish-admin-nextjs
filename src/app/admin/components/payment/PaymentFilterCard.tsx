"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  onFilter: (filters: any) => void;
}

export default function PaymentFilters({ onFilter }: Props) {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [filters, setFilters] = useState<any>({
    type: "",
    status: "",
    gateway: "",
    userId: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (key: string, value: any) =>
    setFilters({ ...filters, [key]: value });

  const applyFilters = () => onFilter(filters);

  const clearFilters = () => {
    const reset = {
      type: "",
      status: "",
      gateway: "",
      userId: "",
      fromDate: "",
      toDate: "",
    };
    setFilters(reset);
    onFilter(reset);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <CardTitle className="text-lg font-semibold">
          Transaction Filters
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1"
        >
          {showFilters ? (
            <>
              <ChevronUp className="w-4 h-4" /> Hide
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> Show
            </>
          )}
        </Button>
      </CardHeader>

      {showFilters && (
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Transaction Type */}
            <div>
              <Label className="mb-2 block">Transaction Type</Label>
              <Select
                value={filters.type}
                onValueChange={(v: any) => handleChange("type", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">Purchase</SelectItem>
                  <SelectItem value="deduction">Deduction</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Gateway */}
            <div>
              <Label className="mb-2 block">Payment Gateway</Label>
              <Select
                value={filters.gateway}
                onValueChange={(v: any) => handleChange("gateway", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Gateways" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VNPAY">VNPay</SelectItem>
                  <SelectItem value="STRIPE">Stripe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div>
              <Label className="mb-2 block">Status</Label>
              <Select
                value={filters.status}
                onValueChange={(v: any) => handleChange("status", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INITIATED">Initiated</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="EXPIRED">Expired</SelectItem>
                  <SelectItem value="SUCCEEDED">Succeeded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* User ID */}
            <div>
              <Label className="mb-2 block">User ID</Label>
              <Input
                placeholder="Optional userId"
                value={filters.userId}
                onChange={(e) => handleChange("userId", e.target.value)}
              />
            </div>

            {/* Date Range */}
            <div className="col-span-2 md:col-span-3 flex items-end gap-2">
              <div className="flex-1">
                <Label className="mb-2 block">From Date</Label>
                <Input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => handleChange("fromDate", e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label className="mb-2 block">To Date</Label>
                <Input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => handleChange("toDate", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={clearFilters}>
              Clear All
            </Button>
            <Button onClick={applyFilters}>Apply</Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

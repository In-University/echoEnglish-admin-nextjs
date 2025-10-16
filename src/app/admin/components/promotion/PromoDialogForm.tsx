'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PromoDialogForm({ open, setOpen, editingPromo, onSave }: any) {
  const [form, setForm] = useState({
    code: '',
    discount: 0,
    usageLimit: 1,
    expiration: '',
    active: true,
  });

  useEffect(() => {
    if (editingPromo) {
      setForm({
        code: editingPromo.code,
        discount: editingPromo.discount,
        usageLimit: editingPromo.usageLimit,
        expiration: editingPromo.expiration,
        active: editingPromo.active,
      });
    } else {
      setForm({
        code: '',
        discount: 0,
        usageLimit: 1,
        expiration: '',
        active: true,
      });
    }
  }, [editingPromo]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingPromo ? 'Update Promotion' : 'Create New Promotion'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div className="flex flex-col gap-2">
            <Label className="font-medium">Promo Code</Label>
            <Input
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-medium">Discount (%)</Label>
            <Input
              type="number"
              value={form.discount}
              onChange={(e) =>
                setForm({ ...form, discount: Number(e.target.value) })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-medium">Usage Limit</Label>
            <Input
              type="number"
              value={form.usageLimit}
              onChange={(e) =>
                setForm({ ...form, usageLimit: Number(e.target.value) })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-medium">Expiration Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="date"
                className="pl-9"
                value={form.expiration ? form.expiration.split('T')[0] : ''}
                onChange={(e) =>
                  setForm({ ...form, expiration: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="h-4 w-4 accent-primary"
            />
            <Label>Active</Label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => onSave(form)}>
              {editingPromo ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

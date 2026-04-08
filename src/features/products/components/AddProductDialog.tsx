import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { ITEM_COLORS } from "../constants";
import type { Category, CreateProductRequest, Supplier } from "../types";
import ColorPicker from "./ColorPicker";
import PriceSection from "./PriceSection";
import SupplierSelect from "./SupplierSelect";
import { Switch } from "@/shared/ui/switch";

interface AddItemDialogProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  suppliers: Supplier[];
  onSubmit: (values: CreateProductRequest) => void;
}

const initialValues: CreateProductRequest = {
  visibleInSales: true,
  productName: "",
  productNameKr: "",
  color: ITEM_COLORS[0],
  amount: "",
  unitCost: "",
  inventoryUnit: "",
  barcode: "",
  categoryId: "",
  supplierId: "",
  taxable: true,
  retailPrice: "",
  totalVolume: "",
  description: "",
};

function parseNumber(value: string): number | "" {
  if (value.trim() === "") return "";
  const parsed = Number(value);
  return Number.isNaN(parsed) ? "" : parsed;
}

export default function AddItemDialog({
  open,
  onClose,
  categories,
  suppliers,
  onSubmit,
}: AddItemDialogProps) {
  const [form, setForm] = useState<CreateProductRequest>(initialValues);

  const selectableCategories = useMemo(
    () => categories.filter((category) => category.id !== "all"),
    [categories],
  );

  if (!open) return null;

  const handleChange = <K extends keyof CreateProductRequest>(
    key: K,
    value: CreateProductRequest[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    setForm(initialValues);
    onClose();
  };

  const handleCancel = () => {
    setForm(initialValues);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
      <div className="w-full max-w-[540px] rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">Add Item</h2>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-neutral-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-auto px-6 py-5">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-700">
                Show In Sales Screen
              </span>

              <Switch
                checked={form.visibleInSales}
                onCheckedChange={(v) => handleChange("visibleInSales", v)}
                />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700">
                Filter Key Color
              </label>
              <ColorPicker
                colors={ITEM_COLORS}
                value={form.color}
                onChange={(color) => handleChange("color", color)}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700">
                Item Name
              </label>
              <input
                value={form.productName}
                onChange={(e) => handleChange("productName", e.target.value)}
                className="h-10 w-full rounded-md border px-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700">
                Item Name (KR)
              </label>
              <input
                value={form.productNameKr}
                onChange={(e) => handleChange("productNameKr", e.target.value)}
                className="h-10 w-full rounded-md border px-3 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700">
                  Amount
                </label>
                <input
                  value={form.amount}
                  onChange={(e) =>
                    handleChange("amount", parseNumber(e.target.value))
                  }
                  className="h-10 w-full rounded-md border px-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700">
                  Inventory Unit
                </label>
                <input
                  value={form.inventoryUnit}
                  onChange={(e) =>
                    handleChange("inventoryUnit", e.target.value)
                  }
                  className="h-10 w-full rounded-md border px-3 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700">
                Barcode / SKU
              </label>
              <input
                value={form.barcode}
                onChange={(e) => handleChange("barcode", e.target.value)}
                className="h-10 w-full rounded-md border px-3 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700">
                  Category
                </label>
                <select
                  value={form.categoryId}
                  onChange={(e) => handleChange("categoryId", e.target.value)}
                  className="h-10 w-full rounded-md border bg-white px-3 text-sm outline-none"
                >
                  <option value="">Select category</option>
                  {selectableCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700">
                  Supplier
                </label>
                <SupplierSelect
                  suppliers={suppliers}
                  value={form.supplierId}
                  onChange={(supplierId) =>
                    handleChange("supplierId", supplierId)
                  }
                />
              </div>
            </div>

            <PriceSection
              unitCost={form.unitCost}
              retailPrice={form.retailPrice}
              taxable={form.taxable}
              onChangeUnitCost={(value) => handleChange("unitCost", value)}
              onChangeRetailPrice={(value) =>
                handleChange("retailPrice", value)
              }
              onChangeTaxable={(value) => handleChange("taxable", value)}
            />

            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700">
                Total Volume
              </label>
              <input
                value={form.totalVolume}
                onChange={(e) =>
                  handleChange("totalVolume", parseNumber(e.target.value))
                }
                className="h-10 w-full rounded-md border px-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t px-6 py-4">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md bg-neutral-100 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}
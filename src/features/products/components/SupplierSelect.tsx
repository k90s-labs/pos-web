import { ChevronDown, Check } from "lucide-react";
import { useMemo, useState } from "react";
import type { Supplier } from "../types";

interface SupplierSelectProps {
  suppliers: Supplier[];
  value: string;
  onChange: (supplierId: string) => void;
}

export default function SupplierSelect({
  suppliers,
  value,
  onChange,
}: SupplierSelectProps) {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const filteredSuppliers = useMemo(() => {
    const lower = keyword.trim().toLowerCase();

    if (!lower) return suppliers;

    return suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(lower),
    );
  }, [suppliers, keyword]);

  const selectedSupplier = suppliers.find((supplier) => supplier.id === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 text-sm text-neutral-800"
      >
        <span>{selectedSupplier?.name || "Select supplier"}</span>
        <ChevronDown className="h-4 w-4 text-neutral-500" />
      </button>

      {open ? (
        <div className="absolute z-20 mt-2 w-full rounded-lg border bg-white p-2 shadow-lg">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search supplier..."
            className="mb-2 h-9 w-full rounded-md border px-3 text-sm outline-none"
          />

          <div className="max-h-48 overflow-auto">
            {filteredSuppliers.length === 0 ? (
              <div className="px-3 py-2 text-sm text-neutral-500">
                No suppliers found.
              </div>
            ) : (
              filteredSuppliers.map((supplier) => {
                const selected = supplier.id === value;

                return (
                  <button
                    key={supplier.id}
                    type="button"
                    onClick={() => {
                      onChange(supplier.id);
                      setOpen(false);
                      setKeyword("");
                    }}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-neutral-50"
                  >
                    <span>{supplier.name}</span>
                    {selected ? <Check className="h-4 w-4 text-green-600" /> : null}
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
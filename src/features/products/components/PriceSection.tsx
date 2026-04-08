import { Switch } from "@/shared/ui/switch";

interface PriceSectionProps {
  unitCost: number | "";
  retailPrice: number | "";
  taxable: boolean;
  onChangeUnitCost: (value: number | "") => void;
  onChangeRetailPrice: (value: number | "") => void;
  onChangeTaxable: (value: boolean) => void;
}

function parseNumber(value: string): number | "" {
  if (value.trim() === "") return "";
  const parsed = Number(value);
  return Number.isNaN(parsed) ? "" : parsed;
}

export default function PriceSection({
  unitCost,
  retailPrice,
  taxable,
  onChangeUnitCost,
  onChangeRetailPrice,
  onChangeTaxable,
}: PriceSectionProps) {
  const cost = typeof unitCost === "number" ? unitCost : 0;
  const retail = typeof retailPrice === "number" ? retailPrice : 0;
  const profit = retail - cost;
  const margin = retail > 0 ? (profit / retail) * 100 : 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-700">
            Unit Cost
          </label>
          <input
            value={unitCost}
            onChange={(e) => onChangeUnitCost(parseNumber(e.target.value))}
            className="h-10 w-full rounded-md border px-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-700">
            Retail Price
          </label>
          <input
            value={retailPrice}
            onChange={(e) => onChangeRetailPrice(parseNumber(e.target.value))}
            className="h-10 w-full rounded-md border px-3 text-sm outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg border bg-neutral-50 p-3">
          <div className="text-neutral-500">Profit</div>
          <div className="mt-1 font-semibold">{profit.toFixed(2)}</div>
        </div>

        <div className="rounded-lg border bg-neutral-50 p-3">
          <div className="text-neutral-500">Margin</div>
          <div className="mt-1 font-semibold">{margin.toFixed(1)}%</div>
        </div>

        <div className="rounded-lg border bg-neutral-50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Taxable</span>
            <Switch
              checked={taxable}
                onCheckedChange={(v) => onChangeTaxable(v)}
                />
          </div>
        </div>
      </div>
    </div>
  );
}
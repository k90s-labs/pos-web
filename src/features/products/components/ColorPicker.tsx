import { Check } from "lucide-react";

interface ColorPickerProps {
  colors: string[];
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({
  colors,
  value,
  onChange,
}: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => {
        const selected = value === color;

        return (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className="flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white"
            style={{ backgroundColor: color }}
            aria-label={`select color ${color}`}
          >
            {selected ? <Check className="h-3 w-3 text-white" /> : null}
          </button>
        );
      })}
    </div>
  );
}
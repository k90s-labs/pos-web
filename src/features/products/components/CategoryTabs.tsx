import type { Category } from "../types";

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onChange: (categoryId: string) => void;
}

export default function CategoryTabs({
  categories,
  selectedCategory,
  onChange,
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const active = selectedCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={[
              "rounded-xl px-5 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-[#54545f] text-white"
                : "bg-[#f1f1f3] text-neutral-700 hover:bg-[#e8e8ed]",
            ].join(" ")}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
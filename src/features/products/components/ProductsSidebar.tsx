import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Items", to: "/items" },
  { label: "Categories", to: "/categories" },
  { label: "Discounts", to: "/discounts" },
];

export default function ProductsSidebar() {
  return (
    <aside className="w-[248px] shrink-0 bg-[#101116] text-white">
      <div className="flex h-14 items-center gap-3 border-b border-black/10 bg-white px-5 text-black">
        <Menu className="h-5 w-5" />
        <div className="text-lg font-black leading-none">
          <span className="text-green-500">UNI</span>
          <span className="text-orange-500">MART</span>
        </div>
      </div>

      <div className="px-5 py-7">
        <p className="mb-6 text-sm text-white/90">Items & Disc.</p>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex h-10 items-center rounded-xl px-4 text-sm transition-colors",
                  isActive
                    ? "bg-green-600 text-white"
                    : "text-white/80 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
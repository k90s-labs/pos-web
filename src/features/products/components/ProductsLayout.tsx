import type { ReactNode } from "react";
import ProductsHeader from "./ProductsHeader";
import ProductsSidebar from "./ProductsSidebar";

interface ProductsLayoutProps {
  children: ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <div className="h-screen bg-[#f7f7f8]">
      <div className="flex h-full overflow-hidden">
        <ProductsSidebar />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <ProductsHeader />

          <main className="flex-1 overflow-auto">
            <div className="min-h-full px-10 py-7">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
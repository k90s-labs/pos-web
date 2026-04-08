import type { Product } from "../types";

interface ProductsTableProps {
  products?: Product[];
  onDeleteProduct: (productId: number) => void;
  isDeleting?: boolean;
}

export default function ProductsTable({
  products = [],
  onDeleteProduct,
  isDeleting = false,
}: ProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] table-fixed border-collapse">
          <thead className="bg-[#f4f4f5] text-left text-sm text-neutral-600">
            <tr className="h-12">
              <th className="px-4 font-medium">Name (En)</th>
              <th className="px-4 font-medium">Name (KR)</th>
              <th className="px-4 font-medium">Price</th>
              <th className="px-4 font-medium">Stock / Qty</th>
              <th className="px-4 font-medium text-right">Last Sold</th>
              <th className="px-4 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-neutral-500"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="h-14 border-t text-sm text-neutral-800 hover:bg-neutral-50"
                >
                  <td className="px-4">{product.nameEn}</td>
                  <td className="px-4">{product.nameKr}</td>
                  <td className="px-4">{product.price.toFixed(2)}</td>
                  <td className="px-4">
                    <input
                      value={product.stockQty}
                      readOnly
                      className="h-8 w-[68px] rounded-lg border bg-[#fafafa] px-3 text-sm outline-none"
                    />
                  </td>
                  <td className="px-4 text-right">{product.lastSold}</td>
                  <td className="px-4 text-right">
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => onDeleteProduct(product.id)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
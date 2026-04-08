import { useState } from "react";
import { mockCategories } from "../api/getCategories";
import { mockSuppliers } from "../api/getSuppliers";
import AddItemDialog from "../components/AddProductDialog";
import ProductsLayout from "../components/ProductsLayout";
import ProductsToolbar, { type SearchField } from "../components/ProductsToolbar";
import PaginationBar from "../components/PaginationBar";
import { useCreateProductMutation } from "../hooks/useCreateProductMutation";
import { useDeleteProductMutation } from "../hooks/useDeleteProductMutation";
import { useProductQuery } from "../hooks/useProductQuery";
import type { CreateProductRequest } from "../types";
import ProductsTable from "../components/ProductsTable";

const PAGE_SIZE = 5;

export default function ProductsPage() {
  const [searchField, setSearchField] = useState<SearchField>("productName");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  const { data, isLoading, isError } = useProductQuery({
    search:
      searchField === "supplier"
        ? undefined
        : searchKeyword.trim() || undefined,
    category: selectedCategory === "all" ? undefined : selectedCategory,
    page: currentPage,
    size: PAGE_SIZE,
  });

  const createItemMutation = useCreateProductMutation();
  const deleteItemMutation = useDeleteProductMutation();

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleSubmitAddItem = async (values: CreateProductRequest) => {
    try {
      await createItemMutation.mutateAsync(values);
      setCurrentPage(1);
      setIsAddItemOpen(false);
    } catch (error) {
      console.error("create item failed:", error);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    const confirmed = window.confirm("이 상품을 삭제할까요?");
    if (!confirmed) return;

    try {
      await deleteItemMutation.mutateAsync(itemId);
    } catch (error) {
      console.error("delete item failed:", error);
    }
  };

  return (
    <>
      <ProductsLayout>
        <div className="space-y-6">
          <ProductsToolbar
            categories={mockCategories}
            suppliers={mockSuppliers}
            searchField={searchField}
            searchKeyword={searchKeyword}
            selectedCategory={selectedCategory}
            selectedSuppliers={selectedSuppliers}
            onChangeSearchField={(value: SearchField) => {
              setSearchField(value);
              setSearchKeyword("");
              setSelectedSuppliers([]);
              setCurrentPage(1);
            }}
            onChangeSearchKeyword={(value: string) => {
              setSearchKeyword(value);
              setCurrentPage(1);
            }}
            onChangeCategory={(value: string) => {
              setSelectedCategory(value);
              setCurrentPage(1);
            }}
            onChangeSuppliers={(value: string[]) => {
              setSelectedSuppliers(value);
              setCurrentPage(1);
            }}
            onOpenAddItem={() => setIsAddItemOpen(true)}
          />

          {isLoading ? (
            <div className="rounded-xl border bg-white px-6 py-10 text-sm text-neutral-500">
              Loading items...
            </div>
          ) : isError ? (
            <div className="rounded-xl border bg-white px-6 py-10 text-sm text-red-500">
              Failed to load items.
            </div>
          ) : (
            <>
              <ProductsTable
                products={products}
                onDeleteProduct={handleDeleteItem}
                isDeleting={deleteItemMutation.isPending}
              />
              <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                onChangePage={setCurrentPage}
              />
            </>
          )}
        </div>
      </ProductsLayout>

      <AddItemDialog
        open={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        categories={mockCategories}
        suppliers={mockSuppliers}
        onSubmit={handleSubmitAddItem}
      />
    </>
  );
}
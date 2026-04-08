import { ChevronDown, Download, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Category, Supplier } from "../types";

export type SearchField = "productName" | "barcode" | "supplier";

interface ProductsToolbarProps {
  categories?: Category[];
  suppliers?: Supplier[];
  searchField: SearchField;
  searchKeyword: string;
  selectedCategory: string;
  selectedSuppliers: string[];
  onChangeSearchField: (value: SearchField) => void;
  onChangeSearchKeyword: (value: string) => void;
  onChangeCategory: (value: string) => void;
  onChangeSuppliers: (value: string[]) => void;
  onOpenAddItem: () => void;
}

export default function ProductsToolbar({
  categories = [],
  suppliers = [],
  searchField,
  searchKeyword,
  selectedCategory,
  selectedSuppliers,
  onChangeSearchField,
  onChangeSearchKeyword,
  onChangeCategory,
  onChangeSuppliers,
  onOpenAddItem,
}: ProductsToolbarProps) {
  const [isSearchTypeOpen, setIsSearchTypeOpen] = useState(false);
  const [isSupplierPanelOpen, setIsSupplierPanelOpen] = useState(false);
  const [supplierKeyword, setSupplierKeyword] = useState("");
  const [draftSuppliers, setDraftSuppliers] = useState<string[]>(selectedSuppliers);

  useEffect(() => {
    setDraftSuppliers(selectedSuppliers);
  }, [selectedSuppliers]);

  const filteredSuppliers = useMemo(() => {
    const keyword = supplierKeyword.trim().toLowerCase();
    if (!keyword) return suppliers;

    return suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(keyword),
    );
  }, [supplierKeyword, suppliers]);

  const searchFieldLabelMap: Record<SearchField, string> = {
    productName: "Product Name",
    barcode: "Barcode",
    supplier: "Supplier",
  };

  const toggleDraftSupplier = (supplierId: string) => {
    setDraftSuppliers((prev) =>
      prev.includes(supplierId)
        ? prev.filter((id) => id !== supplierId)
        : [...prev, supplierId],
    );
  };

  const handleOpenSupplierPanel = () => {
    setDraftSuppliers(selectedSuppliers);
    setIsSupplierPanelOpen(true);
  };

  const handleApplySupplier = () => {
    onChangeSuppliers(draftSuppliers);
    setIsSupplierPanelOpen(false);
  };

  const handleClearSupplier = () => {
    setDraftSuppliers([]);
    setSupplierKeyword("");
    onChangeSuppliers([]);
    setIsSupplierPanelOpen(false);
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 whitespace-nowrap">
              Products
            </h1>

            <div className="relative flex h-12 w-full max-w-[720px] items-center overflow-visible rounded-xl border bg-white">
              <button
                type="button"
                onClick={() => setIsSearchTypeOpen((prev) => !prev)}
                className="flex h-full min-w-[160px] items-center justify-between border-r px-4 text-sm font-medium text-neutral-800"
              >
                <span>{searchFieldLabelMap[searchField]}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isSearchTypeOpen ? (
                <div className="absolute left-0 top-[56px] z-30 w-[180px] overflow-hidden rounded-xl border bg-white shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      onChangeSearchField("productName");
                      setIsSearchTypeOpen(false);
                      setIsSupplierPanelOpen(false);
                    }}
                    className="flex h-11 w-full items-center px-4 text-left text-sm hover:bg-neutral-50"
                  >
                    Product Name
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onChangeSearchField("barcode");
                      setIsSearchTypeOpen(false);
                      setIsSupplierPanelOpen(false);
                    }}
                    className="flex h-11 w-full items-center px-4 text-left text-sm hover:bg-neutral-50"
                  >
                    Barcode
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onChangeSearchField("supplier");
                      setIsSearchTypeOpen(false);
                      handleOpenSupplierPanel();
                    }}
                    className="flex h-11 w-full items-center bg-neutral-100 px-4 text-left text-sm hover:bg-neutral-200"
                  >
                    Supplier
                  </button>
                </div>
              ) : null}

              {searchField !== "supplier" ? (
                <div className="flex h-full min-w-0 flex-1 items-center gap-3 px-4">
                  <Search className="h-4 w-4 text-neutral-700" />
                  <input
                    value={searchKeyword}
                    onChange={(e) => onChangeSearchKeyword(e.target.value)}
                    placeholder={
                      searchField === "barcode"
                        ? "Search by barcode"
                        : "Search by name"
                    }
                    className="w-full bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOpenSupplierPanel}
                  className="flex h-full min-w-0 flex-1 items-center gap-3 px-4"
                >
                  <Search className="h-4 w-4 text-neutral-700" />
                  <span className="truncate text-sm text-neutral-400">
                    {selectedSuppliers.length > 0
                      ? `${selectedSuppliers.length} supplier selected`
                      : "Search suppliers"}
                  </span>
                </button>
              )}

              {isSupplierPanelOpen ? (
                <div className="absolute left-0 top-[60px] z-30 w-[360px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border bg-white shadow-xl lg:left-[180px] lg:w-[560px]">
                  <div className="border-b px-5 py-5">
                    <div className="mb-4 text-sm font-medium text-neutral-800">
                      Supplier
                    </div>

                    <div className="flex h-11 items-center gap-3 rounded-xl border px-4">
                      <Search className="h-4 w-4 text-neutral-700" />
                      <input
                        value={supplierKeyword}
                        onChange={(e) => setSupplierKeyword(e.target.value)}
                        placeholder="Search suppliers"
                        className="w-full bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div className="max-h-[320px] overflow-auto px-5 py-5">
                    <div className="space-y-4">
                      {filteredSuppliers.map((supplier) => {
                        const checked = draftSuppliers.includes(supplier.id);

                        return (
                          <button
                            key={supplier.id}
                            type="button"
                            onClick={() => toggleDraftSupplier(supplier.id)}
                            className="flex w-full items-center gap-4 text-left"
                          >
                            <div
                              className={[
                                "flex h-6 w-6 items-center justify-center rounded-md border text-xs",
                                checked
                                  ? "border-green-600 bg-green-600 text-white"
                                  : "border-neutral-300 bg-white text-transparent",
                              ].join(" ")}
                            >
                              ✓
                            </div>

                            <span className="text-sm text-neutral-900">
                              {supplier.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t px-5 py-4">
                    <button
                      type="button"
                      onClick={handleClearSupplier}
                      className="text-sm text-neutral-600"
                    >
                      Clear
                    </button>

                    <button
                      type="button"
                      onClick={handleApplySupplier}
                      className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onChangeCategory(category.id)}
                  className={[
                    "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
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
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-green-600 bg-white px-4 text-sm font-medium text-green-600 hover:bg-green-50"
          >
            <Download className="h-4 w-4" />
            Import Products
          </button>

          <button
            type="button"
            onClick={onOpenAddItem}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-green-600 px-4 text-sm font-medium text-white hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm text-neutral-800"
        >
          Newest
          <ChevronDown className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-xl border bg-white px-4 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            Delete All
          </button>
        </div>
      </div>
    </section>
  );
}
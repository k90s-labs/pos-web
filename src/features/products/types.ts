export interface Category {
  id: string;
  name: string;
}

export interface Supplier {
  id: string;
  name: string;
}

export interface Product {
  id: number;
  nameEn: string;
  nameKr: string;
  price: number;
  stockQty: number;
  lastSold: string;
  categoryId: string;
  supplierId: string;
  color: string;
  taxable: boolean;
  visibleInSales: boolean;
}

export interface GetProductParams {
  search?: string;
  category?: string;
  page?: number;
  size?: number;
}

export interface GetProductResponse {
  products: Product[];
  total: number;
  page: number;
  size: number;
}

export interface CreateProductRequest {
  visibleInSales: boolean;
  productName: string;
  productNameKr: string;
  color: string;
  amount: number | "";
  unitCost: number | "";
  inventoryUnit: string;
  barcode: string;
  categoryId: string;
  supplierId: string;
  taxable: boolean;
  retailPrice: number | "";
  totalVolume: number | "";
  description: string;
}
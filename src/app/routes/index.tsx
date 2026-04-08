// src/app/routes/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { PATHS } from "./paths";

import MainPage from "@/features/main/pages/MainPage";
import NotFoundPage from "@/pages/NotFound";
import ProductPage from "@/features/products/pages/ProductsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<MainPage />} />
      <Route path={PATHS.PRODUCTS} element={<ProductPage />} />

      {/* 아직 미구현 404로 */}
      <Route path={PATHS.LOGIN} element={<NotFoundPage />} />
      <Route path={PATHS.POS} element={<NotFoundPage />} />
      <Route path={PATHS.PRODUCTS} element={<NotFoundPage />} />
      <Route path={PATHS.ORDERS} element={<NotFoundPage />} />
      <Route path={PATHS.SETTINGS} element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
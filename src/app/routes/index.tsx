// src/app/routes/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { PATHS } from "./paths";

import IndexPage from "@/pages/Index";
import NotFoundPage from "@/pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<IndexPage />} />

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
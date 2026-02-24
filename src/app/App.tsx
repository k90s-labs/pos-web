// src/app/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers/queryClient";

import { TooltipProvider } from "@/shared/ui/tooltip";
import { Toaster } from "@/shared/ui/toaster";
import { Toaster as Sonner } from "@/shared/ui/sonner";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
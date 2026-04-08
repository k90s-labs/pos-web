import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

export default function PaginationBar({
  currentPage,
  totalPages,
  onChangePage,
}: PaginationBarProps) {
  return (
    <div className="flex items-center justify-center gap-6 py-6">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onChangePage(currentPage - 1)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f1f3] text-sm font-medium text-neutral-800">
        {currentPage}
      </div>

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onChangePage(currentPage + 1)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
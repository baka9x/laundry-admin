"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  query?: string;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, basePath, query = "" }) => {
  const router = useRouter();
  if (totalPages <= 1) return null;
  let prevPage = currentPage > 1 ? `${basePath}/page/${currentPage - 1}` : null;
  let nextPage = currentPage < totalPages ? `${basePath}/page/${currentPage + 1}` : null;

  if (query !== "") {
    prevPage = currentPage > 1 ? `${basePath}/page/${currentPage - 1}?q=${encodeURIComponent(query)}` : null;
    nextPage = currentPage < totalPages ? `${basePath}/page/${currentPage + 1}?q=${encodeURIComponent(query)}` : null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    // Trường hợp ít trang
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    // Trường hợp nhiều trang
    else {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);

      if (currentPage - 1 > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (totalPages - endPage > 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-end gap-1 my-1 mx-2 sm:overflow-x-visible overflow-x-scroll p-2">
      {/* Nút Previous */}
      {currentPage > 1 ? (
        <button
          onClick={() => prevPage && router.push(prevPage)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded-md ${currentPage === 1 ? "bg-[#1f1f1f] text-[#f5f5f5] cursor-not-allowed" : "bg-[#1f1f1f] hover:bg-[#1a1a1a]"} border border-[#333]`}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
		  <span className="sr-only">Trước</span>
          <span className="hidden sm:inline">Trước</span>
        </button>
      ) : (
        ""
      )}

      {/* Danh sách trang */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-4 py-2 text-[#f5f5f5]">...</span>
            ) : (
              <button onClick={() => page && router.push(`${basePath}/page/${page}`)} className={`px-4 py-2 rounded-md ${currentPage === page ? "bg-[#f6b100] text-[#f5f5f5]" : "bg-[#1f1f1f] hover:bg-[#1a1a1a]"} border border-[#333]`}>
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Nút Next */}
      <button
        onClick={() => nextPage && router.push(nextPage)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-[#383838] text-[#f5f5f5] cursor-not-allowed" : "bg-[#1f1f1f] hover:bg-[#1a1a1a]"} border border-[#333]`}
      >
        <span className="hidden sm:inline">Sau</span>
		<span className="sr-only">Sau</span>
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
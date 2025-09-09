'use client';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSiblings?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSiblings = 1,
}) => {
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = pageSiblings * 2 + 1;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let startPage = Math.max(1, currentPage - pageSiblings);
      let endPage = Math.min(totalPages, currentPage + pageSiblings);

      if (endPage - startPage + 1 < maxVisiblePages) {
        if (startPage === 1) endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        else if (endPage === totalPages) startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const renderButton = (
    label: string | number,
    page: number,
    disabled = false,
    isCurrent = false
  ) => (
    <button
      key={label}
      onClick={() => onPageChange(page)}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center
        min-w-[32px] h-8 px-2 mx-0.5 rounded-md
        font-semibold text-sm transition-all duration-200
        shadow-sm hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
        ${isCurrent
          ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-md transform scale-105'
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:text-blue-700'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' : 'cursor-pointer'}
        sm:min-w-[36px] sm:h-9 sm:px-3 sm:text-sm
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap justify-center items-center py-4 font-inter gap-1 sm:gap-2">
      {renderButton('«', 1, currentPage === 1)}
      {renderButton('‹', currentPage - 1, currentPage === 1)}
      {pageNumbers.map((page) => renderButton(page, page, false, page === currentPage))}
      {renderButton('›', currentPage + 1, currentPage === totalPages)}
      {renderButton('»', totalPages, currentPage === totalPages)}
    </div>
  );
};

export default Pagination;

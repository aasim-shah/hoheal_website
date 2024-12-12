"use client";

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationWrapper,
} from "@/components/ui/pagination";

interface Props {
  pagination: Pagination;
  page: number;
  changePage: (page: number) => void;
}

export default function Pagination({ pagination, page, changePage }: Props) {
  const { totalPages } = pagination;

  const hasNextPage = totalPages > 0 && page < totalPages;
  const hasPreviousPage = totalPages > 0 && page > 1;

  const handlePrevious = () => {
    if (hasPreviousPage) {
      changePage(page - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      changePage(page + 1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber !== page) {
      changePage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5;
  const pageNumLimit = Math.floor(maxPageNum / 2);

  const activePages = pageNumbers.slice(
    Math.max(0, page - 1 - pageNumLimit),
    Math.min(page - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const renderPages = () => {
    const renderedPages = activePages.map((pageNumber, idx) => (
      <PaginationItem key={idx}>
        <PaginationLink
          className={`cursor-pointer ${
            page === pageNumber
              ? "bg-signature-light text-white hover:bg-signature-light"
              : "hover:bg-background transition-colors"
          }`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ));

    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => changePage(activePages[0] - 1)}
        />
      );
    }

    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() => changePage(activePages[activePages.length - 1] + 1)}
        />
      );
    }

    return renderedPages;
  };

  return (
    <>
      {totalPages > 1 && (
        <PaginationWrapper className="py-4">
          <PaginationContent>
            {hasPreviousPage && (
              <PaginationItem className="cursor-pointer">
                <PaginationPrevious onClick={handlePrevious} />
              </PaginationItem>
            )}
            {renderPages()}
            {hasNextPage && (
              <PaginationItem className="cursor-pointer">
                <PaginationNext onClick={handleNext} />
              </PaginationItem>
            )}
          </PaginationContent>
        </PaginationWrapper>
      )}
    </>
  );
}

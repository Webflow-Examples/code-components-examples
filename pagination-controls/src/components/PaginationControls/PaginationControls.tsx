import { useState } from "react";

export interface PaginationControlsProps {
  id?: string;
  style?: "numbered" | "simple" | "loadMore";
  size?: "default" | "compact";
  alignment?: "left" | "center" | "right";
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  previousText?: string;
  nextText?: string;
  loadMoreText?: string;
  pageLabel?: string;
  ofLabel?: string;
  itemsLabel?: string;
  showPageInfo?: boolean;
  showItemsCount?: boolean;
  showFirstLast?: boolean;
  showPreviousNext?: boolean;
  maxVisiblePages?: number;
  firstPageText?: string;
  lastPageText?: string;
  ariaLabel?: string;
}

export default function PaginationControls({
  id,
  style = "numbered",
  size = "default",
  alignment = "center",
  currentPage = 1,
  totalPages = 20,
  itemsPerPage = 10,
  totalItems = 200,
  previousText = "Previous",
  nextText = "Next",
  loadMoreText = "Load More",
  pageLabel = "Page",
  ofLabel = "of",
  itemsLabel = "items",
  showPageInfo = true,
  showItemsCount = false,
  showFirstLast = false,
  showPreviousNext = true,
  maxVisiblePages = 7,
  firstPageText = "First",
  lastPageText = "Last",
  ariaLabel = "Pagination Navigation",
}: PaginationControlsProps) {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
    }
  };

  const handlePrevious = () => {
    handlePageChange(activePage - 1);
  };

  const handleNext = () => {
    handlePageChange(activePage + 1);
  };

  const handleFirst = () => {
    handlePageChange(1);
  };

  const handleLast = () => {
    handlePageChange(totalPages);
  };

  const handleLoadMore = () => {
    if (activePage < totalPages) {
      setActivePage(activePage + 1);
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, activePage - halfVisible);
    let endPage = Math.min(totalPages, activePage + halfVisible);

    if (activePage <= halfVisible) {
      endPage = maxVisiblePages;
    } else if (activePage >= totalPages - halfVisible) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const isPreviousDisabled = activePage === 1;
  const isNextDisabled = activePage === totalPages;
  const startItem = (activePage - 1) * itemsPerPage + 1;
  const endItem = Math.min(activePage * itemsPerPage, totalItems);

  const alignmentClass = `wf-paginationcontrols-align-${alignment}`;
  const sizeClass = `wf-paginationcontrols-size-${size}`;
  const styleClass = `wf-paginationcontrols-style-${style}`;

  if (style === "loadMore") {
    return (
      <nav
        id={id}
        className={`wf-paginationcontrols ${alignmentClass} ${sizeClass} ${styleClass}`}
        aria-label={ariaLabel}
      >
        <div className="wf-paginationcontrols-container">
          {showPageInfo && (
            <div className="wf-paginationcontrols-info">
              <span className="wf-paginationcontrols-info-text">
                {pageLabel} {activePage} {ofLabel} {totalPages}
              </span>
            </div>
          )}
          {showItemsCount && (
            <div className="wf-paginationcontrols-items-count">
              <span className="wf-paginationcontrols-items-text">
                {startItem}-{endItem} {ofLabel} {totalItems} {itemsLabel}
              </span>
            </div>
          )}
          {!isNextDisabled && (
            <button
              className="wf-paginationcontrols-loadmore-button"
              onClick={handleLoadMore}
              type="button"
            >
              {loadMoreText}
            </button>
          )}
        </div>
      </nav>
    );
  }

  if (style === "simple") {
    return (
      <nav
        id={id}
        className={`wf-paginationcontrols ${alignmentClass} ${sizeClass} ${styleClass}`}
        aria-label={ariaLabel}
      >
        <div className="wf-paginationcontrols-container">
          {showPreviousNext && (
            <button
              className="wf-paginationcontrols-button wf-paginationcontrols-previous"
              onClick={handlePrevious}
              disabled={isPreviousDisabled}
              type="button"
              aria-label={previousText}
            >
              <span className="wf-paginationcontrols-button-text">{previousText}</span>
            </button>
          )}
          {showPageInfo && (
            <div className="wf-paginationcontrols-info">
              <span className="wf-paginationcontrols-info-text">
                {pageLabel} {activePage} {ofLabel} {totalPages}
              </span>
            </div>
          )}
          {showItemsCount && (
            <div className="wf-paginationcontrols-items-count">
              <span className="wf-paginationcontrols-items-text">
                {startItem}-{endItem} {ofLabel} {totalItems} {itemsLabel}
              </span>
            </div>
          )}
          {showPreviousNext && (
            <button
              className="wf-paginationcontrols-button wf-paginationcontrols-next"
              onClick={handleNext}
              disabled={isNextDisabled}
              type="button"
              aria-label={nextText}
            >
              <span className="wf-paginationcontrols-button-text">{nextText}</span>
            </button>
          )}
        </div>
      </nav>
    );
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav
      id={id}
      className={`wf-paginationcontrols ${alignmentClass} ${sizeClass} ${styleClass}`}
      aria-label={ariaLabel}
    >
      <div className="wf-paginationcontrols-container">
        {(showPageInfo || showItemsCount) && (
          <div className="wf-paginationcontrols-header">
            {showPageInfo && (
              <div className="wf-paginationcontrols-info">
                <span className="wf-paginationcontrols-info-text">
                  {pageLabel} {activePage} {ofLabel} {totalPages}
                </span>
              </div>
            )}
            {showItemsCount && (
              <div className="wf-paginationcontrols-items-count">
                <span className="wf-paginationcontrols-items-text">
                  {startItem}-{endItem} {ofLabel} {totalItems} {itemsLabel}
                </span>
              </div>
            )}
          </div>
        )}
        <div className="wf-paginationcontrols-buttons">
          {showFirstLast && (
            <button
              className="wf-paginationcontrols-button wf-paginationcontrols-first"
              onClick={handleFirst}
              disabled={isPreviousDisabled}
              type="button"
              aria-label={firstPageText}
            >
              <span className="wf-paginationcontrols-button-text">{firstPageText}</span>
            </button>
          )}
          {showPreviousNext && (
            <button
              className="wf-paginationcontrols-button wf-paginationcontrols-previous"
              onClick={handlePrevious}
              disabled={isPreviousDisabled}
              type="button"
              aria-label={previousText}
            >
              <span className="wf-paginationcontrols-button-text">{previousText}</span>
            </button>
          )}
          <div className="wf-paginationcontrols-pages">
            {pageNumbers.map((page, index) => {
              if (typeof page === "string") {
                return (
                  <span
                    key={`${page}-${index}`}
                    className="wf-paginationcontrols-ellipsis"
                    aria-hidden="true"
                  >
                    ...
                  </span>
                );
              }
              const isActive = page === activePage;
              return (
                <button
                  key={page}
                  className={`wf-paginationcontrols-button wf-paginationcontrols-page ${
                    isActive ? "wf-paginationcontrols-page-active" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                  type="button"
                  aria-label={`${pageLabel} ${page}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="wf-paginationcontrols-button-text">{page}</span>
                </button>
              );
            })}
          </div>
          {showPreviousNext && (
            <button
              className="wf-paginationcontrols-button wf-paginationcontrols-next"
              onClick={handleNext}
              disabled={isNextDisabled}
              type="button"
              aria-label={nextText}
            >
              <span className="wf-paginationcontrols-button-text">{nextText}</span>
            </button>
          )}
          {showFirstLast && (
            <button
              className="wf-paginationcontrols-button wf-paginationcontrols-last"
              onClick={handleLast}
              disabled={isNextDisabled}
              type="button"
              aria-label={lastPageText}
            >
              <span className="wf-paginationcontrols-button-text">{lastPageText}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
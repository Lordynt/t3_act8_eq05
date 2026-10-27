import '../styles/Pagination.css';

const getPageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const visiblePages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages]
    .filter((page, index, list) => page >= 1 && page <= totalPages && list.indexOf(page) === index)
    .sort((a, b) => a - b);

  const result = [];
  visiblePages.forEach((page, index) => {
    if (index > 0 && page - visiblePages[index - 1] > 1) result.push('...');
    result.push(page);
  });
  return result;
};

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages < 1) return null;

  return (
    <nav className="pagination" aria-label="Paginación">
      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      {getPageNumbers(currentPage, totalPages).map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">…</span>
        ) : (
          <button
            key={page}
            type="button"
            className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Página siguiente"
      >
        ›
      </button>
    </nav>
  );
}
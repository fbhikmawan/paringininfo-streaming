import { PaginationMeta } from '@/types/bases';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  const { page, pageCount } = meta;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(
        <li key={i} className={i === page ? 'active' : ''}>
          <button onClick={() => onPageChange(i)}>{i}</button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="pagination-wrap mt-30">
          <nav>
            <ul>
              {page > 1 && (
                <li>
                  <button onClick={() => onPageChange(page - 1)}>Previous</button>
                </li>
              )}
              {renderPageNumbers()}
              {page < pageCount && (
                <li>
                  <button onClick={() => onPageChange(page + 1)}>Next</button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
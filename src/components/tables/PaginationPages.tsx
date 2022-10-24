import React from 'react';
import useNavigation from '../../hooks/useNavigation';


interface PaginationPagesProps {
  currentPage: number,
  numPages: number,
}

export default function PaginationPages({currentPage, numPages}: PaginationPagesProps) {
  const navigate = useNavigation();

  let range: Array<string>;
  if (numPages <= 7) {
    range = [...Array(numPages).keys()].map((n) => (n + 1).toString());
  } else {
    range = Array(7);
    range[0] = '1';
    range[6] = numPages.toString();

    if (currentPage >= 1 && currentPage <= 4) {
      for (let i = 1; i < 5; i++) {
        range[i] = (i + 1).toString();
      }
      range[5] = '...';
    } else if (currentPage >= numPages - 3 && currentPage <= numPages) {
      range[1] = '...';
      for (let i = 2; i < 7; i++) {
        range[i] = (numPages - 6 + i).toString();
      }
    } else {
      range[1] = '...';
      for (let i = 2; i < 5; i++) {
        range[i] = (currentPage - 3 + i).toString();
      }
      range[5] = '...';
    }
  }

  return (
    <>
      {range.map((page, index) => (
        <button
          key={index}
          className={page === currentPage.toString() ? 'number current' : 'number'}
          disabled={page === currentPage.toString() || page === '...'}
          onClick={() => navigate({page: page})}
        >
          {page}
        </button>
      ))}
    </>
  );
}

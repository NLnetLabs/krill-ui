import React from 'react';
import useStore from '../../hooks/useStore';
import {AspaField, Filtering} from '../../core/types';
import useTranslations from '../../hooks/useTranslations';
import Store from '../../core/store';
import {perPage} from '../../core/config';
import useNavigation from '../../hooks/useNavigation';
import PaginationPages from './PaginationPages';

interface PaginationProps {
  filtering: Filtering<AspaField>,
}

export default function AspaPagination({filtering}: PaginationProps) {
  const t = useTranslations();
  const store = useStore() as Store;
  const count = store.getRoas().length;
  const navigate = useNavigation();
  const pages = Math.ceil(count / filtering.limit);

  return (
    <div className="pagination">
      <select
        value={filtering.limit}
        onChange={(e) => navigate({limit: e.target.value, page: '1'})}
      >
        {perPage.map((n) => (
          <option key={n} value={n}>{n} / {t.common.page}</option>
        ))}
      </select>
      <div>
        <button
          disabled={filtering.page === 1}
          className="arrow prev"
          onClick={() => navigate({page: (filtering.page - 1).toString()})}
        >
          <span>&lt;</span>
        </button>
        <PaginationPages currentPage={filtering.page} numPages={pages}></PaginationPages>
        <button
          disabled={filtering.page > pages - 1}
          className="arrow next"
          onClick={() => navigate({page: (filtering.page + 1).toString()})}
        >
          <span>&gt;</span>
        </button>
      </div>
    </div>
  );
}

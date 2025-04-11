import React, { useEffect, useState } from 'react';
import { AspaField, Filtering } from '../core/types';
import useNavigation from '../hooks/useNavigation';
import useTranslations from '../hooks/useTranslations';

interface AspaSearchProps {
  filtering: Filtering<AspaField>,
}

export default function AspaSearch({ filtering }: AspaSearchProps) {
  const t = useTranslations();
  const navigate = useNavigation();
  const [query, setQuery] = useState<string | null>(filtering.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        navigate({ search: query });
      } else {
        navigate({ search: undefined });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setQuery(filtering.search);
  }, [filtering.search]);

  return (
    <input
      type="search"
      value={query || ''}
      placeholder={t.aspas.search}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

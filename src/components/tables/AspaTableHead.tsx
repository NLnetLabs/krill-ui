import React from 'react';
import {AspaField, AspaTableHeading, Filtering, SortOrder} from '../../core/types';
import useNavigation from '../../hooks/useNavigation';

export interface AspaTableHeadProps {
  filtering: Filtering<AspaField>,
  columns: AspaTableHeading,
}

export default function RoaTableHead({ columns, filtering }: AspaTableHeadProps) {
  const navigate = useNavigation();

  const handleSortingChange = (sort: AspaField) => {
    const order = (filtering.sort === sort && filtering.order === SortOrder.asc) ? SortOrder.desc : SortOrder.asc;
    navigate({ sort, order });
  };

  return (
    <thead>
      <tr>
        <th />
        {columns.map(({label, accessor}) => (
          <th
            key={accessor}
            onClick={() => handleSortingChange(accessor)}
          >
            {label}
            {accessor === filtering.sort && (
              <span className={filtering.order} />
            )}
          </th>
        ))}
        <th />
      </tr>
    </thead>
  );
}

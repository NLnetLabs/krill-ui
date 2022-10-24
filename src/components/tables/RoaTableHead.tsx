import React from 'react';
import {Filtering, RoaField, RoaTableHeading, SortOrder} from '../../core/types';
import useNavigation from '../../hooks/useNavigation';

export interface RoaTableHeadProps {
  filtering: Filtering<RoaField>,
  columns: RoaTableHeading,
}

export default function RoaTableHead({ columns, filtering }: RoaTableHeadProps) {
  const navigate = useNavigation();

  const handleSortingChange = (sort: RoaField) => {
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

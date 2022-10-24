import React from 'react';
import {BgpTableHeading, CheckBoxState, Filtering, SortOrder, SuggestionField} from '../../core/types';
import useNavigation from '../../hooks/useNavigation';

export interface SuggestionsTableHeadProps {
  columns : BgpTableHeading,
  filtering: Filtering<SuggestionField>,
  setAllCheckboxes: (event: React.ChangeEvent<HTMLInputElement>) => void,
  checkBoxState: CheckBoxState,
}

export default function SuggestionsTableHead({columns, filtering, setAllCheckboxes, checkBoxState}:SuggestionsTableHeadProps) {
  const navigate = useNavigation();

  const handleSortingChange = (sort: SuggestionField) => {
    const order = (filtering.sort === sort && filtering.order === SortOrder.asc) ? SortOrder.desc : SortOrder.asc;
    navigate({ sort, order });
  };

  return (
    <thead>
      <tr>
        <th>
          <input
            type='checkbox'
            checked={checkBoxState === CheckBoxState.checked}
            onChange={setAllCheckboxes}
            ref={checkbox => {
              if (checkbox){
                checkbox.indeterminate = checkBoxState === CheckBoxState.intermediate;
              }
            }
            }
          />
        </th>
        <th/>
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
        <th/>
      </tr>
    </thead>
  );
}
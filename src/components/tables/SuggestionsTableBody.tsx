import React from 'react';
import {Suggestion} from '../../core/types';
import SuggestionsTableRow from './SuggestionsTableRow';

export interface SuggestionsTableBodyProps {
  suggestions: Array<Suggestion>,
  checkedBoxes: Array<string>,
  handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function SuggestionsTableBody({suggestions, checkedBoxes, handleCheckbox}: SuggestionsTableBodyProps) {
  return (
    <tbody>
      {suggestions.map((suggestion) => (
        <tr key={suggestion.id}>
          <SuggestionsTableRow
            checked={checkedBoxes.includes(suggestion.id || '')}
            suggestion={suggestion}
            id={suggestion.id || ''}
            handleCheckbox={handleCheckbox}/>
        </tr>
      ))}
    </tbody>
  );
}
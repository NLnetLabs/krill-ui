import React from 'react';
import {Suggestion} from '../../core/types';
import useTranslations from '../../hooks/useTranslations';
import trash from '../../img/trash-can-light.svg?url';
import plus from '../../img/plus-light.svg?url';

export interface SuggestionsTableRowProps {
  suggestion: Suggestion,
  id: string,
  checked: boolean,
  handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function SuggestionsTableRow({suggestion, id, checked, handleCheckbox}: SuggestionsTableRowProps) {
  const t = useTranslations();
  const reason = t.caDetails.suggestions.reasons[suggestion.reason];
  
  return (
    <>
      <td><input type="checkbox" id={id} onChange={handleCheckbox} checked={checked}/></td>
      <td>
        {suggestion.action === 'add' && (
          <img src={plus} title={`${t.caDetails.suggestions.willAdd} (${reason})`}/>
        )}
        {suggestion.action === 'remove' && (
          <img src={trash} title={`${t.caDetails.suggestions.willRemove} (${reason})`}/>
        )}
      </td>
      <td>{suggestion.asn}</td>
      <td>{suggestion.prefix}</td>
      <td>{t.caDetails.suggestions.reasons[suggestion.reason]}</td>
    </>
  );
}
import React from 'react';
import {Suggestion} from '../../core/types';
import useTranslations from '../../hooks/useTranslations';
import trash from '../../img/trash-red.svg?url';
import plus from '../../img/check-green.svg?url';

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
          <span className="add" title={t.caDetails.suggestions.adding}>
            <img src={plus} title={`${t.caDetails.suggestions.willAdd} (${reason})`} />
          </span>
        )}
        {suggestion.action === 'remove' && (
          <span className="remove" title={t.caDetails.suggestions.willRemove}>
            <img src={trash} title={`${t.caDetails.suggestions.willRemove} (${reason})`} />
          </span>
        )}
      </td>
      <td>{suggestion.asn}</td>
      <td>{suggestion.prefix}</td>
      <td>{t.caDetails.suggestions.reasons[suggestion.reason]}</td>
    </>
  );
}

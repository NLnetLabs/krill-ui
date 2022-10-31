import React from 'react';
import useTranslations from '../../hooks/useTranslations';
import useNavigation from '../../hooks/useNavigation';
import SuggestionsTable from '../tables/SuggestionsTable';
import {Filtering, SuggestionField} from '../../core/types';
import useAnalyze from '../../hooks/useAnalyse';

export interface AnalyseProps {
  onClose: () => void,
  filtering: Filtering<SuggestionField>,
}

export default function Analyse({onClose, filtering}: AnalyseProps) {
  const t = useTranslations();
  const navigate = useNavigation();
  const {    
    checked,
    topCheckbox,
    suggestions,
    handleCheckbox,
    handleAllCheckboxes
  } = useAnalyze(filtering);

  return (
    <>
      <h3>{t.caDetails.analysis}</h3>
      {suggestions.length > 0 &&
        <>
          <div>
            {t.caDetails.suggestions.following}
            {' '}
            <a href='https://krill.docs.nlnetlabs.nl/en/stable/manage-roas.html' target='_blank' rel='noreferrer'>
              {t.caDetails.suggestions.readMore}
            </a>
          </div>
          <SuggestionsTable
            checkedBoxes={checked}
            suggestions={suggestions}
            filtering={filtering}
            handleCheckbox={handleCheckbox}
            handleAllCheckboxes={handleAllCheckboxes}
            topCheckBoxState={topCheckbox}
          />
        </>}
      {suggestions.length === 0 && (
        t.caDetails.suggestions.nochanges
      )}
      <div className="actions">
        {suggestions.length > 0 && (
          <>
            <button
              className="button outline"
              onClick={onClose}
            >
              {t.common.cancel}
            </button>
            <button
              className="button"
              onClick={() => navigate({ids: JSON.stringify(checked)}, 'cas.change')}
            >
              {t.common.confirm}
            </button>
          </>
        )}
        {suggestions.length === 0 && (
          <button
            className='button'
            onClick={onClose}>
            {t.common.ok}
          </button>
        )}
      </div>
    </>
  );
}

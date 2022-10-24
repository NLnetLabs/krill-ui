import React, {useState} from 'react';
import useTranslations from '../../hooks/useTranslations';
import useNavigation from '../../hooks/useNavigation';
import Store from '../../core/store';
import useStore from '../../hooks/useStore';
import SuggestionsTable from '../tables/SuggestionsTable';
import {CheckBoxState, Filtering, SuggestionField} from '../../core/types';


export interface AnalyseProps {
  onClose: () => void,
  filtering: Filtering<SuggestionField>,
}


export default function Analyse({onClose, filtering}: AnalyseProps) {
  const t = useTranslations();
  const navigate = useNavigation();
  const store = useStore() as Store;
  const suggestions = store.getSuggestions(filtering);
  const suggestionIds: string[] = [];
  for (const suggestion of suggestions) {
    suggestionIds.push(suggestion.id || '');
  }

  const [checked, setChecked] = useState<string[]>([]);
  const [topCheckbox, setTopCheckbox] = useState<CheckBoxState>(CheckBoxState.unchecked);
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.id];
      if (suggestionIds.every((id) => updatedList.includes(id))) {
        setTopCheckbox(CheckBoxState.checked);
      } else {
        setTopCheckbox(CheckBoxState.intermediate);
      }
    } else {
      updatedList.splice(checked.indexOf(event.target.id), 1);
      if (updatedList.length > 0){
        setTopCheckbox(CheckBoxState.intermediate);
      } else {
        setTopCheckbox(CheckBoxState.unchecked);
      }
    }
    setChecked(updatedList);
  };

  const handleAllCheckboxes = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked(suggestionIds);
      setTopCheckbox(CheckBoxState.checked);
    } else {
      setChecked([]);
      setTopCheckbox(CheckBoxState.unchecked);
    }
  };


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
      {suggestions.length === 0 &&
        t.caDetails.suggestions.nochanges}
      <div className="actions">
        {suggestions.length > 0 &&
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
          </>}
        {suggestions.length === 0 &&
        <button
          className='button'
          onClick={onClose}>
          {t.common.ok}
        </button>}
      </div>
    </>
  );
}
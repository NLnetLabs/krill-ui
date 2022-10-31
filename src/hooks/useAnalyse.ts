import React, {useState} from 'react';
import Store from '../core/store';
import useStore from '../hooks/useStore';
import {CheckBoxState, Filtering, SuggestionField} from '../core/types';

export default function useAnalyze(filtering: Filtering<SuggestionField>) {
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
  
  return {
    checked,
    topCheckbox,
    suggestions,
    handleCheckbox,
    handleAllCheckboxes,
  };
}
import React from 'react';
import {
  BgpTableHeading,
  CheckBoxState,
  Filtering,
  Suggestion,
  SuggestionField
} from '../../core/types';
import useTranslations from '../../hooks/useTranslations';
import SuggestionsTableHead from './SuggestionsTableHead';
import SuggestionsTableBody from './SuggestionsTableBody';


export interface SuggestionsTableProps {
  suggestions: Array<Suggestion>,
  filtering: Filtering<SuggestionField>,
  checkedBoxes: Array<string>,
  handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleAllCheckboxes: (event: React.ChangeEvent<HTMLInputElement>) => void,
  topCheckBoxState: CheckBoxState,
}

export default function SuggestionsTable({
  suggestions,
  filtering,
  checkedBoxes,
  handleCheckbox,
  handleAllCheckboxes,
  topCheckBoxState
}: SuggestionsTableProps) {
  const t = useTranslations();

  const columns: BgpTableHeading = [
    {label: t.announcements.asn, accessor: SuggestionField.asn},
    {label: t.announcements.prefix, accessor: SuggestionField.prefix},
  ];


  return (
    <table>
      <SuggestionsTableHead
        columns={columns}
        filtering={filtering}
        setAllCheckboxes={handleAllCheckboxes}
        checkBoxState={topCheckBoxState}/>
      <SuggestionsTableBody
        checkedBoxes={checkedBoxes}
        suggestions={suggestions}
        handleCheckbox={handleCheckbox}/>
    </table>
  );
}
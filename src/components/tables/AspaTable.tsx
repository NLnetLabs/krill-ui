import React from 'react';
import useStore from '../../hooks/useStore';
import AspaTableHead from './AspaTableHead';
import { AspaField, AspaTableHeading, Filtering, RoaField } from '../../core/types';
import AspaTableBody from './AspaTableBody';
import useTranslations from '../../hooks/useTranslations';
import Store from '../../core/store';

interface AspaTableProps {
  filtering: Filtering<AspaField>,
}

export default function AspaTable({ filtering }: AspaTableProps) {
  const t = useTranslations();
  const store = useStore() as Store;
  const aspas = store.getAspas(filtering);

  const columns: AspaTableHeading = [
    {label: t.aspas.customer, accessor: AspaField.customer },
    {label: t.aspas.providers, accessor: AspaField.providers },
  ];

  return (
    <table className="roa-table">
      <AspaTableHead columns={columns} filtering={filtering} />
      <AspaTableBody tableData={aspas} />
    </table>
  );
}

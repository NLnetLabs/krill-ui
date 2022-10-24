import React from 'react';
import useStore from '../../hooks/useStore';
import RoaTableHead from './RoaTableHead';
import { Filtering, RoaField, RoaTableHeading } from '../../core/types';
import RoaTableBody from './RoaTableBody';
import useTranslations from '../../hooks/useTranslations';
import Store from '../../core/store';

interface RoaTableProps {
  filtering: Filtering<RoaField>,
}

export default function RoaTable({ filtering }: RoaTableProps) {
  const t = useTranslations();
  const store = useStore() as Store;
  const roas = store.getRoas(filtering);

  const columns: RoaTableHeading = [
    {label: t.announcements.asn, accessor: RoaField.asn },
    {label: t.announcements.prefix, accessor: RoaField.prefix },
    {label: t.announcements.stateLabel, accessor: RoaField.state },
  ];

  return (
    <table className="roa-table">
      <RoaTableHead columns={columns} filtering={filtering} />
      <RoaTableBody tableData={roas} />
    </table>
  );
}

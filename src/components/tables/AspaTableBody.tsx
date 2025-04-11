import React from 'react';
import { Aspa } from '../../core/types';
import AspaTableRow from './AspaTableRow';

export interface AspaTableBodyProps {
  tableData: Array<Aspa>,
}

export default function AspaTableBody({ tableData }: AspaTableBodyProps) {
  return (
    <tbody>
      {tableData.map((aspa) => (
        <AspaTableRow
          key={aspa.id}
          aspa={aspa}
        />
      ))}
    </tbody>
  );
}
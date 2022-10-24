import React from 'react';
import {Roa, RoaState} from '../../core/types';
import RoaTableRow from './RoaTableRow';

export interface RoaTableBodyProps {
  tableData: Array<Roa>,
}

export default function RoaTableBody({tableData}: RoaTableBodyProps) {
  return (
    <tbody>
      {tableData.map((roa) => (
        <RoaTableRow
          key={roa.id}
          roa={roa}
          hasAnnouncements={!!roa.authorizes || !!roa.disallows}
          allowDelete={roa.state === RoaState.RoaSeen || roa.state === RoaState.RoaDisallowing || roa.state === RoaState.RoaUnseen}
          allowAdd={roa.state === RoaState.AnnouncementNotFound || roa.state === RoaState.AnnouncementInvalidAsn || roa.state === RoaState.AnnouncementInvalidLength}
        />
      ))}
    </tbody>
  );
}
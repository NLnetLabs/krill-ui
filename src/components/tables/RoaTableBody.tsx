import React from 'react';
import { Roa, RoaState } from '../../core/types';
import RoaTableRow from './RoaTableRow';

export interface RoaTableBodyProps {
  tableData: Array<Roa>,
}

export default function RoaTableBody({ tableData }: RoaTableBodyProps) {
  return (
    <tbody>
      {tableData.filter((roa) => roa.state != RoaState.AnnouncementDisallowedAs0).map((roa) => (
        <RoaTableRow
          key={roa.id}
          roa={roa}
          hasAnnouncements={!!roa.authorizes || !!roa.disallows}
          allowDelete={roa.state === RoaState.RoaSeen || roa.state == RoaState.RoaAs0 || roa.state === RoaState.RoaDisallowing || roa.state === RoaState.RoaUnseen || roa.state === RoaState.RoaRedundant || roa.state === RoaState.RoaAs0Redundant || roa.state === RoaState.RoaTooPermissive || roa.state === RoaState.RoaNotHeld}
          allowAdd={roa.state === RoaState.AnnouncementNotFound || roa.state === RoaState.AnnouncementInvalidAsn || roa.state === RoaState.AnnouncementInvalidLength}
        />
      ))}
    </tbody>
  );
}
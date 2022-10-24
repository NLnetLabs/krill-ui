import React from 'react';
import {BgpAnnouncement} from '../../core/types';
import useTranslations from '../../hooks/useTranslations';
import BgpTable from './BgpTable';

export interface RoaTableRowSubTableProps {
  authorizes: Array<BgpAnnouncement>,
  disallows: Array<BgpAnnouncement>,
}

export default function RoaTableRowSubTable({authorizes, disallows}: RoaTableRowSubTableProps) {
  const t = useTranslations();

  return (
    <div className="row">
      <div>
        <h3>{t.announcements.authorizes.replace('{number}', authorizes.length.toString())}</h3>
        <BgpTable announcements={authorizes}/>
      </div>
      <div>
        <h3>{t.announcements.disallows.replace('{number}', disallows.length.toString())}</h3>
        <BgpTable announcements={disallows}/>
      </div>
    </div>
  );
}
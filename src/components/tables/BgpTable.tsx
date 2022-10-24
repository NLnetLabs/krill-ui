import React from 'react';
import {BgpAnnouncement} from '../../core/types';
import useTranslations from '../../hooks/useTranslations';

export interface BgpTableProps {
  announcements: Array<BgpAnnouncement>,
}

export default function BgpTable({announcements}: BgpTableProps) {
  const t = useTranslations();

  return (
    <table>
      <thead>
        <tr>
          <th>{t.announcements.asn}</th>
          <th>{t.announcements.prefix}</th>
        </tr>
      </thead>
      <tbody>
        {announcements.length === 0 && (
          <tr>
            <td colSpan={2}>
              <span className="muted">{t.common.nodata}</span>
            </td>
          </tr>
        )}
        {announcements.map((announcement, index) => (
          <tr key={index}>
            <td>
              {announcement.asn}
            </td>
            <td>
              {announcement.prefix}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
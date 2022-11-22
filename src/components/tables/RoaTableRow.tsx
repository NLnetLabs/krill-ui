import React, { useState } from 'react';
import {Roa, RoaStateHelp} from '../../core/types';
import useTranslations from '../../hooks/useTranslations';
import RoaTableRowSubTable from './RoaTableRowSubTable';
import trash from '../../img/trash.svg?url';
import edit from '../../img/edit.svg?url';
import plus from '../../img/plus.svg?url';
import useNavigation from '../../hooks/useNavigation';

export interface RoaTableRowProps {
  roa: Roa,
  allowAdd: boolean,
  allowDelete: boolean,
  hasAnnouncements: boolean,
}

export default function RoaTableRow({ roa, allowAdd, allowDelete, hasAnnouncements }: RoaTableRowProps) {
  const navigate = useNavigation();
  const [expanded, setExpanded] = useState<boolean>(false);
  const t = useTranslations();
  const params: Record<string, string> = {
    id: roa.id?.toString() || 'new',
  };
  const helpKey = `${roa.state}_help` as RoaStateHelp;
  const helpText = t.announcements.state[helpKey];

  return (
    <>
      <tr className={hasAnnouncements ? 'announcements' : ''}>
        <td>
          {hasAnnouncements && (
            <button
              className={`expand ${expanded ? 'open' : ''}`}
              onClick={() => setExpanded(!expanded)}
            />
          )}
        </td>
        <td>
          {roa.asn}
        </td>
        <td>
          {roa.prefix}
          {roa.max_length && (-roa.max_length)}
        </td>
        <td>
          {roa.comment}
        </td>
        <td>
          <span className={`state ${roa.state}`} title={helpText}>
            {t.announcements.state[roa.state]}
          </span>
          {roa.authorizes && (
            <span className="badge success">{roa.authorizes.length}</span>
          )}
          {roa.disallows && (
            <span className="badge warning">{roa.disallows.length}</span>
          )}
        </td>
        <td className="actions">
          {allowAdd && (
            <button className="button icon" onClick={() => navigate(params, 'cas.add')}>
              <img src={plus} />
            </button>
          )}
          {allowDelete && (
            <>
              <button className="button icon light" onClick={() => navigate(params, 'cas.edit')}>
                <img src={edit} />
              </button>
              <button className="button icon" onClick={() => navigate(params, 'cas.delete')}>
                <img src={trash} />
              </button>
            </>
          )}
        </td>
      </tr>
      {hasAnnouncements && expanded && (
        <tr className="announcements">
          <td colSpan={6}>
            <RoaTableRowSubTable
              authorizes={roa.authorizes || []}
              disallows={roa.disallows || []}
            />
          </td>
        </tr>
      )}
    </>
  );
}

import React, { useState } from 'react';
import {Aspa} from '../../core/types';
import useTranslations from '../../hooks/useTranslations';
import trash from '../../img/trash.svg?url';
import edit from '../../img/edit-white.svg?url';
import useNavigation from '../../hooks/useNavigation';

export interface AspaTableRowProps {
  aspa: Aspa
}

export default function AspaTableRow({ aspa }: AspaTableRowProps) {
  const navigate = useNavigation();
  const t = useTranslations();
  const params: Record<string, string> = {
    id: aspa.id?.toString() || 'new',
  };

  return (
    <>
      <tr>
        <td>
          
        </td>
        <td>
          {aspa.customer}
        </td>
        <td>
          {aspa.providers.join(", ")}
        </td>
        <td className="actions">
            <button className="button icon" onClick={() => navigate(params, 'cas.aspas.edit')}>
              <img src={edit} />
            </button>
            <button className="button icon" onClick={() => navigate(params, 'cas.aspas.delete')}>
              <img src={trash} />
            </button>
        </td>
      </tr>
    </>
  );
}

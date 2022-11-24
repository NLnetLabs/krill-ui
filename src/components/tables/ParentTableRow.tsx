import React from 'react';
import { formatDate } from '../../core/utils';
import { Parent } from '../../core/types';
import useTranslations from '../../hooks/useTranslations';
import useStore from '../../hooks/useStore';

export interface ParentTableRowProps {
  parent: Parent,
  loading: boolean,
}

export default function ParentTableRow({parent, loading}: ParentTableRowProps) {
  const t = useTranslations();
  const { locale } = useStore();

  const date = loading ?
    t.caDetails.loading.replace('{handle}', '...') :
    formatDate(parent.last_exchange.timestamp, locale);

  return (
    <div className="info-table">
      <h4>{parent.name}</h4>
      <table>
        <tbody>
          <tr>
            <th>{t.caDetails.parents}</th>
            <td>{parent.last_exchange.uri}</td>
          </tr>
          <tr>
            <th>{t.caDetails.lastExchange}</th>
            <td>
              {parent.last_exchange.result != 'Success' ? (
                <p className="failure">
                  {date}<br />
                  {parent.last_exchange.result.Failure.msg}
                </p>
              ) :(
                <p className="success">{date}</p>
              )}
            </td>
          </tr>
          <tr>
            <th>{t.caDetails.allResources}</th>
            <td>
            ASN: {parent.all_resources.asn}<br />
            IPv4: {parent.all_resources.ipv4}<br />
            IPv6: {parent.all_resources.ipv6}<br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

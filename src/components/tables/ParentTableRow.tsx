import React from 'react';
import { formatDate } from '../../core/utils';
import { Parent } from '../../core/types';
import useTranslations from '../../hooks/useTranslations';

export interface ParentTableRowProps {
  parent: Parent,
  locale: string,
}

export default function ParentTableRow({ parent, locale }: ParentTableRowProps) {
  const t = useTranslations();

  return (
    <table>
      <thead>
        <tr>
          <th>
            {parent.name}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ t.caDetails.parents }</td>
          <td>{ parent.last_exchange.uri }</td>
        </tr>
        <tr>
          <td>{ t.caDetails.lastExchange }</td>
          <td>
            { formatDate(parent.last_exchange.timestamp, locale) }
            { parent.last_exchange.result != 'Success'
              ? ( <span className='failure'>FAILURE ICON{ parent.last_exchange.result.Failure.msg }</span> )
              : ( <span className='success'>SUCCES ICON</span> )
            }
          </td>
        </tr>
        <tr>
          <td>{ t.caDetails.allResources }</td>
          <td>
            ASN: { parent.all_resources.asn }<br />
            IPv4: { parent.all_resources.ipv4 }<br />
            IPv6: { parent.all_resources.ipv6 }<br />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

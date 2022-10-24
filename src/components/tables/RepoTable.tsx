import React from 'react';
import useTranslations from '../../hooks/useTranslations';
import { formatDate } from '../../core/utils';
import { RepoStatus } from '../../core/types';

export interface RepoTableProps {
  repo: RepoStatus,
  locale: string,
}

export default function RepoTable({ repo, locale }: RepoTableProps) {
  const t = useTranslations();

  return (
    <table className="repo-table">
      <tbody>
        <tr>
          <td>{ t.caDetails.parents }</td>
          <td>{ repo.last_exchange.uri }</td>
        </tr>
        <tr>
          <td>{ t.caDetails.lastExchange }</td>
          <td>
            { formatDate(repo.last_exchange.timestamp, locale) }
            { repo.last_exchange.result != 'Success'
              ? ( <span className='failure'>FAILURE ICON{ repo.last_exchange.result.Failure.msg }</span> )
              : ( <span className='success'>SUCCES ICON</span> )
            }
          </td>
        </tr>
      </tbody>
    </table>
  );
}

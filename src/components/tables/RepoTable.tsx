import React from 'react';
import useTranslations from '../../hooks/useTranslations';
import { formatDate } from '../../core/utils';
import { RepoStatus } from '../../core/types';

export interface RepoTableProps {
  repo: RepoStatus,
  locale: string,
  loading: boolean,
}

export default function RepoTable({ repo, locale , loading}: RepoTableProps) {
  const t = useTranslations();

  const date = loading ?
    t.caDetails.loading.replace('{handle}', '...') :
    formatDate(repo.last_exchange.timestamp, locale);

  return (
    <div className="info-table">
      <table>
        <tbody>
          <tr>
            <th>{t.caDetails.exchangeUri}</th>
            <td>{repo.last_exchange.uri}</td>
          </tr>
          <tr>
            <th>{t.caDetails.lastExchange}</th>
            <td>
              {repo.last_exchange.result != 'Success' ? (
                <p className="failure">
                  {date}<br />
                  {repo.last_exchange.result.Failure.msg}
                </p>
              ) : (
                <p className="success">
                  {date}
                </p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

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
              <p>
                {formatDate(repo.last_exchange.timestamp, locale)}
              </p>
              {repo.last_exchange.result != 'Success' ? (
                <p className="failure">
                  {repo.last_exchange.result.Failure.msg}
                </p>
              ) : (
                <p className="success" />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

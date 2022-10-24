import React from 'react';
import ParentTableRow from './ParentTableRow';
import { Parent } from '../../core/types';

export interface ParentTableProps {
  parents: Parent[],
  locale: string,
}

export default function RepoTable({ parents, locale }: ParentTableProps) {
  return (
    <table className="parents-table">
      <tbody>
        {parents.map((parent) => (
          <tr key={parent.name}>
            <td>
              <ParentTableRow parent={ parent } locale={ locale } />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

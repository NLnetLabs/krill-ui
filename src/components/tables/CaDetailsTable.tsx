import React from 'react';
import { CaDetails } from '../../core/types';

export interface CaDetailsTableProps {
  details: CaDetails,
}

export default function CaDetailsTable({ details }: CaDetailsTableProps) {
  return (
    <div className="ca-details card">
      <table>
        <tbody>
          {Object.entries(details.resources).map(([key, value]) => (
            <tr key={key}>
              <th>{key}</th>
              <td>
                {value.split(',').map((part) => (
                  <p key={part}>{part}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

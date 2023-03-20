import React from 'react';
import { format } from '../../core/translations';
import { Roa } from '../../core/types';
import useNavigation from '../../hooks/useNavigation';
import useTranslations from '../../hooks/useTranslations';

interface DeleteProps {
  onClose: () => void,
  roa: Roa,
}

export default function Delete({ onClose, roa }: DeleteProps) {
  const t = useTranslations();
  const navigate = useNavigation();
  const params: Record<string, string> = {
    asn: roa.asn.toString(),
    prefix: roa.prefix,
    max_length: roa.max_length?.toString() || '',
  };

  return (
    <>
      <h3>{t.common.warning}</h3>
      <p>
        {format(t.caDetails.confirmation.message, params)}
      </p>
      <div className="actions">
        <button
          type="button"
          className="button outline"
          onClick={onClose}
        >
          {t.common.cancel}
        </button>
        <button
          className="button"
          onClick={() => {
            navigate(params);
          }}
        >
          {t.common.ok}
        </button>
      </div>
    </>
  );
}

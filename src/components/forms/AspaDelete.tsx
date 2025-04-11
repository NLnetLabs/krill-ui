import React from 'react';
import { format } from '../../core/translations';
import { Aspa } from '../../core/types';
import useNavigation from '../../hooks/useNavigation';
import useTranslations from '../../hooks/useTranslations';

interface DeleteProps {
  onClose: () => void,
  aspa: Aspa,
}

export default function AspaDelete({ onClose, aspa }: DeleteProps) {
  const t = useTranslations();
  const navigate = useNavigation();
  const params: Record<string, string> = {
    customer: aspa.customer.toString(),
    providers: aspa.providers.join(", "),
  };

  return (
    <>
      <h3>{t.common.warning}</h3>
      <p>
        {format(t.aspas.confirmation.message, params)}
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

import React from 'react';
import useTranslations from '../../hooks/useTranslations';

export interface TestBedAddCaConfirmProps {
  onClose: () => void,
  onConfirm: () => void,
}

export default function TestBedAddCaConfirm({onClose, onConfirm}:TestBedAddCaConfirmProps){
  const t = useTranslations();
  return(
    <>
      <h3>{t.common.warning}</h3>
      <p>
        {t.testbed.addChild.confirmation.message}
      </p>
      <div className="actions">
        <button
          className="button outline"
          onClick={onClose}
        >
          {t.common.cancel}
        </button>
        <button
          className="button"
          onClick={onConfirm}
        >
          {t.common.ok}
        </button>
      </div>
    </>
  );
}
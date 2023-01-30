import React, { useState } from 'react';
import { Roa } from '../../core/types';
import useNavigation from '../../hooks/useNavigation';
import useTranslations from '../../hooks/useTranslations';

interface EditProps {
  onClose: () => void,
  roa?: Roa,
}

export default function Edit({ onClose, roa }: EditProps) {
  const t = useTranslations();
  const navigate = useNavigation();
  const [comment, setComment] = useState(roa?.comment || '');
  
  return (
    <>
      <h3>{t.common.edit}</h3>
      <form
        onSubmit={(e) => {
          console.log('submit');
          e.preventDefault();
          if (comment !== roa?.comment) {
            navigate({ comment });
          } else {
            onClose();
          }
        }}
      >
        <div>
          <label htmlFor="comment required">
            {t.caDetails.comment}
          </label>
          <input
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="actions">
          <button
            className="button outline"
            onClick={onClose}
          >
            {t.common.cancel}
          </button>
          <button
            type="submit"
            className="button"
          >
            {t.common.confirm}
          </button>
        </div>
      </form>
    </>
  );
}

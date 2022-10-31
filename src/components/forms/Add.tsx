import React, { useState } from 'react';
import { Roa } from '../../core/types';
import { prefixMaxLength } from '../../core/utils';
import useNavigation from '../../hooks/useNavigation';
import useTranslations from '../../hooks/useTranslations';

interface AddProps {
  onClose: () => void,
  roa?: Roa,
}

export default function Add({ onClose, roa }: AddProps) {
  const t = useTranslations();
  const navigate = useNavigation();
  const [asn, setAsn] = useState(roa?.asn.toString() || '');
  const [prefix, setPrefix] = useState(roa?.prefix || '');
  const [comment, setComment] = useState(roa?.comment || '');
  const maxLengthFallback = prefixMaxLength(roa?.prefix);
  const [maxLength, setMaxLength] = useState(roa?.max_length?.toString() || maxLengthFallback);
  
  return (
    <>
      <h3>{t.caDetails.addRoa}</h3>
      <form>
        <div>
          <label htmlFor="asn required">
            {t.announcements.asn}
          </label>
          <input
            name="asn"
            value={asn}
            onChange={(e) => setAsn(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="prefix required">
            {t.announcements.prefix}
          </label>
          <input
            name="prefix"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="maxLength required">
            {t.caDetails.maxLength}
          </label>
          <input
            name="maxLength"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="comment required">
            {t.caDetails.comment}
          </label>
          <input
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
      </form>
      <div className="actions">
        <button
          className="button outline"
          onClick={onClose}
        >
          {t.common.cancel}
        </button>
        <button
          className="button"
          onClick={() => navigate({ asn, prefix, comment, max_length: maxLength})}
        >
          {t.common.confirm}
        </button>
      </div>
    </>
  );
}

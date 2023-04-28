import React, { FormEvent, useState } from 'react';
import { Roa } from '../../core/types';
import { prefixLength } from '../../core/utils';
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
  const maxLengthFallback = prefixLength(roa?.prefix);
  const [maxLength, setMaxLength] = useState(roa?.max_length?.toString() || maxLengthFallback);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
      navigate({ asn, prefix, comment, max_length: maxLength });
    } else {
      form.reportValidity();
    }
  };

  return (
    <>
      <h3>{t.caDetails.addRoa}</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="asn required">
            {t.announcements.asn}
          </label>
          <input
            type="number"
            min="0"
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
            pattern="^((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.(?!\/)|\/)){4}([0-9]|[1-2][0-9]|3[0-2]))|(([a-fA-F0-9:]+)\/([1-9]|[1-9][0-9]|1[01][0-9]|12[0-8]))$"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="maxLength">
            {t.caDetails.maxLength}
          </label>
          <input
            type="number"
            min={prefixLength(prefix) || 1}
            max={(prefix.includes('.') || !prefix.includes(':')) ? 32 : 128}
            name="maxLength"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
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
          />
        </div>
        <div className="actions">
          <button
            type="button"
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

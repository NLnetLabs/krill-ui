import React, { FormEvent, useState } from 'react';
import { Aspa } from '../../core/types';
import useNavigation from '../../hooks/useNavigation';
import useTranslations from '../../hooks/useTranslations';

interface AddProps {
  onClose: () => void;
  aspa?: Aspa;
  aspas: Aspa[];
  edit: boolean;
}

export default function AspaAdd({ onClose, aspa, aspas, edit }: AddProps) {
  const t = useTranslations();
  const navigate = useNavigation();
  const [customer, setCustomer] = useState(aspa?.customer.toString() || '');
  const [providers, setProviders] = useState(aspa?.providers.join(", ") || '');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
      navigate({ customer, providers });
    } else {
      form.reportValidity();
    }
  };

  return (
    <>
      <h3>{edit ? t.caDetails.editAspa : t.caDetails.addAspa}</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="customer required">{t.aspas.customer}</label>
          <input
            type="number"
            min="0"
            name="customer"
            onInput={(e) =>
              (e.target as HTMLFormElement).setCustomValidity('')
            }
            onInvalid={(e) =>
              (e.target as HTMLFormElement).setCustomValidity(
                t.aspas.customer_validation_format
              )
            }
            value={customer}
            onChange={(e) => {
              let c = e.target.value;
              setCustomer(c);

              if (!edit && aspas.find(x => x.customer === Number(c))) {
                e.target.setCustomValidity(
                  t.aspas.customer_validation_format
                )              
              }
            }}
            required
            disabled={edit}
          />
        </div>
        <div>
          <label htmlFor="providers required">{t.aspas.providers}</label>
          <input
            type="text"
            pattern="^((\d+),\s*)*(\d+)$"
            name="customer"
            onInput={(e) =>
              (e.target as HTMLFormElement).setCustomValidity('')
            }
            onInvalid={(e) =>
              (e.target as HTMLFormElement).setCustomValidity(
                t.aspas.providers_validation_format
              )
            }
            value={providers}
            onChange={(e) => setProviders(e.target.value)}
            required
          />
        </div>
        <div className="actions">
          <button type="button" className="button outline" onClick={onClose}>
            {t.common.cancel}
          </button>
          <button type="submit" className="button">
            {t.common.confirm}
          </button>
        </div>
      </form>
    </>
  );
}

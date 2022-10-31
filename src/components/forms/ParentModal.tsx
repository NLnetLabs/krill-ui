import React, { FormEvent, useEffect, useState } from 'react';
import { useRoute, useRouter } from 'react-router5';
import useChildRequest from '../../hooks/useChildRequest';
import useNavigation from '../../hooks/useNavigation';
import useTranslations from '../../hooks/useTranslations';
import Modal from './Modal';

export default function ParentModal() {
  const router = useRouter();
  const { route: { params } } = useRoute();
  const t = useTranslations();
  const navigate = useNavigation();

  const childRequest = useChildRequest();
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    setRequest(childRequest);
  }, [childRequest]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    navigate({ name, response });
  };

  const onClose = () => {
    router.navigate('cas.parents', { ca: params.ca });
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={ onSubmit } method="POST">
        <div>
          <label>{t.caDetails.parentsTab.request}</label>
          <textarea name="request" value={request} onChange={(e) => setRequest(e.target.value)} />
        </div>
        <div>
          <label>{t.caDetails.parentsTab.response}</label>
          <textarea name="response" value={response} onChange={(e) => setResponse(e.target.value)}/>
        </div>
        <div>
          <label>{t.caDetails.parentsTab.name}</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="actions">
          <button className="button outline" onClick={onClose}>
            {t.common.cancel}
          </button>
          <button type="submit" className="button">
            {t.common.confirm}
          </button>
        </div>
      </form>
    </Modal>
  );
}

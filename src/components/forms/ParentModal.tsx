import React, { FormEvent, useEffect, useState } from 'react';
import { useRoute, useRouter } from 'react-router5';
import useChildRequest from '../../hooks/useChildRequest';
import useNavigation from '../../hooks/useNavigation';
import useTranslations from '../../hooks/useTranslations';

export default function ParentModal() {
  const { route } = useRoute();
  const router = useRouter();
  const { route: { params } } = useRoute();
  const t = useTranslations();
  const navigate = useNavigation();

  const childRequest = useChildRequest();
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    navigate({ name, response });
  };

  useEffect(() => {
    setRequest(childRequest);
  }, [childRequest]);

  const onClose = () => {
    router.navigate('cas.parents', { ca: params.ca });
  };

  if (route.name !== 'cas.parents.add'){
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div onClick={(e) => { e.stopPropagation(); }}>
        <form onSubmit={ onSubmit } method="POST">
          <label>{ t.caDetails.parentsTab.request }</label>
          <textarea name="request" value={request} onChange={(e) => setRequest(e.target.value)} />
          <label>{ t.caDetails.parentsTab.response }</label>
          <textarea name="response" value={response} onChange={(e) => setResponse(e.target.value)}/>
          <label>{ t.caDetails.parentsTab.name }</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="button" onClick={ onClose }>
            { t.common.cancel }
          </button>
          <button type="submit" className="button">
            { t.common.confirm }
          </button>
        </form>
      </div>
    </div>
  );
}

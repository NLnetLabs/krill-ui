import React, { FormEvent, useState } from 'react';
import NotificationElem from '../NotificationElem';
import useTranslations from '../../hooks/useTranslations';
import { Notification, NotificationType } from '../../core/types';
import { parseChildXML } from '../../core/utils';
import TestBedConfirm from './TestBedConfirm';

export default function TestBedAddCaForm() {
  const t = useTranslations();
  const [notification, setNotification] = useState<Notification>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [childRequest, setChildRequest] = useState(t.testbed.addChild.requestXML.placeholder);
  const [asnResources, setAsnResources] = useState('');
  const [ipv4Resources, setIpv4Resources] = useState('');
  const [ipv6Resources, setIpv6Resources] = useState('');
  const [childResponse, setChildResponse] = useState('');

  const postChild = async (handle: string, id_cert: string, asn: string, v4: string, v6: string) => {
    const res = await fetch('/testbed/children', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        handle,
        id_cert,
        resources: {
          asn,
          v4,
          v6,
        },
      }),
    });

    if (res.status === 200) {
      setNotification({
        type: NotificationType.success,
        message: t.testbed.addChild.success.replace('{child_handle}', handle)
      });

      // TODO make XML from response
      setChildResponse(JSON.stringify(await res.json()));
    } else {
      const body = await res.json();
      if (body.label === 'pub-duplicate') {
        // try again with new handle
        await postChild(handle + Date.now(), id_cert, asn, v4, v6);
      } else {
        setNotification({
          type: NotificationType.error,
          message: body.msg
        });
      }
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const onConfirm = async () => {
    const request = parseChildXML(childRequest);
    await postChild(request.handle, request.id_cert, asnResources, ipv4Resources, ipv6Resources);
  };

  if (childResponse !== '') {
    return (
      <>
        { notification && <NotificationElem notification={notification} /> }
        <pre>{childResponse}</pre>
      </>
    );
  }

  return (
    <>
      {showConfirmModal &&
      <TestBedConfirm onClose={() => setShowConfirmModal(false)} onConfirm={onConfirm}/>}
      { notification && <NotificationElem notification={notification} /> }
      <form onSubmit={ onSubmit } method="POST">
        <div>
          <label>{ t.testbed.addChild.requestXML.label }<a href="https://tools.ietf.org/html/rfc8183#section-5.2.1">{t.testbed.rfcdoclink}</a></label>
          <textarea name="request" value={childRequest} onChange={(e) => setChildRequest(e.target.value)} required />
        </div>
        <div>
          <label>{ t.testbed.addChild.asnresources.label }</label>
          <input
            name="asn"
            value={asnResources}
            onChange={(e) => setAsnResources(e.target.value)}
            placeholder={t.testbed.addChild.asnresources.placeholder}
          />
        </div>
        <div>
          <label>{ t.testbed.addChild.ipv4resources.label }</label>
          <input
            name="v4"
            value={ipv4Resources}
            onChange={(e) => setIpv4Resources(e.target.value)}
            placeholder={t.testbed.addChild.ipv4resources.placeholder}
          />
        </div>
        <div>
          <label>{ t.testbed.addChild.ipv6resources.label }</label>
          <input
            name="v6"
            value={ipv6Resources}
            onChange={(e) => setIpv6Resources(e.target.value)}
            placeholder={t.testbed.addChild.ipv6resources.placeholder}
          />
        </div>
        <button type="submit" className="button">
          {t.testbed.addChild.confirm}
        </button>
      </form>
    </>
  );
}

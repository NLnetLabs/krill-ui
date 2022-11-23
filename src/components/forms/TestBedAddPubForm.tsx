import React, { FormEvent, useState } from 'react';
import NotificationElem from '../NotificationElem';
import useTranslations from '../../hooks/useTranslations';
import {Notification, NotificationType, TestBedPublisherRequest} from '../../core/types';
import {checkXmlParsingSucceeded, publisherResponseJsonToXml} from '../../core/utils';
import CopyDownloadButton from '../CopyDownloadButton';
import TestBedConfirm from './TestBedConfirm';

export default function TestBedAddPubForm() {
  const t = useTranslations();
  const [notification, setNotification] = useState<Notification>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [pubRequest, setPubRequest] = useState(t.testbed.addPublisher.requestXML.placeholder);
  const [pubResponse, setPubResponse] = useState('');

  const postPublisher = async (publisher_handle: string, id_cert: string) => {
    const res = await fetch('/testbed/publishers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        publisher_handle,
        id_cert,
        tag: null,
      }),
    });

    if (res.status === 200) {
      setNotification({
        type: NotificationType.success,
        message: t.testbed.addPublisher.success.replace('{publisher_handle}', publisher_handle)
      });

      setPubResponse(publisherResponseJsonToXml(await res.json()));
    } else {
      const body = await res.json();
      if (body.label === 'pub-duplicate') {
        // try again with new handle
        await postPublisher(publisher_handle + Date.now(), id_cert);
      } else {
        setNotification({
          type: NotificationType.error,
          message: body.msg
        });
      }
    }
  };

  const verifyPublisherXML = (doc: Document): boolean => {
    const error = checkXmlParsingSucceeded(doc);
    if (error) {
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.invalid_xml.replace('{err}', error),
      });
      return false;
    }
    if (doc.getElementsByTagName('publisher_request').length === 0) {
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.missing_xml_el.replace('{el}', 'publisher_request'),
      });
      return false;
    }
    if (doc.getElementsByTagName('publisher_bpki_ta').length === 0) {
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.missing_xml_el.replace('{el}', 'publisher_bpki_ta'),
      });
      return false;
    }
    // @ts-ignore
    if (!doc.getElementsByTagName('publisher_request')[0].attributes['publisher_handle']) {
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.missing_xml_attr
          .replace('{attr}', 'publisher_handle')
          .replace('{el}', 'publisher_request'),
      });
      return false;
    }
    if (doc.getElementsByTagName('publisher_bpki_ta')[0].childNodes.length === 0) {
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.empty_xml_el
          .replace('{el}', 'publisher_bpki_ta'),
      });
      return false;
    }
    // @ts-ignore
    if (doc.getElementsByTagName('publisher_bpki_ta')[0].childNodes[0].nodeValue.trim().length === 0) {
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.empty_xml_el
          .replace('{el}', 'publisher_bpki_ta'),
      });
      return false;
    }
    return true;
  };

  const parsePublisherXML = (xml: string): TestBedPublisherRequest | undefined => {
    const doc = new window.DOMParser().parseFromString(xml, 'text/xml');
    if (!verifyPublisherXML(doc)) {
      return;
    }
    return {
      // @ts-ignore
      publisher_handle: doc.getElementsByTagName('publisher_request')[0].attributes['publisher_handle'].value,
      id_cert: (doc.getElementsByTagName('publisher_bpki_ta')[0].childNodes[0].nodeValue as string).trim(),
    };
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const request = parsePublisherXML(pubRequest);
    if (!request) {
      return;
    }
    setShowConfirmModal(true);
  };

  const onConfirm = async () => {
    const request = parsePublisherXML(pubRequest);
    if (!request) {
      return;
    }
    await postPublisher(request.publisher_handle, request.id_cert);
  };

  const addAnother = () => {
    setPubRequest(t.testbed.addPublisher.requestXML.placeholder);
    setPubResponse('');
    setShowConfirmModal(false);
  };

  if (pubResponse !== '') {
    return (
      <>
        { notification && <NotificationElem notification={notification} /> }
        <pre>{pubResponse}</pre>
        <div>
          <button onClick={addAnother}>{t.testbed.addPublisher.registeranother}</button>
          <CopyDownloadButton xml={pubResponse} name="publisher_response" setNotification={setNotification}/>
        </div>
      </>
    );
  }

  return (
    <>
      {showConfirmModal &&
        <TestBedConfirm onClose={() => setShowConfirmModal(false)} onConfirm={onConfirm}/>}
      {notification && <NotificationElem notification={notification}/>}
      <form onSubmit={onSubmit} method="POST">
        <div>
          <label>{ t.testbed.addPublisher.requestXML.label }<a href="https://tools.ietf.org/html/rfc8183#section-5.2.3">{t.testbed.rfcdoclink}</a></label>
          <textarea name="request" value={pubRequest} onChange={(e) => setPubRequest(e.target.value)} required />
        </div>
        <button type="submit" className="button">
          {t.testbed.addPublisher.confirm}
        </button>
      </form>
    </>
  );
}

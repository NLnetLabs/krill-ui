import React, { FormEvent, useState } from 'react';
import NotificationElem from '../NotificationElem';
import useTranslations from '../../hooks/useTranslations';
import {Notification, NotificationType, TestBedChildRequest} from '../../core/types';
import {checkXmlParsingSucceeded, parentResponseJsonToXml} from '../../core/utils';
import TestBedConfirm from './TestBedConfirm';

import CopyDownloadButton from '../CopyDownloadButton';

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

      const xmlRes = parentResponseJsonToXml(await res.json());
      setChildResponse(xmlRes);
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
    const xml = parseChildXML(childRequest);
    if (!xml) {
      return;
    }
    setShowConfirmModal(true);
  };

  const onConfirm = async () => {
    const request = parseChildXML(childRequest);
    if (!request){
      return;
    }
    await postChild(request.handle, request.id_cert, asnResources, ipv4Resources, ipv6Resources);
  };



  const verifyChildXML = (doc: Document): boolean => {
    console.log('verifyChildXML');
    console.log(doc);
    const error = checkXmlParsingSucceeded(doc);
    if (error) {
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.invalid_xml.replace('{err}', error),
      });
      return false;
    }
    if (doc.getElementsByTagName('child_request').length === 0){
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.missing_xml_el.replace('{el}', 'child_request'),
      });
      return false;
    }
    if (doc.getElementsByTagName('child_bpki_ta').length === 0){
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.missing_xml_el.replace('{el}', 'child_bpki_ta'),
      });
      return false;
    }
    // @ts-ignore
    if (!doc.getElementsByTagName('child_request')[0].attributes['child_handle']){
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.missing_xml_attr
          .replace('{attr}', 'child_handle')
          .replace('{el}', 'child_request'),
      });
      return false;
    }
    if (doc.getElementsByTagName('child_bpki_ta')[0].childNodes.length === 0){
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.empty_xml_el
          .replace('{el}', 'child_bpki_ta'),
      });
      return false;
    }
    // @ts-ignore
    if (doc.getElementsByTagName('child_bpki_ta')[0].childNodes[0].nodeValue.trim().length === 0){
      setNotification({
        type: NotificationType.error,
        message: t.testbed.errors.empty_xml_el
          .replace('{el}', 'child_bpki_ta'),
      });
      return false;
    }
    return true;
  };

  const parseChildXML = (xml: string): TestBedChildRequest | undefined => {
    const doc = new window.DOMParser().parseFromString(xml, 'text/xml');
    if (!verifyChildXML(doc)){
      return;
    }
    return {
      // @ts-ignore
      handle: doc.getElementsByTagName('child_request')[0].attributes['child_handle'].value,
      id_cert: (doc.getElementsByTagName('child_bpki_ta')[0].childNodes[0].nodeValue as string).trim(),
    };
  };


  const addAnother = () => {
    setChildResponse('');
    setShowConfirmModal(false);
    setChildRequest(t.testbed.addChild.requestXML.placeholder);
    setAsnResources('');
    setIpv4Resources('');
    setIpv6Resources('');
  };

  if (childResponse !== '') {
    return (
      <>
        { notification && <NotificationElem notification={notification} /> }
        <pre>{childResponse}</pre>
        <div>
          <button onClick={addAnother}>{t.testbed.addChild.registeranother}</button>
          <CopyDownloadButton xml={childResponse} name='parent_response' setNotification={setNotification}/>
        </div>
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

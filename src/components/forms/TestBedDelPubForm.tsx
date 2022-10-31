import React, { FormEvent, useState } from 'react';
import NotificationElem from '../NotificationElem';
import useTranslations from '../../hooks/useTranslations';
import { Notification, NotificationType } from '../../core/types';

export default function TestBedDelPubForm() {
  const t = useTranslations();
  const [notification, setNotification] = useState<Notification>();

  const [pubHandle, setPubHandle] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/testbed/publishers/${pubHandle}`, {
      method: 'DELETE',
    });

    if (res.status === 200) {
      setNotification({
        type: NotificationType.success,
        message: t.testbed.removePublisher.success.replace('{publisher_handle}', pubHandle)
      });
      setPubHandle('');
    } else {
      const body = await res.json();
      setNotification({
        type: NotificationType.error,
        message: body.msg,
      });
    }
  };

  return (
    <>
      { notification && <NotificationElem notification={notification} /> }
      <form onSubmit={ onSubmit } method="POST">
        <div>
          <label>{ t.testbed.publisherhandle }</label>
          <input
            name="handle"
            value={pubHandle}
            onChange={(e) => setPubHandle(e.target.value)}
            placeholder={t.testbed.removePublisher.placeholder}
            required
          />
        </div>
        <button type="submit" className="button">
          {t.testbed.removePublisher.confirm}
        </button>
      </form>
    </>
  );
}

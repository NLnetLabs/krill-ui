import React, { FormEvent, useState } from 'react';
import NotificationElem from '../NotificationElem';
import useTranslations from '../../hooks/useTranslations';
import { Notification, NotificationType } from '../../core/types';
import TestBedConfirm from './TestBedConfirm';

export default function TestBedDelCaForm() {
  const t = useTranslations();
  const [notification, setNotification] = useState<Notification>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [childHandle, setChildHandle] = useState('');

  const deleteChild = async() => {
    const res = await fetch(`/testbed/children/${childHandle}`, {
      method: 'DELETE',
    });

    if (res.status === 200) {
      setNotification({
        type: NotificationType.success,
        message: t.testbed.removeChild.success.replace('{child_handle}', childHandle)
      });
      setChildHandle('');
    } else {
      const body = await res.json();
      setNotification({
        type: NotificationType.error,
        message: body.msg,
      });
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const onConfirm = async () => {
    await deleteChild();
    setShowConfirmModal(false);
  };

  return (
    <>
      {showConfirmModal &&
        <TestBedConfirm onClose={() => setShowConfirmModal(false)} onConfirm={onConfirm}/>}
      { notification && <NotificationElem notification={notification} /> }
      <form onSubmit={ onSubmit } method="POST">
        <div>
          <label>{ t.testbed.childhandle }</label>
          <input
            name="handle"
            value={childHandle}
            onChange={(e) => setChildHandle(e.target.value)}
            placeholder={t.testbed.removeChild.placeholder}
            required
          />
        </div>
        <button type="submit" className="button">
          {t.testbed.removeChild.confirm}
        </button>
      </form>
    </>
  );
}

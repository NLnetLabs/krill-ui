import React from 'react';
import Modal from './Modal';
import {useRoute} from 'react-router5';
import useTranslations from '../../hooks/useTranslations';

export interface TestBedConfirmProps {
  onClose: () => void,
  onConfirm: () => void,
}

export default function TestBedConfirm({onClose, onConfirm}:TestBedConfirmProps) {
  const t = useTranslations();
  const {route} = useRoute();

  let title = '';
  let message = '';
  if (route.name === 'testbed'){
    title = t.testbed.addChild.confirmation.title;
    message = t.testbed.addChild.confirmation.message;
  } else if (route.name === 'testbed.add_pub'){
    title = t.testbed.addPublisher.confirmation.title;
    message = t.testbed.addPublisher.confirmation.message;
  } else if (route.name === 'testbed.del_ca'){
    title = t.testbed.removeChild.confirmation.title;
    message = t.testbed.removeChild.confirmation.message;
  } else if (route.name === 'testbed.del_pub'){
    title = t.testbed.removePublisher.confirmation.title;
    message = t.testbed.removePublisher.confirmation.message;
  }

  return (
    <Modal onClose={onClose}>
      <h3>{title}</h3>
      <p>
        {message}
      </p>
      <div className="actions">
        <button
          className="button outline"
          onClick={onClose}
        >
          {t.common.cancel}
        </button>
        <button
          className="button"
          onClick={onConfirm}
        >
          {t.common.ok}
        </button>
      </div>
    </Modal>
  );
}
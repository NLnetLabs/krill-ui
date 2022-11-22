import React from 'react';
import Modal from './Modal';
import TestBedAddCaConfirm from './TestBedAddCaConfirm';

export interface TestBedConfirmProps {
  onClose: () => void,
  onConfirm: () => void,
}

export default function TestBedConfirm({onClose, onConfirm}:TestBedConfirmProps) {

  return (
    <Modal onClose={onClose}>
      <TestBedAddCaConfirm onConfirm={onConfirm} onClose={onClose}/>
    </Modal>
  );
}
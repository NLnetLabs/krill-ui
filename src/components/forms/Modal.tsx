import React, { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void,
  children: ReactNode,
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="modal" onMouseDown={onClose}>
      <div onMouseDown={(e) => { e.stopPropagation(); }}>
        {children}
      </div>
    </div>
  );
}

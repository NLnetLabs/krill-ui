import React from 'react';
import { Notification } from '../core/types';

interface NotificationProps {
  notification: Notification,
  onClose: () => void,
}

export default function NotificationPopup({ notification, onClose }: NotificationProps) {
  return (
    <div className={`notification popup ${ notification.type }`}>
      <button className="close" onClick={onClose}>
        &times;
      </button>
      <span>
        {notification.message}
      </span>
    </div>
  );
}

import React from 'react';
import { Notification as NotificationType } from '../core/types';

export default function Notification({ notification }: { notification: NotificationType | null }) {
  if (!notification) {
    return null;
  }

  return (
    <div className={`notification ${ notification.type }`}>
      { notification.message }
    </div>
  );
}


import React from 'react';
import { Notification } from '../core/types';
import useNavigation from '../hooks/useNavigation';

interface NotificationProps {
  notification: Notification,
}

export default function NotificationElem({ notification }: NotificationProps) {
  const navigate = useNavigation();

  return (
    <div className={`notification ${ notification.type }`}>
      <button className="close" onClick={() => navigate({ notification: 'clear' })}>
        &times;
      </button>
      <span>
        {notification.message}
      </span>
    </div>
  );
}


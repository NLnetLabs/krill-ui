import React from 'react';
import useStore from '../hooks/useStore';
import NotificationElem from './NotificationElem';

export default function Notification() {
  const { notification } = useStore();
  
  if (!notification) {
    return null;
  }

  return <NotificationElem notification={notification} />;
}

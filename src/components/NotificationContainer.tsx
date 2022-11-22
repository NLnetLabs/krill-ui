import React, { useEffect, useState } from 'react';
import Store from '../core/store';
import useStore from '../hooks/useStore';
import NotificationPopup from './NotificationPopup';

export default function NotificationContainer() {
  const store = useStore() as Store;
  const [hide, setHide] = useState<boolean>(false);

  const close = () => {
    setHide(true);
    store.setNotification(null);
  };

  // hide notification after 5s
  useEffect(() => {
    if (store.notification) {
      setHide(false);
      const timer = setTimeout(close, 5000);
      return () => clearTimeout(timer);
    }
  }, [store.notification]);
  
  if (!store.notification || hide) {
    return null;
  }

  return (
    <NotificationPopup
      notification={store.notification}
      onClose={close}
    />
  );
}

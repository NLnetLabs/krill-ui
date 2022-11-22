import React, { useEffect } from 'react';
import useNavigation from '../hooks/useNavigation';
import useStore from '../hooks/useStore';
import NotificationPopup from './NotificationPopup';

export default function NotificationContainer() {
  const { notification } = useStore();
  const navigate = useNavigation();

  // hide notification after 5s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        navigate({ notification: 'clear' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
  
  if (!notification) {
    return null;
  }

  return (
    <NotificationPopup
      notification={notification}
      onClose={() => navigate({ notification: 'clear' })}
    />
  );
}

import React from 'react';
import useNavigation from '../hooks/useNavigation';
import useStore from '../hooks/useStore';
import NotificationPopup from './NotificationPopup';

export default function NotificationContainer() {
  const { notification } = useStore();
  const navigate = useNavigation();
  
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

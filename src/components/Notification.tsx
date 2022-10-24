import React from 'react';
import useNavigation from '../hooks/useNavigation';
import useStore from '../hooks/useStore';

export default function Notification() {
  const { notification } = useStore();
  const navigate = useNavigation();
  
  if (!notification) {
    return null;
  }

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


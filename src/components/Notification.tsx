import React, { useEffect, useState } from 'react';
import useStore from '../hooks/useStore';

export default function Notification() {
  const { notification } = useStore();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setHide(false);
  }, [notification]);
  
  if (!notification || hide) {
    return null;
  }

  return (
    <div className={`notification ${ notification.type }`}>
      <button className="close" onClick={() => setHide(true)}>
        &times;
      </button>
      <span>
        {notification.message}
      </span>
    </div>
  );
}


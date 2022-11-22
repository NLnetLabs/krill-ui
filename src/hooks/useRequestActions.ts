import { ChangeEvent, useEffect, useState } from 'react';
import { Notification } from '../core/types';

export default function useRequestActions(requestValue: string) {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [request, setRequest] = useState(requestValue);
  const [response, setResponse] = useState('');

  useEffect(() => {
    setRequest(requestValue);
  }, [requestValue]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setResponse(fileReader.result as string);
      };
      fileReader.readAsText(e.currentTarget.files[0]);
    }
  };

  return {
    notification,
    setNotification,
    request,
    setRequest,
    response,
    setResponse,
    handleUpload,
  };
}

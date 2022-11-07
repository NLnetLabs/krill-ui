import { ChangeEvent, useEffect, useState } from 'react';
import { NotificationType, Notification } from '../core/types';
import useTranslations from './useTranslations';

export default function useRequestActions(requestValue: string) {
  const t = useTranslations();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [request, setRequest] = useState(requestValue);
  const [response, setResponse] = useState('');
  
  useEffect(() => {
    setRequest(requestValue);
  }, [requestValue]);
  
  const onCopy = () => {
    const copyText = document.getElementById('request') as HTMLTextAreaElement | null;
  
    if (copyText !== null) {
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);

      setNotification({
        type: NotificationType.success,
        message: t.common.copySuccess
      });
    }
  };
  
  const dataUrl = `data:application/xml;base64,${btoa(request)}`;
  
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
    dataUrl,
    setRequest,
    response,
    setResponse,
    onCopy,
    handleUpload,
  };
}

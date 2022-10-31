import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRoute, useRouter } from 'react-router5';
import { NotificationType, Notification } from '../core/types';
import useChildRequest from '../hooks/useChildRequest';
import useNavigation from '../hooks/useNavigation';
import useTranslations from './useTranslations';

export default function useParantActions() {
  const router = useRouter();
  const t = useTranslations();
  const { route: { params } } = useRoute();
  const navigate = useNavigation();
  const childRequest = useChildRequest();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  
  useEffect(() => {
    setRequest(childRequest);
  }, [childRequest]);
  
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    navigate({ name, response });
  };
  
  const onClose = () => {
    router.navigate('cas.parents', { ca: params.ca });
  };
  
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
    name,
    setName,
    request,
    dataUrl,
    setRequest,
    response,
    setResponse,
    onSubmit,
    onClose,
    onCopy,
    handleUpload,
  };
}

import { FormEvent } from 'react';
import { useRoute, useRouter } from 'react-router5';
import usePublisherRequest from '../hooks/usePublisherRequest';
import useNavigation from '../hooks/useNavigation';
import useRequestActions from './useRequestActions';

export default function useParantActions() {
  const publisherRequest = usePublisherRequest();
  const router = useRouter();
  const { route: { params } } = useRoute();
  const navigate = useNavigation();

  const {
    notification,
    setNotification,
    request,
    dataUrl,
    setRequest,
    response,
    setResponse,
    onCopy,
    handleUpload,
  } = useRequestActions(publisherRequest);
  
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    navigate({ response });
  };
  
  const onClose = () => {
    router.navigate('cas.repository', { ca: params.ca });
  };
  
  return {
    notification,
    setNotification,
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

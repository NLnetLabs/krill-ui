import { FormEvent, useState } from 'react';
import { useRoute, useRouter } from 'react-router5';
import useChildRequest from '../hooks/useChildRequest';
import useNavigation from '../hooks/useNavigation';
import useRequestActions from './useRequestActions';

export default function useParantActions() {
  const childRequest = useChildRequest();
  const router = useRouter();
  const { route: { params } } = useRoute();
  const navigate = useNavigation();
  const [name, setName] = useState('');

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
  } = useRequestActions(childRequest);
  
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    navigate({ name, response });
  };
  
  const onClose = () => {
    router.navigate('cas.parents', { ca: params.ca });
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

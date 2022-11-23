import { FormEvent } from 'react';
import { useRoute, useRouter } from 'react-router5';
import usePublisherRequest from '../hooks/usePublisherRequest';
import useNavigation from '../hooks/useNavigation';
import useRequestActions from './useRequestActions';

export default function useRepositoryActions() {
  const publisherRequest = usePublisherRequest();
  const router = useRouter();
  const { route: { params } } = useRoute();
  const navigate = useNavigation();

  const {
    notification,
    setNotification,
    request,
    setRequest,
    response,
    setResponse,
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
    setRequest,
    response,
    setResponse,
    onSubmit,
    onClose,
    handleUpload,
  };
}

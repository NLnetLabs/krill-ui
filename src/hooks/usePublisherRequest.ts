import { useEffect, useState } from 'react';
import Store from '../core/store';
import useStore from './useStore';

let cache = '';

export default function usePublisherRequest(): string {
  const [publisherRequest, setPublisherRequest] = useState<string>(cache);
  const store = useStore() as Store;

  useEffect(() => {
    if (store.ca) {
      store.api.getPublisherRequest(store.ca).then((text: string) => {
        setPublisherRequest(text);
        cache = text;
      });
    }
  }, []);

  return publisherRequest;
}


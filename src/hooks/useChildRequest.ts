import { useEffect, useState } from 'react';
import Store from '../core/store';
import useStore from './useStore';

let cache = '';

export default function useChildRequest(): string {
  const [childRequest, setChildRequest] = useState<string>(cache);
  const store = useStore() as Store;

  useEffect(() => {
    if (!childRequest) {
      store.api.getChildRequest(store.ca as string).then((text: string) => {
        setChildRequest(text);
        cache = text;
      });
    }
  }, []);

  return childRequest;
}
  

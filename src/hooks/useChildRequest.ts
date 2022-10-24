import { useEffect, useState } from 'react';
import useStore from './useStore';

let cache = '';

export default function useVersion(): string {
  const [childRequest, setChildRequest] = useState<string>(cache);
  const store = useStore();

  useEffect(() => {
    if (!childRequest) {
      store.api.getChildRequest(store.ca).then((text: string) => {
        setChildRequest(text);
        cache = text;
      });
    }
  }, []);

  return childRequest;
}
  

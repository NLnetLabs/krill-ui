import { useEffect, useState } from 'react';
import Api from '../core/api';
import { Info } from '../core/types';

let cache: Info | null = null;

export default function useVersion(): Info | null {
  const [info, setInfo] = useState<Info | null>(cache);

  useEffect(() => {
    if (!info) {
      const api = new Api();
      api.getInfo().then((i) => {
        setInfo(i);
        cache = i;
      });
    }
  }, []);
      
  return info;
}
  
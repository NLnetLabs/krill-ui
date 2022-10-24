import { useRouter } from 'react-router5';
import { Data } from '../core/types';

export default function useStore(): Data {
  const router = useRouter();
      
  return router.getDependencies().store;
}
  
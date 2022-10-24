import { useRoute, useRouter } from 'react-router5';

export default function useNavigation() {
  const { route } = useRoute();
  const router = useRouter();
    
  return function navigate(params: Record<string, string | undefined>, name?: string) {
    router.navigate(name || route.name, { ...route.params, ...params });
  };
}
  

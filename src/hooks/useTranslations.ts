import { Translations } from '../core/translations';
import useStore from './useStore';

export default function useTranslations(): Translations {
  const store = useStore();
      
  return store.translations as Translations;
}
  
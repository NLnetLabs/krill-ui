import React from 'react';
import { useRoute, useRouter } from 'react-router5';
import Store from '../../core/store';
import { Roa } from '../../core/types';
import useStore from '../../hooks/useStore';
import Add from './Add';
import Delete from './Delete';
import Modal from './Modal';

export default function CaModal() {
  const { route } = useRoute();
  const router = useRouter();
  const { route: { params } } = useRoute();
  const store = useStore() as Store;
  const roas = store.getRoas();
  const roa: Roa | undefined = roas.find((roa) => roa.id === params.id);

  const onClose = () => {
    router.navigate('cas', { ca: params.ca });
  };

  if (!roa && route.name !== 'cas.add_new') {
    return null;
  }

  return (
    <Modal onClose={onClose}>
      {route.name.startsWith('cas.add') && (
        <Add
          onClose={onClose}
          roa={roa}
        />
      )}
      {route.name === 'cas.delete' && (
        <Delete
          onClose={onClose}
          roa={roa as Roa}
        />
      )}
    </Modal>
  );
}

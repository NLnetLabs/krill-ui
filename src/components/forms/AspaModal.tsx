import React from 'react';
import { useRoute, useRouter } from 'react-router5';
import Store from '../../core/store';
import { Aspa } from '../../core/types';
import useStore from '../../hooks/useStore';
import AspaAdd from './AspaAdd';
import Modal from './Modal';
import AspaDelete from './AspaDelete';

export default function AspaModal() {
  const { route } = useRoute();
  const router = useRouter();
  const { route: { params } } = useRoute();
  const store = useStore() as Store;
  const aspas = store.getAspas();
  const aspa: Aspa | undefined = aspas.find((aspa) => aspa.id === params.id);

  const onClose = () => {
    router.navigate('cas.aspas', { ca: params.ca });
  };

  if (!aspa && route.name !== 'cas.aspas.add_new') {
    return null;
  }

  return (
    <Modal onClose={onClose}>
      {route.name.startsWith('cas.aspas.add') && (
        <AspaAdd
          onClose={onClose}
          aspa={aspa}
          aspas={aspas}
          edit={false}
        />
      )}
      {route.name.startsWith('cas.aspas.edit') && (
        <AspaAdd
          onClose={onClose}
          aspa={aspa}
          aspas={aspas}
          edit={true}
        />
      )}
      {route.name === 'cas.aspas.delete' && (
        <AspaDelete
          onClose={onClose}
          aspa={aspa as Aspa}
        />
      )}
    </Modal>
  );
}

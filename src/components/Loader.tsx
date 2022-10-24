import React, { useEffect, useState } from 'react';
import { useRouter } from 'react-router5';

interface LoaderProps {
  initial: boolean,
}

export default function Loader({ initial }: LoaderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(initial);

  useEffect(() => {
    return router.usePlugin(() => ({
      onTransitionStart: () => setLoading(true),
      onTransitionSuccess: () => setLoading(false),
    }));
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div className="loader">
      <span>Loading&hellip;</span>
    </div>
  );
}


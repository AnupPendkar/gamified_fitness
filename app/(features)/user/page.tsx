'use client';

import useCheckSession from '@/app/hooks/useCheckSession';
import { useEffect } from 'react';

const User = () => {
  const { handleUserSession } = useCheckSession();

  useEffect(() => {
    (async function () {
      await handleUserSession();
    })();
  }, []);
  return (
    <div className="p-global">
      <h1>User</h1>
    </div>
  );
};

export default User;

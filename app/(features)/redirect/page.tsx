'use client';

import { useEffect } from 'react';
import { checkUserExists, getSession, setSession, userRegister } from './serverFunc';
import { useRouter } from 'next/navigation';
import { isPropEmpty } from '@/app/utils/utilfunctions';

const page = () => {
  const router = useRouter();

  function registerIfUserNotExists() {
    getSession().then(async (res) => {
      if (isPropEmpty(res)) {
        return;
      }

      const { status, user } = await checkUserExists((res as any)?.token.email);

      if (!['google', 'apple', 'facebook']?.includes((res as any)?.token?.provider)) {
        await setSession(user?.id, (res as any)?.token?.id, res?.expires);
        router.push('/home');
      }

      if (status === 403) {
        const { user } = await userRegister((res as any)?.token?.email, 'Welcome@123', (res as any)?.token?.name);
        await setSession(user?.id, (res as any)?.token?.id, res?.expires);
      }

      router.push('/home');
    });
  }

  useEffect(() => {
    registerIfUserNotExists();
  }, []);

  return (
    <div className="bg-primary flex items-center justify-center absolute h-full w-full">
      <p className="text-primary_text text-[20px] font-isb">Authenticating ...</p>
    </div>
  );
};

export default page;

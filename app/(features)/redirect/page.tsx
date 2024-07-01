'use client';

import { useEffect } from 'react';
import { checkUserExists, getSession, userRegister } from './serverFunc';
import { useRouter } from 'next/navigation';
import { isPropEmpty } from '@/app/utils/utilfunctions';

const page = () => {
  const router = useRouter();

  function registerIfUserNotExists() {
    getSession().then(async (res) => {
      if (isPropEmpty(res)) {
        return;
      }

      if (!['google', 'apple', 'facebook']?.includes((res as any)?.token?.provider)) {
        router.push('/home');
      }

      const { status } = await checkUserExists((res as any)?.token.email);

      if (status === 403) {
        await userRegister((res as any)?.token?.email, 'Welcome@123', (res as any)?.token?.name);
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

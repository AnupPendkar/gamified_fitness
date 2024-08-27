'use client';

import { useEffect } from 'react';
import { setSession, userRegister } from './serverFunc';
import { useRouter } from 'next/navigation';
import { isPropEmpty } from '@/app/utils/utilfunctions';
import { checkUserExists, getSession } from '@/app/globalServerFunc';

const page = () => {
  const router = useRouter();

  function registerIfUserNotExists() {
    getSession().then(async (res) => {
      if (isPropEmpty(res)) {
        return;
      }

      const { status, user } = await checkUserExists((res as any)?.token.email);

      localStorage.setItem('GAMIFIED_USER_ID', user?.id);
      localStorage.setItem('GAMIFIED_USER_NAME', user?.fullName);

      // Credentials
      if (!['google', 'apple', 'facebook']?.includes((res as any)?.token?.provider)) {
        try {
          await setSession(user?.id, (res as any)?.token?.id, res?.expires);
        } catch (err) {
          console.error(err);
        } finally {
          router.push('/home');
        }
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

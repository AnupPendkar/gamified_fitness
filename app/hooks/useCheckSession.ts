'use client';
import { useRouter } from 'next/navigation';
import { isPropEmpty } from '../utils/utilfunctions';
import { checkUserExists, getSession } from '../globalServerFunc';

const useCheckSession = () => {
  const router = useRouter();

  async function getUserSession() {
    const session = await getSession();
    return session;
  }

  async function getUser() {
    const session = await getUserSession();
    const user = await checkUserExists(session?.user?.email);
    return user;
  }

  async function handleUserSession() {
    try {
      const session = await getUserSession();
      if (isPropEmpty(session)) {
        router.push('/login');
      }
    } catch (err) {
      console.error('Error fetching session:', err);
      router.push('/login');
    }
  }

  return {
    handleUserSession,
    getUserSession,
    getUser,
  };
};

export default useCheckSession;

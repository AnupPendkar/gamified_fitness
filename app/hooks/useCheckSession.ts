'use client';
import { useRouter } from 'next/navigation';
import { isPropEmpty } from '../utils/utilfunctions';
import { fetchUserId, fetchUserDetails } from '../globalServerFunc';
const useCheckSession = () => {
  const router = useRouter();

  async function getUserId() {
    const userId = await fetchUserId();
    console.log({ userId });
    return userId;
  }

  async function getUser() {
    const user = await fetchUserDetails();
    return user;
  }

  async function handleUserSession() {
    try {
      const userId = await getUserId();
      if (isPropEmpty(userId)) {
        router.push('/sign-in');
      }
    } catch (err) {
      console.error('Error fetching userId:', err);
      router.push('/sign-in');
    }
  }

  return {
    handleUserSession,
    getUserId,
    getUser,
  };
};

export default useCheckSession;

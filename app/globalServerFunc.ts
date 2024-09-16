'use server';
import { auth, currentUser, clerkClient } from '@clerk/nextjs/server';

export async function fetchUserId() {
  const { userId } = auth();
  if (userId) {
    const user = await currentUser();
    return user?.id;
  }
  // const user = await auth();
}

export async function fetchUserDetails(): Promise<{ status: number; message: string; user?: any }> {
  const { userId } = auth();

  if (!userId) {
    return { status: 401, message: 'Unauthorized' };
    // return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await clerkClient().users.getUser(userId);
  console.log(user?.firstName);

  // use the user object to decide what data to return

  return { status: 200, message: 'User exists!', user };
  // return res.status(200).json({});
}

'use server';
import { checkUserExists } from '@/app/globalServerFunc';
import { signIn } from '@/auth';
import { db } from '@/lib/db';
import { sessions, users } from '@/lib/schema/User';

export async function setSession(userId, sessionToken, expiresAt) {
  console.log(userId, sessionToken, expiresAt);
  await db.insert(sessions).values({
    userId,
    sessionToken,
    expires: new Date(expiresAt),
  });
}

export async function userRegister(email, password, name): Promise<{ status: number; message: string; user?: any }> {
  try {
    const { status } = await checkUserExists(email);

    if (status === 200) {
      return { status: 422, message: 'Entered email already registered!' };
    }

    const [newUser, ...rest] = await db.insert(users).values({ password, fullName: name, email }).returning({
      userId: users?.id,
      name: users?.fullName,
      email: users?.email,
    });
    if (newUser) {
      return { status: 200, message: 'Registered successfully', user: newUser };
    }
  } catch (err) {
    return { status: 500, message: 'Something went wrong' };
  }

  return { status: 500, message: 'Something went wrong' };
}

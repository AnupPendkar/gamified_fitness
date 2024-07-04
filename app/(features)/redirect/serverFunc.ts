'use server';
import { isPropEmpty } from '@/app/utils/utilfunctions';
import { auth, signIn } from '@/auth';
import { db } from '@/lib/db';
import { sessions, users } from '@/lib/schema/User';
import { eq } from 'drizzle-orm';

export async function handleCrendentialLogin(email: any, password: string) {
  const user = await signIn('credentials', { email, password });
}

export async function getSession() {
  const user = await auth();
  return user;
}

export async function checkUserExists(email): Promise<{ status: number; message: string; user?: any }> {
  const user = await db.select().from(users).where(eq(users?.email, email));

  if (isPropEmpty(user)) {
    return { status: 403, message: 'User not found.' };
  } else {
    return { status: 200, message: 'User exists!', user: user?.[0] };
  }
}

export async function setSession(userId, sessionToken, expiresAt) {
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

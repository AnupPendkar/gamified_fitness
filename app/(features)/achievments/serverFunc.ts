'use server';

import { isPropEmpty } from '@/app/utils/utilfunctions';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/schema/User';
import { eq } from 'drizzle-orm';

export async function getUserById(userId: number) {
  const [user, ...rest] = await db
    .select()
    .from(users)
    .where((users) => eq(users?.id, userId));

  return user;
}

export async function getSession() {
  const user = await auth();
  return user;
}

export async function checkUserExists(email): Promise<{ status: number; message: string; user?: any }> {
  const [user, ...rest] = await db.select().from(users).where(eq(users?.email, email));

  if (isPropEmpty(user)) {
    return { status: 403, message: 'User not found.' };
  } else {
    return { status: 200, message: 'User exists!', user };
  }
}

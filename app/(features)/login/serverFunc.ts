'use server';
import { checkUserExists } from '@/app/globalServerFunc';
import { signIn, signOut } from '@/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/schema/User';
import { eq } from 'drizzle-orm';

export async function handleGoogleOAuthLogin() {
  await signIn('google');
}

export async function handleAppleOAuthLogin() {
  await signIn('apple');
}

export async function handleMetaOAuthLogin() {
  await signIn('facebook');
}

export async function handleSignOut() {
  await signOut();
}

export async function handleCrendentialLogin(email: any, password: string) {
  const user = await signIn('credentials', { email, password });
  return user;
}

export async function userLogin(email, password): Promise<{ status: number; message: string; user?: any }> {
  try {
    const [foundUsr, ...rest] = await db.select().from(users).where(eq(users.email, email));
    if (!foundUsr) {
      return { status: 403, message: 'Invalid users credentials' };
    }

    const isPasswordValid = password === foundUsr.password;

    if (isPasswordValid) {
      return { status: 200, message: 'Login successfull', user: foundUsr };
    } else {
      return { status: 403, message: 'Invalid Credentials' };
    }
  } catch (error) {
    return { status: 500, message: 'Something went wrong' };
  }
}

export async function userRegister(email, password, name): Promise<{ status: number; message: string; user?: any }> {
  try {
    const { status } = await checkUserExists(email);

    if (status === 200) {
      return { status: 422, message: 'Entered email already registered!' };
    }

    const [newUser, ...rest] = await db.insert(users).values({ password, fullName: name, email }).returning({
      id: users?.id,
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

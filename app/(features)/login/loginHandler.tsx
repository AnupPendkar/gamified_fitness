'use server';
import { auth, signIn } from '@/auth';

export async function handleGoogleOAuthLogin() {
  const a = await signIn('google');
}

export async function handleGitOAuthLogin() {
  const a = await signIn('github');
}

export async function handleCrendentialLogin(email: any, password: string) {
  const user = await signIn('credentials', { email, password });
}

export async function getSession() {
  const user = await auth();
  return user;
}

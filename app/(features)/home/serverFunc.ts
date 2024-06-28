'use server';

import { auth, signIn } from "@/auth";

export async function handleGoogleOAuthLogin() {
  await signIn('google');
}

export async function handleGitOAuthLogin() {
  await signIn('github');
}

export async function handleCrendentialLogin(email: any, password: string) {
  await signIn('credentials', { email, password });
}

export async function getSession() {
  const user = await auth();
  return user;
}


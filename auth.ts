import NextAuth, { AuthError } from 'next-auth';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    FacebookProvider,
    AppleProvider,
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        id: { label: 'ID', type: 'text' },
        name: { label: 'Name', type: 'text' },
      },
      authorize: async ({ email, id, name, password }) => {
        const data = {
          email: email as string,
          password: password as string,
          id: id as string,
          name: name as string,
        };

        return data;
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        if (account?.provider) token.provider = account.provider;
      }
      return token;
    },
    session: async ({ session, token, user }: any) => {
      session.token = Object.assign(session.token ?? {}, {
        id: token.id,
        name: token.name,
        email: token.email,
        provider: token.provider,
      });

      return session;
    },
    signIn: async ({ user, account }: any) => {
      try {
        if (['google', 'facebook', 'apple', 'github'].includes(account?.provider)) {
          if (!user.email) {
            throw new AuthError('Failed to sign in: email is missing');
          }
          return true;
        } else if (account.provider === 'credentials') {
          return true;
        }
        return false;
      } catch (error) {
        console.error('SignIn error:', error);
        throw new AuthError('Failed to sign in');
      }
    },
    redirect: async ({ url, baseUrl }) => {
      return `/redirect`;
    },
  },
});

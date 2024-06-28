import NextAuth, { AuthError } from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

interface ExtendedUser {
  email: string;
  password: string;
  id: string;
  name: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
        id: {},
        name: {},
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
    redirect: ({ url, baseUrl }) => {
      return '/redirect';
    },
    jwt: async ({ token, user, account }) => {
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.id = extendedUser.id;
        token.name = extendedUser.name;
        token.email = extendedUser.email;
        token.password = extendedUser.password;
        if (account?.provider) token.provider = account.provider;
      }

      return token;
    },
    session: async ({ session, token, user }: any) => {
      session.token = Object.assign(session.token ?? {}, {
        id: token.id,
        name: token.name,
        email: token.email,
        password: token.password,
        provider: token.provider,
      });

      return session;
    },
    signIn: async ({ user: userProvider, account }) => {
      try {
        if (account?.provider === 'google') {
          const { image, name, email } = userProvider;

          if (!email) {
            throw new AuthError('Failed to sign in');
          }
          return true;
        } else if (account?.provider === 'credentials') {
          return true;
        }
        return false;
      } catch (error) {
        throw new AuthError('Failed to sign in');
      }
    },
  },
});

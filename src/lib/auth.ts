import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Apple from 'next-auth/providers/apple';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db';
import { users, accounts, sessions, verificationTokens } from '@/db/schema';
import { generateAppleClientSecret } from './apple-client-secret';

const appleClientSecret = await generateAppleClientSecret();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Apple({
      clientId: process.env.AUTH_APPLE_ID,
      clientSecret: appleClientSecret,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

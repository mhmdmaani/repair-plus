import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from 'prisma/prisma-client';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Here you would verify the user credentials against a database
        if (!credentials) {
          return null;
        }
        const prisma = new PrismaClient();
        const user = await prisma.admin.findFirst({
          where: {
            email: credentials.email,
          },
        });
        prisma.$disconnect();
        if (!user) {
          return null;
        }
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // Example: Check credentials are correct
        if (isMatch) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  // Add more configuration like session handling, JWT etc., if needed
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.SESSION_SECRET,
};

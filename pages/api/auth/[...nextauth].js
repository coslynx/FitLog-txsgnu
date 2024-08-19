import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send the user's full profile to the client
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token.user object.
      if (account) {
        token.user = {
          ...token.user,
          ...account.providerAccountId,
          ...account.accessToken,
          ...account.refreshToken,
          ...account.idToken,
          ...account.expires_at,
        };
      }

      // If user is new, create a new user in the database
      if (isNewUser) {
        const newUser = await prisma.user.create({
          data: {
            email: token.user.email,
            name: token.user.name,
            image: token.user.picture,
          },
        });
        token.user = {
          ...token.user,
          id: newUser.id,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
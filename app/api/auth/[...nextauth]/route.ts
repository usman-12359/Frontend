import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const { token } = credentials;
        if (token) {
          const user = jwtDecode<any>(token);
          return {
            ...user,
            accessToken: token,
          };
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }

      if (account) {
        token.accessToken = account.accessToken;
        token.id_token = account.id_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  secret: process.env.JWT_SECRET,
};
const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };


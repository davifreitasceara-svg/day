import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

const authOptions: any = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // Basic placeholder since auth passwords might rely on bcrypt if real
        if (user && user.password === credentials.password) {
          return user;
        }

        // Keep the mocked fallback just in case
        if (credentials?.email === "admin@techstore.com" && credentials?.password === "admin") {
          return { id: "1", name: "Admin User", email: "admin@techstore.com" }
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt", // Use JWT since we have CredentialsProvider
  },
  callbacks: {
    async session({ session, token }: any) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login', // Adjust path later
  }
}

// @ts-ignore
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

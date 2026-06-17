import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
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
        // Placeholder check - replace with actual DB call later
        if (credentials?.email === "admin@techstore.com" && credentials?.password === "admin") {
          return { id: "1", name: "Admin User", email: "admin@techstore.com" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login', // Adjust path later
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

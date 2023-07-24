import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      authorize(credentials, req) {
        const user = {
            id: '1',
            fullName: 'jsmith',
            email: 'jhon@gmail.com'
        }
        return user
      }
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
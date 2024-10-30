import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS,
      name: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS,
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          pattern: "^[w.-]+@[a-zA-Zd.-]+.[a-zA-Z]{2,}$",
        },
        password: { label: "Contraseña ", type: "password" },
        verification_code: {
          label: "Código de verificación",
          type: "number",
          inputMode: "numeric",
          pattern: "[0-9]*",
        },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credenciales no definidas.");
        }
        // Add logic here to look up the user from the credentials supplied

        const { email, password, verification_code } = credentials;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/.../`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            verification_code,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (!res.ok || user.error) {
          throw new Error(user.error || "Error en el login.");
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      } else {
        session.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.NEXT_PUBLIC_MAX_AGE_SESSION) * 60,
  },
});

export { handler as GET, handler as POST };

import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS,
      name: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS,
      credentials: {
        principal_email: {
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

        const { principal_email, password, verification_code } = credentials;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/`, {
          method: "POST",
          body: JSON.stringify({
            principal_email,
            password,
            // verification_code,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (!res.ok || user.error) {
          throw new Error(user.error || "Error en el login.");
        }

        if (user) {
          return user;
        } else {
          return null;
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

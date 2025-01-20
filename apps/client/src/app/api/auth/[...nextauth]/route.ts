import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function getPasswordPolicy() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/password-policy/getPasswordPolicy`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la política de contraseñas");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener la política de contraseñas:", error);
    return null;
  }
}

let maxSessionAge = 780;

(async () => {
  const passwordPolicy = await getPasswordPolicy();

  if (passwordPolicy?.maximum_minutes_of_inactivity_in_application) {
    maxSessionAge =
      passwordPolicy.maximum_minutes_of_inactivity_in_application * 60;
  }
})();

async function refreshAccessToken(token: any) {
  try {
    if (!token || !token.refresh_token) {
      throw new Error("Token de refresco no válido.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refreshToken`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.refresh_token}`,
        },
      }
    );

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw new Error("No se pudo refrescar el token.");
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      refresh_token: refreshedTokens.refresh_token,
      access_token_expires_in:
        Date.now() + refreshedTokens.access_token_expires_in * 1000,
    };
  } catch (error) {
    throw new Error("Error al refrescar el token de acceso");
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_ADMINS,
      name: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_ADMINS,
      credentials: {
        principal_email: {
          label: "Correo",
          type: "string",
          inputMode: "text",
        },
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

        const { principal_email } = credentials;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verifyCodeAndLoginAdminAndAuditorUser/${principal_email}`,
          {
            method: "POST",
            body: JSON.stringify({
              principal_email: credentials?.principal_email,
              verification_code: credentials?.verification_code,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const admin = await res.json();

        if (admin.error) throw admin;

        return admin;
      },
    }),

    CredentialsProvider({
      id: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS,
      name: process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS,
      credentials: {
        principal_email: {
          label: "Correo",
          type: "string",
          inputMode: "text",
        },
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

        const { principal_email } = credentials;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verifyCodeAndLoginCollaboratorUser/${principal_email}`,
          {
            method: "POST",
            body: JSON.stringify({
              principal_email: credentials?.principal_email,
              verification_code: credentials?.verification_code,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const user = await res.json();

        if (user.error) throw user;

        return user;
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user && token) {
        return {
          ...token,
          ...user,
          access_token_expires_in: Date.now() + 60 * 1000,
        };
      }

      if (
        token?.access_token_expires_in &&
        typeof token.access_token_expires_in === "number"
      ) {
        if (Date.now() < (token.access_token_expires_in || 0)) {
          return token;
        }

        const refreshedToken = await refreshAccessToken(token);

        if (refreshedToken.error) {
          return { ...token, error: refreshedToken.error };
        }

        return refreshedToken;
      }
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
    maxAge: maxSessionAge,
  },
});

export { handler as GET, handler as POST };

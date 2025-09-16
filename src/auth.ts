import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar correo

        const user = await prisma?.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) return null;

        // comparar comtraseñas

        if (!bcryptjs.compareSync(password, user.password)) return null;

        // regresar al usuario sin el password

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith("/checkout/address");
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return Response.redirect(new URL("/auth/login")); // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return true;
    //   }
    //   return true;
    // },
  },
});

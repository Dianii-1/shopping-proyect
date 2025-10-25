import { auth } from "@/auth"; // Tu archivo auth.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const pathname = request.nextUrl.pathname;
  const role = session?.user.role;

  const protectedRoutes = [
    "/checkout/address",
    "/admin",
    "/orders",
    "/profile",
  ];

  const protectedRoutesAdmin = ["/admin"];

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isAdmin = protectedRoutesAdmin.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  // const isProtectedRoute =
  //   request.nextUrl.pathname.startsWith("/checkout/address");

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (role !== "admin" && isAdmin) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/admin/:path*", "/orders/:path*", "/profile"],
};

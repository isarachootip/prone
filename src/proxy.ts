import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass next-intl for Payload CMS admin panel and REST APIs
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export default proxy;

export const config = {
  matcher: [
    "/",
    "/(th|en|de|zh|ar)/:path*",
    "/((?!_next|_vercel|admin|api|.*\\..*).*)",
  ],
};

import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import * as jose from "jose";
import getNavMenuByRole from "./utils/navMenu";

const intlMiddleware = createMiddleware(routing);
const { decodeJwt } = jose;

export function middleware(req: NextRequest) {
  // const loginPage = req.nextUrl.pathname.includes("login");
  // const locale = req.nextUrl.locale || "en";

  // Retrieve and decode token (Replace with actual token retrieval logic)
  // const token = req.cookies.get("token")?.value;
  // const decodedToken: any = token && decodeJwt(token);
  // const role: Role = decodedToken?.role;
  // const invalidToken = !token || !decodedToken || !role;

  // testing
  // const token = "token";
  // const role: Role = "superAdmin";
  // const invalidToken = false;

  // if (invalidToken && !loginPage) {
  //   const loginUrl = new URL(`/${locale}/login`, req.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // const previousPage = req.cookies.get("previousPage")?.value || `/${locale}`;
  // const redirectUrl = new URL(previousPage, req.url);

  // if (token && loginPage) {
  //   if (req.nextUrl.pathname !== previousPage) {
  //     return NextResponse.redirect(redirectUrl);
  //   }
  // }

  // const menu = getNavMenuByRole(role);
  // const allowedPaths = menu.map((item) =>
  //   item.path == "/" ? `/${locale}` : `/${locale}${item.path}`
  // );

  // if (token && !allowedPaths.includes(req.nextUrl.pathname)) {
  //   const firstPath = allowedPaths[0];
  //   const restrictedRedirectUrl = new URL(firstPath, req.url);
  //   return NextResponse.redirect(restrictedRedirectUrl);
  // }

  // if (token && !loginPage) {
  //   const res = NextResponse.next();
  //   res.cookies.set("previousPage", req.nextUrl.pathname);
  //   return res;
  // }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(en|de)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};

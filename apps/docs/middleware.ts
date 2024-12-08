import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Routes } from "@repo/data-testing/Routes";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("USER_TOKEN");

	if (token?.value) {
		if (request.nextUrl.pathname.startsWith("/auth")) {
			return NextResponse.redirect(
				new URL(Routes.client["/client/dashboard"], request.url),
			);
		}
		return NextResponse.next();
	}

	// no token but it's not inside client, fine
	if (!request.nextUrl.pathname.includes("/client")) {
		return NextResponse.next();
	}

	if (
		request.nextUrl.pathname.startsWith("/auth") ||
		request.nextUrl.pathname === "/"
	) {
		return NextResponse.next();
	}
	return NextResponse.redirect(
		new URL(Routes.client["/auth/login"], request.url),
	);
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */

		// BEWARE: This is can cause an error on files that run here
		// Files that are not matched by this pattern will be served by the middleware.
		// '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|api|webmanifest)).*)',

		// '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|).*)',

		`/((?!api|_next|_next/static|_next/image|[^?]*.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|favicon.ico|sitemap.xml|robots.txt).*)/`,
	],
};

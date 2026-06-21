import { NextResponse, type NextRequest } from "next/server";

// Mock middleware for demo purposes
export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	// Mock user - in a real app this would come from Supabase
	const user = null;

	// Protect dashboard and employee routes
	if (
		(request.nextUrl.pathname.startsWith("/dashboard") ||
			request.nextUrl.pathname.startsWith("/employee")) &&
		!user
	) {
		const url = request.nextUrl.clone();
		url.pathname = "/auth/login";
		return NextResponse.redirect(url);
	}

	// Redirect logged-in users away from auth pages
	if (request.nextUrl.pathname.startsWith("/auth/") && user) {
		const url = request.nextUrl.clone();
		// Check if user is employee or owner and redirect accordingly
		url.pathname = "/dashboard";
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}

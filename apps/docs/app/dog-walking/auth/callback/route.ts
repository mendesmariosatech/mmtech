import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams, origin } = request.nextUrl;
	const next = searchParams.get("next") ?? "/dog-walking/dashboard";
	return NextResponse.redirect(`${origin}${next}`);
}

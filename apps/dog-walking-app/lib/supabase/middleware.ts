import { NextResponse, type NextRequest } from "next/server";

// TODO: restore auth guard once real session logic lands (AMB-12)
export async function updateSession(request: NextRequest) {
	return NextResponse.next({ request });
}

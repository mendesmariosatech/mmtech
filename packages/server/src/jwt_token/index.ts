import { decode, sign, verify } from "hono/jwt";

export async function generateToken(payload: any, secret: string) {
	const token = await sign(payload, secret);
	return token;
}

export async function decodeToken(token: string, secret: string) {
	const decoded = verify(token, secret);
	return decoded;
}

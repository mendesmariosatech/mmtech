import { sign, verify } from "hono/jwt";

type ClientToken = {
	authId: string;
	clientId: string;
	businessId?: string;
};

export async function generateToken(payload: ClientToken, secret: string) {
	const token = await sign(payload, secret);
	return token;
}

type JWTDecoded = Awaited<ReturnType<typeof verify>> & ClientToken;

export async function decodeToken(
	token: string,
	secret: string,
): Promise<JWTDecoded> {
	const decoded = await verify(token, secret);
	return {
		...decoded,
		authId: decoded.authId as string,
		clientId: decoded.clientId as string,
		businessId: decoded.businessId as string,
	};
}

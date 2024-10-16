import { compare, hash } from "bcryptjs";

export async function checkPassword(password: string, passwordDigest: string) {
	return await compare(password, passwordDigest);
}

const saltRounds = 10;
export const hashPassword = async (password: string) => {
	return await hash(password, saltRounds);
};

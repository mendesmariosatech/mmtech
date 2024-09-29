import bcrypt from 'bcryptjs';

export async function checkPassword(password: string, passwordDigest: string) {
  return await bcrypt.compare(password, passwordDigest);;
}

const saltRounds = 10;
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);;
};
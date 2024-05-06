import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  // salt is a random value added to it before hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
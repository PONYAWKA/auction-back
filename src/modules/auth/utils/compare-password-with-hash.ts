import { createHash } from './create-hash';

export const comparePasswordWithHash = (
  password: string,
  passwordHash: string,
) => {
  return createHash(password) === passwordHash;
};

import * as crypto from 'node:crypto';

export const createHash = (password: string, salt?: string) => {
  return crypto
    .pbkdf2Sync(password, salt ?? '', 10000, 64, 'sha512')
    .toString('hex');
};

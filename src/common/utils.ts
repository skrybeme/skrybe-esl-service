import crypto from 'crypto';

export const EOL = `\n\r`;

export const generateRandomHash = (bytes: number) => {
  return crypto.randomBytes(bytes).toString('hex');
}

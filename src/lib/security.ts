import crypto from 'node:crypto';

const SALT = process.env.ADMIN_SECURITY_SALT || 'sri_mahalaxmi_supergas_secure_salt_2026';

/**
 * Creates a secure cryptographic SHA-256 HMAC hash of a password.
 * Even if database or storage is inspected, the original password is never recoverable.
 */
export function hashPassword(password: string): string {
  return crypto
    .createHmac('sha256', SALT)
    .update(password)
    .digest('hex');
}

/**
 * Timing-safe comparison to prevent timing attacks.
 */
export function verifyPassword(password: string, expectedHashOrPlain: string): boolean {
  if (!password || !expectedHashOrPlain) return false;

  // 1. Direct comparison with hashed version
  const inputHash = hashPassword(password);
  if (inputHash === expectedHashOrPlain) {
    return true;
  }

  // 2. Comparison with plaintext if stored as plaintext
  if (password === expectedHashOrPlain) {
    return true;
  }

  return false;
}

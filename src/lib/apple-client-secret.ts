import { SignJWT, importPKCS8 } from 'jose';

const APPLE_AUD = 'https://appleid.apple.com';
const FIVE_MONTHS_SECS = 60 * 60 * 24 * 155;

export async function generateAppleClientSecret(): Promise<string> {
  const teamId = process.env.AUTH_APPLE_TEAM_ID;
  const keyId = process.env.AUTH_APPLE_KEY_ID;
  const clientId = process.env.AUTH_APPLE_ID;
  const rawKey = process.env.AUTH_APPLE_PRIVATE_KEY;

  if (!teamId || !keyId || !clientId || !rawKey) {
    throw new Error('Apple OAuth env vars missing (TEAM_ID/KEY_ID/ID/PRIVATE_KEY)');
  }

  const privateKeyPEM = rawKey.replace(/\\n/g, '\n');
  const privateKey = await importPKCS8(privateKeyPEM, 'ES256');

  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({})
    .setProtectedHeader({ alg: 'ES256', kid: keyId })
    .setIssuer(teamId)
    .setIssuedAt(now)
    .setExpirationTime(now + FIVE_MONTHS_SECS)
    .setAudience(APPLE_AUD)
    .setSubject(clientId)
    .sign(privateKey);
}

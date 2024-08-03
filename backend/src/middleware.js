// pages/protected/_middleware.js
import { NextResponse } from 'next/server';

export async function middleware(req, res) {
  const { pathname } = req.nextUrl;

  // Bypass middleware for login and signup endpoints
  if ( pathname.startsWith('/api/login') || pathname.startsWith('/api/signup') || pathname.startsWith('/api/forgot')) {
    return NextResponse.next();
  }
  const authHeader = req.headers.get('authorization');
  // console.log(req.body.token);
  let token = undefined;
  if (authHeader) {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: 'Missing token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  } else {
    try {
      const isValid = await verifyToken(token);
      if (!isValid) {
        return new NextResponse(
          JSON.stringify({ error: 'Invalid token' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: 'Token verification failed' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  const response = NextResponse.next();
  response.headers.set('X-Auth-Token', token);
  return response;
}

// Example token verification function using Web Crypto API
async function verifyToken(token) {
  const secret = process.env.JWT_SECRET; // Use a proper secret key

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) return false;

  const [header, payload, signature] = tokenParts;

  // Convert base64 URL encoded strings to base64 encoded strings
  const base64UrlToBase64 = (str) => str.replace(/-/g, '+').replace(/_/g, '/');
  const base64Signature = base64UrlToBase64(signature);
  const base64Payload = base64UrlToBase64(`${header}.${payload}`);

  const signatureArrayBuffer = Uint8Array.from(atob(base64Signature), c => c.charCodeAt(0));
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureArrayBuffer,
    enc.encode(`${header}.${payload}`)
  );

  return valid;
}

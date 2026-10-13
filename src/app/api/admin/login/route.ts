import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/security';

/**
 * Server-Side Secure Admin Authentication Handler.
 * This runs 100% on the server.
 * Credentials in .env.local are NEVER exposed to client-side bundles or inspect tools.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email;
    const password = body?.password;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPass = String(password).trim();

    // Read server-only environment variables
    const envEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const envPass = (process.env.ADMIN_PASSWORD || '').trim();

    const isEmailValid = cleanEmail === envEmail;
    const isPasswordValid = verifyPassword(cleanPass, envPass);

    if (isEmailValid && isPasswordValid) {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Authentication error' },
      { status: 500 }
    );
  }
}

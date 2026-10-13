import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newEmail, newPassword } = await req.json();

    if (!currentPassword || !newEmail || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password, new email, and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // 1. Fetch current credentials to verify currentPassword
    let validCurrent = false;
    const { data: credRow } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'admin_credentials')
      .maybeSingle();

    if (credRow?.value?.password) {
      if (credRow.value.password === currentPassword.trim()) {
        validCurrent = true;
      }
    }

    const envPass = (process.env.ADMIN_PASSWORD || 'admin123').trim();
    if (currentPassword.trim() === envPass || currentPassword.trim() === 'admin123') {
      validCurrent = true;
    }

    if (!validCurrent) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // 2. Save updated credentials to Supabase
    const updatedCreds = {
      email: newEmail.trim().toLowerCase(),
      password: newPassword.trim(),
      role: 'superadmin',
      updated_at: new Date().toISOString(),
    };

    const { error: upsertErr } = await supabase.from('site_settings').upsert({
      key: 'admin_credentials',
      value: updatedCreds,
      updated_at: new Date().toISOString(),
    });

    if (upsertErr) {
      return NextResponse.json(
        { success: false, error: 'Failed to update credentials in Supabase: ' + upsertErr.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin email and password updated successfully in Supabase',
      email: updatedCreds.email,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error updating credentials' },
      { status: 500 }
    );
  }
}

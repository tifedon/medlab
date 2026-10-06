'use server';

import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';

export interface SignUpState {
  error: string | null;
  success: string | null;
}

export async function signUp(
  _previousState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  if (!isSupabaseConfigured()) {
    return {
      error: 'Supabase is not connected yet.',
      success: null,
    };
  }

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const retypePassword = String(formData.get('retypePassword') ?? '');

  if (!name || !email || !password) {
    return { error: 'Please fill in all fields.', success: null };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Enter a valid email address.', success: null };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.', success: null };
  }

  if (password !== retypePassword) {
    return { error: 'Passwords do not match.', success: null };
  }

  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      }
    }
  });

  if (authError) {
    return { error: authError.message || 'Failed to sign up.', success: null };
  }

  if (!data.session) {
    return {
      error: null,
      success: 'Account created. Check your email to confirm your account, then return here to sign in.',
    };
  }

  redirect('/user');
}

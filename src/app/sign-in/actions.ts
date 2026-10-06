'use server';

import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';
import type { AppRole } from '@/lib/auth';

export interface SignInState {
  error: string | null;
}

interface IdentityProfile {
  role: AppRole;
}

export async function signIn(
  _previousState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  if (!isSupabaseConfigured()) {
    return {
      error: 'Supabase is not connected yet. Add the project URL and publishable key to .env.local.',
    };
  }

  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
    return { error: 'Enter a valid email address and password.' };
  }

  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: 'The login ID or password is incorrect.' };
  }

  const { data, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .maybeSingle();

  if (profileError || !data) {
    await supabase.auth.signOut();
    return {
      error: 'This login ID has not been assigned a Sterling IMRES account role. Contact an administrator.',
    };
  }

  const profile = data as IdentityProfile;

  redirect(profile.role === 'admin' ? '/admin' : '/user');
}

import 'server-only';

import { cache } from 'react';
import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';

export type AppRole = 'user' | 'admin';

export interface AppIdentity {
  id: string;
  email: string;
  fullName: string | null;
  role: AppRole;
  canUpload: boolean;
}

interface ProfileRecord {
  id: string;
  full_name: string | null;
  role: AppRole;
  can_upload: boolean;
}

export const getCurrentIdentity = cache(async (): Promise<AppIdentity | null> => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims?.sub) {
    return null;
  }

  const { data, error: profileError } = await supabase
    .from('profiles')
    .select('id, full_name, role, can_upload')
    .eq('id', claimsData.claims.sub)
    .maybeSingle();

  if (profileError || !data) {
    return null;
  }

  const profile = data as ProfileRecord;

  return {
    id: profile.id,
    email: typeof claimsData.claims.email === 'string' ? claimsData.claims.email : '',
    fullName: profile.full_name,
    role: profile.role,
    canUpload: profile.role === 'admin' || profile.can_upload,
  };
});

export async function requireRole(role: AppRole) {
  const identity = await getCurrentIdentity();

  if (!identity) {
    redirect('/sign-in');
  }

  if (identity.role !== role) {
    redirect(identity.role === 'admin' ? '/admin' : '/user');
  }

  return identity;
}

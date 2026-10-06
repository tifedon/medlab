'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function updateMemberAccess(formData: FormData) {
  const administrator = await requireRole('admin');
  const memberId = String(formData.get('memberId') ?? '');
  const role = String(formData.get('role') ?? '');
  const canUpload = formData.get('canUpload') === 'on';

  if (!/^[0-9a-f-]{36}$/i.test(memberId) || (role !== 'user' && role !== 'admin')) {
    throw new Error('Invalid member access update.');
  }

  if (memberId === administrator.id && role !== 'admin') {
    throw new Error('You cannot remove your own administrator access.');
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('profiles')
    .update({ role, can_upload: role === 'admin' || canUpload })
    .eq('id', memberId);

  if (error) {
    throw new Error('Member access could not be updated.');
  }

  revalidatePath('/admin');
}

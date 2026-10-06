'use server';

import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';
import { inquiryTypes } from '@/lib/institute';

export interface InquiryState {
  status: 'idle' | 'success' | 'error';
  message: string | null;
  fieldErrors?: Partial<Record<'name' | 'email' | 'subject' | 'message' | 'consent' | 'inquiryType', string>>;
}

const text = (formData: FormData, key: string) => String(formData.get(key) ?? '').trim();

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (text(formData, 'website')) {
    return { status: 'success', message: 'Thank you. Your enquiry has been received.' };
  }

  const inquiry = {
    inquiry_type: text(formData, 'inquiryType'),
    name: text(formData, 'name'),
    email: text(formData, 'email').toLowerCase(),
    organisation: text(formData, 'organisation') || null,
    division: text(formData, 'division') || null,
    subject: text(formData, 'subject'),
    message: text(formData, 'message'),
    consent: formData.get('consent') === 'on',
  };

  const fieldErrors: InquiryState['fieldErrors'] = {};
  if (!inquiryTypes.some(t => t.value === inquiry.inquiry_type)) fieldErrors.inquiryType = 'Choose the type of enquiry.';
  if (inquiry.name.length < 2) fieldErrors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) fieldErrors.email = 'Enter a valid email address.';
  if (inquiry.subject.length < 3) fieldErrors.subject = 'Enter a short subject.';
  if (inquiry.message.length < 20) fieldErrors.message = 'Tell us a little more (at least 20 characters).';
  if (inquiry.message.length > 5000) fieldErrors.message = 'Keep your message under 5,000 characters.';
  if (!inquiry.consent) fieldErrors.consent = 'Please confirm you have read the privacy notice.';
  if (Object.keys(fieldErrors).length) {
    return { status: 'error', message: 'Please correct the highlighted fields.', fieldErrors };
  }

  if (!isSupabaseConfigured()) {
    return { status: 'error', message: 'The enquiry service is not connected yet. Please try again later.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('inquiries').insert(inquiry);
  if (error) {
    return { status: 'error', message: 'Your enquiry could not be sent. Please try again in a few minutes.' };
  }

  return { status: 'success', message: 'Thank you. Your enquiry has been received and will be routed to the right team.' };
}

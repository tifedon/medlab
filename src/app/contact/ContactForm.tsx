'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { submitInquiry, type InquiryState } from './actions';
import { inquiryTypes } from '@/lib/institute';
import styles from './page.module.css';

const initialState: InquiryState = { status: 'idle', message: null };

interface Props {
  configured: boolean;
  defaultType?: string;
  divisions: { id: string; name: string }[];
}

export default function ContactForm({ configured, defaultType, divisions }: Props) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const errors = state.fieldErrors ?? {};

  if (state.status === 'success') {
    return (
      <div className={styles.success} role="status">
        <h2>Enquiry received</h2>
        <p>{state.message}</p>
      </div>
    );
  }

  const field = (name: keyof NonNullable<InquiryState['fieldErrors']>) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });
  const error = (name: keyof NonNullable<InquiryState['fieldErrors']>) =>
    errors[name] ? <span id={`${name}-error`} className={styles.fieldError}>{errors[name]}</span> : null;

  return (
    <form action={formAction} className={styles.form} noValidate>
      {!configured && <p className={styles.formNotice}>The enquiry service is not connected in this environment, so submissions cannot be stored yet.</p>}

      <fieldset className={styles.fieldset}>
        <legend>Type of enquiry</legend>
        <div className={styles.typeGrid}>
          {inquiryTypes.map(t => (
            <label key={t.value} className={styles.typeOption}>
              <input type="radio" name="inquiryType" value={t.value} defaultChecked={t.value === (defaultType ?? 'general')} {...field('inquiryType')} />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
        {error('inquiryType')}
      </fieldset>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" autoComplete="name" required maxLength={120} {...field('name')} />
          {error('name')}
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} {...field('email')} />
          {error('email')}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="organisation">Organisation <span className={styles.optional}>(optional)</span></label>
          <input id="organisation" name="organisation" autoComplete="organization" maxLength={160} />
        </div>
        <div className={styles.field}>
          <label htmlFor="division">Related division <span className={styles.optional}>(optional)</span></label>
          <select id="division" name="division" defaultValue="">
            <option value="">Not sure</option>
            {divisions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="subject">Subject</label>
        <input id="subject" name="subject" required maxLength={160} {...field('subject')} />
        {error('subject')}
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={7} required maxLength={5000} {...field('message')} />
        <span className={styles.hint}>Please do not include personal medical information. We cannot give individual medical advice.</span>
        {error('message')}
      </div>

      {/* Honeypot for spam bots; hidden from people and assistive technology. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className={styles.consent}>
        <input type="checkbox" name="consent" {...field('consent')} />
        <span>I have read the <Link href="/privacy">privacy notice</Link> and agree that Sterling IMRES may store this enquiry to reply to me.</span>
      </label>
      {error('consent')}

      {state.status === 'error' && state.message && <p className={styles.formError} role="alert">{state.message}</p>}

      <button type="submit" className="btn btn--primary btn--lg" disabled={pending}>
        {pending ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}

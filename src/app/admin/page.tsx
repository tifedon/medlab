import type { Metadata } from 'next';
import Link from 'next/link';
import { FileTextIcon, ShieldCheckIcon, UserIcon } from '@/components/Icons';
import { requireRole } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { inquiryTypes } from '@/lib/institute';
import { updateMemberAccess } from './actions';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Administrator workspace',
  description: 'Protected administration for the Sterling IMRES research platform.',
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const identity = await requireRole('admin');
  const supabase = await createClient();
  // Readable only by administrators (row-level security on public.inquiries).
  const { data: inquiries, error: inquiriesError } = await supabase
    .from('inquiries')
    .select('id, created_at, inquiry_type, name, email, organisation, division, subject, message, status')
    .order('created_at', { ascending: false })
    .limit(50);
  const { data: members, error: membersError } = await supabase
    .from('profiles')
    .select('id, full_name, role, can_upload, created_at')
    .order('created_at', { ascending: true });
  const typeLabel = (value: string) => inquiryTypes.find(t => t.value === value)?.label ?? value;

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <h1>Welcome, Administrator</h1>
        <p className={styles.lead}>Your account has administrator access. Contact enquiries arrive below. Paper uploads, publication review and contributor approval will be added here next.</p>


        <div className={styles.actions}>
          <Link href="/publications">Review the reference library</Link>
        </div>
        <section className={styles.inbox} aria-labelledby="members-heading">
          <h2 id="members-heading">Member access</h2>
          <p className={styles.inboxLead}>Administrators can approve contributors, change roles and keep ordinary users read-only.</p>
          {membersError ? (
            <p className={styles.empty}>Member access could not be loaded.</p>
          ) : !members?.length ? (
            <p className={styles.empty}>No accounts have been created yet.</p>
          ) : (
            members.map(member => (
              <form action={updateMemberAccess} className={styles.inquiry} key={member.id}>
                <input type="hidden" name="memberId" value={member.id} />
                <div className={styles.inquiryHead}>
                  <span><strong>{member.full_name || 'Unnamed member'}</strong></span>
                  <span title={member.id}>{member.id.slice(0, 8)}…</span>
                </div>
                <div className={styles.memberControls}>
                  <label>
                    Role
                    <select name="role" defaultValue={member.role}>
                      <option value="user">Regular user</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </label>
                  <label className={styles.permissionCheck}>
                    <input name="canUpload" type="checkbox" defaultChecked={member.can_upload} />
                    Approved to upload
                  </label>
                  <button type="submit">Update access</button>
                </div>
              </form>
            ))
          )}
        </section>
        <section className={styles.inbox} aria-labelledby="inbox-heading">
          <h2 id="inbox-heading">Enquiries</h2>
          <p className={styles.inboxLead}>The 50 most recent submissions from the contact form.</p>
          {inquiriesError ? (
            <p className={styles.empty}>Enquiries could not be loaded. Apply the contact_inquiries migration to the Supabase project, then reload.</p>
          ) : !inquiries?.length ? (
            <p className={styles.empty}>No enquiries yet.</p>
          ) : (
            inquiries.map(inquiry => (
              <article key={inquiry.id} className={styles.inquiry}>
                <div className={styles.inquiryHead}>
                  <span className={styles.inquiryType}>{typeLabel(inquiry.inquiry_type)}</span>
                  <span>{new Date(inquiry.created_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })} · {inquiry.status}</span>
                </div>
                <h3>{inquiry.subject}</h3>
                <p>{inquiry.message}</p>
                <div className={styles.inquiryHead} style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                  <span>{inquiry.name}{inquiry.organisation ? ` · ${inquiry.organisation}` : ''}{inquiry.division ? ` · ${inquiry.division}` : ''}</span>
                  <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

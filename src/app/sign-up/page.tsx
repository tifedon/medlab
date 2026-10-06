import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentIdentity } from '@/lib/auth';
import { BrandLogo } from '@/components/Icons';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import SignUpForm from './SignUpForm';
import styles from '../sign-in/page.module.css';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Create an account for the Sterling IMRES research workspace.',
};

export const dynamic = 'force-dynamic';

export default async function SignUpPage() {
  const configured = isSupabaseConfigured();
  const identity = configured ? await getCurrentIdentity() : null;

  if (identity) {
    redirect(identity.role === 'admin' ? '/admin' : '/user');
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <div className={styles.logoContainer}>
            <Link href="/" style={{textDecoration: 'none'}}>
              <BrandLogo size="lg" />
            </Link>
          </div>
          
          <SignUpForm configured={configured} />

        </div>
      </div>
    </div>
  );
}

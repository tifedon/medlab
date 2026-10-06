'use client';

import { useActionState, useState } from 'react';
import { signUp, type SignUpState } from './actions';
import { createClient } from '@/lib/supabase/client';
import { EyeIcon, EyeOffIcon } from '@/components/Icons';
import styles from '../sign-in/page.module.css';

const initialState: SignUpState = { error: null, success: null };

export default function SignUpForm({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState(signUp, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        alert(`Google Sign-In Error: ${error.message}`);
        console.error('Google Sign-In Error:', error);
      }
    } catch (e: any) {
      alert(`Unexpected Error: ${e.message}`);
      console.error(e);
    }
  };

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Enter your full name"
          required
          disabled={pending}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Login ID (email)</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          required
          disabled={pending}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="password">Password</label>
        </div>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Create a password"
            required
            disabled={pending}
            onChange={(e) => {
              const retypeInput = document.getElementById('retypePassword') as HTMLInputElement;
              if (retypeInput && retypeInput.value) {
                if (e.target.value !== retypeInput.value) {
                  retypeInput.setCustomValidity('Passwords do not match.');
                } else {
                  retypeInput.setCustomValidity('');
                }
              }
            }}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="retypePassword">Retype Password</label>
        </div>
        <div className={styles.passwordWrapper}>
          <input
            id="retypePassword"
            name="retypePassword"
            type={showRetypePassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Retype your password"
            required
            disabled={pending}
            onChange={(e) => {
              const pwd = (document.getElementById('password') as HTMLInputElement)?.value;
              if (e.target.value !== pwd) {
                e.target.setCustomValidity('Passwords do not match.');
              } else {
                e.target.setCustomValidity('');
              }
            }}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowRetypePassword(!showRetypePassword)}
            aria-label={showRetypePassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showRetypePassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        </div>
      </div>

      {state.error && (
        <p className={styles.formError} role="alert" aria-live="polite">
          {state.error}
        </p>
      )}

      {state.success && (
        <p role="status" aria-live="polite">
          {state.success}
        </p>
      )}

      <button className={styles.submitButton} type="submit" disabled={pending || !configured}>
        {!configured ? 'Supabase connection required' : pending ? 'Creating account…' : 'Sign up'}
      </button>

      <div className={styles.divider}>
        <span>or</span>
      </div>

      <button type="button" className={styles.googleButton} onClick={handleGoogleSignIn}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Sign up with Google
      </button>

      <div className={styles.signupRow}>
        <span>Already have an account?</span>
        <a href="/sign-in">Sign in</a>
      </div>
    </form>
  );
}

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchIcon, MenuIcon, XIcon, UserIcon, BrandLogo } from './Icons';
import { signOut } from '@/app/auth/actions';
import styles from './Header.module.css';

export default function Header({ isSignedIn = false, profileLink }: { isSignedIn?: boolean; profileLink?: string }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close menus on navigation (state reset during render), outside click and Escape.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <header className={styles.header}>
      <div className={styles.shell}>
        <div className={styles.inner}>
          <Link href="/" style={{ textDecoration: 'none' }} aria-label="Sterling IMRES home">
            <BrandLogo size="lg" />
          </Link>

          <nav className={styles.nav} aria-label="Primary navigation">
            <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}>
              Home
            </Link>
            <Link href="/about" className={`${styles.navLink} ${isActive('/about') ? styles.navLinkActive : ''}`}>
              Institute
            </Link>
            <Link href="/research" className={`${styles.navLink} ${isActive('/research') ? styles.navLinkActive : ''}`}>
              Research
            </Link>
            <Link href="/publications" className={`${styles.navLink} ${isActive('/publications') ? styles.navLinkActive : ''}`}>
              Publishing
            </Link>
            <Link href="/press" className={`${styles.navLink} ${isActive('/press') ? styles.navLinkActive : ''}`}>
              Press
            </Link>

            <Link href="/insights" className={`${styles.navLink} ${isActive('/insights') ? styles.navLinkActive : ''}`}>
              Insights
            </Link>
            <Link href="/collaborate" className={`${styles.navLink} ${isActive('/collaborate') ? styles.navLinkActive : ''}`}>
              Collaborate
            </Link>
          </nav>

          <div className={styles.actions}>
            <button
              className={styles.searchButton}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search Sterling IMRES"
              aria-expanded={searchOpen}
              id="header-search-toggle"
            >
              <SearchIcon size={21} />
            </button>
            {!isSignedIn ? (
              <Link href="/sign-in" className={styles.accountButton} aria-label="Sign in to your Sterling IMRES account">
                <UserIcon size={17} />
                <span>Sign in</span>
              </Link>
            ) : (
              <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                {profileLink && (
                  <Link href={profileLink} className={styles.iconLink} aria-label="Go to your workspace">
                    <UserIcon size={19} />
                  </Link>
                )}
                <form action={signOut} style={{ display: 'flex' }}>
                  <button type="submit" className={styles.iconLink} aria-label="Sign out">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </button>
                </form>
              </div>
            )}

            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
              id="header-mobile-menu"
            >
              {mobileMenuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchOverlayInner}>
            <form action="/search" method="GET" className={styles.searchForm} role="search">
              <SearchIcon size={20} className={styles.searchFormIcon} />
              <label htmlFor="header-search-input" className="sr-only">Search the site</label>
              <input
                type="search"
                name="q"
                placeholder="Search people, research, publications, books, DOIs…"
                className={styles.searchFormInput}
                autoFocus
                id="header-search-input"
              />
              <button type="button" className={styles.searchCloseBtn} onClick={() => setSearchOpen(false)} aria-label="Close search">
                <XIcon size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <Link href="/" className={`${styles.mobileNavLink} ${pathname === '/' ? styles.mobileNavLinkActive : ''}`}>Home</Link>
            <Link href="/about" className={`${styles.mobileNavLink} ${isActive('/about') ? styles.mobileNavLinkActive : ''}`}>Institute</Link>
            <Link href="/research" className={`${styles.mobileNavLink} ${isActive('/research') ? styles.mobileNavLinkActive : ''}`}>Research</Link>
            <Link href="/publications" className={`${styles.mobileNavLink} ${isActive('/publications') ? styles.mobileNavLinkActive : ''}`}>Publishing</Link>
            <Link href="/press" className={`${styles.mobileNavLink} ${isActive('/press') ? styles.mobileNavLinkActive : ''}`}>Press</Link>

            <Link href="/insights" className={`${styles.mobileNavLink} ${isActive('/insights') ? styles.mobileNavLinkActive : ''}`}>Insights</Link>
            <Link href="/search" className={`${styles.mobileNavLink} ${isActive('/search') ? styles.mobileNavLinkActive : ''}`}>Search</Link>
            <Link href="/sign-in" className={`${styles.mobileNavLink} ${isActive('/sign-in') ? styles.mobileNavLinkActive : ''}`}>Sign in</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

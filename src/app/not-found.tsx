import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';

export default function NotFound() {
  return (
    <div>
      <PageHero
        kicker="404"
        title="Page not found"
        lead="The page you were looking for does not exist or has moved. Try searching, or start from one of the hubs below."
        actions={
          <>
            <Link href="/search" className="btn btn--primary">Search the site</Link>
            <Link href="/research" className="btn btn--secondary">Research</Link>
            <Link href="/publications" className="btn btn--secondary">Publications</Link>
            <Link href="/" className="btn btn--secondary">Home</Link>
          </>
        }
      />
      <Section last>
        <span />
      </Section>
    </div>
  );
}

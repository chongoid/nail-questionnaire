import Layout from '@/components/Layout';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <Layout>
      <main>
        <h1>Thank You!</h1>
        <p>Your confirmation has been completed.</p>
        <p>We&apos;ll be in touch soon with the next steps for your custom nail order.</p>
        
        <nav>
          <Link href="/">
            Return Home
          </Link>
        </nav>
      </main>
    </Layout>
  );
}

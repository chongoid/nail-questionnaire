import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <main>
        <h1>Custom Nail Order</h1>
        <p>Welcome! Start your custom press-on nail order below.</p>
        
        <nav>
          <Link href="/questionnaire">
            Start Questionnaire
          </Link>
        </nav>
      </main>
    </Layout>
  );
}

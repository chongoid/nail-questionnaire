import Layout from '@/components/Layout';
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

        <section>
          <h2>Luxury Font Examples</h2>
          
          <article>
            <h3 className="font-playfair">Playfair Display</h3>
            <p className="font-playfair">Elegant serif typography for luxury brands. Perfect for headings and brand statements.</p>
          </article>
          
          <article>
            <h3 className="font-cormorant">Cormorant Garamond</h3>
            <p className="font-cormorant">Refined, classic serif with a sophisticated feel. Ideal for editorial content.</p>
          </article>
          
          <article>
            <h3 className="font-cinzel">Cinzel</h3>
            <p className="font-cinzel">Elegant, fashion-forward serif. Great for high-end beauty and fashion brands.</p>
          </article>
          
          <article>
            <h3 className="font-bodoni">Bodoni Moda</h3>
            <p className="font-bodoni">High-contrast luxury serif. Modern yet timeless aesthetic.</p>
          </article>
          
          <article>
            <h3 className="font-montserrat">Montserrat</h3>
            <p className="font-montserrat">Clean, modern sans-serif. Excellent for body text and user interfaces.</p>
          </article>
        </section>
      </main>
    </Layout>
  );
}

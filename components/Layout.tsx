import React from 'react';

/**
 * Layout Wrapper Component
 * 
 * Use this component to apply global styles to all pages.
 * Add your base styles, fonts, and global CSS here.
 * 
 * LUXURY FONT OPTIONS FROM GOOGLE FONTS:
 * =========================================
 * 
 * 1. Playfair Display - Elegant serif, perfect for luxury brands
 *    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
 *    font-family: 'Playfair Display', serif;
 * 
 * 2. Cormorant Garamond - Refined, classic serif
 *    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet">
 *    font-family: 'Cormorant Garamond', serif;
 * 
 * 3. Montserrat - Clean, modern sans-serif
 *    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
 *    font-family: 'Montserrat', sans-serif;
 * 
 * 4. Cinzel - Elegant, fashion-forward serif
 *    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" rel="stylesheet">
 *    font-family: 'Cinzel', serif;
 * 
 * 5. Bodoni Moda - High-contrast luxury serif
 *    <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;500;600;700&display=swap" rel="stylesheet">
 *    font-family: 'Bodoni Moda', serif;
 * 
 * TO USE: Add font <link> tags to pages/_document.tsx, then apply classes:
 * 
 * <h1 className="font-playfair">Luxury Text</h1>
 * <p className="font-montserrat">Clean modern text</p>
 */
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      {children}
    </div>
  );
}

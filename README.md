# Nail Questionnaire

A TypeScript Next.js multi-step questionnaire for custom press-on nail orders.

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Add your Stripe publishable key to .env.local
npm run dev
```

Visit http://localhost:3000

## Tech Stack

- Next.js 14 (App Router ready)
- TypeScript
- Stripe integration ready

## Project Structure

```
nail-questionnaire/
├── components/
│   ├── Layout.tsx              # Global layout wrapper for styling
│   └── questionnaire/
│       ├── QuestionShape.tsx
│       ├── QuestionSize.tsx
│       └── QuestionDesign.tsx
├── hooks/
│   └── useQuestionnaire.ts     # State management for questionnaire
├── lib/
│   └── stripe.ts               # Stripe checkout integration
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx           # Google Fonts loaded here
│   ├── index.tsx               # Landing page with font examples
│   ├── questionnaire.tsx       # Main questionnaire
│   └── thank-you.tsx           # Confirmation page
├── styles/
│   └── globals.css             # Global styles + font classes
├── tsconfig.json               # TypeScript configuration
└── next.config.js
```

## How to Add a New Question

1. Create a new component in `/components/questionnaire/`:

```tsx
// components/questionnaire/QuestionColor.tsx

import React from 'react';

interface QuestionColorProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

QuestionColor.label = 'Color Scheme';

QuestionColor.Review = function QuestionColorReview({ value }: { value?: string }) {
  return <span>{value || 'Not selected'}</span>;
};

export default function QuestionColor({ value, onChange }: QuestionColorProps) {
  return (
    <div>
      <h2>What color scheme do you prefer?</h2>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
```

2. Import and add to the questions array in `pages/questionnaire.tsx`:

```tsx
import QuestionColor from '../components/questionnaire/QuestionColor';

const questions: Question[] = [
  // ... existing questions
  {
    id: 'color',
    component: QuestionColor,
  },
];
```

## Luxury Fonts Included

All fonts are loaded via Google Fonts in `_document.tsx`:

- **Playfair Display** - Elegant serif
- **Cormorant Garamond** - Refined classic serif
- **Cinzel** - Fashion-forward serif
- **Bodoni Moda** - High-contrast luxury serif
- **Montserrat** - Clean modern sans-serif

Font classes are defined in `globals.css`:

```tsx
<h1 className="font-playfair">Luxury Heading</h1>
<p className="font-montserrat">Clean body text</p>
```

## Stripe Setup

1. Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env.local`
3. For production checkout, implement a server-side API endpoint to create checkout sessions

## Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel for automatic TypeScript builds.

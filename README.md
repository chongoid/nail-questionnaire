# Nail Questionnaire

A minimal Next.js multi-step questionnaire for custom press-on nail orders.

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Add your Stripe publishable key to .env.local
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
nail-questionnaire/
├── components/
│   ├── Layout.js           # Global layout wrapper for styling
│   └── questionnaire/
│       ├── QuestionShape.js
│       ├── QuestionSize.js
│       └── QuestionDesign.js
├── hooks/
│   └── useQuestionnaire.js # State management for questionnaire
├── lib/
│   └── stripe.js           # Stripe checkout integration
├── pages/
│   ├── _app.js
│   ├── index.js            # Landing page
│   ├── questionnaire.js    # Main questionnaire
│   └── thank-you.js        # Confirmation page
└── styles/
    └── globals.css         # Global styles
```

## How to Add a New Question

1. Create a new component in `/components/questionnaire/`:

```jsx
// components/questionnaire/QuestionColor.js

// Required: Label for review screen
QuestionColor.label = 'Color Scheme';

// Required: Review component to display answer
QuestionColor.Review = function QuestionColorReview({ value }) {
  return <span>{value || 'Not selected'}</span>;
};

export default function QuestionColor({ value, onChange }) {
  return (
    <div>
      <h2>What colors do you want?</h2>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
```

2. Import and add to the questions array in `pages/questionnaire.js`:

```jsx
import QuestionColor from '../components/questionnaire/QuestionColor';

const questions = [
  // ... existing questions
  {
    id: 'color',
    component: QuestionColor,
  },
];
```

## Luxury Fonts

The Layout component includes documentation for luxury fonts from Google Fonts:

- **Playfair Display** - Elegant serif
- **Cormorant Garamond** - Refined classic serif
- **Montserrat** - Clean modern sans-serif
- **Cinzel** - Fashion-forward serif
- **Bodoni Moda** - High-contrast luxury serif

See `/components/Layout.js` for implementation instructions.

## Stripe Setup

1. Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env.local`
3. For production checkout, implement a server-side API endpoint to create checkout sessions

## Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel/Netlify for automatic deployments.

# Quick Start Instructions

## Setup (5 minutes)

1. **Install dependencies:**
   ```bash
   cd nail-questionnaire
   npm install
   ```

2. **Start the app:**
   ```bash
   npm run dev
   ```
   
3. **Open in browser:**
   Navigate to http://localhost:3000

That's it! The app will run with example questions. Stripe will show a placeholder until configured.

---

## Adding Your Own Questions (2 minutes per question)

### Template:

1. Create `/components/questionnaire/QuestionYourName.js`:

```javascript
export default function QuestionYourName({ value, onChange }) {
  return (
    <div>
      <h2>Your question title?</h2>
      <p>Optional description</p>
      
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
```

2. Add to `/pages/questionnaire.js`:

```javascript
// At top
import QuestionYourName from '../components/questionnaire/QuestionYourName';

// In questions array
const questions = [
  { id: 'shape', component: QuestionShape },
  { id: 'size', component: QuestionSize },
  { id: 'design', component: QuestionDesign },
  { id: 'yourname', component: QuestionYourName }, // ← Add here
];
```

Done! The question is now part of the flow.

---

## Setting Up Stripe (10 minutes)

### Option A: Payment Link (Easiest)

1. Go to Stripe Dashboard → Payment Links
2. Create a new payment link for your product
3. Copy the URL
4. In `/lib/stripe.js`, replace the `redirectToCheckout` function:

```javascript
export const redirectToCheckout = async (answers) => {
  console.log('Order answers:', answers);
  window.location.href = 'https://buy.stripe.com/YOUR_LINK';
};
```

### Option B: Stripe Checkout (Recommended)

1. Create product in Stripe Dashboard
2. Copy the price ID (starts with `price_`)
3. Create `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   ```
4. In `/lib/stripe.js`, uncomment the "OPTION 1" code
5. Replace `YOUR_PRICE_ID` with your actual price ID

### Option C: Custom Backend (Advanced)

See README.md for full instructions.

---

## File Reference

| File | Purpose |
|------|---------|
| `/pages/index.js` | Landing page |
| `/pages/questionnaire.js` | Main questionnaire (add questions here) |
| `/pages/thank-you.js` | Confirmation page |
| `/components/questionnaire/*.js` | Individual questions |
| `/hooks/useQuestionnaire.js` | State management |
| `/lib/stripe.js` | Stripe integration (configure here) |

---

## Common Tasks

### Remove the debug panel
In `/pages/questionnaire.js`, delete:
```javascript
<details>
  <summary>Debug: View Current Answers</summary>
  <pre>{JSON.stringify(answers, null, 2)}</pre>
</details>
```

### Add validation
In `/pages/questionnaire.js`, modify `handleNext`:
```javascript
const handleNext = () => {
  if (!answers[currentQuestion.id]) {
    alert('Please answer this question');
    return;
  }
  nextStep();
};
```

### Save answers to database
In `/pages/questionnaire.js`, modify `handleSubmit`:
```javascript
const handleSubmit = async () => {
  // Save to your database
  await fetch('/api/save-order', {
    method: 'POST',
    body: JSON.stringify({ answers }),
  });
  
  // Then checkout
  await redirectToCheckout(answers);
};
```

### Change button text
Edit the JSX in `/pages/questionnaire.js`:
```javascript
<button type="button" onClick={handleNext}>
  Next Question →
</button>
```

---

## Deployment Checklist

- [ ] Replace test Stripe keys with live keys
- [ ] Remove debug panel from questionnaire
- [ ] Add validation to required questions
- [ ] Test full flow from landing → checkout → thank you
- [ ] Set up Stripe webhook for order processing (optional)
- [ ] Configure success/cancel URLs in Stripe
- [ ] Add Google Analytics or tracking (optional)

---

## Support

Check README.md for detailed documentation on every feature.

**Quick links:**
- How to add questions: See "Adding Your Own Questions" above
- Stripe setup: See "Setting Up Stripe" above
- Styling: Add Tailwind classes to any component
- Question patterns: See README.md → "Question Component Patterns"

Happy building! 🚀

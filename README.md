# Custom Nail Questionnaire App

A multi-step questionnaire application for collecting custom press-on nail orders, built with Next.js, Tailwind CSS, and Stripe integration.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Stripe (Optional for initial development)

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

Get your Stripe publishable key from: https://dashboard.stripe.com/apikeys

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
nail-questionnaire/
├── components/
│   └── questionnaire/          # Individual question components
│       ├── QuestionShape.js    # Example: Nail shape selection
│       ├── QuestionSize.js     # Example: Size selection
│       └── QuestionDesign.js   # Example: Design description
├── hooks/
│   └── useQuestionnaire.js     # State management hook
├── lib/
│   └── stripe.js              # Stripe integration
├── pages/
│   ├── _app.js                # App wrapper
│   ├── index.js               # Landing page
│   ├── questionnaire.js       # Multi-step questionnaire
│   └── thank-you.js           # Confirmation page
├── styles/
│   └── globals.css            # Global styles (Tailwind)
└── package.json
```

---

## ✨ How to Add New Questions

Adding a new question is simple and follows a clear pattern:

### Step 1: Create a Question Component

Create a new file in `/components/questionnaire/` (e.g., `QuestionColor.js`):

```javascript
/**
 * Question Component: Your Question Title
 * 
 * Props:
 * - value: Current answer value
 * - onChange: Function to call when answer changes
 */
export default function QuestionColor({ value, onChange }) {
  return (
    <div>
      <h2>What is your favorite color?</h2>
      <p>Choose the primary color for your nails</p>
      
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a color"
      />
    </div>
  );
}
```

### Step 2: Import the Component

In `/pages/questionnaire.js`, add the import:

```javascript
import QuestionColor from '../components/questionnaire/QuestionColor';
```

### Step 3: Add to Questions Array

In the `questions` array in `/pages/questionnaire.js`:

```javascript
const questions = [
  {
    id: 'shape',
    component: QuestionShape,
  },
  {
    id: 'size',
    component: QuestionSize,
  },
  {
    id: 'design',
    component: QuestionDesign,
  },
  {
    id: 'color',           // ← Add your new question
    component: QuestionColor,
  },
];
```

That's it! The questionnaire will automatically:
- Add the new step to the flow
- Track the answer in state
- Update the progress indicator
- Include it in the final submission

---

## 🎨 Question Component Patterns

### Radio Button Selection

```javascript
export default function QuestionShape({ value, onChange }) {
  const options = ['option1', 'option2', 'option3'];
  
  return (
    <div>
      <h2>Your Question?</h2>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name="question"
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
```

### Text Input

```javascript
export default function QuestionName({ value, onChange }) {
  return (
    <div>
      <h2>What's your name?</h2>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
```

### Textarea

```javascript
export default function QuestionNotes({ value, onChange }) {
  return (
    <div>
      <h2>Additional notes?</h2>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
      />
    </div>
  );
}
```

### Checkbox (Multiple Selection)

```javascript
export default function QuestionAddons({ value = [], onChange }) {
  const handleToggle = (addon) => {
    const newValue = value.includes(addon)
      ? value.filter(item => item !== addon)
      : [...value, addon];
    onChange(newValue);
  };

  return (
    <div>
      <h2>Select add-ons:</h2>
      {['Rhinestones', 'Glitter', 'Charms'].map((addon) => (
        <label key={addon}>
          <input
            type="checkbox"
            checked={value.includes(addon)}
            onChange={() => handleToggle(addon)}
          />
          {addon}
        </label>
      ))}
    </div>
  );
}
```

### Conditional/Complex Question

See `QuestionSize.js` for an example of a question with conditional inputs (standard vs custom sizing).

---

## 💳 Stripe Integration

The app supports multiple Stripe integration methods. Choose what works best for you:

### Option 1: Payment Links (Easiest)

1. Create a Payment Link in your Stripe Dashboard
2. In `/lib/stripe.js`, modify `redirectToCheckout` to redirect to your payment link:

```javascript
export const redirectToCheckout = async (answers) => {
  // Optionally save answers to your database first
  
  // Redirect to Stripe Payment Link
  window.location.href = 'https://buy.stripe.com/your-payment-link';
};
```

### Option 2: Stripe Checkout with Price ID

1. Create a product and price in Stripe Dashboard
2. Copy the price ID (starts with `price_`)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
4. In `/lib/stripe.js`, uncomment and configure the direct checkout code
5. Replace `YOUR_PRICE_ID` with your actual price ID

### Option 3: Custom Backend API (Most Flexible)

1. Create `/pages/api/checkout.js`:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { answers } = req.body;
      
      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'price_YOUR_PRICE_ID',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/thank-you`,
        cancel_url: `${req.headers.origin}/questionnaire`,
        metadata: {
          answers: JSON.stringify(answers),
        },
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
```

2. Add secret key to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   ```

3. In `/lib/stripe.js`, uncomment the custom backend API code

---

## 🎯 Current Questions

The app currently includes 3 example questions:

1. **Nail Shape** (`QuestionShape.js`)
   - Radio selection: square, almond, stiletto, coffin, oval, round

2. **Nail Size** (`QuestionSize.js`)
   - Choice between standard sizes (S, M, L, XL) or custom measurements
   - Conditional textarea for custom measurements

3. **Design Description** (`QuestionDesign.js`)
   - Textarea for detailed design description

---

## 🎨 Styling

This app intentionally has **minimal styling** to make it easy for you to add your own design:

- Only Tailwind CSS utility classes for basic layout
- No custom CSS beyond Tailwind
- Clean HTML structure
- Easy to add your own classes or CSS framework

### To Add Styling:

1. Add Tailwind classes directly to components
2. Or add custom CSS to `/styles/globals.css`
3. Or use a UI library like shadcn/ui, Material-UI, etc.

Example:
```javascript
// Before (no styling)
<button type="button" onClick={handleNext}>
  Next
</button>

// After (with Tailwind classes)
<button 
  type="button" 
  onClick={handleNext}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Next
</button>
```

---

## 📊 Accessing Answer Data

All questionnaire answers are stored in the `answers` object with the following structure:

```javascript
{
  "shape": "almond",
  "size": {
    "sizeType": "standard",
    "size": "m"
  },
  "design": "Pink base with white flowers..."
}
```

### Where to Access:

1. **In questionnaire.js**: Available via the `answers` state variable
2. **Before checkout**: In the `handleSubmit` function
3. **In Stripe**: Passed to `redirectToCheckout(answers)`

### Saving to Database:

Add your database logic in `/pages/questionnaire.js` in the `handleSubmit` function:

```javascript
const handleSubmit = async () => {
  setIsSubmitting(true);
  
  try {
    // Save to database
    const response = await fetch('/api/save-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    
    // Then redirect to Stripe
    await redirectToCheckout(answers);
  } catch (error) {
    console.error('Error:', error);
    setIsSubmitting(false);
  }
};
```

---

## 🔧 Customization

### Change Number of Steps

The number of steps automatically adjusts based on the questions array. Just add or remove questions as described above.

### Change Success URL

Edit the success URL in `/lib/stripe.js` (default is `/thank-you`)

### Add Email Collection

Create a new question component for email:

```javascript
// components/questionnaire/QuestionEmail.js
export default function QuestionEmail({ value, onChange }) {
  return (
    <div>
      <h2>What's your email?</h2>
      <input
        type="email"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="you@example.com"
      />
    </div>
  );
}
```

Add it to the questions array in `/pages/questionnaire.js`

---

## 🚨 Important Notes

### Security

- Never commit `.env.local` to version control
- Add `.env.local` to `.gitignore` (already included)
- Use test keys (`pk_test_` / `sk_test_`) during development
- Only use live keys (`pk_live_` / `sk_live_`) in production

### Validation

Currently, there's no validation on questions. To add validation:

```javascript
const handleNext = () => {
  const currentAnswer = answers[currentQuestion.id];
  
  if (!currentAnswer) {
    alert('Please answer the question before continuing');
    return;
  }
  
  nextStep();
};
```

### Progress Persistence

Answers are currently stored in React state and lost on page refresh. To persist:

1. Use `localStorage`:
   ```javascript
   // In useQuestionnaire.js
   const [answers, setAnswers] = useState(() => {
     const saved = localStorage.getItem('questionnaire-answers');
     return saved ? JSON.parse(saved) : {};
   });
   
   useEffect(() => {
     localStorage.setItem('questionnaire-answers', JSON.stringify(answers));
   }, [answers]);
   ```

2. Or save to a database after each question

---

## 📦 Deployment

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

- Netlify
- AWS Amplify  
- DigitalOcean App Platform
- Railway
- Render

Make sure to set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in your platform's environment variables.

---

## 🐛 Troubleshooting

### Stripe not configured error

Make sure you've:
1. Added your Stripe publishable key to `.env.local`
2. Uncommented the Stripe code in `/lib/stripe.js`
3. Configured your price ID or payment link

### Styles not loading

1. Make sure `npm install` completed successfully
2. Restart the dev server (`npm run dev`)
3. Clear browser cache

### Question not appearing

1. Check that you imported the component
2. Verify it's added to the questions array
3. Check browser console for errors

---

## 📝 License

This project is open source and available for any use.

## 🤝 Support

For questions or issues, create an issue in the repository or contact support.

---

## 🎉 You're All Set!

Start customizing your questionnaire by adding new questions. The architecture is designed to be simple and extensible.

**Happy coding!** 💅

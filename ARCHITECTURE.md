# Architecture Overview

## Application Flow

```
┌─────────────────┐
│  Landing Page   │  (pages/index.js)
│   "Start Order" │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│        Questionnaire Flow                   │
│  (pages/questionnaire.js)                   │
│                                             │
│  ┌──────────────────────────────────┐      │
│  │  Step 1: Shape                   │      │
│  │  (QuestionShape.js)              │      │
│  └────────────┬─────────────────────┘      │
│               ▼                             │
│  ┌──────────────────────────────────┐      │
│  │  Step 2: Size                    │      │
│  │  (QuestionSize.js)               │      │
│  └────────────┬─────────────────────┘      │
│               ▼                             │
│  ┌──────────────────────────────────┐      │
│  │  Step 3: Design                  │      │
│  │  (QuestionDesign.js)             │      │
│  └────────────┬─────────────────────┘      │
│               │                             │
│               ▼                             │
│  ┌──────────────────────────────────┐      │
│  │  "Complete Order" button         │      │
│  └────────────┬─────────────────────┘      │
└───────────────┼─────────────────────────────┘
                │
                ▼
┌───────────────────────────────┐
│   Stripe Checkout             │  (lib/stripe.js)
│   - Collect payment           │
│   - Pass order metadata       │
└────────────┬──────────────────┘
             │
             ▼
┌─────────────────────────────┐
│   Thank You Page            │  (pages/thank-you.js)
│   "Order confirmed!"        │
└─────────────────────────────┘
```

---

## Component Architecture

### State Management Pattern

```
┌─────────────────────────────────────────┐
│  pages/questionnaire.js                 │
│                                         │
│  ┌───────────────────────────────┐     │
│  │ useQuestionnaire Hook         │     │
│  │ (hooks/useQuestionnaire.js)   │     │
│  │                               │     │
│  │ State:                        │     │
│  │  - currentStep                │     │
│  │  - answers {}                 │     │
│  │                               │     │
│  │ Methods:                      │     │
│  │  - nextStep()                 │     │
│  │  - prevStep()                 │     │
│  │  - saveAnswer(id, value)      │     │
│  └───────────────────────────────┘     │
│                                         │
│  Questions Array:                       │
│  ┌───────────────────────────────┐     │
│  │ [                             │     │
│  │   {                           │     │
│  │     id: 'shape',              │     │
│  │     component: QuestionShape  │     │
│  │   },                          │     │
│  │   ...                         │     │
│  │ ]                             │     │
│  └───────────────────────────────┘     │
│            │                            │
│            ▼                            │
│  Render current question                │
│  with value & onChange props            │
└─────────────────────────────────────────┘
```

### Question Component Contract

Every question component follows this interface:

```javascript
function QuestionComponent({ value, onChange }) {
  // value: current answer for this question
  // onChange: function to update the answer
  
  return (
    <div>
      <h2>Question title</h2>
      <input 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
}
```

**Key principles:**
- Each question is a pure component
- Questions don't manage their own state (controlled components)
- Parent (questionnaire.js) manages all state
- Easy to add/remove/reorder questions

---

## Data Flow

```
User interacts with question
         │
         ▼
Question component calls onChange(newValue)
         │
         ▼
questionnaire.js receives update
         │
         ▼
Calls saveAnswer(questionId, newValue)
         │
         ▼
useQuestionnaire hook updates answers object
         │
         ▼
{
  shape: "almond",
  size: { sizeType: "standard", size: "m" },
  design: "Pink with flowers..."
}
         │
         ▼
User clicks "Complete Order"
         │
         ▼
handleSubmit() → redirectToCheckout(answers)
         │
         ▼
Stripe receives metadata with order details
```

---

## File Responsibilities

### Pages Layer
- `pages/index.js`: Entry point, marketing content
- `pages/questionnaire.js`: Orchestrates the multi-step flow
- `pages/thank-you.js`: Post-purchase confirmation
- `pages/_app.js`: Global app wrapper (Tailwind CSS import)

### Components Layer
- `components/questionnaire/*`: Individual question components
  - Self-contained
  - Receive `value` and `onChange` props
  - No external state management
  - Easy to test in isolation

### Hooks Layer
- `hooks/useQuestionnaire.js`: Centralized state management
  - Current step tracking
  - Answer storage
  - Navigation logic
  - Reusable across different questionnaire implementations

### Library Layer
- `lib/stripe.js`: Payment integration
  - Stripe.js initialization
  - Checkout redirect logic
  - Configurable for different Stripe methods

---

## Extension Points

### Adding a New Question

**What happens automatically:**
1. Progress bar updates (step count)
2. Navigation buttons adjust
3. Answer is tracked in state
4. Included in final submission

**What you need to do:**
1. Create component
2. Import it
3. Add to questions array

**That's it!** The architecture handles everything else.

### Adding Validation

**Where to add:**
```javascript
// In pages/questionnaire.js

const handleNext = () => {
  const answer = answers[currentQuestion.id];
  
  // Add your validation logic here
  if (!answer) {
    alert('Please answer the question');
    return;
  }
  
  nextStep();
};
```

### Adding Persistence

**Where to add:**
```javascript
// In hooks/useQuestionnaire.js

useEffect(() => {
  localStorage.setItem('answers', JSON.stringify(answers));
}, [answers]);

const [answers, setAnswers] = useState(() => {
  const saved = localStorage.getItem('answers');
  return saved ? JSON.parse(saved) : {};
});
```

### Adding Database Integration

**Where to add:**
```javascript
// In pages/questionnaire.js

const handleSubmit = async () => {
  // Save to database before Stripe
  const response = await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify({ answers }),
  });
  
  const { orderId } = await response.json();
  
  // Pass order ID to Stripe
  await redirectToCheckout({ answers, orderId });
};
```

---

## Design Decisions

### Why Pages Router?
- Simpler for beginners than App Router
- Clearer file structure
- Easier API routes
- Can migrate to App Router later if needed

### Why Separate Question Components?
- **Separation of concerns**: Each question is independent
- **Reusability**: Questions can be reused in other forms
- **Testability**: Easy to test each question in isolation
- **Maintainability**: Changes to one question don't affect others
- **Scalability**: Can easily add 10, 20, or 50 questions

### Why Custom Hook?
- **Single responsibility**: Hook only manages state, not UI
- **Reusability**: Same hook could power different questionnaire UIs
- **Testability**: Can test state logic separately from components
- **Simplicity**: Alternative (Redux, Zustand) would be overkill

### Why No Form Library?
- Minimal dependencies
- Simple use case doesn't justify React Hook Form or Formik
- Easier to understand for beginners
- Easy to add a form library later if needed

### Why Minimal Styling?
- Developer can apply their own design system
- No opinionated UI framework
- Keeps bundle size small
- Tailwind available for utility classes when needed

---

## Scaling Considerations

### When you have many questions (10+):

**Option 1: Group questions into sections**
```javascript
const sections = [
  {
    name: 'Basics',
    questions: [QuestionShape, QuestionSize]
  },
  {
    name: 'Design',
    questions: [QuestionColor, QuestionPattern]
  }
];
```

**Option 2: Dynamic question loading**
```javascript
const questions = [
  {
    id: 'shape',
    component: lazy(() => import('./QuestionShape'))
  }
];
```

**Option 3: Conditional questions**
```javascript
const questions = [
  { id: 'hasDesign', component: QuestionHasDesign },
  // Only show if user wants a design
  ...(answers.hasDesign === 'yes' ? [
    { id: 'design', component: QuestionDesign }
  ] : [])
];
```

---

## Performance Notes

- Components are lightweight (no heavy libraries)
- State updates are localized to the questionnaire
- Stripe.js loads asynchronously
- No unnecessary re-renders (controlled components)
- Can add React.memo() to question components if needed

---

## Security Notes

- Stripe keys are environment variables (not hardcoded)
- Publishable key is safe for client-side
- Secret key should ONLY be used server-side (API routes)
- User data is only stored client-side until submission
- Add server-side validation for production
- Sanitize user input before storing in database

---

## Testing Strategy

### Unit Tests
- Test individual question components
- Test useQuestionnaire hook logic

### Integration Tests
- Test full questionnaire flow
- Test state updates across steps
- Test navigation (next/prev)

### E2E Tests
- Test complete user journey
- Test Stripe checkout redirect
- Test thank you page

Example test for a question:
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionShape from './QuestionShape';

test('calls onChange when option selected', () => {
  const onChange = jest.fn();
  render(<QuestionShape value="" onChange={onChange} />);
  
  fireEvent.click(screen.getByLabelText('Almond'));
  expect(onChange).toHaveBeenCalledWith('almond');
});
```

---

## Future Enhancements

Possible additions without major refactoring:

1. **Progress persistence**: localStorage or database
2. **Email collection**: Add QuestionEmail component
3. **Image uploads**: Add file input question type
4. **Conditional logic**: Show questions based on previous answers
5. **Multi-language**: Add i18n without changing architecture
6. **Analytics**: Track step completions, drop-off rates
7. **A/B testing**: Test different question orders
8. **Admin panel**: Manage questions without code changes
9. **Order dashboard**: View submitted questionnaires
10. **Email notifications**: Send order confirmation emails

All of these can be added incrementally without restructuring the core architecture.

---

This architecture prioritizes:
- **Simplicity**: Easy to understand
- **Extensibility**: Easy to add features
- **Maintainability**: Easy to modify
- **Developer experience**: Clear patterns, good docs

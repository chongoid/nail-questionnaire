# Directory Structure

Complete file structure of the nail questionnaire app:

```
nail-questionnaire/
│
├── 📄 package.json                      # Dependencies and scripts
├── 📄 next.config.js                    # Next.js configuration
├── 📄 tailwind.config.js                # Tailwind CSS configuration
├── 📄 postcss.config.js                 # PostCSS configuration
├── 📄 .gitignore                        # Git ignore rules
├── 📄 .env.local.example                # Example environment variables
│
├── 📘 README.md                         # Complete documentation (start here!)
├── 📘 INSTRUCTIONS.md                   # Quick start guide
├── 📘 ARCHITECTURE.md                   # Technical architecture details
├── 📘 DIRECTORY_STRUCTURE.md            # This file
│
├── 📁 styles/
│   └── globals.css                      # Global styles + Tailwind imports
│
├── 📁 pages/
│   ├── _app.js                          # Next.js app wrapper
│   ├── index.js                         # 🏠 Landing page
│   ├── questionnaire.js                 # 📝 Main questionnaire (add questions here!)
│   ├── thank-you.js                     # ✅ Confirmation page
│   │
│   └── 📁 api/
│       └── checkout.js.example          # Optional Stripe backend API example
│
├── 📁 components/
│   └── 📁 questionnaire/
│       ├── QuestionShape.js             # Example question: nail shape
│       ├── QuestionSize.js              # Example question: nail size
│       └── QuestionDesign.js            # Example question: design description
│                                        # 👉 Add new questions here!
│
├── 📁 hooks/
│   └── useQuestionnaire.js              # State management hook
│
└── 📁 lib/
    └── stripe.js                        # 💳 Stripe integration (configure here!)
```

---

## File Descriptions

### Configuration Files

| File | Purpose | Edit? |
|------|---------|-------|
| `package.json` | NPM dependencies and scripts | Only to add new packages |
| `next.config.js` | Next.js settings | Rarely |
| `tailwind.config.js` | Tailwind CSS configuration | To customize theme |
| `postcss.config.js` | CSS processing | Rarely |
| `.gitignore` | Files to exclude from Git | To add new patterns |
| `.env.local.example` | Example environment variables | To show required vars |

### Documentation Files

| File | Purpose | Read? |
|------|---------|-------|
| `README.md` | Complete documentation | ⭐ Start here! |
| `INSTRUCTIONS.md` | Quick start guide | ⭐ For setup |
| `ARCHITECTURE.md` | Technical details | For understanding design |
| `DIRECTORY_STRUCTURE.md` | This file | For navigation |

### Pages (User-facing routes)

| File | URL | Purpose | Edit? |
|------|-----|---------|-------|
| `pages/_app.js` | - | Global app wrapper | Rarely |
| `pages/index.js` | `/` | Landing page | Yes, customize content |
| `pages/questionnaire.js` | `/questionnaire` | Main questionnaire | ⭐ Add questions here! |
| `pages/thank-you.js` | `/thank-you` | Post-checkout confirmation | Yes, customize message |
| `pages/api/checkout.js.example` | `/api/checkout` | Optional Stripe backend | Rename & configure if needed |

### Components (Reusable UI)

| File | Purpose | Edit? |
|------|---------|-------|
| `components/questionnaire/QuestionShape.js` | Example: Radio button question | Use as template |
| `components/questionnaire/QuestionSize.js` | Example: Conditional question | Use as template |
| `components/questionnaire/QuestionDesign.js` | Example: Textarea question | Use as template |

**To add a new question:** Create a new file here, then add to questions array in `pages/questionnaire.js`

### Hooks (Shared logic)

| File | Purpose | Edit? |
|------|---------|-------|
| `hooks/useQuestionnaire.js` | Manages questionnaire state | Only for advanced features |

### Library (Utilities)

| File | Purpose | Edit? |
|------|---------|-------|
| `lib/stripe.js` | Stripe checkout integration | ⭐ Configure Stripe here! |

### Styles

| File | Purpose | Edit? |
|------|---------|-------|
| `styles/globals.css` | Global styles + Tailwind | To add custom CSS |

---

## Where to Make Common Changes

### Add a new question
1. Create `components/questionnaire/QuestionYourName.js`
2. Edit `pages/questionnaire.js` → Add to questions array

### Change page content
- Landing page: `pages/index.js`
- Thank you message: `pages/thank-you.js`
- Question text: Individual question components

### Configure Stripe
- Main config: `lib/stripe.js`
- Environment variables: Create `.env.local` (use `.env.local.example` as template)
- Backend API: Rename `pages/api/checkout.js.example` → `checkout.js`

### Add custom styling
- Global styles: `styles/globals.css`
- Component styles: Add `className` attributes with Tailwind classes
- Theme config: `tailwind.config.js`

### Change questionnaire behavior
- State management: `hooks/useQuestionnaire.js`
- Navigation logic: `pages/questionnaire.js`
- Validation: Add to `pages/questionnaire.js` → `handleNext()` function

---

## Development Workflow

### First time setup
```bash
npm install              # Install dependencies
```

### Daily development
```bash
npm run dev              # Start dev server (http://localhost:3000)
```

### Adding features
1. Create new components in `/components/questionnaire/`
2. Import and add to questions array in `/pages/questionnaire.js`
3. Test in browser
4. Repeat

### Before deployment
```bash
npm run build            # Build production version
npm start                # Test production build
```

---

## File Size Reference

Total lines of code (excluding docs):
- **Configuration:** ~50 lines
- **Pages:** ~200 lines
- **Components:** ~150 lines
- **Hooks:** ~75 lines
- **Library:** ~140 lines
- **Styles:** ~3 lines

**Total:** ~618 lines of code (very lightweight!)

**Documentation:** ~600 lines (comprehensive!)

---

## Not Included (You'll Need to Add)

These are intentionally not included to keep the app minimal:

- ❌ Form validation library (add if needed)
- ❌ UI component library (add if desired)
- ❌ Database integration (add based on your stack)
- ❌ Authentication (add if required)
- ❌ Email service (add for notifications)
- ❌ Analytics (add if tracking needed)
- ❌ Image uploads (add if collecting design images)
- ❌ Admin panel (add for order management)

All of these can be added without refactoring the core structure.

---

## Quick Navigation

**I want to...**

| Task | Go to... |
|------|----------|
| Get started | README.md |
| Add a question | INSTRUCTIONS.md → "Adding Your Own Questions" |
| Configure Stripe | lib/stripe.js + INSTRUCTIONS.md → "Setting Up Stripe" |
| Understand the architecture | ARCHITECTURE.md |
| Change the landing page | pages/index.js |
| Add validation | pages/questionnaire.js → handleNext() |
| Customize styling | Add Tailwind classes to any component |
| See example questions | components/questionnaire/*.js |
| Deploy the app | README.md → "Deployment" |

---

**Happy coding! 🚀**

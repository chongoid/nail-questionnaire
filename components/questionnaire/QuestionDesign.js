/**
 * Question Component: Design Description
 * 
 * This component asks the user to describe their desired nail design.
 * It demonstrates how to create a text-based question.
 * 
 * Props:
 * - value: Current text value
 * - onChange: Function to call when the value changes
 */
export default function QuestionDesign({ value, onChange }) {
  return (
    <div>
      <h2>Describe your desired design</h2>
      <p>Tell us about your dream nails! Include colors, patterns, themes, or anything else you'd like.</p>
      
      <div>
        <label>
          Design details:
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Example: Pink base with white flowers, gold accents on ring finger, matte finish..."
            rows={6}
          />
        </label>
      </div>
    </div>
  );
}

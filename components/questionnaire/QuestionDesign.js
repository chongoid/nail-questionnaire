/**
 * Question Component: Design Description
 * 
 * Props:
 * - value: Current text value
 * - onChange: Function to call when the value changes
 */

// Label for the review screen
QuestionDesign.label = 'Design Description';

// Review component for displaying the answer
QuestionDesign.Review = function QuestionDesignReview({ value }) {
  if (!value) return <span>No description provided</span>;
  return <span>{value}</span>;
};

export default function QuestionDesign({ value, onChange }) {
  return (
    <div>
      <h2>Describe your desired design</h2>
      <p>Tell us about your dream nails! Include colors, patterns, themes, or anything else you'd like.</p>
      
      <div>
        <label>
          <span>Design details:</span>
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Example: Pink base with white flowers, gold accents on ring finger, matte finish..."
            rows={6}
          />
          <span>{value?.length || 0} characters</span>
        </label>
      </div>
    </div>
  );
}

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

// Label for the review screen
QuestionDesign.label = 'Design Description';

// Review component for displaying the answer
QuestionDesign.Review = function QuestionDesignReview({ value }) {
  if (!value) return <span className="text-gray-400">No description provided</span>;
  return <span className="whitespace-pre-wrap">{value}</span>;
};

export default function QuestionDesign({ value, onChange }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Describe your desired design</h2>
      <p className="text-gray-600 mb-6">
        Tell us about your dream nails! Include colors, patterns, themes, or anything else you'd like.
      </p>
      
      <div>
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-2">Design details:</span>
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Example: Pink base with white flowers, gold accents on ring finger, matte finish..."
            rows={6}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none"
          />
          <span className="block mt-2 text-sm text-gray-500">
            {value?.length || 0} characters
          </span>
        </label>
      </div>
    </div>
  );
}

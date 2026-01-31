/**
 * Question Component: Nail Shape Selection
 * 
 * This component asks the user to select their preferred nail shape.
 * It demonstrates how to create a multiple-choice question.
 * 
 * Props:
 * - value: Current selected value
 * - onChange: Function to call when the value changes
 */

// Label for the review screen
QuestionShape.label = 'Nail Shape';

// Review component for displaying the answer
QuestionShape.Review = function QuestionShapeReview({ value }) {
  if (!value) return <span className="text-gray-400">Not selected</span>;
  return <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>;
};

export default function QuestionShape({ value, onChange }) {
  const shapes = ['square', 'almond', 'stiletto', 'coffin', 'oval', 'round'];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">What shape do you want?</h2>
      <p className="text-gray-600 mb-6">Select your preferred nail shape</p>
      
      <div className="grid grid-cols-2 gap-4">
        {shapes.map((shape) => (
          <label 
            key={shape}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              value === shape 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="shape"
              value={shape}
              checked={value === shape}
              onChange={(e) => onChange(e.target.value)}
              className="mr-3 w-5 h-5 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-lg font-medium text-gray-800">
              {shape.charAt(0).toUpperCase() + shape.slice(1)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

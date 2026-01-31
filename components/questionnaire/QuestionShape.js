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
export default function QuestionShape({ value, onChange }) {
  const shapes = ['square', 'almond', 'stiletto', 'coffin', 'oval', 'round'];

  return (
    <div>
      <h2>What shape do you want?</h2>
      <p>Select your preferred nail shape</p>
      
      <div>
        {shapes.map((shape) => (
          <label key={shape}>
            <input
              type="radio"
              name="shape"
              value={shape}
              checked={value === shape}
              onChange={(e) => onChange(e.target.value)}
            />
            {shape.charAt(0).toUpperCase() + shape.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}

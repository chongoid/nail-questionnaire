import React from 'react';

interface QuestionShapeProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

// Label for the review screen
QuestionShape.label = 'Nail Shape';

// Review component for displaying the answer
QuestionShape.Review = function QuestionShapeReview({ value }: { value?: string }) {
  if (!value) return <span>Not selected</span>;
  return <span>{value}</span>;
};

export default function QuestionShape({ value, onChange }: QuestionShapeProps) {
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
            {shape}
          </label>
        ))}
      </div>
    </div>
  );
}

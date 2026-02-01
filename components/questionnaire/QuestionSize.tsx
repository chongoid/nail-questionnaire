import React from 'react';

interface SizeAnswer {
  sizeType?: 'standard' | 'custom';
  size?: string;
  customMeasurements?: string;
}

interface QuestionSizeProps {
  value: SizeAnswer | undefined;
  onChange: (value: SizeAnswer) => void;
}

// Label for the review screen
QuestionSize.label = 'Nail Size';

// Review component for displaying the answer
QuestionSize.Review = function QuestionSizeReview({ value }: { value?: SizeAnswer }) {
  if (!value || (!value.size && !value.customMeasurements)) {
    return <span>Not selected</span>;
  }
  
  if (value.sizeType === 'custom') {
    return <span>{value.customMeasurements || 'No measurements provided'}</span>;
  }
  
  return <span>Size {value.size?.toUpperCase()}</span>;
};

export default function QuestionSize({ value = {}, onChange }: QuestionSizeProps) {
  const sizeType = value.sizeType || 'standard';
  const sizes = ['s', 'm', 'l', 'xl'];

  const handleSizeTypeChange = (type: 'standard' | 'custom') => {
    if (type === 'standard') {
      onChange({ sizeType: type, size: value.size || '' });
    } else {
      onChange({ sizeType: type, customMeasurements: value.customMeasurements || '' });
    }
  };

  const handleStandardSizeChange = (size: string) => {
    onChange({ sizeType: 'standard', size });
  };

  const handleCustomMeasurementsChange = (measurements: string) => {
    onChange({ sizeType: 'custom', customMeasurements: measurements });
  };

  return (
    <div>
      <h2>What size are your nails?</h2>
      <p>Choose standard sizing or provide custom measurements</p>
      
      <div>
        <label>
          <input
            type="radio"
            name="sizeType"
            value="standard"
            checked={sizeType === 'standard'}
            onChange={() => handleSizeTypeChange('standard')}
          />
          Standard Sizes
        </label>
        <label>
          <input
            type="radio"
            name="sizeType"
            value="custom"
            checked={sizeType === 'custom'}
            onChange={() => handleSizeTypeChange('custom')}
          />
          Custom Measurements
        </label>
      </div>

      {sizeType === 'standard' && (
        <div>
          {sizes.map((size) => (
            <label key={size}>
              <input
                type="radio"
                name="size"
                value={size}
                checked={value.size === size}
                onChange={(e) => handleStandardSizeChange(e.target.value)}
              />
              {size.toUpperCase()}
            </label>
          ))}
        </div>
      )}

      {sizeType === 'custom' && (
        <div>
          <label>
            <span>Enter your measurements (e.g., &quot;Thumb: 15mm, Index: 12mm, ...&quot;):</span>
            <textarea
              value={value.customMeasurements || ''}
              onChange={(e) => handleCustomMeasurementsChange(e.target.value)}
              placeholder="Enter your nail measurements for each finger"
              rows={4}
            />
          </label>
        </div>
      )}
    </div>
  );
}

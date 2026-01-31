/**
 * Question Component: Nail Size Selection
 * 
 * This component asks the user to select their nail size.
 * It demonstrates how to create a question with conditional inputs.
 * 
 * Props:
 * - value: Current selected value (object with sizeType and customMeasurements)
 * - onChange: Function to call when the value changes
 */
export default function QuestionSize({ value = {}, onChange }) {
  // Derive sizeType from value prop instead of maintaining local state
  const sizeType = value.sizeType || 'standard';
  const sizes = ['s', 'm', 'l', 'xl'];

  const handleSizeTypeChange = (type) => {
    if (type === 'standard') {
      onChange({ sizeType: type, size: value.size || '' });
    } else {
      onChange({ sizeType: type, customMeasurements: value.customMeasurements || '' });
    }
  };

  const handleStandardSizeChange = (size) => {
    onChange({ sizeType: 'standard', size });
  };

  const handleCustomMeasurementsChange = (measurements) => {
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
            Enter your measurements (e.g., "Thumb: 15mm, Index: 12mm, ..."):
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

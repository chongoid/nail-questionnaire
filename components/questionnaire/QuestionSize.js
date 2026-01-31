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

// Label for the review screen
QuestionSize.label = 'Nail Size';

// Review component for displaying the answer
QuestionSize.Review = function QuestionSizeReview({ value }) {
  if (!value || (!value.size && !value.customMeasurements)) {
    return <span className="text-gray-400">Not selected</span>;
  }
  
  if (value.sizeType === 'custom') {
    return <span>{value.customMeasurements || 'No measurements provided'}</span>;
  }
  
  return <span>Size {value.size?.toUpperCase()}</span>;
};

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
      <h2 className="text-3xl font-bold text-gray-900 mb-2">What size are your nails?</h2>
      <p className="text-gray-600 mb-6">Choose standard sizing or provide custom measurements</p>
      
      <div className="flex gap-4 mb-6">
        <label className={`flex-1 flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
          sizeType === 'standard' 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
        }`}>
          <input
            type="radio"
            name="sizeType"
            value="standard"
            checked={sizeType === 'standard'}
            onChange={() => handleSizeTypeChange('standard')}
            className="mr-3 w-5 h-5 text-purple-600 focus:ring-purple-500"
          />
          <span className="font-medium text-gray-800">Standard Sizes</span>
        </label>
        <label className={`flex-1 flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
          sizeType === 'custom' 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
        }`}>
          <input
            type="radio"
            name="sizeType"
            value="custom"
            checked={sizeType === 'custom'}
            onChange={() => handleSizeTypeChange('custom')}
            className="mr-3 w-5 h-5 text-purple-600 focus:ring-purple-500"
          />
          <span className="font-medium text-gray-800">Custom Measurements</span>
        </label>
      </div>

      {sizeType === 'standard' && (
        <div className="grid grid-cols-4 gap-4">
          {sizes.map((size) => (
            <label 
              key={size}
              className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                value.size === size 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="size"
                value={size}
                checked={value.size === size}
                onChange={(e) => handleStandardSizeChange(e.target.value)}
                className="sr-only"
              />
              <span className="text-2xl font-bold text-gray-800">{size.toUpperCase()}</span>
            </label>
          ))}
        </div>
      )}

      {sizeType === 'custom' && (
        <div>
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Enter your measurements (e.g., "Thumb: 15mm, Index: 12mm, ..."):
            </span>
            <textarea
              value={value.customMeasurements || ''}
              onChange={(e) => handleCustomMeasurementsChange(e.target.value)}
              placeholder="Enter your nail measurements for each finger"
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none"
            />
          </label>
        </div>
      )}
    </div>
  );
}

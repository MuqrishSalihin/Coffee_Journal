import { useState, useEffect } from 'react';

function BrewMethodForm({ coffeeId, onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    coffeeId: coffeeId,
    brewDate: new Date().toISOString().split('T')[0], // Today's date
    brewMethod: '',
    coffeeWeight: '',
    waterWeight: '',
    grindSize: '',
    rating: '',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSubmit = {
      ...formData,
      coffeeWeight: formData.coffeeWeight ? parseFloat(formData.coffeeWeight) : null,
      waterWeight: formData.waterWeight ? parseFloat(formData.waterWeight) : null,
      rating: formData.rating ? parseInt(formData.rating) : null
    };
    
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 p-6 rounded-lg mb-6 border-2 border-blue-500">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        {initialData ? '✏️ Edit Brew Session' : '➕ Log New Brew'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Brew Date *
          </label>
          <input
            type="date"
            name="brewDate"
            value={formData.brewDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Brew Method *
          </label>
          <select
            name="brewMethod"
            value={formData.brewMethod}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="V60">V60</option>
            <option value="AeroPress">AeroPress</option>
            <option value="French Press">French Press</option>
            <option value="Espresso">Espresso</option>
            <option value="Chemex">Chemex</option>
            <option value="Moka Pot">Moka Pot</option>
            <option value="Cold Brew">Cold Brew</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Coffee Weight (g) *
          </label>
          <input
            type="number"
            step="0.1"
            name="coffeeWeight"
            value={formData.coffeeWeight}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Water Weight (ml) *
          </label>
          <input
            type="number"
            step="0.1"
            name="waterWeight"
            value={formData.waterWeight}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Grind Size
          </label>
          <select
            name="grindSize"
            value={formData.grindSize}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="Extra Fine">Extra Fine</option>
            <option value="Fine">Fine</option>
            <option value="Medium-Fine">Medium-Fine</option>
            <option value="Medium">Medium</option>
            <option value="Medium-Coarse">Medium-Coarse</option>
            <option value="Coarse">Coarse</option>
            <option value="Extra Coarse">Extra Coarse</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Rating (1-5)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tasting Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          placeholder="How did it taste? Any adjustments needed?"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors"
        >
          {initialData ? 'Update Brew Session' : 'Log Brew Session'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BrewMethodForm;
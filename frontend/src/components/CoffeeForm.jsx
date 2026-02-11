import { useState, useEffect } from 'react';
import { X } from 'lucide-react'

function CoffeeForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    roaster: '',
    roastLevel: '',
    roastDate: '',
    purchaseDate: '',
    price: '',
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
      price: formData.price ? parseFloat(formData.price) : null,
      rating: formData.rating ? parseInt(formData.rating) : null
    };
    
    onSubmit(dataToSubmit);
  };

  return (
    <>
      {/* Backdrop - dark overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onCancel}
      />
      
      {/* Modal Form - centered and floating */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {initialData ? 'Edit Coffee' : 'Add New Coffee'}
            </h2>
            <button
              onClick={onCancel}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content - Compact */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Coffee Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coffee Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                required
              />
            </div>

            {/* Two columns for compact layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Origin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origin
                </label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                />
              </div>

              {/* Roaster */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roaster
                </label>
                <input
                  type="text"
                  value={formData.roaster}
                  onChange={(e) => setFormData({...formData, roaster: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                />
              </div>
            </div>

            {/* Roast Level & Rating */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roast Level
                </label>
                <select
                  value={formData.roastLevel}
                  onChange={(e) => setFormData({...formData, roastLevel: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                >
                  <option value="">Select...</option>
                  <option>Light</option>
                  <option>Medium-Light</option>
                  <option>Medium</option>
                  <option>Medium-Dark</option>
                  <option>Dark</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                />
              </div>
            </div>

            {/* Dates & Price in one row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roast Date
                </label>
                <input
                  type="date"
                  value={formData.roastDate}
                  onChange={(e) => setFormData({...formData, roastDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                />
              </div>
            </div>

            {/* Notes - full width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tasting Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows="2"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
              />
            </div>

            {/* Action Buttons - Sticky at bottom */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 -mx-6 -mb-6 px-6 py-4 flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {initialData ? 'Update' : 'Add Coffee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CoffeeForm;
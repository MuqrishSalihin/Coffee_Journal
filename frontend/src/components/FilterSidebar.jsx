import React from 'react';
import { X } from 'lucide-react';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onSearchChange, 
  onFilterChange 
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Search & Filter</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Coffee
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              value={filters.searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
            />
          </div>

          {/* Origin Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Origin
            </label>
            <select
              value={filters.origin}
              onChange={(e) => onFilterChange('origin', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
            >
              <option value="">All Origins</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Colombia">Colombia</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Kenya">Kenya</option>
              <option value="Brazil">Brazil</option>
              <option value="Indonesia">Indonesia</option>
            </select>
          </div>

          {/* Roast Level Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Roast Level
            </label>
            <select
              value={filters.roastLevel}
              onChange={(e) => onFilterChange('roastLevel', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
            >
              <option value="">All Roasts</option>
              <option value="Light">Light</option>
              <option value="Medium-Light">Medium-Light</option>
              <option value="Medium">Medium</option>
              <option value="Medium-Dark">Medium-Dark</option>
              <option value="Dark">Dark</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </label>
            <select
              value={filters.minRating}
              onChange={(e) => onFilterChange('minRating', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
            >
              <option value="">Any Rating</option>
              <option value="5">5 stars</option>
              <option value="4">4+ stars</option>
              <option value="3">3+ stars</option>
              <option value="2">2+ stars</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onFilterChange('sortBy', 'name')}
                className={`px-4 py-2 text-sm rounded-lg text-left transition-colors ${
                  filters.sortBy === 'name'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Name
              </button>
              <button
                onClick={() => onFilterChange('sortBy', 'rating')}
                className={`px-4 py-2 text-sm rounded-lg text-left transition-colors ${
                  filters.sortBy === 'rating'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rating
              </button>
              <button
                onClick={() => onFilterChange('sortBy', 'price')}
                className={`px-4 py-2 text-sm rounded-lg text-left transition-colors ${
                  filters.sortBy === 'price'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Price
              </button>
              <button
                onClick={() => onFilterChange('sortBy', 'recent')}
                className={`px-4 py-2 text-sm rounded-lg text-left transition-colors ${
                  filters.sortBy === 'recent'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Recent
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                // Clear all filters
                onSearchChange('');
                onFilterChange('origin', '');
                onFilterChange('roastLevel', '');
                onFilterChange('minRating', '');
                onFilterChange('sortBy', 'name');
              }}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
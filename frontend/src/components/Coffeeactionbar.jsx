import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';

const CoffeeActionBar = ({ onAddCoffee, onToggleFilters, showFilters }) => {
  return (
    <div className="sticky top-20 z-40 mb-6">
      <div className="bg-white rounded-full shadow-md border border-gray-200 px-6 py-3 flex items-center justify-between">
        {/* Left side - Search/Filter toggle */}
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
        >
          {showFilters ? <Filter size={20} className="text-blue-600" /> : <Search size={20} />}
          <span className="text-sm font-medium">
            {showFilters ? 'Hide Filters' : 'Search & Filter'}
          </span>
        </button>

        {/* Right side - Add Coffee button */}
        <button
          onClick={onAddCoffee}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
          <span className="text-sm font-medium">Add Coffee</span>
        </button>
      </div>
    </div>
  );
};

export default CoffeeActionBar;
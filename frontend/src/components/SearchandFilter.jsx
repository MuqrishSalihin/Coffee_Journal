function SearchAndFilter({ onSearchChange, onFilterChange, filters }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">🔍 Search & Filter</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search by name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search Coffee
          </label>
          <input
            type="text"
            placeholder="Search by name..."
            value={filters.searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Filter by origin */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Origin
          </label>
          <select
            value={filters.origin}
            onChange={(e) => onFilterChange('origin', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Origins</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Colombia">Colombia</option>
            <option value="Kenya">Kenya</option>
            <option value="Brazil">Brazil</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Costa Rica">Costa Rica</option>
          </select>
        </div>

        {/* Filter by roast level */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Roast Level
          </label>
          <select
            value={filters.roastLevel}
            onChange={(e) => onFilterChange('roastLevel', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Roasts</option>
            <option value="Light">Light</option>
            <option value="Medium-Light">Medium-Light</option>
            <option value="Medium">Medium</option>
            <option value="Medium-Dark">Medium-Dark</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        {/* Filter by rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Minimum Rating
          </label>
          <select
            value={filters.minRating}
            onChange={(e) => onFilterChange('minRating', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Any Rating</option>
            <option value="5">5 Stars ⭐⭐⭐⭐⭐</option>
            <option value="4">4+ Stars ⭐⭐⭐⭐</option>
            <option value="3">3+ Stars ⭐⭐⭐</option>
            <option value="2">2+ Stars ⭐⭐</option>
            <option value="1">1+ Star ⭐</option>
          </select>
        </div>
      </div>

      {/* Sort options */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Sort By
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onFilterChange('sortBy', 'name')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filters.sortBy === 'name'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Name
          </button>
          <button
            onClick={() => onFilterChange('sortBy', 'rating')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filters.sortBy === 'rating'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Rating
          </button>
          <button
            onClick={() => onFilterChange('sortBy', 'price')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filters.sortBy === 'price'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Price
          </button>
          <button
            onClick={() => onFilterChange('sortBy', 'recent')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filters.sortBy === 'recent'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Recent
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchAndFilter;
function CoffeeCard({ coffee, onEdit, onDelete, onViewDetails }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-3">{coffee.name}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-semibold">Origin:</span> {coffee.origin || 'Unknown'}</p>
            <p><span className="font-semibold">Roaster:</span> {coffee.roaster || 'Unknown'}</p>
            <p><span className="font-semibold">Roast Level:</span> {coffee.roastLevel || 'Unknown'}</p>
            <p><span className="font-semibold">Price:</span> ${coffee.price?.toFixed(2) || 'N/A'}</p>
            <p><span className="font-semibold">Rating:</span> {'⭐'.repeat(coffee.rating || 0)}</p>
            {coffee.notes && (
              <p className="italic text-gray-500 mt-3 pt-3 border-t border-gray-200">
                "{coffee.notes}"
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 ml-4">

        <button
        onClick={() => onViewDetails(coffee)}
        className = "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
            View
        </button>

          <button 
            onClick={() => onEdit(coffee)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(coffee.id)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeCard;
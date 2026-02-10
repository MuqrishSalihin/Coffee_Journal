function BrewMethodCard({ brewMethod, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            {brewMethod.brewMethod || 'Brew Session'}
          </h4>
          <p className="text-sm text-gray-500">{brewMethod.brewDate}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(brewMethod)}
            className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(brewMethod.id)}
            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-semibold text-gray-700">Coffee:</span>
          <span className="ml-2 text-gray-600">{brewMethod.coffeeWeight}g</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Water:</span>
          <span className="ml-2 text-gray-600">{brewMethod.waterWeight}ml</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Grind:</span>
          <span className="ml-2 text-gray-600">{brewMethod.grindSize || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Rating:</span>
          <span className="ml-2">{'⭐'.repeat(brewMethod.rating || 0)}</span>
        </div>
      </div>

      {brewMethod.notes && (
        <p className="mt-3 text-sm text-gray-600 italic border-t border-gray-100 pt-3">
          {brewMethod.notes}
        </p>
      )}
    </div>
  );
}

export default BrewMethodCard;
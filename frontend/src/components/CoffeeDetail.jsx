import { useState, useEffect } from 'react';
import axios from 'axios';
import BrewMethodCard from './BrewMethodCard';
import BrewMethodForm from './BrewMethodForm';

const API_URL = 'https://coffeejournal-production.up.railway.app';

function CoffeeDetail({ coffee, onBack }) {
  const [brewMethods, setBrewMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBrew, setEditingBrew] = useState(null);

  useEffect(() => {
    fetchBrewMethods();
  }, [coffee.id]);

  const fetchBrewMethods = async () => {
    try {
      const response = await axios.get(`${API_URL}/coffees/${coffee.id}/brew-methods`);
      setBrewMethods(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching brew methods:', error);
      setLoading(false);
    }
  };

  const handleCreateBrew = async (brewData) => {
    try {
      await axios.post(`${API_URL}/brew-methods`, brewData);
      fetchBrewMethods();
      setShowForm(false);
      alert('Brew session logged!');
    } catch (error) {
      console.error('Error creating brew:', error);
      alert('Failed to log brew session');
    }
  };

  const handleUpdateBrew = async (brewData) => {
    try {
      await axios.put(`${API_URL}/brew-methods/${editingBrew.id}`, brewData);
      fetchBrewMethods();
      setEditingBrew(null);
      alert('Brew session updated!');
    } catch (error) {
      console.error('Error updating brew:', error);
      alert('Failed to update brew session');
    }
  };

  const handleDeleteBrew = async (id) => {
    if (window.confirm('Delete this brew session?')) {
      try {
        await axios.delete(`${API_URL}/brew-methods/${id}`);
        fetchBrewMethods();
        alert('Brew session deleted!');
      } catch (error) {
        console.error('Error deleting brew:', error);
        alert('Failed to delete brew session');
      }
    }
  };

  const handleEditBrew = (brew) => {
    setEditingBrew(brew);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
        >
          ← Back to All Coffees
        </button>

        {/* Coffee Info Header */}
        <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{coffee.name}</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-semibold">Origin:</span> {coffee.origin || 'Unknown'}
            </div>
            <div>
              <span className="font-semibold">Roaster:</span> {coffee.roaster || 'Unknown'}
            </div>
            <div>
              <span className="font-semibold">Roast Level:</span> {coffee.roastLevel || 'Unknown'}
            </div>
            <div>
              <span className="font-semibold">Rating:</span> {'⭐'.repeat(coffee.rating || 0)}
            </div>
          </div>
          {coffee.notes && (
            <p className="mt-4 text-gray-600 italic border-t pt-4">"{coffee.notes}"</p>
          )}
        </div>

        {/* Add Brew Button */}
        {!showForm && !editingBrew && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition-all hover:scale-105"
          >
            ➕ Log New Brew Session
          </button>
        )}

        {/* Brew Form */}
        {showForm && (
          <BrewMethodForm
            coffeeId={coffee.id}
            onSubmit={handleCreateBrew}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingBrew && (
          <BrewMethodForm
            coffeeId={coffee.id}
            onSubmit={handleUpdateBrew}
            onCancel={() => setEditingBrew(null)}
            initialData={editingBrew}
          />
        )}

        {/* Brew Sessions List */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Brew History ({brewMethods.length})
          </h2>
          
          {loading ? (
            <p>Loading brew sessions...</p>
          ) : brewMethods.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No brew sessions yet. Log your first brew!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brewMethods.map(brew => (
                <BrewMethodCard
                  key={brew.id}
                  brewMethod={brew}
                  onEdit={handleEditBrew}
                  onDelete={handleDeleteBrew}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoffeeDetail;
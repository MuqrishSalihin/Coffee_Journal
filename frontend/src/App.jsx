import { useState, useEffect } from 'react';
import axios from 'axios';
import CoffeeCard from './components/CoffeeCard';
import CoffeeForm from './components/CoffeeForm';
import CoffeeDetail from './components/CoffeeDetail';
import StatsDashboard from './components/StatsDashboard';
import Navbar from './components/Navbar';
import CoffeeActionBar from './components/Coffeeactionbar';
import FilterSidebar from './components/FilterSidebar';


const API_URL = 'https://coffeejournal-production.up.railway.app';

function App() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCoffee, setEditingCoffee] = useState(null);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  

  const [activeView, setActiveView] = useState('coffees'); 

  const [filters, setFilters] = useState({
    searchTerm: '',
    origin: '',
    roastLevel: '', 
    minRating: '',
    sortBy: 'name'
  });

  const fetchCoffees = async () => {
    try {
      const response = await axios.get(`${API_URL}/coffees`);
      setCoffees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching coffees:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  const handleCreate = async (coffeeData) => {
    try {
      await axios.post(`${API_URL}/coffees`, coffeeData);
      fetchCoffees();
      setShowForm(false);
      alert('Coffee added successfully!');
    } catch (error) {
      console.error('Error creating coffee:', error);
      alert('Failed to add coffee');
    }
  };

  const handleAddCoffee = () => {
    setShowForm(true)
    window.scrollTo({top : 0, behavior: 'smooth'})
  };

  const handleUpdate = async (coffeeData) => {
    try {
      await axios.put(`${API_URL}/coffees/${editingCoffee.id}`, coffeeData);
      fetchCoffees();
      setEditingCoffee(null);
      alert('Coffee updated successfully!');
    } catch (error) {
      console.error('Error updating coffee:', error);
      alert('Failed to update coffee');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coffee?')) {
      try {
        await axios.delete(`${API_URL}/coffees/${id}`);
        fetchCoffees();
        alert('Coffee deleted successfully!');
      } catch (error) {
        console.error('Error deleting coffee:', error);
        alert('Failed to delete coffee');
      }
    }
  };

  const handleEdit = (coffee) => {
    setEditingCoffee(coffee);
    setShowForm(false);
  };

  const handleViewDetails = (coffee) => {
    setSelectedCoffee(coffee);
  };

  const handleSearchChange = (searchTerm) => {
    setFilters (prev => ({...prev, searchTerm}));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Apply filters to coffees
  const getFilteredCoffees = () => {
    let filtered = [...coffees];

    // Search by name
    if (filters.searchTerm) {
      filtered = filtered.filter(coffee =>
        coffee.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Filter by origin
    if (filters.origin) {
      filtered = filtered.filter(coffee => coffee.origin === filters.origin);
    }

    // Filter by roast level
    if (filters.roastLevel) {
      filtered = filtered.filter(coffee => coffee.roastLevel === filters.roastLevel);
    }

    // Filter by minimum rating
    if (filters.minRating) {
      const minRating = parseInt(filters.minRating);
      filtered = filtered.filter(coffee => (coffee.rating || 0) >= minRating);
    }

    // Sort
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'price':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'recent':
        filtered.sort((a, b) => b.id - a.id); // Assuming higher ID = more recent
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredCoffees = getFilteredCoffees();

  if (selectedCoffee) {
    return (
      <CoffeeDetail
        coffee={selectedCoffee}
        onBack={() => setSelectedCoffee(null)}
      />
    );
  }

 return (
  <div className="min-h-screen bg-gray-50">
    {/* Navbar */}
    <Navbar 
      activeView={activeView} 
      setActiveView={setActiveView}
    />

    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Show Stats Dashboard only when activeView is 'stats' */}
      {activeView === 'stats' && <StatsDashboard coffees = {coffees} />}

      {/* Show Coffee List when activeView is 'coffees' */}
      {activeView === 'coffees' && (
        <>

        {/* Floating navbar on coffee page */}
        <CoffeeActionBar
            onAddCoffee={handleAddCoffee}
            onToggleFilters={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
          />

          {showForm && (
            <CoffeeForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            />
          )}

          {editingCoffee && (
            <CoffeeForm
              onSubmit={handleUpdate}
              onCancel={() => setEditingCoffee(null)}
              initialData={editingCoffee}
            />
          )}

          {/* Search and Filter */}
          <FilterSidebar
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            filters={filters}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
          />

          {loading ? (
            <div className="text-center text-xl text-gray-600">Loading coffees...</div>
          ) : (
            <>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                My Coffees ({filteredCoffees.length})
                {filteredCoffees.length !== coffees.length && (
                  <span className="text-lg text-gray-500 ml-2">
                    (filtered from {coffees.length})
                  </span>
                )}
              </h2>

              {filteredCoffees.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No coffees match your filters. Try adjusting your search!
                </p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredCoffees.map(coffee => (
                    <CoffeeCard
                      key={coffee.id}
                      coffee={coffee}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Home view (optional - you can add content here later) */}
      {activeView === 'home' && (
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Welcome to Your Coffee Journal
          </h1>
          {/* Add welcome content here */}
        </div>
      )}
    </div>
  </div>
);
}

export default App;
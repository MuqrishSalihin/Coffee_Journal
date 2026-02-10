import { useState, useEffect } from 'react';
import axios from 'axios';

function StatsDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8080/statistics');
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading statistics...</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 shadow-lg mb-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">📊 Your Coffee Stats</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* Total Coffees */}
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-blur-sm">
          <div className="text-4xl font-bold mb-2">{stats.totalCoffees}</div>
          <div className="text-sm font-semibold">Total Coffees</div>
        </div>

        {/* Total Brew Sessions */}
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-blur-sm">
          <div className="text-4xl font-bold mb-2">{stats.totalSessions}</div>
          <div className="text-sm font-semibold">Brew Sessions</div>
        </div>

        {/* Average Rating */}
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-blur-sm">
          <div className="text-4xl font-bold mb-2">
            {stats.averageRating.toFixed(1)}
          </div>
          <div className="text-sm font-semibold">Avg Rating</div>
        </div>

        {/* Favorite Origin */}
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-blur-sm">
          <div className="text-2xl font-bold mb-2">
            {stats.favouriteOrigin || 'N/A'}
          </div>
          <div className="text-sm font-semibold">Fav Origin</div>
        </div>

        {/* Favorite Brew Method */}
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-blur-sm">
          <div className="text-2xl font-bold mb-2">
            {stats.favouriteBrewMethod || 'N/A'}
          </div>
          <div className="text-sm font-semibold">Fav Brew Method</div>
        </div>
      </div>
    </div>
  );
}

export default StatsDashboard;
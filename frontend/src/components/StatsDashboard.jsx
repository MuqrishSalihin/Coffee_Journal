import { useState, useEffect } from 'react';
import axios from 'axios';
import {Star} from 'lucide-react'
import { 
  GiCoffeeCup,        // Coffee cup
  GiFunnel,           // Coffee pot
  GiCoffeeBeans, 
  GiWaterDrop     // For coffee origins/farms
} from 'react-icons/gi';
import CoffeeCharts from './CoffeeCharts';

const API_URL = 'https://coffeejournal-production.up.railway.app';

function StatsDashboard() {
  const [stats, setStats] = useState(null);
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const[statsResponse, coffeesResponse] = await Promise.all([
        axios.get(`${API_URL}/statistics`),
        axios.get(`${API_URL}/coffees`)
      ]);
      setStats(statsResponse.data);
      setCoffees(coffeesResponse.data)
      setLoading(false);

    } catch (error) {
      console.error('Error fetching statistics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading your Coffee Statistics...</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className='space-y-8'>
      <div className='text-4xl font-bold mb-6'> 
        Coffee for Nerds
        <p className = 'text-lg'>
          Sometimes it's nice to know just how addicted you are to Caffeine
        </p>
      </div>

      {/*Stats Card */}

        <div className="bg-gray-200 rounded-lg p-6 shadow-lg mb-8 text-black">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 ">
            {/* Total Coffees */}
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-blur-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <GiCoffeeCup className="text-amber-700" size={24} />
              </div>
              <div className="text-4xl font-bold mb-2">{stats.totalCoffees}</div>
              <div className="text-sm font-semibold">Total Coffees</div>
            </div>

            {/* Total Brew Sessions */}
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-blur-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <GiWaterDrop className="text-amber-700" size={24} />
              </div>
              <div className="text-4xl font-bold mb-2">{stats.totalSessions}</div>
              <div className="text-sm font-semibold">Total Brew Sessions</div>
            </div>

            {/* Average Rating */}
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-blur-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                < Star className="text-amber-700" size={24} />
              </div>
              <div className="text-4xl font-bold mb-2">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="text-sm font-semibold">Average Rating</div>
            </div>

            {/* Favorite Origin */}
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-blur-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <GiCoffeeBeans className="text-amber-700" size={24} />
              </div>
              <div className="text-2xl font-bold mb-2">
                {stats.favouriteOrigin || 'N/A'}
              </div>
              <div className="text-sm font-semibold">Favourite Beans</div>
            </div>

            {/* Favorite Brew Method */}
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-blur-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <GiFunnel className="text-amber-700" size={24} />
              </div>
              <div className="text-2xl font-bold mb-2">
                {stats.favouriteBrewMethod || 'N/A'}
              </div>
              <div className="text-sm font-semibold">Favourite Brew Method</div>
            </div>
          </div>
        </div>

        <CoffeeCharts coffees= {coffees}/>
      </div>
  );
}

export default StatsDashboard;
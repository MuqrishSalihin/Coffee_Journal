import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CoffeeCharts = ({ coffees }) => {
  // 1. Calculate Origins Distribution
  const getOriginsData = () => {
    const originCount = {};
    coffees.forEach(coffee => {
      originCount[coffee.origin] = (originCount[coffee.origin] || 0) + 1;
    });
    return Object.entries(originCount).map(([origin, count]) => ({
      origin,
      count
    }));
  };

  // 2. Calculate Roast Level Distribution
  const getRoastLevelData = () => {
    const roastCount = {};
    coffees.forEach(coffee => {
      roastCount[coffee.roastLevel] = (roastCount[coffee.roastLevel] || 0) + 1;
    });
    return Object.entries(roastCount).map(([roastLevel, count]) => ({
      roastLevel,
      count
    }));
  };

  // 3. Calculate Rating Distribution
  const getRatingDistribution = () => {
    const ratingCount = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };
    coffees.forEach(coffee => {
      const rating = Math.floor(coffee.rating || 0);
      if (rating >= 1 && rating <= 5) {
        ratingCount[rating] = (ratingCount[rating] || 0) + 1;
      }
    });
    return Object.entries(ratingCount).map(([rating, count]) => ({
      rating: `${rating} Stars`,
      count
    }));
  };

  const originsData = getOriginsData();
  const roastLevelData = getRoastLevelData();
  const ratingData = getRatingDistribution();

  // Colors for charts
  const ORIGIN_COLORS = ['#92400e', '#b45309', '#d97706', '#f59e0b', '#fbbf24'];
  const ROAST_COLORS = ['#fef3c7', '#fcd34d', '#f59e0b', '#d97706', '#92400e'];
  const RATING_COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Coffee Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Origins Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Coffee Origins</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={originsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="origin" 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#92400e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Roast Level Donut Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Roast Level Distribution</h3>
          <div className='flex-1 flex items-center'>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                    <Pie
                        data={roastLevelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        label={(entry) => entry.roastLevel}
                    >
                        {roastLevelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ROAST_COLORS[index % ROAST_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ 
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                        }}
                    />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* 3. Rating Distribution Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="rating" 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {ratingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={RATING_COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCharts;
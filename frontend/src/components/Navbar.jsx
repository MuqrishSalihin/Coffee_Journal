import React from 'react';
import { Coffee, PlusCircle } from 'lucide-react';

const Navbar = ({ activeView, setActiveView, onAddCoffee }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Coffee className="text-gray-900" size={26} />
            <span className="text-xl font-bold text-gray-900">Coffee Journal</span>
          </div>

          {/* Navigation - Simple horizontal links */}
          <div className="flex items-center gap-12">
            <button
              onClick={() => setActiveView('home')}
              className={`text-sm font-medium tracking-wider ${
                activeView === 'home'
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => setActiveView('coffees')}
              className={`text-sm font-medium tracking-wider ${
                activeView === 'coffees'
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              COFFEES
            </button>
            <button
              onClick={() => setActiveView('stats')}
              className={`text-sm font-medium tracking-wider ${
                activeView === 'stats'
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              STATS
            </button>
          </div>

          {/* Add Coffee Button */}
          <button
            onClick={onAddCoffee}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <PlusCircle size={18} />
            ADD COFFEE
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
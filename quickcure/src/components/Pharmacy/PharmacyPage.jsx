import React from 'react';
import { Link } from 'react-router-dom';
import { medicines } from './medicines.js';
import MedicineCard from './MedicineCard';

const PharmacyPage = ({ cart, setCart }) => {
  const addToCart = (medicine) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === medicine.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Pharmacy Store</h1>
        <div className="flex items-center space-x-4">
          <Link
            to="/booking"
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors ${
              cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Book Now ({cart.length})
          </Link>
        </div>
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map(medicine => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {/* Empty State */}
      {medicines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No medicines available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default PharmacyPage;
import React from 'react';
import { Link } from 'react-router-dom';

const MedicineCard = ({ medicine, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Medicine Image */}
      <img
        src={medicine.image}
        alt={medicine.name}
        className="w-full h-48 object-cover"
      />
      
      {/* Medicine Info */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {medicine.name}
        </h3>
        <p className="text-gray-600 mb-4">{medicine.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">
            ${medicine.price}
          </span>
        </div>
        
        {/* Buttons */}
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onAddToCart(medicine)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
          <Link
            to={`/medicine/${medicine.id}`}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
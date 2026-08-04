import React, { useState } from 'react';
import { FiMapPin, FiPlus, FiTrash2, FiUsers, FiCalendar } from 'react-icons/fi';

export default function CitiesTab({ lab, theme, bookings, technicians, onUpdateCities }) {
  const [newCity, setNewCity] = useState('');
  const primary = theme?.primary || '#2c6774';
  const cities = lab?.serviceCities || [];

  const addCity = () => {
    if (!newCity.trim()) return;
    if (cities.includes(newCity.trim())) {
      alert('City already exists');
      return;
    }
    onUpdateCities([...cities, newCity.trim()]);
    setNewCity('');
  };

  const removeCity = (city) => {
    if (window.confirm(`Remove ${city} from service cities?`)) {
      onUpdateCities(cities.filter(c => c !== city));
    }
  };

  const getCityBookingCount = (city) => {
    return bookings?.filter(b => b.serviceCity === city).length || 0;
  };

  const getCityTechnicianCount = (city) => {
    return technicians?.filter(t => t.city === city).length || 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${primary}20`, color: primary }}>
          <FiMapPin size={20} />
        </div>
        <h2 className="text-xl font-semibold">City / Area Management</h2>
      </div>

      {/* Add City */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex gap-3">
          <input type="text" placeholder="Enter city name..." value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCity()}
            className="flex-1 px-4 py-2 border rounded-lg" />
          <button onClick={addCity} className="px-4 py-2 text-white rounded-lg flex items-center gap-2" style={{ backgroundColor: primary }}>
            <FiPlus size={16} /> Add City
          </button>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cities.map(city => (
          <div key={city} className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${primary}20`, color: primary }}>
                  <FiMapPin size={20} />
                </div>
                <h3 className="font-semibold text-lg">{city}</h3>
              </div>
              <button onClick={() => removeCity(city)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <FiTrash2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <FiCalendar className="mx-auto text-blue-600 mb-1" size={18} />
                <p className="text-2xl font-bold text-blue-700">{getCityBookingCount(city)}</p>
                <p className="text-xs text-blue-600">Bookings</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <FiUsers className="mx-auto text-green-600 mb-1" size={18} />
                <p className="text-2xl font-bold text-green-700">{getCityTechnicianCount(city)}</p>
                <p className="text-xs text-green-600">Technicians</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cities.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <FiMapPin size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No cities added. Add cities where your lab provides service.</p>
        </div>
      )}
    </div>
  );
}
// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { FaMapMarkerAlt, FaStar, FaUserMd, FaFlask, FaPills, FaExclamationTriangle } from 'react-icons/fa';
// import { unifiedSearch } from '../../api/searchApi';
// import SearchSuggestions from './SearchSuggestions';
// import './search.css';

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const query = searchParams.get('q') || '';
//   const type = searchParams.get('type') || 'all';
  
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState(type);
//   const [backendStatus, setBackendStatus] = useState('checking'); // checking, online, offline

//   // Check backend connectivity on mount
//   useEffect(() => {
//     checkBackendConnection();
//   }, []);

//   const checkBackendConnection = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/search?query=test&type=all', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });
//       if (response.ok || response.status === 400) { // 400 is ok, means server is running
//         setBackendStatus('online');
//       } else {
//         setBackendStatus('offline');
//       }
//     } catch (error) {
//       console.error('Backend connection error:', error);
//       setBackendStatus('offline');
//     }
//   };

//   useEffect(() => {
//     if (query && query.length >= 2) {
//       performSearch(query, activeTab);
//     } else if (query && query.length < 2) {
//       setError('Please enter at least 2 characters to search');
//     }
//   }, [query, activeTab]);

//   const performSearch = async (searchQuery, searchType) => {
//     setLoading(true);
//     setError(null);
//     setResults(null);
    
//     try {
//       console.log('Performing search:', searchQuery, searchType);
//       const response = await unifiedSearch(searchQuery, searchType);
//       console.log('Search response:', response);
      
//       if (response.success && response.data) {
//         setResults(response.data);
//       } else {
//         setError(response.error || 'No results found. Please try a different search term.');
//       }
//     } catch (err) {
//       setError('An error occurred while searching. Please try again.');
//       console.error('Search error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     if (query) {
//       performSearch(query, tab);
//     }
//   };

//   const handleSearch = (searchQuery) => {
//     if (searchQuery.trim()) {
//       // Use window.location for reliable navigation
//       const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}&type=${activeTab}`;
//       window.location.href = searchUrl;
//     }
//   };

//   const renderDoctorCard = (doctor) => (
//     <div className="result-card doctor-card" onClick={() => navigate(`/doctor/${doctor.id}`)}>
//       <div className="card-image">
//         {doctor.image ? (
//           <img src={`http://localhost:5000${doctor.image}`} alt={doctor.name} />
//         ) : (
//           <div className="placeholder-image">
//             <FaUserMd />
//           </div>
//         )}
//       </div>
//       <div className="card-content">
//         <h3>{doctor.name}</h3>
//         <p className="speciality">{doctor.speciality}</p>
//         {doctor.qualification && <p className="qualification">{doctor.qualification}</p>}
//         <div className="card-meta">
//           <span className="rating">
//             <FaStar /> {doctor.rating?.toFixed(1) || 'N/A'}
//           </span>
//           <span className="fee">Rs. {doctor.fee}</span>
//         </div>
//         {doctor.experience && <p className="experience">{doctor.experience} years experience</p>}
//       </div>
//     </div>
//   );

//   const renderLabCard = (lab) => (
//     <div className="result-card lab-card" onClick={() => navigate(`/labs/${lab.id}`)}>
//       <div className="card-image">
//         {lab.logo ? (
//           <img src={`http://localhost:5000/uploads/${lab.logo}`} alt={lab.name} />
//         ) : (
//           <div className="placeholder-image">
//             <FaFlask />
//           </div>
//         )}
//       </div>
//       <div className="card-content">
//         <h3>{lab.name}</h3>
//         {lab.branches && lab.branches.length > 0 && (
//           <p className="branches">
//             <FaMapMarkerAlt /> {lab.branches[0]}
//           </p>
//         )}
//         {lab.discount && <p className="discount">{lab.discount}% OFF</p>}
//       </div>
//     </div>
//   );

//   const renderPharmacyCard = (pharmacy) => (
//     <div className="result-card pharmacy-card" onClick={() => navigate(`/pharmacies/${pharmacy.id}`)}>
//       <div className="card-image">
//         {pharmacy.image ? (
//           <img src={`http://localhost:5000${pharmacy.image}`} alt={pharmacy.name} />
//         ) : (
//           <div className="placeholder-image">
//             <FaPills />
//           </div>
//         )}
//       </div>
//       <div className="card-content">
//         <h3>{pharmacy.name}</h3>
//         <p className="location">
//           <FaMapMarkerAlt /> {pharmacy.city}, {pharmacy.address}
//         </p>
//         <div className="card-meta">
//           <span className="rating">
//             <FaStar /> {pharmacy.rating?.toFixed(1) || 'N/A'}
//           </span>
//           <span className={`status ${pharmacy.open ? 'open' : 'closed'}`}>
//             {pharmacy.open ? 'Open' : 'Closed'}
//           </span>
//         </div>
//         {pharmacy.deliveryTime && <p className="delivery">Delivery: {pharmacy.deliveryTime}</p>}
//       </div>
//     </div>
//   );

//   return (
//     <div className="search-results-page">
//       <div className="search-header">
//         <div className="container">
//           <h1>Search Results</h1>
//           <SearchSuggestions 
//             placeholder="Search doctors, labs, pharmacies..." 
//             onSearch={handleSearch}
//             autoFocus={false}
//           />
//         </div>
//       </div>

//       <div className="container">
//         <div className="tabs">
//           <button
//             className={`tab ${activeTab === 'all' ? 'active' : ''}`}
//             onClick={() => handleTabChange('all')}
//           >
//             All
//           </button>
//           <button
//             className={`tab ${activeTab === 'doctors' ? 'active' : ''}`}
//             onClick={() => handleTabChange('doctors')}
//           >
//             <FaUserMd /> Doctors
//           </button>
//           <button
//             className={`tab ${activeTab === 'labs' ? 'active' : ''}`}
//             onClick={() => handleTabChange('labs')}
//           >
//             <FaFlask /> Labs
//           </button>
//           <button
//             className={`tab ${activeTab === 'pharmacies' ? 'active' : ''}`}
//             onClick={() => handleTabChange('pharmacies')}
//           >
//             <FaPills /> Pharmacies
//           </button>
//         </div>

//         {loading && <div className="loading">Searching...</div>}
        
//         {backendStatus === 'offline' && (
//           <div className="error-message" style={{ backgroundColor: '#fff3cd', color: '#856404' }}>
//             <FaExclamationTriangle /> <strong>Backend Server Offline</strong>
//             <br />
//             <small>Please make sure the backend server is running on http://localhost:5000</small>
//             <br />
//             <small>Run: <code>cd QuickCureBackEnd/backend && npm start</code></small>
//           </div>
//         )}

//         {error && backendStatus === 'online' && (
//           <div className="error-message">
//             <strong>Error:</strong> {error}
//           </div>
//         )}

//         {!loading && results && (
//           <>
//             <div className="results-summary">
//               <p>
//                 Found <strong>{results.totalResults}</strong> results for "<strong>{results.query}</strong>"
//               </p>
//             </div>

//             {results.totalResults === 0 ? (
//               <div className="no-results">
//                 <p>No results found. Try a different search term.</p>
//               </div>
//             ) : (
//               <div className="results-container">
//                 {(activeTab === 'all' || activeTab === 'doctors') && results.doctors.length > 0 && (
//                   <div className="results-section">
//                     {activeTab === 'all' && <h2>Doctors ({results.doctors.length})</h2>}
//                     <div className="results-grid">
//                       {results.doctors.map(doctor => (
//                         <div key={doctor.id}>{renderDoctorCard(doctor)}</div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {(activeTab === 'all' || activeTab === 'labs') && results.labs.length > 0 && (
//                   <div className="results-section">
//                     {activeTab === 'all' && <h2>Labs ({results.labs.length})</h2>}
//                     <div className="results-grid">
//                       {results.labs.map(lab => (
//                         <div key={lab.id}>{renderLabCard(lab)}</div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {(activeTab === 'all' || activeTab === 'pharmacies') && results.pharmacies.length > 0 && (
//                   <div className="results-section">
//                     {activeTab === 'all' && <h2>Pharmacies ({results.pharmacies.length})</h2>}
//                     <div className="results-grid">
//                       {results.pharmacies.map(pharmacy => (
//                         <div key={pharmacy.id}>{renderPharmacyCard(pharmacy)}</div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;


import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaUserMd, FaFlask, FaPills, FaExclamationTriangle } from 'react-icons/fa';
import { unifiedSearch } from '../../api/searchApi';
import SearchSuggestions from './SearchSuggestions';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all';
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(type);
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/search?query=test&type=all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok || response.status === 400) {
        setBackendStatus('online');
      } else {
        setBackendStatus('offline');
      }
    } catch (error) {
      console.error('Backend connection error:', error);
      setBackendStatus('offline');
    }
  };

  useEffect(() => {
    if (query && query.length >= 2) {
      performSearch(query, activeTab);
    } else if (query && query.length < 2) {
      setError('Please enter at least 2 characters to search');
    }
  }, [query, activeTab]);

  const performSearch = async (searchQuery, searchType) => {
    setLoading(true);
    setError(null);
    setResults(null);
    
    try {
      console.log('Performing search:', searchQuery, searchType);
      const response = await unifiedSearch(searchQuery, searchType);
      console.log('Search response:', response);
      
      if (response.success && response.data) {
        setResults(response.data);
      } else {
        setError(response.error || 'No results found. Please try a different search term.');
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (query) {
      performSearch(query, tab);
    }
  };

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}&type=${activeTab}`;
      window.location.href = searchUrl;
    }
  };

  const renderDoctorCard = (doctor) => (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      onClick={() => navigate(`/doctor/${doctor.id}`)}
    >
      <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-indigo-100/20 to-purple-100/20 flex items-center justify-center">
        {doctor.image ? (
          <img src={`http://localhost:5000${doctor.image}`} alt={doctor.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl text-indigo-500 bg-gradient-to-br from-indigo-100/30 to-purple-100/30">
            <FaUserMd />
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
        <p className="text-indigo-600 font-medium mb-1">{doctor.speciality}</p>
        {doctor.qualification && <p className="text-gray-600 text-sm mb-2">{doctor.qualification}</p>}
        <div className="flex justify-between items-center my-3 py-2 border-t border-b border-gray-100">
          <span className="flex items-center gap-1 text-amber-500 font-semibold">
            <FaStar /> {doctor.rating?.toFixed(1) || 'N/A'}
          </span>
          <span className="text-green-600 font-semibold text-lg">Rs. {doctor.fee}</span>
        </div>
        {doctor.experience && <p className="text-gray-600 text-sm mt-2">{doctor.experience} years experience</p>}
      </div>
    </div>
  );

  const renderLabCard = (lab) => (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      onClick={() => navigate(`/labs/${lab.id}`)}
    >
      <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-indigo-100/20 to-purple-100/20 flex items-center justify-center">
        {lab.logo ? (
          <img src={`http://localhost:5000/uploads/${lab.logo}`} alt={lab.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl text-indigo-500 bg-gradient-to-br from-indigo-100/30 to-purple-100/30">
            <FaFlask />
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{lab.name}</h3>
        {lab.branches && lab.branches.length > 0 && (
          <p className="text-gray-600 flex items-center gap-2 mb-2">
            <FaMapMarkerAlt /> {lab.branches[0]}
          </p>
        )}
        {lab.discount && (
          <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mt-2">
            {lab.discount}% OFF
          </span>
        )}
      </div>
    </div>
  );

  const renderPharmacyCard = (pharmacy) => (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      onClick={() => navigate(`/pharmacies/${pharmacy.id}`)}
    >
      <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-indigo-100/20 to-purple-100/20 flex items-center justify-center">
        {pharmacy.image ? (
          <img src={`http://localhost:5000${pharmacy.image}`} alt={pharmacy.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl text-indigo-500 bg-gradient-to-br from-indigo-100/30 to-purple-100/30">
            <FaPills />
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{pharmacy.name}</h3>
        <p className="text-gray-600 flex items-center gap-2 mb-3">
          <FaMapMarkerAlt /> {pharmacy.city}, {pharmacy.address}
        </p>
        <div className="flex justify-between items-center my-3 py-2 border-t border-b border-gray-100">
          <span className="flex items-center gap-1 text-amber-500 font-semibold">
            <FaStar /> {pharmacy.rating?.toFixed(1) || 'N/A'}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {pharmacy.open ? 'Open' : 'Closed'}
          </span>
        </div>
        {pharmacy.deliveryTime && <p className="text-gray-600 text-sm mt-2">Delivery: {pharmacy.deliveryTime}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12 pb-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Search Results</h1>
          <SearchSuggestions 
            placeholder="Search doctors, labs, pharmacies..." 
            onSearch={handleSearch}
            autoFocus={false}
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2 border-gray-200 overflow-x-auto">
          <button
            className={`px-6 py-3 bg-transparent border-none text-gray-600 font-medium cursor-pointer relative transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'all' ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'
            }`}
            onClick={() => handleTabChange('all')}
          >
            All
            {activeTab === 'all' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-sm"></span>
            )}
          </button>
          <button
            className={`px-6 py-3 bg-transparent border-none text-gray-600 font-medium cursor-pointer relative transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'doctors' ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'
            }`}
            onClick={() => handleTabChange('doctors')}
          >
            <FaUserMd /> Doctors
            {activeTab === 'doctors' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-sm"></span>
            )}
          </button>
          <button
            className={`px-6 py-3 bg-transparent border-none text-gray-600 font-medium cursor-pointer relative transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'labs' ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'
            }`}
            onClick={() => handleTabChange('labs')}
          >
            <FaFlask /> Labs
            {activeTab === 'labs' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-sm"></span>
            )}
          </button>
          <button
            className={`px-6 py-3 bg-transparent border-none text-gray-600 font-medium cursor-pointer relative transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'pharmacies' ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'
            }`}
            onClick={() => handleTabChange('pharmacies')}
          >
            <FaPills /> Pharmacies
            {activeTab === 'pharmacies' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-sm"></span>
            )}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-lg text-indigo-600">Searching...</div>
        )}
        
        {/* Backend Offline Error */}
        {backendStatus === 'offline' && (
          <div className="text-center p-8 bg-yellow-100 text-yellow-800 rounded-lg my-8">
            <FaExclamationTriangle className="inline mr-2" /> <strong>Backend Server Offline</strong>
            <br />
            <small>Please make sure the backend server is running on http://localhost:5000</small>
            <br />
            <small>Run: <code className="bg-yellow-200 px-2 py-1 rounded">cd QuickCureBackEnd/backend && npm start</code></small>
          </div>
        )}

        {/* Error Message */}
        {error && backendStatus === 'online' && (
          <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg my-8">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Results */}
        {!loading && results && (
          <>
            <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
              <p className="text-lg text-gray-800">
                Found <strong>{results.totalResults}</strong> results for "<strong>{results.query}</strong>"
              </p>
            </div>

            {results.totalResults === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-lg text-gray-600">No results found. Try a different search term.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {/* Doctors Section */}
                {(activeTab === 'all' || activeTab === 'doctors') && results.doctors.length > 0 && (
                  <div className="results-section">
                    {activeTab === 'all' && (
                      <h2 className="text-2xl text-gray-800 mb-4 pb-2 border-b-2 border-indigo-600">
                        Doctors ({results.doctors.length})
                      </h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.doctors.map(doctor => (
                        <div key={doctor.id}>{renderDoctorCard(doctor)}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Labs Section */}
                {(activeTab === 'all' || activeTab === 'labs') && results.labs.length > 0 && (
                  <div className="results-section">
                    {activeTab === 'all' && (
                      <h2 className="text-2xl text-gray-800 mb-4 pb-2 border-b-2 border-indigo-600">
                        Labs ({results.labs.length})
                      </h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.labs.map(lab => (
                        <div key={lab.id}>{renderLabCard(lab)}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pharmacies Section */}
                {(activeTab === 'all' || activeTab === 'pharmacies') && results.pharmacies.length > 0 && (
                  <div className="results-section">
                    {activeTab === 'all' && (
                      <h2 className="text-2xl text-gray-800 mb-4 pb-2 border-b-2 border-indigo-600">
                        Pharmacies ({results.pharmacies.length})
                      </h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.pharmacies.map(pharmacy => (
                        <div key={pharmacy.id}>{renderPharmacyCard(pharmacy)}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
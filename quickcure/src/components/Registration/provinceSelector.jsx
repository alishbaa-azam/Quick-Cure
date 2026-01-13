// import React, { useState, useEffect } from 'react';

// const ProvinceCitySelector = ({ 
//   selectedProvince, 
//   selectedCity, 
//   selectedArea,
//   onProvinceChange, 
//   onCityChange, 
//   onAreaChange,
//   showArea = true 
// }) => {
//   // Pakistan provinces and cities data
//   const pakistanData = {
//     provinces: [
//       { 
//         id: 'punjab', 
//         name: 'Punjab', 
//         emoji: '🏛️',
//         description: 'Largest province by population'
//       },
//       { 
//         id: 'sindh', 
//         name: 'Sindh', 
//         emoji: '🌊',
//         description: 'Southern province with Karachi'
//       },
//       { 
//         id: 'kpk', 
//         name: 'Khyber Pakhtunkhwa', 
//         emoji: '⛰️',
//         description: 'Northern mountainous region'
//       },
//       { 
//         id: 'balochistan', 
//         name: 'Balochistan', 
//         emoji: '🏜️',
//         description: 'Largest province by area'
//       },
//       { 
//         id: 'islamabad', 
//         name: 'Islamabad Capital Territory', 
//         emoji: '🏢',
//         description: 'Federal capital territory'
//       },
//       { 
//         id: 'gb', 
//         name: 'Gilgit-Baltistan', 
//         emoji: '🗻',
//         description: 'Northern mountainous region'
//       },
//       { 
//         id: 'ajk', 
//         name: 'Azad Jammu & Kashmir', 
//         emoji: '🏞️',
//         description: 'Azad Kashmir region'
//       }
//     ],
    
//     cities: {
//       punjab: [
//         { name: 'Lahore', type: 'metropolitan', population: '11M+', popularAreas: ['Gulberg', 'Defence', 'Model Town'] },
//         { name: 'Faisalabad', type: 'industrial', population: '3.2M', popularAreas: ['Civic Centre', 'Madina Town'] },
//         { name: 'Rawalpindi', type: 'city', population: '2.1M', popularAreas: ['Satellite Town', 'Cantt'] },
//         { name: 'Gujranwala', type: 'industrial', population: '2M', popularAreas: ['GT Road', 'Sialkot Bypass'] },
//         { name: 'Multan', type: 'historical', population: '1.9M', popularAreas: ['Bosan Road', 'LMQ Road'] },
//         { name: 'Bahawalpur', type: 'historical', population: '762K', popularAreas: ['Model Town', 'Satellite Town'] },
//         { name: 'Sargodha', type: 'city', population: '659K', popularAreas: ['University Road', 'Cantt'] },
//         { name: 'Sialkot', type: 'industrial', population: '655K', popularAreas: ['Paris Road', 'Cantt'] },
//         { name: 'Sheikhupura', type: 'industrial', population: '473K', popularAreas: ['Sheikhupura Road'] },
//         { name: 'Jhang', type: 'city', population: '414K', popularAreas: ['Jhang Sadar'] },
//         { name: 'Rahim Yar Khan', type: 'agricultural', population: '420K', popularAreas: ['Khanpur Road'] },
//         { name: 'Gujrat', type: 'industrial', population: '390K', popularAreas: ['GTS Road'] },
//         { name: 'Kasur', type: 'historical', population: '358K', popularAreas: ['Kasur Road'] },
//         { name: 'Sahiwal', type: 'agricultural', population: '389K', popularAreas: ['Sahiwal City'] },
//         { name: 'Okara', type: 'agricultural', population: '357K', popularAreas: ['Okara Cantt'] }
//       ],
      
//       sindh: [
//         { name: 'Karachi', type: 'metropolitan', population: '16M+', popularAreas: ['Clifton', 'Defence', 'Gulshan'] },
//         { name: 'Hyderabad', type: 'historical', population: '1.7M', popularAreas: ['Qasimabad', 'Latifabad'] },
//         { name: 'Sukkur', type: 'city', population: '500K', popularAreas: ['Sukkur City'] },
//         { name: 'Larkana', type: 'historical', population: '490K', popularAreas: ['Larkana City'] },
//         { name: 'Nawabshah', type: 'city', population: '279K', popularAreas: ['Nawabshah City'] },
//         { name: 'Mirpur Khas', type: 'agricultural', population: '233K', popularAreas: ['Mirpur Khas City'] },
//         { name: 'Jacobabad', type: 'agricultural', population: '191K', popularAreas: ['Jacobabad City'] },
//         { name: 'Shikarpur', type: 'historical', population: '199K', popularAreas: ['Shikarpur City'] },
//         { name: 'Khairpur', type: 'historical', population: '184K', popularAreas: ['Khairpur City'] },
//         { name: 'Badin', type: 'coastal', population: '81K', popularAreas: ['Badin City'] }
//       ],
      
//       kpk: [
//         { name: 'Peshawar', type: 'historical', population: '2.3M', popularAreas: ['University Town', 'Hayatabad'] },
//         { name: 'Mardan', type: 'city', population: '358K', popularAreas: ['Mardan City'] },
//         { name: 'Mingora', type: 'tourist', population: '331K', popularAreas: ['Mingora City'] },
//         { name: 'Kohat', type: 'city', population: '228K', popularAreas: ['Kohat City'] },
//         { name: 'Abbottabad', type: 'hill station', population: '208K', popularAreas: ['Jinnahabad', 'Mandian'] },
//         { name: 'Dera Ismail Khan', type: 'city', population: '217K', popularAreas: ['DI Khan City'] },
//         { name: 'Mansehra', type: 'hill station', population: '127K', popularAreas: ['Mansehra City'] },
//         { name: 'Swabi', type: 'agricultural', population: '123K', popularAreas: ['Swabi City'] },
//         { name: 'Nowshera', type: 'industrial', population: '120K', popularAreas: ['Nowshera Cantt'] },
//         { name: 'Charsadda', type: 'agricultural', population: '105K', popularAreas: ['Charsadda City'] }
//       ],
      
//       balochistan: [
//         { name: 'Quetta', type: 'provincial capital', population: '1M', popularAreas: ['Jinnah Town', 'Samungli'] },
//         { name: 'Turbat', type: 'city', population: '213K', popularAreas: ['Turbat City'] },
//         { name: 'Khuzdar', type: 'city', population: '182K', popularAreas: ['Khuzdar City'] },
//         { name: 'Hub', type: 'industrial', population: '175K', popularAreas: ['Hub City'] },
//         { name: 'Chaman', type: 'border city', population: '123K', popularAreas: ['Chaman City'] },
//         { name: 'Gwadar', type: 'port city', population: '90K', popularAreas: ['Gwadar City'] },
//         { name: 'Dera Murad Jamali', type: 'city', population: '86K', popularAreas: ['DMJ City'] },
//         { name: 'Zhob', type: 'city', population: '50K', popularAreas: ['Zhob City'] },
//         { name: 'Sibi', type: 'historical', population: '38K', popularAreas: ['Sibi City'] },
//         { name: 'Loralai', type: 'city', population: '37K', popularAreas: ['Loralai City'] }
//       ],
      
//       islamabad: [
//         { name: 'Islamabad', type: 'federal capital', population: '1.2M', popularAreas: ['F-6', 'F-7', 'F-8', 'G-9', 'G-10'] }
//       ],
      
//       gb: [
//         { name: 'Gilgit', type: 'regional capital', population: '216K', popularAreas: ['Gilgit City'] },
//         { name: 'Skardu', type: 'tourist', population: '48K', popularAreas: ['Skardu City'] },
//         { name: 'Chilas', type: 'town', population: '25K', popularAreas: ['Chilas Town'] },
//         { name: 'Ghizer', type: 'district', population: '190K', popularAreas: ['Gahkuch'] }
//       ],
      
//       ajk: [
//         { name: 'Muzaffarabad', type: 'regional capital', population: '165K', popularAreas: ['Muzaffarabad City'] },
//         { name: 'Mirpur', type: 'city', population: '125K', popularAreas: ['Mirpur City'] },
//         { name: 'Rawalakot', type: 'hill station', population: '70K', popularAreas: ['Rawalakot City'] },
//         { name: 'Kotli', type: 'city', population: '214K', popularAreas: ['Kotli City'] }
//       ]
//     },
    
//     areas: {
//       // Lahore areas
//       lahore: [
//         'Gulberg', 'Defence Phase 1-8', 'Model Town', 'Johar Town', 
//         'DHA Phase 1-9', 'Cantt', 'Township', 'Garden Town', 'Faisal Town',
//         'Iqbal Town', 'Samnabad', 'Shadman', 'Allama Iqbal Town'
//       ],
      
//       // Karachi areas
//       karachi: [
//         'Clifton', 'Defence Phase 1-8', 'North Nazimabad', 'Gulshan-e-Iqbal',
//         'Malir', 'Korangi', 'Saddar', 'Gulistan-e-Johar', 'Bahadurabad',
//         'PECHS', 'Tariq Road', 'University Road', 'Shah Faisal'
//       ],
      
//       // Islamabad areas
//       islamabad: [
//         'F-6', 'F-7', 'F-8', 'G-9', 'G-10', 'I-8', 'I-9', 'I-10',
//         'G-11', 'E-11', 'DHA Phase 1-2', 'Bahria Town', 'Margalla Town'
//       ],
      
//       // Rawalpindi areas
//       rawalpindi: [
//         'Satellite Town', 'Westridge', 'Cantt', 'Raja Bazar', 'G-6', 'G-7',
//         'Bahria Town', 'DHA Phase 1-2', 'Chaklala', 'Sadiqabad'
//       ],
      
//       // Faisalabad areas
//       faisalabad: [
//         'Civic Centre', 'Gatwala', 'Madina Town', 'Jaranwala Road',
//         'Samundri Road', 'D-Ground', 'People\'s Colony', 'Millat Town'
//       ],
      
//       // Multan areas
//       multan: [
//         'Bosan Road', 'LMQ Road', 'Cantt', 'Shah Rukn-e-Alam Colony',
//         'Gulgasht Colony', 'Shershah Road', 'Chowk Kumharanwala'
//       ],
      
//       // Gujranwala areas
//       gujranwala: [
//         'GT Road', 'Sialkot Bypass', 'Cantt', 'Model Town',
//         'People\'s Colony', 'Khiyaali Road', 'College Road'
//       ],
      
//       // Peshawar areas
//       peshawar: [
//         'University Town', 'Hayatabad', 'Cantt', 'Sadar',
//         'Kohat Road', 'Warsak Road', 'Ring Road'
//       ],
      
//       // Quetta areas
//       quetta: [
//         'Jinnah Town', 'Samungli Road', 'Cantt', 'Arbab Karam Khan Road',
//         'Prince Road', 'Mecangi Road', 'Sariab Road'
//       ],
      
//       // Hyderabad areas
//       hyderabad: [
//         'Qasimabad', 'Latifabad', 'Cantt', 'Market Area',
//         'Hala Naka', 'Sachal Road', 'Auto Bhan Road'
//       ]
//     }
//   };

//   // Get cities for selected province
//   const getCitiesForProvince = () => {
//     if (!selectedProvince) return [];
//     return pakistanData.cities[selectedProvince] || [];
//   };

//   // Get areas for selected city
//   const getAreasForCity = () => {
//     if (!selectedCity) return [];
//     const cityKey = selectedCity.toLowerCase();
//     return pakistanData.areas[cityKey] || [];
//   };

//   // Handle province change
//   const handleProvinceChange = (e) => {
//     const provinceId = e.target.value;
//     onProvinceChange(provinceId);
//     onCityChange(''); // Reset city when province changes
//     onAreaChange(''); // Reset area when province changes
//   };

//   // Handle city change
//   const handleCityChange = (e) => {
//     const cityName = e.target.value;
//     onCityChange(cityName);
//     onAreaChange(''); // Reset area when city changes
//   };

//   // Get province emoji and name
//   const getSelectedProvinceInfo = () => {
//     return pakistanData.provinces.find(p => p.id === selectedProvince);
//   };

//   // Get selected city info
//   const getSelectedCityInfo = () => {
//     if (!selectedProvince || !selectedCity) return null;
//     const cities = pakistanData.cities[selectedProvince];
//     return cities?.find(city => city.name === selectedCity);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Province Selection */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <label className="block text-sm font-medium text-gray-700">
//             Province *
//           </label>
//           {selectedProvince && (
//             <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
//               {getSelectedProvinceInfo()?.emoji} {getSelectedProvinceInfo()?.name}
//             </span>
//           )}
//         </div>
        
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//           {pakistanData.provinces.map(province => (
//             <button
//               key={province.id}
//               type="button"
//               onClick={() => {
//                 onProvinceChange(province.id);
//                 onCityChange('');
//                 onAreaChange('');
//               }}
//               className={`p-4 border rounded-lg text-center transition-all duration-200 ${
//                 selectedProvince === province.id
//                   ? 'border-green-500 bg-green-50 ring-2 ring-green-100'
//                   : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//               }`}
//             >
//               <div className="text-2xl mb-2">{province.emoji}</div>
//               <div className="font-medium text-gray-900">{province.name}</div>
//               <div className="text-xs text-gray-500 mt-1">{province.description}</div>
//             </button>
//           ))}
//         </div>
        
//         {/* Hidden select for form submission */}
//         <select
//           value={selectedProvince}
//           onChange={handleProvinceChange}
//           className="hidden"
//           required
//         >
//           <option value="">Select Province</option>
//           {pakistanData.provinces.map(province => (
//             <option key={province.id} value={province.id}>
//               {province.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* City Selection - Only show if province is selected */}
//       {selectedProvince && (
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <label className="block text-sm font-medium text-gray-700">
//               City *
//             </label>
//             {selectedCity && getSelectedCityInfo() && (
//               <div className="flex items-center space-x-2">
//                 <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                   {getSelectedCityInfo()?.type}
//                 </span>
//                 <span className="text-xs text-gray-500">
//                   Pop: {getSelectedCityInfo()?.population}
//                 </span>
//               </div>
//             )}
//           </div>
          
//           <div className="relative">
//             <select
//               value={selectedCity}
//               onChange={handleCityChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
//               required
//             >
//               <option value="">Select City</option>
//               {getCitiesForProvince().map(city => (
//                 <option key={city.name} value={city.name}>
//                   {city.name} {city.population && `(${city.population})`}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute right-3 top-3 pointer-events-none">
//               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
          
//           {/* Popular areas hint for selected city */}
//           {selectedCity && getSelectedCityInfo()?.popularAreas && (
//             <div className="mt-2">
//               <p className="text-xs text-gray-500 mb-1">Popular areas in {selectedCity}:</p>
//               <div className="flex flex-wrap gap-1">
//                 {getSelectedCityInfo().popularAreas.map(area => (
//                   <span 
//                     key={area}
//                     onClick={() => onAreaChange(area)}
//                     className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded cursor-pointer transition-colors"
//                   >
//                     {area}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Area Selection - Only show if city is selected and showArea is true */}
//       {showArea && selectedCity && getAreasForCity().length > 0 && (
//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Area/Locality (Optional)
//           </label>
          
//           <div className="relative">
//             <select
//               value={selectedArea}
//               onChange={(e) => onAreaChange(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
//             >
//               <option value="">Select Area (Optional)</option>
//               {getAreasForCity().map(area => (
//                 <option key={area} value={area}>
//                   {area}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute right-3 top-3 pointer-events-none">
//               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
          
//           {/* Area quick selection */}
//           <div className="mt-2">
//             <p className="text-xs text-gray-500 mb-1">Quick select:</p>
//             <div className="flex flex-wrap gap-2">
//               {getAreasForCity().slice(0, 6).map(area => (
//                 <button
//                   key={area}
//                   type="button"
//                   onClick={() => onAreaChange(area)}
//                   className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
//                     selectedArea === area
//                       ? 'bg-blue-100 text-blue-700 border border-blue-300'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {area}
//                 </button>
//               ))}
//               {getAreasForCity().length > 6 && (
//                 <span className="text-xs text-gray-400 self-center">
//                   +{getAreasForCity().length - 6} more
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Selected Location Summary */}
//       {(selectedProvince || selectedCity || selectedArea) && (
//         <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100">
//           <div className="flex items-center">
//             <div className="mr-3">
//               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-blue-200">
//                 <span className="text-lg">📍</span>
//               </div>
//             </div>
//             <div>
//               <p className="font-medium text-gray-900">Selected Location</p>
//               <p className="text-sm text-gray-600">
//                 {selectedProvince && (
//                   <span>{getSelectedProvinceInfo()?.name} → </span>
//                 )}
//                 {selectedCity && (
//                   <span>{selectedCity} </span>
//                 )}
//                 {selectedArea && (
//                   <span>→ {selectedArea}</span>
//                 )}
//               </p>
//               {selectedCity && getSelectedCityInfo() && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   {getSelectedCityInfo().type} • Population: {getSelectedCityInfo().population}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProvinceCitySelector;


import React from 'react';
import { FaMapMarkerAlt, FaCity, FaMapPin, FaCheck } from 'react-icons/fa';

const ProvinceCitySelector = ({ 
  selectedProvince, 
  selectedCity, 
  selectedArea,
  onProvinceChange, 
  onCityChange, 
  onAreaChange,
  errors,
  showArea = true 
}) => {
  const pakistanData = {
    provinces: [
      { id: 'punjab', name: 'Punjab', description: 'Largest province' },
      { id: 'sindh', name: 'Sindh', description: 'Southern province' },
      { id: 'kpk', name: 'Khyber Pakhtunkhwa', description: 'Northern mountains' },
      { id: 'balochistan', name: 'Balochistan', description: 'Largest by area' },
      { id: 'islamabad', name: 'Islamabad', description: 'Federal capital' },
      { id: 'gb', name: 'Gilgit-Baltistan', description: 'Northern region' },
      { id: 'ajk', name: 'Azad Kashmir', description: 'Kashmir region' }
    ],
    
    cities: {
      punjab: [
        'Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Multan',
        'Bahawalpur', 'Sargodha', 'Sialkot', 'Sheikhupura', 'Jhang',
        'Rahim Yar Khan', 'Gujrat', 'Kasur', 'Sahiwal', 'Okara'
      ],
      sindh: [
        'Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah',
        'Mirpur Khas', 'Jacobabad', 'Shikarpur', 'Khairpur', 'Badin'
      ],
      kpk: [
        'Peshawar', 'Mardan', 'Mingora', 'Kohat', 'Abbottabad',
        'Dera Ismail Khan', 'Mansehra', 'Swabi', 'Nowshera', 'Charsadda'
      ],
      balochistan: [
        'Quetta', 'Turbat', 'Khuzdar', 'Hub', 'Chaman',
        'Gwadar', 'Dera Murad Jamali', 'Zhob', 'Sibi', 'Loralai'
      ],
      islamabad: ['Islamabad'],
      gb: ['Gilgit', 'Skardu', 'Chilas', 'Ghizer'],
      ajk: ['Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli']
    },
    
    areas: {
      lahore: ['Gulberg', 'Defence', 'Model Town', 'Johar Town', 'DHA', 'Cantt'],
      karachi: ['Clifton', 'Defence', 'North Nazimabad', 'Gulshan', 'Malir'],
      islamabad: ['F-6', 'F-7', 'F-8', 'G-9', 'G-10', 'I-8'],
      rawalpindi: ['Satellite Town', 'Westridge', 'Cantt', 'Raja Bazar'],
      faisalabad: ['Civic Centre', 'Gatwala', 'Madina Town', 'Jaranwala Road']
    }
  };

  const getCitiesForProvince = () => {
    if (!selectedProvince) return [];
    return pakistanData.cities[selectedProvince] || [];
  };

  const getAreasForCity = () => {
    if (!selectedCity) return [];
    const cityKey = selectedCity.toLowerCase();
    return pakistanData.areas[cityKey] || [];
  };

  const getProvinceName = () => {
    return pakistanData.provinces.find(p => p.id === selectedProvince)?.name;
  };

  return (
    <div className="space-y-6">
      {/* Province Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Province *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pakistanData.provinces.map(province => (
            <button
              key={province.id}
              type="button"
              onClick={() => {
                onProvinceChange(province.id);
                onCityChange('');
                onAreaChange('');
              }}
              className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                selectedProvince === province.id
                  ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/5'
                  : 'border-gray-200 hover:border-gray-300'
              } ${errors?.province ? 'border-red-300' : ''}`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border mr-3 flex items-center justify-center ${
                  selectedProvince === province.id
                    ? 'border-[var(--primary-color)] bg-[var(--primary-color)]'
                    : 'border-gray-300'
                }`}>
                  {selectedProvince === province.id && (
                    <FaCheck className="w-3 h-3 text-white" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{province.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{province.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        {errors?.province && (
          <p className="text-sm text-red-600">{errors.province.message}</p>
        )}
      </div>

      {/* City Selection */}
      {selectedProvince && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            City *
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400">
              <FaCity />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => {
                onCityChange(e.target.value);
                onAreaChange('');
              }}
              className={`w-full px-4 py-3 pl-11 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white ${
                errors?.city ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Select City</option>
              {getCitiesForProvince().map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors?.city && (
            <p className="text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>
      )}

      {/* Area Selection */}
      {showArea && selectedCity && getAreasForCity().length > 0 && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Area/Locality (Optional)
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400">
              <FaMapPin />
            </div>
            <select
              value={selectedArea}
              onChange={(e) => onAreaChange(e.target.value)}
              className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select Area</option>
              {getAreasForCity().map(area => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Selected Location Summary */}
      {(selectedProvince || selectedCity) && (
        <div className="p-4 bg-[var(--bg-light)]/30 rounded-lg border border-[var(--accent-color)]/20">
          <div className="flex items-center">
            <div className="mr-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[var(--accent-color)] flex items-center justify-center">
                <FaMapMarkerAlt className="text-[var(--primary-color)]" />
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Selected Location</p>
              <p className="text-sm text-gray-600">
                {selectedProvince && (
                  <span className="font-medium text-[var(--primary-color)]">{getProvinceName()}</span>
                )}
                {selectedCity && (
                  <span> → <span className="font-medium">{selectedCity}</span></span>
                )}
                {selectedArea && (
                  <span> → <span className="font-medium">{selectedArea}</span></span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvinceCitySelector;
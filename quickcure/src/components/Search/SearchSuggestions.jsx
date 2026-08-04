// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { FaSearch, FaUserMd, FaFlask, FaPills, FaTimes, FaArrowRight } from 'react-icons/fa';
// // // import { getSuggestions } from '../../api/searchApi';

// // // const SearchSuggestions = ({ 
// // //   placeholder = "Search doctors, labs, pharmacies...", 
// // //   onSearch,
// // //   autoFocus = false 
// // // }) => {
// // //   const [query, setQuery] = useState('');
// // //   const [suggestions, setSuggestions] = useState([]);
// // //   const [showSuggestions, setShowSuggestions] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [selectedIndex, setSelectedIndex] = useState(-1);
// // //   const [isFocused, setIsFocused] = useState(false);
  
// // //   const navigate = useNavigate();
// // //   const inputRef = useRef(null);
// // //   const suggestionsRef = useRef(null);

// // //   // Fetch suggestions when query changes
// // //   useEffect(() => {
// // //     const fetchSuggestions = async () => {
// // //       if (query.trim().length >= 1) {
// // //         setLoading(true);
// // //         const result = await getSuggestions(query);
// // //         if (result.success && result.data.suggestions) {
// // //           setSuggestions(result.data.suggestions);
// // //           setShowSuggestions(true);
// // //         } else {
// // //           setSuggestions([]);
// // //         }
// // //         setLoading(false);
// // //       } else {
// // //         setSuggestions([]);
// // //         setShowSuggestions(false);
// // //       }
// // //     };

// // //     const timeoutId = setTimeout(() => {
// // //       fetchSuggestions();
// // //     }, 300);

// // //     return () => clearTimeout(timeoutId);
// // //   }, [query]);

// // //   // Handle click outside to close suggestions
// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (
// // //         suggestionsRef.current && 
// // //         !suggestionsRef.current.contains(event.target) &&
// // //         !inputRef.current.contains(event.target)
// // //       ) {
// // //         setShowSuggestions(false);
// // //         setIsFocused(false);
// // //       }
// // //     };

// // //     document.addEventListener('mousedown', handleClickOutside);
// // //     return () => document.removeEventListener('mousedown', handleClickOutside);
// // //   }, []);

// // //   const handleInputChange = (e) => {
// // //     setQuery(e.target.value);
// // //     setSelectedIndex(-1);
// // //   };

// // //   const handleClear = () => {
// // //     setQuery('');
// // //     setSuggestions([]);
// // //     setShowSuggestions(false);
// // //     inputRef.current?.focus();
// // //   };

// // //   const handleSuggestionClick = (suggestion) => {
// // //     setQuery(suggestion.text);
// // //     setShowSuggestions(false);
    
// // //     if (suggestion.type === 'doctor' && suggestion.id) {
// // //       window.location.href = `/doctor/${suggestion.id}`;
// // //     } else if (suggestion.type === 'lab' && suggestion.id) {
// // //       window.location.href = `/labs/${suggestion.id}`;
// // //     } else if (suggestion.type === 'pharmacy' && suggestion.id) {
// // //       window.location.href = `/pharmacies/${suggestion.id}`;
// // //     } else {
// // //       window.location.href = `/search?q=${encodeURIComponent(suggestion.text)}&type=all`;
// // //     }
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     setShowSuggestions(false);
    
// // //     if (query.trim()) {
// // //       const searchUrl = `/doctors?search=${encodeURIComponent(query.trim())}`;
// // //       window.location.href = searchUrl;
// // //     }
// // //   };

// // //   const handleKeyDown = (e) => {
// // //     if (!showSuggestions || suggestions.length === 0) {
// // //       if (e.key === 'Enter') {
// // //         handleSubmit(e);
// // //       }
// // //       return;
// // //     }

// // //     switch (e.key) {
// // //       case 'ArrowDown':
// // //         e.preventDefault();
// // //         setSelectedIndex(prev => 
// // //           prev < suggestions.length - 1 ? prev + 1 : 0
// // //         );
// // //         break;
// // //       case 'ArrowUp':
// // //         e.preventDefault();
// // //         setSelectedIndex(prev => 
// // //           prev > 0 ? prev - 1 : suggestions.length - 1
// // //         );
// // //         break;
// // //       case 'Enter':
// // //         e.preventDefault();
// // //         if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
// // //           handleSuggestionClick(suggestions[selectedIndex]);
// // //         } else {
// // //           handleSubmit(e);
// // //         }
// // //         break;
// // //       case 'Escape':
// // //         setShowSuggestions(false);
// // //         setSelectedIndex(-1);
// // //         break;
// // //       default:
// // //         break;
// // //     }
// // //   };

// // //   const getIconForType = (type) => {
// // //     switch (type) {
// // //       case 'doctor':
// // //         return FaUserMd;
// // //       case 'lab':
// // //         return FaFlask;
// // //       case 'pharmacy':
// // //         return FaPills;
// // //       default:
// // //         return FaSearch;
// // //     }
// // //   };

// // //   const getLabelForType = (type) => {
// // //     switch (type) {
// // //       case 'doctor':
// // //         return 'Doctor';
// // //       case 'lab':
// // //         return 'Lab';
// // //       case 'pharmacy':
// // //         return 'Pharmacy';
// // //       default:
// // //         return '';
// // //     }
// // //   };

// // //   const getTypeColor = (type) => {
// // //     switch (type) {
// // //       case 'doctor':
// // //         return 'bg-blue-100 text-blue-600';
// // //       case 'lab':
// // //         return 'bg-purple-100 text-purple-600';
// // //       case 'pharmacy':
// // //         return 'bg-green-100 text-green-600';
// // //       default:
// // //         return 'bg-gray-100 text-gray-600';
// // //     }
// // //   };

// // //   return (
// // //     <div className="relative w-full max-w-4xl mx-auto">
// // //       <form onSubmit={handleSubmit} className="w-full">
// // //         <div className={`relative flex items-center bg-white rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl ${
// // //           isFocused || query ? 'ring-2 ring-primary/30 shadow-xl' : ''
// // //         }`}>
// // //           <div className="absolute left-5 text-primary/60">
// // //             <FaSearch className="text-xl" />
// // //           </div>
          
// // //           <input
// // //             ref={inputRef}
// // //             type="text"
// // //             placeholder={placeholder}
// // //             value={query}
// // //             onChange={handleInputChange}
// // //             onKeyDown={handleKeyDown}
// // //             onFocus={() => {
// // //               setIsFocused(true);
// // //               if (suggestions.length > 0) {
// // //                 setShowSuggestions(true);
// // //               }
// // //             }}
// // //             onBlur={() => setIsFocused(false)}
// // //             autoFocus={autoFocus}
// // //             className="flex-1 py-4 px-5 pl-14 text-base text-black outline-none bg-transparent w-full placeholder-gray-400 rounded-2xl"
// // //           />
          
// // //           {query && (
// // //             <button
// // //               type="button"
// // //               onClick={handleClear}
// // //               className="absolute right-16 text-gray-400 hover:text-gray-600 transition-colors"
// // //             >
// // //               <FaTimes className="text-lg" />
// // //             </button>
// // //           )}
          
// // //           {loading && (
// // //             <div className="absolute right-16 w-5 h-5 border-2 border-gray-200 border-t-primary rounded-full animate-spin" />
// // //           )}
          
// // //           <button
// // //             type="submit"
// // //             className="absolute right-2 bg-primary hover:bg-hover text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
// // //           >
// // //             Search
// // //           </button>
// // //         </div>
// // //       </form>

// // //       {showSuggestions && suggestions.length > 0 && (
// // //         <div 
// // //           ref={suggestionsRef} 
// // //           className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl max-h-[500px] overflow-y-auto z-[1000] animate-[slideDown_0.25s_ease-out] border border-gray-100"
// // //         >
// // //           <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
// // //             <span className="text-sm font-semibold text-black tracking-wide">
// // //               Quick Results
// // //             </span>
// // //             <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
// // //               {suggestions.length} found
// // //             </span>
// // //           </div>
          
// // //           {suggestions.map((suggestion, index) => {
// // //             const Icon = getIconForType(suggestion.type);
// // //             const typeColor = getTypeColor(suggestion.type);
// // //             return (
// // //               <div
// // //                 key={`${suggestion.text}-${suggestion.type}-${index}`}
// // //                 className={`group flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-all duration-200 border-b border-gray-50 last:border-b-0 ${
// // //                   index === selectedIndex 
// // //                     ? 'bg-primary/5 border-l-4 border-primary' 
// // //                     : 'hover:bg-gray-50/80'
// // //                 }`}
// // //                 onClick={() => handleSuggestionClick(suggestion)}
// // //                 onMouseEnter={() => setSelectedIndex(index)}
// // //               >
// // //                 <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${typeColor} flex-shrink-0 transition-transform group-hover:scale-110`}>
// // //                   <Icon className="text-lg" />
// // //                 </div>
                
// // //                 <div className="flex-1 min-w-0">
// // //                   <div className="text-base text-black font-medium truncate">
// // //                     {suggestion.text}
// // //                   </div>
// // //                   <div className="flex items-center gap-2 mt-0.5">
// // //                     <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColor}`}>
// // //                       {getLabelForType(suggestion.type)}
// // //                     </span>
// // //                     {suggestion.speciality && (
// // //                       <span className="text-xs text-gray-500">• {suggestion.speciality}</span>
// // //                     )}
// // //                     {suggestion.city && (
// // //                       <span className="text-xs text-gray-500">• {suggestion.city}</span>
// // //                     )}
// // //                   </div>
// // //                 </div>
                
// // //                 <div className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0">
// // //                   <FaArrowRight className="text-sm" />
// // //                 </div>
// // //               </div>
// // //             );
// // //           })}
          
// // //           <div className="px-5 py-3 bg-gray-50/50 rounded-b-2xl border-t border-gray-100">
// // //             <div className="text-xs text-gray-500 text-center">
// // //               Press <kbd className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs font-mono">Enter</kbd> to see all results
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <style jsx>{`
// // //         @keyframes slideDown {
// // //           from {
// // //             opacity: 0;
// // //             transform: translateY(-12px) scale(0.98);
// // //           }
// // //           to {
// // //             opacity: 1;
// // //             transform: translateY(0) scale(1);
// // //           }
// // //         }
        
// // //         .suggestions-dropdown::-webkit-scrollbar {
// // //           width: 6px;
// // //         }
// // //         .suggestions-dropdown::-webkit-scrollbar-track {
// // //           background: #f8f9fa;
// // //           border-radius: 10px;
// // //         }
// // //         .suggestions-dropdown::-webkit-scrollbar-thumb {
// // //           background: #2c6774;
// // //           border-radius: 10px;
// // //         }
// // //         .suggestions-dropdown::-webkit-scrollbar-thumb:hover {
// // //           background: #174047;
// // //         }
        
// // //         /* Smooth input focus transition */
// // //         input::placeholder {
// // //           transition: opacity 0.3s ease;
// // //         }
// // //         input:focus::placeholder {
// // //           opacity: 0.5;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default SearchSuggestions;






// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { FaSearch, FaUserMd, FaFlask, FaPills, FaTimes, FaArrowRight } from 'react-icons/fa';
// // import { getSuggestions } from '../../api/searchApi';

// // const SearchSuggestions = ({ 
// //   placeholder = "Search doctors, labs, pharmacies...", 
// //   onSearch,
// //   autoFocus = false 
// // }) => {
// //   const [query, setQuery] = useState('');
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [selectedIndex, setSelectedIndex] = useState(-1);
// //   const [isFocused, setIsFocused] = useState(false);
  
// //   const navigate = useNavigate();
// //   const inputRef = useRef(null);
// //   const suggestionsRef = useRef(null);

// //   // Fetch suggestions when query changes
// //   useEffect(() => {
// //     const fetchSuggestions = async () => {
// //       if (query.trim().length >= 1) {
// //         setLoading(true);
// //         try {
// //           const result = await getSuggestions(query);
// //           if (result.success && result.data.suggestions) {
// //             setSuggestions(result.data.suggestions);
// //             setShowSuggestions(true);
// //           } else {
// //             setSuggestions([]);
// //             setShowSuggestions(false);
// //           }
// //         } catch (error) {
// //           console.error('Error fetching suggestions:', error);
// //           setSuggestions([]);
// //           setShowSuggestions(false);
// //         }
// //         setLoading(false);
// //       } else {
// //         setSuggestions([]);
// //         setShowSuggestions(false);
// //       }
// //     };

// //     // Only fetch if component is mounted and not currently loading
// //     if (!loading) {
// //       fetchSuggestions();
// //     }
// //   }, [query]);

// //   // Handle click outside to close suggestions
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         suggestionsRef.current && 
// //         !suggestionsRef.current.contains(event.target) &&
// //         !inputRef.current.contains(event.target)
// //       ) {
// //         setShowSuggestions(false);
// //         setIsFocused(false);
// //       }
// //     };

// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   const handleInputChange = (e) => {
// //     setQuery(e.target.value);
// //     setSelectedIndex(-1);
// //   };

// //   const handleClear = () => {
// //     setQuery('');
// //     setSuggestions([]);
// //     setShowSuggestions(false);
// //     inputRef.current?.focus();
// //   };

// //   const handleSuggestionClick = (suggestion) => {
// //     setQuery(suggestion.text);
// //     setShowSuggestions(false);
    
// //     if (suggestion.type === 'doctor' && suggestion.id) {
// //       window.location.href = `/doctor/${suggestion.id}`;
// //     } else if (suggestion.type === 'lab' && suggestion.id) {
// //       window.location.href = `/labs/${suggestion.id}`;
// //     } else if (suggestion.type === 'pharmacy' && suggestion.id) {
// //       window.location.href = `/pharmacies/${suggestion.id}`;
// //     } else {
// //       window.location.href = `/search?q=${encodeURIComponent(suggestion.text)}&type=all`;
// //     }
// //   };

// //   const handleSearchClick = (e) => {
// //     console.log('=== SEARCH CLICKED ===');
// //     console.log('Query:', query);
// //     console.log('Event:', e);
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setShowSuggestions(false);
    
// //     if (query.trim()) {
// //       const searchUrl = `/doctors?search=${encodeURIComponent(query.trim())}`;
// //       console.log('Redirecting to:', searchUrl);
// //       window.location.href = searchUrl;
// //     } else {
// //       console.log('Query is empty, not redirecting');
// //     }
// //   };

// //   const handleKeyDown = (e) => {
// //     if (e.key === 'Escape') {
// //       setShowSuggestions(false);
// //       setSelectedIndex(-1);
// //       return;
// //     }

// //     switch (e.key) {
// //       case 'ArrowDown':
// //         e.preventDefault();
// //         setSelectedIndex(prev => 
// //           prev < suggestions.length - 1 ? prev + 1 : 0
// //         );
// //         break;
// //       case 'ArrowUp':
// //         e.preventDefault();
// //         setSelectedIndex(prev => 
// //           prev > 0 ? prev - 1 : suggestions.length - 1
// //         );
// //         break;
// //       case 'Enter':
// //         e.preventDefault();
// //         if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
// //           handleSuggestionClick(suggestions[selectedIndex]);
// //         } else {
// //           handleSearchClick();
// //         }
// //         break;
// //       default:
// //         break;
// //     }
// //   };

// //   const getIconForType = (type) => {
// //     switch (type) {
// //       case 'doctor':
// //         return FaUserMd;
// //       case 'lab':
// //         return FaFlask;
// //       case 'pharmacy':
// //         return FaPills;
// //       default:
// //         return FaSearch;
// //     }
// //   };

// //   const getLabelForType = (type) => {
// //     switch (type) {
// //       case 'doctor':
// //         return 'Doctor';
// //       case 'lab':
// //         return 'Lab';
// //       case 'pharmacy':
// //         return 'Pharmacy';
// //       default:
// //         return '';
// //     }
// //   };

// //   const getTypeColor = (type) => {
// //     switch (type) {
// //       case 'doctor':
// //         return 'bg-blue-100 text-blue-600';
// //       case 'lab':
// //         return 'bg-purple-100 text-purple-600';
// //       case 'pharmacy':
// //         return 'bg-green-100 text-green-600';
// //       default:
// //         return 'bg-gray-100 text-gray-600';
// //     }
// //   };

// //   return (
// //     <div className="relative w-full max-w-2xl mx-auto">
// //       {/* <div className="w-full">
// //         <div className="relative flex items-center bg-white  rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-var[--secondary-color]/30 focus-within:border-var[--secondary-color]/40">
// //           <FaSearch className="absolute text-[#174047] left-5 text-var[--secondary-color]/60 text-xl" />
          
// //           <input
// //             ref={inputRef}
// //             type="text"
// //             placeholder={placeholder}
// //             value={query}
// //             onChange={handleInputChange}
// //             onKeyDown={handleKeyDown}
// //             onFocus={() => {
// //               setIsFocused(true);
// //               if (suggestions.length > 0) {
// //                 setShowSuggestions(true);
// //               }
// //             }}
// //             onBlur={() => setIsFocused(false)}
// //             autoFocus={autoFocus}
// //             className="flex-1 py-4 px-6 pl-14 text-base text-black outline-none bg-transparent rounded-full placeholder-gray-400"
// //           />
          
// //           {query && (
// //             <button
// //               type="button"
// //               onClick={handleClear}
// //               className="absolute right-20 text-gray-400 hover:text-gray-600 transition-colors"
// //             >
// //               <FaTimes className="text-lg" />
// //             </button>
// //           )}
          
// //           {loading && (
// //             <div className="absolute right-20 w-5 h-5 border-2 border-gray-200 border-t-secondary rounded-full animate-spin" />
// //           )}
          
// //           <button
// //             type="button"
// //             onClick={handleSearchClick}
// //             className="bg-[var(--secondary-color)] hover:bg-var[--primary-color] text-white rounded-full px-6 py-2.5 mx-2 font-medium transition-all duration-300 hover:scale-105 active:scale-95"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </div> */}
// // <div className="w-full max-w-2xl mx-auto">
// //   <div className="relative flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[var(--secondary-color)]/30 focus-within:border-[var(--secondary-color)]/40">
// //     <FaSearch className="absolute text-[#174047] left-5 text-[var(--secondary-color)]/60 text-xl" />
    
// //     <input
// //       ref={inputRef}
// //       type="text"
// //       placeholder={placeholder}
// //       value={query}
// //       onChange={handleInputChange}
// //       onKeyDown={handleKeyDown}
// //       onFocus={() => {
// //         setIsFocused(true);
// //         if (suggestions.length > 0) {
// //           setShowSuggestions(true);
// //         }
// //       }}
// //       onBlur={() => setIsFocused(false)}
// //       autoFocus={autoFocus}
// //       className="flex-1 py-4 px-6 pl-14 text-base text-black outline-none bg-transparent rounded-full placeholder-gray-400"
// //     />
    
// //     {query && (
// //       <button
// //         type="button"
// //         onClick={handleClear}
// //         className="absolute right-20 text-gray-400 hover:text-gray-600 transition-colors"
// //       >
// //         <FaTimes className="text-lg" />
// //       </button>
// //     )}
    
// //     {loading && (
// //       <div className="absolute right-20 w-5 h-5 border-2 border-gray-200 border-t-[var(--secondary-color)] rounded-full animate-spin" />
// //     )}
    
// //     <button
// //       type="button"
// //       onClick={handleSearchClick}
// //       className="bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white rounded-full px-6 py-2.5 mx-2 font-medium transition-all duration-300 hover:scale-105 active:scale-95"
// //     >
// //       Search
// //     </button>
// //   </div>
// // </div>
// //       {showSuggestions && suggestions.length > 0 && (
// //         <div 
// //           ref={suggestionsRef} 
// //           className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl max-h-[450px] overflow-y-auto z-[1000] animate-[slideDown_0.25s_ease-out] border border-gray-100"
// //         >
// //           <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
// //             <span className="text-sm font-semibold text-black tracking-wide">
// //               Suggestions
// //             </span>
// //             <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium">
// //               {suggestions.length} results
// //             </span>
// //           </div>
          
// //           {suggestions.map((suggestion, index) => {
// //             const Icon = getIconForType(suggestion.type);
// //             const typeColor = getTypeColor(suggestion.type);
// //             return (
// //               <div
// //                 key={`${suggestion.text}-${suggestion.type}-${index}`}
// //                 className={`group flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-all duration-200 border-b border-gray-50 last:border-b-0 ${
// //                   index === selectedIndex 
// //                     ? 'bg-secondary/5 border-l-4 border-secondary' 
// //                     : 'hover:bg-gray-50/80'
// //                 }`}
// //                 onClick={() => handleSuggestionClick(suggestion)}
// //                 onMouseEnter={() => setSelectedIndex(index)}
// //               >
// //                 <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${typeColor} flex-shrink-0 transition-transform group-hover:scale-110`}>
// //                   <Icon className="text-lg" />
// //                 </div>
                
// //                 <div className="flex-1 min-w-0">
// //                   <div className="text-base text-black font-medium truncate">
// //                     {suggestion.text}
// //                   </div>
// //                   <div className="flex items-center gap-2 mt-0.5">
// //                     <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColor}`}>
// //                       {getLabelForType(suggestion.type)}
// //                     </span>
// //                     {suggestion.speciality && (
// //                       <span className="text-xs text-gray-500">• {suggestion.speciality}</span>
// //                     )}
// //                     {suggestion.city && (
// //                       <span className="text-xs text-gray-500">• {suggestion.city}</span>
// //                     )}
// //                   </div>
// //                 </div>
                
// //                 <div className="text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0">
// //                   <FaArrowRight className="text-sm" />
// //                 </div>
// //               </div>
// //             );
// //           })}
          
// //           <div className="px-5 py-3 bg-gray-50/50 rounded-b-2xl border-t border-gray-100">
// //             <div className="text-xs text-gray-500 text-center">
// //               Press <kbd className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs font-mono">Enter</kbd> to see all results
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {showSuggestions && suggestions.length === 0 && query.trim().length >= 1 && !loading && (
// //         <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl z-[1000] animate-[slideDown_0.25s_ease-out] border border-gray-100">
// //           <div className="px-5 py-8 text-center">
// //             <div className="text-gray-400 text-5xl mb-3">🔍</div>
// //             <p className="text-gray-600 font-medium mb-1">No results found</p>
// //             <p className="text-gray-500 text-sm">Try searching for doctors, labs, or pharmacies</p>
// //           </div>
// //         </div>
// //       )}

// //       <style jsx>{`
// //         @keyframes slideDown {
// //           from {
// //             opacity: 0;
// //             transform: translateY(-12px) scale(0.98);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0) scale(1);
// //           }
// //         }
        
// //         .suggestions-dropdown::-webkit-scrollbar {
// //           width: 6px;
// //         }
// //         .suggestions-dropdown::-webkit-scrollbar-track {
// //           background: #f8f9fa;
// //           border-radius: 10px;
// //         }
// //         .suggestions-dropdown::-webkit-scrollbar-thumb {
// //           background: #2c6774;
// //           border-radius: 10px;
// //         }
// //         .suggestions-dropdown::-webkit-scrollbar-thumb:hover {
// //           background: #174047;
// //         }
        
// //         input::placeholder {
// //           transition: opacity 0.3s ease;
// //         }
// //         input:focus::placeholder {
// //           opacity: 0.5;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default SearchSuggestions;


// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaSearch, FaUserMd, FaFlask, FaPills, FaArrowRight } from 'react-icons/fa';
// import { getSuggestions } from '../../api/searchApi';

// const SearchSuggestions = ({ 
//   placeholder = "Search doctors, labs, pharmacies...", 
//   onSearch,
//   autoFocus = false 
// }) => {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [isFocused, setIsFocused] = useState(false);
  
//   const navigate = useNavigate();
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);
//   const debounceTimeoutRef = useRef(null);

//   // Fetch suggestions when query changes with debounce
//   useEffect(() => {
//     // Clear previous timeout
//     if (debounceTimeoutRef.current) {
//       clearTimeout(debounceTimeoutRef.current);
//     }

//     const fetchSuggestions = async () => {
//       if (query.trim().length >= 1) {
//         setLoading(true);
//         try {
//           const result = await getSuggestions(query);
//           if (result.success && result.data.suggestions) {
//             setSuggestions(result.data.suggestions);
//             setShowSuggestions(true);
//           } else {
//             setSuggestions([]);
//             setShowSuggestions(false);
//           }
//         } catch (error) {
//           console.error('Error fetching suggestions:', error);
//           setSuggestions([]);
//           setShowSuggestions(false);
//         }
//         setLoading(false);
//       } else {
//         setSuggestions([]);
//         setShowSuggestions(false);
//       }
//     };

//     // Debounce the API call
//     debounceTimeoutRef.current = setTimeout(fetchSuggestions, 300);

//     return () => {
//       if (debounceTimeoutRef.current) {
//         clearTimeout(debounceTimeoutRef.current);
//       }
//     };
//   }, [query]);

//   // Handle click outside to close suggestions
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         suggestionsRef.current && 
//         !suggestionsRef.current.contains(event.target) &&
//         !inputRef.current.contains(event.target)
//       ) {
//         setShowSuggestions(false);
//         setIsFocused(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//     setSelectedIndex(-1);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setQuery(suggestion.text);
//     setShowSuggestions(false);
    
//     if (suggestion.type === 'doctor' && suggestion.id) {
//       window.location.href = `/doctor/${suggestion.id}`;
//     } else if (suggestion.type === 'lab' && suggestion.id) {
//       window.location.href = `/labs/${suggestion.id}`;
//     } else if (suggestion.type === 'pharmacy' && suggestion.id) {
//       window.location.href = `/pharmacies/${suggestion.id}`;
//     } else {
//       window.location.href = `/search?q=${encodeURIComponent(suggestion.text)}&type=all`;
//     }
//   };

//   const handleSearchClick = (e) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     setShowSuggestions(false);
    
//     if (query.trim()) {
//       const searchUrl = `/doctors?search=${encodeURIComponent(query.trim())}`;
//       window.location.href = searchUrl;
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Escape') {
//       setShowSuggestions(false);
//       setSelectedIndex(-1);
//       inputRef.current?.blur();
//       return;
//     }

//     // Handle Enter key
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
//         handleSuggestionClick(suggestions[selectedIndex]);
//       } else {
//         handleSearchClick();
//       }
//       return;
//     }

//     // Handle arrow keys for navigation
//     if (showSuggestions && suggestions.length > 0) {
//       switch (e.key) {
//         case 'ArrowDown':
//           e.preventDefault();
//           setSelectedIndex(prev => 
//             prev < suggestions.length - 1 ? prev + 1 : 0
//           );
//           break;
//         case 'ArrowUp':
//           e.preventDefault();
//           setSelectedIndex(prev => 
//             prev > 0 ? prev - 1 : suggestions.length - 1
//           );
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   const getIconForType = (type) => {
//     switch (type) {
//       case 'doctor':
//         return FaUserMd;
//       case 'lab':
//         return FaFlask;
//       case 'pharmacy':
//         return FaPills;
//       default:
//         return FaSearch;
//     }
//   };

//   const getLabelForType = (type) => {
//     switch (type) {
//       case 'doctor':
//         return 'Doctor';
//       case 'lab':
//         return 'Lab';
//       case 'pharmacy':
//         return 'Pharmacy';
//       default:
//         return '';
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'doctor':
//         return 'bg-blue-100 text-blue-600';
//       case 'lab':
//         return 'bg-purple-100 text-purple-600';
//       case 'pharmacy':
//         return 'bg-green-100 text-green-600';
//       default:
//         return 'bg-gray-100 text-gray-600';
//     }
//   };

//   return (
//     <div className="relative w-full max-w-2xl mx-auto">
//       <div className="w-full max-w-2xl mx-auto">
//         <div className="relative flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[var(--secondary-color)]/30 focus-within:border-[var(--secondary-color)]/40">
//           <FaSearch className="absolute text-[#174047] left-5 text-[var(--secondary-color)]/60 text-xl" />
          
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder={placeholder}
//             value={query}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             onFocus={() => {
//               setIsFocused(true);
//               if (suggestions.length > 0) {
//                 setShowSuggestions(true);
//               }
//             }}
//             onBlur={() => setIsFocused(false)}
//             autoFocus={autoFocus}
//             className="flex-1 py-4 px-6 pl-14 text-base text-black outline-none bg-transparent rounded-full placeholder-gray-400"
//           />
          
//           {/* Loading spinner - positioned to the left of search button */}
//           {loading && (
//             <div className="absolute right-24 w-5 h-5 border-2 border-gray-200 border-t-[var(--secondary-color)] rounded-full animate-spin" />
//           )}
          
//           <button
//             type="button"
//             onClick={handleSearchClick}
//             className="bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white rounded-full px-6 py-2.5 mx-2 font-medium transition-all duration-300 hover:scale-105 active:scale-95"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Suggestions dropdown */}
//       {showSuggestions && suggestions.length > 0 && (
//         <div 
//           ref={suggestionsRef} 
//           className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl max-h-[450px] overflow-y-auto z-[1000] animate-[slideDown_0.25s_ease-out] border border-gray-100"
//         >
//           <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-100">
//             <span className="text-sm font-semibold text-black tracking-wide">
//               Suggestions
//             </span>
//             <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium">
//               {suggestions.length} results
//             </span>
//           </div>
          
//           {suggestions.map((suggestion, index) => {
//             const Icon = getIconForType(suggestion.type);
//             const typeColor = getTypeColor(suggestion.type);
//             return (
//               <div
//                 key={`${suggestion.text}-${suggestion.type}-${index}`}
//                 className={`group flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-all duration-200 border-b border-gray-50 last:border-b-0 ${
//                   index === selectedIndex 
//                     ? 'bg-secondary/5 border-l-4 border-secondary' 
//                     : 'hover:bg-gray-50/80'
//                 }`}
//                 onClick={() => handleSuggestionClick(suggestion)}
//                 onMouseEnter={() => setSelectedIndex(index)}
//               >
//                 <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${typeColor} flex-shrink-0 transition-transform group-hover:scale-110`}>
//                   <Icon className="text-lg" />
//                 </div>
                
//                 <div className="flex-1 min-w-0">
//                   <div className="text-base text-black font-medium truncate">
//                     {suggestion.text}
//                   </div>
//                   <div className="flex items-center gap-2 mt-0.5">
//                     <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColor}`}>
//                       {getLabelForType(suggestion.type)}
//                     </span>
//                     {suggestion.speciality && (
//                       <span className="text-xs text-gray-500">• {suggestion.speciality}</span>
//                     )}
//                     {suggestion.city && (
//                       <span className="text-xs text-gray-500">• {suggestion.city}</span>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0">
//                   <FaArrowRight className="text-sm" />
//                 </div>
//               </div>
//             );
//           })}
          
//           <div className="px-5 py-3 bg-gray-50/50 rounded-b-2xl border-t border-gray-100">
//             <div className="text-xs text-gray-500 text-center">
//               Press <kbd className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs font-mono">Enter</kbd> to see all results
//             </div>
//           </div>
//         </div>
//       )}

//       {/* No results message */}
//       {showSuggestions && suggestions.length === 0 && query.trim().length >= 1 && !loading && (
//         <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl z-[1000] animate-[slideDown_0.25s_ease-out] border border-gray-100">
//           <div className="px-5 py-8 text-center">
//             <div className="text-gray-400 text-5xl mb-3">🔍</div>
//             <p className="text-gray-600 font-medium mb-1">No results found</p>
//             <p className="text-gray-500 text-sm">Try searching for doctors, labs, or pharmacies</p>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-12px) scale(0.98);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
        
//         .suggestions-dropdown::-webkit-scrollbar {
//           width: 6px;
//         }
//         .suggestions-dropdown::-webkit-scrollbar-track {
//           background: #f8f9fa;
//           border-radius: 10px;
//         }
//         .suggestions-dropdown::-webkit-scrollbar-thumb {
//           background: #2c6774;
//           border-radius: 10px;
//         }
//         .suggestions-dropdown::-webkit-scrollbar-thumb:hover {
//           background: #174047;
//         }
        
//         input::placeholder {
//           transition: opacity 0.3s ease;
//         }
//         input:focus::placeholder {
//           opacity: 0.5;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SearchSuggestions;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUserMd, FaFlask, FaPills, FaArrowRight } from 'react-icons/fa';
import { getSuggestions } from '../../api/searchApi';

const SearchSuggestions = ({ 
  placeholder = "Search doctors, labs, pharmacies...", 
  onSearch,
  autoFocus = false 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  // Fetch suggestions when query changes with debounce
  useEffect(() => {
    // Clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    const fetchSuggestions = async () => {
      if (query.trim().length >= 1) {
        setLoading(true);
        try {
          const result = await getSuggestions(query);
          if (result.success && result.data.suggestions) {
            setSuggestions(result.data.suggestions);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
        setLoading(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    // Debounce the API call
    debounceTimeoutRef.current = setTimeout(fetchSuggestions, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    
    if (suggestion.type === 'doctor' && suggestion.id) {
      window.location.href = `/doctor/${suggestion.id}`;
    } else if (suggestion.type === 'lab' && suggestion.id) {
      window.location.href = `/labs/${suggestion.id}`;
    } else if (suggestion.type === 'pharmacy' && suggestion.id) {
      window.location.href = `/pharmacies/${suggestion.id}`;
    } else {
      window.location.href = `/search?q=${encodeURIComponent(suggestion.text)}&type=all`;
    }
  };

  const handleSearchClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowSuggestions(false);
    
    if (query.trim()) {
      const searchUrl = `/doctors?search=${encodeURIComponent(query.trim())}`;
      window.location.href = searchUrl;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
      inputRef.current?.blur();
      return;
    }

    // Handle Enter key
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        handleSearchClick();
      }
      return;
    }

    // Handle arrow keys for navigation
    if (showSuggestions && suggestions.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        default:
          break;
      }
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'doctor':
        return FaUserMd;
      case 'lab':
        return FaFlask;
      case 'pharmacy':
        return FaPills;
      default:
        return FaSearch;
    }
  };

  const getLabelForType = (type) => {
    switch (type) {
      case 'doctor':
        return 'Doctor';
      case 'lab':
        return 'Lab';
      case 'pharmacy':
        return 'Pharmacy';
      default:
        return '';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'doctor':
        return 'bg-blue-100 text-blue-600';
      case 'lab':
        return 'bg-purple-100 text-purple-600';
      case 'pharmacy':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="w-full max-w-md mx-auto">
        <div className="relative flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[var(--secondary-color)]/30 focus-within:border-[var(--secondary-color)]/40">
          <FaSearch className="absolute text-[#174047] left-4 text-[var(--secondary-color)]/60 text-base" />
          
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true);
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => setIsFocused(false)}
            autoFocus={autoFocus}
            className="flex-1 py-3 px-4 pl-11 text-sm text-black outline-none bg-transparent rounded-full placeholder-gray-400"
          />
          
          {/* Loading spinner - positioned to the left of search button */}
          {loading && (
            <div className="absolute right-20 w-4 h-4 border-2 border-gray-200 border-t-[var(--secondary-color)] rounded-full animate-spin" />
          )}
          
          <button
            type="button"
            onClick={handleSearchClick}
            className="bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white rounded-full px-4 py-1.5 mx-1.5 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef} 
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl max-h-[350px] overflow-y-auto z-[1000] animate-[slideDown_0.25s_ease-out] border border-gray-100"
        >
          <div className="flex justify-between items-center px-4 py-2.5 border-b border-gray-100">
            <span className="text-xs font-semibold text-black tracking-wide">
              Suggestions
            </span>
            <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full text-[10px] font-medium">
              {suggestions.length} results
            </span>
          </div>
          
          {suggestions.map((suggestion, index) => {
            const Icon = getIconForType(suggestion.type);
            const typeColor = getTypeColor(suggestion.type);
            return (
              <div
                key={`${suggestion.text}-${suggestion.type}-${index}`}
                className={`group flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-200 border-b border-gray-50 last:border-b-0 ${
                  index === selectedIndex 
                    ? 'bg-secondary/5 border-l-4 border-secondary' 
                    : 'hover:bg-gray-50/80'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${typeColor} flex-shrink-0 transition-transform group-hover:scale-110`}>
                  <Icon className="text-sm" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-black font-medium truncate">
                    {suggestion.text}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${typeColor}`}>
                      {getLabelForType(suggestion.type)}
                    </span>
                    {suggestion.speciality && (
                      <span className="text-[10px] text-gray-500">• {suggestion.speciality}</span>
                    )}
                    {suggestion.city && (
                      <span className="text-[10px] text-gray-500">• {suggestion.city}</span>
                    )}
                  </div>
                </div>
                
                <div className="text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 flex-shrink-0">
                  <FaArrowRight className="text-xs" />
                </div>
              </div>
            );
          })}
          
          <div className="px-4 py-2 bg-gray-50/50 rounded-b-xl border-t border-gray-100">
            <div className="text-[10px] text-gray-500 text-center">
              Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono">Enter</kbd> to see all results
            </div>
          </div>
        </div>
      )}

      {/* No results message */}
      {showSuggestions && suggestions.length === 0 && query.trim().length >= 1 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl z-[1000] animate-[slideDown_0.25s_ease-out] border border-gray-100">
          <div className="px-4 py-6 text-center">
            <div className="text-gray-400 text-4xl mb-2">🔍</div>
            <p className="text-gray-600 font-medium text-sm mb-0.5">No results found</p>
            <p className="text-gray-500 text-xs">Try searching for doctors, labs, or pharmacies</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .suggestions-dropdown::-webkit-scrollbar {
          width: 6px;
        }
        .suggestions-dropdown::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 10px;
        }
        .suggestions-dropdown::-webkit-scrollbar-thumb {
          background: #2c6774;
          border-radius: 10px;
        }
        .suggestions-dropdown::-webkit-scrollbar-thumb:hover {
          background: #174047;
        }
        
        input::placeholder {
          transition: opacity 0.3s ease;
        }
        input:focus::placeholder {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default SearchSuggestions;
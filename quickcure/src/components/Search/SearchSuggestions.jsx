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
    <div className="relative w-80 max-w-md">
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
          {/* {loading && (
            <div className="absolute right-20 w-4 h-4 border-2 border-gray-200 border-t-[var(--secondary-color)] rounded-full animate-spin" />
          )}
           */}
          {/* <button
            type="button"
            onClick={handleSearchClick}
            className="bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white rounded-full px-4 py-1.5 mx-1.5 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Search
          </button> */}
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
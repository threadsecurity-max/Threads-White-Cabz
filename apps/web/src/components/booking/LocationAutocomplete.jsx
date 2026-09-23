import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Check, ChevronDown, X, Navigation } from 'lucide-react';
import { ALL_LOCATIONS, INDIA_STATES_DATA } from '../../data/indiaLocations';

export function LocationAutocomplete({
  value = '',
  onChange,
  placeholder = 'Select or type City / District / Airport...',
  label,
  icon: Icon = MapPin,
  error,
  required = false,
  autoFocus = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStateTab, setActiveStateTab] = useState('All');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = ALL_LOCATIONS.filter((loc) => {
    const matchesSearch =
      searchQuery === '' ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.state.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesState =
      activeStateTab === 'All' || loc.state === activeStateTab;

    return matchesSearch && matchesState;
  });

  const handleSelect = (selectedLabel) => {
    onChange(selectedLabel);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    onChange(text);
    setSearchQuery(text);
    if (!isOpen) setIsOpen(true);
  };

  const clearInput = (e) => {
    e.stopPropagation();
    onChange('');
    setSearchQuery('');
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className={`relative space-y-1 ${className}`} ref={containerRef}>
      {label && (
        <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
          <span>
            {label} {required && <span className="text-rose-600">*</span>}
          </span>
          {value && (
            <span className="text-[10px] text-brand-gold-dark font-medium uppercase tracking-wider">
              Selected
            </span>
          )}
        </label>
      )}

      <div
        className={`relative flex items-center bg-brand-subtle/80 hover:bg-white border rounded-xl transition-all shadow-2xs ${
          isOpen
            ? 'border-brand-gold ring-2 ring-brand-gold/20 bg-white'
            : error
            ? 'border-rose-400 bg-rose-50/30'
            : 'border-brand-border'
        }`}
      >
        <div className="pl-3.5 pr-2 text-brand-gold-dark shrink-0">
          <Icon className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full bg-transparent py-2.5 text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none min-h-[44px]"
        />

        {value ? (
          <button
            type="button"
            onClick={clearInput}
            className="p-2 text-slate-400 hover:text-slate-700 transition-colors shrink-0"
            title="Clear selection"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-400 hover:text-slate-700 transition-colors shrink-0"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-brand-gold-dark' : ''
              }`}
            />
          </button>
        )}
      </div>

      {error && <p className="text-[11px] text-rose-600">{error}</p>}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-brand-gold/30 rounded-2xl shadow-premium overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[380px] flex flex-col">
          {/* Search bar inside dropdown */}
          <div className="p-2.5 bg-brand-subtle/80 border-b border-brand-border flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all Indian cities & districts..."
              className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-slate-400 hover:text-slate-700 px-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* State Filter Chips */}
          <div className="px-2.5 py-1.5 bg-slate-50/70 border-b border-brand-border flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              type="button"
              onClick={() => setActiveStateTab('All')}
              className={`text-[11px] px-2.5 py-0.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                activeStateTab === 'All'
                  ? 'bg-brand-gold text-white font-bold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All States ({ALL_LOCATIONS.length})
            </button>
            {INDIA_STATES_DATA.map((item) => (
              <button
                key={item.state}
                type="button"
                onClick={() => setActiveStateTab(item.state)}
                className={`text-[11px] px-2.5 py-0.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  activeStateTab === item.state
                    ? 'bg-brand-gold text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.state}
              </button>
            ))}
          </div>

          {/* List of locations */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-100 p-1 max-h-[260px]">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => {
                const isSelected = value === loc.label || value === loc.name;
                return (
                  <button
                    key={`${loc.state}-${loc.name}`}
                    type="button"
                    onClick={() => handleSelect(loc.label)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-brand-gold-50/80 text-brand-gold-dark font-bold'
                        : 'hover:bg-brand-subtle text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                          loc.name.includes('Airport')
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-brand-gold-50 text-brand-gold-dark'
                        }`}
                      >
                        <Navigation className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <span className="font-semibold block truncate">
                          {loc.name}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          {loc.state} • {loc.category}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-brand-gold shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center space-y-2">
                <p className="text-xs text-slate-500">
                  No predefined city found for "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => handleSelect(searchQuery)}
                  className="text-xs font-bold text-brand-gold-dark hover:underline bg-brand-gold-50 px-3 py-1.5 rounded-xl inline-block"
                >
                  Use "{searchQuery}" as custom location
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

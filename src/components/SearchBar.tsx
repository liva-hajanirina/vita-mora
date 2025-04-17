
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Rechercher...", 
  onSearch = () => {} 
}) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="relative mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 pr-10 rounded-lg border border-gray-200 focus:border-vitamora-orange focus:ring-1 focus:ring-vitamora-orange outline-none"
      />
      <button 
        type="submit" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        <Search size={20} className="text-gray-400" />
      </button>
    </form>
  );
};

export default SearchBar;

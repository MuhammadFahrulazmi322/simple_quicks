import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="flex items-center py-2 px-4 bg-gray-700 border-b border-gray-600">
      <FaSearch className="text-white" />

      <input
        type="text"
        className="flex-1 p-2 bg-gray-700"
      />
    </div>
  );
};

export default SearchBar;

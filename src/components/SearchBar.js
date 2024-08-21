import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="flex items-center py-2 px-4 bg-gray-700 border-b border-gray-600 gap-2">
      <Image src="/search.svg" width={18} height={18} />
      <input
        type="text"
        className="flex-1 p-2 bg-gray-700"
      />
    </div>
  );
};

export default SearchBar;

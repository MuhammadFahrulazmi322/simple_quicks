import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import FloatingActionButton from '../components/FloatingActionButton';

export default function Home() {
  const [selectedMessage, setSelectedMessage] = useState(null);

  return (
    <div className="flex h-screen bg-gray-900 font-lato">
      {/* Sidebar Kosong */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Input Search di Atas */}
        <SearchBar />

        <div className="flex-1 flex items-center justify-center">
        </div>
      </div>

      <FloatingActionButton />
    </div>
  );
}

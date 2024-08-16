import { useState } from 'react';
import { FaBolt, FaTasks, FaInbox } from 'react-icons/fa';
import InboxList from './InboxList';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  const toggleFab = () => {
    setIsOpen(!isOpen);
  };

  const toggleInbox = () => {
    setIsInboxOpen(!isInboxOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-row gap-2 items-end">
      {/* FAB untuk Task dan Inbox, muncul hanya jika isOpen == true */}
      {isOpen && (
        <>
          <div className="flex flex-col items-center gap-2">
            <p className="text-white">Task</p>
            <button 
              onClick={() => alert('Task FAB clicked!')} 
              className="p-4 bg-white text-orange-300 rounded-full shadow-lg flex items-center"
            >
              <FaTasks size={20} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-white">Inbox</p>
            <button 
              onClick={toggleInbox} 
              className="p-4 bg-white text-purple-400 rounded-full shadow-lg flex items-center"
            >
              <FaInbox size={20} />
            </button>
          </div>
        </>
      )}

      {/* FAB utama */}
      <button 
        onClick={toggleFab} 
        className="p-4 bg-blue-500 text-white rounded-full shadow-lg"
      >
        <FaBolt size={24} />
      </button>

      {/* Inbox List as a large floating box */}
      {isInboxOpen && (
        <div className="fixed bottom-20 right-4 xl:w-[512px] w-96 h-96 bg-white rounded-lg shadow-lg">
          <InboxList onSelectMessage={() => {}} />
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;

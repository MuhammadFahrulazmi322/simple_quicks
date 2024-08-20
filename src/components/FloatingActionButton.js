import { useState, useEffect } from 'react';
import { FaBolt, FaTasks, FaInbox } from 'react-icons/fa';
import InboxList from './InboxList';
import ChatDetail from './ChatDetail';
import TaskList from './TaskList';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const [positions, setPositions] = useState({ left: 'task', right: 'inbox' });

  const toggleFab = () => {
    setIsOpen(!isOpen);
  };

  const toggleInbox = () => {
    setIsInboxOpen(!isInboxOpen);
    setIsTaskOpen(false);

    // Simulasi loading saat membuka inbox
    if (!isInboxOpen) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simulasi 2 detik loading
    }

    // Swap Task and Inbox positions if needed
    if (positions.left !== 'task') {
      setPositions({ left: 'task', right: 'inbox' });
    }
  };

  const toggleTask = () => {
    setIsTaskOpen(!isTaskOpen);
    setIsInboxOpen(false);

    // Swap Task and Inbox positions
    setPositions((prev) => {
      return {
        left: prev.left === 'task' ? 'inbox' : 'task',
        right: prev.right === 'inbox' ? 'task' : 'inbox',
      };
    });
  };

  const handleSelectMessage = (chat) => {
    setSelectedChat(chat);
    setIsInboxOpen(false);
  };

  const handleBack = () => {
    setSelectedChat(null);
    setIsInboxOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-end gap-3">
      {/* Task and Inbox FABs */}
      <div className={`flex ${isOpen ? 'gap-3' : ''} transition-all duration-300`}>
        {isOpen && (
          <div className={`flex flex-row items-center gap-3 ${isInboxOpen || isTaskOpen || selectedChat ? 'translate-x-[60px] z-20' : ''}`}>
            {positions.left === 'task' ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white mt-1">Task</p>
                  <button 
                    onClick={toggleTask} 
                    className="p-4 bg-white text-orange-300 rounded-full shadow-lg flex items-center"
                  >
                    <FaTasks size={20} />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white mt-1">Inbox</p>
                  <button 
                    onClick={toggleInbox} 
                    className="p-4 bg-white text-purple-400 rounded-full shadow-lg flex items-center"
                  >
                    <FaInbox size={20} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white mt-1">Inbox</p>
                  <button 
                    onClick={toggleInbox} 
                    className="p-4 bg-white text-purple-400 rounded-full shadow-lg flex items-center"
                  >
                    <FaInbox size={20} />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white mt-1">Task</p>
                  <button 
                    onClick={toggleTask} 
                    className="p-4 bg-white text-orange-300 rounded-full shadow-lg flex items-center"
                  >
                    <FaTasks size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* FAB Bolt */}
      <button 
        onClick={toggleFab} 
        className={`p-4 bg-blue-500 text-white rounded-full shadow-lg transition-transform duration-300 ${
          isInboxOpen || isTaskOpen || selectedChat ? '-translate-x-[10px] bg-gray-700 ' : ''
        }`}
      >
        <FaBolt size={24} />
      </button>

      {/* Task List */}
      {isTaskOpen && !selectedChat && (
        <div className="fixed bottom-20 right-4 xl:w-[512px] w-96 h-[450px] bg-white rounded-lg shadow-lg">
          <TaskList />
        </div>
      )}

      {/* Inbox List */}
      {isInboxOpen && !selectedChat && (
        <div className="fixed bottom-20 right-4 xl:w-[512px] w-96 h-[450px] bg-white rounded-lg shadow-lg">
          <InboxList onSelectMessage={handleSelectMessage} isLoading={isLoading} />
        </div>
      )}

      {/* Chat Detail */}
      {selectedChat && (
        <div className="fixed bottom-20 right-4 xl:w-[512px] w-96 h-[450px] bg-white rounded-lg shadow-lg">
          <ChatDetail chat={selectedChat} onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;

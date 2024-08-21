import { useState, useEffect } from "react";
import Image from "next/image";
import InboxList from "./InboxList";
import TaskList from "./TaskList";
import ChatDetail from "./ChatDetail";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle FAB menu
  const [isInboxOpen, setIsInboxOpen] = useState(false); // State to toggle Inbox panel
  const [isTaskOpen, setIsTaskOpen] = useState(false); // State to toggle Task panel
  const [selectedChat, setSelectedChat] = useState(null); // State to track selected chat
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [positions, setPositions] = useState({ left: "task", right: "inbox" }); // State to track positions of task and inbox buttons

  // Toggle FAB menu
  const toggleFab = () => {
    setIsOpen(!isOpen);
  };

  // Toggle Inbox panel
  const toggleInbox = () => {
    setIsInboxOpen(!isInboxOpen);
    setIsTaskOpen(false);

    if (!isInboxOpen) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simulate loading
    }

    // Ensure correct positioning of task and inbox buttons
    if (positions.left !== "task") {
      setPositions({ left: "task", right: "inbox" });
    }
  };

  // Toggle Task panel
  const toggleTask = () => {
    setIsTaskOpen(!isTaskOpen);
    setIsInboxOpen(false);

    // Swap positions of task and inbox buttons
    setPositions((prev) => ({
      left: prev.left === "task" ? "inbox" : "task",
      right: prev.right === "inbox" ? "task" : "inbox",
    }));
  };

  // Handle selecting a chat
  const handleSelectMessage = (chat) => {
    setSelectedChat(chat);
    setIsInboxOpen(false);
  };

  // Handle going back from chat detail to inbox
  const handleBack = () => {
    setSelectedChat(null);
    setIsInboxOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-end gap-3">
      {/* FAB menu with task and inbox buttons */}
      <div
        className={`flex ${isOpen ? "gap-3" : ""} transition-all duration-300`}
      >
        {isOpen && (
          <div
            className={`flex flex-row items-center gap-3 ${
              isInboxOpen || isTaskOpen || selectedChat
                ? "translate-x-[60px] z-20"
                : ""
            }`}
          >
            {positions.left === "task" ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white mt-1">Task</p>
                  <button
                    onClick={toggleTask}
                    className="w-14 h-14 justify-center p-4 bg-white text-orange-300 rounded-full shadow-lg flex items-center"
                  >
                    <Image src="/tasks.svg" width={20} height={20} />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white mt-1">Inbox</p>
                  <button
                    onClick={toggleInbox}
                    className={`w-14 h-14 justify-center p-4 ${
                      isInboxOpen ? "bg-indicator-purple" : "bg-white"
                    } text-purple-400 rounded-full shadow-lg flex items-center`}
                  >
                    <Image
                      src={isInboxOpen ? "/Inbox-white.svg" : "/Inbox.svg"}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white mt-1">Inbox</p>
                  <button
                    onClick={toggleInbox}
                    className={`w-14 h-14 justify-center p-4 ${
                      isInboxOpen ? "bg-indicator-purple" : "bg-white"
                    } text-purple-400 rounded-full shadow-lg flex items-center`}
                  >
                    <Image
                      src={isInboxOpen ? "/Inbox-white.svg" : "/Inbox.svg"}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white mt-1">Task</p>
                  <button
                    onClick={toggleTask}
                    className="w-14 h-14 flex items-center justify-center p-4 bg-indicator-peach rounded-full shadow-lg "
                  >
                    <Image src="/tasks-white.svg" width={20} height={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Main FAB button */}
      <button
        onClick={toggleFab}
        className={`w-14 h-14 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg transition-transform duration-300 ${
          isInboxOpen || isTaskOpen || selectedChat
            ? "-translate-x-[16px] bg-gray-700 "
            : ""
        }`}
      >
        <Image src="/bolt.svg" width={14} height={8} />
      </button>

      {/* Task panel */}
      {isTaskOpen && !selectedChat && (
        <div className="fixed bottom-20 right-4 xl:w-[512px] w-96 h-[512px] bg-white rounded-lg shadow-lg z-50">
          <TaskList />
        </div>
      )}

      {/* Inbox panel */}
      {isInboxOpen && !selectedChat && (
        <div className="fixed bottom-20 right-4 xl:w-[512px] w-96 h-[512px] bg-white rounded-lg shadow-lg z-50">
          <InboxList
            onSelectMessage={handleSelectMessage}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Chat detail panel */}
      {selectedChat && (
        <div className="fixed bottom-20 right-4 xl:w-[512px] w-96 h-[512px] bg-white rounded-lg shadow-lg z-50">
          <ChatDetail chat={selectedChat} onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;

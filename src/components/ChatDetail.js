import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaTimes, FaEllipsisH } from 'react-icons/fa';

const ChatDetail = ({ chat, onBack }) => {
  const bottomRef = useRef(null);
  const [showNewMessageButton, setShowNewMessageButton] = useState(false);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const [showOptions, setShowOptions] = useState(null); // Track which message's options are visible

  useEffect(() => {
    // Scroll to the bottom of the chat when component mounts
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // If user scrolls up, show the "New Message" button
    if (scrollTop + clientHeight < scrollHeight - 50) {
      setShowNewMessageButton(true);
      setHasScrolledUp(true);
    } else {
      setShowNewMessageButton(false);
      setHasScrolledUp(false);
    }
  };

  const scrollToNewMessage = () => {
    const newMessageIndex = chat.messages.findIndex(message => message.isNew);
    const newMessageElement = document.getElementById(`message-${newMessageIndex}`);
    if (newMessageElement) {
      newMessageElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleOptions = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  const handleEdit = (index) => {
    alert(`Edit message ${index + 1}`);
    setShowOptions(null);
  };

  const handleDelete = (index) => {
    alert(`Delete message ${index + 1}`);
    setShowOptions(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-gray-200 border-b border-gray-300 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={onBack} className="text-blue-500 mr-4">
            <FaArrowLeft size={20} />
          </button>
          <div>
            <div className="font-semibold text-blue-500">{chat.name}</div>
            <div className="text-sm text-gray-500">{chat.participants} Participants</div>
          </div>
        </div>
        <button onClick={() => {}} className="text-gray-500">
          <FaTimes size={20} />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-white" onScroll={handleScroll}>
        {chat.messages.map((message, index) => {
          const isLastMessage = index === chat.messages.length - 1 && message.sender !== 'You';
          return (
            <div key={index} id={`message-${index}`} className="relative">
              {/* Display date at the start of a new day */}
              {index === 0 || chat.messages[index - 1].date !== message.date ? (
                <div className="flex items-center justify-center my-4">
                  <div className="flex items-center w-full">
                    <hr className="flex-grow border-t border-black" />
                    <span className="mx-2 font-semibold">{message.date}</span>
                    <hr className="flex-grow border-t border-black" />
                  </div>
                </div>
              ) : null}

              {/* New Message Indicator */}
              {message.isNew && (
                <div className="flex items-center justify-center my-4">
                  <div className="flex items-center w-full">
                    <hr className="flex-grow border-t border-red-300" />
                    <span className="mx-2 text-red-500 font-semibold">New Message</span>
                    <hr className="flex-grow border-t border-red-300" />
                  </div>
                </div>
              )}
              
              <div 
                className={`mb-4 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[80%] relative">
                  {/* Nama Pengirim */}
                  <div className={`text-sm font-semibold mb-1 ${message.sender === 'You' ? 'text-purple-500 text-right' : isLastMessage && message.isNew ? ' text-green-900':'text-orange-500 text-left'}`}>
                    {message.sender}
                  </div>
                  
                  <div className={`flex flex-row gap-2 ${message.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                    {/* Isi Pesan */}
                    <div className={`p-3 rounded-lg shadow ${message.sender === 'You' ? 'bg-purple-100 text-purple-900' : isLastMessage && message.isNew ? 'bg-green-100 text-green-900' : 'bg-yellow-100 text-yellow-900'}`}>
                      {message.content}
                    </div>
                    {/* Options button */}
                    <div className="flex ">
                      <FaEllipsisH  
                        className="text-gray-500 cursor-pointer "
                        onClick={() => toggleOptions(index)}
                      />
                    </div>
                  </div>
                  
                  {/* Waktu Pesan */}
                  <div className={`text-xs text-gray-500 mt-1 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
                    {message.time}
                  </div>

                  {/* Options menu */}
                  {showOptions === index && (
                    <div className={`absolute ${message.sender === 'You' ? 'left-0 ' : 'right-0'} top-12 w-24 bg-white border border-gray-300 rounded shadow-lg z-10`}>
                      <button 
                        onClick={() => handleEdit(index)} 
                        className="block px-4 py-2 text-left text-blue-500 hover:bg-gray-100 border-b-[1px] w-full border-gray-300"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(index)} 
                        className="block px-4 py-2 text-left text-red-700 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {/* Elemen untuk memastikan scroll ke bagian bawah */}
        <div ref={bottomRef} />
      </div>

      {/* Waiting for response indicator */}
      {chat.type === 'personal' && (
        <div className="flex items-center justify-left bg-blue-50 p-3 text-blue-600 text-sm">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-3"></div>
            Please wait while we connect you with one of our team...
          </div>
        </div>
      )}

      {/* Tombol New Message */}
      {showNewMessageButton && (
        <button 
          onClick={scrollToNewMessage} 
          className="flex justify-center text-blue-500 bg-gray-100 px-4 py-2 rounded-full shadow-lg"
        >
          New Message
        </button>
      )}

      {/* Input New Message */}
      <div className="p-4 bg-gray-200 flex items-center">
        <input 
          type="text"
          className="flex-1 p-2 rounded-md border border-gray-300"
          placeholder="Type a new message"
        />
        <button className="ml-4 p-2 bg-blue-500 text-white rounded-md">Send</button>
      </div>
    </div>
  );
};

export default ChatDetail;

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaTimes, FaEllipsisH } from 'react-icons/fa';

const ChatDetail = ({ chat, onBack }) => {
  const bottomRef = useRef(null);
  const [showNewMessageButton, setShowNewMessageButton] = useState(false);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const [showOptions, setShowOptions] = useState(null); // Track which message's options are visible
  const [replyMessage, setReplyMessage] = useState(null); // Track the message being replied to
  const [newMessage, setNewMessage] = useState(""); // New message input

  useEffect(() => {
    // Scroll to the bottom of the chat when component mounts
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Check if there's a new message
    const hasNewMessage = chat.messages.some(message => message.isNew);
    setShowNewMessageButton(hasNewMessage && hasScrolledUp);
  }, [chat, hasScrolledUp]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // If user scrolls up, show the "New Message" button if there's a new message
    if (scrollTop + clientHeight < scrollHeight - 50) {
      setHasScrolledUp(true);
      if (chat.messages.some(message => message.isNew)) {
        setShowNewMessageButton(true);
      }
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

  const handleReply = (index) => {
    setReplyMessage(chat.messages[index]);
    setShowOptions(null);
  };

  const handleShare = (index) => {
    alert(`Share message ${index + 1}`);
    setShowOptions(null);
  };

  const handleEdit = (index) => {
    alert(`Edit message ${index + 1}`);
    setShowOptions(null);
  };

  const handleDelete = (index) => {
    alert(`Delete message ${index + 1}`);
    setShowOptions(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newChatMessage = {
        sender: 'You',
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0],
        isNew: false,
        replyFor: replyMessage ? replyMessage.content : null,
      };

      // Update chat messages (in a real application, you'd send this to the server)
      chat.messages.push(newChatMessage);

      setNewMessage("");
      setReplyMessage(null);
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex flex-col h-full text-base rounded-lg">
      {/* Header */}
      <div className="p-4 bg-white border-b rounded-t-lg border-primary-contrast flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4">
            <Image src="/back.svg" width={14} height={14} />
          </button>
          <div>
            <div className="font-semibold text-blue-500">{chat.name}</div>
            {chat.participants >=1 ? (
              <div className="text-sm text-gray-500">{chat.participants} Participants</div>

            ) : (
              <div></div>
            )}

          </div>
        </div>
        <button onClick={onBack} className="text-gray-500">
          <Image src="/close.svg" width={14} height={14} />
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
                    <hr className="flex-grow border-t border-primary-dark" />
                    <span className="mx-2 font-semibold text-primary-dark">{message.date}</span>
                    <hr className="flex-grow border-t border-primary-dark" />
                  </div>
                </div>
              ) : null}

              {/* New Message Indicator */}
              {message.isNew && (
                <div className="flex items-center justify-center my-4">
                  <div className="flex items-center w-full">
                    <hr className="flex-grow border-t border-indicator-red" />
                    <span className="mx-2 text-indicator-red font-semibold">New Message</span>
                    <hr className="flex-grow border-t border-indicator-red" />
                  </div>
                </div>
              )}
              
              <div 
                className={`mb-4 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[80%] relative">
                  {/* Nama Pengirim */}
                  <div className={`text-sm font-semibold mb-1 ${message.sender === 'You' ? 'text-chats-purple text-right' : isLastMessage && message.isNew ? ' text-chats-green':'text-chats-peach text-left'}`}>
                    {message.sender}
                  </div>

                  {/* Jika ada replyFor, tampilkan pesan yang di-reply */}
                  {message.replyFor && (
                    <div className="border-2 border-primary-contrast rounded-lg pl-2 mb-2 text-sm text-gray-600">
                      {message.replyFor}
                    </div>
                  )}
                  
                  <div className={`flex flex-row gap-2 ${message.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                    {/* Isi Pesan */}
                    <div className={`flex flex-col justify-between space-y-4 p-3 rounded-lg shadow text-primary-dark ${message.sender === 'You' ? 'bg-chats-lightpurple ' : isLastMessage && message.isNew ? 'bg-chats-mint ' : 'bg-chats-lightpeach '}`}>
                      <div>
                      {message.content}
                      </div>
                      <div className='text-sm'>
                      {message.time}
                      </div>

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
                  </div>

                  {/* Options menu */}
                  {showOptions === index && (
                    <div className={`absolute ${message.sender === 'You' ? 'left-0 ' : 'right-0'} top-12 w-24 bg-white border border-gray-300 rounded shadow-lg z-10`}>
                      {message.sender === 'You' ? (
                        <>
                          <button 
                            onClick={() => handleReply(index)} 
                            className="block px-4 py-2 text-left text-blue-500 hover:bg-gray-100 border-b-[1px] w-full border-gray-300"
                          >
                            Reply
                          </button>
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
                        </>
                      ) : (
                        <>
                        <button 
                            onClick={() => handleShare(index)} 
                            className="block px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
                          >
                            Share
                          </button>
                          <button 
                            onClick={() => handleReply(index)} 
                            className="block px-4 py-2 text-left text-blue-500 hover:bg-gray-100 border-b-[1px] w-full border-gray-300"
                          >
                            Reply
                          </button>
                          
                        </>
                      )}
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

      {/* Display Reply Message */}
      {replyMessage && (
        <div className="p-4 bg-gray-100 border-t border-b border-gray-300">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-semibold text-primary-dark">{`Replying to ${replyMessage.sender}`}</div>
              <div className="text-sm text-primary-dark">{replyMessage.content}</div>
            </div>
            <button onClick={() => setReplyMessage(null)} className="text-gray-500">
              <FaTimes size={16} />
            </button>
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

      {/* Waiting for response indicator */}
      {chat.type === 'personal' && (
        <div className="flex items-center justify-left bg-blue-50 p-3 text-primary text-sm">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-3"></div>
            Please wait while we connect you with one of our team...
          </div>
        </div>
      )}

      

      {/* Input New Message */}
      <div className="p-4 bg-white flex items-center rounded-b-lg ">
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 rounded-md border border-gray-300"
          placeholder="Type a new message"
        />
        <button 
          onClick={handleSendMessage} 
          className="ml-4 p-2 bg-blue-500 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDetail;

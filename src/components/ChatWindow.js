const ChatWindow = ({ message }) => {
    if (!message) {
      return (
        <div className="flex items-center justify-center h-full">
          <p>Select a message to view the conversation</p>
        </div>
      );
    }
  
    return (
      <div className="flex flex-col p-4 bg-gray-500 h-full">
        <h3 className="text-lg font-bold text-blue-600">{message.title}</h3>
        <div className="mt-4 flex flex-col space-y-2">
          <p>{message.body}</p>
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatWindow;
  
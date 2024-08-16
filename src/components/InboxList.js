const InboxList = ({ onSelectMessage }) => {
  const messages = [
    {
      id: 1,
      sender: "Cameron Phillips",
      title: "109220-Naturalization",
      body: "Please check this out!",
      date: "January 1, 2021 19:10",
      isRead: false,
    },
    {
      id: 2,
      sender: "Ellen",
      title: "Jeannette Moraima Guaman Chamba [Hutto Follow Up - Brief Service]",
      body: "Hey, please read.",
      date: "February 6, 2021 10:45",
      isRead: true,
    },
    {
      id: 3,
      sender: "Cameron Phillips",
      title: "8405-Diana SALAZAR MUNGUIA",
      body: "I understand your initial concerns and that's very valid, Elizabeth. But you...",
      date: "January 6, 2021 12:19",
      isRead: true,
    },
    {
      id: 4,
      sender: "FastVisa Support",
      title: "FastVisa Support",
      body: "Hey there! Welcome to your inbox.",
      date: "January 6, 2021 12:19",
      isRead: true,
    },
  ];

  return (
    <div className="p-4 overflow-y-auto h-full w-full">
      <div className="flex items-center justify-between p-2 mb-4 bg-gray-200 rounded-md">
        <input 
          type="text" 
          placeholder="Search" 
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      {messages.map((message) => (
        <div
          key={message.id}
          className="flex items-start justify-between p-4 border-b  border-gray-200 cursor-pointer"
          onClick={() => onSelectMessage(message)}
        >
          <div className="flex items-start">
            <div className="w-10 h-10 bg-blue-500 text-white text-sm   rounded-full flex items-center justify-center mr-4">
              {message.sender.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-blue-600 text-sm">{message.title}</h3>
              <p className="text-gray-600 text-sm">{message.sender} :</p>
              <p className="text-sm text-gray-500 ">{message.body}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {message.date}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InboxList;

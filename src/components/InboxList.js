import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const InboxList = ({ onSelectMessage, isLoading }) => {
  const inboxItems = [
    {
      id: 1,
      type: 'group',
      name: '109220-Naturalization',
      sender: 'Cameron Phillips',
      message: 'Please check this out!',
      date: '2021-01-01 19:10:00',
      isUnread: true,
      participants: 5,
      messages: [
        {
          sender: 'Mary Hilda',
          content: 'Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.',
          time: '19:32',
          date: '2021-01-01',
          isNew: false,
        },
        {
          sender: 'You',
          content: 'Please contact Mary for questions regarding the case because she will be managing your forms from now on! Thanks, Mary.',
          time: '19:45',
          date: '2021-01-01',
          isNew: false,
        },
        {
          sender: 'Mary Hilda',
          content: 'Sure thing, Claren.',
          time: '19:50',
          date: '2021-01-01',
          isNew: false,
        },
        {
          sender: 'Obaidullah Amarkhil',
          content: "Morning, I'll try to do them. Thanks.",
          time: '08:00',
          date: '2021-01-01',
          isNew: true,
        },
        {
          sender: 'You',
          content: 'Hi Mary',
          time: '19:32',
          date: '2021-01-01',
          isNew: false,
          replyFor: 'Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.', // Reply for message
        }
      ]
    },
    {
      id: 2,
      type: 'personal',
      name: 'Jeannette Moraima Guaman Chamba',
      sender: 'Ellen',
      message: 'Hey, please read.',
      date: '2021-06-02 10:45:00',
      isUnread: false,
      participants: 2,
      messages: [
        {
          sender: 'Ellen',
          content: 'Hey Jeannette, please check the document I sent you.',
          time: '10:45',
          date: '2021-06-02',
          isNew: false,
        },
        {
          sender: 'You',
          content: 'Okay, I will check it out.',
          time: '10:50',
          date: '2021-06-02',
          isNew: false,
        }
      ]
    },
    {
      id: 3,
      type: 'group',
      name: '8405-Diana SALAZAR MUNGUIA',
      sender: 'Cameron Phillips',
      message: 'I understand your initial concerns and that\'s very valid, Elizabeth. But you...',
      date: '2021-06-01 12:19:00',
      isUnread: false,
      participants: 4,
      messages: [
        {
          sender: 'Cameron Phillips',
          content: 'I understand your initial concerns and that\'s very valid, Elizabeth. But you should not worry too much.',
          time: '12:19',
          date: '2021-06-01',
          isNew: false,
        },
        {
          sender: 'Elizabeth Ann',
          content: 'Thank you for your reassurance, Cameron. I\'ll keep that in mind.',
          time: '12:25',
          date: '2021-06-01',
          isNew: false,
        }
      ]
    },
    {
      id: 4,
      type: 'personal',
      name: 'FastVisa Support',
      sender: '',
      message: 'Hey there! Welcome to your inbox.',
      date: '2021-06-01 12:19:00',
      isUnread: false,
      participants: 2,
      messages: [
        {
          sender: 'FastVisa Support',
          content: 'Hey there! Welcome to your inbox.',
          time: '12:19',
          date: '2021-06-01',
          isNew: false,
        }
      ]
    },
    {
      id: 5,
      type: 'group',
      name: 'Project Team Chat',
      sender: 'Alice Johnson',
      message: 'Remember to review the project plan before our meeting tomorrow.',
      date: '2021-06-03 14:30:00',
      isUnread: true,
      participants: 6,
      messages: [
        {
          sender: 'Alice Johnson',
          content: 'Remember to review the project plan before our meeting tomorrow.',
          time: '14:30',
          date: '2021-06-03',
          isNew: true,
        },
        {
          sender: 'You',
          content: 'Will do, thanks for the reminder!',
          time: '14:45',
          date: '2021-06-03',
          isNew: false,
        }
      ]
    },
    {
      id: 6,
      type: 'personal',
      name: 'John Doe',
      sender: 'John',
      message: 'Are we still on for lunch tomorrow?',
      date: '2021-06-03 11:00:00',
      isUnread: true,
      participants: 2,
      messages: [
        {
          sender: 'John',
          content: 'Are we still on for lunch tomorrow?',
          time: '11:00',
          date: '2021-06-03',
          isNew: true,
        },
        {
          sender: 'You',
          content: 'Yes, looking forward to it!',
          time: '11:15',
          date: '2021-06-03',
          isNew: false,
        }
      ]
    }
  ];
  
  

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg h-full flex flex-col ">
      <div className="flex items-center mb-4">
        <input 
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-md border border-gray-300"
        />
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="loader"></div>
          <p className="text-gray-500 mt-2">Loading Chats...</p>
        </div>
      ) : (
        <div className="max-h-full overflow-y-auto flex-1">
          {inboxItems.map((item) => {
            const lastMessage = item.messages[item.messages.length - 1];

            return (
              <div 
                key={item.id} 
                className={`flex items-center p-2 mb-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                  item.isUnread ? 'bg-gray-200' : 'bg-white'
                }`}
                onClick={() => onSelectMessage(item)}
              >
                {item.type === 'group' ? (
                  <div className="relative flex items-center mr-3" style={{ width: '32px', height: '32px' }}>
                    <FaUserCircle className="text-gray-400 bg-white rounded-full absolute" style={{ fontSize: '24px', left: '0', zIndex: 1 }} />
                    <FaUserCircle className="text-blue-500 bg-white rounded-full absolute" style={{ fontSize: '24px', right: '0', zIndex: 2 }} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-blue-500 text-white text-xl font-bold rounded-full w-8 h-8 mr-3">
                    {lastMessage.sender.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-semibold text-blue-500">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.date}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {lastMessage.sender && <span className="font-semibold">{lastMessage.sender} : </span>}
                    {lastMessage.content}
                  </div>
                </div>
                {item.isUnread && <div className="w-2 h-2 rounded-full bg-red-500 ml-2"></div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InboxList;

import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const InboxList = ({ onSelectMessage, isLoading }) => {
  const [inboxItems, setInboxItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const usersResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const commentsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );

        const posts = await postsResponse.json();
        const users = await usersResponse.json();
        const comments = await commentsResponse.json();

        console.log("Posts:", posts);
        console.log("Users:", users);
        console.log("Comments:", comments);

        const data = posts.slice(0, 6).map((post) => {
          const user = users.find((u) => u.id === post.userId);
          const postComments = comments.filter(
            (comment) => comment.postId === post.id
          );

          return {
            id: post.id,
            type: post.id % 2 === 0 ? "group" : "personal",
            name: `${post.id}-${post.title.slice(0, 20)}`,
            sender: user.name,
            message: post.body,
            date: new Date().toISOString(),
            isUnread: post.id % 2 === 0,
            participants: post.id % 2 === 0 ? 3 + (post.id % 3) : 2,
            messages: postComments.map((comment) => ({
              sender: comment.email,
              content: comment.body,
              time: new Date(comment.timestamp).toLocaleTimeString(),
              date: new Date(comment.timestamp).toISOString().split("T")[0],
              isNew: false,
            })),
          };
        });

        setInboxItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="loader"></div>
        <p className="text-gray-500 mt-2">Loading Chats...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg h-full flex flex-col ">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-md border border-gray-300"
        />
      </div>
      <div className="max-h-full overflow-y-auto flex-1">
        {inboxItems.map((item) => {
          const lastMessage = item.messages[item.messages.length - 1];

          return (
            <div
              key={item.id}
              className={`flex items-center p-2 mb-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                item.isUnread ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => onSelectMessage(item)}
            >
              {item.type === "group" ? (
                <div
                  className="relative flex items-center mr-3"
                  style={{ width: "32px", height: "32px" }}
                >
                  <FaUserCircle
                    className="text-gray-400 bg-white rounded-full absolute"
                    style={{ fontSize: "24px", left: "0", zIndex: 1 }}
                  />
                  <FaUserCircle
                    className="text-blue-500 bg-white rounded-full absolute"
                    style={{ fontSize: "24px", right: "0", zIndex: 2 }}
                  />
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
                  {lastMessage.sender && (
                    <span className="font-semibold">
                      {lastMessage.sender} :{" "}
                    </span>
                  )}
                  {lastMessage.content}
                </div>
              </div>
              {item.isUnread && (
                <div className="w-2 h-2 rounded-full bg-red-500 ml-2"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InboxList;

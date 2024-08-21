import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const InboxList = ({ onSelectMessage }) => {
  const [inboxItems, setInboxItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

        const data = posts.slice(0, 6).map((post, index) => {
          const user = users.find((u) => u.id === post.userId);
          const postComments = comments.filter(
            (comment) => comment.postId === post.id
          );

          // Filter comments for personal messages to include only one user and "You"
          const filteredComments =
            post.id % 2 !== 0 // Only apply this for personal messages
              ? postComments.filter((_, idx) => idx === 0 || (idx + 1) % 3 === 0)
              : postComments;

          // Mark the last message as new if it's among the first two posts
          const messagesWithYou = filteredComments.map((comment, idx) => {
            const isYou = (idx + 1) % 3 === 0;
            return {
              sender: isYou ? "You" : comment.email,
              content: isYou ? "This is a reply from You." : comment.body,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              date: new Date().toISOString().split("T")[0],
              isNew: index < 2 && idx === filteredComments.length - 1, // Mark as new only for the first two posts
              replyFor: isYou ? comment.body : null,
            };
          });

          return {
            id: post.id,
            type: post.id % 2 === 0 ? "group" : "personal",
            name: `${post.id}-${post.title.slice(0, 20)}`,
            sender: user.name,
            message: post.body,
            date: new Date().toISOString(),
            isUnread: index < 2, // Only the first two items will be unread
            participants:
              post.id % 2 === 0 ? 3 + (post.id % 3) : null, // Only group messages have participants
            messages: messagesWithYou,
          };
        });

        setInboxItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="px-8 py-6 bg-white rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex flex-row justify-between items-center mb-4 px-4 border border-primary-light rounded-md">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-md text-primary-dark focus:outline-none"
        />
        <div className="flex items-center justify-center px-2">
          <Image
            src="/search_black.svg"
            width={16}
            height={16}
            alt="Search Icon"
          />
        </div>
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
            const truncatedMessage = truncateContent(lastMessage.content, 50);

            return (
              <div
                key={item.id}
                className={`flex py-[22px] border-b border-b-primary-light items-center space-x-2 mb-2 cursor-pointer`}
                onClick={() => onSelectMessage(item)}
              >
                {item.type === "group" ? (
                  <div
                    className="relative flex items-center mr-3"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <div
                      className="bg-primary-contrast rounded-full absolute p-2 flex items-center justify-center"
                      style={{ zIndex: 1 }}
                    >
                      <Image
                        src="/user_gray.svg"
                        width={16}
                        height={16}
                        alt="User Icon"
                      />
                    </div>
                    <div
                      className="bg-primary rounded-full absolute translate-x-3 p-2 flex items-center justify-center"
                      style={{ zIndex: 2 }}
                    >
                      <Image
                        src="/user.svg"
                        width={16}
                        height={16}
                        alt="User Icon"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-blue-500 text-white text-sm font-bold rounded-full w-8 h-8 mr-3">
                    {lastMessage.sender.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-row space-x-4">
                    <div className="font-semibold text-base text-blue-500">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex flex-col">
                    {item.type === "group" && lastMessage.sender && (
                      <span className="font-semibold">
                        {lastMessage.sender} :{" "}
                      </span>
                    )}
                    {truncatedMessage}
                  </div>
                </div>
                {item.isUnread && (
                  <div className="relative right-2 w-2 h-2 rounded-full bg-red-500 ml-2"></div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InboxList;

import React from 'react';
import { FaEllipsisH } from 'react-icons/fa';

const TaskList = () => {
  const tasks = [
    {
      id: 1,
      title: "Close off Case #012920 - RODRIGUES, Amiguel",
      description: "Closing off this case since this application has been cancelled. No one really understands why this case could possibly be cancelled. The options and the documents within this document were totally a partnerrd for a success!",
      dueDate: "12/06/2021",
      daysLeft: "2 Days Left"
    },
    {
      id: 2,
      title: "Set up documentation report for several Cases : Case 1454A3, Case 1928Z97 and Case 182203",
      description: "All Cases must include all payment transactions, all documents and forms filled. All comments in comments and messages in channels and emails should be provided as well in.",
      dueDate: "14/06/2021",
      daysLeft: "4 Days Left"
    },
    {
      id: 3,
      title: "Set up appointment with Dr Blake",
      description: "No Description",
      dueDate: "22/06/2021",
      daysLeft: "10 Days Left"
    }
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-full max-h-full overflow-y-auto flex-1">
      <div className="flex justify-between items-center mb-4">
        <select className="p-2 border rounded-md">
          <option>My Tasks</option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded-md">New Task</button>
      </div>
      <div className="max-h-[500px] overflow-y-auto">
        {tasks.map((task) => (
          <div key={task.id} className="border-b border-gray-300 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600"/>
                <div>
                  <h3 className="font-bold text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-red-500">{task.daysLeft}</span>
                <span>{task.dueDate}</span>
                <FaEllipsisH className="text-gray-500 cursor-pointer"/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

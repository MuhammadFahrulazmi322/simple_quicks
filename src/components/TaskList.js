import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEllipsisH, FaCalendarAlt, FaPen, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const availableStickers = [
  'Important ASAP', 'Offline Meeting', 'Virtual Meeting',
  'ASAP', 'Client Related', 'Self Task',
  'Appointments', 'Court Related'
];

const TaskList = () => {
  const [expandedTasks, setExpandedTasks] = useState({});
  const [menuOpenTaskId, setMenuOpenTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [newTaskMenuOpen, setNewTaskMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("My Tasks");
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State untuk loading
  const [selectedTaskForSticker, setSelectedTaskForSticker] = useState(null);

  useEffect(() => {
    // Simulasi loading, misalnya dari API
    setTimeout(() => {
      setTasks([
        {
          id: 1,
          title: 'Close off Case #012920- RODRIGUES, Amiguel',
          daysLeft: 2,
          dueDate: '2021-06-12',
          description: 'Closing off this case since this application has been cancelled. No one really understands how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for success!',
          stickers: ['Important ASAP', 'Offline Meeting'],
        },
        {
          id: 2,
          title: 'Set up documentation report for several Cases: Case 145443, Case 192829 and Case 182203',
          daysLeft: 4,
          dueDate: '2021-06-14',
          description: 'All cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well.',
          stickers: ['Client Related'],
        },
        {
          id: 3,
          title: 'Set up appointment with Dr Blake',
          daysLeft: 10,
          dueDate: '2021-06-22',
          description: 'No Description yet',
          stickers: [],
        },
        {
          id: 4,
          title: 'Contact Mr Caleb - video conference?',
          daysLeft: 0,
          dueDate: '2021-06-03',
          description: '',
          completed: true,
          stickers: [],
        },
        {
          id: 5,
          title: 'Assign 3 homework to Client A',
          daysLeft: 0,
          dueDate: '2021-06-02',
          description: '',
          completed: true,
          stickers: [],
        },
      ]);
      setIsLoading(false); // Set isLoading ke false setelah task dimuat
    }, 2000); // Simulasi 2 detik loading
  }, []);

  const toggleExpand = (taskId) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleDateChange = (taskId, newDate) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, dueDate: newDate } : task
      )
    );
  };

  const toggleMenu = (taskId) => {
    setMenuOpenTaskId((prev) => (prev === taskId ? null : taskId));
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleAddNewTask = () => {
    setIsAddingNewTask(true);
  };

  const handleCancelNewTask = () => {
    setIsAddingNewTask(false);
    setNewTaskMenuOpen(false);
  };

  const toggleNewTaskMenu = () => {
    setNewTaskMenuOpen((prev) => !prev);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleDescriptionChange = (taskId, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, description: newDescription } : task
      )
    );
  };

  const handleEditDescription = (taskId) => {
    setEditableTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  const handleStickerClick = (taskId) => {
    setSelectedTaskForSticker(selectedTaskForSticker === taskId ? null : taskId);
  };

  const handleSelectSticker = (taskId, sticker) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              stickers: task.stickers.includes(sticker)
                ? task.stickers.filter((s) => s !== sticker)
                : [...task.stickers, sticker],
            }
          : task
      )
    );
    setSelectedTaskForSticker(null);
  };

  return (
    <div className="max-h-full text-[11px] overflow-y-auto flex-1 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button
            className="p-2 border rounded-md flex items-center justify-between w-24 bg-white ml-12"
            onClick={toggleDropdown}
          >
            <span>{selectedOption}</span>
            <FaChevronDown className="ml-2 text-gray-500" />
          </button>
          {isDropdownOpen && (
            <ul className="absolute mt-1 left-0 right-0 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <li
                hidden
                className="px-4 py-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("My Tasks")}
              >
                My Tasks
              </li>
              <li
                className="px-4 py-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("Personal Errands")}
              >
                Personal Errands
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("Urgent To-Do")}
              >
                Urgent To-Do
              </li>
            </ul>
          )}
        </div>
        <button onClick={handleAddNewTask} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          New Task
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
          <p className="ml-4">Loading Task List ...</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-4 border-b-2 border-gray-300  relative ${task.completed ? 'text-gray-400' : ''}`}
            >
              <div className="flex justify-between mb-2">
                <div className="flex max-w-[60%]">
                  <input
                    type="checkbox"
                    className="mr-2 custom-checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className={`font-semibold ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center relative">
                  {!task.completed && (
                    <span className="text-red-500 font-semibold">{task.daysLeft} Days Left</span>
                  )}
                  <span className="text-gray-500 ml-2">{task.dueDate}</span>
                  {expandedTasks[task.id] ? (
                    <FaChevronUp className="ml-2 cursor-pointer" onClick={() => toggleExpand(task.id)} />
                  ) : (
                    <FaChevronDown className="ml-2 cursor-pointer" onClick={() => toggleExpand(task.id)} />
                  )}
                  <FaEllipsisH className="ml-4 cursor-pointer text-gray-500" onClick={() => toggleMenu(task.id)} />

                  {/* Dropdown menu for options */}
                  {menuOpenTaskId === task.id && (
                    <div className="absolute right-0 top-[1px] mt-6 bg-white border rounded shadow-lg z-10 w-28">
                      <button 
                        onClick={() => handleDelete(task.id)} 
                        className="block px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {expandedTasks[task.id] && (
                <div className="pl-6 text-sm text-[11px] text-gray-500">
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <input
                      type="date"
                      value={task.dueDate}
                      onChange={(e) => handleDateChange(task.id, e.target.value)}
                      className="border p-1 rounded"
                    />
                  </div>
                  <div className="flex items-start">
                    <FaPen
                      className={`mr-2 mt-1 flex-shrink-0 ${task.description.length > 0 ? 'text-blue-500' : 'text-gray-500'} cursor-pointer`}
                      style={{ width: '10px', height: '10px' }}
                      onClick={() => handleEditDescription(task.id)}
                    />
                    {editableTaskId === task.id ? (
                      <textarea
                        value={task.description}
                        onChange={(e) => handleDescriptionChange(task.id, e.target.value)}
                        placeholder="No Description"
                        className="w-full border rounded px-2 py-1"
                        rows={3} // adjust the number of rows as needed
                      />
                    ) : (
                      <p>{task.description || 'No Description'}</p>
                    )}
                  </div>
                  {/* Stickers Section */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.stickers.map((sticker) => (
                      <span key={sticker} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {sticker}
                      </span>
                    ))}
                    <button
                      onClick={() => handleStickerClick(task.id)}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
                    >
                      + Add Sticker
                    </button>
                    {selectedTaskForSticker === task.id && (
                      <StickerDropdown
                        availableStickers={availableStickers}
                        selectedStickers={task.stickers}
                        onSelectSticker={(sticker) => handleSelectSticker(task.id, sticker)}
                      />
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}

          {/* New Task Form */}
          {isAddingNewTask && (
            <li className="p-4 border rounded-lg relative">
              <div className="flex justify-between mb-2">
                <div className="flex max-w-[60%]">
                  <input type="checkbox" className="mr-2" />
                  <input
                    type="text"
                    placeholder="Type Task Title"
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div className="flex items-center relative">
                  <FaChevronDown className="ml-2 cursor-pointer" />
                  <FaEllipsisH className="ml-4 cursor-pointer text-gray-500" onClick={toggleNewTaskMenu} />

                  {/* Dropdown menu for options */}
                  {newTaskMenuOpen && (
                    <div className="absolute right-0 top-[1px] mt-6 bg-white border rounded shadow-lg z-10 w-28">
                      <button 
                        onClick={handleCancelNewTask} 
                        className="block px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="pl-6 text-sm text-[11px] text-gray-500">
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  <input
                    type="date"
                    className="border p-1 rounded"
                  />
                </div>
                <div className="flex items-start">
                  <FaPen className="mr-2 mt-1 flex-shrink-0 text-gray-500" style={{ width: '10px', height: '10px' }} />
                  <textarea
                    placeholder="No Description"
                    className="w-full border rounded px-2 py-1"
                    rows={3} // adjust the number of rows as needed
                  />
                </div>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

const StickerDropdown = ({ availableStickers, selectedStickers, onSelectSticker }) => {
  return (
    <div className="absolute bg-white border rounded shadow-lg z-10 w-56 mt-2">
      {availableStickers.map((sticker) => (
        <button
          key={sticker}
          className={`block px-4 py-2 text-left hover:bg-gray-100 ${
            selectedStickers.includes(sticker) ? 'bg-gray-200' : ''
          }`}
          onClick={() => onSelectSticker(sticker)}
        >
          {sticker}
        </button>
      ))}
    </div>
  );
};

export default TaskList;

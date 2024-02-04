"use client";
import { useState } from "react";

const Task = ({ task, onEdit, onDelete, onToggle }) => {
  const [isEditing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
    onEdit();
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleToggle = () => {
    onToggle();
  };

  const renderTime = () => {
    const formattedTime = "12:44 PM"; // Replace this with your logic to format time
    return (
      <span className="text-xs text-blue-500">
        Last Update: <span className="text-white">{formattedTime}</span>
      </span>
    );
  };

  return (
    <li className="flex flex-col p-2 border-b">
      <div className="mb-2">
        <h3
          className={`text-lg font-semibold ${
            task.status === "complete"
              ? "line-through text-gray-500"
              : "text-white"
          }`}
        >
          {task.title}
        </h3>
        <p
          className={`text-gray-400 ${
            task.status === "complete"
              ? "line-through text-gray-600"
              : "text-white"
          }`}
        >
          {task.description}
        </p>
        {renderTime()}
      </div>
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={handleToggle}
          className={`px-3 py-1 text-sm rounded text-white ${
            task.status === "complete" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {task.status === "complete" ? "Completed" : "Incomplete"}
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:underline focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default Task;

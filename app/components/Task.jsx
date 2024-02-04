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

  return (
    <li className="flex flex-col p-2 border-b">
      <div className="mb-2">
        <h3
          className={`text-lg font-semibold ${
            task.completed ? "line-through text-gray-500" : "text-white"
          }`}
        >
          {task.title}
        </h3>
        <p
          className={`text-gray-400 ${
            task.completed ? "line-through text-gray-600" : "text-white"
          }`}
        >
          {task.description}
        </p>
        <span className="text-xs text-blue-500">
          Last Update:{" "}
          <span className="text-white">
            {new Date(task.updatedAt).toUTCString()}
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={handleToggle}
          className={`px-3 py-1 text-sm rounded text-white ${
            task.completed ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {task.completed ? "Completed" : "Incomplete"}
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

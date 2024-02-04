"use client";

import { useState, useEffect } from "react";

const AddTaskPopup = ({ editTaskId, tasks, onSubmit, onCancel }) => {
  const [initialTask, setInitialTask] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (editTaskId !== null) {
      const taskToEdit = tasks.find((task) => task.id === editTaskId);
      if (taskToEdit) {
        setInitialTask(taskToEdit);
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
      }
    }
  }, [editTaskId, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
    setIsVisible(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsVisible(false);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-gray-800 text-white p-4 rounded-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">
          {editTaskId ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full p-2 border rounded bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              disabled={
                editTaskId &&
                initialTask.title === title &&
                initialTask.description === description
              }
            >
              {editTaskId ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopup;

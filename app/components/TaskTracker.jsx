"use client";
import { useState } from "react";
import TaskList from "@/app/components/TaskList";
import AddTaskPopup from "@/app/components/AddTaskPopup";

const TaskTracker = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Description for Task 1",
      status: "incomplete",
      time: "12:00 PM",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description for Task 2",
      status: "complete",
      time: "3:30 PM",
    },
    // Add more tasks as needed
  ]);

  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTask = (newTask) => {
    if (editTaskId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId
            ? { ...task, ...newTask, status: task.status }
            : task
        )
      );
      setEditTaskId(null);
    } else {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: prevTasks.length + 1,
          ...newTask,
          status: "incomplete",
          time: "4:45 PM",
        }, // Change time logic here
      ]);
    }
    setShowAddTaskPopup(false);
  };

  const handleEditTask = (taskId, title, description) => {
    setShowAddTaskPopup(true);
    setEditTaskId(taskId);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "complete" ? "incomplete" : "complete",
            }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>

        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setShowAddTaskPopup(true);
              setEditTaskId(null);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Add Task
          </button>
        </div>

        {showAddTaskPopup && (
          <AddTaskPopup
            onSubmit={handleAddTask}
            onCancel={() => {
              setShowAddTaskPopup(false);
              setEditTaskId(null);
            }}
            editTaskId={editTaskId}
            tasks={tasks}
          />
        )}
      </div>
    </div>
  );
};
export default TaskTracker;

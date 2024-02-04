"use client";
import { useState } from "react";
import TaskList from "@/app/components/TaskList";
import AddTaskPopup from "@/app/components/AddTaskPopup";

const TaskTracker = ({ taskData }) => {
  const [tasks, setTasks] = useState(taskData);

  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTask = async (newTask) => {
    // If Edit Task Id is not null, it means, Edit It!
    if (editTaskId !== null) {
      const res = await fetch("/api/update-task", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editTaskId,
          ...newTask,
        }),
      });

      const updatedTask = await res.json();

      if (updatedTask.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editTaskId ? updatedTask["data"] : task
          )
        );
      }
      setEditTaskId(null);
    } else {
      const res = await fetch("/api/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const addedTask = await res.json();
      if (addedTask.success) {
        setTasks((prevTasks) => [...prevTasks, addedTask["data"]]);
      }
    }
    setShowAddTaskPopup(false);
  };

  const handleEditTask = (taskId, title, description) => {
    setEditTaskId(taskId);
    setShowAddTaskPopup(true);
  };

  const handleDeleteTask = async (taskId) => {
    const res = await fetch(`/api/delete-task?id=${taskId}`, {
      method: "DELETE",
    });

    const deletedTask = await res.json();
    if (deletedTask.success) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  const handleToggleTask = async (taskId, value) => {
    const res = await fetch(`/api/update-task`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: taskId,
        completed: value,
      }),
    });
    const updatedTask = await res.json();

    if (updatedTask.success) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                completed: value,
                updatedAt: updatedTask["data"].updatedAt,
              }
            : task
        )
      );
    }
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

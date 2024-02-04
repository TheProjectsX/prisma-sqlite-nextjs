"use client";

import Task from "./Task";

const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEdit={() => onEdit(task.id, task.title, task.description)} // Pass task details to onEdit
          onDelete={() => onDelete(task.id)}
          onToggle={() => onToggle(task.id, !task.completed)}
        />
      ))}
    </ul>
  );
};

export default TaskList;

"use client";

import Task from "./Task";

const TaskList = ({ tasks, onEdit, onToggle }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEdit={() => onEdit(task.id, task.title, task.description)} // Pass task details to onEdit
          onToggle={() => onToggle(task.id)}
        />
      ))}
    </ul>
  );
};

export default TaskList;

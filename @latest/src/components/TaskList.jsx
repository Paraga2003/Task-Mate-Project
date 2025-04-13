import React from "react";

const TaskList = ({ tasks, onDelete, onToggleComplete }) => {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-600 text-center mt-6">
        No tasks available. Add a task to get started!
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`p-4 rounded-xl shadow-md border ${
            task.completed ? "bg-green-100" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{task.description}</p>
              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <span className="inline-block mt-2 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                {task.category}
              </span>
            </div>

            <div className="space-x-2 mt-1">
              <button
                onClick={() => onToggleComplete(task._id)}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  task.completed
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>

              <button
                onClick={() => onDelete(task._id)}
                className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

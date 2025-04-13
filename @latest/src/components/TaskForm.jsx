// TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = ({ onSubmit, initialTask = {}, isEditing = false }) => {
  const [task, setTask] = useState({
    title: initialTask.title || '',
    description: initialTask.description || '',
    dueDate: initialTask.dueDate || '',
    category: initialTask.category || '',
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    if (!isEditing) {
      setTask({ title: '', description: '', dueDate: '', category: '' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md max-w-md w-full mx-auto mb-6"
    >
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
        {isEditing ? 'Edit Task' : 'Add New Task'}
      </h2>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={task.category}
        onChange={handleChange}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;

// src/App.jsx
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from './axiosConfig';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editTask, setEditTask] = useState(null);
  const categories = ['Work', 'Personal', 'Study', 'Other'];

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err); // ✅ catch CORS or network errors
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addOrUpdateTask = async (taskData) => {
    if (editTask) {
      await axios.put(`http://localhost:4000/api/tasks/${editTask._id}`, taskData);
      setEditTask(null);
    } else {
      await axios.post('http://localhost:4000/api/tasks', taskData);
    }
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:4000/api/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (id) => {
    const task = tasks.find((t) => t._id === id);
    await axios.patch(`http://localhost:4000/api/tasks/${id}`, { completed: !task.completed });
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filteredCategory ? task.category === filteredCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl bg-amber-100 mx-auto p-15 hover:shadow-lg  rounded-2xl ">
      <h1 className="text-3xl font-bold text-center mb-6  hover:text-blue-900 ">Task Mate </h1>

      <TaskForm
        onSubmit={addOrUpdateTask}
        existingTask={editTask}
        categories={categories}
      />

      <div className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-1">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-[49%]"
        />
        <select
          value={filteredCategory}
          onChange={(e) => setFilteredCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-[49%]"
        >
          <option value="">Filter by Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={setEditTask}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
};

export default App;

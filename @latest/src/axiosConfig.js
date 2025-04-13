import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://task-mate-project.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  //withCredentials: true
});

export default instance;
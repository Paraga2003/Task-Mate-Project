


// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5177', // make sure this matches your frontend port exactly
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type'],
//   credentials: true,
// }));
// app.use(cors({
//   origin: true, // reflect the request origin
//   credentials: true
// }));




// const PORT = process.env.PORT || 5000;

// //MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
  
//   })
//   .catch((err) => console.error(err));
  


// // Routes
// const taskRoutes = require('./routes/tasks');
// app.use('/api/tasks', taskRoutes);

// // Run server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  //credentials: true
}));


// Most permissive configuration for development

app.use(express.json());
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/test', (req, res) => {
  res.send('CORS is working');
});

// Start server
app.listen(PORT, '0.0.0.0' , () => {
  console.log(`Server running on port ${PORT}`);
});


const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const adminRouter = require('./routes/adminRouter');
const employeeRouter = require('./routes/employeeRouter');
const skillRouter = require('./routes/skillRouter');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/skills', skillRouter);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Employee Management System API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

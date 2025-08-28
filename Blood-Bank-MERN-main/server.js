require('dotenv').config(); // Load environment variables

const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db.js'); // Import DB connection

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test', require('./routes/testRroute.js'));
app.use('/api/v1/auth', require('./routes/authRoute.js'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes.js'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes.js'));
app.use('/api/v1/admin', require('./routes/adminRoutes.js'));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.DEV_MODE} on port ${PORT}`.bgBlue.white)
);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const blogRoutes = require('./routes/blog.js')
const connectDB = require('./config/database.js');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

//Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);


connectDB();

//Routes
// app.get('/', (req, res) =>{
//   res.send("Blogging Platform API");
// })
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  winston.error(err.stack);
  return res.status(500).json({
    message: "Something went wrong",
    success: true,
  })
});

module.exports = app;
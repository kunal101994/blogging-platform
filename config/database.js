const mongoose = require('mongoose');

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Mongodb Connected Successfully');
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
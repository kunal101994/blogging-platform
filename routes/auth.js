const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const router = express.Router();

//Register
router.post('/register', async (req, res) =>{
  const {username, email, pssword, role} = req.body;
  try {
    const user = new User({username, email, password, role});
    await user.save();
    return res.status(201).json({
      message: "User registered successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Registration Failed",
      success: false
    });
  }
});

//Login
router.post('/login', async (req, res) =>{
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false
      });
    }
    const token = jwt.sign({ userId: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '2d'});
    res.json({token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Invalid credentials",
      success: false
    });
  }
});


module.exports = router;
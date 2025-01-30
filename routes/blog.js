const express = require('express');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/auth.js');
const { populate } = require('../models/User.js');
const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const {  title, content, tags, image} = req.body;
  try {
    const blog = new Blog({ title, content, tags, images, author: req.userId});
    await blog.save();
    return res.status(201).json({
      message: "Blog created successfully",
      success: true,
      blog
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Blog creation failed",
      success: false
    });
  }
});

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const blogs = await Blog.paginate({}, {page, limit, populate: 'author'});
    return res.status(200).json({
      message: "Blogs fetched successfully",
      success: true,
      blogs
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch blogs",
      success: false
    })
  }
})

module.exports = router;
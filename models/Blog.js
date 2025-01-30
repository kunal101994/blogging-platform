const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String
  }],
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, 
{timestamps: true})

blogSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true});
  next();
});



module.exports = mongoose.model('Blog', blogSchema);
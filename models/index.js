const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User has many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // Delete posts if the user is deleted
});

// Post belongs to User
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// Post has many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE', // Delete comments if the post is deleted
});

// Comment belongs to a Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

// Comment belongs to a User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Post, Comment };
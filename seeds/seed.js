const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Seed Users
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Seed Posts
    const posts = await Promise.all(
      postData.map(async (post) => {
        return await Post.create({
          ...post,
          user_id: users[Math.floor(Math.random() * users.length)].id,
        });
      })
    );

    // Seed Comments
    await Promise.all(
      commentData.map(async (comment) => {
        return await Comment.create({
          ...comment,
          user_id: users[Math.floor(Math.random() * users.length)].id,
          post_id: posts[Math.floor(Math.random() * posts.length)].id,
        });
      })
    );

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed database:', err);
    process.exit(1);
  }
};

seedDatabase();
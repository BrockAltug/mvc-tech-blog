const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    console.log('Syncing database...');
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    console.log('Seeding users...');
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    console.log('Seeding posts...');
    const posts = await Promise.all(
      postData.map(async (post) => {
        return await Post.create({
          ...post,
          user_id: users[Math.floor(Math.random() * users.length)].id,
        });
      })
    );

    console.log('Seeding comments...');
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
  } catch (err) {
    console.error('Failed to seed database:', err);
    throw err;
  }
};

module.exports = seedDatabase;
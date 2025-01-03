const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Render the homepage with all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load the homepage.' });
  }
});

// Render a single post with its comments
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });

    if (!postData) {
      return res.status(404).json({ message: 'No post found with this ID.' });
    }

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load the post.' });
  }
});

// Render the dashboard for the logged-in user
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load the dashboard.' });
  }
});

// Render the edit post page
router.get('/editPost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      return res.status(404).json({ message: 'No post found with this ID.' });
    }

    const post = postData.get({ plain: true });

    res.render('editPost', {
      ...post,
      logged_in: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load the edit post page.' });
  }
});

// Render the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }

  res.render('login');
});

// Render the signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }

  res.render('signup');
});

module.exports = router;
const withAuth = (req, res, next) => {
  try {
    // Check if the user is logged in
    if (!req.session || !req.session.logged_in) {
      // Redirect to login if the user is not authenticated
      return res.redirect('/login');
    }
    // If authenticated, proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Authentication middleware error:', err);
    // Send a generic error response in case of unexpected issues
    res.status(500).json({ message: 'Authentication error. Please try again later.' });
  }
};

module.exports = withAuth;
const router = require('express').Router();

// Import API routes from the api directory
const apiRoutes = require('./api');

// Use api routes when '/api' is visited
router.use('/api', apiRoutes);

// If no API routes are hit, send the 404
router.use((req, res) => {
  res.status(404).send('<h1>😞 404 Error!</h1>');
});

module.exports = router;


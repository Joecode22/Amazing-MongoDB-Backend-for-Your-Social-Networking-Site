const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Add '/users' prefix to routes in user-routes.js
router.use('/users', userRoutes);

// Add '/thoughts' prefix to routes in thought-routes.js
router.use('/thoughts', thoughtRoutes);

module.exports = router;

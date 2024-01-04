const router = require('express').Router();
const userRoutes = require('./userRoutes');
const toughtRoutes = require('./thoughtRoutes');

router.use('/thoughts', toughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
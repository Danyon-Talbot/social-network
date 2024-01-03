const router = require('express').Router();
const userRoutes = require('./userRoutes');
const appRoutes = require('./appRoutes');

router.use('/apps', appRoutes);
router.use('/users', userRoutes);

module.exports = router;
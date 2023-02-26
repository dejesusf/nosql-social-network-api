const router = require('express').Router();
const thoughtRoute = require('./thought-route');
const userRoute = require('./user-route');

router.use('/thoughts', thoughtRoute);
router.use('/users', userRoute);

module.exports = router;
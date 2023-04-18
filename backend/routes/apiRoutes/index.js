const express = require('express');
const router = express.Router();

router.use(require('./dataRoutes'));
router.use(require('./linkRoutes'));


module.exports = router;
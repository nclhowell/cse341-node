const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'))
router.use('/swagdocs', require('./swag'))

module.exports = router;

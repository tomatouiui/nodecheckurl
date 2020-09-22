const express = require('express');
const cloudcardController = require('../controllers/cloudcardController');

const router = express.Router();

router.get('/:id', cloudcardController.cloudcard_index);

module.exports = router;
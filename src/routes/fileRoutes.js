const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');


router.post("/fileanalyse", fileController.uploadFileAndAnalyze)


module.exports = router 
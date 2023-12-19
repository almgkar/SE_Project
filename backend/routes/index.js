const express = require('express');
const router = express.Router();

const searchRoutes = require('./searchRoutes');  
router.use('/search', searchRoutes);  


module.exports = router;

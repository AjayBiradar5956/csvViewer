const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.post('/uploads', homeController.upload);
router.get('/delete/:id', homeController.delete);
router.get('/view/:id', homeController.view);


module.exports = router;

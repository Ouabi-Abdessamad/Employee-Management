const express = require('express');
const router = express.Router();
const {registerAdmin, loginAdmin, currentAdmin} = require('../controllers/adminController');
const {bodyPutValidator} = require('../middleware/bodyValidator');
const validateToken = require('../middleware/validateTokenHandler');


router.route('/register').post(bodyPutValidator, registerAdmin);
router.route('/login').post(bodyPutValidator, loginAdmin);
router.get('/current', validateToken, currentAdmin);

module.exports = router;
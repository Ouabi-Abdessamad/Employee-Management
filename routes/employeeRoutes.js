const express = require('express');
const router = express.Router();
const {getEmployee, 
      getEmployeeById, 
      createEmployee, 
      updateEmployeeById, 
      deleteById
} = require('../controllers/employeeController');
const {bodyPostValidator, bodyPutValidator} = require('../middleware/bodyValidator');
const validateToken = require('../middleware/validateTokenHandler');

      
//same route can share the route method
router.use(validateToken);
router.route('/').get(getEmployee).post(bodyPostValidator, createEmployee);
router.route('/:id').get(getEmployeeById).put(bodyPutValidator, updateEmployeeById).delete(deleteById);

module.exports = router;
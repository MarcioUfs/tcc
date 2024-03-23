const express = require('express');
const verifyJWTAdmin = require('../middleware/verifyJWTAdmin');
const verifyJWT = require('../middleware/verifyJWT');
const userController = require('../controllers/UserController');

const router = express.Router();
// router.get('/', userController.welcome);
router.post('/sign-up', verifyJWT, userController.create);
router.post('/login', userController.login);
router.post('/confirm', verifyJWTAdmin, userController.confirmAdmin );
router.get('/allusers',verifyJWT,userController.allUsers);
router.post('/deleteuser',verifyJWT,userController.deleteUser);
router.put('/updateuser/:id',verifyJWT,userController.updateUser);
router.post('/catchuser',verifyJWT,userController.catchUser);

module.exports = router;
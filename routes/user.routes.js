const express = require('express');
const router = express.Router();
const {validateForm} = require('../middlewares/validate-form')
const {validateEmail} = require('../middlewares/validate-email')
const {validateToken} = require('../middlewares/validate-token');
const {validateRole} = require('../middlewares/validate-role');
const {check} = require ("express-validator");

const {getUsers, getUser, postUser, loginUser, logoutUser} = require ('../controllers/user.controller');

router.get('/users', getUsers);


router.get('/user', getUser);


router.post('/login', [
        check('email', 'email incorrect format').isEmail(),
        check('password_', 'password can not be empty').notEmpty(),
        validateForm
    ],loginUser);


router.post('/logout', logoutUser);


router.post('/users',[
    check('first_name', 'first name can not be empty').notEmpty(),
    check('last_name', 'last name can not be empty').notEmpty(),
    check('password_', 'password can not be empty').notEmpty(),
    check('company', 'company can not be empty').notEmpty(),
    check('email', 'email incorrect format').isEmail(),
    check('language_', 'language can not be empty').notEmpty(),
    check('gender', 'gender can not be empty').notEmpty(),    
    validateEmail,   
    validateForm
    ], postUser)

    
router.get('/check-auth', 
    validateToken, 
    (req, res) => {res.json({ isAuthenticated: true });});


module.exports = router
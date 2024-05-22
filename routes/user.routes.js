const express = require('express');
const router = express.Router();
const {validateForm} = require('../middlewares/validate-form')
const { check } = require ("express-validator");


const {getUsers, postUser, getUserById} = require ('../controllers/user.controller')

router.get('/users', getUsers);


router.get('/users/:id', getUserById);

router.post('/users',[
    check('first_name', 'first name can not be empty').notEmpty(),
    check('last_name', 'last name can not be empty').notEmpty(),
    check('password_', 'password can not be empty').notEmpty(),
    check('company', 'company can not be empty').notEmpty(),
    check('email', 'email incorrect format').isEmail(),
    check('language_', 'language can not be empty').notEmpty(),
    check('gender', 'gender can not be empty').notEmpty(),       
    validateForm
    ], postUser)

module.exports = router

const { Request, Response} = require('express')
const User = require('../models/users')



const validateEmail = async (req , res,  next ) => {


    email = req.body.email

    user = await User.findAll({
        where:{
            email:email
        }
    })

    if(user.length  > 0)
        return res.status(404).json({"msg" : "Email already registered"})

    next();
}

module.exports = {
    validateEmail
}
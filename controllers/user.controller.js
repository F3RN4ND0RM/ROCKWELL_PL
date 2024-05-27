const bcrypt = require('bcrypt');
const User = require('../models/users')
const jwt = require("jsonwebtoken");




exports.getUsers = async ( req, res) =>{

    try{

        const users = await User.findAll()

        if(users.length <= 0)
            return res.status(404).json({msg : "Not found"})

        return res.status(200).json(users)

    }catch(error){
        return res.status(400).json({msg : "Something went wrong", errores : error.message})
    }
}


exports.loginUser = async ( req, res) =>{

    try{

        const { email, password_ } = req.body

        const user = await User.findOne({where: {
            status : true,
            email: email
        }})

        if(!user)
            return res.status(404).json({msg : "wrong user or password"})
                           
        validPassword = await bcrypt.compare(password_, user.password_)

        if(!validPassword)
            return res.status(404).json({msg : "wrong user or password"})

        const token = jwt.sign({id: user.id, email: user.email, rol:user.rol, first_name: user.first_name, tscore: user.max_score}, process.env.SECRET, {expiresIn: "1h"})

        console.log(`Token generado: ${token}`)



        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
            sameSite: 'strict', // Protects against CSRF attacks
            maxAge: 3600000 // 1 hour in milliseconds
          });

        return res.status(200).json({msg : "welcome"})

    }catch(error){
        return res.status(400).json({msg : "Something went wrong", errores : error.message})
    }
}


 exports.postUser = async (req, res) =>{
    
    let body = req.body
    const salt = await bcrypt.genSalt(10);
    body.password_ = await bcrypt.hash(body.password_, salt);
    
    try{

        const user = await User.create(body);

        if(user){
            const token = jwt.sign({id: user.id, email: user.email, rol:user.rol, first_name: user.first_name, tscore: user.max_score}, process.env.SECRET, {expiresIn: "1h"})
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
                sameSite: 'strict', // Protects against CSRF attacks
                maxAge: 3600000 // 1 hour in milliseconds
              });

            return res.status(200).json({msg : "User Created Succesfully"})
        }

        return res.status(400).json({msg : "Something went wrong", errores : error.message})

    }catch(error){
        return res.status(400).json({msg : "Something went wrong", errores : error.message})        
    }
 }


 exports.logoutUser = async (req, res) => {

    try{
        res.cookie('authToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            expires: new Date(0),
            path: '/',
        });
        res.status(200).send('Logged out successfully');
    } catch (error) {
        return res.status(400).json({msg : "Something went wrong", errores : error.message})
    }
}
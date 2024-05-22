const User = require('../models/users')


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
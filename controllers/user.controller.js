const bcrypt = require('bcrypt');
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


exports.getUserById = async ( req, res) =>{

    try{

        const { id } = req.params

        const user = await User.findOne({where: {
            status : true,
            id: id
        }})

        if(user)
            return res.status(200).json(user)
                           
        return res.status(404).json({msg : "Not found"})

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

        if(user)
            return res.status(200).json({msg : "User Created Succesfully", user : user})

        return res.status(400).json({msg : "Something went wrong", errores : error.message})

    }catch(error){
        return res.status(400).json({msg : "Something went wrong", errores : error.message})        
    }
 }
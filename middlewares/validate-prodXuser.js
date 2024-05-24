

const { Request, Response} = require('express')
const {Product , User, ProdXUser} = require('../models/associations')




const validateProdXUser = async (req , res,  next ) => {


    const  {idUser}  = req.body
    const  {idProduct}  = req.params



    product = await Product.findOne({where : { id : idProduct}})

    if(!product)
        return res.status(400).json({msg : "Product doesnt exist"});

    user = await User.findOne({where : {id : idUser}})

    if(!user)
        return res.status(404).json({msg : "User doesnt exist"})


    let prodXuser = await ProdXUser.findAll({where: {
        user_id : idUser,
        product_id : idProduct
    }})
    
    if(prodXuser.length> 0){
        prodXuser = await ProdXUser.update(
                {date_ : new Date (Date.now())},
                {where: {
                    user_id : idUser,
                    product_id : idProduct
                }})

        return res.status(200).json({msg : "click updated"})
    }


    next();
}

module.exports = {
    validateProdXUser
}

        

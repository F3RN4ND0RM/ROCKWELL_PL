
const {Product , User, ProdXUser} = require('../models/associations')


exports.getProducts  = async (req, res) => {
        
    try {
        
        const products = await Product.findAll({where: { status : true}});

        if(products.length <= 0)
            return res.status(404).json({msg : "Not found"})

        return res.status(200).json(products)

    }catch(error){
        return res.status(400).json({msg : "Something went wrong", errores : error.message})
    }

}

exports.getProductsById = async (req, res) =>{
    
    const { id }  = req.params
    try{
        
        const product = await Product.findOne({where: {
            id : id,
            status : true
        }})

        if(product)
            return res.status(200).json({product})

        return res.status(400).json({msg : "Something went wrong", errores : error.message})

    }catch(error){
        return res.status(400).json({msg : "Something went wrong", errores : error.message})        
    }
}


exports.postProducts = async (req, res) => {
    try{
        
        const body = req.body

        let producto = await Product.create(body);

        if(producto)
            return res.status(200).json({msg : "Product Created Succesfully", sproducto : producto})

        return res.status(400).json({msg : "Something went wrong", errores : error.message})


    }catch(error){
        return res.status(400).json({msg : "Something went wrong", errores : error.message})
    }
}

exports.clickProduct = async (req, res) =>{
    

    const  idUser  = req.query.idUser
    const  idProduct  = req.query.idProduct

    try{

        const prodxuser =  await ProdXUser.create({
            product_id : idProduct,
            user_id : idUser
        });

        if(!prodxuser)
            return res.status(400).json({msg : "Something went wrong", errores : error.message})        

 
        res.status(200).json({msg : "Click registered succesfully"});            

    }catch(error){
        return res.status(400).json({msg : "Something went wrong", errores : error.message})        
    }
}
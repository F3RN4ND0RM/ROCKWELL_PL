const Product = require('../models/products');


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
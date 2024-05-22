const Product = require('../models/products');

exports.getProducts  = async (req, res) => {
        
    try {
        
        const products = await Product.findAll();

        if(products.length <= 0)
            return res.status(404).json({msg : "Not found"})

        return res.status(200).json(products)

    }catch(error){
        return res.status(400).json({msg : "Something went wrong", errores : error.message})
    }

}

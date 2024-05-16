const Product = require('../models/products');

exports.getProducts  = async (req, res) => {
        
    try {
        
        const products = await Product.findAll();

        if(products.length == 0)
            return res.status(404).json({msg : "No se encontraron registros"})

        return res.status(200).json(products)

    }catch(error){
        return res.status(400).json({msg : "Algo salio mal", errores : error.message})
    }

}

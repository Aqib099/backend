const Quantity=require("../models/quantity");

const createQuantity = async (req,res,next)=>{
    try{
        const{productId,value} = req.body;
        const quantity = new Quantity({
            productId,
            value

        })
        await quantity.save();
        res.status(201).json({message:"Quantity created successfully!"})

    }catch(error){
        next(error)
        //res.status(404).json({message:"Quantity not created"})
    }
}

const getQuantityByProductId = async(req,res,next)=>{
    try{
    const {productId} = req.params;
    const quantities = await Quantity.find({productId}).populate("productId")
    res.status(201).json(quantities);
}   
catch(error){
    next(error);
}
}

module.exports = {
    createQuantity,
    getQuantityByProductId
}
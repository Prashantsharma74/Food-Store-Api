const User = require("../model/userSchema")
const Products = require("../model/productSchema")
const asyncHandler = require("express-async-handler")

const allProducts = async (req, res) => {

    const allData = await Products.find()

    if (!allData) {
        res.status(401)
        res.send("Not Found..")
    } else {
        res.status(200)
        res.send(allData)
    }

}

const createProduct = asyncHandler(async (req, res) => {

    const { product_name, price, category, image, availability } = req.body

    if (!product_name || !price || !category || !image || !availability) {
        res.status(401)
        throw new Error("Pls fill all details")
    }

    const product = await Products.create({
        product_name,
        price,
        category,
        image,
        availability
    })

    if (product) {
        res.status(200).json(product)
    } else {
        res.status(401)
        throw new Error("Cannot Create Product")
    }

})

const deleteProduct = asyncHandler(async (req, res) => {

    const deletedFeedback = await Products.findByIdAndDelete(req.params.id)

    if(!deletedFeedback){
        res.status(401)
        res.send("Cannot Delete")
    }else{
        res.status(200)
        res.send("Deleted")
    }

})

const updateProduct = async (req, res) => {
    
    const updatedFeedback = await Products.findByIdAndUpdate(req.params.id,req.body,{new : true})

    if(!updatedFeedback){
        res.status(401)
        res.send("Cannot Update")
    }else{
        res.status(200)
        res.send(updatedFeedback)
    }

}

module.exports = { allProducts, createProduct , deleteProduct , updateProduct}
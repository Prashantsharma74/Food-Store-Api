const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const { allProducts, createProduct, deleteProduct, updateProduct } = require("../controller/productController")
const router = express.Router()

router.get("/products",allProducts)
router.post("/add",createProduct)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)

module.exports = router
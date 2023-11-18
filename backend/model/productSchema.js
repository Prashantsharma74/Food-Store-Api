const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true,
        enum: ["Available", "Not Available"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Products", productSchema)
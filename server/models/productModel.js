import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
            brandId : String ,
            categoryId : String,
            productName : String,
            productPrice : String,
            productDesc : String,
            productImg : String
})

const productModel = mongoose.model('products', productSchema)

export default productModel
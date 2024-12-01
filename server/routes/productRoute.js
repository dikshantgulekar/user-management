import express from 'express'
import { addProduct, showProduct, showProductById } from '../controllers/productController.js';
import upload from '../middlewares/uploadMiddleware.js';


const productRoute = express.Router()

productRoute
.get('/', showProduct)
.get('/:userid', showProductById)
.post('/',upload.single('productImg') , addProduct)

export default productRoute;
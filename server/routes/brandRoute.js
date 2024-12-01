import express from 'express'

import { addBrand, showBrand } from '../controllers/brandController.js';


const brandRoute = express.Router()

brandRoute
.get('/', showBrand)
.post('/', addBrand)

export default brandRoute;
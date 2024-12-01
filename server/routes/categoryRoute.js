import express from 'express'

import { addCategory, showcategory } from '../controllers/categoryController.js';


const categoryRoute = express.Router()

categoryRoute
.get('/', showcategory)
.post('/', addCategory)

export default categoryRoute;
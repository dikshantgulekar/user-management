import express from 'express'
import checkUser from '../controllers/loginController.js';

const loginRoute = express.Router()

loginRoute
.post('/', checkUser)

export default loginRoute;
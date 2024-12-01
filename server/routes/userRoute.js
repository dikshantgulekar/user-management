import express from 'express'
import { addUser, showUser, showUserById,updateUserById,deleteUserById , updateUserStatus} from '../controllers/userController.js'


const userRoute = express.Router()

userRoute
.get('/', showUser)
.get('/:userid', showUserById)
.post('/', addUser)
.put('/:userid', updateUserById)
.put('/updateStatus/:userid', updateUserStatus)
.delete('/:userid', deleteUserById)


export default userRoute;
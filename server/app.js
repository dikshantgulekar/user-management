import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnection from './database/db.js'
import brandRoute from './routes/brandRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import loginRoute from './routes/loginRoute.js'
dotenv.config();

const app = express()



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/uploads', express.static('uploads'));

dbConnection().then(()=>{ console.log('connected')})

app.use('/brand', brandRoute)
app.use('/category', categoryRoute)
app.use('/product', productRoute)
app.use('/user', userRoute)
app.use('/login', loginRoute)


const PORT = process.env.PORT || 8000;

app.listen(process.env.PORT, ()=>{
    console.log('Server Running on 8000')
})
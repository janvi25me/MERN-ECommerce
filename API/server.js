import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'express'
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import paymentRouter from './Routes/payment.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(bodyParser.json())

app.use(cors({
    origin:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

//home testing route
app.get('/', (req,res) => res.json({message:'This is home route'}))

//user router
app.use('/api/user', userRouter) 

//product router
app.use('/api/product', productRouter) 

//Cart router
app.use('/api/cart', cartRouter)

//address router
app.use('/api/address', addressRouter)

//payment Router
app.use('/api/payment'/* , express.raw({ type: 'application/json' }) */,paymentRouter)

//webhook router
// app.use('/api/payment/webhook', paymentRouter)

mongoose.connect(
    "mongodb+srv://joshijanvi950:OTWda3zPpcGHvHAq@cluster0.0coky.mongodb.net/",
    {
        dbName: "MERN_ECommerce_YT"
    }
).then(() => console.log("MongoDB connected successfully...!")
).catch((err) => 
console.log(err))

let port = 1000
app.listen(port, () => console.log(`Server is running on port ${port}`))


//OTWda3zPpcGHvHAq
//mongodb+srv://joshijanvi950:OTWda3zPpcGHvHAq@cluster0.0coky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
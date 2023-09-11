import { Request, Response } from "express"
const dbConnect = require('./db')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

dbConnect()
const app = express()


// importing all routes 
const authRoute = require('./routes/auth')
const listingsRoute = require('./routes/listings')
const userRoute = require('./routes/users')
const favoriteRoute = require('./routes/favorites')
const reservationRoute = require('./routes/reservations')


var corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials:true
  }

app.use(cors(corsOptions))



  app.use(express.json())
  app.use(cookieParser());
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/listings', listingsRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/favorites', favoriteRoute )
app.use('/api/v1/reservations', reservationRoute)

app.get('/', (req:Request, res:Response) => {
    res.json({msg:'welcome to the api'})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('server is listening to the port'))




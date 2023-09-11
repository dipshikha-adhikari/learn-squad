const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

 async function dbConnect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('db connected'))
  .catch(err => {
    console.log('error connecting db', err)
  })
}

module.exports = dbConnect
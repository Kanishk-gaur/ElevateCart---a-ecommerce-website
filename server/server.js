const app = require('./app')
const cloudinary = require("cloudinary")
const connectDatabase = require("./config/database")
const cors = require('cors')

//handilg uncaught exception
process.on("uncaughtException", err => {
  console.log(`Error:${err.message}`);
  console.log(`Shitting down server due to some uncaught error`);
  process.exit(1);
})

if (process.env.NODE_ENV !== "PRODUCTION") {
  require('dotenv').config({ path: './config/config.env' })
}



connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})



const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//unhabdeled promise
process.on("unhandledRejection", err => {
  console.log(`Error: ${err.message}`);
  console.log(`Shitting down server due to some internal problem`);
  server.close(() => {
    process.exit(1);
  })
})
// DB_URI=mongodb+srv://kanishk:7017327309@cluster0.nrmcanf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

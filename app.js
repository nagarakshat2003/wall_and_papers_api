const express = require('express')
const app = express()
const mongoose = require('mongoose')
const wallpaperRoute = require('./api/routes/wallpaper')
const bodyParser = require('body-parser')
const userRoute = require('./api/routes/user')
const fileUpload = require('express-fileupload')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(fileUpload({
  useTempFiles:true
}))

mongoose.connect('mongodb+srv://nagarakshat2003:9413941893@cluster0.5ex76uy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connection.on('error',error=>{
  console.log('Connection failed!')
  console.log(error)
})
mongoose.connection.on('connected',connected=>console.log('Connected to Database'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/wallpaper',wallpaperRoute)
app.use('/user',userRoute)

app.use((request,response,next)=>{
  response.status(404).json({
    error:"Bad request!",
  })
})

module.exports = app
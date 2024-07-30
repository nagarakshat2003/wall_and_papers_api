const mongoose = require('mongoose')

const wallpaperSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  uploader:String,
  email:String,
  path:String
})

module.exports = mongoose.model('Wallpaper',wallpaperSchema)
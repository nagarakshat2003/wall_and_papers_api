const express = require('express')
const router = express.Router()
const Wallpaper = require('../model/wallpaper')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: 'dx57sbzcl', 
  api_key: '483817318781433', 
  api_secret: '3_MO2ZRL6pei6252AZVgM-dxYWs'
});

router.get('/',(request,response,next)=>{
  Wallpaper.find().then(result=>{
    response.status(200).json(result)
  }).catch(error=>{
    response.status(500).json({
      error:error
    })
  })
})

router.get('/profile/:email',checkAuth,(request,response,next)=>{
  Wallpaper.find({email:request.params.email}).then(result=>{
    response.status(200).json(result)
  }).catch(error=>{
    response.status(500).json({
      error:error
    })
  })
})

router.get('/:id',(request,response,next)=>{
  Wallpaper.findById(request.params.id).then(result=>{
    response.status(200).json(result)
  }).catch(error=>{
    response.status(500).json({
      error:error
    })
  })
})

router.post('/',checkAuth,(request,response,next)=>{
  const file = request.files.photo
  cloudinary.uploader.upload(file.tempFilePath,(error,result)=>{
    const wallpaper = new Wallpaper({
      _id:new mongoose.Types.ObjectId,
      uploader:request.body.uploader,
      email:request.body.email,
      path:result.url
    })
    wallpaper.save().then(result=>{
      console.log(result)
      response.status(200).json(result)
    }).catch(error=>{
      console.log(error)
      response.status(500).json({
        error:error,
      })
    })
  })
})

router.delete('/',checkAuth,(request,response,next)=>{
  const id = request.query.id
  const path = request.query.path
  const imageArr = path.split('/')
  var imageName = imageArr[imageArr.length-1]
  imageName = imageName.split('.')[0]
  Wallpaper.deleteOne({_id:id}).then(result=>{
    cloudinary.uploader.destroy(imageName,(error,result)=>{})
    response.status(200).json({
      message:"Product deleted!",
    })
  }).catch(error=>{
    response.status(500).json({
      error:error,
    })
  })
})

module.exports = router
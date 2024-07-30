const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/sign-up',(request,response,next)=>{
  bcrypt.hash(request.body.password,10,(error,hash)=>{
    if(error){
      return response.status(500).json({
        error:error
      })
    }else{
      const user = new User({
        username:request.body.username,
        password:hash,
        _email:request.body.email
      })
      user.save().then(result=>{
        response.status(200).json(result)
      }).catch(error=>{
        response.status(500).json({
          error:error
        })
      })
    }
  })
})

router.post('/login',(request,response,next)=>{
  User.find({_email:request.body.email}).exec().then(user=>{
    if(user.length===0){
      return response.status(401).json({
        message:"User not found"
      })
    }
    bcrypt.compare(request.body.password,user[0].password,(error,result)=>{
      if(!result){
        return response.status(401).json({
          message:"Incorrect password!"
        })
      }else{
        const token = jwt.sign({
          username:user[0].username,
          _email:user[0]._email,
        },'Got login credentials'
        // ,{expiresIn:'24h'}
      )
        response.status(200).json({
          username:user[0].username,
          _email:user[0]._email,
          token:token
        })
      }
    })
  }).catch(error=>{
    response.status(500).json({
      error:error
    })
  })
})

module.exports = router
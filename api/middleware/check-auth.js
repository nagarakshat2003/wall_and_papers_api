const jwt = require('jsonwebtoken')

module.exports = (request,response,next)=>{
  try{
    const token = request.headers.authorization.split(' ')[1]
    const verify = jwt.verify(token,'Got login credentials')
    if(verify){
      return next()
    }else{
      return res.status(401).json({
        msg:'Invalid User'
      })
    }
  }catch(error){
    return response.status(401).json({
      message:"Invalid"
    })
  }
}
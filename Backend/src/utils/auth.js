//refresh token aur acces token layenge 
//usko refresh token me add karna  hai =>//cookie me store hog a usko decode ekarke data ko req params me stor karna hai

const { json } = require("express")
const ApiError = require("./ApiError")
const ApiResponse = require("./ApiResponse")
const jwt=require('jsonwebtoken')

const User=require('../models/user')


const verifyUser=async(req,res,next)=>{
      
      try{
        console.log(req.headers)
        const data=( req.headers['authorization']?.split(' ')[1]||req.cookies.AccessToken||req.body.Owner)
        console.log(data)
        if(!data){
            throw new ApiError(404,'no user found')
        }
        console.log(data)
        const verify=jwt.verify(data,'abcd')
        console.log(verify.id)
        const logUser=await User.findById(verify.id)
        if(!logUser){
            throw new ApiError(400,'no user found')
        }
        console.log('logUser',logUser)
        req.user=logUser
        next()
      } 
      catch(error){
           console.log(error)
           if(error instanceof ApiError){
            return res.status(error.statusCode).json(
               {message:error.message,
                status:'error'
               }
            )
           }
           return res.status(500).json(
            {
              message:"Internal server error",
              status:"error"
            }
           )
      }
}

//ref tyoken ko verify karke acess ko lana hai 
//to write 

module.exports=verifyUser

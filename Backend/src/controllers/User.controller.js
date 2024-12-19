//user data se pehele reg aur login , logout
//user info // user listings
// debugged Succesfully
//reg
const cookieParser=require('cookie-parser')
const Listings=require('../models/Listing')
const ApiError=require('../utils/ApiError')
const ApiRes=require('../utils/ApiResponse')
const User=require('../models/user')
const regUser=async(req,res)=>{
    const{name,BusinessName,email,password}=req.body
    console.log(req.body)
    console.log(name,BusinessName,email,password);
    [name,BusinessName,email,password].forEach((i)=>{
        if(!i||i==""){
            throw new ApiError(404,`${i}`)
        }
    })
    const existingUser=await User.findOne({email})
    if(existingUser){
        throw new ApiError(400,'email already exists')
    }
    const newUser=await User.create({
         name,
         BusinessName,
         email,
         password
    })
    res.status(200).json(
        new ApiRes(200,newUser,'user created succesfully')
    )
}

//login

const LoginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const LogUser=await User.findOne({email:email})
        if(!LogUser){
            throw new ApiError(404, 'user not found')
        }
        // const checkPasconst checkPass=
        const oldPass=await LogUser.password
        
        // console.log(oldPass,LogUser,password)
    
    
        if(oldPass!==password){
            throw new ApiError(401,'wrong Password')
        }
    
        const RefreshToken=await LogUser.getRefreshToken()
        // console.log(RefreshToken)
        LogUser.RefreshToken=await RefreshToken
        await LogUser.save()
        const AccessToken=await LogUser.getAcessToken()
    
        const option={
            httpOnly:true,
            secure:true
        }
       
        res.status(200)
            .cookie("RefreshToken",RefreshToken,option)
            .cookie("AccessToken",AccessToken,option)
            .json(new ApiRes(200, {LogUser,AccessToken},"logged in completely"))
        //generate access token and refreshtoken
        //cookie me stor karna hai
    
    } catch (error) {
        console.log(error)

        if(error instanceof ApiError){
            return res.status(error.statusCode).json(
                {
                   status:'error',
                   message:error.message
                }
            )
        }

        return res.status(500).json(
            {
                status:'error',
                message:'server error'
            }
        )
        
    }
   
   
    
}

const LogOut=async(req,res)=>{
    const id=req.user._id
    console.log("id",req.user)
   try {
     if(! id ){
         throw new ApiError(404, 'no user found')
     }
     const LogOutUser=await User.findById(id)
     if(!LogOutUser){
         throw new ApiError(401, "unauthriozed acces")
     }
     LogOutUser.RefreshToken=undefined
     const user=await LogOutUser.save()
 
     const option={
         httpOnly:true,
         secure:true
     }
 
     res.status(200)
        .clearCookie("RefreshToken",option)
        .clearCookie("AccessToken",option)
        .json(
          new ApiRes(200,user,'logout succes')
        )
   } catch (error) {
      console.log(error)

      if(error instanceof ApiError){
        return res.status(error.statusCode).json({
            status:'error',
            message:error.message
        })
      }

      return res.status(500).json({
        status:'error',
        message:'internal server error'
      })
    
   }
}

const UserInfo=async(req,res)=>{
    //data in req.user

   try {
     const id=req.user._id
     console.log(req.user)
     const user=await User.findById(id)
     if(!user){
         throw new ApiError(404 , 'no user found')
     }
      res.status(200).json(
         new ApiRes(200, user ,'succesfull got user Info')
      )
   } catch (error) {
    console.log(error)

    if(error instanceof ApiError){
        return res.status(error.statusCode).json(
            {
               status:'error',
               message:error.message
            }
        )
    }

    return res.status(500).json(
        {
            status:'error',
            message:'server error'
        }
    )
    
}
    
   
}

const allLis=async(req,res)=>{
     const user=req.user._id

     try {
        if(!user){
           throw new ApiError(401,'you shld login')
        }
        const allLis=await Listings.find({user:user})
        if(!allLis){
           throw new ApiError(404,'no listings found')
        }
   
        res.status(200).json(
           new ApiRes(200,allLis,'data fetched success')
        )
     } catch (error) {
        console.log(error)

        if(error instanceof ApiError){
            return res.status(error.statusCode).json(
                {
                   status:'error',
                   message:error.message
                }
            )
        }

        return res.status(500).json(
            {
                status:'error',
                message:'server error'
            }
        )
        
   
     }
}
module.exports={
    allLis,
    regUser,
    LoginUser,
    LogOut,
    UserInfo
}
const { json } = require('body-parser')
const Listing=require('../models/Listing')
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const multer = require('../utils/multer')
const uploadCloudinary = require('../utils/Cloudiary')
const { get } = require('mongoose')
const verifyJwt=require('../utils/auth')

// const Listing = require('../models/Listing')
//shld create listing =>post method
//accees the listings =>get method
//delete the lisitings=>delete=>post
//update the lisitngs=>update patch


const asyncHandler=(fn)=>{
    return(req,res,next)=>{
       Promise.resolve(fn(req,res,next))
        .catch((error)=>(next(error)))
    }
}

//create the listings
const CreateListings=asyncHandler(async(req,res)=>{
     const{title,description,price, location,country}=req.body;
      console.log(req.body)
     
    try{

       const Owner=req.user._id
     
      for(i of [title,description,price, location,country]){
         if(!i || i===undefined || i===''){
           console.log(i)
           throw  new ApiError(404,"no data found")
         }
      }
      console.log(req.Cookies)
      
     
       if(!Owner){
         throw new ApiError(401,'Login is required')
      }
  
      const ImgPath=req.file?.path
      console.log(ImgPath,req.file,req.files)
      if(!ImgPath){
         throw new ApiError(404,'no img')
      }
      const uploadImg=await uploadCloudinary(ImgPath)
      if(!uploadImg){
         throw new ApiError(400,'img not upload')
      }
 
 
     const SaveUser=await Listing.create({
         title,
         description,
         price,
         location,
         country,
         Owner,
         image:{
             url:uploadImg.url||''
         }
        
      })
      
     const NewListing=await SaveUser.save();
     req.User=await NewListing
 
     
     return res.status(200).json(
         new ApiResponse(200,NewListing,"new listing created")
      )
 
   } catch (error) {

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
})


const AllListing=asyncHandler(async(req,res)=>{
  
   try {
     if(req.headers['authorization']?.split(' ')[1]||req.cookies.AccessToken||req.body.Owner){ 
          verifyJwt()
     }
 
      const AllListing=await Listing.find({})
      return res.status(200).json(
      new ApiResponse(200,AllListing,'Succes')
     )
   } catch (error) {
   
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
})

//delete the lisitings=>delete=>post
const deleteListing=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id)
        if(!id){
            throw new ApiError(404,'No Id Found')
        }
        const deleteLis=await Listing.findByIdAndDelete(id)
        return res.status(200).json(
            new ApiResponse(200,deleteLis,'successfully deleted')
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
        
    
})


//update the lisitngs(no img)=>update patch
const UpdateListing=asyncHandler(async(req,res)=>{

   try {
    
        const {id}=req.params
       
        if(!id){
            throw new ApiError(404,'no post to update')
        }
        console.log(id)
        const title=req.body.title
         const location=req.body.location
         const description=req.body.description
         const price=req.body.price
         const country=req.body.country
        console.log(title,description,price, location,country)
        const updatedetails=[title,description,price, location,country].filter((i)=>(i!=''))
        
        const User=await Listing.findByIdAndUpdate(id,{title,description,price
            ,location,country
        })
         console.log(User)
        //wrong  method updatedetails.map((i)=>(User.i=i))
        //new thing to learn
       
    
         
        res.status(200).json(
            new ApiResponse(200,User,'succesfully updated')
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
})

//update image 
const updateImg=asyncHandler(async(req,res)=>{
    
    const id='673dd86c76a3a2e8a94d686b';
    console.log(id)
    
   try {
     const listing=await Listing.findById(id)
     console.log(id)
     if(!listing){
         throw new ApiError(404,'no lis found')
     }
     const{img}=req.body
     console.log(img)
 
     
     
     const imgLink=req.files?.img[0]?.path
     console.log(imgLink)
     if(!imgLink){
         throw new ApiError(408,'internal error')
     }
     const uploadImg=await uploadCloudinary(imgLink)
     listing.image.url=updateImg.url
     listing.image.filename=updateImg.filename
     const result=await listing.save()
 
     ApiResponse(200,result,'succesfully uploded')
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

    
    

})

//get listing =>done
const getLis=asyncHandler(async(req,res)=>{
   try {
     const {id}=req.params
     console.log(id,req.params)
     const getLis=await Listing.findById(id)
     const Owner=await Listing.findById(id).populate('Owner')
     console.log(Owner)
     return res.status(200).json(
         new ApiResponse(200,{getLis,Owner},'Succes')
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
})


const LocationBylist=async(req,res)=>{
     try {
         const {Location}=req.body
         console.log(req.body)
         console.log(Location)
         const listing=await Listing.find({country:Location})
         console.log(listing)
   
         res.status(200).json(
            new ApiResponse(200,listing,'All listings')
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
const yourListing=async(req,res)=>{
    
     
   try {
     const Owner=req.user._id
     console.log(Owner)
    
     const listings=await Listing.find({Owner})
     console.log(listings)
     res.status(200).json(
          new ApiResponse(200,listings,'your listings')
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
    updateImg,
    AllListing,
    deleteListing,
    UpdateListing,
    CreateListings,
    getLis,
    LocationBylist,
    yourListing
}
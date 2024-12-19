//reqviw=>cooment in listimg and rating must and crud operations with listing id and review id
// const { default: Listing } = require('../../../react/vite-project/src/components/Listing')
const Listing=require('../models/Listing')
const Review = require('../models/review')
const ApiError = require('../utils/ApiError')
const apiError=require('../utils/ApiError')
const ApiResonse = require('../utils/ApiResponse')
const apiResponse=require('../utils/ApiResponse')


const createReview=async(req,res)=>{
    const{id}=req.params
    const review=req.body.review
    console.log(req.params, req.body)
    try {
        console.log(id,review)
        if(!id || !review){
            throw new  apiError(401,'something went wrong')
        }
       
        const owner=req.user._id
        console.log("create rev",owner)
        if(!owner){
             throw new apiError(401,'login is neede')
        }
        const rev= await Review.create({
               review,
               listing:id,
               owner
        })
        res.status(200).json(
             new apiResponse(200, rev,'succesfully reviwed')
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


const deleteRev=async(req,res)=>{
       try {
         const user=req.user._id
         //user ka id le raha hu
         console.log("user",user)
 
         const rev_id=req.params.rev_id
         console.log(rev_id)
         const revOwners=await Review.findById(rev_id)
         const revOwner=await revOwners.populate("owner")
         if(!revOwner.owner._id.equals(user)){
             throw new ApiError(401,'unauthorized')
         }
         const delRev=await Review.deleteOne({_id:rev_id})
         res.status(200).json(
             new apiResponse(200, delRev, 'succesfully deleted')
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

const showRev=async(req,res)=>{
   
    // if(!lis_id){
    //     throw new ApiError(400,'no lis_id')
    // }
   try {
     const {id}=req.params
     const Rev=await Review.find({listing:id}).populate('owner')
     
     
     res.status(200).json(
          new ApiResonse(200,Rev,'succesfully got all rev')
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
    deleteRev,
    createReview,
    showRev
}


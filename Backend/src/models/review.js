const mongoose=require('mongoose')


const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
    },
    listing:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Listing",
          required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    }
})

const Review=mongoose.model("Review",reviewSchema)
module.exports=Review
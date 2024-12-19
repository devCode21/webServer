const mongoose=require('mongoose')
const { type } = require('os')

const ListingSchema=mongoose.Schema({
    title:{
       type:String
    },
    description:{
       type:String
    },
    image:{
        filename:String,
        url:String
    },
    price:{
         type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    Owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    

})


const Listing=mongoose.model('Listing',ListingSchema);

module.exports=Listing
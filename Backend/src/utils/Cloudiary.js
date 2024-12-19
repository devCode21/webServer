const cloudinary=require('cloudinary').v2
const fs=require('fs');
const ApiError = require('./ApiError');


cloudinary.config({ 
    cloud_name: 'dcmpuf5l4', 
    api_key: '183497337913326', 
    api_secret: 'R686ZJcSv0MVm5ymuPoIa4we2Ow' // Click 'View API Keys' above to copy your API secret
});

const uploadCloudinary=async(localPath)=>{
    try {
        if(!localPath){ //path provided by multer
            throw new ApiError(404,'no file path')
        }
        const res=await cloudinary.uploader.upload(localPath,{resource_type:'auto'})
        console.log('file uploaded')
        return res
        
    } catch (error) {
        fs.unlinkSync(localPath)
        return error;
    }
}

module.exports=uploadCloudinary
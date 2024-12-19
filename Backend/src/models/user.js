const mongoose=require('mongoose')
const jsonWebTkn=require('jsonwebtoken')
const UserSchema=mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      BusinessName:{
        type:String,
        required:true,
      },
      email:{
        type:String,
        required:true
      },
      password:{
          type:String,
          required:true,
      },
      RefreshToken:{
        type:String
      }
})




UserSchema.methods.CheckPassword=function(password){
      if(password===this.password){
        return true
      }
      return false
}
UserSchema.methods.getAcessToken=async function(){
    return jsonWebTkn.sign(
      {
        id:this._id,
        username:this.username
      },
      "abcd",
      {
        expiresIn:'2h'
      }
    )
}

UserSchema.methods.getRefreshToken=async function(){
  return jsonWebTkn.sign(
    {
      id:this._id,
      username:this.username
    },
    "abcd",
    {
      expiresIn:'1d'
    }
  )
}

const User=mongoose.model('User',UserSchema)
module.exports= User


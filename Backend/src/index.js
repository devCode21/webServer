const express=require('express')
const cookieParser=require('cookie-parser')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const port=3000;
const ApiRes=require('./utils/ApiResponse')
app.use(express.urlencoded({extended:true}))
app.use(express.json())  //limit json data
app.use(cookieParser())
app.use(cors())
const path=require('path')
const bodyParser = require('body-parser');
const _dirname=path.resolve()

// Use body-parser middleware to parse the JSON request body
app.use(bodyParser.json());

const Listing = require('./models/Listing');

const password=encodeURIComponent('Kadak21@')
const newPass=''

main()
   .then((res)=>{
      console.log("connected");
       
   })
   .catch((err)=>{
    console.log(err);
   })

async function main() {
  await mongoose.connect(`mongodb+srv://gwkadak:${password}@cluster0.h93js.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
  //  await mongoose.connect('mongodb://127.0.0.1:27017/AirBnb')

}



app.use(express.static(path.join(_dirname,"/vite-project/dist")))
// app.get("*",(_,res)=>{
//    res.sendFile(path.resolve(_dirname,"vite-project","dist" ,"index.html"))
// })
const userRoutes=require('./routes/User.Routes')
const listingRoutes=require('./routes/Listing.Routes')
const reviewRoutes=require('./routes/Review.Routes')

app.use('/user',userRoutes)
app.use('/listings',listingRoutes)
app.use('/revs',reviewRoutes)
app.listen(port,()=>{
    console.log('working')
})


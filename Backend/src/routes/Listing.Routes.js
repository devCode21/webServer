const Routes=require('express').Router
const router=Routes()
const{ LocationBylist, yourListing,updateImg,UpdateListing,CreateListings,deleteListing,AllListing,getLis}=require('../controllers/Listing.controller')
const Listing = require('../models/Listing')
const upload=require('../utils/multer')
const verifyJwt=require('../utils/auth')
router.route('/').get( AllListing)
router.route('/:id/updateLis').post(verifyJwt,UpdateListing)
router.route('/:id/deleteLis').post(deleteListing)
router.route('/CreateLis').post(verifyJwt,upload.single("file"),CreateListings)
router.route('/:id/updateImg').post(verifyJwt,upload.single('img'),updateImg)
router.route('/:id/lis').get(getLis)
router.route('/search').get(verifyJwt,LocationBylist)
router.route('/yourLis').get(verifyJwt,yourListing)

module.exports=router


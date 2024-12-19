const Routes=require('express').Router
const router=Routes()
const {createReview,deleteRev,showRev}=require('../controllers/Review.controller')
const verifyJwt=require('../utils/auth')
router.route('/:id/createRev').post(verifyJwt,createReview)
router.route('/:id/:rev_id/delRev').post(verifyJwt,deleteRev)
router.route('/:id/Showrev').post(showRev)
module.exports=router
const Routes=require('express').Router
const router=Routes()
const {UserInfo,regUser,LogOut,LoginUser,allLis} =require('../controllers/User.controller')
const verifyJwt=require('../utils/auth')
router.route('/reg').post(regUser,LoginUser)
router.route('/Login').post(LoginUser)
router.route('/logout').post(verifyJwt,LogOut)
router.route('/allLis').post(verifyJwt,allLis)
router.route('/userinfo').post(verifyJwt,UserInfo)

module.exports=router
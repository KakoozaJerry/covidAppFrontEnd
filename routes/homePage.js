const express = require("express");
const router = express.Router();

router.get('/homepage',(req,res)=>{
    res.render('homepage', { title: "Home Page" })
})

router.get('/register',(req,res)=>{
    res.render('registerRadiographer', { title: "Register Radiographer" })
})





module.exports = router;
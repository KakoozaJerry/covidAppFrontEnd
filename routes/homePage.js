const express = require("express");
const router = express.Router();

router.get('/homepage',(req,res)=>{
    res.render('homepage', { title: "Home Page" })
})





module.exports = router;
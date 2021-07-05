const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
// const { check, validationResult } = require('express-validator');

// const Employee = require('../models/Employee')
const Registration = require('../models/Registration')


router.get('/login', (req,res)=>{
    res.render('login', { title: "Login" })
})

router.get('/test', (req,res)=>{
    res.render('homepage', { title: "HomePage" })
})

// checks username and password using passport
router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req,res) =>{
    req.session.user = req.user;
    res.redirect('/homepage');
})





router.post('/signup', async (req, res) => {
    try {
        const registration = new Registration(req.body);
        await Registration.register(registration, req.body.password, (err) => {
            if (err)
              { 
               throw err
              }
            console.log(req.body)
            res.redirect('/login')
        })
    } catch(err){
        res.status(400).send('Sorry! Something went wrong.')
        console.log(err)
    }
 });


 router.post('/predict', async (req, res) => {
    try {
        var file = document.querySelector(
            'input[type=file]')['files'][0];
    
        var reader = new FileReader();
        console.log("next");
        
        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
    
            imageBase64Stringsep = base64String;
            var bad = eval({'b64':imageBase64Stringsep})
            // alert(imageBase64Stringsep);
            fetch('http://20.185.148.15:5000/classifier/predict/', {
                method:"POST",
                body: JSON.stringify(bad),
                headers:{"Content-type":"application/json;charset=UTF-8"}
            })
            .then(response => response.json())
            .then(json => console.log(json));
    
            console.log(base64String);
        }
        reader.readAsDataURL(file);
    } catch(err){
        res.status(400).send('Sorry! Something went wrong.')
        console.log(err)
    }
 });


 
 module.exports = router;
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
    }catch(err){
        res.status(400).send('Sorry! Something went wrong.')
        console.log(err)
    }
 });


 
 module.exports = router;
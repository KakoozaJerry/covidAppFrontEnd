const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const homePage = require('./routes/homepage');




// Instantiations
const app = express();


// Configurations
app.set('view engine', 'pug');
app.set('views', './views');


// Middleware
// in the new version, bodyParser is incorparated in the express new version
app.use(express.urlencoded({extended: true}))


// middleware for serving static files(css,js,images)
app.use(express.static('public'));
app.use('/public/images', express.static(__dirname + '/public/images'));

// Routes
app.use('/', homePage);


//Ignoring all non specified files
app.get('*', (req, res)=> {
    res.send('The route specified doesnt exist')
})



app.listen(8000, () => console.log('listening on port 8000'));



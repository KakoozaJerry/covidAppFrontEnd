const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const homePage = require('./routes/homepage');
const login = require('./routes/login');
const Registration = require('./models/Registration')
const fetch = require('fetch-base64');


// Instantiations
const app = express();

// Requiring the express session
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});


// Requiring the passport
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


// Configurations
app.set('view engine', 'pug');
app.set('views', './views');


//Database Connections
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });




// Middleware
// in the new version, bodyParser is incorparated in the express new version
app.use(express.urlencoded({extended: true}))
app.use(expressSession);

// middleware for serving static files(css,js,images)
app.use(express.static('public'));
app.use('/public/images', express.static(__dirname + '/public/images'));


passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());



// Routes
app.use('/', homePage);
app.use('/', login);

// Predict
app.get('/predict', (req, res)=> {
  fetch.local('/public/images/set.jpg').then((data) => {
    // data[0] contains the raw base64-encoded jpg
  }).catch((reason) => {});
   
  fetch.remote('http://domain.com/to/image.jpg').then((data) => {
    // data[1] contains base64-encoded jpg with MimeType
  }).catch((reason) => {});
   
  fecth.auto('/remote/or/local/path/image.gif').then((data) => {
   
  }).catch((reason) => {});
})



// logout
app.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err)=> {
            if (err) {
                console.log(err)
            } else {
                return res.redirect('/login');
            }
        })
    }
  })

//Ignoring all non specified files
app.get('*', (req, res)=> {
    res.send('The route specified doesnt exist')
})




app.listen(8000, () => console.log('listening on port 8000'));



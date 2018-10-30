
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const path = require('path');

// Data models
const users = require('./routes/api/users');
const patients = require('./routes/api/patients');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

//For production purposes
app.use(express.static(path.join(__dirname,'frontend/build')))


// Mongo DB config
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true})
    .then( () => console.log(`Mongo DB connected at ${Date().toLocaleString()}`))
    .catch( err => console.log(err));

// Passport middleward
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//route apis
app.use('/api/users',users);
app.use('/doctor',patients);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
  })


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server runing on port ${port}`));
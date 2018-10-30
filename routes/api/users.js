const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

//Load User model:
const User = require('../../models/User');

// Load validations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route POST api/users/register
// @desc Register User
// @access Public
router.post('/register', (req,res) =>{
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check validation:
    if(!isValid){
        return res.status(400).json(errors)
    }
    User.findOne({ username: req.body.username})
        .then( user => {
            if(user){
                errors.username = "username already exists";
                return res.status(400).json(errors);
            }else{
                //create a new user
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                });
                newUser.save().then(user => res.json(user)).catch(err => console.log(err));
            }
        })
})

// @route POST api/users/login
// @desc login User
// @access Public
router.post('/login', (req,res) =>{
    const { errors, isValid } = validateLoginInput(req.body);

    //Check for validation:
    if(!isValid){
        return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username })
        .then(user => {
            if(!user){
                errors.username = "user not found";
                return res.status(404).json(errors);
            }
            if (user.password === password){
                const payload = {id: user.id, username : user.username}
                //assign a token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 3600 },
                    (err,token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        })
                    }
                )
            } else{
                errors.password = "Password incorrect";
                return res.status(400).json(errors);
            }
        })
})

module.exports = router;
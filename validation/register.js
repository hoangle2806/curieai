
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2: '';

    if (!Validator.isLength(data.username, {min : 2, max: 30})){
        errors.username = 'username must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.username)){
        errors.username = 'username field is required';
    }

    if (Validator.isEmpty(data.password)){
        errors.password = "Password is required"
    }

    if (!Validator.isLength(data.password, {min: 2, max: 30})){
        errors.password = 'password must be at least 2 to 30 characters';
    }

    if (Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm password field is required';
    }

    if (!Validator.equals(data.password, data.password2)){
        errors.password2 = "Passwords must match"
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}
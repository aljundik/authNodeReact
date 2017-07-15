const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp },config.secret);//sub is short for subject, iat short for issued at time

}



exports.signup = function(req,res,next){
const email = req.body.email;
const password = req.body.password;

if (!email || !password){
    return res.status(422).send({error: ' You must provide email and passoword :) '});
}

// see if a user with the given email exists 
User.findOne({email: email},function(err,existingUser){
    if (err){
        return next(err);
    }

    // if a user with email does exist, return an error 

    if (existingUser){
        return res.status(422).send({error: 'The Email is in use'});
    }

// if a user with email does not exist, create and save user record  and resopond to request indication 
//was created
    const user = new User({
        email: email,
        password: password
    })
    user.save(function(err){
        if(err){
            return next(err);
        }
        res.json({token: tokenForUser(user)});
    });


});


}
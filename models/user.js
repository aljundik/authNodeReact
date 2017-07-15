const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

//Define out model 
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String
});

// on Save Hook, encrypt password
//before saving a model, run this funcation
userSchema.pre('save',function(next){
    const user = this;// getting access to user model


    // generate a slat (generate new string of characters to be added to the passowrd to generate a hash)  then run a callback function
    bcrypt.genSalt(10,function(err,salt){
        if (err) {
            return next(err);
        }

        //hash (encrypt) our password using the salt 
        bcrypt.hash(user.password,salt,null,function(err,hash){
            if (err){ 
                return next(err);
            }
            //overwrite pplain text password with encrypted password
            user.password = hash;
            next();
        })
    })
});


userSchema.methods.comparePassword = function(candidatePassword,callback){
    bcrypt.compare(candidatePassword,this.password, function(err,isMatch){
        if (err){
            return callback(err);
        }
        callback(null,isMatch);

    })
}

// Create the model class 

const ModelClass = mongoose.model('user', userSchema);

//export the model
module.exports = ModelClass;
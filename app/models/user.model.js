const mongo = require('mongoose');


/*  THE USER SCHEMA */

const user = mongo.Schema({
    _id: {
        type: mongo.Schema.Types.ObjectId
    },
    username: {
        type: String,
        unique: [true, 'Username allready exist'],
        required: [true, 'Username required'],
        minlength: [5, 'Username must be greater than 4 characters'],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: [true, 'Email allready exist'],
        require: [true, 'Email required'],
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Email invalid"]
    },
    password: {
        type: String,
        require: [true, 'Password required'],
        minlength: [true, 'Password must be greater than 4 characters']
    },
    firstName: {
        type: String,
        require: [true, 'Firstname required'],
        trim: true,
        lowercase: true
    },
    lastName:{
        type: String,
        require: [true, 'Lastname required'],
        trim: true,
        lowercase: true
    },
    birthday: {
        type: Date,
        require: [true, 'Birth day required']
    },
    sex: {
        type: Boolean,
        require: [true, 'Sex required'],
    },
    country: {
        type: String,
        require: [true, 'Country required'],
        trim: true,
        lowercase: true
    },
    town: {
        type: String,
        require: [true, 'Town required'],
        trim: true,
        lowercase: true
    },
    favorite: [
        mongo.Schema.Types.ObjectId
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    socketID: {
        type:String
    }
});

module.exports = mongo.model('User', user);
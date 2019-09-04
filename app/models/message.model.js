const mongo = require('mongoose');


/** THE MESSAGE SCHEMA  */


const message = mongo.Schema({
    users: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'User',
    }],
    msg: [{
        _id: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'User'
        },
        body: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});


module.exports = mongo.model('Message', message);
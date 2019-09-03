const mongo = require('mongoose');


/** THE MESSAGE SCHEMA  */


const message = mongo.Schema({
    users: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'User',
    }],
    msg: [{
        _id: mongo.Schema.Types.ObjectId,
        body: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});


module.exports = mongo.model('Message', message);
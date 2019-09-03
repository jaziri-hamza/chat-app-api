const mongo = require('mongoose');


/** THE MESSAGE SCHEMA  */


const message = mongo.Schema({
    users: [{
        type: mongo.Schema.Types.ObjectId,
        ref: User,
    }],
    msg: [{
        sendBy: Number,
        body: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});
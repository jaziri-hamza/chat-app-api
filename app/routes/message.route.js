const router = require('express').Router();

const messageModel = require('../models/message.model');

const guard = require('../guard/guard');

router.get('/', guard, (req, res)=>{
    // load all messages by pagination
    // just get last msg body 

    const page = parseInt(req.query['pages']) || 1;
    const currentUserId = req.currentUser.id;
    console.log(currentUserId);
    messageModel.find({
        users: { $in: currentUserId },
    }).populate('msg._id', 'firstName lastName').populate({
        path: 'users',
        match: {  _id:  { $ne : currentUserId} },
        select: 'firstName lastName'
    }).select('msg users').slice('msg', -1)
    .skip(page*10-10).limit(page*10).then( result =>{
        res.status(200).json(result);
    }).catch( error => {
        res.status(500).json(error);
    });

});


router.get('/:userid', guard, (req,res)=>{

    // load message body  by pagination

    const userid = req.params.userid;
    const currentUserId = req.currentUser.id;

    const page = parseInt(req.query['pages']) || 1;

    console.log(currentUserId);
    messageModel.find({
        users: { $all: [userid, currentUserId] }
    },{ 
        select: 'msg'
    }).populate('msg._id', 'firstName lastName')
    .slice('msg', page*10-10, page*10).then( result =>{
        res.status(200).json(result);
    }).catch( error => {
        res.status(500).json(error);
    });


    


});


router.post('/:userid', guard, (req,res)=>{

    const userid = req.params.userid;
    const currentUserId = req.currentUser.id;
    messageModel.findOne({
        users: { $all: [userid, currentUserId] }
    }).then(result => {
        
        if(result == null){
            // create new message
            messageModel.create({
                users: [userid, currentUserId],
                msg : [{
                    _id: currentUserId,
                    body: req.body.body,
                }]
            }).then( resultIns => {
                res.status(201).json();
            }).catch(errorIns => {
                res.status(500).json(errorIns);
            });

        }else{
            // add item to array at exist message
            result.update({$push: { msg: { _id: currentUserId, body: req.body.body}  } }).then( resultUpdate =>{
                res.status(200).json(resultUpdate);
            }).catch( errorUpdate=>{
                res.status(500).json(errorUpdate);
            });
        }

    }).catch( error => {
        res.status(500).json(error);
    })
});


module.exports = router;
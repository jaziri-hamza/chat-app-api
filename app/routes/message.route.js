const router = require('express').Router();

const messageModel = require('../models/message.model');

const guard = require('../guard/guard');

router.get('/', guard, (req, res)=>{
    // load all messages by pagination
    // just get last msg body 
});


router.get('/:userid', guard, (req,res)=>{

    // load message body  by pagination

    const userid = req.params.userid;
    const currentUserId = req.currentUser.id;
    messageModel.findOne({
        users: { $all: [userid, currentUserId] }
    }).then(result => {
        if(result == null )
            res.status(200).json(result);
        else 
            res.status(201).json();
    }).catch( error=> {
        res.status(500).json(error);
    })


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
            
            // add item to array
            // result.update(
            result.update({$push: { msg: { _id: currentUserId, body: req.body.body}  } }).then( resultUpdate =>{
                res.status(200).json(resultUpdate);
                
            }).catch( errorUpdate=>{
                console.log(result);
                console.log(errorUpdate);
                res.status(500).json(errorUpdate);
            });
            // )
        }

    }).catch( error => {
        res.status(500).json(error);
    })



});


module.exports = router;
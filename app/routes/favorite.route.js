const router = require('express').Router();

const guard = require('../guard/guard');


const user = require('../models/user.model');

router.post('/:userid', guard, (req, res)=>{
    const userid = req.params.userid;
    const currentUserId = req.currentUser.id;
    user.findOne({_id: currentUserId , favorite: { $in : userid }}).then( result =>{
        if( result == null ){
            user.findOneAndUpdate({_id: currentUserId}, { $push : { favorite: userid}}, {new: true}).then(resultAdd=>{
                // get information of user addedd and back it 
                user.findOne({_id: userid}).select("firstName lastName").then( resSelUser => {
                    res.status(201).json({
                        status: 201,
                        favorite: resSelUser
                    });
                }).catch( errSelUser => {
                    res.status(500).json(errSelUser);
                });
            }).catch( errorAdd=>{
                res.status(500).json(errorAdd);
            });
        }else{
            user.findOneAndUpdate({_id: currentUserId}, { $pull : { favorite: userid}}, {new: true}).then(resultDel=>{
                res.status(202).json({
                    status: 202,
                    favorite: {
                        _id: userid
                    }
                });
            }).catch( errorDel=>{
                res.status(500).json(errorDel);
            });
        }
    }).catch( error=>{
        res.status(500).json(error);
    })


});


router.get('/', guard,(req, res)=>{

    const page = req.query['pages'] || 1;
    const currentUserId = req.currentUser.id;

    user.findOne({ _id: currentUserId}, {select: 'favorite'}).populate({
        path: 'favorite',
        select: 'firstName lastName'
    }).slice('favorite', page*10-10, page*10).then(result =>{
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json(error);
    })

});


module.exports = router;
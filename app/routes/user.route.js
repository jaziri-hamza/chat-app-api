const router = require('express').Router();

const mongo = require('mongoose');

const userModel = require('../models/user.model');



/** GET  USERS 
 *  Pagination
 *      items-count : 10,
 *      variable: pages
 * 
*/

router.get('/', (req, res)=>{

    const page =  parseInt(req.query['pages']) || 1;

    userModel.find({}).select('_id firstName lastName').skip((page*10)-10).limit(page*10).then( result => {
        res.status(200).json(result);
    }).catch( error => {
        res.status(500).json(error);
    });

});


/** GET SPECIFIQUE USERS */
router.get('/:userid', (req, res)=>{

    const userid = req.param.userid;

    userModel.findOne({_id: userid}).then( result => {
        if(result == null )
            res.status(204).json({});
        else
            res.status(200).json(result);
    }).catch( error => {
        res.status(500).json(error);
    });

});



/** CREAT A NEW USER */
router.post('/', (req, res)=>{

    const user = getCreatedUserModel(req.body)
    user._id = new mongo.Types.ObjectId();
    userModel.create(user).then( result => {
        res.status(200).json(result);
    }).catch( error => {
        res.status(500).json(error);
    });

});


/** UPDATE  USER */
router.put('/:userid', (req, res)=>{

    const userid = req.param.userid;
    const obj = req.body;

    userModel.findOneAndUpdate({_id: userid}, obj).then( result => {
        res.status(200).json(result);
    }).catch( error => {
        res.status(500).json(error);
    });


});


/** DELETE  USER */
router.delete('/:userid', (req, res)=>{

    const userid = req.param.userid;
    const obj = req.body;

    userModel.findOneAndDelete({_id: userid}, obj).then( result => {
        res.status(200).json(result);
    }).catch( error => {
        res.status(500).json(error);
    });

});


const getCreatedUserModel = (obj) => {
    return  new userModel({
        username: obj.username,
        email: obj.email,
        password: obj.password,
        firstName: obj.firstName,
        lastName: obj.lastName,
        birthday: obj.birthday,
        sex: obj.sex,
        country: obj.country,
        town: obj.town
    });
}


module.exports = router;
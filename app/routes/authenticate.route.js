const router = require('express').Router();

const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');



router.post('/', (req, res)=>{
    const username = req.body.username,
          password = req.body.password;

    userModel.findOne({ $or: [
        { username: username, password: password},
        { email: username, password: password}
    ]}).then( result => {
        if(result == null){
            res.status(401).json('Authentificated failled');
        }else{
            const paylod = {
                id: result._id,
                username: result.username,
                firstName: result.firstName,
                lastName: result.lastName
            }
            const token = jwt.sign(paylod, 'privateKey', { expiresIn: '10d'});
            res.status(200).json({
                token: token
            });
           
        }
    }).catch( error => {
        res.status(500).json(error.message);
    });
});



module.exports = router;
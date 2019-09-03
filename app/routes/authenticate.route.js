const router = require('express').Router();

const userModel = require('../models/user.model');



router.post('/', (req, res)=>{
    const username = req.body.username,
          password = req.body.password;
   
    userModel.findOne({ $or: [
        { uesrname: username, password: password},
        { email: username, password: password}
    ]}).then( result => {
        if(result == null)
            res.status(401).json('Authentificated failled');
        else
            res.status(200).json({
                token: 'new token'
            });
    }).catch( error => {
        es.status(500).json(error.message);
    });
});



module.exports = router;
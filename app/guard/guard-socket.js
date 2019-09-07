const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.headers.authorization){

    
    const token = req.headers.authorization;
    try{
        const decodeToken = jwt.verify(token, 'privateKey');
        req.socketData = decodeToken;
        
    }catch(err){
        req.socketData = null;
    }
    }
    next();
};
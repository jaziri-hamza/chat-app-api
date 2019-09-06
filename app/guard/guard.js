const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    try{
        const decodeToken = jwt.verify(token, 'privateKey');
        req.currentUser = decodeToken;
        
    }catch(err){
        return res.status(401).json('Authentificated failled');
    }
    next();
};
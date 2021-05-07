const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports.requiredLogin = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECURITY_KEY , (err, decode) => {
            if(err){
                res.status(401).json({ message: "Invalid Token" })
            }
            else{
                User.findById(decode).then((user) => {
                    req.user = user
                    next();
                })
            }
        })
    }else{
        res.status(401).json({ message: "Invalid Token" })
    }
}
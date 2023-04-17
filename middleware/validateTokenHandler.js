const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async(req, res, next)=>{
    let token = req.headers.Authorization || req.headers.authorization;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err){
            res.status(401);
            throw new Error('Access unAuthorized');
        }
        else{
            req.admin = decoded.admin;
            next();
        }
    })
}
);
module.exports = validateToken;
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    let header = (typeof req.headers.authorization !== 'undefined') ? req.headers.authorization.split(' ')[1] : null;
    let token = req.body.token || header;
    if(!token)  {
        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if(err) {
            return res.status(500).send('Invalid Token');
        }
        return next();
    });
};
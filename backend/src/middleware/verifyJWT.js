// require('dotenv').config()
const jwt = require('jsonwebtoken');
function verifyJwt(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({ "msg": "Não autorizado, Token inexistente" })
    }
    const splitTokenB = req.headers.authorization.split(' ')
    const tokenB = splitTokenB[1]
    // console.log(tokenB)
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldmlsQGRldmlsIiwiYWRtaW4iOmZhbHNlLCJsb3JlIjoiUHJldiIsImlhdCI6MTYzODIxMjA2MCwiZXhwIjoxNjM4MjE1NjYwfQ.RV0NoqtQGCX_JFHKnjv9CAxNPx5smRfDGP8b2Z5sjTE"
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldmlsQGRldmlsIiwiYWRtaW4iOmZhbHNlLCJsb3JlIjoiUHJldiIsImlhdCI6MTYzODIxMjA2MCwiZXhwIjoxNjM4MjE1NjYwfQ.RV0NoqtQGCX_JFHKnjv9CAxNPx5smRfDGP8b2Z5sjTE"
    // const token = req.headers['x-access.token'];
    jwt.verify(tokenB, process.env.SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ "msg": "Token expirado! realize novo login" })
        }
        req.decodedData = decoded;
        next();
    })
}
module.exports = verifyJwt;
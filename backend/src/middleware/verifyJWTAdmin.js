function verifyJwt(req, res, next) {
    if(req.body.password === process.env.SECRET_ADMIN){
        req.password = req.body.password;
        next();
    }else{
        return res.status(401).json({ "msg": "Senha incorreta!" })
    }
}
module.exports = verifyJwt;
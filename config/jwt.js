const jwt = require('jsonwebtoken')

module.exports = {
    authenToken: function (req, res, next) {
        // console.log(req.headers['authorization'])
        const authorizationClient = req.headers['authorization'];
        const token = authorizationClient && authorizationClient.split(' ')[1]
        console.log(token)
        if (!token) return res.sendStatus(401)

        try {
            const decoded = jwt.verify(token, "Random string")
            console.log("decode:", decoded)
            req.user = decoded;
            next();
        } catch (e) {
            return res.sendStatus(403)
        }
    }
}
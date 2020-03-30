const expressJwt = require('express-jwt');
const config = require('../utils/config');
const User = require('../resources/user/model');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret}).unless({
        path: [
            // public routes that don't require authentication
            /\/api*/,

        ]
    });
}

async function isRevoked(req, payload, next) {

    const user = await User.findById(payload.sub)

    // revoke token if user no longer exists
    if (!user) {
        return next(null, true);
    }

    next();
};
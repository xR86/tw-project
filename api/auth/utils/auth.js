/**
 * Created by alber_000 on 5/22/2016.
 */

var config=require('./config');
var jwt = require('jsonwebtoken');

function auth(role) {
    return function(req, res, next) {

        var token;
        var payload;

        if (!req.headers.authorization) {
            return res.status(401).send({message: 'You are not authorized'});
            //res.redirect('/login');
            //   return;
        }

        token = req.headers.authorization.split(' ')[1];

        try {
            payload = jwt.verify(token, config.jwtSecretKey);
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                res.status(401).send({message: 'Token Expired'});
                //  res.redirect('/login');
                // return;
            } else {
                res.status(401).send({message: 'Authentication failed'});
                //res.redirect('/login');
                // return;
            }
            return;
        }

        if (!role || role === payload.role) {
            //pass some user details through in case they are needed
            req.user = {
                email: payload.sub,
                role: payload.role
            };

            next();
        } else {
            res.status(401).send({message: 'You are not authorized'});
            // res.redirect('/login');
        }
    }

}

module.exports = auth;
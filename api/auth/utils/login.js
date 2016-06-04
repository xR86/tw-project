/**
 * Created by alber_000 on 5/22/2016.
 */
var oracledb = require('oracledb');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var validator=require('validator');
var config=require('../utils/config');

function post(req, res, next) {
    oracledb.getConnection(
        config.database,
        function(err, connection){
            if (err) {
                return next(err);
            }
            if(!validator.isEmail(req.body.user_email))
            {
                res.redirect('/login');
                return;
            }
            connection.execute(
                'select user_firstname as "user_firstname", ' +
                '   user_email as "user_email", ' +
                '   user_password as "user_password", ' +
                '   role as "role" ' +
                'from SITEUSERS ' +
                'where user_email = :user_email',
                {
                    user_email: validator.normalizeEmail(req.body.user_email)
                },
                {
                    outFormat: oracledb.OBJECT
                },

                function(err, results){
                    var user;
                    if(results.rows[0]==null){
                        res.redirect('/login'); //TODO: should display message in front end saying invalid email or password
                        return;
                    }

                    if (err)
                    {
                        connection.release(function(err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });

                        return next(err);
                    }

                    user = results.rows[0]; 

                    bcrypt.compare(req.body.user_password, user.user_password, function(err, pwMatch) {
                        var payload;

                        if (err) {
                            return next(err);
                        }

                        if (!pwMatch) {
                            res.redirect('/login');
                            return;
                        }

                        payload = {
                            sub: user.user_email,
                            role: user.role,
                            user_firstname: user.user_firstname
                        };
                        var persistentSessionToken=jwt.sign(payload, config.jwtSecretKey);

                  //      res.status(200).json({
                   //         user: user,
                      //      token: persistentSessionToken
                      //  });

                        req.session.persistentSessionToken=persistentSessionToken;
                        req.session.email=payload.sub;
                        req.session.user_firstname=payload.user_firstname;
                        res.redirect('/dashboard');
                       // console.log(persistentSessionToken);
                        console.log(req.session);
                        
                    });

                    connection.release(function(err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                });
        }
    );
}
module.exports.post = post;
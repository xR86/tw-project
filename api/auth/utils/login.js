/**
 * Created by alber_000 on 5/22/2016.
 */
var oracledb = require('oracledb');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config=require('../utils/config');

function post(req, res, next) {
    oracledb.getConnection(
        config.database,
        function(err, connection){
            if (err) {
                return next(err);
            }

            connection.execute(
                'select id as "id", ' +
                '   email as "email", ' +
                '   password as "password", ' +
                '   role as "role" ' +
                'from MYSITEUSERS ' +
                'where email = :email',
                {
                    email: req.body.email.toLowerCase() //TODO:email does not accept numbers. Also check for valid email if possible...
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
                    if (err) {
                        connection.release(function(err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });

                        return next(err);
                    }

                    user = results.rows[0]; 

                    bcrypt.compare(req.body.password, user.password, function(err, pwMatch) {
                        var payload;

                        if (err) {
                            return next(err);
                        }

                        if (!pwMatch) {
                            res.redirect('/login');
                            return;
                        }

                        payload = {
                            sub: user.email,
                            role: user.role
                        };
                        var persistentSessionToken=jwt.sign(payload, config.jwtSecretKey);
                        /*
                        res.status(200).json({
                            user: user,
                            token: persistentSessionToken 
                        });
                        */
                       req.session.persistentSessionToken=persistentSessionToken;
                        res.redirect('/dashboard');
                       // console.log(persistentSessionToken);
                      //  console.log(req.session);
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
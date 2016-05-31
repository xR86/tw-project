/**
 * Created by alber_000 on 5/22/2016.
 */

var oracledb = require('oracledb');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config=require('../utils/config');
var validator=require('validator');

function post(req, res, next) {

    var user = {
        user_email:req.body.user_email,
        user_firstname: req.body.user_firstname,
        user_lastname: req.body.user_lastname
    };
    if(!validator.isEmail(user.user_email) || !validator.isAlphanumeric(user.user_firstname) || !validator.isAlphanumeric(user.user_lastname)){
        res.redirect('/signup');
        console.log("not a valid email || firstname || lastname");
        return;
    }
    var unhashedPassword = req.body.user_password;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(unhashedPassword, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            user.hashedPassword = hash;

            insertUser(user, function(err, user) {
                var payload;

                if (err) {
                    return next(err);
                }

                payload = {
                    sub: user.user_email,
                    role: user.role
                };
                
                var persistentSessionToken=jwt.sign(payload, config.jwtSecretKey);
                req.session.persistentSessionToken=persistentSessionToken;
                req.session.email=payload.sub; //added this
                res.redirect('/dashboard');
                //console.log(persistentSessionToken);
                // console.log(req.session);
            });
        });
    });
}

module.exports.post = post;

function insertUser(user, cb) {
    oracledb.getConnection(
        config.database,
        function(err, connection){
            if (err) {
                return cb(err);
            }

            console.log("\n[DB] Connected to database !\n");
            connection.execute(
                'insert into SITEUSERS ( ' +
                '   user_email, ' +
                '   user_password, ' +
                '   role, ' +
                '   user_firstname, '+
                '   user_lastname '+
                ') ' +
                'values (' +
                '    :user_email, ' +
                '    :user_password, ' +
                '    \'BASE\', ' +
                '    :user_firstname, '+
                '    :user_lastname '+
                ') ' +
                'returning ' +
                '   user_id, ' +
                '   user_email, ' +
                '   role, ' +
                '   user_firstname, '+
                '   user_lastname '+
                'into ' +
                '   :user_rid, ' +
                '   :user_remail, ' +
                '   :user_rrole, '+
                '   :user_rfirstname, '+
                '   :user_rlastname'
                ,
                {
                    user_email: validator.normalizeEmail(user.user_email),
                    user_firstname: user.user_firstname,
                    user_password: user.hashedPassword,
                    user_lastname:user.user_lastname,
                    user_rid: {
                        type: oracledb.NUMBER,
                        dir: oracledb.BIND_OUT
                    },
                    user_remail: {
                        type: oracledb.STRING,
                        dir: oracledb.BIND_OUT
                    },
                    user_rrole: {
                        type: oracledb.STRING,
                        dir: oracledb.BIND_OUT
                    },
                    user_rfirstname: {
                        type: oracledb.STRING,
                        dir: oracledb.BIND_OUT
                    },
                    user_rlastname: {
                        type: oracledb.STRING,
                        dir: oracledb.BIND_OUT
                    }
                },
                {
                    autoCommit: true
                },
                function(err, results){
                    if (err) {
                        connection.release(function(err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });

                        return cb(err);
                    }

                    cb(null, {
                        user_id: results.outBinds.user_rid[0],
                        user_email: results.outBinds.user_remail[0],
                        role: results.outBinds.user_rrole[0],
                        user_firstname: results.outBinds.user_rfirstname[0],
                        user_lastname: results.outBinds.user_rlastname[0]
                    });

                    connection.release(function(err) {
                        if (err) {
                            console.error("[DB] " + err.message);
                        } else {
                            console.log("\n[DB] Disconnected from the database !\n");
                        }
                    });
                });
        }
    );
}
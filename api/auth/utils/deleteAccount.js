/**
 * Created by alber_000 on 5/25/2016.
 */

var oracledb = require('oracledb');
var config=require('../utils/config');


function remove (req, res, next) {
    if(!req.session.email)
    {
        res.redirect('/login');
        return;
    }
    var user= {
     user_email:req.session.email
 };
    deleteUser(user, function(err, user) {

        if (err) {
            return next(err);
        }
        console.log(req.session.email);
        if(!req.session.email){
            return next(err);
        }
        //console.log(persistentSessionToken);
        // console.log(req.session);
    });
    res.redirect('/');
}

module.exports.remove = remove;

    function deleteUser(user, cb) {
        oracledb.getConnection(
            config.database,
            function(err, connection){
                if (err) {
                    return cb(err);
                }

                connection.execute(
                    'DELETE FROM SITEUSERS WHERE user_email = :user_email ',
                    {
                        user_email: user.user_email.toLowerCase()
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
                        connection.release(function(err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });
                    });
            }
        );
    }

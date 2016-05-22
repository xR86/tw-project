/**
 * Created by alber_000 on 5/22/2016.
 */

var oracledb = require('oracledb');
var config=require('../auth/utils/config');
var jwt = require('jsonwebtoken');

function get(req, res, next) {
    oracledb.getConnection(
        config.database,
        function(err, connection){
            if (err) {
                return next(err);
            }

            connection.execute(
                'select column1 as "column1" ' +
                'from protected_things ',
                {},//no binds
                {
                    outFormat: oracledb.OBJECT
                },
                function(err, results){
                    if (err) {
                        connection.release(function(err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });

                        return next(err);
                    }

                    res.status(200).json(results.rows);

                    connection.release(function(err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                }
            );
        }
    );
}

module.exports.get = get;
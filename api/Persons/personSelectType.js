/**
 * Created by alber_000 on 5/27/2016.
 */

var oracledb = require('oracledb');
var connAttrs = require('./../auth/utils/config');


function filter(select) {
    return function (req, res) {

        oracledb.getConnection(connAttrs.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }

            connection.execute(select, {p_id:req.body.p_id}, {
                outFormat: oracledb.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200);
                    res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /Persons : Connection released");
                        }
                    });
            });
        });
    }
}

module.exports = filter;
/**
 * Created by alber_000 on 5/29/2016.
 */
var oracledb = require('oracledb');
var connAttrs = require('./../auth/utils/config');
var SimpleOracleDB = require('simple-oracledb');
SimpleOracleDB.extend(oracledb);


function genericDatabaseOperation(req,res,select,params)
{
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
        connection.query(select, params,
            function onResults (err, results) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                    res.render('500',{message: err.message});
                } else {
                    res.send(results); //default 100 rows
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("Successful request granted");
                        }
                    });

            });
    });
}

module.exports=genericDatabaseOperation;
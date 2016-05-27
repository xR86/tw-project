/**
 * Created by alber_000 on 5/21/2016.
 */

var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
var connAttrs = require('./../auth/utils/config');
var filter=require('./taskSelectType');
var auth=require('./../auth/utils/myAuth');

router.post('/id',auth(), filter.filterById(""));
router.post("/hasSolution",auth(),filter.filterBySolutionExistence(""));
router.post('/betweenDates',auth(),filter.filterByDates(""));

router.get('/', function (req,res) {
    "use strict"; //nu stiu daca e necesar asta

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

        connection.execute("SELECT * FROM SolvedTasks",{}, {
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
                        console.log("GET /SolvedTasks : Connection released");
                    }
                });
        });
    });
});


module.exports = router;
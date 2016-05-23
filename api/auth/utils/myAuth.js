/**
 * Created by alber_000 on 5/23/2016.
 */


var config=require('./config');
var jwt = require('jsonwebtoken');

function muAuth(){
    return function(req,res,next) {
        if(!req.session.persistentSessionToken){
            res.redirect('/login');
            //res.status(401).send({message: 'Naughty '});
        }
        else {
            next()
        }
    }
}

module.exports = muAuth;

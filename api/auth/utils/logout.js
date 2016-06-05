/**
 * Created by alber_000 on 5/23/2016.
 */
var config=require('./config');
var jwt = require('jsonwebtoken');

function logout(){
    return function(req,res,next) {
        if(!req.session.persistentSessionToken){
            res.redirect('/login');
        }
        else{
         req.session.destroy();
          req.app.locals.user = "";
            res.redirect('/');
        }
    }
}

module.exports = logout;
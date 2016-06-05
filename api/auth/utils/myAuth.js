/**
 * Created by alber_000 on 5/23/2016.
 */
var config=require('./config');
var jwt = require('jsonwebtoken');
function myAuth(role){
    return function(req,res,next) {
        var payload;
        if(!req.session.persistentSessionToken){
            res.redirect('/login');
            //res.status(401).send({message: 'Naughty '});
            return;
        }
        //else {
         //   next()
       // }
        var token= req.session.persistentSessionToken;
        console.log(token);

        try {
            payload = jwt.verify(token, config.jwtSecretKey);
            //console.log(payload);
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                res.redirect('/login');
                 return;
            } else {
              //  res.status(401).send({message: 'Authentication failed'});
                res.redirect('/login');
               // return;
            }
            return;
        }
        if (!role || role === payload.role) {
            //pass some user details through in case they are needed
            //req.user = {
             //   email: payload.sub,
           //     role: payload.role
          //  };
            next();
        } else {
            res.status(401).send({message: 'You are not authorized'}); //ToDo : redirect to a specific page, maybe to the user friendly view made for exceptions;
            //res.redirect('/login');   
        }
    }
}

module.exports = myAuth;

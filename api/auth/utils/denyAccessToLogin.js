/**
 * Created by alber_000 on 5/26/2016.
 */

function denyAccess(){
    return function(req,res,next)
    {
        if(req.session.persistentSessionToken){
            res.status(401).redirect('/');
            //res.status(401).send({message: 'Naughty '});
        }
        else {
            next()
        }
    }
}

module.exports = denyAccess;
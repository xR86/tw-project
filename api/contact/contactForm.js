/**
 * Created by alber_000 on 6/5/2016.
 */
var nodemailer = require('nodemailer');

function post (req,res,next) {
    var smtpTrans = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: 'codrtw666@gmail.com',
            pass: 'parolaparola'
        }
    });
    //Mail options
     var mailOpts = {
            from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object,
            to: 'codrtw666@gmail.com',
            subject: 'Website contact form',
            text: "Message from "+ req.body.email + ", with number "+ req.body.phone + ", regarding " + req.body.message
        };

    smtpTrans.sendMail(mailOpts, function(error, info){
        if(error){
            return next(error);
        }
        res.status(200).send({message: "message send"});  // TODO : use ajax to catch the message and display it in front end
    });
}

module.exports.post = post;
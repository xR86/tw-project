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
            from: req.body.name + ' &lt;' + req.body.email + '&gt;',
            to: 'codrtw666@gmail.com',
            subject: 'Website contact form',
            text: "Message from "+ req.body.email + ", with number "+ req.body.phone + ", regarding " + req.body.message
        };

    smtpTrans.sendMail(mailOpts, function(error, info){
        if(error){
            return res.status(400).send(error);
        }
        res.status(200).send("Your message has been sent");
    });
}

module.exports.post = post;
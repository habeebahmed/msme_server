var db = require('./models/dbconnection');
    nodeMailer = require('nodemailer');
var appln_id
var cron_job = {

    checkDueDate: () => {
        var now = getDate(new Date())
        query = "SELECT *,UNIX_TIMESTAMP(DueDate) as DueDate FROM `msmeapp_installments` where Payment_Date IS NULL;"
        var results = db.query(query, function (error, results, fields) {
            if (error) throw error;
            results.forEach(element => {
                //console.log(element.DueDate)
                var date = new Date(element.DueDate * 1000);
                date = getDate(date)
                if (date == now) {
                    appln_id = element.Application_ID_id
                    console.log(appln_id);
                    query="SELECT Applicant_Email FROM `msmeapp_applicant_details` where Application_ID_id='APP52';"
                    var results = db.query(query, function (error, results, fields) {
                        console.log(results[0].Applicant_Email)
                        sendEmail(results[0].Applicant_Email)
                    })
                }
                else {
                    console.log("In else block");
                    
                }
            });
        })


    }



}

function sendEmail(to) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'projectloc123@gmail.com',
            pass: 'bubblegum3'
        }
    });
    let mailOptions = {
        from: '"Uangteman" projectloc123@gmail.com', // sender address
        to, // list of receivers
        subject: "Payment", // Subject line
        text: "Please pay the due amount", // plain text body
        html: '<b>NodeJS Email</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        });
}

function getDate(date) {
    var today = date;
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = yyyy + '-' + mm + '-' + dd;
    return today
}

module.exports = cron_job;
// 'use strict';
var db = require('./models/dbconnection');
var  nodeMailer = require('nodemailer');
var appln_id
var user = []
var query
var cron_job = {

    checkDueDate: async() => {
        var now = getDate(new Date())
        query = "SELECT *,UNIX_TIMESTAMP(DueDate) as DueDate FROM `msmeapp_installments` where Payment_Date IS NULL;"
        var results = db.query(query, async(error, results, fields) => {
            if (error) throw error;
            await results.forEach(async element => {
                //console.log(element.DueDate)
                var date = new Date(element.DueDate * 1000);
                var due_date = getDate(date)
                date1 = new Date(now)
                date2 = new Date(due_date)
                diff = parseInt((date1 - date2) / (1000 * 60 * 60 * 24));
                console.log(diff)
                appln_id = element.Application_ID_id
                console.log(appln_id);
                if(diff >=0){
                    user.push({
                        appln_id,
                        diff
                    })
                }
                //console.log(user);
            });
            console.log(user)
            user.forEach(async(element) => {
                query = "SELECT Applicant_Email FROM `msmeapp_applicant_details` where Application_ID_id='"+element.appln_id+"'"
                var results =await db.query(query, async(error, results, fields) =>{
                        let email = results[0].Applicant_Email
                        if (results) {
                            console.log(results[0].Applicant_Email)
                            //calculate due amount
                            query = "select * from ( select * from `msmeapp_installments` where Application_ID_id='" + element.appln_id + "' and Payment_Date is NULL order by DueDate ) as T LIMIT 1;"
                            var results = await db.query(query, async (error, results, fields) => {
                                if (error) throw error;
                                console.log(results);
                                //date = results[0].DueDate.toLocaleString()
                                console.log(element.diff);
                                
                                if (element.diff >= 0 && element.diff <= 3) {
                                    due_amount = results[0].Total_Amount
                                    element.diff == 0 ? message="Please pay the Due Amount" : message="Please pay the Due Amount now or else you will be charged an extra amount"
                                    await sendEmail(email,due_amount,message)
                                }
                                else if (element.diff > 3) {
                                    message = "you have crossed the Due Date "
                                    amt = results[0].Total_Amount
                                    p=(1+(0.01/365))
                                    p=p**(365*((diff-3)*0.00273973))
                                    ci = p*amt
                                    due_amount = ci + amt + 100
                                    sendEmail(email,due_amount,message)
                                }
                                                            
                            })
                        }                  
                    })
            })
        })
    }
}

function sendEmail(to,due_amount,message) {
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
        subject: "Payment Reminder", // Subject line
        text: "Please pay the due amount "+due_amount, // plain text body
        html: "<h1><b>Details</b><h1><h2>Message:"+message+"</h2><h2>Amount to be paid "+due_amount+"<h2><p>Click <a href='http://127.0.0.1:8000/LoginUser'>Here</a> to pay</p>"// html body
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
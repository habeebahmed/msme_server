var mysql = require('mysql');
    port = process.env.PORT || 3306;

if (port === 3306) {

    var connection = mysql.createConnection({
        host: '10.15.15.63',
        port: 3306,
        user: 'test_user',
        password: 'root',
        database: 'msme',
        insecureAuth: true
    });
} else {

   //same as above, with live server details
}

connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
       
        console.log('connected as id ' + connection.threadId);
    });

module.exports = connection;
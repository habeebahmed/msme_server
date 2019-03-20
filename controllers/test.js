var db = require('../models/dbconnection'); 


var Msme = {
    //function to query all items
        getList: function (req, res) {            
            //query the DB using prepared statement
            data = req.body
            console.log(data.table);
            table = "msmeapp_"+data.table
            status = data.status
            status == 'BL' ? query = `SELECT * from ?? where status <> ?` : query = `SELECT * from ?? where status= ?`
            //console.log(query)
            var results = db.query(query, [table,status] , function (error, results, fields) {
                //if error, print blank results
                
                if (error) {
                    // console.log(error);
                    var apiResult = {};
                    
                    apiResult.meta = {
                        table,
                        type: "collection",
                        total: 0
                    }
                    //create an empty data table
                    apiResult.data = [];
                    
                    //send the results (apiResult) as JSON to Express (res)
                    //Express uses res.json() to send JSON to client
                    //you will see res.send() used for HTML
                    res.json(apiResult);
                    
                }
                
                //make results 
                var resultJson = JSON.stringify(results);
                resultJson = JSON.parse(resultJson);
                var apiResult = {};
    
                    
               // create a meta table to help apps
               //do we have results? what section? etc
                apiResult.meta = {
                    table,
                    type: "collection",
                    total: 1,
                    total_entries: resultJson.length
                }
                
                //add our JSON results to the data table
                apiResult.data = resultJson;
                
                //send JSON to Express
                res.json(apiResult);
            });
        }

    };
    module.exports = Msme;
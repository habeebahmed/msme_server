var db = require('../models/dbconnection'); 


var Strain = {
    //function to query all items
    getItems: function (req, res) {
            //grab the site section from the req variable (/strains/)
            //console.log(req) to see all the goodies
            //let pathname = req._parsedUrl.pathname.split('/');
            //split makes an array, so pick the second row
            //let section = pathname[1];
            
            //query the DB using prepared statement
            var results = db.query('SELECT * from `msmeapp_application_details`', function (error, results, fields) {
                //if error, print blank results
                if (error) {
                    // console.log(error);
                    var apiResult = {};
                    
                    apiResult.meta = {
                        table: 'msmeapp_applicant_details',
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
                    table: 'msmeapp_applicant_details',
                    type: "collection",
                    total: 1,
                    total_entries: 0
                }
                
                //add our JSON results to the data table
                apiResult.data = resultJson;
                
                //send JSON to Express
                res.json(apiResult);
            });
        },
    };
    module.exports = Strain;
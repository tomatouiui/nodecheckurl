const request = require('request')
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'savefrom_db'
});

connection.connect();

connection.query('SELECT element_link from report_broken where id < 100', function(error, results, fields) {
    if (error) throw error;
    for (var i = 0; i < results.length; i++) {
        //console.log('The url is: ', results[i].element_link);
        request(results[i].element_link, function(error, response, data) {
            if (error) {
                console.log(error);
            } else {
                console.log('url',response.headers['x-acquia-host']+response.headers['x-acquia-path'])
                console.log('statusCode',response.statusCode)
                //console.log(data)
            }
        });
    }
});
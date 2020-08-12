const urlStatusCode = require('url-status-code')
const url = 'https://www.ibm.com/cn/zh'

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
        urlStatusCode(results[i].element_link, (error, statusCode) => {
            if (error) {
                console.error(error)
            } else {
                console.log(statusCode)
            }
        })
    }
});
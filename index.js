const request = require('request')
var mysql = require('mysql');
const fs = require('fs');
var now = 0;

fs.writeFile('errorlog.txt', '', function(err){
    if(err) throw err;
    console.log('errorlog.txt已存在，内容被覆盖！');
});

fs.writeFile('tt.txt', '', function(err){
    if(err) throw err;
    console.log('tt.txt已存在，内容被覆盖！');
});

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'savefrom_db'
});

connection.connect();

connection.query('SELECT element_link from report_broken where id < 1000', function(error, results, fields) {
    if (error) throw error;
    for (var i = 0; i < results.length; i++) {
        //console.log('The url is ' + i + ' : ', results[i].element_link);
        var nowurl = results[i].element_link;

        request(nowurl, function(error, response, data) {
            if (error) {
                console.log(error);
                fs.appendFileSync('errorlog.txt', '\n'+error+'\n');
            } else {
              now++
              console.log('now', now)
                //console.log(response.request)
                console.log(response.request.href)
                //console.log('url', response.headers['x-acquia-host'] + response.headers['x-acquia-path'])
                console.log('statusCode', response.statusCode)
                fs.appendFileSync('tt.txt', '\n'+response.request.href+':'+response.statusCode);
            }
        });
    }
});
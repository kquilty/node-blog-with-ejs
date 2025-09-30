/**
 * Example: Raw node.js route handling (not using "express", etc.)
 */

const http = require('http')
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    console.log('I heard a request: ' + req.url);

    // Example use of lodash
    console.log(_.random(0,20));
    

    res.setHeader('Content-Type', 'text/html');

    

    let target_file = './views/';
    switch(req.url){
        case '/':
            target_file += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            target_file += 'about.html';
            res.statusCode = 200;
            break;
        default:
            target_file += '404.html';
            res.statusCode = 404;
    }

    fs.readFile(target_file, 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {

            // Send to browser
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening on 3000')
});
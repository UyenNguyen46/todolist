const http = require('http');
const fs = require('fs');
const qs = require('qs')

const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./todo.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('./display.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err);
                }
                datahtml = datahtml.replace('{Task 1}', userInfo.Task1);
                datahtml = datahtml.replace('{Task 2}', userInfo.Task2);
                datahtml = datahtml.replace('{Task 3}', userInfo.Task3);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(datahtml);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(2005, "localhost");
console.log('server running at localhost:2005 ');
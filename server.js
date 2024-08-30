const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {

// PHASE 2
if(req.method === 'GET' && req.url.startsWith("/static") ) {
    let file;
    let path = req.url.split('/');
    console.log(path);

    // Parse the file name.
    // const filename = path[2].split('.')[0];  // gets filename w/o extension
    const filename = path[2];   // filename w extension
    console.log(filename);

    // Parse the route to get the file extension.
    let fileExtension = path[2].split('.')[1];
    console.log(fileExtension);


    if(fileExtension === 'jpg') {
        res.setHeader = ('Content-Type', 'image/jpeg');
        try {file = fs.readFileSync(`./assets/images/${filename}`)}
        catch {return res.end('Error: no such file or directory')};
    }

    if(fileExtension === 'css') {
        res.setHeader = ('Content-Type', 'text/css');
        try {file = fs.readFileSync(`./assets/css/${filename}`)}
        catch {return res.end('Error: no such file or directory')};
    }

    if(fileExtension === undefined) return res.end('Error: missing file extension in url');

    // Always write response code, body & end function
    res.write(file);

    // PHASE 1
    const index = fs.readFileSync("./index.html", 'utf-8');
    console.log(index);
    res.statusCode = 200;
    res.setHeader = ('Content-Type', 'text/html');
    res.write(index);

    return res.end();
}

res.statusCode = 200;
res.setHeader('Content-Type', 'text/html');
res.write(index);
return res.end();


});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));

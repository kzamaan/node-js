const http = require('http')
const url = require('url')
const { StringDecoder } = require('string_decoder') 

//app object - module scaffolding
const app = {};

//configration
app.config = {
    port: 3000
};

//create server
app.createServer = () =>{
    const server = http.createServer(app.handerRequestResponse)
    server.listen(app.config.port, () =>{
        console.log(`listening to port ${app.config.port}`);
    })
}


//hander reqest response
app.handerRequestResponse = (req, res) =>{

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };
    console.log(requestProperties);
    res.end('Hello world, Hello Zaman')
}

//start server
app.createServer();
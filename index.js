const http = require('http')
const url = require('url')

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
    res.end('Hello world, Hello Zaman')
}

//start server
app.createServer();
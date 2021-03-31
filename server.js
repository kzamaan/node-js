const http = require('http');
const { handleReqRes } = require('./helpers/handelReqRes');
//app object - module scaffolding
const app = {};

//configration
app.config = {
    port: 3000
};

//create server
app.createServer = () =>{
    const server = http.createServer(app.handleReqRes)
    server.listen(app.config.port, () =>{
        console.log(`listening to port http://localhost:${app.config.port}`);
    })
}


//hander reqest response
app.handleReqRes = handleReqRes

//start server
app.createServer();
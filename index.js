/*
 * @Author: Kamruzzaman
 * @Date: 2022-10-16 09:59:59
 * @Last Modified by:   Kamruzzaman
 * @Last Modified time: 2022-10-16 09:59:59
 */

const http = require('http');
const { handleReqRes } = require('./helpers/handelReqRes');
const environment = require('./helpers/environments');

// app object - module scaffolding
const app = {};

//! configuration
app.config = {
    port: 3000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to port http://localhost:${environment.port}`);
    });
};

// handler request response
app.handleReqRes = handleReqRes;

// start server
app.createServer();

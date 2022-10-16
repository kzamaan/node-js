/*
 * @Author: Kamruzzaman
 * @Date: 2022-10-16 10:00:27
 * @Last Modified by: Kamruzzaman
 * @Last Modified time: 2022-10-16 20:20:46
 */

// dependency
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
const { parseJSON } = require('./utils');

// handel object - module scaffolding
const handler = {};

handler.handleReqRes = (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = request.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = request.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    request.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    request.on('end', () => {
        realData += decoder.end();
        requestProperties.body = parseJSON(realData);

        chosenHandler(requestProperties, (statusCode, payload) => {
            const status = typeof statusCode === 'number' ? statusCode : 500;
            const payloadString = typeof payload === 'object' ? JSON.stringify(payload) : {};

            response.setHeader('Content-Type', 'application/json');
            response.writeHead(status);
            response.end(payloadString);
        });
    });
};

module.exports = handler;

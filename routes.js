// dependency
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');

// routes object - module scaffolding
const routes = {
    sample: sampleHandler,
    user: userHandler,
};

module.exports = routes;

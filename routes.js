// dependency
const { sampleHandler, userHandler } = require('./handlers/routeHandlers/sampleHandler');

// routes object - module scaffolding
const routes = {
    sample: sampleHandler,
    user: userHandler,
};

module.exports = routes;

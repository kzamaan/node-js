//dependency
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler')

//routes object - module scaffolding
const routes = {
    sample : sampleHandler
}



module.exports = routes
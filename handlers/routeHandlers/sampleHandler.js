// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log('sampleRequest', requestProperties);
    callback(200, {
        message: 'This is sample url',
    });
};

module.exports = handler;

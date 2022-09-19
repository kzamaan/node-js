const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log('sampleRequest', requestProperties);
    callback(200, {
        message: 'This is sample url',
    });
};

handler.userHandler = (requestProperties, callback) => {
    console.log('userRequest', requestProperties);
    callback(200, {
        message: 'This is user url',
    });
};

module.exports = handler;

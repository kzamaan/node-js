/* eslint-disable */

const library = require('../../library/data');
const { hash, parseJSON, createRandomString } = require('../../helpers/utils');

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._tokens[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._tokens = {};

// get method
handler._tokens.get = (requestProperties, callback) => {
    const tokenId =
        typeof requestProperties.body.id === 'string' &&
            requestProperties.body.id.trim().length > 0
            ? requestProperties.body.id
            : false;

    if (tokenId) {
        library.read('tokens', tokenId, (err, tokenData) => {
            const token = { ...parseJSON(tokenData) };
            if (!err && token) {
                callback(200, token);
            } else {
                callback(404, {
                    message: 'Requested token was not found',
                });
            }
        });
    } else {
        callback(400, {
            message: 'You have a problem in your request',
        });
    }
};

// post method
handler._tokens.post = (requestProperties, callback) => {
    const phone =
        typeof requestProperties.body.phone === 'string' &&
            requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
            requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;


    if (phone && password) {
        library.read('users', phone, (err, user) => {
            const hashedPassword = hash(password);
            if (hashedPassword === parseJSON(user).password) {
                const tokenId = createRandomString(20);
                const expires = Date.now() + 60 * 60 * 1000;
                const tokenObject = {
                    phone,
                    id: tokenId,
                    expires,
                };

                // store the token
                library.create('tokens', tokenId, tokenObject, (err) => {
                    if (!err) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            message: 'There was a server side error',
                        });
                    }
                });

            } else {
                callback(400, {
                    message: 'Phone or password is not valid',
                });
            }
        });
    } else {
        callback(400, {
            message: 'You have a problem in your request',
        });
    }
};

// put method
handler._tokens.put = (requestProperties, callback) => {
    const tokenId =
        typeof requestProperties.body.id === 'string' &&
            requestProperties.body.id.trim().length > 0
            ? requestProperties.body.id
            : false;

    const extend =
        typeof requestProperties.body.extend === 'boolean' &&
            requestProperties.body.extend === true ? true : false;

    if (tokenId && extend) {
        library.read('tokens', tokenId, (err, tokenData) => {
            const token = { ...parseJSON(tokenData) };
            if (!err && token) {
                if (token.expires > Date.now()) {
                    token.expires = Date.now() + 60 * 60 * 1000;

                    library.update('tokens', tokenId, token, (err) => {
                        if (!err) {
                            callback(200, {
                                message: 'Token was extended successfully',
                                expires: new Date(token.expires).toLocaleString(),
                            });
                        } else {
                            callback(500, {
                                message: 'There was a server side error',
                            });
                        }
                    });
                } else {
                    callback(400, {
                        message: 'Token already expired',
                    });
                }
            } else {
                callback(404, {
                    message: 'Requested token was not found',
                });
            }
        });
    } else {
        callback(400, {
            message: 'You have a problem in your request',
        });
    }
};

// delete method
handler._tokens.delete = (requestProperties, callback) => {
    const tokenId =
        typeof requestProperties.body.id === 'string' &&
            requestProperties.body.id.trim().length > 0
            ? requestProperties.body.id
            : false;

    if (tokenId) {
        library.read('tokens', tokenId, (err, tokenData) => {
            if (!err && tokenData) {
                library.delete('tokens', tokenId, (err) => {
                    if (!err) {
                        callback(200, {
                            message: 'Token was deleted successfully',
                        });
                    } else {
                        callback(500, {
                            message: 'There was a server side error',
                        });
                    }
                });
            } else {
                callback(404, {
                    message: 'Requested token was not found',
                });
            }
        });
    } else {
        callback(400, {
            message: 'You have a problem in your request',
        });
    }
};

// verify token
handler._tokens.verify = (id, phone, callback) => {
    library.read('tokens', id, (err, tokenData) => {
        if (!err && tokenData) {
            const token = { ...parseJSON(tokenData) };
            if (token.phone === phone && token.expires > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};

module.exports = handler;

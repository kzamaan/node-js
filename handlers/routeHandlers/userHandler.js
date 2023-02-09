/* eslint-disable */

const library = require('../../library/data');
const { hash, parseJSON } = require('../../helpers/utils');
const tokenHandler = require('./tokenHandler');
// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._users = {};

// get method
handler._users.get = (requestProperties, callback) => {
    const phone =
        typeof requestProperties.body.phone === 'string' &&
            requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    if (phone) {
        // verify token
        const token =
            typeof requestProperties.headersObject.token === 'string'
                ? requestProperties.headersObject.token
                : false;

        tokenHandler._tokens.verify(token, phone, (tokenIsValid) => {
            if (tokenIsValid) {
                library.read('users', phone, (err, user) => {
                    if (!err && user) {
                        const userObject = { ...parseJSON(user) };
                        delete userObject.password;
                        callback(200, userObject);
                    } else {
                        callback(404, {
                            message: 'User not found',
                        });
                    }
                });
            } else {
                callback(403, {
                    error: 'Authentication failure!',
                });
            }
        });


    } else {
        library.list('users', (err, users) => {
            if (!err && users) {
                callback(200, users);
            } else {
                callback(404, {
                    message: 'User not found',
                });
            }
        });
    }
};

// post method
handler._users.post = (requestProperties, callback) => {
    const fullName =
        typeof requestProperties.body.name === 'string' &&
            requestProperties.body.name.trim().length > 0
            ? requestProperties.body.name
            : false;

    const email =
        typeof requestProperties.body.email === 'string' &&
            requestProperties.body.email.trim().length > 0
            ? requestProperties.body.email
            : false;

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


    if (fullName && email && phone && password) {
        library.read('users', phone, (err, user) => {
            if (!err) {
                callback(400, {
                    message: 'The user already exists',
                });
            } else {
                const userObject = {
                    fullName,
                    email,
                    phone,
                    password: hash(password),
                };
                library.create('users', phone, userObject, (error) => {
                    if (!error) {
                        callback(200, {
                            message: 'User created successfully',
                        });
                    } else {
                        callback(500, {
                            message: 'There was a server side error',
                        });
                    }
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
handler._users.put = (requestProperties, callback) => {
    const fullName =
        typeof requestProperties.body.name === 'string' &&
            requestProperties.body.name.trim().length > 0
            ? requestProperties.body.name
            : false;

    const email =
        typeof requestProperties.body.email === 'string' &&
            requestProperties.body.email.trim().length > 0
            ? requestProperties.body.email
            : false;

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


    if (fullName || email || phone || password) {
        library.read('users', phone, (err, user) => {
            const userData = { ...parseJSON(user) };

            if (!err && userData) {
                if (fullName) {
                    userData.fullName = fullName;
                }
                if (email) {
                    userData.email = email;
                }
                if (password) {
                    userData.password = hash(password);
                }
                // verify token
                const token =
                    typeof requestProperties.headersObject.token === 'string'
                        ? requestProperties.headersObject.token
                        : false;

                tokenHandler._tokens.verify(token, phone, (tokenIsValid) => {
                    if (tokenIsValid) {
                        // store to database
                        library.update('users', phone, userData, (err2) => {
                            if (!err2) {
                                callback(200, {
                                    message: 'User was updated successfully!',
                                    user: userData,
                                });
                            } else {
                                callback(500, {
                                    error: 'There was a problem in the server side!',
                                });
                            }
                        });
                    } else {
                        callback(403, {
                            error: 'Authentication failure!',
                        });
                    }

                });
            } else {
                callback(400, {
                    message: 'The user failed to update',
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
handler._users.delete = (requestProperties, callback) => {
    const phone =
        typeof requestProperties.body.phone === 'string' &&
            requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;
    // verify token
    const token =
        typeof requestProperties.headersObject.token === 'string'
            ? requestProperties.headersObject.token
            : false;

    tokenHandler._tokens.verify(token, phone, (tokenIsValid) => {
        if (tokenIsValid) {
            if (phone) {
                library.read('users', phone, (err, user) => {
                    if (!err && user) {
                        library.delete('users', phone, (err2) => {
                            if (!err2) {
                                callback(200, {
                                    message: 'User deleted successfully',
                                });
                            } else {
                                callback(500, {
                                    message: 'There was a server side error',
                                });
                            }
                        });
                    } else {
                        callback(404, {
                            message: 'User not found',
                        });
                    }
                });
            } else {
                callback(400, {
                    message: 'There was a problem in your request',
                });
            }
        } else {
            callback(403, {
                error: 'Authentication failure!',
            });
        }
    });


};

module.exports = handler;

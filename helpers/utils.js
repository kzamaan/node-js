/*
 * @Author: Kamruzzaman
 * @Date: 2022-10-16 10:00:38
 * @Last Modified by: Kamruzzaman
 * @Last Modified time: 2022-10-16 22:15:03
 */
const crypto = require('crypto');

// module scaffolding
const utils = {};

utils.isObject = (obj) => typeof obj === 'object' && obj !== null;

utils.isToday = (date) => {
    const today = new Date();

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};
utils.dateInPast = (firstDate, secondDate) => {
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
        return true;
    }

    return false;
};

utils.isEmpty = (value) => {
    if (value === null || value === undefined || value === '') {
        return true;
    }

    if (Array.isArray(value) && value.length === 0) {
        return true;
    }

    return false;
};

// parse JSON string to Object
utils.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

utils.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', 'secret').update(str).digest('hex');
        return hash;
    }
    return false;
};

module.exports = utils;

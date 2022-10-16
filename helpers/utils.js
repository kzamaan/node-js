/*
 * @Author: Kamruzzaman
 * @Date: 2022-10-16 10:00:38
 * @Last Modified by:   Kamruzzaman
 * @Last Modified time: 2022-10-16 10:00:38
 */

// module scaffolding
const handler = {};

handler.isObject = (obj) => typeof obj === 'object' && obj !== null;

handler.isToday = (date) => {
    const today = new Date();

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};
handler.dateInPast = (firstDate, secondDate) => {
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
        return true;
    }

    return false;
};

handler.isEmpty = (value) => {
    if (value === null || value === undefined || value === '') {
        return true;
    }

    if (Array.isArray(value) && value.length === 0) {
        return true;
    }

    return false;
};

module.exports = handler;

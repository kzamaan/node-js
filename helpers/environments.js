/*
 * @Author: Kamruzzaman
 * @Date: 2022-10-15 23:58:28
 * @Last Modified by: Kamruzzaman
 * @Last Modified time: 2022-10-15 23:59:39
 */

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
};

environments.production = {
    port: 5000,
    envName: 'production',
};

// current env
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

const environmentToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

module.exports = environmentToExport;
